import React from 'react';
import { FetchData } from '../../../../assets/services/query-functions';
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

const ChoseCharInfo = ({chosenCharData, onFilter, }) => {
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

    
const ChosemCharComiscList = ({comicsList}) => {
    return (
        <div className="char-comics-list">
            <h2>Comics:</h2>
            <ul className="char-comics-list">
                {comicsList ? comicsList.items.map((item, index) => {
                    return <li key={index} className="char-comics-list-elem"><a href={item.resourceURI} target="_blanck">{item.name}</a></li>
                }) : <h3>There is no comics exist with this Character</h3>}
                
            </ul>
        </div>
    )
}

const CharFilter = ({filterMethod}) => {

    const [filterValue, setFilterValue] = React.useState();
    const onInputChange = (e) => {
        setFilterValue(e.target.value)
    }

    return (
        <div className="char-search">
                    <h2>Or find out a character by name: </h2>

                    <div className="search-form">
                        <input type="text"  placeholder="Enter name" onChange={onInputChange}/>
                        <button className="main-btn-class" onClick={()=> filterMethod(filterValue)}>FIND</button>
                    </div>
         </div>
    )
}

const CharCard = ({charName, charImg, onCardClick, isCharActive, id}) => {
    
    return (
        <div 
            id={id} 
            className={ isCharActive ? "active-char-card": "char-card"}
            onClick={onCardClick}
            
        >
            <img 
                id={id}  
                height={200} 
                width={200} 
                src={charImg ? charImg : "img/loki.svg"} 
                alt=""
                onClick={onCardClick} 
             />
            <h1 className='char-name'>{charName ? charName : 'Loading'}</h1>
        </div>
    )
}