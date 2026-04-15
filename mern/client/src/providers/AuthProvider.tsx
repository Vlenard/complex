import { useState, type PropsWithChildren, type FC, useEffect, use } from "react";
import { AuthContext, type AuthStatus, type SignInPayload, type SignUpPayload, type AuthResponse } from "@/contexts/AuthContext";
import { HttpContext } from "@/contexts/HttpContext";

type AuthState = {
    status: AuthStatus;
    token: string | null;
};

const TOKEN_KEY = "auth_token";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

    const http = use(HttpContext);

    const [authState, setAuthState] = useState<AuthState>(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        return token ? { status: "authenticated", token } : { status: "unauthenticated", token: null };
    });

    const signIn = async (payload: SignInPayload): Promise<AuthResponse> => {
        const response = await http.fetch("/auth/sign-in", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (data.token) {
            setAuthState({
                status: "authenticated",
                token: data.token,
            });
            return {};
        }

        return {
            errors: [data.message]
        };
    };

    const signUp = async (payload: SignUpPayload): Promise<AuthResponse> => {
        const response = await http.fetch("/auth/sign-up", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (data.token) {
            setAuthState({
                status: "authenticated",
                token: data.token,
            });
            return {};
        }

        return {
            errors: [data.message]
        };
    };

    const signOut = () => {
        setAuthState({
            status: "unauthenticated",
            token: null,
        });
    };

    useEffect(() => {
        localStorage.setItem(TOKEN_KEY, authState.token ?? "");
        http.setBearerToken(authState.token ?? "");
    }, [authState.token, http]);

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
