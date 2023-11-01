

export const ChosemCharComiscList = ({comicsList}) => {
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