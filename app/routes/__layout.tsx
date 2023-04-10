import {LoaderFunctionArgs} from "@remix-run/router";
import {Alert, Cart, Login, Navigation, Search} from '~/components';
import { SnackBarContext, ISnackBarMessage, ISnackBarContext } from '~/context/SnackBar';
import {Outlet, useLoaderData} from "@remix-run/react";
import React, {useContext, useState} from "react";
import {cartCookie} from "~/utils/requests.server";
import {useClient} from "~/utils/graphql";
import {json} from "@remix-run/node";
import {Modal} from "~/components/Modal";
import CartProvider from "~/context/CartContext";
import {ShopProvider} from "~/context/ShopContext";
import SearchProvider from "~/context/SearchContext";
import LoginProvider from "~/context/LoginContext";

export async function loader({ request }: LoaderFunctionArgs) {
    const cartId = await cartCookie.parse(request.headers.get("Cookie"))
    const client = useClient(request)

    const [shop, cart] = await Promise.all([
        client.fetchShop(),
        cartId ? client.fetchCart(cartId) : null
    ])

    console.log(shop)

    return json({ shop, cart })
}

export default function __layout() {
    const {shop, cart} = useLoaderData()
    const {snackBar} = useContext(SnackBarContext) as ISnackBarContext;
    const [login, setLogin] = useState(false)

    return (
        <div className="App bg-theme-color-500 h-100 w-100">
            <CartProvider initialCart={cart}>
                <ShopProvider shop={shop}>
                    <SearchProvider>
                        <LoginProvider>
                            <div className="relative mx-auto px-8 max-w-[90rem] min-h-screen flex flex-col">
                                <Modal open={login} onClose={() => setLogin(false)}>
                                    <Login/>
                                </Modal>
                                <Navigation showLogin={() => setLogin(true)}/>
                                <Outlet/>
                                <Search/>
                                <Cart />
                            </div>
                            {snackBar.map((alert: ISnackBarMessage) => {
                                return (
                                    <div className="fixed z-50 right-0 bottom-0">
                                        <Alert {...alert} />
                                    </div>
                                );
                            })}
                        </LoginProvider>
                    </SearchProvider>
                </ShopProvider>
            </CartProvider>
        </div>
    );
}
