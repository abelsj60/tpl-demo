import ButtonHolder from "./styledPrimitives/ButtonHolder.jsx";
import DealItem from "./DealItem.jsx";
import constants from "../helpers/constants.js";
import DataBracket from "./styledPrimitives/DataBracket.jsx";
import dealDataForDisplay from "../data/dealDataForDisplay.js";
import Graf from "./styledPrimitives/Graf.jsx";
import cloneDeep from "lodash/cloneDeep";
import { Link, Redirect } from "react-router-dom";
import MarketHed from "./styledPrimitives/MarketHed.jsx";
import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TPLDataManager from "../data/TPLDataManager.js";

const ColumnHed = styled.h3`
  margin-top: 0;
`;
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 20px 10px 10px;
  background-color: ${p => p.default && "lightblue"};
  overflow: auto;
`;
const Dashboard = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 10px;
`;
const DealLink = styled(Link)`
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
`;
const DealRoomButton = styled.button`
  height: 100%;
  flex: ${p => p.grow && "1"};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  min-width: 5rem;
  color: white;
  background-color: blue;
  border: none;
  text-decoration: none;
  text-align: center;
  font-size: 0.85rem;
  align-self: center;
  ${p => p.fullHeight && "height: 100%;"}
`;
const Form = styled.form`
  display: flex;
  height: 2.15rem;
  margin: 0;
`;
const Input = styled.input`
  border: none;
  font-size: 0.8rem;
  font-family: sans-serif;
  font-weight: 500;
  color: #444;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
`;
const RestyledAssetItem = styled(DealItem)`
  width: 5rem;
  padding-right: 1.25rem;
  border-right: 1px solid black;
`;
const RestyledDealLink = styled(DealLink)`
  align-self: center;
  ${p => p.fullHeight && "height: 100%;"}
`;
const RestyledGraf = styled(Graf)`
  align-self: center;
  margin-left: 1rem;
  color: red;
  font-size: 1.25rem;
`;

