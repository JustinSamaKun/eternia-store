import {useContext} from "react";
import {ShopContext} from "~/context/ShopContext";

export default function useShop() {
    const { shop } = useContext(ShopContext);
    return shop
}
