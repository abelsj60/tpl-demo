import ButtonHolder from "./styledPrimitives/ButtonHolder.jsx";
import constants from "../helpers/constants.js";
import DealCard from "./DealCard.jsx";
import DealCardHolder from "./styledPrimitives/DealCardHolder.jsx";
import DealLink from "./styledPrimitives/DealLink.jsx";
import Graf from "./styledPrimitives/Graf.jsx";
import React, { Fragment } from "react";
import MarketHed from "./styledPrimitives/MarketHed.jsx";
import styled from "styled-components";

const RestyledGraf = styled(Graf)`
  margin-top: 10px;
  margin-left: 10px;
`;
const RestyledButtonHolder = styled(ButtonHolder)`
  margin-top: 15px;
  margin-left: 10px;
`;

export default function Deals(props) {
  const { dealMarketHed, dealSummary, myDealsHed } = constants;
  const { data, isMyDeals } = props;
  const dealSummaryHed = dealSummary(isMyDeals);
  const dealCount = isMyDeals
    ? data.length
    : data.filter(deal => deal.status === "Auction").length;

  return (
    <Fragment>
      <MarketHed>{!isMyDeals ? dealMarketHed : myDealsHed}</MarketHed>
      <RestyledGraf>{`${dealSummaryHed}: ${dealCount}`}</RestyledGraf>
      {isMyDeals && (
        <RestyledButtonHolder>
          <DealLink to="/deal/new">New deal</DealLink>
        </RestyledButtonHolder>
      )}
      <DealCardHolder grow>
        {data.map(
          (deal, idx) =>
            // Show all in My Deals, but only deals under "Auction" in Deal Market
            (isMyDeals || (!isMyDeals && deal.status === "Auction")) && (
              <DealCard isMyDeals={isMyDeals} idx={idx} deal={deal} key={idx} />
            )
        )}
      </DealCardHolder>
    </Fragment>
  );
}
