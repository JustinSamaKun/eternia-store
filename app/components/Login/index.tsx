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

        client.fetchUser(input).then(({name, id}) => {
            if (name === undefined || id === undefined) {
                setLoginError("Please enter a valid username.");
                return;
            }
            client.createCart(name, id)
                .then(c => updateCart(c))
                .then(r => setSuccess("Successfully logged in!"))
                .finally(() => setLoading(false))
        });
    };

    if (!showLogIn) return <></>

    return (
        <section className={"fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center"}>
            <div className={"absolute top-0 right-0 left-0 bottom-0 blur-lg"}/>
            <div className={"w-[40rem] p-14 rounded-lg border-gray-500 bg-gray-800 text-customn-white-200"}>
                <h1>Please login to continue</h1>
                <input
                    className=""
                    placeholder="Enter your username"
                    onChange={(e) => setInput(e.target.value)}
                />
                <span>{loginError !== "" ? loginError : success}</span>
                <button disabled={loading} className="rounded-lg p-5 bg-agora-300 text-agora-500" onClick={() => handleLogin()}>{loading ? "Loading..." : "Login"}</button>
            </div>
        </section>
    )
}
