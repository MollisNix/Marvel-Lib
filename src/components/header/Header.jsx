
import "./header-styles.scss";
import { Link, useLocation } from "react-router-dom";

export const Header  = props => {
const location = useLocation();

    return (
        <header className="header-block">
            <div className="header-top">
                <span className="web-title"><span>Marvel</span>information portal</span>

                <nav className="navigation">
                    <ul className="navigation-list">
                        {location.pathname === "/" ? <li>
                                                        <Link  to={"/"}><button className="menu-btn bnt-after active" >Characters</button></Link>
                                                    </li>
                                                    :   
                                                    <li>
                                                        <Link  to={"/"}><button className="menu-btn bnt-after " >Characters</button></Link>
                                                    </li> 
                                                } 
                        

    { location.pathname === "/comics" ?  <li>
                                            <Link to={"comics"}><button className="menu-btn comics-btn active"  disabled>Comics</button> </Link>
                                        </li> 
                                        :
                                         <li>
                                            <Link to={"comics"}><button className="menu-btn comics-btn" >Comics</button> </Link>
                                        </li> }
                    </ul>
                </nav>
            </div>
            {props.children}
        </header>
    )
}