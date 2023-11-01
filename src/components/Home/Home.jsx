// import { Header } from "./Header-Component/Header";
import { HeaderBottom } from "./Header-Component/header-bottom/Header-bottom";
import { CharLib } from "./Header-Component/Char-Lib/Char-lib";
import { Layout } from "../Layout/Layout";

export const Home = () => {
    return (
        <>
         <Layout> 
            <HeaderBottom/>
            <CharLib/>
         </Layout>
        </>
    )
}