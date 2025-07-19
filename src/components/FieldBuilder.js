import React from "react";
import { Button, Input, Select, Space } from "antd";

const { Option } = Select;

const defaultField = { key: "", type: "string", children: [] };

function FieldBuilder({ fields, setFields }) {
  if (!Array.isArray(fields)) return null;

  const updateField = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const addField = () => {
    setFields([...fields, { ...defaultField }]);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const addNestedField = (index) => {
    const newFields = [...fields];
    if (!Array.isArray(newFields[index].children)) {
      newFields[index].children = [];
    }
    newFields[index].children.push({ ...defaultField });
    setFields(newFields);
  };

  return (
    <>
      {fields.map((field, index) => (
        <div key={index} style={{ marginBottom: "10px", paddingLeft: "10px", borderLeft: "2px solid gray" }}>
          <Space>
            <Input
              placeholder="Key"
              value={field.key}
              onChange={(e) => updateField(index, "key", e.target.value)}
            />
            <Select
              value={field.type}
              style={{ width: 120 }}
              onChange={(value) => updateField(index, "type", value)}
            >
              <Option value="string">String</Option>
              <Option value="number">Number</Option>
              <Option value="nested">Nested</Option>
            </Select>
            <Button danger onClick={() => removeField(index)}>Delete</Button>
            {field.type === "nested" && (
              <Button onClick={() => addNestedField(index)}>Add Nested</Button>
            )}
          </Space>

          {/* Recursively render children if type is nested */}
          {field.type === "nested" && Array.isArray(field.children) && (
            <div style={{ marginTop: "10px" }}>
              <FieldBuilder
                fields={field.children}
                setFields={(updatedChildren) => {
                  const newFields = [...fields];
                  newFields[index].children = updatedChildren;
                  setFields(newFields);
                }}
              />
            </div>
          )}
        </div>
      ))}

      <Button type="primary" onClick={addField} style={{ marginTop: "10px" }}>
        Add Field
      </Button>
    </>
  );
}

export default FieldBuilder;
