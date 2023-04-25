import { useState, useEffect } from "react";
import { Feature } from "./components/Feature";

import {IProductInfo, useClient} from "~/utils/graphql";


export const Slider = ({ featured }: { featured: IProductInfo[] }) => {

    const [page, setPage] = useState<number>(0);
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        if (timer) clearTimeout(timer);

        setTimer(setTimeout(() => handlePageChange(page + 1), 5000));

        return () => {
            clearTimeout(timer);
        }
    }, [page]);
    const handlePageChange = (page: number) => setPage((page + featured.length) % featured.length);

    return (
        <section className="slideshow">
            {featured.map((feature: IProductInfo, i: number) => {
                    return (
                        <div key={i} className={"content w-full" + (i < page ? " before" : i > page ? " after" : "")}>
                            <Feature
                                {...feature}
                            />
                        </div>
                    )
            })}
            <div className="buttons flex flex-row">
                <button className="mr-3" onClick={() => handlePageChange(page - 1)}>
                    <svg onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isHovered ? "#F0F0F0" : "#E0E8FE"}  className="w-10 h-10">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className="flex flex-row justify-center items-center">
                    {featured.map((feature: IProductInfo, i: number) => {
                        return (
                            <>
                            { // TODO put color for selected
                                page === i ? <div className="bg-custom-gray-200 ml-1 mr-1 rounded-full w-1 h-1"/>
                                    : <div className="bg-custom-gray-700 ml-1 mr-1 rounded-full w-1 h-1"/>
                            }
                            </>
                        )
                    })}
                </div>
                <button className="ml-3" onClick={() => handlePageChange(page + 1)}>
                    <svg onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isHovered ? "#F0F0F0" : "#E0E8FE"} className="w-10 h-10">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </section>
    )
}
