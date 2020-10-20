"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class neadb {
    // Private function to update the lastUpdate field from the database json file
    updateLastUpdated(data) {
        data["lastUpdated"] = new Date();
        return JSON.stringify(data);
    }
    // Creates DB instance file
    create() {
        return new Promise((resolve, reject) => {
            const dbData = { createdAt: new Date(), lastUpdated: new Date() };
            fs_1.default.writeFile("./neadb.json", JSON.stringify(dbData), (err) => {
                if (err)
                    throw err;
                resolve();
            });
        });
    }
    // Creates database key
    createKey(key) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile("./neadb.json", "utf-8", (err, data) => {
                if (err)
                    throw err;
                let dbData = JSON.parse(data);
                dbData[key] = "{}";
                fs_1.default.writeFile("./neadb.json", this.updateLastUpdated(dbData), (err) => {
                    if (err)
                        throw err;
                    resolve();
                });
            });
        });
    }
    // Deletes given key from database
    deleteKey(key) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile("./neadb.json", "utf-8", (err, data) => {
                if (err)
                    throw err;
                let dbData = JSON.parse(data);
                if (dbData[key]) {
                    delete dbData[key];
                }
                else {
                    console.log("Key not found");
                }
                fs_1.default.writeFile("./neadb.json", this.updateLastUpdated(dbData), (err) => {
                    if (err)
                        throw err;
                });
            });
            resolve();
        });
    }
    // Retrieves available keys from database
    getKeys() {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile("./neadb.json", "utf-8", (err, data) => {
                if (err)
                    throw err;
                let dbData = JSON.parse(data);
                if (dbData) {
                    console.log(Object.keys(dbData));
                }
                else {
                    console.log("No keys found");
                }
                return;
            });
            resolve();
        });
    }
    // Retrieves available keys from database
    duplicateKey(key, newKeyName) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile("./neadb.json", "utf-8", (err, data) => {
                if (err)
                    throw err;
                let dbData = JSON.parse(data);
                if (dbData[key]) {
                    dbData[newKeyName] = dbData[key];
                    fs_1.default.writeFile("./neadb.json", this.updateLastUpdated(dbData), (err) => {
                        if (err)
                            throw err;
                    });
                    console.log("Key duplicated!");
                }
                else {
                    console.log("Key not found.");
                }
            });
            resolve();
        });
    }
    // Adds data to given key
    storeValue(key, value) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile("./neadb.json", "utf-8", (err, data) => {
                if (err)
                    throw err;
                let dbData = JSON.parse(data);
                dbData[key] = value;
                fs_1.default.writeFile("./neadb.json", this.updateLastUpdated(dbData), (err) => {
                    if (err)
                        throw err;
                });
            });
            resolve();
        });
    }
    // Removes data from given key
    deleteValue(key, value) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile("./neadb.json", "utf-8", (err, data) => {
                if (err)
                    throw err;
                let dbData = JSON.parse(data);
                dbData[key] = "";
                fs_1.default.writeFile("./neadb.json", this.updateLastUpdated(dbData), (err) => {
                    if (err)
                        throw err;
                });
            });
            resolve();
        });
    }
    // Retrieves value from given key
    getValue(key) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile("./neadb.json", "utf-8", (err, data) => {
                if (err)
                    throw err;
                let dbData = JSON.parse(data);
                if (dbData[key]) {
                    resolve(dbData[key]);
                }
                else {
                    console.log("Key not found");
                }
            });
        });
    }
    // Retrieves last updated date
    getLastUpdated() {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile("./neadb.json", "utf-8", (err, data) => {
                if (err)
                    throw err;
                let dbData = JSON.parse(data);
                if (dbData["lastUpdated"]) {
                    return dbData["lastUpdated"];
                }
                else {
                    console.log("Date not found");
                }
            });
            resolve();
        });
    }
}
module.exports = { neadb };
//# sourceMappingURL=index.js.map