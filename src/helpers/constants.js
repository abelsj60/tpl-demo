export default {
  copyright: "2020. TPL, Inc. All rights reserved.",
  dealMarketHed: "Deal Market",
  dealRoomHed: deal =>
    `Deal Room for ${deal.sellerFirst} ${deal.sellerLast}'s '${deal.category}' deal`,
  editDealHed: deal => `Edit your '${deal.category}' deal`,
  motto: "Alternative equities",
  myDealsHed: "My Deals",
  myDealRoomHed: deal => `This is your '${deal.category}' deal`,
  name: "Triple Point",
  navLinks: [
    { text: "Deals", url: "/" },
    { text: "My deals", url: "/my-deals" }
  ],
  newDealHed: person =>
    // Quick fix. This keeps the Hed in check when loading on a new deal.
    `Hi${person ? " " + person.first : ""}, let's make a deal.`,
  support: "help@tpl.comnet"
};
