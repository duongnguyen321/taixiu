import React from "react";
import Row from "../../components/Row";
import Col from "../../components/Col";

export default function GameData({ homeStyle, data, loading, money, history }) {
  const { data: resData, response, type } = data;
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

  return (
    <Row>
      {window.innerWidth > 770 && (
        <Col>
          {resData?.length ? (
            <>
              <h3 className={homeStyle.score}>
                Điểm:{" "}
                <span
                  className={homeStyle.score_value}
                  style={{
                    color:
                      type === "Tài" ? "red" : type === "Xỉu" ? "blue" : "#333",
                  }}
                >
                  {response}
                </span>
              </h3>
              <ul className={homeStyle.list_group}>
                {resData.map((item, i) => (
                  <li className="list_item" key={i}>
                    <Row className={homeStyle.box_icon}>
                      Xúc Xắc {i + 1}: {item} {getIconDice(parseInt(item))}
                    </Row>
                  </li>
                ))}
              </ul>
              <h1
                className={homeStyle.score_value}
                style={{
                  color:
                    type === "Tài" ? "red" : type === "Xỉu" ? "blue" : "#333",
                }}
              >
                {type}
              </h1>
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
          <h2>Tổng ví: {money}$</h2>
        </Col>
      )}
      <Col>
        {history.map(({ response, type, data: resData }, i) => (
          <Row key={i} className={homeStyle.box_history}>
            <h3 className="score">
              Điểm:{" "}
              <span
                className={homeStyle.score_value}
                style={{
                  color:
                    type === "Tài" ? "red" : type === "Xỉu" ? "blue" : "#333",
                }}
              >
                {response}
              </span>
            </h3>
            <ul className={homeStyle.list_group}>
              {resData.map((item, i) => (
                <li className="list_item" key={i}>
                  <Row className={homeStyle.box_icon}>
                    Xúc Xắc {i + 1}: {item} {getIconDice(parseInt(item))}
                  </Row>
                </li>
              ))}
            </ul>
            <h1
              className={homeStyle.score_value}
              style={{
                color:
                  type === "Tài" ? "red" : type === "Xỉu" ? "blue" : "#333",
              }}
            >
              {type}
            </h1>
          </Row>
        ))}
      </Col>
    </Row>
  );
}
