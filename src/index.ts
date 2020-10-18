import fs from "fs";

class neadb {
  // Creates DB instance file
  create() {
    const dbData = { createdAt: new Date() };
    fs.writeFile("./neadb.json", JSON.stringify(dbData), (err) => {
      if (err) throw err;
    });
  }

  // Creates database key
  createKey(key: string) {
    fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
      if (err) throw err;
      let oldData = JSON.parse(data);
      oldData[key] = {};
      fs.writeFile("./neadb.json", JSON.stringify(oldData), (err) => {
        if (err) throw err;
      });
    });
  }

  // Adds data to given key
  storeValue(key: string, value: any) {
    fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
      if (err) throw err;
      let oldData = JSON.parse(data);
      oldData[key] = value;
      fs.writeFile("./neadb.json", JSON.stringify(oldData), (err) => {
        if (err) throw err;
      });
    });
  }

  // Retrieves value from given key
  getValue(key: string) {
    fs.readFile("./neadb.json", "utf-8", (err, data: string) => {
      if (err) throw err;
      let dbData = JSON.parse(data);
      if (dbData[key]) {
        return dbData[key];
      } else {
        console.log("Key not found");
      }
    });
  }
}

module.exports = { neadb };
