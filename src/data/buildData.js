import enums from "../helpers/enums";

const party = vals => ({
  id: enums.partyIds[vals.partyIdx],
  first: vals.first,
  last: vals.last,
  address: vals.address,
  state: vals.state,
  city: vals.city,
  zip: vals.zip,
  email: `${vals.last}@gmmaail.com`,
  type: enums.type[vals.typeIdx],
  lawFirm: enums.lawFirm[vals.lawFirmIdx],
  bank: enums.bank[vals.bankIdx],
  accountant: enums.accountant[vals.accountantIdx],
  dealIds: [],
  bidIds: []
});
const deal = (vals, person) => ({
  category: enums.dealType[vals.categoryIdx],
  currentBid: { amount: "", bidId: "", partyId: "" },
  id: vals.dealId,
  jurisdiction: enums.country[vals.jurisdictionIdx],
  ownerId: person && person.id,
  ownerFirst: person && person.first,
  ownerLast: person && person.last,
  minimumBid: 1000000,
  litigationStatus: enums.lawsuits[vals.litigationIdx],
  description: vals.description,
  date: vals.date,
  bidHistory: [],
  sic: vals.sic
});
const bid = (vals, person, deal) => ({
  id: vals.bidId,
  dealId: deal.id,
  ownerId: person.id,
  amount: `$${enums.bidValues[vals.bidIdx]} million`
});

export default function buildData() {
  return { bid, deal, party };
}
