import ButtonHolder from "./ButtonHolder.jsx";
import constants from "../helpers/constants.js";
import DealCard from "./DealCard.jsx";
import DealCardHolder from "./DealCardHolder.jsx";
import DealLink from "./DealLink.jsx";
import Graf from "./Graf.jsx";
import React, { Fragment } from "react";
import MarketHed from "./MarketHed.jsx";
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
  const { dealMarketHed, myDealsHed } = constants;
  const { data, isMyDeals } = props;

  return (
    <Fragment>
      <MarketHed>{!isMyDeals ? dealMarketHed : myDealsHed}</MarketHed>
      <RestyledGraf>Active deals: {data.length}</RestyledGraf>
      {isMyDeals && (
        <RestyledButtonHolder>
          <DealLink to="/deal/new">New deal</DealLink>
        </RestyledButtonHolder>
      )}
      <DealCardHolder grow>
        {data.map(
          (deal, idx) =>
            deal.status !== "due diligence" && (
              <DealCard isMyDeals={isMyDeals} idx={idx} deal={deal} key={idx} />
            )
        )}
      </DealCardHolder>
    </Fragment>
  );
}
