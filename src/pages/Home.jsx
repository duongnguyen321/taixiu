import React, { useEffect, useState } from "react";
import API from "../configs";
import Form from "../components/Form";
import Button from "../components/Button";
import Range from "../components/Range";
import Col from "../components/Col";
import Row from "../components/Row";
import Box from "../components/Box";
import homeStyle from "./home.module.css";

const { game: getAPIGame, data: getAPIData } = API;

export default function Home() {
  const [data, setData] = useState({});
  const [count, setCount] = useState(2);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const res = await fetch(getAPIData(getCountForAPI())).then((res) =>
      res.json()
    );
    if (res.length) {
      setHistory(res);
      setLoading(false);
    }
  };

  const getCountForAPI = () => {
    if (count > 8) {
      return Math.round(count / 3);
    } else if (count > 6) {
      return Math.round(count / 2);
    } else {
      return 5;
    }
  };

  const getGame = async () => {
    setLoading(true);
    const res = await fetch(getAPIGame(count)).then((res) => res.json());
    if (res.data.length) {
      setData(res);
      getData();
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  useEffect(() => getData, []);
  const handleChange = (e) => {
    setCount(e.target.value);
  };

  const { data: resData, response, type } = data;

  return (
    <Box>
      <Col>
        <Row>
          <Col>
            {resData?.length ? (
              <>
                <h3 className="score">Điểm: {response}</h3>
                <ul className="list">
                  {resData.map((item, i) => (
                    <li className="list_item" key={i}>
                      Xúc Xắc {i + 1}: {item}
                    </li>
                  ))}
                </ul>
                <h1 className="type">{type}</h1>
              </>
            ) : (
              <>
                <h3 className="score">Bạn Chưa Đổ Xúc Xắc!</h3>
              </>
            )}
          </Col>
          <Col>
            {history.map(({ response, type, data: resData }, i) => (
              <Row key={i} className={homeStyle.box_history}>
                <h3 className="score">Điểm: {response}</h3>
                <ul className="list">
                  {resData.map((item, i) => (
                    <li className="list_item" key={i}>
                      Xúc Xắc {i + 1}: {item}
                    </li>
                  ))}
                </ul>
                <h1 className="type">{type}</h1>
              </Row>
            ))}
          </Col>
        </Row>
        <Form onSubmit={getGame}>
          <Col>
            <Row>
              <span>Số Xúc Xắc: {count}</span>
              <Range value={count} min="2" max="10" onChange={handleChange} />
            </Row>
            <Button disabled={loading} type="submit">
              Play!
            </Button>
          </Col>
        </Form>
      </Col>
    </Box>
  );
}
