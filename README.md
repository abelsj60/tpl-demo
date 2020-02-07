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

Then, Parcel will bundle the app and start up a server when you run this script:

```
npm run dev
```

Which, of course, can be found in the usual place:

```
package.json
```

This project gets a little extra assistance from Babel, which can be configured here:

```
.babelrc
```

## Lint & Beautify

It's linted and beautified via ESLint and Prettier, configs here:

```
ESLint: .eslintrc.json
Prettier: .prettierrc
```

## Code

The app's entry point is here:

```
/src/index.js
```

Proper React Components, using hooks, can be found here:

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

Speaking of which, a poor man's JavaScript file of enums can be found in definitions. It helps with data assembly and management:

```
/src/definitions
```

A constants file with some additional data for configuration can be found here:

```
/src/helpers
```

## App config

Finally, you can control how many deals are included in the app and the user via a config file:

```
config.json
```

See enums.partyId for a list of preconfigured, index-sensitive userIds.
