/**
 * @typedef {Object} Patient
 * @property {string} externalIDs
 * @property {string} internalIDs
 */

/**
 * @typedef {Object} Mapping
 * @property {string} clinicalId
 * @property {string} sampleId
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @param {Array<Patient>} mitoInput
 * @returns {Array<Mapping>}
 */
module.exports = (mitoInput) => {
  /**
   * @type {Array<Mapping>}
   */
  var mappings = [];

  mitoInput.forEach((patient) => {
    let mapping = {
      clinicalId: patient.externalIDs,
      sampleId: patient.internalIDs,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mappings.push(mapping);
  });
  return mappings;
};
