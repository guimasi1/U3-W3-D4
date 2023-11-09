import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FetchArticles from "../interfaces/fetchArticles";
import SingleArticle from "./SingleArticle";

const Main = () => {
  const [offset, setOffset] = useState(0);
  const urlToUse = `https://api.spaceflightnewsapi.net/v4/articles/?limit=10&offset=${offset}`;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  return (
    <Container>
      <h1 className="text-center">Articles</h1>
      <Row>
        <Col>
          <Button
            variant={offset < 10 ? "secondary" : "primary"}
            onClick={() => {
              if (offset >= 10) {
                setOffset(offset - 10);
              }
            }}
          >
            Previous page
          </Button>
        </Col>
        <Col className="text-end me-1 mb-2 ">
          <Button
            onClick={() => {
              setOffset(offset + 10);
            }}
          >
            Next page
          </Button>
        </Col>
      </Row>
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
