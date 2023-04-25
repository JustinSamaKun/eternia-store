import {LoaderFunctionArgs} from "@remix-run/router";
import {useClient} from "~/utils/graphql";
import {redirect} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import useShop from "~/hooks/useShop";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const client = useClient(request)

    const handle = params.productid

    if (!handle) return redirect('/')

    return {
        product: await client.fetchProductByHandle(handle)
    }
}

export default function Product() {
    const { product } = useLoaderData()
    const shop = useShop()

    // need ideas
    return (
        <div />
    )
}