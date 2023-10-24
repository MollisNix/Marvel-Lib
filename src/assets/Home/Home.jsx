import { Header } from "../../components/header/Header";
import { HeaderBottom } from "../../components/header/header-bottom/Header-bottom";
import { CharLib } from "../../components/char-lib/Char-lib";

export const Home = () => {
    return (
        <>
        <Header> 
            <HeaderBottom/>
        </Header>

        <CharLib/>
        </>
    )
}