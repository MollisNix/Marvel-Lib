import "./comics.scss";
import React from "react";
import { FetchData } from "../services/query-functions";
import { loadDataPattern } from "../services/query-functions";
import { ComicsItem } from "./comics-item/ComicsItem";
export const Comics = () => {
    const [comicsList, setComicsList] = React.useState();
    const [scrollPos, setScrollPos] = React.useState(false);
    const [comicsListOffset, setComicsListOffset] = React.useState(10);
React.useEffect(() => {
    FetchData("https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=210&apikey=c2c707041ac2c3a1f2a0791a1911d42b", setComicsList)
}, []);

React.useEffect(() => {
    const infinityLoad = () => {
        const isBottomReached = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
                setScrollPos(true);
            }
        }
        
        window.addEventListener("scroll", isBottomReached);
    }

    infinityLoad();
    
    if (scrollPos) loadDataPattern("https://gateway.marvel.com:443/v1/public/comics?limit=8&", "&apikey=c2c707041ac2c3a1f2a0791a1911d42b", comicsListOffset, 8, setComicsListOffset, setComicsList, setScrollPos);
}, [scrollPos, comicsListOffset]);

    return (
        <div className="comics-page">
            <div className="comics-wrapper">
            <ComicsItem comicsList={comicsList} />
            </div>
        </div>
    )
}