import config from "../config.json";
import constants from "./helpers/constants";
import DealRoom from "./components/DealRoom.jsx";
import DealForms from "./components/DealForms.jsx";
import Deals from "./components/Deals.jsx";
import enums from "./definitions/enums";
import Graf from "./components/styledPrimitives/Graf.jsx";
import cloneDeep from "lodash/cloneDeep";
import { Link } from "react-router-dom";
import React, { Fragment, useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import TPLDataManager from "./data/TPLDataManager.js";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: aliceblue;
  }

  #app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin: 0 8px;
  }
`;
const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;
// eslint-disable-next-line no-unused-vars
const RestyledLink = styled(({ addFlex, center, ...rest }) => (
  <Link {...rest} />
))`
  flex: ${p => p.addFlex && "1"};
  color: black;
  text-decoration: none;
  text-align: ${p => p.center && "center"};

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;
const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0.9rem 0rem;
  // Required for silly flexbox browser bug.
  min-height: 0;
`;
const NavContainer = styled.div``;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userId] = useState(config.userId);
  const [parties, setParties] = useState([]);
  const [deals, setDeals] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [bids, setBids] = useState([]);
  const [myDeals, setMyDeals] = useState([]);
  const location = useLocation();
  const isMyDeals = location.pathname.includes("my-deals");
  const dealsData = !isMyDeals ? deals : myDeals;

  useEffect(() => {
    // Create dummy data on mount.
    const bidArr = [],
      dealArr = [],
      // Set deal count for dummy data
      dealCount = config.dealCount >= 5 ? config.dealCount : 5;
    // Assign specific person to deals/bids to ensure consistency.
    let personCount = 0;

    // Build party object for all users (see enums).
    const partyArr = enums.partyNames.map((person, idx) => {
      const TPLData = new TPLDataManager(idx, person);
      return TPLData.buildParty();
    });

    // Let's loop to create all deals (based on dealCount).
    for (let i = 0; i < dealCount; i++) {
      const person = partyArr[personCount]; // Convenient.
      // Build variable object for easy data/object creation.
      const TPLData = new TPLDataManager(personCount);
      const deal = TPLData.buildDeal(person);
      const bid = TPLData.buildBid(person, deal);

      // Update deal, person, and bid objects w/final creation data.
      deal.currentBid = {
        accepted: false,
        amount: bid.amount,
        bidId: bid.id,
        date: bid.date,
        sellerId: person.id
      };
      deal.bidHistory.push({
        accepted: false,
        amount: bid.amount,
        bidId: bid.id,
        date: bid.date,
        sellerId: person.id
      });
      person.dealIds.push(deal.id);
      person.bidIds.push(bid.id);
      dealArr.push(deal);
      bidArr.push(bid);

      // Increment personCount so as to ensure consistency.
      if (personCount < 4) {
        personCount += 1;
      } else {
        personCount = 0;
      }
    }

    // Let's set the various states (and sort deals by date).
    setBids(bidArr);
    setDeals(dealArr.sort((a, b) => b.date - a.date));
    setParties(partyArr);

    // Update my-deals for current user (currently always Jack Frost).
    // Note, should be sorted by date b/c we're working off dealArr.
    const newMyDeals = cloneDeep(dealArr);
    setMyDeals(newMyDeals.filter(deal => userId === deal.sellerId));
    setLoading(false);
  }, []); // Only run this effect when mounting...

  console.log("bids:", bids);

  return (
    <Fragment>
      <GlobalStyle />
      <Header>
        <div>
          <RestyledLink addFlex={true} to="/">
            {constants.name}
          </RestyledLink>
        </div>
        <NavContainer>
          {constants.navLinks.map(link => (
            <RestyledLink
              addFlex={true}
              center={true}
              key={link.text}
              to={link.url}
            >
              {link.text}
            </RestyledLink>
          ))}
        </NavContainer>
      </Header>
      <Main>
        {!loading ? (
          <Switch>
            <Route
              exact
              path={["/", "/deals", "/my-deals"]}
              render={() => <Deals data={dealsData} isMyDeals={isMyDeals} />}
            />
            <Route
              exact
              path={["/deal/new", "/deal/:id/edit"]}
              render={() => (
                <DealForms
                  grow
                  deals={deals}
                  marginRight="1rem"
                  parties={parties}
                  setDeals={setDeals}
                  setParties={setParties}
                  setMyDeals={setMyDeals}
                  userId={userId}
                />
              )}
            />
            <Route
              exact
              path="/dealroom/:id"
              render={() => (
                <DealRoom
                  deals={deals}
                  loading={loading}
                  parties={parties}
                  bids={bids}
                  setBids={setBids}
                  setDeals={setDeals}
                  setMyDeals={setMyDeals}
                  setParties={setParties}
                  userId={userId}
                />
              )}
            />
            <Route
              render={() => (
                <Graf style={{ marginLeft: "10px" }}>Not found</Graf>
              )}
            />
          </Switch>
        ) : (
          <div style={{ marginLeft: "10px" }}>Loading...</div>
        )}
      </Main>
      <Footer>
        <Graf>{constants.support}</Graf>
        <Graf>{constants.copyright}</Graf>
      </Footer>
    </Fragment>
  );
}
