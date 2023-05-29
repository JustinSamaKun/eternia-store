import { useContext } from "react";

import { CartContext, ICartContext } from "~/context/CartContext";
import { LoginContext, ILoginContext } from "~/context/LoginContext";
import { SnackBarContext, ISnackBarContext, MessageType } from '~/context/SnackBar';
import {IAddToCartProps} from "~/components/AddToCart/types";
import {useClient} from "~/utils/graphql";
import {CART_LINE_ADD} from "~/graphql/cart";

export const AddToCart = (props: IAddToCartProps) => {
    const { cartID, updateCart } = useContext(CartContext) as ICartContext;
    const { setShowLogIn } = useContext(LoginContext) as ILoginContext;
    const { addMessage } = useContext(SnackBarContext) as ISnackBarContext;

    const { productId, quantity, card } = props;

    const client = useClient()
    const handleCartAdd = (): void => {
        if (cartID == null) {
            setShowLogIn(true); // Show log-in modal
            return;
        }
        // Add to cart from cartID
        client.mutation(CART_LINE_ADD, { cartId: cartID, productId, quantity })
            .then(r => updateCart(r.cartLineAdd))
            .then(() => addMessage(MessageType.SUCCESS, "Added item to cart!"))
            .catch(() => addMessage(MessageType.ERROR, "Unable to add to cart."));
    }

    return (
        <> {!card ?
            <button onClick={() => handleCartAdd()} data-modal-hide="defaultModal" type="button" className="text-custom-gray-100 button-background focus:outline-none focus:ring-4 font-black rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Add To Cart</button>
            : <button onClick={() => handleCartAdd()} data-modal-hide="defaultModal" type="button" className="relative text-custom-gray-100 block button-background focus:outline-none w-[100%] uppercase focus:ring-4 font-bold text-opacity-80 rounded-full text-sm px-5 py-1.5 text-center">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[2rem] h-[2rem] absolute left-0 top-0 bottom-0">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                    </svg>
                </span>
                <span className="pl-[0.7rem] text-xs">
                    Add To Cart
                </span>
            </button>
        }
        </>
    )
}
