interface IModalProps {
    open: boolean;
    setModal?: (showModal: boolean) => void;
    onClose: ()=>void;
    children: React.ReactNode;
}

export const Modal = ({children, open, setModal, onClose}: IModalProps) => {
    if (!open) return <></>;

    return (
        <>
            <div onClick={() => {
                if (setModal) setModal(false);
                onClose()
            }} className="centered darkBG flex justify-center items-center">
                <div onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </>
    )
}
