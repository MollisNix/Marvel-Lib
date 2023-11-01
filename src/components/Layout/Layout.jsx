import { Link, useLocation} from "react-router-dom";
import "./Layout.scss"
export const Layout = ({children} ) => {
    const location = useLocation(); 
    return (
    <>
            <header className="header-block">
                <div className="header-top">
                    <span className="web-title"><span>Marvel</span>information portal</span>

                    <nav className="navigation">
                        <ul className="navigation-list">
                            <li>
                                <Link to={"/"} className={location.pathname === "/" ? "menu-btn bnt-after active" : "menu-btn bnt-after" }>Characters</Link>
                            </li>

                    { location.pathname === "/comics" ?  <li>
                                                <Link className="menu-btn comics-btn active"  >Comics </Link>
                                            </li> 
                                            :
                                            <li>
                                                <Link to={"comics"}className="menu-btn comics-btn">Comics</Link>
                                            </li> }
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