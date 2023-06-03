import React from "react";
import Row from "../../components/Row";
import Col from "../../components/Col";
import Button from "../../components/Button";

export default function Bet({
  homeStyle,
  loading,
  handleBet,
  disableBetButton,
  bet,
  money,
}) {
  return (
    <>
      <Row className={homeStyle.bet}>
        <Col className={homeStyle.bet_btn}>
          <Button
            onClick={handleBet}
            disabled={loading || disableBetButton}
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
      {window.innerWidth < 770 && (
        <Col>
          <h2>{loading ? <>Đang đổ xúc xắc...</> : <>Tổng ví: {money}$</>}</h2>
          {!loading && (
            <h3>
              Trang Web được Tạo bởi{" "}
              <a
                href="https://duong.vercel.app"
                target="_blank"
                rel="noreferrer"
              >
                Dương
              </a>
            </h3>
          )}
        </Col>
      )}
    </>
  );
}
