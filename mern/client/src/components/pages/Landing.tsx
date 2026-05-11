import { use, type FC, useEffect } from "react";
import { useNavigate } from "react-router";
import img from "@/assets/landing.png"
import { Button } from "../ui/button";
import { LangSelector } from "../ui/lang-selector";
import { I18nContext } from "@/contexts/I18nContext";
import { AuthContext } from "@/contexts/AuthContext";

const Landing: FC = () => {

    const i18n = use(I18nContext);
    const navigate = useNavigate();
    const auth = use(AuthContext);

    useEffect(() => {
        if (auth.status === "authenticated") {
            navigate("/app");
        }
    }, [auth.status, navigate]);

    if (auth.status === "authenticated") {
        navigate("/app");
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex justify-end h-16 p-2">
                <LangSelector />
            </div>

            <div className="flex flex-1">
                <div className="flex flex-col justify-center items-center flex-1">
                    <div>
                        <h1 className="text-8xl gradiant-text uppercase italic pe-8 -translate-x-4">Rbeer</h1>
                        <p className="mt-5">{i18n.localization.slogan}</p>
                        <div className="flex space-x-2 mt-5">
                            <Button className="px-4" onClick={() => navigate("/sign-in")}>{i18n.localization.signIn}</Button>
                            <Button className="px-4" onClick={() => navigate("/sign-up")}>{i18n.localization.signUp}</Button>
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
