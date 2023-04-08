import { useContext } from "react";

import { CartContext, ICartContext } from "../../context/CartContext";
import { CartItem } from "./components/CartItem";

export const Cart = () => {
    const {
        cart,
        cartOpen,
        updateCartOpen
    } = useContext(CartContext) as ICartContext;

    return (
        <>
            {cartOpen ?
                <section tabIndex={-1} className="absolute right-0 top-0 bottom-0 min-h-full w-2/5">
                    <div className="bg-card-background-500 p-14 h-100 rounded-bl-2xl drop-shadow-xl">
                        {cart === null ?
                            <div>
                                There is no cart.
                            </div> :
                            <div>
                                <button type="button" onClick={() => updateCartOpen(false)}
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-hide="defaultModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                              clip-rule="evenodd"></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <h1 className="text-white font-black">My Cart ({cart.items.length})</h1>
                                <div className="">
                                    {cart.items.map((item, i) => {
                                        return <CartItem
                                            key={i}
                                            {...item}
                                        />
                                    })}
                                </div>
                                <h2 className="font-black text-white">Total: {cart.cost.actual}</h2>

                            </div>
                        }
                    </div>
                </section>
                : <></>
            }
        </>
    )
}
