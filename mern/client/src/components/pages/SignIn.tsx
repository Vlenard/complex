import { AuthContext } from "@/contexts/AuthContext";
import { use, useEffect, type FC, type SubmitEventHandler } from "react"
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { I18nContext } from "@/contexts/I18nContext";
import { LangSelector } from "../ui/lang-selector";

const SignIn: FC = () => {

    const i18n = use(I18nContext);
    const auth = use(AuthContext);
    const navigate = useNavigate();

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;
        auth.signIn({ email, password });
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
                            <CardTitle>{i18n.localization.signIn}</CardTitle>
                            <CardDescription>
                              {i18n.localization.signInDescription}
                            </CardDescription>
                            <CardAction>
                                <Button onClick={() => navigate("/sign-up")} variant="link">{i18n.localization.signUp}</Button>
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
                                  <div className="flex items-center">
                                      <Label htmlFor="password">{i18n.localization.password}</Label>
                                  </div>
                                  <Input
                                      id="password"
                                      type="password"
                                      required
                                      className="py-6 px-6"
                                  />
                              </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full py-6 px-6">
                              {i18n.localization.signInButtonText}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    )
};

export default SignIn;
