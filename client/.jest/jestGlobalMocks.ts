Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance'],
    };
  },
});
/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

Object.defineProperty(window, 'createSpyObj', {
  value: (baseName, methodNames) => {
    const obj = {};

    methodNames.forEach((methodName) => {
      const fn = jest.fn();
      fn['and'] = {
        returnValue: (arg) => fn.mockReturnValue(arg),
        returnValues: (...args) => args.forEach((arg) => fn.mockReturnValueOnce(arg)),
        callFake: (fakeFun) => fn.mockImplementation(fakeFun),
        throwError: (msg) =>
          fn.mockImplementation(() => {
            throw new Error(msg);
          }),
      };
      fn['calls'] = {
        argsFor: (index) => fn.mock.calls[index],
      };
      obj[methodName] = fn;
    });

    return obj;
  },
});
