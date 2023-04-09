import {LoaderFunctionArgs} from "@remix-run/router";
import {useLoaderData} from "@remix-run/react";
import {ICategory, ICategoryInfo, useClient} from "~/utils/graphql";
import {json, redirect} from "@remix-run/node";
import {ItemCard} from "~/components/ItemCard";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const client = useClient(request)

    const handle = params.categoryId

    if (!handle) return redirect('/')

    return json({
        category: await client.fetchCategoryByHandle(handle)
    })
}

export default function Category() {
    const { category } = useLoaderData() as { category: ICategoryInfo }

    console.log(category)

    return (
        <div className={"flex flex-col flex-1 text-white"}>
            <div className={"flex flex-row py-10 justify-center"}>
                <div className={"flex flex-col gap-4"}>
                    <h1 className={"text-3xl"}>{category.title}</h1>
                    <h3 className={"text-gray-900"}>{category.description}</h3>
                </div>
            </div>
            <div className={"flex flex-row flex-1 gap-20"}>
                <div className={"flex flex-col w-60 gap-2"}>
                    <div className={"flex flex-row justify-between"}>
                        <span>Sort by</span>
                        <select className={"bg-transparent border-b border-white"}>
                            <option>Default</option>
                            <option>Price</option>
                            <option>Name</option>
                        </select>
                    </div>
                    <h3 className={"text-lg"}>Filters</h3>

                </div>
                <div className={"flex flex-col flex-3"}>
                    <div className={"flex flex-row flex-1 flex-wrap gap-2"}>
                        {category.products.map(product => (
                            <ItemCard product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}