export default function Deal(props) {
  const { id } = useParams();
  const {
    deals,
    loading,
    parties,
    setDeals,
    setMyDeals,
    setParties,
    userId
  } = props;

  const deal = deals.filter(deal => deal.id === id)[0];

  if (typeof deal === "undefined") {
    return <Redirect to="/notfound" />;
  }

  const party = parties.filter(party => party.id === deal.sellerId)[0];
  /* The Rule of Hooks:
    The React team says the following use of useState() violate the
    Rule of Hooks. I don't think it does b/c the early return sends the
    user to the not-found route, meaning we never come back through 
    here in a way that perverts the sequential order of hooks. 
    So, I've disabled the rule for the next line only. */
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [bid, setBid] = useState({
    accepted: false,
    amount: 0,
    date: new Date(),
    dealId: deal.id,
    id: "",
    ownerId: party.id
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [outcome, setOutcome] = useState("");
  const displayData = dealDataForDisplay(deal, party);
  const columnOneData = displayData.deal;
  const columnTwoData = displayData.party;
  const dealRoomHed =
    userId !== deal.sellerId
      ? constants.dealRoomHed(deal)
      : constants.myDealRoomHed(deal);
  const handleAcceptButton = event => {
    event.preventDefault();

    const newDeals = cloneDeep(deals); // Keep it clean with clones.
    const newParties = cloneDeep(parties); // Keep it clean with clones.
    // Now, we'll get the relevant deal and party
    const dealIndex = newDeals.map(deal => deal.id).indexOf(id);
    const partyIndex = newParties.map(party => party.id).indexOf(userId);
    const newDeal = newDeals[dealIndex];
    const newParty = newParties[partyIndex];
    // Let's record what happened by updating deal and party data.
    newDeal.buyerId = userId; // We've got a buyer, save him or her.
    newDeal.currentBid.accepted = true; // Should update props in bid history
    newDeal.status = "Due Diligence";
    newParty.closedDeals.push(newDeal.id);
    const newMyDeals = cloneDeep(newDeals); // Keep it clean with clones.
    // Attach our new values to our larger data object.
    newDeals[dealIndex] = newDeal;
    newParties[partyIndex] = newParty;

    setDeals(newDeals);
    setParties(newParties);
    setMyDeals(newMyDeals.filter(deal => userId === deal.sellerId));
  };
  const handleBidChange = event => {
    const TPLData = new TPLDataManager(0, party, true);
    const newBid = TPLData.buildBid(userId, deal, event.target.value);

    setBid(newBid);
  };
  const handleBidSubmit = event => {
    event.preventDefault();

    // A lot of this logic mirrors the accept button. Schedule a refactor...
    const newDeals = cloneDeep(deals); // Keep it clean with clones.
    const newParties = cloneDeep(parties); // Keep it clean with clones.
    const dealIndex = newDeals.map(deal => deal.id).indexOf(id);
    const partyIndex = newParties.map(party => party.id).indexOf(userId);
    const newParty = newParties[partyIndex];
    const newDeal = newDeals[dealIndex];
    newDeal.bidHistory.push(bid);
    newParty.bidIds.push(bid.id);
    // The minimum value will either be the current bid, or, if none, the minimumBid value
    const minimumDealValue =
      parseInt(deal.currentBid.amount) > 0
        ? parseInt(deal.currentBid.amount)
        : parseInt(deal.minimumBid);

    if (parseInt(event.target[0].value) > minimumDealValue) {
      setOutcome("newLeader");
      newDeal.currentBid = bid;
    } else {
      setOutcome("tooLittle");
      setBid(0); // Resetting the form.
      event.target[0].value = 0;
    }

    // Attached our new values...
    newDeals[dealIndex] = newDeal;
    newParties[partyIndex] = newParty;

    // Save them to state....
    setDeals(newDeals);
    setParties(newParties);
  };

  return !loading ? (
    <Fragment>
      <MarketHed>{dealRoomHed}</MarketHed>
      <Dashboard>
        <RestyledAssetItem
          fontWeight="bold"
          marginRight="1.25rem"
          label="Current bid"
          text={`$${parseInt(deal.currentBid.amount).toLocaleString()}`}
        />
        {deal.currentBid.amount === 0 && (
          <RestyledAssetItem
            fontWeight="bold"
            marginRight="1.25rem"
            label="Minimum bid"
            text={`$${parseInt(deal.minimumBid).toLocaleString()}`}
          />
        )}
        {userId === deal.sellerId &&
        parseInt(deal.currentBid.amount) > 0 &&
        !deal.currentBid.accepted ? (
          <DealRoomButton onClick={handleAcceptButton}>Accept</DealRoomButton>
        ) : (
          parseInt(deal.currentBid.amount) > 0 &&
          !deal.currentBid.accepted &&
          outcome !== "win" && (
            <Form onSubmit={handleBidSubmit}>
              <Input
                placeholder="Ready to raise?"
                type="number"
                onChange={handleBidChange}
              />
              <DealRoomButton value={bid} type="submit">
                Bid
              </DealRoomButton>
            </Form>
          )
        )}
        {outcome === "tooLittle" && (
          <RestyledGraf>Too low! Try again?</RestyledGraf>
        )}
        {outcome === "newLeader" && (
          <RestyledGraf>You are the new leader!</RestyledGraf>
        )}
      </Dashboard>
      <Container default idx={props.idx}>
        <DataBracket grow row>
          {[columnOneData, columnTwoData].map((columnData, idx) => (
            <DataBracket columnSeparator grow key={`a-${idx}`}>
              {columnData.map((data, idx) =>
                data.hed ? (
                  <ColumnHed key={`b-${idx}`}>{columnData[0].hed}</ColumnHed>
                ) : (
                  <DealItem
                    grow
                    bottomMargin={true}
                    key={`b-${idx}`}
                    label={data.label}
                    text={data.text}
                  />
                )
              )}
            </DataBracket>
          ))}
        </DataBracket>
        <ButtonHolder>
          {userId === deal.sellerId && (
            <RestyledDealLink to={`/deal/${id}/edit`}>Edit</RestyledDealLink>
          )}
        </ButtonHolder>
      </Container>
    </Fragment>
  ) : (
    <Graf>Loading...</Graf>
  );
}
