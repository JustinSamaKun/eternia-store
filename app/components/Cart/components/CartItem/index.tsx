import { useContext, useState, useEffect} from "react";
import { CartContext, ICartContext } from "~/context/CartContext";

import { AnyVariables } from "urql";
import {ICartItem, useClient} from "~/utils/graphql";
import {ISnackBarContext, MessageType, SnackBarContext} from "~/context/SnackBar";

export const CartItem = (props: ICartItem) => {
    const { cartID, updateCart } = useContext(CartContext) as ICartContext;
    const { addMessage } = useContext(SnackBarContext) as ISnackBarContext;

    if (!cartID) return <></>

    const [quantity, setQuantity] = useState<number | null>(null);

    const client = useClient()

    const handleDeleteItem = (): void => {
        client.removeCartLine(cartID, props.product.id, props.quantity)
            .then(r => updateCart(r))
            .then(() => addMessage(MessageType.SUCCESS, "Removed item from cart!"))
            .catch(() => addMessage(MessageType.ERROR, "Unable to remove from cart."));
    }

    const handleRemove = (quantity: number): void => {
        client.removeCartLine(cartID, props.product.id, quantity)
            .then(r => updateCart(r))
            .then(() => addMessage(MessageType.SUCCESS, "Removed item from cart!"))
            .catch(() => addMessage(MessageType.ERROR, "Unable to remove from cart."));
    }

    const handleAdd = (quantity: number): void => {
        client.addCartLine(cartID, props.product.id, quantity)
            .then(r => updateCart(r))
            .then(() => addMessage(MessageType.SUCCESS, "Added item to cart!"))
            .catch(() => addMessage(MessageType.ERROR, "Unable to add to cart."));
    }

    useEffect(() => {
        if (quantity != null) {
            client.updateCartLine(cartID, props.product.id, quantity)
                .then(r => updateCart(r))
                .then(() => addMessage(MessageType.SUCCESS, "Added item to cart!"))
                .catch(() => addMessage(MessageType.ERROR, "Unable to add to cart."));
        }
    }, [quantity])

    return (
        <div className="p-5 w-100 h-100 grid grid-cols-2 z-50 items-center">
            <div className="flex flex-row">
                <img alt={props.product.handle} src={props.product.image}></img>
                <div>
                    <h1 className="text-white">{props.product.title}</h1>
                    <div className="text-white">{props.cost.list}</div>
                </div>
            </div>
            <div className="">
                <a className="cursor-pointer text-white" onClick={handleDeleteItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" strokeLineJoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </a>
                <div className="flex flex-row">
                    <button className="cursor-pointer text-white" onClick={() => handleRemove(1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" strokeLineJoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <input className="w-10" value={quantity !== null ? quantity : props.quantity} inputMode="numeric" onChange={(e) => {
                        if (e.target.value === "") {
                            setQuantity(0);
                            return;
                        }
                        setQuantity(parseInt(e.target.value) as number)
                    }}/>
                    <button className="cursor-pointer z-50 text-white" onClick={() => handleAdd(1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" strokeLineJoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
