/**
 * adds default target node and copies source messages to target in all messages*.xlf
 * cli params:
 * - fixTarget: only fixes missing target nodes in the default language file
 * - updateTranslations: only updates/synchronizes translations from the default language file to the several languages
 * - formatXlfFile: formats the default xlf file (to prevent unnecessary diffs). Suggestion: use this function after any ng-i18n extract.
 * - sort [filename]: sort all <trans-unit> tags based on their id. If no filename is provided, the default file will be used.
 * - checkForChangedTranslations: checks for changed translations in any translation files "messages.langCode.xlf
 * Usefull npm scripts:
 * "i18n": "npm run i18n:preserve-ng-localize-ts && npm run i18n:extract && npm run i18n:apply-preserved-ng-localize-ts && npm run i18n:fixMissingTargetsInMainTranslationFile && npm run i18n:sortMainTranslationFile",
 * "i18n:extract": "ng xi18n --i18nFormat=xlf --output-path src/i18n --outFile=messages.xlf --i18n-locale=de-CH",
 * "i18n:fillTranslations": "node util/i18n-helper.js",
 * "i18n:updateTranslationsInTranslationFiles": "node util/i18n-helper.js updateTranslations",
 * "i18n:fixMissingTargetsInMainTranslationFile": "node util/i18n-helper.js fixTarget",
 * "i18n:sortMainTranslationFile": "node util/i18n-helper.js sort",
 * "i18n:checkChangedTranslations": "node util/i18n-helper.js checkChangedTranslations",
 * "i18n:preserve-ng-localize-ts": "node util/i18n-helper.js preserveLocalizedTagFunctions",
 * "i18n:apply-preserved-ng-localize-ts": "node util/i18n-helper.js applyPreservedLocalizedTagFunctions",
 *
 * This script fixes https://github.com/angular/angular/issues/21690
 * @type {module:fs}
 */

const fs = require('fs');
const path = require('path');
const xpath = require('xpath');
const DomParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;
const xmlFormatter = require('xml-formatter');

const localeFolder = 'src/i18n/';
const localizedMarker = 'x-ng-localize';
const localizeTranslationFile = 'messages-localize.xlf';

/**
 * loads dom document
 * @param file
 * @returns {Document}
 */
function loadDoc(file) {
  const xml = String(fs.readFileSync(file));
  return new DomParser().parseFromString(xml);
}

/**
 * loads an xml file and extracts all <trans-unit> tags
 * @param file
 * @returns {{doc: Document, units: Array<SelectedValue>}}
 */
function loadTransUnitTags(file) {
  return selectTransUnitTags(loadDoc(file));
}

/**
 * get all <trans-unit> tags
 * @param doc document
 * @returns {{doc: Document, units: Array<SelectedValue>}}
 */
function selectTransUnitTags(doc) {
  return { units: xpath.select(`//*[name(.) = 'trans-unit']`, doc), doc };
}

/**
 * clones all children from source node to the target note
 * @param source
 * @param target
 */
function deepCloneNodeChildren(source, target) {
  //copy all childnodes from source node
  for (let c = 0; c < source.childNodes.length; c++) {
    target.appendChild(source.childNodes[c].cloneNode(true));
  }
}

/**
 * This function may be needed as the ng xi18n tool removes the target attribute from xlf-files during the extraction process.
 * The default language file messages.xlf will be manipulated in the way that if no target is available, the source-node will be copied to a target node
 *
 * @returns boolean which indicates if a change for a target node was made
 */
function fixTargetTag(doc, transUnit) {
  let changed = false;
  const source = transUnit.getElementsByTagName('source')[0];
  const idNode = transUnit.attributes.getNamedItem('id');
  if (!source) {
    throw new SyntaxError(
      `Node with id '${idNode.value}' has no source property set. Fix this and rerun script again!`
    );
  }

  let target = transUnit.getElementsByTagName('target')[0];
  if (!target) {
    console.log(`added missing target tag for node '${idNode.value}'`);
    target = doc.createElement('target');
    transUnit.insertBefore(target, source.nextSibling);
  }

  if (source.textContent !== target.textContent || source.childNodes.length !== target.childNodes.length) {
    //clean node complete
    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }
    deepCloneNodeChildren(source, target);
    changed = true;
  }

  return changed;
}

/**
 * calculates the path to the default translation file
 * @returns {string} path to the default translation file
 */
function getDefaultTranslationFilePath() {
  return _getTranslationFilePath('messages.xlf');
}

/**
 * writes a serialized dom to a formatted xml file
 * @param doc dom to serialize
 * @param filePath file to write to, if not set, the default path will be used
 */
function serializeDom(doc, filePath = getDefaultTranslationFilePath()) {
  sortTransUnits(doc);
  const serializedDom = patchSerializedDom(new XMLSerializer().serializeToString(doc));
  fs.writeFileSync(filePath, serializedDom);
}

/**
 * collects all translation ids in the default messages.xlf file and fixes if needed missing target nodes
 * @returns object with all translation unit ids as key
 */
