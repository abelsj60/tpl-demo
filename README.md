# TPL Demo

To get started, just run:

```
npm install
```

or

```
yarn install
```

## Bundle & Serve

Parcel will bundle the app and start up a server when you run this script:

```
npm run dev
```

All the scripts can be found in the usual place:

```
package.json
```

## Lint & Beautify

This project's linted and beautified via ESLint and Prettier, configs here:

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
/src/App.jsx
/src/components
/src/components/styledPrimitives (for when a Styled Component begs for reuse).
```

## Data

Major data is stored and managed here:

```
/src/data
```

The `TPLDataManager` builds deals, parties, and bids, while the other files manage smaller data objects and functions to help keep everything clean, simple, and tight.

Some poor man's enums (in plane JS) can be found here:

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

(See enums.partyId for a list of preconfigured, index-sensitive userIds)
```
