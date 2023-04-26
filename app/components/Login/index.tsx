import { useState, useContext, useEffect } from "react";
import { CartContext, ICartContext } from "../../context/CartContext";
import { useMutation } from "urql";

import { LoginContext, ILoginContext } from "../../context/LoginContext";
import {useClient} from "~/utils/graphql";

export const Login = () => {
    const { cartID, cart, updateCart } = useContext(CartContext) as ICartContext;
    const { showLogIn, setShowLogIn } = useContext(LoginContext) as ILoginContext;
    const client = useClient()

    const [input, setInput] = useState<string>("");
    const [loginError, setLoginError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = (): void => {
        if (cartID != null) {
            setLoginError("You are already logged in.");
            return;
        }
        setLoading(true);

        client.fetchUser(input).then(user => {
            if (!user) {
                setLoginError("Please enter a valid username.");
                return;
            }
            const {name, id} = user
            client.createCart(name, id)
                .then(c => updateCart(c))
                .then(() => setSuccess("Successfully logged in!"))
                .then(() => setTimeout(() => setShowLogIn(false), 3000))
                .finally(() => setLoading(false))
        });
    };

    if (!showLogIn) return <></>

    return (
        <section className={"fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center "}>
            <div className={"w-[40rem] z-40 p-14 rounded-lg border border-gray-500 bg-gray-800 text-customn-white-200"}>
                <h1>Please login to continue</h1>
                <div className={"flex flex-row gap-2 items-center"}>
                    <input
                        className="rounded-sm px-2 py-1"
                        placeholder="Enter your username"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button disabled={loading} className="rounded-sm px-8 py-1 bg-agora-300 text-agora-500" onClick={() => handleLogin()}>{loading ? "Loading..." : "Login"}</button>
                </div>
                <span>{loginError !== "" ? loginError : success}</span>
            </div>
            <div className={"absolute top-0 right-0 left-0 bottom-0 backdrop-blur-lg bg-gray-200 opacity-10"} onClick={() => setShowLogIn(false)}/>
        </section>
    )
}