function collectTranslationUnitIds(recreateMissingTargets = false) {
  const idToTransUnit = {};

  const transUnitTags = loadTransUnitTags(getDefaultTranslationFilePath());
  let changed = false;
  transUnitTags.units.forEach((transUnit) => {
    const id = transUnit.getAttribute('id');
    idToTransUnit[id] = transUnit;

    changed |= fixTargetTag(transUnitTags.doc, transUnit);
  });

  if (changed && recreateMissingTargets) {
    serializeDom(transUnitTags.doc);
  }

  return idToTransUnit;
}

/**
 * checks if there translations may have changed in the meantime
 * @param fileName path to file to translation
 */
function checkForChangedTranslations(fileName) {
  const baseTransUnits = loadTransUnitTags(getDefaultTranslationFilePath());
  const targetDocument = loadDoc(_getTranslationFilePath(fileName));
  baseTransUnits.units.forEach((translationUnit) => {
    const idNode = translationUnit.attributes.getNamedItem('id');
    const targetTranslationUnit = xpath.select(`//*[@id='${idNode.value}']`, targetDocument)[0];

    if (!targetTranslationUnit) {
      console.log(
        `*** TranslationUnit with id '${idNode.value}' does not exist in the TargetUnit. Check file '${fileName}' against the master messages.xlf.`
      );
      return;
    }

    const sourceSourceNode = translationUnit.getElementsByTagName('source')[0];
    const targetSourceNode = targetTranslationUnit.getElementsByTagName('source')[0];

    if (
      targetSourceNode &&
      (_trim(sourceSourceNode.textContent) !== _trim(targetSourceNode.textContent) ||
        sourceSourceNode.childNodes.length !== targetSourceNode.childNodes.length)
    ) {
      console.log(
        `*** TranslationUnit with id '${idNode.value}' may has changed. Check file '${fileName}' against the master messages.xlf.`
      );
      console.log(
        `    Default Value is '${sourceSourceNode.textContent}' and has ${sourceSourceNode.childNodes.length} children`
      );
      console.log(
        `    Target Value is '${targetSourceNode.textContent}' and has ${targetSourceNode.childNodes.length} children`
      );
    }
  });
}

/**
 * Merges missing translations from the default translation files to any language files.
 * Orphans in the translated files will be logged to the console.
 * If recreateMissingTargets is set to true, missing target nodes in the default language file will be patched before snchronizing the different language files.
 * @param recreateMissingTargets flag to indicate how to handle missing target tags in the default translation file
 */
function updateTranslationFiles(recreateMissingTargets = false) {
  // first check if the default file is in a consistent state
  const idToTransUnit = collectTranslationUnitIds(recreateMissingTargets);

  fs.readdirSync(localeFolder).forEach((file) => {
    if (!_isTranslationFile(file)) {
      return;
    }

    const idToTransUnitClone = Object.assign({}, idToTransUnit);

    const translationFile = _getTranslationFilePath(file);

    //check for changed translations
    // checkForChangedTranslations(file);

    const transUnitTags = loadTransUnitTags(translationFile);
    transUnitTags.units.forEach((unit) => {
      const id = unit.getAttribute('id');
      if (idToTransUnitClone[id]) {
        delete idToTransUnitClone[id];
      } else {
        console.log(`superfluous trans-unit in file ${file} with id ${id}`);
      }
    });

    //check if there are any additional ids which have to be added to the translated files
    const newIds = Object.keys(idToTransUnitClone);
    if (newIds.length > 0) {
      const body = xpath.select(`//*[name(.) = 'body']`, transUnitTags.doc)[0];
      newIds
        .map((key) => idToTransUnitClone[key])
        .forEach((unit) => {
          const unitNode = new DomParser().parseFromString(String(unit));
          unitNode.documentElement.attributes.removeNamedItem('xmlns');
          const source = unitNode.getElementsByTagName('source')[0];
          const target = unitNode.getElementsByTagName('target')[0];
          target.textContent = `tbt:`;
          deepCloneNodeChildren(source, target);
          body.appendChild(unitNode);
        });

      serializeDom(transUnitTags.doc, translationFile);
    }
  });
}

/**
 * sort ascending the xlf document based on the trans-unit id's
 * @param doc
 */
function sortTransUnits(doc) {
  const body = xpath.select(`//*[name(.) = 'body']`, doc)[0];
  const transUnits = selectTransUnitTags(doc);
  transUnits.units.sort((baseNode, compareNode) => {
    // body.childNodes.sort((baseNode, compareNode) => {
    const baseNodeId = baseNode.attributes.getNamedItem('id');
    const compareNodeId = compareNode.attributes.getNamedItem('id');
    return ('' + baseNodeId).localeCompare(compareNodeId);
  });
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
  transUnits.units.forEach((transUnitNode) => body.appendChild(transUnitNode.cloneNode(true)));
}

/**
 * fixes problems with:
 * - formatting
 * - https://github.com/jindw/xmldom/pull/199/files --> 'equiv-text="&lt;/span>"', the greater then should not be transformed
 * @param serializedDom dom as a xml string representation
 */
