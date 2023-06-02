import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../configs";
import headerStyle from "./header.module.css";
import Col from "../components/Col";
import Row from "../components/Row";
const { data: getAPIData } = API;

export default function Header({ history: data }) {
  const [history, setHistory] = useState([]);
  const getData = async () => {
    const res = await axios.get(getAPIData(30)).then((res) => res.data);
    if (res.length) {
      setHistory(res);
    }
  };
  useEffect(() => {
    getData();
  }, [data]);
  return (
    <header className={headerStyle.header}>
      <Row className={headerStyle.row}>
        {history?.map(({ type }, i) => {
          return type === "Tài" ? (
            <Col key={i}>
              <i
                className={`fa-sharp fa-regular fa-circle-dot ${headerStyle.icon}`}
                style={{ color: "red" }}
              ></i>
              <span>Tài</span>
            </Col>
          ) : type === "Xỉu" ? (
            <Col key={i}>
              <i
                className={`fa-sharp fa-regular fa-circle-dot ${headerStyle.icon}`}
                style={{ color: "blue" }}
              ></i>
              <span>Xỉu</span>
            </Col>
          ) : (
            <Col key={i}>
              <i
                className={`fa-sharp fa-regular fa-circle-dot ${headerStyle.icon}`}
                style={{ color: "#333" }}
              ></i>
              <span>Bộ</span>
            </Col>
          );
        })}
      </Row>
    </header>
  );
}
