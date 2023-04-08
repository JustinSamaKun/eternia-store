import { useState } from "react";

import { ItemDetails } from "../../../ItemDetails";
import { IFeature } from "../../types";
import {IProductInfo} from "~/utils/graphql";

const LENGTH = 125;

function extractContent(s: string, space: string) {
    var span= document.createElement('span');
    span.innerHTML= s;
    if(space) {
      var children= span.querySelectorAll('*');
      for(var i = 0 ; i < children.length ; i++) {
        if(children[i].textContent)
          children[i].textContent+= ' ';
        else
          children[i].innerHTML += ' ';
      }
    }
    return [span.textContent || span.innerText].toString().replace(/ +/g,' ');
  };

export const Feature = (props: IProductInfo) => {
    const { id, title, description, image, handle } = props;
    const [viewDetails, setViewDetails] = useState<boolean>(false);

    const extractedContent = extractContent(description, ' ');
    const trimmed = extractedContent.substring(0, LENGTH);
    return (
        <div className="grid grid-cols-2 gap-20">
            <div className="details">
                <h1 className="background-clip font-display text-m-h1 sm:text-d-h2 text-3xl md:text-5xl lg:text-[length:64px] xl:text-d-j font-black"><span className="title">{title}</span></h1>
                <div className="h-5" />
                <h2 className="w-[88%] text-custom-gray-300 text-md md:text-xl font-medium">{trimmed.substring(0, Math.min(trimmed.length, trimmed.lastIndexOf(" ")))}{extractedContent.length > LENGTH ? "..." : ""}</h2>
                <div className="h-7"/>
                <button className="button-hover text-custom-gray-100 button-background focus:outline-none focus:ring-4 font-black rounded-full text-md px-5 py-2.5 text-center mr-2 mb-2" onClick={() => setViewDetails(true)}>More Details</button>
            </div>
            <div className="image-holder relative flex items-center justify-center">
                <img
                    className="image"
                    src={image}
                    alt={title}
                />
            </div>
            <ItemDetails
                handle={handle}
                productId={id}
                viewDetails={viewDetails}
                setViewDetails={setViewDetails}
            />
        </div>
    )
}
