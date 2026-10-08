import { useState, type PropsWithChildren, type FC, useEffect, use } from "react";
import { AuthContext, type AuthStatus, type SignInPayload, type SignUpPayload } from "@/contexts/AuthContext";
import { HttpContext } from "@/contexts/HttpContext";
import { I18nContext } from "@/contexts/I18nContext";
import { toast } from "sonner";

type AuthState = {
    status: AuthStatus;
    token: string | null;
};

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const i18n = use(I18nContext);
    const http = use(HttpContext);

    const [authState, setAuthState] = useState<AuthState>({
        status: "loading",
        token: null,
    });

    useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            try {
                const response = await http.fetch("/user", { method: "GET" });
                if (response.ok && isMounted) {
                    setAuthState({ status: "authenticated", token: null });
                    return;
                }
            } catch {
                // Not authenticated or network error
            }

            if (isMounted) {
                setAuthState({ status: "unauthenticated", token: null });
            }
        };

        checkAuth();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const handleUnauthorized = () => {
            setAuthState((prev) => {
                if (prev.status === "authenticated") {
                    toast.warning(i18n.localization.tokenExpired);
                }
                return { status: "unauthenticated", token: null };
            });
        };

        window.addEventListener("auth:unauthorized", handleUnauthorized);
        return () => {
            window.removeEventListener("auth:unauthorized", handleUnauthorized);
        };
    }, [i18n]);

    const signIn = async (payload: SignInPayload): Promise<void> => {
        try {
            const response = await http.fetch("/auth/sign-in", {
                method: "POST",
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setAuthState({
                    status: "authenticated",
                    token: null,
                });
            }
        } catch (error) {
            console.error("Sign in failed:", error);
            toast.error(i18n.localization.failedToSignIn);
        }
    };

    const signUp = async (payload: SignUpPayload): Promise<void> => {
        try {
            const response = await http.fetch("/auth/sign-up", {
                method: "POST",
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setAuthState({
                    status: "authenticated",
                    token: null,
                });
            }
        } catch (error) {
            console.error("Sign up failed:", error);
            toast.error(i18n.localization.failedToSignUp);
        }
    };

    const signOut = async () => {
        try {
            await http.fetch("/auth/sign-out", {
                method: "POST",
            });
        } catch (error) {
            console.error("Sign out failed:", error);
        } finally {
            setAuthState({
                status: "unauthenticated",
                token: null,
            });
        }
    };

    return (
        <AuthContext.Provider value={{
            status: authState.status,
            token: authState.token,
            signIn,
            signUp,
            signOut,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
