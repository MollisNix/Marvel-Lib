

export const ComicsDetail = ({comicsDetailData, backToAllHandler}) => {
    console.log(comicsDetailData)
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