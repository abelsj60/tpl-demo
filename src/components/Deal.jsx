import AssetItem from "./AssetItem.jsx";
import DataBracket from "./DataBracket.jsx";
import Graf from "./Graf.jsx";
import { Link } from "react-router-dom";
import MarketHed from "./MarketHed.jsx";
import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const RestyledAssetItem = styled(AssetItem)`
  margin-top: 10px;
  margin-left: 10px;
`;
const ButtonHolder = styled.div`
  display: flex;
`;
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 10px;
  background-color: ${p => p.default && "lightblue"};
  overflow: auto;
`;
const DealButton = styled.button`
  flex: 1;
  margin: 0;
  height: 2rem;
  color: white;
  background-color: blue;
  border: none;
`;
const NewDealButton = styled(Link)`
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

export default function Deal(props) {
  const { id } = useParams();
  const { deals, loading, parties, userId } = props;

  const deal = deals.filter(deal => deal.id === id)[0];
  const party = parties.filter(party => party.id === deal.ownerId)[0];
  const dataRoomHed = `Data room for ${deal.ownerFirst} ${deal.ownerLast}'s '${deal.category}' deal`;

  const {
    category,
    currentBid,
    jurisdiction,
    litigationStatus,
    description,
    date,
    sic
  } = deal;
  const {
    first,
    last,
    address,
    state,
    city,
    zip,
    email,
    type,
    lawFirm,
    bank,
    accountant
  } = party;

  return !loading && !!deal ? (
    <Fragment>
      <MarketHed>{dataRoomHed}</MarketHed>
      <RestyledAssetItem
        fontWeight="bold"
        marginTop="10px"
        marginLeft="10px"
        label="Current bid"
        text={currentBid.amount}
      />
      <Container default idx={props.idx}>
        <DataBracket grow row>
          <DataBracket grow>
            <AssetItem bottomMargin={true} label="Deal id" text={deal.id} />
            <AssetItem
              bottomMargin={true}
              label="Asset class"
              text={category}
            />
            <AssetItem bottomMargin={true} label="Date" text={date} />
            <AssetItem
              bottomMargin={true}
              label="Offeror"
              text={`${first} ${last}`}
            />
            <AssetItem
              bottomMargin={true}
              label="Jurisdiction"
              text={jurisdiction}
            />
            <AssetItem
              bottomMargin={true}
              label="Litigation status"
              text={litigationStatus}
            />
            <AssetItem
              bottomMargin={true}
              label="Description"
              text={description}
            />
            <AssetItem bottomMargin={true} label="Domicile" text="Bermuda" />
            <AssetItem
              bottomMargin={true}
              label="Choice of Law"
              text="New York"
            />
            <AssetItem bottomMargin={true} label="SIC" text={sic} />
          </DataBracket>
          <DataBracket grow>
            <AssetItem bottomMargin={true} label="Type" text={type} />
            <AssetItem bottomMargin={true} label="Address" text={address} />
            <AssetItem bottomMargin={true} label="City" text={city} />
            <AssetItem bottomMargin={true} label="State" text={state} />
            <AssetItem bottomMargin={true} label="Zip" text={zip} />
            <AssetItem bottomMargin={true} label="Email" text={email} />
            <AssetItem bottomMargin={true} label="Law firm" text={lawFirm} />
            <AssetItem bottomMargin={true} label="Bank" text={bank} />
            <AssetItem
              bottomMargin={true}
              label="Accountant"
              text={accountant}
            />
          </DataBracket>
        </DataBracket>
        <ButtonHolder>
          {userId === deal.ownerId ? (
            <NewDealButton to={`/deal/${id}/edit`}>Edit</NewDealButton>
          ) : (
            <DealButton>Bid</DealButton>
          )}
        </ButtonHolder>
      </Container>
    </Fragment>
  ) : (
    <Graf>Loading...</Graf>
  );
}
