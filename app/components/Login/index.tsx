import { useState, useContext } from "react";
import { CartContext, ICartContext } from "../../context/CartContext";

import { LoginContext, ILoginContext } from "../../context/LoginContext";
import {useClient} from "~/utils/graphql";
import {CART_CREATE, USER_QUERY} from "~/graphql/cart";

export const Login = () => {
    const { cartID, updateCart } = useContext(CartContext) as ICartContext;
    const { showLogIn, setShowLogIn } = useContext(LoginContext) as ILoginContext;
    const client = useClient()

    const [input, setInput] = useState<string>("");
    const [loginError, setLoginError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = (): void => {
        if (cartID != null) {
            setLoginError("You are already logged in.");
            return;
        }
        setLoading(true);

        client.query(USER_QUERY, {user: input})
            .then(r => r.user)
            .then(user => {
                if (!user) {
                    setLoginError("Please enter a valid username.");
                    return;
                }
                const {name, id} = user
                client.mutation(CART_CREATE, {ign: name, uuid: id})
                    .then(c => updateCart(c.cartCreate))
                    .then(() => setShowLogIn(false))
                    .finally(() => setLoading(false))
            });
    };

    if (!showLogIn) return <></>

    return (
        <>
            <div className={"z-40 absolute inset-0 backdrop-blur-lg bg-gray-200 opacity-10"} onClick={() => setShowLogIn(false)}/>
            <section className={"z-40 fixed inset-0 w-1/3 ml-auto overflow-auto overflow-hidden transition-all"}>
                <div className={"h-full flex ml-auto bg-card-background-500 drop-shadow-xl border-l border-l-gray-500"}>
                    <div className={"p-8 flex flex-col flex-1 gap-4"}>
                        <h1 className={"font-medium text-xl text-white"}>Please login to continue</h1>
                        <div className={"flex flex-row gap-2 items-center"}>
                            <input
                                className="rounded-sm px-2 py-1 text-black"
                                placeholder="Enter your username"
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button disabled={loading} className="rounded-sm px-8 py-1 bg-agora-300 text-agora-500" onClick={() => handleLogin()}>{loading ? "Loading..." : "Login"}</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
