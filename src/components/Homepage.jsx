import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { UserContext } from "../context/User";
import ArticleCard from "./ArticleCard";
import { getAllArticles, getAllTopics } from "../api";

const Homepage = () => {
  const { user, setUser } = useContext(UserContext);

  let location = useLocation();
  const topic = location.pathname.slice(1);

  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(topic);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState(false);
  const [totalArticles, setTotalArticles] = useState(0);
  const [articlePage, setArticlePage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    getAllTopics().then(({ topics }) => {
      setTopics(topics);
    });
    getAllArticles(selectedTopic, sort, order, articlePage).then(
      ({ articles, total_count }) => {
        setTotalArticles(total_count);
        setArticles(articles);
        setIsLoading(false);
      }
    );
  }, [selectedTopic, search, articlePage]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  const handleTopicClick = (topic) => {
    setArticlePage(1);
    topic === selectedTopic ? setSelectedTopic("") : setSelectedTopic(topic);
  };

  const handleSort = (sortValue) => {
    setSort(sortValue);
  };

  const handleOrder = () => {
    if (order === "asc") {
      setOrder("desc");
    }
    if (order === "desc") {
      setOrder("asc");
    }
  };

  const handleSortClick = () => {
    setSearch(!search);
  };

  const handlePageClick = (e) => {
    e.target.innerText === "Next Page"
      ? setArticlePage((currentPage) => currentPage + 1)
      : setArticlePage((currentPage) => currentPage - 1);
    router.push(pathname + "?" + createQueryString("p"));
  };

  const handleGuestClick = () => [setUser("Guest")];

  if (user === "") {
    return (
      <div className="home">
        Homepage
        <Link to={`/login`}>
          <button>Login</button>
        </Link>
        <button onClick={handleGuestClick}>Browse as guest</button>
      </div>
    );
  }

  return (
    <>
      <h2>Articles</h2>
      {topics.map((topic, index) => (
        <Link
          key={index}
          to={selectedTopic === topic.slug ? "/" : `/${topic.slug}`}
        >
          <button
            className={selectedTopic === topic.slug ? "active" : ""}
            onClick={() => handleTopicClick(topic.slug)}
          >
            {topic.slug}
          </button>
        </Link>
      ))}
      <div className="sort">
        <div className="dropdown">
          <div className="dropbtn">
            {sort === "" ? "Sort by" : "Sort by " + sort}
          </div>
          <div className="dropdown-content">
            <a onClick={() => handleSort("title")}>Title</a>
            <a onClick={() => handleSort("comment_count")}>Comment count</a>
            <a onClick={() => handleSort("votes")}>Votes</a>
            <a onClick={() => handleSort("created_at")}>Date create</a>
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
      <div className="pages">
        <button disabled={articlePage === 1} onClick={handlePageClick}>
          Previous Page
        </button>
        <p>{articlePage}</p>
        <button
          disabled={articlePage * 9 >= totalArticles}
          onClick={handlePageClick}
        >
          Next Page
        </button>
      </div>
    </>
  );
};

export default Homepage;
