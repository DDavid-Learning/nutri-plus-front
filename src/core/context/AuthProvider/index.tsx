import React, { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from "./utils";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
    const persistUser = getUserLocalStorage();
    const [user, setUser] = useState<IUser | null>(persistUser);

    useEffect(() => {
        const user = getUserLocalStorage();
        if (user) {
            setUser(user);
        }
    }, []);

    async function authenticate(crn: string, senha: string) {
        return await LoginRequest(crn, senha).then((resp) => {
            const payload = { token: resp.token, crn: crn };
            setUser(payload);
            setUserLocalStorage(payload)
        }).catch((error) => {
            console.log(error)
        })

    }

    function logout() {
        setUser(null);
        setUserLocalStorage(null);
    }

    return (
        <AuthContext.Provider value={{ ...user, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
