import {useContext, useEffect, useState} from "react";

import { CartContext, ICartContext } from "../../context/CartContext";
import { CartItem } from "./components/CartItem";
import {ILoginContext, LoginContext} from "~/context/LoginContext";
import { loadScript } from "@paypal/paypal-js";
import {GraphQLClient, ICart, useClient} from "~/utils/graphql";
import {useLocation} from "react-router";

const PUBLIC_SECRET = 'pk_test_51MQe54ISFEwmK0SWhLN2ayXjeHQWFz2Lg1FEQg32UOHfQMCqxgfqu83CI46DXsSNk4UlbaZS2OKBplXGmJ8NzsQ400qSY1cGQy'
const PAYPAL_CLIENT_ID = 'AVQgsOkIC75aGbI7KdsS02PjtMB63rO-rpK5Y_0TXrh-jsubuvb9fCcIT-KrDQrjp-5F30Qm6T8VeUTq'

async function retrievePayPalOrder(cart: ICart, checkout: any) {
    const { paypalId, paypalOrderId } = await fetch('http://localhost:4000/payments/orderinfo', {
        method: "POST",
        body: JSON.stringify({
            checkoutId: checkout.id,
            currency: cart.currency
        })
    }).then(r => r.json())
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
    const { setShowLogIn, showLogIn } = useContext(LoginContext) as ILoginContext
    const client = useClient()
    const [checkout, setCheckout] = useState<any>()

    useEffect(() => {
        if (!cartOpen || !cart) return

        client.createCheckout(cart.id, 'auto', 'auto', window.location.href)
            .then(setCheckout);
    }, [cart, cartOpen])
    useEffect(() => {
        if (!checkout || !cart) return
        retrievePayPalOrder(cart, checkout)
            .then(r => r.render("#paypal-button"))
            .catch(r => console.error(r))
    }, [checkout])

    if (!cartOpen) return <></>

    if (!cart) {
        // they want to log in
        if (!showLogIn) setShowLogIn(true)
        return <></>
    }

    return (
        <section tabIndex={-1} className="fixed right-0 top-0 bottom-0 min-h-full w-2/5">
            <div className="bg-card-background-500 p-14 h-100 drop-shadow-xl">
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
                    <div className={"mt-auto flex flex-col gap-2"}>
                        <a href={checkout.url}>Secure Checkout</a>
                        <div id={"paypal-button"} />
                    </div>
                </div>
            </div>
        </section>
    )
}
