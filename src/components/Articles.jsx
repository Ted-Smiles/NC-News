import { useEffect, useState } from "react"
import ArticleCard from "./ArticleCard"
import { getAllArticles, getAllTopics } from "../api"
import { Link } from "react-router-dom"

const Articles = ({}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([])
    const [topics, setTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState('')

    useEffect(() => {
        setIsLoading(true)
        getAllTopics().then(({topics}) => {
            setTopics(topics)
        })
        getAllArticles(selectedTopic).then(({articles}) => {
            setArticles(articles)
            setIsLoading(false)
        });
        
    }, [selectedTopic])

    if (isLoading) {
        return <p>Loading</p>;
    }

    const handleClick = (topic) => {
        topic === selectedTopic ? setSelectedTopic('') : setSelectedTopic(topic)
    }

    return  (
        <>
            <h2>Articles</h2>
            {topics
            .map((topic, index) => (
                <Link key={index} to={selectedTopic === topic.slug ? '/' : `/articles/${topic.slug}`}>
                    <button className={selectedTopic === topic.slug ? 'active' : ''} onClick={() => handleClick(topic.slug)}>{topic.slug}</button>
                </Link> 
            ))}
            <div className="article-container">
                {articles
                .map((article) => (
                    <ArticleCard key={article.article_id} article={article}/>
                ))}
            </div>
        </>
    )
}

export default Articles