import AssetItem from "./AssetItem.jsx";
import DataBracket from "./DataBracket.jsx";
// import DealInput from "./DealInput.jsx";
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
const DataRoomButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 6.25rem;
  border: none;
  color: white;
  background-color: blue;
  height: 2rem;
  font-size: 0.9rem;
  text-decoration: none;
  text-align: center;
  align-self: center;
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
      {/*<DealInput
        id={`comps-${props.idx}`}
        text="Add to comps"
        type="checkbox"
      />*/}
      <DataRoomButton to={`/deal/${id}`}>Data room</DataRoomButton>
    </Container>
  );
}
