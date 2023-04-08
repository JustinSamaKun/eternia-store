import React from "react";

export enum MessageType {
    ERROR,
    SUCCESS,
    INFO
}

export interface ISnackBarMessage {
    type: MessageType;
    message: string;
}

export interface ISnackBarContext {
    snackBar: ISnackBarMessage[];
    addMessage: (type: MessageType, message: string) => void;
}

export const SnackBarContext = React.createContext<ISnackBarContext | null>(null);

const SnackBarProvider = ({ children }: any) => {
    const [snackBar, setSnackBar] = React.useState<ISnackBarMessage[]>([]);

    const addMessage = (type: MessageType, message: string) => {
        if (snackBar.length > 0 && message === snackBar[0].message) {
            return;
        }
        setSnackBar([...snackBar, {type, message}]);
    }

    React.useEffect(() => {
        if (snackBar.length <= 0)
            return;

        const timer = setInterval(() => {
            var sb = [...snackBar];
            sb.splice(0, 1);
            setSnackBar(sb);
        }, 5000);
        return () => {
            clearInterval(timer);
        }
    }, [snackBar]);

    return (
        <SnackBarContext.Provider value={{ snackBar, addMessage }}>
            {children}
        </SnackBarContext.Provider>
    )
}

export default SnackBarProvider;