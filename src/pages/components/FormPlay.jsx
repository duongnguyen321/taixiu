import React from "react";
import Form from "../../components/Form";
import Col from "../../components/Col";
import Row from "../../components/Row";
import Range from "../../components/Range";
import Button from "../../components/Button";

export default function FormPlay({ getGame, count, loading, handleChange }) {
  return (
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
  );
}
