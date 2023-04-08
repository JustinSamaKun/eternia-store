import type { V2_MetaFunction } from "@remix-run/node";
import {LoaderFunctionArgs} from "@remix-run/router";
import {Alert, Login, Navigation} from '~/components';
import { SnackBarContext, ISnackBarMessage, ISnackBarContext } from '~/context/SnackBar';
import {Outlet} from "@remix-run/react";
import {useContext, useState} from "react";
import {cartCookie} from "~/utils/requests.server";
import {useClient} from "~/utils/graphql";
import {json} from "@remix-run/node";
import {Modal} from "~/components/Modal";

export const meta: V2_MetaFunction = ({data}) => {
  return [{
      title: data.shop.title
  }];
};

export async function loader({ request }: LoaderFunctionArgs) {
    const cartId = await cartCookie.parse(request.headers.get("Cookie"))
    const client = useClient(request)

    const [shop, cart] = await Promise.all([
        client.fetchShop(),
        cartId ? client.fetchCart(cartId) : {}
    ])

    return json({ shop, cart })
}

export default function Index() {
    const {snackBar} = useContext(SnackBarContext) as ISnackBarContext;
    const [login, setLogin] = useState(false)

    return (
        <div className="App bg-theme-color-500 h-100 w-100">
            <Modal open={login} onClose={() => setLogin(false)}>
                <Login/>
            </Modal>
            <Navigation showLogin={() => setLogin(true)}/>
            <Outlet/>
            {snackBar.map((alert: ISnackBarMessage) => {
                return (
                    <div className="fixed z-50 right-0 bottom-0">
                        <Alert {...alert} />
                    </div>
                );
            })}
        </div>
    );
}
