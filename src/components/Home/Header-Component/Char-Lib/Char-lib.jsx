import React from 'react';
import { FetchData } from '../../../../assets/services/query-functions';
import { CharCard } from './Char-card/Char-card';
import { ChoseCharInfo } from './Chosen-char-info/Chosen-char-info';
import { loadDataPattern } from '../../../../assets/services/query-functions';
import './char-lib.scss'


export const CharLib = () => {
    const [charList, setCharList] = React.useState();

    const [charsOffset, setCharsOffset] = React.useState(210);

    const [isCharActive, setIsCharActive] = React.useState({
        isActivated: false,
        currentChar: null,
        choosenCharData: null,});

    const [chosenChar, setChosenChar] = React.useState();

    const [isFiltered, setIsFilterd]  = React.useState(false);

    const [filterData, setFilterData] = React.useState();

    const [loadCord, setLoadCord] = React.useState(false);

 React.useEffect(() => {
           FetchData("https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=510&apikey=c2c707041ac2c3a1f2a0791a1911d42b" , setCharList);
        }, []);

React.useEffect(() => {
    const infinityLoad = () => {
        const isBottomReached = () => {
            if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
                setLoadCord(true);
            } 
        }
        window.addEventListener('scroll', isBottomReached); 
    }

    infinityLoad();

    if (loadCord) loadDataPattern("https://gateway.marvel.com:443/v1/public/characters?limit=9&", "&apikey=c2c707041ac2c3a1f2a0791a1911d42b", charsOffset, 9, setCharsOffset, setCharList, setLoadCord);

}, [loadCord, charsOffset]);

const onCardClick = (e) => {
    e.stopPropagation()

    const scrollTo = () => {
        window.scrollTo({
                top: 440,
                behavior: 'smooth'
            });
    };

    scrollTo();

    const setChosenCharData = (targetID) => {
        const findActiveChar = charList.find(item => Number(item.id) === Number(targetID));
        setChosenChar(findActiveChar)
    };

    setChosenCharData(e.target.id);

    setIsCharActive((prev => {
            return {
                ...prev,
                isActivated: true,
                currentChar: e.target.id,
            }
    }));

    
 };

const listFilter =  (prop) => {
    setIsFilterd(true)
    const filterValue = prop.toLowerCase();
    
    const itemFilter = charList.filter(item => item.name.toLowerCase().includes(filterValue.toLowerCase()));

    return  setFilterData(itemFilter.map((item, index) => {
                return <CharCard 
                    key={index} 
                    id={item.id} 
                    charName={item.name} 
                    charImg={item.thumbnail.path + '.' + item.thumbnail.extension} 
                    isCharActive={Number(isCharActive.currentChar) === Number(item.id)}
                    onCardClick={onCardClick}
                />
            }))
        
    
};

    return (
        <div  className="char-lib">
            <div className="char-list-block">
                <div className="char-list">
                {isFiltered ? filterData : charList?.map((item, index) => {
                    return <CharCard 
                        key={index} 
                        id={item.id} 
                        charName={item.name} 
                        charImg={item.thumbnail.path + '.' + item.thumbnail.extension} 
                        isCharActive={Number(isCharActive.currentChar) === Number(item.id)}
                        onCardClick={onCardClick}
                    />
                })}
                    
                </div>

                <div className="load-more-btn-block">
                {/* <button className="main-btn-class load-more-btn" onClick={loadMore}>LOAD MORE</button> */}
                </div>
            </div>

            <ChoseCharInfo setIsActive={setIsCharActive}  onFilter={listFilter} chosenCharData={chosenChar}/>
            
        </div>
    )
}