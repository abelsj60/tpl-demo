import DealForm from "./DealForm.jsx";
import constants from "../helpers/constants.js";
import MarketHed from "./MarketHed.jsx";
import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TPLDataManager from "../data/TPLDataManager";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 10px;
  background-color: ${p => p.default && "lightblue"};
  overflow: auto;
`;

export default function DealForms(props) {
  const { id } = useParams();
  const { deals, formCategory, setDeals, parties, userId } = props;
  const newDeals = deals.slice(0).map(deal => Object.assign({}, deal));
  let deal, dealHed, dealIndex, handleFormSubmit, personIndex, person, TPLData;

  switch (formCategory) {
    case "edit":
      dealIndex = deals.map(deal => deal.id).indexOf(id);
      deal = deals[dealIndex];
      dealHed = constants.editDealHed(deal);
      handleFormSubmit = () => {
        event.preventDefault();
        newDeals[dealIndex] = { ...deal, ...formData };
        setDeals(newDeals);
      };
      break;
    case "new":
      personIndex = parties.map(party => party.id).indexOf(userId);
      person = parties[personIndex];
      TPLData = new TPLDataManager(0, person);
      deal = TPLData.buildDeal(person);
      dealHed = constants.newDealHed(person);
      handleFormSubmit = () => {
        event.preventDefault();
        newDeals.push({ ...deal, ...formData });
        setDeals(newDeals);
      };
      break;
    default:
      throw new Error("Every form needs a category");
  }

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
  const handleFormChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    setForm({ ...formData, [name]: value });
  };

  return (
    <Fragment>
      <MarketHed>{dealHed}</MarketHed>
      <Container default>
        <DealForm
          appData={deal}
          data={constants.formData}
          handleChange={handleFormChange}
          handleForm={handleFormSubmit}
        />
      </Container>
    </Fragment>
  );
}
