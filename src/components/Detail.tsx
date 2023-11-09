import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FetchArticles from "../interfaces/fetchArticles";
const urlToUse = "https://api.spaceflightnewsapi.net/v4/articles";

const Detail = () => {
  const params = useParams();
  const [details, setDetails] = useState<null | FetchArticles>(null);
  const getArticleDetails = () => {
    fetch(urlToUse + "/" + params.id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("SOMETHING WENT WRONG");
        }
      })
      .then((data) => {
        console.log(data);
        setDetails(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getArticleDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Row>
        <Col className="mb-3 py-3" xs={12} md={{ span: 6, offset: 3 }}>
          <h2 className="text-center fw-bold mb-3 mt-4">Article Details</h2>
          <Card>
            <Card.Img variant="top" src={details?.image_url} />
            <Card.Body>
              <Card.Title>{details?.title}</Card.Title>
              <Card.Text></Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                Published at: {details?.published_at.slice(0, 10)}
              </ListGroup.Item>
              <ListGroup.Item>News Site: {details?.news_site}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link>
                <Link to={`${details?.url}`}>Link to the article</Link>
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
