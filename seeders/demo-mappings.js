"use strict";
const fs = require("fs");
const demoMappingGenerator = require("../helpers/demoMappingGenerator");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    var clinicalFile = fs.readFileSync("/custodian/data/demo.pheno.json");
    var clinical = JSON.parse(clinicalFile.toString());

    var sampleFile = fs.readFileSync("/custodian/data/vectis.csv");
    var sample = sampleFile.toString().split(",");
    sample = sample.map((id) => {
      return id.split("-")[1].trim();
    });

    var mappings = demoMappingGenerator(clinical, sample);

    await queryInterface.bulkInsert("demo", mappings, {
      updateOnDuplicate: ["clinicalId"],
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("demo", null, {});
  },
};
