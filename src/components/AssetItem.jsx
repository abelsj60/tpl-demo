import DataBracket from "./DataBracket.jsx";
import DataLabel from "./DataLabel.jsx";
import Graf from "./Graf.jsx";
import React from "react";

export default function AssetItem(props) {
  return (
    <DataBracket grow={props.grow} bottomMargin={props.bottomMargin}>
      <DataLabel>{props.label}</DataLabel>
      <Graf grow>{props.text}</Graf>
    </DataBracket>
  );
}
