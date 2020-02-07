import DataBracket from "./DataBracket.jsx";
import DataLabel from "./DataLabel.jsx";
import Graf from "./Graf.jsx";
import React from "react";

export default function DealItem(props) {
  return (
    <DataBracket {...props}>
      <DataLabel>{props.label}</DataLabel>
      <Graf grow>{props.text}</Graf>
    </DataBracket>
  );
}
