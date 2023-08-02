import {useState, useEffect, useCallback} from "react";
import { Feature } from "./components/Feature";
import {SlideshowProductQuery} from "~/graphql/generated/graphql";


export const Slider = ({ featured }: { featured: Required<SlideshowProductQuery['productByID'][]> }) => {
    const [page, setPage] = useState<number>(0);
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handlePageChange = useCallback((page: number) => setPage((page + featured.length) % featured.length), [featured]);

    useEffect(() => {
        if (featured.length === 0) return
        if (timer) clearTimeout(timer);

        setTimer(setTimeout(() => handlePageChange(page + 1), 5000));

        return () => {
            clearTimeout(timer);
        }
    }, [page, handlePageChange, featured]);

    if (featured.length === 0) return <></>

    return (
        <section className="flex flex-col justify-center h-[32rem]">
            <div className={"flex flex-row justify-between items-center"}>
                <button className="z-30 button rounded-full aspect-square text-white p-2" onClick={() => handlePageChange(page - 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="white" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"/>
                    </svg>
                </button>
                <button className="z-30 button rounded-full aspect-square text-white p-2" onClick={() => handlePageChange(page + 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="white" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                    </svg>
                </button>
            </div>
            <div style={{translate: `-${page * 100}vw`}} className={"absolute left-0 flex flex-row transition-all"}>
                {featured.map((feature, i: number) => {
                    return (
                        <div key={i} className={"w-[100vw]"}>
                            <Feature
                                {...feature}
                            />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
