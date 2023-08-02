import { useContext } from "react";

import { CartContext, ICartContext } from "~/context/CartContext";
import { LoginContext, ILoginContext } from "~/context/LoginContext";
import { SnackBarContext, ISnackBarContext, MessageType } from '~/context/SnackBar';
import {IAddToCartProps} from "~/components/AddToCart/types";
import {useClient} from "~/utils/graphql";
import {CART_LINE_ADD} from "~/graphql/cart";

export const AddToCart = (props: IAddToCartProps) => {
    const {cartID, updateCart} = useContext(CartContext) as ICartContext;
    const {setShowLogIn} = useContext(LoginContext) as ILoginContext;
    const {addMessage} = useContext(SnackBarContext) as ISnackBarContext;

    const {productId, quantity, card} = props;

    const client = useClient()
    const handleCartAdd = (): void => {
        if (cartID == null) {
            setShowLogIn(true); // Show log-in modal
            return;
        }
        // Add to cart from cartID
        client.mutation(CART_LINE_ADD, {cartId: cartID, productId, quantity})
            .then(r => updateCart(r.cartLineAdd))
            .then(() => addMessage(MessageType.SUCCESS, "Added item to cart!"))
            .catch(() => addMessage(MessageType.ERROR, "Unable to add to cart."));
    }

    return (
        <button
            onClick={() => handleCartAdd()}
            data-modal-hide="defaultModal"
            type="button"
            className="button rounded-full py-1 px-8 relative"
        >
            <div className={"flex flex-col items-center justify-center absolute bg-white rounded-full aspect-square left-0 top-0 bottom-0 button-background border-b border-r border-[#5559EE]"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" className="w-4 aspect-square">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
            </div>
            <span className="text-sm font-medium">
                Add To Cart
            </span>
        </button>
    )
}
