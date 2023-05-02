import {LoaderFunctionArgs} from "@remix-run/router";
import {Alert, Cart, Login, Navigation, Search} from '~/components';
import { SnackBarContext, ISnackBarMessage, ISnackBarContext } from '~/context/SnackBar';
import {Links, Meta, Outlet, Scripts, useLoaderData} from "@remix-run/react";
import React, {useContext, useState} from "react";
import {getCartId, getStoreId} from "~/utils/requests.server";
import {ICategory, useClient} from "~/utils/graphql";
import {json} from "@remix-run/node";
import {Modal} from "~/components/Modal";
import CartProvider from "~/context/CartContext";
import {ShopProvider} from "~/context/ShopContext";
import SearchProvider from "~/context/SearchContext";
import LoginProvider from "~/context/LoginContext";

export async function loader({ request }: LoaderFunctionArgs) {
    const cartId = getCartId(request)
    try {
        const client = useClient(request)

        const [shop, cart] = await Promise.all([
            client.fetchShop(),
            cartId ? client.fetchCart(cartId) : null
        ])

        return { shop, cart }
    } catch (e) {
        console.error(cartId, getStoreId(request), e)
        throw e
    }
}

export function ErrorBoundary({ error }: any) {
    console.error(error);
    return (
        <html>
        <head>
            <title>Oh no!</title>
            <Meta />
            <Links />
        </head>
        <body>
            <div>Something went wrong...</div>
            <Scripts />
        </body>
        </html>
    );
}

export default function __layout() {
    const {shop, cart} = useLoaderData()
    const {snackBar} = useContext(SnackBarContext) as ISnackBarContext;

    return (
        <div className="App bg-theme-color-500 h-100 w-100">
            <CartProvider initialCart={cart}>
                <ShopProvider shop={shop}>
                    <SearchProvider>
                        <LoginProvider>
                            <div className={"flex flex-col min-h-screen gap-8"}>
                                <div className="relative mx-auto px-8 min-w-[90rem] max-w-[90rem] flex flex-col">
                                    <Navigation/>
                                    <Search/>
                                    <Outlet/>
                                </div>
                                <footer className={"text-white bg-gray-800 mt-auto"}>
                                    <div className={"border-t border-b border-gray-500 py-4"}>
                                        <div className="max-w-[90rem] flex flex-col justify-center mx-auto">
                                            <div className={"flex flex-row justify-between items-center"}>
                                                <img className={"w-16 aspect-square"} src={"/favicon.ico"} />
                                                <div className={"flex flex-row gap-4"}>
                                                    {shop.categories.map((c: ICategory) => (
                                                        <a key={c.id} href={`/category/${c.handle}`}>{c.title}</a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"flex flex-row py-4 justify-evenly items-center"}>
                                        <div>Copyright © {new Date().getFullYear()} {shop.title}. All Rights Reserved</div>
                                        <div>Not affiliated with Mojang</div>
                                    </div>
                                </footer>
                            </div>
                            {snackBar.map((alert: ISnackBarMessage) => {
                                return (
                                    <div className="fixed z-50 right-0 bottom-0">
                                        <Alert {...alert} />
                                    </div>
                                );
                            })}
                            <Cart />
                            <Login/>
                        </LoginProvider>
                    </SearchProvider>
                </ShopProvider>
            </CartProvider>
        </div>
    );
}
