import { Comics } from "./Comics-components/Comics";
import { ComicsBaner } from "./Comics-components/Comics-banner/Comics-baner";
import { Layout } from "../Layout/Layout";

export const ComicsPage = () => {
    return (
        <>
            <Layout>
                <ComicsBaner/>
                <Comics/>
             </Layout>
        </>
    )
}