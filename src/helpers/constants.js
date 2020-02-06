import enums from "./enums.js";

export default {
  copyright: "TPL, Inc. All rights reserved.",
  editDealHed: deal => `Edit your '${deal.category}' deal`,
  formData: [
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
  ],
  motto: "Alternative equities",
  name: "Triple Point Liquidity",
  navLinks: [
    { text: "Deals", url: "/" },
    { text: "My deals", url: "/my-deals" }
  ],
  newDealHed: person =>
    // Quick fix. This keeps the Hed in check when loading on a new deal.
    `Hi${person ? " " + person.first : ""}, let's make a deal.`,
  support: "help@tpl.com"
};
