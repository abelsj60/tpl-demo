# TPL Demo

## Overview

This is a sample app of a marketplace for alternative investments. It consists of two main views:

- A simple list of deals (all deals, and the user's deals).
- Deal Rooms. Every deal gets a deal room to transact business.

Deal Rooms are context sensitive. Deal owners will see an "Accept" button, everyone else will see a "Bid" button.

![home page](/tpl-home.png)

## Getting Started

To get started, clone the repo:

```
git clone https://github.com/abelsj60/tpl-demo.git
```

And run:

```
yarn install
```

## Bundle & Serve

Parcel will bundle the app and start up a server when you run this script in your favorite terminal:

```
npm run dev
```

The development server should be running here once you start up:

```
http://localhost:1234/
```

## Lint & Beautify

This project's linted and beautified via ESLint and Prettier. The configs are here:

```
ESLint: .eslintrc.json
Prettier: .prettierrc
```

## Code

The app's entry point is here:

```
/src/index.js
```

Proper React Components can be found here:

```
/src/App.js
/src/components
/src/components/styledPrimitives
(styledPrimitives? Good when a Styled Component begs for reuse...)
```

## Data

Major data is stored and managed here:

```
/src/data
```

The `TPLDataManager` builds deals, parties, and bids, while the other files manage smaller data objects and functions to help keep everything clean, simple, and tight.

Some poor man's enums (in plain JS) can be found here:

```
/src/definitions
```

A constants file with some additional data for configuration can be found here:

```
/src/helpers
```

## App config

You can control how many deals are included in the app and the active user by updating:

```
config.json

(See enums.partyId for a list of preconfigured, index-sensitive userIds.)
```
