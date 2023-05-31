import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../configs";
import Form from "../components/Form";
import Button from "../components/Button";
import Range from "../components/Range";
import Col from "../components/Col";
import Row from "../components/Row";
import Box from "../components/Box";
import homeStyle from "./home.module.css";
import Header from "../Layout/Header";

const { game: getAPIGame, data: getAPIData } = API;

export default function Home() {
  const [data, setData] = useState({});
  const [count, setCount] = useState(2);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const res = await axios
      .get(getAPIData(getCountForAPI()))
      .then((res) => res.data);
    if (res.length) {
      setHistory(res);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const getCountForAPI = () => {
    if (count > 7) {
      return Math.round(count / 3);
    } else if (count > 5) {
      return Math.round(count / 2);
    } else {
      return 5;
    }
  };
  const getIconDice = (value) => {
    switch (value) {
      case 1:
        return <i className="fa-solid fa-dice-one fa-beat"></i>;
      case 2:
        return <i className="fa-solid fa-dice-two fa-beat"></i>;
      case 3:
        return <i className="fa-solid fa-dice-three fa-beat"></i>;
      case 4:
        return <i className="fa-solid fa-dice-four fa-beat"></i>;
      case 5:
        return <i className="fa-solid fa-dice-five fa-beat"></i>;
      case 6:
        return <i className="fa-solid fa-dice-six fa-beat"></i>;
      default:
        return <i className="fa-solid fa-dice fa-beat"></i>;
    }
  };
  const getGame = async () => {
    setLoading(true);
    const res = await axios.get(getAPIGame(count)).then((res) => res.data);
    if (res.data.length) {
      setData(res);
      getData();
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  useEffect(() => setCount(localStorage.count || 2), []);
  const handleChange = async (e) => {
    await setCount(e.target.value);
    localStorage.count = e.target.value;
  };

  const { data: resData, response, type } = data;

  return (
    <>
      <Header history={history} />
      <Box>
        <Col>
          <Row>
            <Col>
              {resData?.length ? (
                <>
                  <h3 className="score">Điểm: {response}</h3>
                  <ul className={homeStyle.list_group}>
                    {resData.map((item, i) => (
                      <li className="list_item" key={i}>
                        <Row className={homeStyle.box_icon}>
                          Xúc Xắc {i + 1}: {item} {getIconDice(parseInt(item))}
                        </Row>
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
              {loading ? (
                <h3>Đang Đổ Xúc Xắc...</h3>
              ) : (
                <h3>
                  Trang game được tạo bởi{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://duong.vercel.app"
                  >
                    Dương
                  </a>
                </h3>
              )}
            </Col>
            <Col>
              {history.map(({ response, type, data: resData }, i) => (
                <Row key={i} className={homeStyle.box_history}>
                  <h3 className="score">Điểm: {response}</h3>
                  <ul className={homeStyle.list_group}>
                    {resData.map((item, i) => (
                      <li className="list_item" key={i}>
                        <Row className={homeStyle.box_icon}>
                          Xúc Xắc {i + 1}: {item} {getIconDice(parseInt(item))}
                        </Row>
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
    </>
  );
}
