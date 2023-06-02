import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../configs";
import Form from "../components/Form";
import Button from "../components/Button";
import Range from "../components/Range";
import Col from "../components/Col";
import Row from "../components/Row";
import Box from "../components/Box";
import Header from "../Layout/Header";
import homeStyle from "./home.module.css";

const { game: getAPIGame, data: getAPIData } = API;

export default function Home() {
  const [data, setData] = useState({});
  const [count, setCount] = useState(
    localStorage.count ? parseInt(localStorage.count) : 3
  );
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disableBetButton, setDisableBetButton] = useState(false);
  const [bet, setBet] = useState({ Xỉu: 0, Bộ: 0, Tài: 0 });
  const [money, setMoney] = useState(
    localStorage.money ? parseInt(localStorage.money) : 10000
  );

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
    if (count > 8) {
      return Math.floor(count / 3) - 1;
    } else if (count > 6) {
      return Math.floor(count / 3);
    } else {
      return 3;
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
      await getData();
      await handleSubmitBet(res);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    localStorage.money = money.toString();
    if (money <= 0) {
      const choice = prompt(
        "Bạn có thể nhận thêm 100000 vào tài khoản bằng cách Follow Github hoặc Facebook. Hãy chọn một trong hai:\n1. Follow Github\n2. Follow Facebook"
      );

      if (choice === "1") {
        const githubUrl = "https://github.com/duongnguyen321";
        localStorage.setItem("followChoice", "github");
        window.open(githubUrl, "_blank");
      } else if (choice === "2") {
        const facebookUrl = "https://fb.com/duongnguyen321";
        localStorage.setItem("followChoice", "facebook");
        window.open(facebookUrl, "_blank");
      }
    }
  }, [money]);

  useEffect(() => {
    const followChoice = localStorage.getItem("followChoice");
    if (followChoice) {
      const timeout = setTimeout(() => {
        const currentFollowChoice = localStorage.getItem("followChoice");
        if (currentFollowChoice === followChoice) {
          setMoney((prevMoney) => prevMoney + 100000);
          localStorage.money = (money + 100000).toString();
        } else {
          toast.error("Bạn có vẻ chưa follow tôi :(");
        }
      }, 3000);

      return () => {
        clearTimeout(timeout);
        localStorage.removeItem("followChoice");
      };
    }
  }, [money]);

  useEffect(() => {
    if (disableBetButton) {
      if (money > 5000) {
        setDisableBetButton(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [money]);

  useEffect(() => {
    setCount(localStorage.count ? parseInt(localStorage.count) : 3);
  }, []);

  const handleChange = (e) => {
    if (e.target.value >= 4) {
      toast.warn("Chức năng đổ xúc xắc trên 4 đang phát triển thêm!");
    }
    setCount(e.target.value);
    localStorage.count = e.target.value;
  };

  const handleBet = (e) => {
    const betName = e.target.innerText;
    const betAmount = bet[betName];
    const newBetAmount = betAmount + 5000;

    if (newBetAmount > money) {
      setDisableBetButton(true);
    } else {
      setDisableBetButton(false);
      setBet((prevBet) => ({
        ...prevBet,
        [betName]: newBetAmount,
      }));
    }
  };

  const handleSubmitBet = async (res) => {
    const betAmount = bet[res.type];
    const totalBetAmount = Object.values(bet).reduce(
      (sum, value) => sum + value,
      0
    );
    const winningAmount = betAmount - (totalBetAmount - betAmount);

    if (winningAmount > 0) {
      toast.success(`Bạn đã thắng ${winningAmount}$`);
      setMoney((prevMoney) => prevMoney + winningAmount);
    } else if (winningAmount < 0) {
      toast.error(`Bạn đã thua ${Math.abs(winningAmount)}$`);
      setMoney((prevMoney) => {
        const newMoney = prevMoney - Math.abs(winningAmount);
        return newMoney < 0 ? 0 : newMoney;
      });
    } else {
      toast.info("Bạn đã hòa.");
    }
    setTimeout(() => {
      setBet({ Xỉu: 0, Bộ: 0, Tài: 0 });
    }, 500);
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
                  <h3 className={homeStyle.score}>
                    Điểm:{" "}
                    <span
                      className={homeStyle.score_value}
                      style={{
                        color:
                          type === "Tài"
                            ? "red"
                            : type === "Xỉu"
                            ? "blue"
                            : "#333",
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
                        type === "Tài"
                          ? "red"
                          : type === "Xỉu"
                          ? "blue"
                          : "#333",
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
              <h2>Tổng ví: {money}</h2>
            </Col>
            <Col>
              {history.map(({ response, type, data: resData }, i) => (
                <Row key={i} className={homeStyle.box_history}>
                  <h3 className="score">
                    Điểm:{" "}
                    <span
                      className={homeStyle.score_value}
                      style={{
                        color:
                          type === "Tài"
                            ? "red"
                            : type === "Xỉu"
                            ? "blue"
                            : "#333",
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
                        type === "Tài"
                          ? "red"
                          : type === "Xỉu"
                          ? "blue"
                          : "#333",
                    }}
                  >
                    {type}
                  </h1>
                </Row>
              ))}
            </Col>
          </Row>
          <Form onSubmit={getGame}>
            <Col>
              <Row>
                <span>Số Xúc Xắc: {count}</span>
                <Range value={count} min="3" max="10" onChange={handleChange} />
              </Row>
              <Button disabled={loading} type="submit">
                Play!
              </Button>
            </Col>
          </Form>
          <Row className={homeStyle.bet}>
            <Col className={homeStyle.bet_btn}>
              <Button
                onClick={handleBet}
                disabled={loading || disableBetButton} // Sử dụng disableBetButton ở đây
                className={homeStyle.bet_button_1}
              >
                Xỉu
              </Button>
              <span>{bet.Xỉu}$</span>
            </Col>
            <Col className={homeStyle.bet_btn}>
              <Button
                onClick={handleBet}
                disabled={loading || disableBetButton} // Sử dụng disableBetButton ở đây
                className={homeStyle.bet_button_2}
              >
                Bộ
              </Button>
              <span>{bet.Bộ}$</span>
            </Col>
            <Col className={homeStyle.bet_btn}>
              <Button
                onClick={handleBet}
                disabled={loading || disableBetButton} // Sử dụng disableBetButton ở đây
                className={homeStyle.bet_button_3}
              >
                Tài
              </Button>
              <span>{bet.Tài}$</span>
            </Col>
          </Row>
        </Col>
      </Box>

      <ToastContainer theme="dark" />
    </>
  );
}
