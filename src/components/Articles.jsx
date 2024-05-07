import { useEffect, useState } from "react"
import ArticleCard from "./ArticleCard"
import { getAllArticles } from "../api"

const Articles = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([])

    useEffect(() => {
        setIsLoading(true)
        getAllArticles().then(({articles}) => {
            setArticles(articles)
            setIsLoading(false)
        });
    }, [])

    if (isLoading) {
        return <p>Loading</p>;
    }


    return  (
        <>
            <h2>Articles</h2>
            <div className="article-container">
                <ArticleCard articles={articles}/>
            </div>
        </>
    )
}

export default Articles