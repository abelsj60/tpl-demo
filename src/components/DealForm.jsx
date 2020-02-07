import DealLink from "./DealLink.jsx";
import InputAndLabel from "./InputAndLabel.jsx";
import React from "react";
import styled from "styled-components";

const RestyledDealButton = styled(DealLink).attrs({ as: "input" })`
  margin-right: ${p => p.marginRight && ".5rem"};
`;
const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default function DealForm(props) {
  const { appData, data, handleChange, handleForm } = props;

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
          value={data[cat.name]}
        />
      ))}
      <RestyledDealButton type="submit" value="Submit" />
    </Form>
  );
}
