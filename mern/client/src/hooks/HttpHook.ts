import { useContext } from "react";
import { HttpContext } from "@/providers/HttpProvider";

export const useHttp = () => useContext(HttpContext);
