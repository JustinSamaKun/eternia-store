import { useContext, useEffect, useMemo, useState } from 'react';
import { CartIcon } from '../CartIcon';
import { CartContext, ICartContext } from "../../context/CartContext";
import { Link } from 'react-router-dom';
import { ISearchContext, SearchContext } from '../../context/SearchContext';
import useShop from "~/hooks/useShop";
import {ILoginContext, LoginContext} from "~/context/LoginContext";

export const Navigation = () => {
    const shop = useShop()

    const { cart, updateCartOpen, updateCart } = useContext(CartContext) as ICartContext;
    const { setShowLogIn } = useContext(LoginContext) as ILoginContext
    const { openSearchModal } = useContext(SearchContext) as ISearchContext;

    const handleLogout = () => {
        updateCart(null);
    }

    const handleCartClick = () => {
        if (!cart) {
            setShowLogIn(true);
            return;
        }
        updateCartOpen(true);
    }

    return (
        <div>
            <header className="py-3 flex flex-row justify-between items-center text-white">
                <Link x-comp="NavLink" aria-label="Remix" aria-current="page" className="active" to="/">
                    {shop.branding?.logo ? (
                        <img
                            className="object-contain fadeIn invisible md:visible h-20 w-48"
                            src={shop.branding?.logo}
                            alt={shop.title}
                        />
                    ) : (
                        <div>{shop.title}</div>
                    )}
                </Link>
                <div className="flex fadeIn" aria-label="Main">
                    <Link x-comp="HeaderLink" to={"/"} className="text-d-p-sm mx-2 sm:mx-4 text-[16px] md:text-lg last:mr-0 hover:opacity-100 font-bold text-custom-gray-600 hover:text-custom-gray-200 hover:cursor-pointer">Home</Link>
                    {shop.categories.sort((a, b) => a.order > b.order ? 1 : -1).map((category) => {
                        return (
                            <a key={category.id} x-comp="HeaderLink" href={`/category/${category.handle}`} className="text-d-p-sm mx-2 sm:mx-4 text-[16px] md:text-lg last:mr-0 text-custom-gray-600 hover:text-custom-gray-200 font-bold hover:cursor-pointer">{category.title}</a>
                        )
                    })}
                </div>
                <div className="float-right flex flex-row items-center">
                    {/*<a className="cursor-pointer mr-6" onClick={() => openSearchModal(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </a>*/}
                    <a className="cursor-pointer mr-5" onClick={handleCartClick}>
                        <CartIcon />
                    </a>
                    {
                        !cart ?
                            <button x-comp="PrimaryButtonLink" onClick={() => setShowLogIn(true)} className="button-background inline-flex items-center cursor-pointer justify-center h-11 box-border rounded-full focus:outline-none font-black text-white-500 hover:bg-opacity-100 hover:text-custom-white-500 focus:bg-opacity-100 focus:text-custom-white-500 w-[90px] md:w-[118px] transition-colors duration-200 xl:order-1">Login</button>
                            : <button x-comp="PrimaryButtonLink" onClick={() => handleLogout()} className="button-background inline-flex items-center cursor-pointer justify-center h-11 box-border rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent font-black text-white-500 hover:bg-opacity-100 hover:text-custom-white-500 focus:bg-opacity-100 focus:text-custom-white-500 w-[90px] md:w-[118px] transition-colors duration-200 xl:order-1">Logout</button>
                    }
                </div>
            </header>
        </div>
    )
}
