import React from "react";
import {Navigation} from "~/components/Header/Navigation";

export default function Header({ children }: { children: any }) {
    return (
        <div className={"mb-20 relative overflow-hidden"}>
            <div className="relative z-10 flex flex-col text-white">
                <div className={"mx-auto px-8 min-w-[90rem] max-w-[90rem] "}>
                    <Navigation/>
                    {children}
                </div>
            </div>
            <div className={"absolute"} style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(101, 89, 254, 0.27) 0%, rgba(101, 89, 254, 0) 100%)", top: '-700px', left: '-1298px', width: '1825px', height: '1470px' }}/>
            <div className={"absolute"} style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(101, 89, 254, 0.27) 0%, rgba(101, 89, 254, 0) 100%)", top: '-400px', right: '-1298px', width: '1825px', height: '1470px' }}/>
            <div className={"absolute"} style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(101, 89, 254, 0.27) 0%, rgba(101, 89, 254, 0) 100%)", top: '-800px', right: '400px', width: '1825px', height: '1470px' }}/>
        </div>
    )
}
