import Graf from "./styledPrimitives/Graf.jsx";
import React, { Fragment } from "react";
import styled from "styled-components";

const RestyledGraf = styled(Graf)`
  margin-bottom: 0.5rem;
`;
const Input = styled.input`
  // Styling source: https://www.filamentgroup.com/lab/select-css.html
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  border-radius: 0.5em;
  background-color: #fff;
`;
const Label = styled.label`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
// Re-tag Label as Selector b/c selectors have no Labels.
// This'll make it easy to keep a fit-n-proper structure.
const Select = styled(Label).attrs({ as: "select" })`
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
`;
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
