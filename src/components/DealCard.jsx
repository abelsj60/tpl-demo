import DealItem from "./DealItem.jsx";
import DataBracket from "./styledPrimitives/DataBracket.jsx";
import dealCardDataForDisplay from "../data/dealCardDataForDisplay";
import DealLink from "./styledPrimitives/DealLink.jsx";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-height: 4rem;
  display: flex;
  overflow: hidden;
  padding: 20px;

  &:nth-child(even) {
    background-color: lightblue;
  }

  @media (min-width: 800px) {
    height: 2rem;
  }
`;
// eslint-disable-next-line no-unused-vars
const RestyledDealLink = styled(({ marginRight, ...rest }) => (
  <DealLink {...rest} />
))`
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export default function Asset(props) {
  const { deal, isMyDeals } = props;
  const displayData = dealCardDataForDisplay(deal, isMyDeals);
  const { id } = deal;

  return (
    <Container default idx={props.idx}>
      <DataBracket grow row>
        {displayData.map((field, idx) => {
          console.log("rerender", idx);
          return (
            <DealItem
              grow
              key={field.label}
              label={field.label}
              text={field.text}
            />
          );
        })}
      </DataBracket>
      {isMyDeals && (
        <RestyledDealLink marginRight to={`/deal/${id}/edit`}>
          Edit
        </RestyledDealLink>
      )}
      <RestyledDealLink to={`/dealroom/${id}`}>Deal Room</RestyledDealLink>
    </Container>
  );
}
