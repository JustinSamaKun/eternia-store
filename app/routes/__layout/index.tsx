import {Cart, Search, Slider} from "~/components";
import React from "react";
import {json, V2_MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {useClient} from "~/utils/graphql";

export async function loader({ request }: LoaderFunctionArgs) {
    const client = useClient(request)

    return json({
        featured: await client.fetchProductsByTag('slideshow')
    })
}

export default function homepage() {
    const { featured } = useLoaderData()
    return (
        <>
            <Slider featured={featured} />
        </>
    )
}