import buildData from "../data/buildData";
import createVariables from "../helpers/createVariables";
import DealForm from "./DealForm.jsx";
import enums from "../helpers/enums";
import MarketHed from "./MarketHed.jsx";
import React, { Fragment, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 10px;
  background-color: ${p => p.default && "lightblue"};
  overflow: auto;
`;

export default function CreateDeal(props) {
  const { deals, parties, setDeals, userId } = props;
  const personIndex = parties.map(party => party.id).indexOf(userId);
  const person = parties[personIndex];
  const dealVariables = createVariables(0, person);
  const deal = buildData().deal(dealVariables, person);
  const {
    category,
    jurisdiction,
    minimumBid,
    litigationStatus,
    description,
    sic
  } = deal;
  const [formData, setForm] = useState({
    category: category,
    jurisdiction: jurisdiction,
    minimumBid: minimumBid,
    litigationStatus: litigationStatus,
    description: description,
    sic: sic
  });
  // Quick fix. This keeps the Hed in check when loading on a new deal.
  const dataRoomHed = `Hi${
    person ? " " + person.first : ""
  }, let's make a deal.`;
  const edibleDealData = [
    { name: "category", nickname: "Category", selectorData: enums.dealType },
    {
      name: "jurisdiction",
      nickname: "Jurisdiction",
      selectorData: enums.country
    },
    { name: "minimumBid", nickname: "Minimum bid", selectorData: [] },
    {
      name: "litigationStatus",
      nickname: "Litigation status",
      selectorData: enums.lawsuits
    },
    { name: "description", nickname: "Description", selectorData: [] },
    { name: "sic", nickname: "SIC", selectorData: [] }
  ];
  const handleFormChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    setForm({ ...formData, [name]: value });
  };
  const handleFormSubmit = event => {
    event.preventDefault();
    const newDeals = deals.slice(0).map(deal => Object.assign({}, deal));
    newDeals.push({ ...deal, ...formData });
    setDeals(newDeals);
  };

  // console.log("old deals:", deals.length);
  // console.log("newDeal:", deal);

  return (
    <Fragment>
      <MarketHed>{dataRoomHed}</MarketHed>
      <Container default>
        <DealForm
          appData={deal}
          data={edibleDealData}
          formData={formData}
          handleChange={handleFormChange}
          handleForm={handleFormSubmit}
        />
      </Container>
    </Fragment>
  );
}
