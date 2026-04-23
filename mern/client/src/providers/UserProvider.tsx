import { use, useEffect, useState, type FC, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import type { UserModel } from "@/models/UserModel";
import { AuthContext } from "@/contexts/AuthContext";
import { UserContext } from "@/contexts/UserContext";
import { HttpContext } from "@/contexts/HttpContext";

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const auth = use(AuthContext);
  const http = use(HttpContext);
  const navigate = useNavigate();

  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    if (auth.status !== "authenticated") {
      setUser(null);
      return;
    }

    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        const response = await http.fetch("/user", {
          method: "GET",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const userData: UserModel = await response.json();
        setUser(userData);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("User fetch failed:", error);
          setUser(null);
          navigate("/sign-in");
        }
      }
    };

    fetchUser();

    return () => controller.abort();
  }, [auth.status, http, navigate]);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
