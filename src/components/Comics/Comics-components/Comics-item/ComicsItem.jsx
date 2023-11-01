import React from "react";
import { ComicsDetail } from "./Comics-detail/ComicsDetail";

export const ComicsItem = ({comicsList}) => {
    const [isComicsChosen, setIsComicsChosen] = React.useState(false);
    const [comicsDetailData, setComicsDetailData] = React.useState();
    
    const onComicsClick = (e) => {
        setIsComicsChosen(true)

        const comicsID = comicsList.find(item => Number(item.id) === Number(e.target.id));
            setComicsDetailData(comicsID)
    }

    if (isComicsChosen) {
        document.querySelector('.comics-wrapper')?.classList.add("display-block");
    } else {
        document.querySelector('.comics-wrapper')?.classList.remove("display-block")
    }
    
    const backToAllHandler = () => {
        setIsComicsChosen(false)
    }

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