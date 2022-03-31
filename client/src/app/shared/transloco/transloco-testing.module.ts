import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco';
import de from '../../../assets/i18n/de.json';
import fr from '../../../assets/i18n/fr.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}): any {
  return TranslocoTestingModule.forRoot({
    langs: { de, fr },
    translocoConfig: {
      availableLangs: ['de', 'fr'],
      defaultLang: 'de',
    },
    preloadLangs: true,
    ...options,
  });
}
