import { createContext } from "react";

export type User = {
  name: string;
  role: string;
};

export const UserContext = createContext<User | null>(null);
