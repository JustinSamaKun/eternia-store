import React from "react";

export default function Content({ children }: { children: any }) {
    return (
        <div className="mx-auto px-8 min-w-[90rem] max-w-[90rem] flex flex-col gap-20 text-stone-100">
            {children}
        </div>
    )
}
