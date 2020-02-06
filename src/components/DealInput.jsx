import DataLabel from "./DataLabel.jsx";
import React from "react";
import styled from "styled-components";

const Input = styled.input`
  font-style: italic;
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
  margin: 0 1.5rem;
`;

export default function DealInput(props) {
  const { id, text, type } = props;

  return (
    <Label htmlFor={id}>
      <DataLabel>{text}</DataLabel>
      <Input autoComplete="off" id={id} type={type} />
    </Label>
  );
}
