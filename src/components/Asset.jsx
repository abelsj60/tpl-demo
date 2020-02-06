import AssetItem from "./AssetItem.jsx";
import DataBracket from "./DataBracket.jsx";
import DealButton from "./DealButton.jsx";
import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-height: 4rem;
  display: flex;
  overflow: hidden;
  padding: 20px;
  background-color: ${p =>
    p.default && (p.idx % 2 === 0 ? "aliceblue" : "lightblue")};

  @media (min-width: 800px) {
    height: 2rem;
  }
`;
// eslint-disable-next-line no-unused-vars
const RestyledDealButton = styled(({ marginRight, ...rest }) => (
  <DealButton {...rest} />
))`
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export default function Asset(props) {
  const {
    category,
    currentBid,
    id,
    jurisdiction,
    ownerFirst,
    ownerLast
  } = props.deal;

  return (
    <Container default idx={props.idx}>
      <DataBracket grow row>
        <AssetItem grow label="Deal ID" text={id} />
        <AssetItem grow label="Asset class" text={category} />
        <AssetItem grow label="Offeror" text={`${ownerFirst} ${ownerLast}`} />
        <AssetItem grow label="Jurisdiction" text={jurisdiction} />
        <AssetItem grow label="Current bid" text={currentBid.amount} />
      </DataBracket>
      {props.owner && (
        <RestyledDealButton marginRight to={`/deal/${id}/edit`}>
          Edit
        </RestyledDealButton>
      )}
      <RestyledDealButton to={`/deal/${id}`}>Data room</RestyledDealButton>
    </Container>
  );
}
