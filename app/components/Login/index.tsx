import { useState, useContext, useEffect } from "react";
import { CartContext, ICartContext } from "../../context/CartContext";
import { useMutation } from "urql";

import { LoginContext, ILoginContext } from "../../context/LoginContext";
import {useClient} from "~/utils/graphql";

export interface IUser {
    username: string;
    id: string;
}

export function getUserFromName(username: string): Promise<[string | undefined, string | undefined]> {
    return fetch(
        `https://playerdb.co/api/player/minecraft/${username}`,
        {
            mode: "cors"
        })
        .then(out => out.json())
        .catch(e => { return {} as any })
        .then(res => {
            const id = res?.data?.player?.id
            const name = res?.data?.player?.username
            if (id && name && name.toLowerCase() === username.toLowerCase()) {
                return [name, id];
            }
            return [undefined, undefined];
        });
}

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

        const user = getUserFromName(input);
        user.then(([name, id]) => {
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

    return (
        <section className="relative w-full h-full mx-auto max-w-2xl flex justify-center items-center">
            <div className="bg-white rounded-xl p-14">
                <h1>Login</h1>
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
