import React from "react";
import {Shop} from "~/utils/graphql";

export interface IShopContext {
    shop: Shop
}

export const ShopContext = React.createContext<IShopContext>({ shop: {} as any as Shop });

export const ShopProvider = ({ children, shop }: any) => {
    return (
        <ShopContext.Provider value={{ shop }}>
            {children}
        </ShopContext.Provider>
    )
}
