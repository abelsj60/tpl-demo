import DataBracket from "./styledPrimitives/DataBracket.jsx";
import DataLabel from "./styledPrimitives/DataLabel.jsx";
import Graf from "./styledPrimitives/Graf.jsx";
import React from "react";

export default function DealItem(props) {
  return (
    <DataBracket {...props}>
      <DataLabel>{props.label}</DataLabel>
      <Graf grow>{props.text}</Graf>
    </DataBracket>
  );
}
