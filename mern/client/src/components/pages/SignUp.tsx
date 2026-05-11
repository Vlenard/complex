import { AuthContext } from "@/contexts/AuthContext";
import { use, useEffect, type FC, type SubmitEventHandler } from "react"
import { useNavigate } from "react-router";
import { LangSelector } from "../ui/lang-selector";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { I18nContext } from "@/contexts/I18nContext";
import { toast } from "sonner";

const SignUp: FC = () => {

    const i18n = use(I18nContext);
    const auth = use(AuthContext);
    const navigate = useNavigate();

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        if (form.password.value !== form.confirmPassword.value) {
            toast.error(i18n.localization.passwordsDoNotMatch);
            return;
        }

        const email = form.email.value;
        const name = form.username.value;
        const password = form.password.value;

        auth.signUp({ email, name, password });
    }

    useEffect(() => {
        if (auth.status === "authenticated") {
            navigate("/app");
        }
    }, [auth.status, navigate]);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex justify-end w-full p-2 h-16">
                <LangSelector />
            </div>
            <div className="flex flex-1 items-center justify-center">
                <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>{i18n.localization.signUp}</CardTitle>
                            <CardDescription>
                              {i18n.localization.signUpDescription}
                            </CardDescription>
                            <CardAction>
                                <Button onClick={() => navigate("/sign-in")} variant="link">{i18n.localization.signIn}</Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="valami@gmail.com"
                                        required
                                        className="py-6 px-6"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Name</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                        className="py-6 px-6"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">{i18n.localization.password}</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        className="py-6 px-6"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirmPassword">{i18n.localization.confirmPassword}</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        required
                                        className="py-6 px-6"
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full py-6 px-6">
                              {i18n.localization.signUpButtonText}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    );
}

export default SignUp
