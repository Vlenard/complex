import { useContext } from "react";
import { UserContext } from "@/providers/UserProvider.tsx";

export const useUser = () => useContext(UserContext);
