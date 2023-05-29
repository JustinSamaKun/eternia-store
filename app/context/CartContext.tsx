import React from "react";
import Cookies from 'js-cookie'
import {CartInfoFragment} from "~/graphql/generated/graphql";
import {FragmentType, useFragment} from "~/graphql/generated";
import {CartInfo} from "~/graphql/cart";

export interface ICartContext {
    cartID?: string;
    cart: CartInfoFragment | null;
    cartOpen: boolean;
    updateCartOpen: (open: boolean) => void;
    updateCart: (cart: ({ __typename?: 'Cart' } & { ' $fragmentRefs'?: { 'CartInfoFragment': CartInfoFragment } }) | null | undefined) => void;
}

export const CartContext = React.createContext<ICartContext>({ cart: null, cartOpen: false, updateCart: cart => {}, updateCartOpen: open => {} });

const CartProvider = ({ children, initialCart }: any) => {
    const [cartOpen, setCartOpen] = React.useState<boolean>(false);
    const [cart, setCart] = React.useState<CartInfoFragment | null>(initialCart);

    const updateCartOpen = (open: boolean) => {
        setCartOpen(open);
    }

    const updateCart = (next: ({ __typename?: 'Cart' } & { ' $fragmentRefs'?: { 'CartInfoFragment': CartInfoFragment } }) | null | undefined) => {
        if (next) {
            const cart = useFragment(CartInfo, next as FragmentType<typeof CartInfo>)
            Cookies.set("cart", cart.id)
            setCart(cart);
        } else {
            Cookies.remove("cart");
            setCart(null)
        }
    }

    return (
        <CartContext.Provider value={{ cartID: cart?.id, cart, cartOpen, updateCart, updateCartOpen}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
