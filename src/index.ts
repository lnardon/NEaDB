import fs from "fs";

class neadb {
  // Private function to update the lastUpdate field from the database json file
  private updateLastUpdated(data: any) {
    data["lastUpdated"] = new Date();
    return JSON.stringify(data);
  }
  // Creates DB instance file
  create() {
    return new Promise((resolve, reject) => {
      const dbData = { createdAt: new Date(), lastUpdated: new Date() };
      fs.writeFile("./neadb.json", JSON.stringify(dbData), (err) => {
        if (err) throw err;

        resolve();
      });
    });
  }

  // Creates database key
  createKey(key: string) {
    return new Promise((resolve, reject) => {
      fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        dbData[key] = "{}";
        fs.writeFile("./neadb.json", this.updateLastUpdated(dbData), (err) => {
          if (err) throw err;
          console.log("Key created");
          resolve();
        });
      });
    });
  }

  // Deletes given key from database
  deleteKey(key: string) {
    return new Promise((resolve, reject) => {
      fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        if (dbData[key]) {
          delete dbData[key];
          console.log("Key deleted");
        } else {
          console.log("Key not found");
        }
        fs.writeFile("./neadb.json", this.updateLastUpdated(dbData), (err) => {
          if (err) throw err;
        });
      });
      resolve();
    });
  }

  // Retrieves available keys from database
  getKeys() {
    return new Promise((resolve, reject) => {
      fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        if (dbData) {
          console.log(Object.keys(dbData));
        } else {
          console.log("No keys found");
        }
        resolve(Object.keys(dbData));
      });
    });
  }

  // Duplicates key value to another key
  duplicateKey(key: string, newKeyName: string) {
    return new Promise((resolve, reject) => {
      fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        if (dbData[key]) {
          dbData[newKeyName] = dbData[key];
          fs.writeFile(
            "./neadb.json",
            this.updateLastUpdated(dbData),
            (err) => {
              if (err) throw err;
            }
          );
          console.log("Key duplicated!");
        } else {
          console.log("Key not found.");
        }
      });
      resolve();
    });
  }

  // Adds data to given key
  storeValue(key: string, value: any) {
    return new Promise((resolve, reject) => {
      fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        dbData[key] = value;
        fs.writeFile("./neadb.json", this.updateLastUpdated(dbData), (err) => {
          if (err) throw err;
        });
      });
      resolve();
    });
  }

  // Removes data from given key
  deleteValue(key: string, value: any) {
    return new Promise((resolve, reject) => {
      fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        dbData[key] = "";
        fs.writeFile("./neadb.json", this.updateLastUpdated(dbData), (err) => {
          if (err) throw err;
        });
      });
      resolve();
    });
  }

  // Retrieves value from given key
  getValue(key: string) {
    return new Promise((resolve, reject) => {
      fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        if (dbData[key]) {
          resolve(dbData[key]);
        } else {
          console.log("Key not found");
        }
      });
    });
  }

  // Retrieves last updated date
  getLastUpdated() {
    return new Promise((resolve, reject) => {
      fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        if (dbData["lastUpdated"]) {
          return dbData["lastUpdated"];
        } else {
          console.log("Date not found");
        }
      });
      resolve();
    });
  }
}

module.exports = { neadb };
