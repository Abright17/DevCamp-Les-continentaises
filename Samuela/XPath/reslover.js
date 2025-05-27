const fs = require("fs");
const { DOMParser } = require("xmldom");
const xpath = require("xpath");

const resolvers = {
  Query: {
    geocaches: (_, { descriptionRegex }) => {
      const xml = fs.readFileSync("data/geocaches.xml", "utf-8");
      const doc = new DOMParser().parseFromString(xml);

      const nodes = xpath.select("//geocache", doc);

      const regex = new RegExp(descriptionRegex || ".*", "i");

      return nodes
        .map(node => ({
          id: xpath.select1("string(id)", node),
          nom: xpath.select1("string(nom)", node),
          description: xpath.select1("string(description)", node),
          difficulté: parseFloat(xpath.select1("string(difficulté)", node))
        }))
        .filter(g => regex.test(g.description));
    }
  }
};

module.exports = resolvers;
