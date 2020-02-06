import Chance from "chance";
import enums from "../helpers/enums";

export default class TPLDataManager {
  constructor(idx, person) {
    const chance = new Chance();

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
    this.date = chance.date({ string: true, year: 2019 });
    this.dealId = chance.string({
      length: 5,
      pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    });
    this.description = chance.sentence({ words: 10 });
    // Only needed when building partyArr (empty string irrelevant)
    this.first = typeof person !== "undefined" ? person.first : "";
    this.jurisdictionIdx = chance.integer({ min: 0, max: 7 });
    // Only needed when building partyArr (empty string irrelevant)
    this.last = typeof person !== "undefined" ? person.last : "";
    this.lawFirmIdx = chance.integer({ min: 0, max: 2 });
    this.litigationIdx = chance.integer({ min: 0, max: 1 });
    this.partyIdx = idx;
    this.sic = chance.floating({ min: 100, max: 999, fixed: 0 });
    this.state = chance.state();
    this.typeIdx = chance.integer({ min: 0, max: 2 });
    this.zip = chance.zip();
  }

  buildBid(person, deal) {
    return {
      id: this.bidId,
      dealId: deal.id,
      ownerId: person.id,
      amount: `$${enums.bidValues[this.bidIdx]} million`
    };
  }

  buildDeal(person) {
    return {
      category: enums.dealType[this.categoryIdx],
      currentBid: { amount: "", bidId: "", partyId: "" },
      id: this.dealId,
      jurisdiction: enums.country[this.jurisdictionIdx],
      ownerId: person && person.id,
      ownerFirst: person && person.first,
      ownerLast: person && person.last,
      minimumBid: 1000000,
      litigationStatus: enums.lawsuits[this.litigationIdx],
      description: this.description,
      date: this.date,
      bidHistory: [],
      sic: this.sic
    };
  }

  buildParty() {
    return {
      id: enums.partyIds[this.partyIdx],
      first: this.first,
      last: this.last,
      address: this.address,
      state: this.state,
      city: this.city,
      zip: this.zip,
      email: `${this.last}@gmmaail.com`,
      type: enums.type[this.typeIdx],
      lawFirm: enums.lawFirm[this.lawFirmIdx],
      bank: enums.bank[this.bankIdx],
      accountant: enums.accountant[this.accountantIdx],
      dealIds: [],
      bidIds: []
    };
  }
}
