import React from "react";
import {ICart} from "~/utils/graphql";

export interface ICartContext {
    cartID?: string;
    cart: ICart | null;
    cartOpen: boolean;
    updateCartOpen: (open: boolean) => void;
    updateCart: (id: ICart | null) => void;
}

export const CartContext = React.createContext<ICartContext>({ cart: null, cartOpen: false, updateCart: id => {}, updateCartOpen: open => {} });

const CartProvider = ({ children, initialCart }: any) => {
    const [cartOpen, setCartOpen] = React.useState<boolean>(false);
    const [cart, setCart] = React.useState<ICart | null>(initialCart);

    const updateCartOpen = (open: boolean) => {
        setCartOpen(open);
    }

    const updateCart = (next: ICart | null) => {
        if (next != null) {
            if (next.id !== cart?.id) {

            }
        } else {
            localStorage.removeItem("cart");
        }
        setCart(next);
    }

    return (
        <CartContext.Provider value={{ cartID: cart?.id, cart, cartOpen, updateCart, updateCartOpen}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
