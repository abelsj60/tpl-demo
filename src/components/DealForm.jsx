import ButtonHolder from "./ButtonHolder.jsx";
import DealButton from "./DealButton.jsx";
import InputAndLabel from "./InputAndLabel.jsx";
import React from "react";
import styled from "styled-components";

const RestyledDealButton = styled(DealButton).attrs({ as: "input" })`
  flex: 1;
  margin-right: ${p => p.marginRight && ".5rem"};
`;
const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default function DealForm(props) {
  const { appData, data, formData, handleChange, handleForm } = props;

  return (
    <Form onSubmit={handleForm}>
      {data.map(cat => (
        <InputAndLabel
          handleChange={handleChange}
          key={cat.name}
          label={cat.nickname}
          name={cat.name}
          selectorData={cat.selectorData}
          startWith={appData[cat.name]}
          value={formData[cat.name]}
        />
      ))}
      <ButtonHolder>
        <RestyledDealButton type="submit" value="Submit"></RestyledDealButton>
      </ButtonHolder>
    </Form>
  );
}
