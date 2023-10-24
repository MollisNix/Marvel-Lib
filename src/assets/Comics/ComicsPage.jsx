import { Header } from "../../components/header/Header";
import { Comics } from "../../components/comics/Comics";
import { ComicsBaner } from "../../components/comics/comics-banner/Comics-baner";

export const ComicsPage = () => {
    return (
        <>
            <Header>
                <ComicsBaner />
            </Header>
            <Comics/>
        </>
    )
}