/**
 * @typedef {Object} Patient
 * @property {string} report_id
 */

/**
 * @typedef {Object} Mapping
 * @property {string} clinicalId
 * @property {string} sampleId
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @param {Array<Patient>} phenotipsInput
 * @param {Array<String>} vectisInput
 * @returns {Array<Mapping>}
 */
module.exports = (phenotipsInput, vectisInput) => {
  /**
   * @type {Array<Mapping>}
   */
  var mappings = [];

  var i;
  for (i = 0; i < phenotipsInput.length; i++) {
    var mapping = {
      clinicalId: phenotipsInput[i].report_id,
      sampleId: vectisInput[i],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mappings.push(mapping);
  }
  return mappings;
};
