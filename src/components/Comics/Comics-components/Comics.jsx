import "./comics.scss";
import React from "react";
import { FetchData } from "../../../assets/services/query-functions";
import { loadDataPattern } from "../../../assets/services/query-functions";



export const Comics = () => {
    const [comicsList, setComicsList] = React.useState();
    const [scrollPos, setScrollPos] = React.useState(false);
    const [comicsListOffset, setComicsListOffset] = React.useState(10);
    const [isComicsChosen, setIsComicsChosen] = React.useState(false);
    const [comicsDetailData, setComicsDetailData] = React.useState();
    
    const onComicsClick = (e) => {
        setIsComicsChosen(true)

        const comicsID = comicsList.find(item => Number(item.id) === Number(e.target.id));
        setComicsDetailData(comicsID)
    }

    const backToAllHandler = () => {
        setIsComicsChosen(false)
    }

    const wrapperRef = React.useRef(null);

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
        <>
            <div className="comics-page">
                <div className={isComicsChosen ? "comics-wrapper display-block" : "comics-wrapper"}>
                     <ComicsItem 
                        comicsList={comicsList}  
                        onComicsClick={onComicsClick}
                        backToAllHandler={backToAllHandler} 
                        comicsDetailData={comicsDetailData}
                        isComicsChosen={isComicsChosen}
                      />
                </div>
            </div>
        </>
        
    )
}


const ComicsItem = ({comicsList, onComicsClick, backToAllHandler, comicsDetailData, isComicsChosen}) => {
    return (
        <>
             {!isComicsChosen ? comicsList?.map((comics, i) => {
                return (
                <div key={i}  className="comics-item">
                    <img className="comics-avatar" id={comics.id} width={225} height={346} src={comics.thumbnail.path + "." + comics.thumbnail.extension } alt="Comics img"  onClick={onComicsClick}/>
                    <div className="item-info">
                        <h2 className="comics-name">{comics.title}</h2>
                        <span className="comics-price description-text">{comics.prices[0].price === 0 ? "Out of stock" : comics.prices[0].price + "$"}</span>
                    </div>
                </div>
                )
            }) : <ComicsDetail comicsDetailData={comicsDetailData} backToAllHandler={backToAllHandler}/>}
        </>
       
    )
}


const ComicsDetail = ({comicsDetailData, backToAllHandler}) => {
    return (
     <div className="comics-detail">
        <img width={293} height={450} src={comicsDetailData?.thumbnail.path + "." + comicsDetailData?.thumbnail.extension } alt="Comics img" className="comics-img"/>

        <div className="comics-detail-description">
             <h2 className="comics-title">{comicsDetailData.title}</h2>
             <p className="description-info description-text">{comicsDetailData.description === null || "" ? "Comic description missing" : comicsDetailData.description}</p>
             <span className="pages-qty description-text">{comicsDetailData.pageCount + " pages"}</span>
             <span className="language description-text">Language: en-us</span>
             <span className="comics-price description-text">{comicsDetailData.prices[0].price === 0 ? "Out of stock" : comicsDetailData.prices[0].price + "$"}</span>
        </div>
        <button className="step-back-btn" onClick={backToAllHandler}>Back to all</button>
     </div>
    )
}