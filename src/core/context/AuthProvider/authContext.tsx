import React, { createContext, useEffect, useState, ReactNode } from "react";
import { IAuthProvider, IContext, IUser } from "../../models/modelAuthContext";
import { getUserLocalStorage, setUserLocalStorage } from "../../utils/localStorage";
import { LoginRequest } from "../../services/userService/userServiceAuth";

interface IDialogContext {
    isLogoutDialogOpen: boolean;
    openLogoutDialog: () => void;
    closeLogoutDialog: () => void;
}

const defaultDialogContext: IDialogContext = {
    isLogoutDialogOpen: false,
    openLogoutDialog: () => {},
    closeLogoutDialog: () => {}
};

export const AuthContext = createContext<IContext & IDialogContext>({
    ...defaultDialogContext,
    ...{} as IContext
});

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
    const persistUser = getUserLocalStorage();
    const [user, setUser] = useState<IUser | null>(persistUser);
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

    useEffect(() => {
        const user = getUserLocalStorage();
        if (user) {
            setUser(user);
        }
    }, []);

    async function authenticate(crn: string, senha: string) {
        return await LoginRequest(crn, senha)
            .then((resp) => {
                const payload = { token: resp.token, crn: crn };
                setUser(payload);
                setUserLocalStorage(payload);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function logout() {
        setUser(null);
        setUserLocalStorage(null);
    }

    function openLogoutDialog() {
        setIsLogoutDialogOpen(true);
    }

    function closeLogoutDialog() {
        setIsLogoutDialogOpen(false);
    }

    return (
        <AuthContext.Provider
            value={{
                ...user,
                authenticate,
                logout,
                isLogoutDialogOpen,
                openLogoutDialog,
                closeLogoutDialog
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
