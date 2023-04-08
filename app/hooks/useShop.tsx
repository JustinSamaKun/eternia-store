import {Shop} from "~/utils/graphql";
import {useRouteLoaderData} from "react-router";

export default function useShop(): Shop {
    const { shop } = useRouteLoaderData('index') as any;
    return shop
}
