import React from "react";

export const CharFilter = ({filterMethod}) => {

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