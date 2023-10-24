import React from "react";
import { ChosemCharComiscList } from "./chosen-char-comics-list/ChoseChar-comics-list"
import { CharFilter } from "../char-filter/Char-filter";

export const ChoseCharInfo = ({chosenCharData, onFilter, }) => {
const description = chosenCharData ? chosenCharData.description : null;

    return ( 
        <div  className="chosen-char-info">
                <div className="choosen-char">
                    <div className="header">
                        <div className="header-left">
                            <img width={150} height={150} src={chosenCharData ? chosenCharData.thumbnail.path + '.' + chosenCharData.thumbnail.extension : "img/loki.svg" }alt="" />
                        </div>
                        <div className="header-right">
                            <h2>{chosenCharData ? chosenCharData.name : "Char Name"}</h2>

                            <div className="action-btn">
                            <button className="main-btn-class"><a href={chosenCharData?.urls[0].url} target="_blank" rel="noreferrer">HOMEPAGE</a></button>
                            <button className=" main-btn-class"><a href={chosenCharData?.urls[1].url} target="_blank" rel="noreferrer">WIKI</a></button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="body">
                        <div className="char-legend">
                          {description === ' ' || description === '' ?  'Character without any description. He will get one in close time' : description}
                        </div>

                        <ChosemCharComiscList comicsList={chosenCharData?.comics} />
                    </div>
                </div>

                <CharFilter  filterMethod={onFilter} />
            </div>
    )
}