

export interface IUser {
    crn?: string;
    token?: string;
}

export interface IContext extends IUser {
    authenticate : (crn: string, senha: string) => Promise<void>;
    logout: () => void;
}

export interface IAuthProvider {
    children: JSX.Element;
}