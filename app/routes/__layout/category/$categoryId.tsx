import {LoaderFunctionArgs} from "@remix-run/router";
import {useLoaderData} from "@remix-run/react";
import {ICategory, ICategoryInfo, IProduct, useClient} from "~/utils/graphql";
import {json, redirect} from "@remix-run/node";
import {ItemCard} from "~/components/ItemCard";
import {useState} from "react";

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
    const [sort, setSort] = useState<(a: IProduct, b: IProduct) => number>()
    const [selectedRanges, setSelected] = useState<number[]>([])
    const [priceMin, setPriceMin] = useState<number>()
    const [priceMax, setPriceMax] = useState<number>()

    const ranges = [
        [0, 10],
        [10, 25],
        [25, 50],
        [50, undefined]
    ]

    let products = category.products
        .filter(p => priceMin === undefined || parseFloat(p.price.price) >= priceMin)
        .filter(p => priceMax === undefined || parseFloat(p.price.price) <= priceMax)

    if (sort) {
        products = products.sort(sort)
    }

    return (
        <div className={"flex flex-col flex-1 text-white"}>
            <div className={"flex flex-row py-10 justify-center"}>
                <div className={"flex flex-col gap-4"}>
                    <h1 className={"text-3xl"}>{category.title}</h1>
                    <h3 className={"text-gray-900"}>{category.description}</h3>
                </div>
            </div>
            <div className={"flex flex-row flex-1 gap-20"}>
                <div className={"flex flex-col w-60 gap-4"}>
                    <div className={"flex flex-row justify-between"}>
                        <span>Sort by</span>
                        <select className={"bg-transparent border-b border-white"}>
                            <option>Default</option>
                            <option>Price</option>
                            <option>Name</option>
                        </select>
                    </div>
                    <div className={"flex flex-col w-60 gap-2"}>
                        <h3 className={"text-lg"}>Price Range</h3>
                        {ranges.map((range, i) => (
                            <button
                                className={`text-left hover:text-primary ${selectedRanges.includes(i) ? 'text-primary' : ''}`}
                                onClick={() => {
                                    if (selectedRanges.includes(i)) {
                                        setSelected(selectedRanges.filter(j => j !== i))
                                    } else {
                                        setSelected([...selectedRanges, i])
                                    }
                                    setPriceMin(selectedRanges.map(r => ranges[r][0]).reduce((a, b) => !a || !b ? undefined : Math.min(a, b)))
                                    setPriceMax(selectedRanges.map(r => ranges[r][1]).reduce((a, b) => !a || !b ? undefined : Math.max(a, b)))
                                }}
                            >
                                {range[1] ? `$${range[0]} to $${range[1]}` : `$${range[0]}+`}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={"flex flex-col flex-3"}>
                    <div className={"flex flex-row flex-1 flex-wrap gap-2"}>
                        {products.map(product => (
                            <ItemCard product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
