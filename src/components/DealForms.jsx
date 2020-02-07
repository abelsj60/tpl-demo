import constants from "../helpers/constants.js";
import DealForm from "./DealForm.jsx";
import formDataForDisplay from "../data/formDataForDisplay";
import cloneDeep from "lodash/cloneDeep";
import MarketHed from "./styledPrimitives/MarketHed.jsx";
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
  const { deals, setDeals, setMyDeals, setParties, parties, userId } = props;
  const location = useLocation();
  let history = useHistory();
  const formCategory = location.pathname.includes("new") ? "new" : "edit";
  const newDeals = cloneDeep(deals);
  // const newParties = cloneDeep(parties);
  let newDeal,
    newParties,
    dealHed,
    dealIndex,
    handleFormSubmit,
    personIndex,
    newPerson,
    TPLData;

  switch (formCategory) {
    case "edit":
      dealIndex = newDeals.map(deal => deal.id).indexOf(id);
      newDeal = newDeals[dealIndex];

      // A quick-n-dirty redirect for non-existent deal IDs. It happens
      // a lot b/c of dynamic dummy data. It obliterates deal IDs.
      if (typeof newDeal === "undefined") {
        return <Redirect to="/notfound" />;
      }

      dealHed = constants.editDealHed(newDeal);
      handleFormSubmit = () => {
        event.preventDefault();

        newDeals[dealIndex] = { ...newDeal, ...formData };
        setDeals(newDeals);

        history.push("/my-deals");
      };
      break;
    case "new":
      newParties = cloneDeep(parties);
      personIndex = newParties.map(party => party.id).indexOf(userId);
      newPerson = newParties[personIndex];
      TPLData = new TPLDataManager(0, newPerson, true);
      newDeal = TPLData.buildDeal(newPerson);
      dealHed = constants.newDealHed(newPerson);
      handleFormSubmit = () => {
        event.preventDefault();

        newDeals.push({ ...newDeal, ...formData });
        newPerson.dealIds.push(newDeal.id);
        newParties[personIndex] = newPerson;

        setDeals(newDeals.sort((a, b) => b.date - a.date));
        setMyDeals(newDeals.filter(deal => userId === deal.sellerId));
        setParties(newParties);

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
  } = newDeal;

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
          appData={newDeal}
          data={formDataForDisplay}
          handleChange={handleFormChange}
          handleForm={handleFormSubmit}
        />
      </Container>
    </Fragment>
  );
}
