import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import FetchArticles from "../interfaces/fetchArticles";
import SingleArticle from "./SingleArticle";

const urlToUse = "https://api.spaceflightnewsapi.net/v4/articles";

const Main = () => {
  const [articles, setArticles] = useState<FetchArticles[]>([]);
  const getData = () => {
    fetch(urlToUse)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("SOMETHING WENT WRONG");
        }
      })
      .then((data) => {
        console.log(data);
        setArticles(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <h1 className="text-center">Articles</h1>
      <Row xs={1} md={3} lg={4} className="g-2">
        {articles.length > 0 &&
          articles.map((article) => {
            return <SingleArticle key={article.id} articleData={article} />;
          })}
      </Row>
    </Container>
  );
};

export default Main;
