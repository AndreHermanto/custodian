"use strict";
const fs = require("fs");
const acuteMappingGenerator = require("../helpers/acuteMappingGenerator");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const acuteFile = fs.readFileSync(
      "/custodian/data/acutecarepro.pheno.json"
    );
    const acuteInput = JSON.parse(acuteFile.toString());
    const mappings = acuteMappingGenerator(acuteInput);

    await queryInterface.bulkInsert("acute_care", mappings, {
      updateOnDuplicate: ["clinicalId"],
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("acute_care", null, {});
  },
};
