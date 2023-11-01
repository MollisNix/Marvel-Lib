import React from "react";
import axios from 'axios'

export const HeaderBottom = () => {
    const [randomChar, setRandomChar] = React.useState();
    const [isChosenRandom, setIsChosenRandom] = React.useState(false);
    
    const fetchRandomCharacter = async () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        const randomChar = await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=c2c707041ac2c3a1f2a0791a1911d42b`);
       
       return randomChar.data.data.results.map(item => {
            return setRandomChar(item);
        }) 
    }
    
    const onClickRandom = () => {
        setIsChosenRandom(true)
        fetchRandomCharacter()
    }

    const descriptionCondition = isChosenRandom ?  randomChar?.description === '' || randomChar?.description === ' ' ? "Character without desctiption"
        : randomChar?.description 
        : `As the Norse God of thunder and lightning, 
        Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir.
         While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...`;

    return (
        <div className="header-bottom">

                <div className="random-char-info">
                    <div className="char-info-img-block">
                        <img 
                            width={180}  height={180} className="char-img" 
                            src={randomChar ? randomChar.thumbnail.path + '.' + randomChar.thumbnail.extension : 'img/Thumbnail.svg'} 
                            alt="Random char img" />
                    </div>
                        
                    <div className="char-content">
                        <h1 className="char-name">
                            {randomChar ? randomChar.name : "THOR"}
                        </h1>
                        <p className="char-legend">
                            {descriptionCondition}
                        </p>
                        <div className="action-btn">
                            <button className="regular-btn main-btn-class"><a href={randomChar?.urls[0].url} target="_blank" rel="noreferrer">HOMEPAGE</a></button>
                            <button className="external-sours-btn main-btn-class"><a href={randomChar?.urls[1].url} target="_blank" rel="noreferrer">WIKI</a></button>
                        </div>
                    </div>

                </div>

                <div className="tick-random-section">
                    <p>
                        Random character for today!
                        Do you want to get to know him better?
                    </p>
                    <p>
                        Or choose another one
                    </p>
                    <button className="tick-random-char-btn "
                        onClick={onClickRandom}
                    >
                        TRY IT
                    </button>
                    <img  height={189} width={202} className="tich-bg-img" src="img/Decoration.svg" alt="Decoration img"/>   
                </div>
            </div>
    )
}