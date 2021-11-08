"use strict";
const fs = require("fs");
const circaMappingGenerator = require("../helpers/circaMappingGenerator");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const mitoFile = fs.readFileSync("/custodian/data/circa.pheno.json");
    const mitoInput = JSON.parse(mitoFile.toString());
    const mappings = circaMappingGenerator(mitoInput);

    await queryInterface.bulkInsert("circa", mappings, {
      updateOnDuplicate: ["clinicalId"],
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("circa", null, {});
  },
};
