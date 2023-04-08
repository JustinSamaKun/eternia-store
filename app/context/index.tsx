import CartProvider from "./CartContext"
import LoginProvider from "./LoginContext"
import SnackBarProvider from "./SnackBar";
import SearchProvider from "./SearchContext";

const AppProvider = ({ children }: any) => {
    return (
        <CartProvider>
            <LoginProvider>
                <SnackBarProvider>
                    <SearchProvider>
                        {children}
                    </SearchProvider>
                </SnackBarProvider>
            </LoginProvider>
        </CartProvider>
    )
}

export default AppProvider;