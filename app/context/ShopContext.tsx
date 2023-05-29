import React from "react";
import {ShopQuery} from "~/graphql/generated/graphql";


export const ShopContext = React.createContext<ShopQuery>({ shop: {} as any as ShopQuery["shop"] });

export const ShopProvider = ({ children, shop }: any) => {
    return (
        <ShopContext.Provider value={{ shop }}>
            {children}
        </ShopContext.Provider>
    )
}
