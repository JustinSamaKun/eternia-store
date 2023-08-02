import {LoaderFunctionArgs} from "@remix-run/router";
import {useLoaderData} from "@remix-run/react";
import {useClient, getClient, asFragment} from "~/utils/graphql";
import {json, redirect} from "@remix-run/node";
import {ItemCard} from "~/components/ItemCard";
import {useState} from "react";
import {CATEGORY_QUERY, IProduct, ProductInfo} from "~/graphql/shop";
import {FragmentType, useFragment} from "~/graphql/generated";
import Header from "~/components/Header";
import Content from "~/components/Content";
import {getCartId} from "~/utils/requests.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const client = getClient(request)

    const handle = params.categoryId

    if (!handle) return redirect('/')

    return json({
        category: await client.query(CATEGORY_QUERY, { category: handle, cart: getCartId(request) }).then(r => r.categoryByHandle)
    })
}

const sortFunctions: {[key: string]: (a: IProduct, b: IProduct) => number} = {
    price: (a, b) => parseFloat(b.price.price) - parseFloat(a.price.price),
    name: (a, b) => a.title.localeCompare(b.title)
}

export default function Category() {
    const {category} = useLoaderData<typeof loader>()
    const [sort, setSort] = useState<string>('default')
    const [selectedRanges, setSelected] = useState<number[]>([])

    if (!category) {
        // 404 page?
        return <div/>
    }

    const ranges = [
        [0, 10],
        [10, 25],
        [25, 50],
        [50, undefined]
    ]

    let products = category.products
        .map(p => asFragment(p, ProductInfo))
        .filter((p) =>
            selectedRanges.length === 0 ||
            selectedRanges
                .map(v => ranges[v])
                .filter(([min, max]) => (min === undefined || parseFloat(p.price.price) >= min) && (max === undefined || parseFloat(p.price.price) <= max))
                .length > 0
        )

    if (sort !== 'default') {
        products = products.sort(sortFunctions[sort])
    }

    return (
        <>
            <Header>
                <div className={"flex flex-row py-10 justify-center"}>
                    <div className={"flex flex-col gap-4"}>
                        <h1 className={"text-3xl"}>{category.title}</h1>
                        <h3 className={"text-gray-900"} dangerouslySetInnerHTML={{__html: category.description}}/>
                    </div>
                </div>
            </Header>
            <Content>
                <div className={"flex flex-row flex-1 gap-20"}>
                    <div className={"flex flex-col w-60 gap-4"}>
                        <div className={"flex flex-row justify-between"}>
                            <span>Sort by</span>
                            <select className={"bg-transparent border-b border-white"} value={sort}
                                    onChange={({target: {value}}) => setSort(value)}>
                                <option value={'default'}>Default</option>
                                <option value={"price"}>Price</option>
                                <option value={"name"}>Name</option>
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
                                <ItemCard product={product}/>
                            ))}
                        </div>
                    </div>
                </div>
            </Content>
        </>
    )
}
