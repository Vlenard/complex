import { useState, type PropsWithChildren, type FC, useEffect, use } from "react";
import { AuthContext, type AuthStatus, type SignInPayload, type SignUpPayload, type AuthResponse } from "@/contexts/AuthContext";
import { HttpContext } from "@/contexts/HttpContext";
import { jwtDecode } from "jwt-decode";

type AuthState = {
    status: AuthStatus;
    token: string | null;
};

const TOKEN_KEY = "auth_token";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
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
                console.warn("Token has expired.");
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

    const signIn = async (payload: SignInPayload): Promise<AuthResponse> => {
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
            return {};
        }

        return { errors: [data.message] };
    };

    const signUp = async (payload: SignUpPayload): Promise<AuthResponse> => {
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
            return {};
        }

        return { errors: [data.message] };
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
