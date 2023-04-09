import {Shop} from "~/utils/graphql";
import {useContext} from "react";
import {ShopContext} from "~/context/ShopContext";

export default function useShop(): Shop {
    const { shop } = useContext(ShopContext);
    return shop
}
