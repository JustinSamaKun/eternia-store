import {useContext, useEffect, useState} from "react";

import { CartContext, ICartContext } from "../../context/CartContext";
import { CartItem } from "./components/CartItem";
import {ILoginContext, LoginContext} from "~/context/LoginContext";

export const Cart = () => {
    const {
        cart,
        cartOpen,
        updateCartOpen
    } = useContext(CartContext) as ICartContext;
    const {setShowLogIn, showLogIn} = useContext(LoginContext) as ILoginContext

    if (cartOpen && !cart) {
        // they want to log in
        if (!showLogIn) setShowLogIn(true)
    }

    if (!cart) return <></>

    return (
        <>
            {cartOpen && <div className={"fixed inset-0 backdrop-blur-lg bg-gray-200 opacity-10"} onClick={() => updateCartOpen(false)}/>}
            <section tabIndex={-1}
                     className={`fixed inset-0 w-1/3 ml-auto overflow-auto overflow-hidden transition-all`}
                     style={{maxWidth: cartOpen ? '33vw' : '0vw'}}
            >
                <div
                    className={`h-full flex ml-auto bg-card-background-500 drop-shadow-xl border-l border-l-gray-500`}
                >
                    <div className={"p-8 flex flex-col flex-1 gap-4"}>
                        <div className={"flex flex-row items-center justify-between"}>
                            <h1 className="text-white font-black">My Cart ({cart.items.length})</h1>
                            <button type="button" onClick={() => updateCartOpen(false)}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="overflow-y-auto flex flex-col flex-1 gap-4">
                            {cart.items.map((item, i) => {
                                return <CartItem
                                    key={i}
                                    {...item}
                                />
                            })}
                        </div>
                        <div className={"border-t border-gray-500 flex flex-col gap-4"}>
                            <div className={"flex flex-col gap-2"}>
                                <h2 className="font-black text-white">Total: {cart.cost.actual}</h2>
                            </div>
                            {cart && <a target={"_blank"}
                                            className={"rounded-md bg-white border border-black h-10 flex justify-center items-center"}
                                            href={`/checkout?id=${cart.id}`}>Secure Checkout</a>}
                            <div id={"paypal-button"}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
