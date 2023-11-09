import Col from "react-bootstrap/Col";
import FetchArticles from "../interfaces/fetchArticles";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const SingleArticle = ({ articleData }: { articleData: FetchArticles }) => {
  const navigate = useNavigate();
  return (
    <Col>
      <Card style={{ height: " 100%" }}>
        <Card.Img
          onClick={() => {
            navigate(`/detail/${articleData.id}`);
          }}
          variant="top"
          src={articleData.image_url}
          style={{ height: "200px", cursor: "pointer" }}
        />
        <Card.Body className="d-flex justify-content-between flex-column">
          <div>
            <Card.Title>{articleData.title}</Card.Title>
            <Card.Text>{articleData.published_at.slice(0, 10)}</Card.Text>
            <Card.Text className="mb-2">{articleData.summary}</Card.Text>
          </div>
          <Button
            onClick={() => {
              navigate(`/detail/${articleData.id}`);
            }}
          >
            Read More
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleArticle;
