import DealForm from "./DealForm.jsx";
import constants from "../helpers/constants.js";
import MarketHed from "./MarketHed.jsx";
import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory, useLocation, useParams } from "react-router-dom";
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
  const { deals, setDeals, setMyDeals, parties, userId } = props;
  const location = useLocation();
  let history = useHistory();
  const formCategory = location.pathname.includes("new") ? "new" : "edit";
  const newDeals = deals.slice(0).map(deal => Object.assign({}, deal));
  let deal, dealHed, dealIndex, handleFormSubmit, personIndex, person, TPLData;

  switch (formCategory) {
    case "edit":
      dealIndex = deals.map(deal => deal.id).indexOf(id);
      deal = deals[dealIndex];

      // A quick-n-dirty redirect for non-existent deal IDs. It happens
      // a lot b/c of dynamic dummy data. It obliterates deal IDs.
      if (typeof deal === "undefined") {
        return <Redirect to="/notfound" />;
      }

      dealHed = constants.editDealHed(deal);
      handleFormSubmit = () => {
        event.preventDefault();
        newDeals[dealIndex] = { ...deal, ...formData };
        setDeals(newDeals);
        history.push("/my-deals");
      };
      break;
    case "new":
      personIndex = parties.map(party => party.id).indexOf(userId);
      person = parties[personIndex];
      TPLData = new TPLDataManager(0, person, true);
      deal = TPLData.buildDeal(person);
      dealHed = constants.newDealHed(person);
      handleFormSubmit = () => {
        event.preventDefault();
        newDeals.push({ ...deal, ...formData });
        setDeals(newDeals.sort((a, b) => b.date - a.date));
        setMyDeals(newDeals.filter(deal => userId === deal.ownerId));
        history.push("/my-deals");
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

  /* The Rule of Hooks:
    The React team says the following use of useState() violate the
    Rule of Hooks. I don't think it does b/c the early return sends the
    user to the not-found route, meaning we never come back through 
    here in a way that perverts the sequential order of hooks. 
    So, I've disabled the rule for the next line only. */
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
