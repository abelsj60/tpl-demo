import Asset from "./components/Asset.jsx";
import constants from "./helpers/constants";
import createVariables from "./helpers/createVariables";
import enums from "./helpers/enums";
import Graf from "./components/Graf.jsx";
import buildData from "./data/buildData";
import { Link } from "react-router-dom";
// import normalizer from "./helpers/normalizer";
import React, { Fragment, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

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
const AssetHolder = styled.div`
  flex: 1;
  background-color: white;
  margin: 10px;
  overflow: auto;
`;
// const Filter = styled.div`
//   flex: 1;
//   height: ${p => p.default && "2.25rem"};
//   width: ${p => p.default && "4rem"};
//   background-color: ${p => (p.no % 2 === 0 ? "white" : "lightgrey")};
// `;
const ButtonHolder = styled.div`
  display: flex;
  margin: 10px 10px 15px;
  height: ${p => p.default && "2.25rem"};
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
`;
const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0.9rem 0rem;
  // Required for silly flexbox browser bug.
  min-height: 0;
`;
const MarketHed = styled.h1`
  font-size: 1.75rem;
  margin: 0 10px;
`;
const NavContainer = styled.div`
  flex: 0.25;
  display: flex;
`;
const NewDealButton = styled.button`
  margin: 0;
  height: 2rem;
  color: white;
  background-color: blue;
  border: none;
`;

export default function App() {
  const [userId, setUser] = useState("mno");
  const [parties, setParties] = useState([]);
  const [deals, setDeals] = useState([]);
  const [bids, setBids] = useState([]);
  const [myDeals, setMyDeals] = useState([]);

  useEffect(() => {
    // Create dummy data on mount.
    const build = buildData(),
      bidArr = [],
      dealArr = [],
      // Set deal count for dummy data
      dealCount = 11;
    // Assign specific person to deals/bids to ensure consistency.
    let personCount = 0;

    // Build party object for all users (see enums).
    const partyArr = enums.partyNames.map((person, idx) =>
      build.party(createVariables(idx, person))
    );

    // Let's loop to create all deals (based on dealCount).
    for (let i = 0; i < dealCount; i++) {
      const person = partyArr[personCount]; // Convenient.
      // Build variable object for easy data/object creation.
      const variables = createVariables(personCount);
      const deal = build.deal(variables, person);
      const bid = build.bid(variables, person, deal);

      // Update deal, person, and bid objects w/final data.
      deal.currentBid = {
        amount: bid.amount,
        bidId: bid.id,
        partyId: person.id
      };
      deal.bidHistory.push({
        amount: bid.amount,
        bidId: bid.id,
        partyId: person.id
      });
      person.dealIds.push(deal.id);
      person.bidIds.push(bid.id);
      dealArr.push(deal);
      bidArr.push(bid);
      // setState...
      setParties(partyArr);
      setDeals(dealArr);
      setBids(bidArr);

      // Increment personCount so as to ensure consistency.
      if (personCount < 4) {
        personCount += 1;
      } else {
        personCount = 0;
      }
    }

    // Update my-deals for current user (now: default).
    setMyDeals(dealArr.filter(deal => userId === deal.ownerId));
  }, []);

  return (
    <Fragment>
      <GlobalStyle />
      <Header>
        <RestyledLink addFlex={true} to="/">
          {constants.name}
        </RestyledLink>
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
        <Switch>
          <Route
            exact
            path={["/", "/deals"]}
            render={() => (
              <Fragment>
                <MarketHed>Active</MarketHed>
                <AssetHolder>
                  {deals.map((deal, idx) => (
                    <Asset idx={idx} deal={deal} key={idx} />
                  ))}
                </AssetHolder>
              </Fragment>
            )}
          />
          <Route
            path="/my-deals"
            render={() => (
              <Fragment>
                <MarketHed>My deals</MarketHed>
                <ButtonHolder>
                  <NewDealButton>New deal</NewDealButton>
                </ButtonHolder>
                <AssetHolder>
                  {myDeals.map((deal, idx) => (
                    <Asset idx={idx} deal={deal} key={idx} />
                  ))}
                </AssetHolder>
              </Fragment>
            )}
          />
          <Route
            exact
            path="/deal/:id"
            render={({ match }) => {
              return (
                <Fragment>
                  <MarketHed>Data room for TK</MarketHed>
                  <div>{match.params.id}</div>
                </Fragment>
              );
            }}
          />
        </Switch>
      </Main>
      <Footer>
        <Graf>{constants.support}</Graf>
        <Graf>{constants.copyright}</Graf>
      </Footer>
    </Fragment>
  );
}
