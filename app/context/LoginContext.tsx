import React, { ReactElement } from "react";

export interface ILogin {
    showLogIn: boolean;
}

export interface ILoginContext {
    showLogIn: boolean;
    setShowLogIn: (state: boolean) => void;
}

export const LoginContext = React.createContext<ILoginContext | null>(null);

const LoginProvider = ({ children }: any) => {
    const [showLogIn, setShowLogIn] = React.useState<boolean>(false);

    return (
        <LoginContext.Provider value={{ showLogIn, setShowLogIn }}>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginProvider;

