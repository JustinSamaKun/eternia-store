import {Link} from "react-router-dom";
import {useLocation} from "@remix-run/react";

export default function HeaderLink({ to, children }: { to: string, children: string }) {
    const location = useLocation()

    return (
        <div className={"relative"}>
            <Link
                x-comp="HeaderLink"
                to={to}
                className={`relative z-40 ${location.pathname === to ? "text-white" : "text-gray-200"} hover:cursor-pointer`}
            >
                {children}
            </Link>
            {location.pathname === to && (
                <div className={"active"} />
            )}
        </div>
    )
}
