import { use, type FC } from "react";
import { NavLink } from "react-router";
import img from "@/assets/landing.png"
import { I18nContext, Language } from "@/contexts/I18nContext";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

const Landing: FC = () => {

    const i18n = use(I18nContext);

    const handleLanguageChange = (value: Language) => {
        i18n.setLanguage(value);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex justify-end h-16 p-2">
                <Select onValueChange={handleLanguageChange} defaultValue={i18n.language}>
                    <SelectTrigger className="w-28 border-none">
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
            </div>

            <div className="flex flex-1">
                <div className="flex flex-col justify-center items-center flex-1">
                    <div>
                        <h1 className="text-8xl gradiant-text uppercase italic pe-8 -translate-x-4">Rbeer</h1>
                        <p className="mt-5">{i18n.localization.slogen}</p>
                        <div className="flex space-x-2 mt-5">
                            <NavLink to="/sign-in" className="px-4 py-2 bg-amber-400 hover:bg-amber-400/80 text-white rounded-2xl transition-colors">{i18n.localization.signIn}</NavLink>
                            <NavLink to="/sign-up" className="px-4 py-2 bg-amber-400 hover:bg-amber-400/80 text-white rounded-2xl transition-colors">{i18n.localization.signUp}</NavLink>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center flex-1">
                    <img src={img} alt="Landing image" className="rounded-lg"/>
                </div>
            </div>
        </div>
    );
};

export default Landing;
