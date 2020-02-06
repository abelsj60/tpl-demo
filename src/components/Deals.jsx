import Asset from "./Asset.jsx";
import AssetHolder from "./AssetHolder.jsx";
import React, { Fragment } from "react";
import MarketHed from "./MarketHed.jsx";

export default function Deals(props) {
  const { deals } = props;
  return (
    <Fragment>
      <MarketHed>Deal Market</MarketHed>
      <AssetHolder grow>
        {deals.map((deal, idx) => (
          <Asset idx={idx} deal={deal} key={idx} />
        ))}
      </AssetHolder>
    </Fragment>
  );
}
