import { useState, type PropsWithChildren, type FC, useEffect, use } from "react";
import { AuthContext, type AuthStatus, type SignInPayload, type SignUpPayload } from "@/contexts/AuthContext";
import { HttpContext } from "@/contexts/HttpContext";
import { I18nContext } from "@/contexts/I18nContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

type AuthState = {
    status: AuthStatus;
    token: string | null;
};

const TOKEN_KEY = "auth_token";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const i18n = use(I18nContext);
    const http = use(HttpContext);

    const getValidToken = (): string | null => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return null;

        try {
            // Use jwtDecode instead of jwt.decode
            const decoded = jwtDecode<{ exp?: number }>(token);

            if (!decoded || !decoded.exp) {
                localStorage.removeItem(TOKEN_KEY);
                return null;
            }

            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp < currentTime) {
                toast.warning(i18n.localization.tokenExpired);
                localStorage.removeItem(TOKEN_KEY);
                return null;
            }

            return token;
        } catch (error) {
            // This catches malformed tokens that can't be decoded
            localStorage.removeItem(TOKEN_KEY);
            return null;
        }
    };

    const [authState, setAuthState] = useState<AuthState>(() => {
        const validToken = getValidToken();
        return validToken
            ? { status: "authenticated", token: validToken }
            : { status: "unauthenticated", token: null };
    });

    const signIn = async (payload: SignInPayload): Promise<void> => {
        try {
            const response = await http.fetch("/auth/sign-in", {
                method: "POST",
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem(TOKEN_KEY, data.token);
                setAuthState({
                    status: "authenticated",
                    token: data.token,
                });
            }
        } catch (error) {
            console.log(error)
            toast.error(i18n.localization.failedToSignIn);
        }
    };

    const signUp = async (payload: SignUpPayload): Promise<void> => {
        try {
            const response = await http.fetch("/auth/sign-up", {
                method: "POST",
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem(TOKEN_KEY, data.token);
                setAuthState({
                    status: "authenticated",
                    token: data.token,
                });
            }
        } catch (error) {
            toast.error(i18n.localization.failedToSignUp);
            console.log(error)
        }
    };

    const signOut = () => {
        localStorage.removeItem(TOKEN_KEY); // Always clear storage on sign out
        setAuthState({
            status: "unauthenticated",
            token: null,
        });
    };

    useEffect(() => {
        http.setBearerToken(authState.token ?? "");
    }, [authState.token]);

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
