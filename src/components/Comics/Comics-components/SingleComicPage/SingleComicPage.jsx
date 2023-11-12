import React from "react";
import { useParams, Link, NavLink} from "react-router-dom";
import axios from "axios";

export const SingleComicsPage = () => {
    // const [comicsData, setComicsData] = React.useState(null);
    const [comic, setComic] = React.useState(null)
    const {comicsID} = useParams();

    React.useEffect(() => {
        const  FetchData = async () => {
            const comicsListResponse = await axios.get(`https://gateway.marvel.com:443/v1/public/comics/${comicsID}?apikey=c2c707041ac2c3a1f2a0791a1911d42b`);
            const result = comicsListResponse.data.data.results;
            setComic(result[0]);
       }

       FetchData();
    }, [comicsID]);

    return (
        <>
            <header className="header-block">
                <div className="header-top">
                    <span className="web-title"><span>Marvel</span>information portal</span>

                    <nav className="navigation">
                        <ul className="navigation-list">
                            <li>
                                <NavLink to={"/"} activeClassName={'active'} className={"menu-btn bnt-after"}>Characters</NavLink>
                            </li>

                           <li>
                                <NavLink to={"/comics"} activeClassName={'active'} className="menu-btn comics-btn">Comics</NavLink>
                            </li> 
                        </ul>
                    </nav>
                </div>
            </header>

            <ComicssView comic={comic}/>  
        </>
    )
}

const ComicssView = ({comic}) => {
    
    return (
    <div className="comics-detail">
        <img width={293} height={450} src={comic?.thumbnail.path + "." + comic?.thumbnail.extension } alt="Comics img" className="comics-img"/>

        <div className="comics-detail-description">
             <h2 className="comics-title">{comic?.title}</h2>
             <p className="description-info description-text">{comic?.description === null || "" ? "Comic description missing" : comic?.description}</p>
             <span className="pages-qty description-text">{comic?.pageCount + " pages"}</span>
             <span className="language description-text">Language: en-us</span>
             <span className="comics-price description-text">{comic?.prices[0].price === 0 ? "Out of stock" : comic?.prices[0].price + "$"}</span>
        </div>
        <Link to={"/comics"} className="step-back-btn">Back to all</Link>
     </div>
    )
}