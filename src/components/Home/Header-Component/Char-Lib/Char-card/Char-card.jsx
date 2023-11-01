export const CharCard = ({charName, charImg, onCardClick, isCharActive, id}) => {
    
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

// active ? "active-char-card" :isCharActive ? "active-char-card" :