'use client';

import { useI18n } from '../i18n-provider';
import { Language } from '../i18n-provider';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './select';

export function LangSelector() {
  const { language, setLanguage, getLanguageString, localization } = useI18n();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  return (
      <Select onValueChange={handleLanguageChange} defaultValue={language}>
          <SelectTrigger className="w-32 border-none p-6">
              <SelectValue />
          </SelectTrigger>
          <SelectContent>
              <SelectGroup>
                  <SelectLabel>
                      {localization.languageSettings}
                  </SelectLabel>
                  <SelectItem value="en">{getLanguageString('en')}</SelectItem>
                  <SelectItem value="hu">{getLanguageString('hu')}</SelectItem>
              </SelectGroup>
          </SelectContent>
      </Select>
  );
}
