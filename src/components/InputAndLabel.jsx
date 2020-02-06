import Graf from "./Graf.jsx";
import React, { Fragment } from "react";
import styled from "styled-components";

const RestyledGraf = styled(Graf)`
  margin-bottom: 0.5rem;
`;
const Input = styled.input`
  border: none;
  color: slategrey;
  font-size: 1.25rem;
  padding: 0.5rem;
`;
const Label = styled.label`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Select = styled(Label).attrs({ as: "select" })``;
const SelectorLabel = styled(Label)`
  flex: 1;
  display: unset;
`;

export default function InputAndLabel(props) {
  const {
    handleChange,
    label,
    name,
    selectorData,
    startWith,
    type,
    value
  } = props;

  return selectorData.length < 1 ? (
    <Label>
      <RestyledGraf>{label}</RestyledGraf>
      <Input
        onChange={handleChange}
        name={name}
        placeholder={startWith}
        type={type}
        value={value}
      />
    </Label>
  ) : (
    <Fragment>
      <SelectorLabel htmlFor={`${name}-select`}>
        <RestyledGraf>{label}</RestyledGraf>
        <Select
          id={`${name}-select`}
          value={value}
          name={name}
          onBlur={handleChange}
          onChange={handleChange}
        >
          {selectorData.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
          )
        </Select>
      </SelectorLabel>
    </Fragment>
  );
}
