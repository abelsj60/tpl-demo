export default (deal, party) => {
  return {
    deal: [
      { hed: "Deal data" },
      {
        label: "Deal id",
        text: deal.id
      },
      {
        label: "Asset class",
        text: deal.category
      },
      {
        label: "Date",
        text: deal.date.toLocaleDateString("en-US")
      },
      {
        label: "Offeror",
        text: `${party.first} ${party.last}`
      },
      {
        label: "Jurisdiction",
        text: deal.jurisdiction
      },
      {
        label: "Litigation status",
        text: deal.litigationStatus
      },
      {
        label: "Description",
        text: deal.description
      },
      {
        label: "SIC",
        text: deal.sic
      },
      {
        label: "Status",
        text: deal.status
      }
    ],
    party: [
      { hed: "Party data" },
      {
        label: "Type",
        text: party.type
      },
      {
        label: "Address",
        text: party.address
      },
      {
        label: "City",
        text: party.city
      },
      {
        label: "State",
        text: party.state
      },
      {
        label: "Zip",
        text: party.zip
      },
      {
        label: "Email",
        text: party.email
      },
      {
        label: "Law firm",
        text: party.lawFirm
      },
      {
        label: "Bank",
        text: party.bank
      },
      {
        label: "Accountant",
        text: party.accountant
      }
    ]
  };
};
