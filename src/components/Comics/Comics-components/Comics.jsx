import "./comics.scss";
import React from "react";
import axios from "axios";
import { loadDataPattern } from "../../../assets/services/query-functions";
import {Link} from "react-router-dom"


export const Comics = () => {
    const [comicsList, setComicsList] = React.useState();
    const [scrollPos, setScrollPos] = React.useState(false);
    const [comicsListOffset, setComicsListOffset] = React.useState(10);

    // dinamyc content
    React.useEffect(() => {
        // FetchData("https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=210&apikey=c2c707041ac2c3a1f2a0791a1911d42b", setComicsList)
        const  FetchData = async () => {
            const comicsListResponse = await axios.get("https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=210&apikey=c2c707041ac2c3a1f2a0791a1911d42b");
            setComicsList(comicsListResponse.data.data.results);
       }

       FetchData();
    }, []);

    // infinity load
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


    const comicsItem =  comicsList?.map((comics, i) => {
        return (
        <li key={i}  className="comics-item">
            <Link to={`/comics/${comics.id}`} >
                <img 
                    className="comics-avatar"
                    id={comics.id} width={225} 
                    height={346} src={comics.thumbnail.path + "." + comics.thumbnail.extension } 
                    alt="Comics img"  
                    />
                <div className="item-info">
                    <h2 className="comics-name" >{comics.title}</h2>
                    <span className="comics-price description-text">{comics.prices[0].price === 0 ? "Out of stock" : comics.prices[0].price + "$"}</span>
                </div>
            </Link>
           
        </li>
        )
    }) ;

    return (
            <div className="comics-page">
                <ul className={"comics-wrapper"}>
                    {comicsItem}
                </ul>
            </div>
    )
}