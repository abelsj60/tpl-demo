import Asset from "./Asset.jsx";
import AssetHolder from "./AssetHolder.jsx";
import ButtonHolder from "./ButtonHolder.jsx";
import constants from "../helpers/constants.js";
import DealButton from "./DealButton.jsx";
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
          <DealButton to="/deal/new">New deal</DealButton>
        </RestyledButtonHolder>
      )}
      <AssetHolder grow>
        {data.map((deal, idx) => (
          <Asset isMyDeals={isMyDeals} idx={idx} deal={deal} key={idx} />
        ))}
      </AssetHolder>
    </Fragment>
  );
}
