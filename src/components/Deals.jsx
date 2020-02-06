import Asset from "./Asset.jsx";
import AssetHolder from "./AssetHolder.jsx";
import Graf from "./Graf.jsx";
import React, { Fragment } from "react";
import MarketHed from "./MarketHed.jsx";
import styled from "styled-components";

const RestyledGraf = styled(Graf)`
  margin-top: 10px;
  margin-left: 10px;
`;

export default function Deals(props) {
  const { deals } = props;
  return (
    <Fragment>
      <MarketHed>Deal Market</MarketHed>
      <RestyledGraf>Active deals: {deals.length}</RestyledGraf>
      <AssetHolder grow>
        {deals.map((deal, idx) => (
          <Asset idx={idx} deal={deal} key={idx} />
        ))}
      </AssetHolder>
    </Fragment>
  );
}
