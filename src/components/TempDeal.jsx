import AssetItem from "./AssetItem.jsx";
import DataBracket from "./DataBracket.jsx";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-height: 2rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
  background-color: ${p =>
    p.default && (p.idx % 2 === 0 ? "aliceblue" : "lightblue")};
`;

export default function Asset(props) {
  return (
    <Container default idx={props.idx}>
      <DataBracket row>
        <DataBracket grow>
          <AssetItem label="Asset" text="Private Equity" />
          <AssetItem label="Offeror" text="Tom Smith" />
          <AssetItem label="Jurisdiction" text="United Kingdom" />
          <AssetItem label="Bid" text="$1.2m" />
        </DataBracket>
        <DataBracket grow>
          <AssetItem label="Offeror" text="Tom Jones" />
          <AssetItem label="Email" text="jones@jones.com" />
          <AssetItem label="Phone" text="123-456-7891" />
          <AssetItem label="Domicile" text="Bermuda" />
          <AssetItem label="Choice of Law" text="New York" />
        </DataBracket>
      </DataBracket>
      <AssetItem label="Description" text="Lorem Ipsum" />
      <AssetItem label="Bid" text="$1 million" />
    </Container>
  );
}
