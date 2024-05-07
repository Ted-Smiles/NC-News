import { useEffect } from "react"
import ArticleCard from "./ArticleCard"
import { useState } from "react"
import { getAllArticles } from "../api"

const Articles = () => {

    const [articles, setArticles] = useState([])

    useEffect(() => {
        getAllArticles().then(({articles}) => {
            setArticles(articles)
        })
    }, [])
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