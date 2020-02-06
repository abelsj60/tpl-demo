import Chance from "chance";

export default function createVariables(idx, person) {
  const chance = new Chance();

  return {
    accountantIdx: chance.integer({ min: 0, max: 2 }),
    address: chance.address(),
    bankIdx: chance.integer({ min: 0, max: 2 }),
    bidIdx: chance.integer({ min: 0, max: 5 }),
    bidId: chance.string({
      length: 5,
      pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    }),
    categoryIdx: chance.integer({ min: 0, max: 3 }),
    city: chance.city(),
    date: chance.date({ string: true, year: 2019 }),
    dealId: chance.string({
      length: 5,
      pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    }),
    description: chance.sentence({ words: 10 }),
    // Only needed when building partyArr (empty string irrelevant)
    first: typeof person !== "undefined" ? person.first : "",
    jurisdictionIdx: chance.integer({ min: 0, max: 7 }),
    // Only needed when building partyArr (empty string irrelevant)
    last: typeof person !== "undefined" ? person.last : "",
    lawFirmIdx: chance.integer({ min: 0, max: 2 }),
    litigationIdx: chance.integer({ min: 0, max: 1 }),
    partyIdx: idx,
    sic: chance.floating({ min: 100, max: 999, fixed: 0 }),
    state: chance.state(),
    typeIdx: chance.integer({ min: 0, max: 2 }),
    zip: chance.zip()
  };
}