function patchSerializedDom(serializedDom) {
  // see https://github.com/jindw/xmldom/pull/199/files
  // problem is 'equiv-text="&lt;/span&gt;"' -> will be transformed to 'equiv-text="&lt;/span>"', the greater then should not be transformed
  // const patchedserializedDom = serializedDom.replaceAll('>"', '"&gt;"');
  return xmlFormatter(serializedDom.replace(/>"/g, '&gt;"'), {
    // indentation: '  ',
    // filter: (node) => node.type !== 'Comment',
    collapseContent: true,
    // lineSeparator: '\n'
  });
}

/**
 * This function extracts all (manually) added translation for the ng $localize tag functions.
 * This is needed as per Angular >= 9 the ng i18n cli will not extract those elements from the typescript files and eliminate therefore all the trans-units from messages.xlf
 * The manually extracted localized trans-units needs to be tagged with a custom ts attribute value of 'x-ng-localize':
 * <trans-unit ts="x-ng-localize'>...</trans-unit>
 * The Translation units will be temporary saved to a file called 'messages-localize.xlf'
 */
function preserveLocalizedTagFunctions() {
  const doc = loadDoc(getDefaultTranslationFilePath());
  const body = xpath.select(`//*[name(.) = 'body']`, doc)[0];
  const transUnits = selectTransUnitTags(doc);
  //filter all not manually localized units
  transUnits.units.forEach((unit) => {
    const tsNode = unit.attributes.getNamedItem('ts');
    if (!tsNode || !tsNode.value === localizedMarker) {
      body.removeChild(unit);
    }
  });

  // only write file if there are any localized translation units
  if (selectTransUnitTags(doc).units.length > 0) {
    serializeDom(doc, _getTranslationFilePath(localizeTranslationFile));
  }
}

/**
 * Checks if a preserved $localize file exists and merges the content to the messages.xlf and removes the file
 */

function applyPreservedLocalizedTagFunctions() {
  const savedLocalizeTranslationsFile = _getTranslationFilePath(localizeTranslationFile);
  if (!fs.existsSync(savedLocalizeTranslationsFile)) {
    console.log(`File ${savedLocalizeTranslationsFile} not available. Nothing to apply.`);
    return;
  }
  const defaultTranslations = loadDoc(getDefaultTranslationFilePath());
  const savedLocalizeTranslations = loadDoc(_getTranslationFilePath(localizeTranslationFile));

  const defaultTranslationsBody = xpath.select(`//*[name(.) = 'body']`, defaultTranslations)[0];
  const transUnits = selectTransUnitTags(savedLocalizeTranslations);
  //filter all not manually localized units
  transUnits.units.forEach((unit) => {
    defaultTranslationsBody.appendChild(unit);
  });

  serializeDom(defaultTranslations);

  //remove file from filesystem
  fs.unlinkSync(savedLocalizeTranslationsFile);
}

function _getTranslationFilePath(fileName) {
  return path.join(localeFolder, fileName);
}

function _trim(stringValue) {
  // return ('' + stringValue).trim();
  const newlines = /(\r?\n|\r)\s*/g;
  //remove leading/trailing whitespaces (incl. any newlines)
  const returnValue = ('' + stringValue).trim();
  //remove all other newlines
  return returnValue.replace(newlines, ' ');
}

function _isTranslationFile(file) {
  // check for default translation file: messages.xlf
  return file.split('.').length > 2;
}

function _runFormatXlfFile() {
  const path = getDefaultTranslationFilePath();
  fs.writeFileSync(path, patchSerializedDom(String(fs.readFileSync(path))));
}

function _runSort(xlfFilePath) {
  serializeDom(loadDoc(xlfFilePath), xlfFilePath);
}

function _runTool(toolArguments) {
  if (toolArguments.length > 0) {
    console.log('toolArgs: ', toolArguments);
    switch (toolArguments[0].trim()) {
      case 'fixTarget':
        collectTranslationUnitIds(true);
        break;
      case 'updateTranslations':
        updateTranslationFiles(false);
        break;
      case 'formatXlfFile':
        _runFormatXlfFile();
        break;
      case 'sort':
        _runSort(toolArguments.length === 2 ? localeFolder + toolArguments[1] : getDefaultTranslationFilePath());
        break;
      case 'checkChangedTranslations':
        fs.readdirSync(localeFolder).forEach((file) => {
          if (!_isTranslationFile(file)) {
            return;
          }
          checkForChangedTranslations(file);
        });
        break;
      case 'preserveLocalizedTagFunctions':
        preserveLocalizedTagFunctions();
        break;
      case 'applyPreservedLocalizedTagFunctions':
        applyPreservedLocalizedTagFunctions();
        break;
      default:
        console.log(
          `Unknown argument: ${toolArguments.join(' ')}.
          Usage is:
          'node i18n-helper.js (fixTarget|updateTranslations|formatXlfFile (filename)|sort|checkChangedTranslations|preserveLocalizedTagFunctions)'`
        );
    }
  } else {
    updateTranslationFiles(true);
  }
}

// start i18n tool
_runTool(process.argv.slice(2));
