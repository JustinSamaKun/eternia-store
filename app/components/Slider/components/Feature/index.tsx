import React, { useState } from "react";

const LENGTH = 125;

export const Feature = (props: any) => {
    const { id, title, description, image, handle } = props;
    const [viewDetails, setViewDetails] = useState<boolean>(false);

    const trimmed = description
        .replace(/<\/?[^>]*>/g, '')
        .substring(0, LENGTH);
    return (
        <div className="flex flex-row flex-1 items-center justify-center">
            <div className="w-[30rem] flex flex-col gap-8">
                <div className={"flex flex-col gap-2"}>
                    <h1 className="text-m-h1 sm:text-d-h2 text-3xl md:text-5xl font-bold text-white">
                        {title}
                    </h1>
                    <h2 className="w-[88%] text-custom-gray-300 text-md md:text-xl font-medium" dangerouslySetInnerHTML={{
                        __html: `${trimmed.substring(0, Math.min(trimmed.length, trimmed.lastIndexOf(" ")))}${description.length > LENGTH ? "..." : ""}`
                    }} />
                </div>
                <div>
                    <button className="button rounded-full px-8 py-2 text-medium" onClick={() => setViewDetails(true)}>
                        More Details
                    </button>
                </div>
            </div>
            <div className="items-center w-[30rem] justify-center">
                <img
                    className="image"
                    src={image}
                    alt={title}
                />
            </div>
        </div>
    )
}
