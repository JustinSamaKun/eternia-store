import {useContext, useEffect, useState} from "react";

import { CartContext, ICartContext } from "../../context/CartContext";
import { CartItem } from "./components/CartItem";
import {ILoginContext, LoginContext} from "~/context/LoginContext";
import { loadScript } from "@paypal/paypal-js";
import {GraphQLClient, ICart, ICheckout, useClient} from "~/utils/graphql";
import {useLocation} from "react-router";
import useShop from "~/hooks/useShop";

const PUBLIC_SECRET = 'pk_test_51MQe54ISFEwmK0SWhLN2ayXjeHQWFz2Lg1FEQg32UOHfQMCqxgfqu83CI46DXsSNk4UlbaZS2OKBplXGmJ8NzsQ400qSY1cGQy'
const PAYPAL_CLIENT_ID = 'AVQgsOkIC75aGbI7KdsS02PjtMB63rO-rpK5Y_0TXrh-jsubuvb9fCcIT-KrDQrjp-5F30Qm6T8VeUTq'

async function retrievePayPalOrder(shopId: string, cart: ICart, checkout: ICheckout) {
    const { paypalId, paypalOrderId } = await fetch('http://localhost:4000/payments/orderinfo', {
        method: "POST",
        body: JSON.stringify({
            checkoutId: checkout.id,
            currency: cart.currency
        }),
        headers: {
            "content-type": "application/json",
            "X-Agora-Store-ID": shopId
        }
    }).then(r => r.json())
    if (!paypalId || !paypalOrderId) return Promise.reject()
    const script = await loadScript({
        "client-id": PAYPAL_CLIENT_ID,
        "merchant-id": paypalId,
        "buyer-country": checkout.country,
        currency: cart.currency,
        "data-namespace": `paypal-${Math.random()}`
    })

    if (!script?.Buttons) return Promise.reject()

    return script.Buttons({
        createOrder: async () => paypalOrderId,
        fundingSource: "paypal",
        onApprove: async () => window.location.assign(`/checkout/success?id=${checkout.id}`)
    })
}

export const Cart = () => {
    const {
        cart,
        cartOpen,
        updateCartOpen
    } = useContext(CartContext) as ICartContext;
    const {setShowLogIn, showLogIn} = useContext(LoginContext) as ILoginContext
    const client = useClient()
    const [checkout, setCheckout] = useState<any>()
    const shop = useShop()

    useEffect(() => {
        if (!cartOpen || !cart) return

        client.createCheckout(cart.id, 'auto', 'auto', window.location.href)
            .then(setCheckout);
    }, [cart, cartOpen])
    useEffect(() => {
        if (!checkout || !cart) return
        retrievePayPalOrder(shop.id, cart, checkout)
            .then(r => r.render("#paypal-button"))
            .catch(r => console.error(r))
    }, [checkout])

    if (cartOpen && !cart) {
        // they want to log in
        if (!showLogIn) setShowLogIn(true)
    }

    let content = <></>

    if (cart && cartOpen) {
        content = <div className={"p-8 flex flex-col gap-4"}>
            <div className={"flex flex-row items-center justify-between"}>
                <h1 className="text-white font-black">My Cart ({cart.items.length})</h1>
                <button type="button" onClick={() => updateCartOpen(false)}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="defaultModal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
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
                {checkout && <a target={"_blank"}
                                className={"rounded-md bg-white border border-black h-10 flex justify-center items-center"}
                                href={checkout.url}>Secure Checkout</a>}
                <div id={"paypal-button"}/>
            </div>
        </div>
    }

    return (
        <>
            <section tabIndex={-1}
                     className={`fixed inset-0 ml-auto overflow-auto overflow-hidden transition-all`}
                     style={{maxWidth: cartOpen ? '100vw' : '0vw'}}
            >
                <div
                    className={`h-full ml-auto w-1/3 bg-card-background-500 drop-shadow-xl border-l border-l-gray-500`}
                >
                    {content}
                </div>
            </section>
            {cartOpen && <div className={"absolute inset-0 backdrop-blur-lg bg-gray-200 opacity-10"}
                  onClick={() => updateCartOpen(false)}/>}
        </>
    )
}
