import enums from "../helpers/enums.js";
import DealForm from "./DealForm.jsx";
import React, { Fragment, useState } from "react";
import MarketHed from "./MarketHed.jsx";
import { useParams } from "react-router-dom";
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

export default function EditDeal(props) {
  const { id } = useParams();
  const { deals, setDeals } = props;
  const dealIndex = deals.map(deal => deal.id).indexOf(id);
  const deal = deals[dealIndex];
  const {
    category,
    jurisdiction,
    minimumBid,
    litigationStatus,
    description,
    sic
  } = deal;
  const dataRoomHed = `Edit your '${category}' deal`;
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
  const handleFormSubmit = event => {
    event.preventDefault();
    const newDeals = deals.slice(0).map(deal => Object.assign({}, deal));
    newDeals[dealIndex] = { ...deal, ...formData };
    setDeals(newDeals);
  };

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
