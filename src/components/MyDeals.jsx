import Asset from "./Asset.jsx";
import AssetHolder from "./AssetHolder.jsx";
import ButtonHolder from "./ButtonHolder.jsx";
import DealButton from "./DealButton.jsx";
import React, { Fragment } from "react";
import MarketHed from "./MarketHed.jsx";
import styled from "styled-components";

const RestyledButtonHolder = styled(ButtonHolder)`
  margin-top: 15px;
  margin-left: 10px;
`;

export default function MyDeals(props) {
  const { myDeals } = props;

  return (
    <Fragment>
      <MarketHed>My deals</MarketHed>
      <RestyledButtonHolder>
        <DealButton to="/deal/new">New deal</DealButton>
      </RestyledButtonHolder>
      <AssetHolder>
        {myDeals.map((deal, idx) => (
          <Asset idx={idx} deal={deal} key={idx} owner={true} />
        ))}
      </AssetHolder>
    </Fragment>
  );
}
