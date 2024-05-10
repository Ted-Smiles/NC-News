import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { getAllArticles, getAllTopics } from "../api";
import { Link } from "react-router-dom";

const Articles = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [sort, setSort] = useState('')
  const [order, setOrder] = useState('asc')
  const [search, setSearch] = useState(false)

  useEffect(() => {
    setIsLoading(true);
    getAllTopics().then(({ topics }) => {
      setTopics(topics);
    });
    getAllArticles(selectedTopic, sort, order).then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [selectedTopic, search]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  const handleClick = (topic) => {
    topic === selectedTopic ? setSelectedTopic("") : setSelectedTopic(topic);
  };

  const handleSort = (sortValue) => {
    setSort(sortValue)
  }

  const handleOrder = () => {
    if (order === 'asc') {
        setOrder('desc')
    }
    if (order === 'desc') {
        setOrder('asc')
    }
  }

  const handleSortClick = () => {
    setSearch(!search)
  }

  return (
    <>
      <h2>Articles</h2>
      {topics.map((topic, index) => (
        <Link
          key={index}
          to={selectedTopic === topic.slug ? "/" : `/articles/${topic.slug}`}
        >
          <button
            className={selectedTopic === topic.slug ? "active" : ""}
            onClick={() => handleClick(topic.slug)}
          >
            {topic.slug}
          </button>
        </Link>
      ))}
    <div className="sort">
        <div className="dropdown">
            <div className="dropbtn">{sort === '' ? 'Sort' : sort}</div>
            <div className="dropdown-content">
            <a onClick={() => handleSort('title')}>Title</a>
            <a onClick={() => handleSort('comment_count')}>Comment count</a>
            <a onClick={() => handleSort('votes')}>Votes</a>
            <a onClick={() => handleSort('created_at')}>Date create</a>
            </div>
        </div>
        <button onClick={handleOrder}>{order}</button>
        <div>
        <button onClick={handleSortClick}>Sort</button>
        </div>
    </div>

      <div className="article-container">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </>
  );
};

export default Articles;
