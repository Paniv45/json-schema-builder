import React, { useState } from "react";
import { Layout, Typography, Row, Col, Divider } from "antd";
import FieldBuilder from "./components/FieldBuilder";
import "./App.css";

const { Header, Content } = Layout;

function App() {
  const [fields, setFields] = useState([]);

  function generateJSON(fields) {
    if (!Array.isArray(fields)) return {};
    const result = {};

    fields.forEach((field) => {
      const { key, type, children } = field;

      if (type === "nested" && Array.isArray(children)) {
        result[key] = generateJSON(children);
      } else if (type === "string") {
        result[key] = "STRING";
      } else if (type === "number") {
        result[key] = "number";
      } else {
        result[key] = "";
      }
    });

    return result;
  }

  return (
    <Layout style={{ minHeight: "100vh", padding: "20px" }}>
      <Header style={{ color: "white", fontSize: "24px" }}>
        JSON Schema Builder
      </Header>
      <Content style={{ marginTop: "20px" }}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Typography.Title level={4}>Schema Builder</Typography.Title>
            <FieldBuilder fields={fields} setFields={setFields} />
          </Col>
          <Col xs={24} md={12}>
            <Typography.Title level={4}>JSON Preview</Typography.Title>
            <pre
              style={{
                backgroundColor: "#f5f5f5",
                padding: "16px",
                borderRadius: "8px",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              {JSON.stringify(generateJSON(fields), null, 2)}
            </pre>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;

