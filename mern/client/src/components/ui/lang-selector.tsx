import { use } from "react";
import { Language } from "@/contexts/I18nContext";
import { I18nContext } from "@/contexts/I18nContext";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";

export const LangSelector = () => {

    const i18n = use(I18nContext);

    const handleLanguageChange = (value: Language) => {
        i18n.setLanguage(value);
    };

    return (
        <Select onValueChange={handleLanguageChange} defaultValue={i18n.language}>
            <SelectTrigger className="w-32 border-none p-6">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>
                        {i18n.localization.languageSettings}
                    </SelectLabel>
                    <SelectItem value={Language.English}>{i18n.getLanguageString(Language.English)}</SelectItem>
                    <SelectItem value={Language.Hungarian}>{i18n.getLanguageString(Language.Hungarian)}</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
