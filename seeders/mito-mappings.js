"use strict";
const fs = require("fs");
const mitoMappingGenerator = require("../helpers/mitoMappingGenerator");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const mitoFile = fs.readFileSync("/custodian/data/mito.pheno.json");
    const mitoInput = JSON.parse(mitoFile.toString());
    const mappings = mitoMappingGenerator(mitoInput);

    await queryInterface.bulkInsert("mitochondria", mappings, {
      updateOnDuplicate: ["clinicalId"],
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("mitochondria", null, {});
  },
};
