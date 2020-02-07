export default (deal, isMyDeals) => {
  const offerorOrStatusItem = !isMyDeals
    ? { label: "Offeror", text: `${deal.sellerFirst} ${deal.sellerLast}` }
    : { label: "Status", text: deal.status };
  return [
    { label: "Deal ID", text: deal.id },
    { label: "Date", text: deal.date.toLocaleDateString("en-US") },
    { label: "Asset class", text: deal.category },
    offerorOrStatusItem,
    { label: "Jurisdiction", text: deal.jurisdiction },
    {
      label: "Current bid",
      text: `$${deal.currentBid.amount.toLocaleString()}`
    }
  ];
};
