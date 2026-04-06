import { useHttp } from "@/hooks/HttpHook";
import { createContext, useEffect, useState, type PropsWithChildren, type FC } from "react";

type AuthStatus = "authenticated" | "unauthenticated" | "loading";
type SignInPayload = { email: string; password: string };
type SignUpPayload = { name: string; email: string; password: string };
type AuthResponse = { errors?: string[] };
type AuthContextType = {
    status: AuthStatus;
    token: string | null;
    signIn: (payload: SignInPayload) => Promise<AuthResponse>;
    signUp: (payload: SignUpPayload) => Promise<AuthResponse>;
    signOut: () => void;
};

const TOKEN_KEY = "auth_token";
const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

    const http = useHttp();

    const [status, setStatus] = useState<AuthStatus>("unauthenticated");
    const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));

    const signIn = async (payload: SignInPayload): Promise<AuthResponse> => {



        return { };
    };

    const signUp = async (payload: SignUpPayload): Promise<AuthResponse> => {



        return { };
    };

    const signOut = () => {
        setToken(null);
        setStatus("unauthenticated");
    };

    useEffect(() => {

    }, [token]);

    return (
        <AuthContext.Provider value={{
            status,
            token,
            signIn,
            signUp,
            signOut,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthProvider;
