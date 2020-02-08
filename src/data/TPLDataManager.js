import Chance from "chance";
import enums from "../definitions/enums";

// This class dynamically builds dummy data for this demo app.
// The class relies on Chance.js to add some randomness to it.

export default class TPLDataManager {
  constructor(idx, person, overrideNow) {
    const chance = new Chance();

    // These properties will be relied on by the class's methods
    // when building data objects.
    this.accountantIdx = chance.integer({ min: 0, max: 2 });
    this.address = chance.address();
    this.bankIdx = chance.integer({ min: 0, max: 2 });
    this.bidIdx = chance.integer({ min: 0, max: 5 });
    this.bidId = chance.string({
      length: 5,
      pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    });
    this.categoryIdx = chance.integer({ min: 0, max: 3 });
    this.city = chance.city();
    // Use the override to make the date match the now.
    this.date = !overrideNow
      ? new Date(chance.date({ year: 2019, american: false }))
      : new Date();
    this.dealId = chance.string({
      length: 5,
      pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    });
    this.description = chance.sentence({ words: 10 });
    // Only needed when building a party, empty string irrelevant.
    this.first = typeof person !== "undefined" ? person.first : "";
    this.jurisdictionIdx = chance.integer({ min: 0, max: 7 });
    // Only needed when building a party, empty string irrelevant.
    this.last = typeof person !== "undefined" ? person.last : "";
    this.lawFirmIdx = chance.integer({ min: 0, max: 2 });
    this.litigationIdx = chance.integer({ min: 0, max: 1 });
    this.partyIdx = idx;
    this.sic = chance.floating({ min: 100, max: 999, fixed: 0 });
    this.state = chance.state();
    this.typeIdx = chance.integer({ min: 0, max: 2 });
    this.zip = chance.zip();
  }

  buildBid(person, deal, bid) {
    const chance = new Chance();
    const personId = person.id ? person.id : person;
    const validBidOwnerIds = enums.partyIds.filter(id => id !== personId);
    const bidOwnerIdx = chance.integer({
      min: 0,
      max: validBidOwnerIds.length - 1
    });

    return {
      accepted: false,
      amount: !bid ? enums.bidValues[this.bidIdx] : parseInt(bid),
      // Date of deal creation or now if override is on.
      date: this.date,
      dealId: deal.id,
      id: this.bidId,
      // Quick bug fix: Can be an obj or the userId:
      ownerId: !bid ? validBidOwnerIds[bidOwnerIdx] : personId
    };
  }

  buildDeal(person) {
    return {
      bidHistory: [],
      buyerId: "",
      category: enums.dealType[this.categoryIdx],
      currentBid: {
        accepted: false,
        amount: 0,
        bidId: "",
        date: "",
        ownerId: ""
      },
      date: this.date,
      description: this.description,
      id: this.dealId,
      jurisdiction: enums.country[this.jurisdictionIdx],
      litigationStatus: enums.lawsuits[this.litigationIdx],
      minimumBid: 1000000,
      sellerId: person && person.id,
      sellerFirst: person && person.first,
      sellerLast: person && person.last,
      status: "Auction",
      sic: this.sic
    };
  }

  buildParty() {
    return {
      accountant: enums.accountant[this.accountantIdx],
      address: this.address,
      bank: enums.bank[this.bankIdx],
      bidIds: [],
      city: this.city,
      closedDeals: [],
      dealIds: [],
      email: `${this.last}@gmmaail.com`,
      first: this.first,
      id: enums.partyIds[this.partyIdx],
      last: this.last,
      lawFirm: enums.lawFirm[this.lawFirmIdx],
      state: this.state,
      type: enums.type[this.typeIdx],
      zip: this.zip
    };
  }
}
