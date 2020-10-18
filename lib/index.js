"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class neadb {
    // Creates DB instance file
    create() {
        const dbData = { createdAt: new Date() };
        fs_1.default.writeFile("./neadb.json", JSON.stringify(dbData), (err) => {
            if (err)
                throw err;
        });
    }
    // Creates database key
    createKey(key) {
        fs_1.default.readFile("./neadb.json", "utf-8", (err, data) => {
            if (err)
                throw err;
            let dbData = JSON.parse(data);
            dbData[key] = {};
            fs_1.default.writeFile("./neadb.json", JSON.stringify(dbData), (err) => {
                if (err)
                    throw err;
            });
        });
    }
    // Adds data to given key
    storeValue(key, value) {
        fs_1.default.readFile("./neadb.json", "utf-8", (err, data) => {
            if (err)
                throw err;
            let dbData = JSON.parse(data);
            dbData[key] = value;
            fs_1.default.writeFile("./neadb.json", JSON.stringify(dbData), (err) => {
                if (err)
                    throw err;
            });
        });
    }
    // Retrieves value from given key
    getValue(key) {
        fs_1.default.readFile("./neadb.json", "utf-8", (err, data) => {
            if (err)
                throw err;
            let dbData = JSON.parse(data);
            if (dbData[key]) {
                return dbData[key];
            }
            else {
                console.log("Key not found");
            }
        });
    }
    // Deletes given key from database
    deleteKey(key) {
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
            fs_1.default.writeFile("./neadb.json", JSON.stringify(dbData), (err) => {
                if (err)
                    throw err;
            });
        });
    }
}
module.exports = { neadb };
//# sourceMappingURL=index.js.map