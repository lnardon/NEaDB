# NEaDB

[![NPM](https://img.shields.io/npm/v/neadb.svg)](https://www.npmjs.com/package/neadb) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Not Exactly a DataBase(NEaDB) is a package to simulate a small and easy to use database using node and json. This databse module uses a key value pair to store the values in a json file.

## Installation

```bash
npm install neadb
```

## Usage

```js
const { neadb } = require("neadb");

const db = neadb();
```

## Avaiable functions

```js
db.create(); // Function to create

db.createKey(key); // Creates json key to store values

db.deleteKey(key); // Deletes json key with it's value

db.storeValue(key, value); // Store value in a given key

db.deleteValue(key); // Delete value in a given key

db.getValue(key); // Retrieves value from given key

db.getLastUpdated(); // Retrieves last update date from database file
```
