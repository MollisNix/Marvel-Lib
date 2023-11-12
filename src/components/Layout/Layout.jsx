import { NavLink, } from "react-router-dom";
import "./Layout.scss"
export const Layout = ({children} ) => {
    return (
    <>
            <header className="header-block">
                <div className="header-top">
                    <span className="web-title"><span>Marvel</span>information portal</span>

                    <nav className="navigation">
                        <ul className="navigation-list">
                            <li>
                                <NavLink to={"/"} activeClassName={'active'} className={"menu-btn bnt-after"}>Characters</NavLink>
                            </li>

                           <li>
                                <NavLink to={"/comics"} activeClassName={'active'} className="menu-btn comics-btn">Comics</NavLink>
                            </li> 
                        </ul>
                    </nav>
                </div>

                {children[0]}
            </header>

            <div className="wrapper">
                {children[1]}
            </div>
    </>
        
    )
}