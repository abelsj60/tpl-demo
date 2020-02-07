import enums from "../definitions/enums.js";

export default [
  { name: "category", nickname: "Category", selectorData: enums.dealType },
  {
    name: "jurisdiction",
    nickname: "Jurisdiction",
    selectorData: enums.country
  },
  { name: "minimumBid", nickname: "Minimum bid", selectorData: [] },
  {
    name: "litigationStatus",
    nickname: "Litigation status",
    selectorData: enums.lawsuits
  },
  { name: "description", nickname: "Description", selectorData: [] },
  { name: "sic", nickname: "SIC", selectorData: [] }
];
