var express = require("express");
var router = express.Router();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { Op } = require("sequelize");
const mappings = require("../helpers/mappings");
var db = require("../models");

const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: [process.env.AUTH0_DOMAIN],
  algorithms: ["RS256"],
});

/**
 * @api {get} /mappings/individual/:id Get mapping by id
 * @apiName GetMapping
 * @apiGroup Mappings
 * @apiDescription Searches all cohorts for a specific mapping by id
 *
 * @apiParam {String} id - Either sample ID or clinical ID
 *
 * @apiHeader {String} Authorization JWT "Bearer: <token>"
 *
 * @apiSuccess {Object} mapping Mapping
 */
router.get("/individual/:id", checkJwt, function (req, res, next) {
  const id = req.params.id;
  const permissions = req.user[process.env.AUTH0_CLAIMS];

  var dbPromises = [];
  Object.keys(db.sequelize.models).forEach((model) => {
    console.log(model);
    const cohortPerm = mappings[model];
    if (model === "demo" || permissions.includes(cohortPerm + "/pheno")) {
      var dbPromise = db[model].findOne({
        where: {
          [Op.or]: [{ clinicalId: id }, { sampleId: id }],
        },
      });
      dbPromises.push(dbPromise);
    }
  });

  // fulfill searches together and return
  Promise.allSettled(dbPromises).then((results) => {
    var found = false;
    results.forEach((result) => {
      if (result.status === "fulfilled" && result.value !== null) {
        found = true;
        return res.send({ mapping: result.value });
      }
    });
    if (!found) {
      return res.status(404).send("No mapping found");
    }
  });
});

/**
 * @api {get} /mappings/individual?ids= Get mapping by ids
 * @apiName GetMappings
 * @apiGroup Mappings
 * @apiDescription Searches all cohorts for the mappings listed
 *
 * @apiQuery {String} A csv of patient ids
 *
 * @apiHeader {String} Authorization JWT "Bearer: <token>"
 *
 * @apiSuccess {Object[]} mapping Mapping
 */
router.get("/individual", checkJwt, async (req, res, next) => {
  const ids = req.query.ids.split(",")
  const permissions = req.user[process.env.AUTH0_CLAIMS];
  const idMappings = [];
  for (let j = 0; j < ids.length; j++) {
    const id = ids[j];

    const models = Object.keys(db.sequelize.models)
    var found = false;
    for (let i = 0; i < models.length; i++) {
      let model = models[i];
      const cohortPerm = mappings[model]
      if (model == "demo" || permissions.includes(cohortPerm + "/pheno")) {
        var result = await db[model].findOne({
          where: {
            [Op.or]: [{clinicalId: id}, {sampleId: id}]
          }
        });
        if (result !== null) {
          found = true;
          idMappings.push(result.dataValues);
          break;
        }
      }
    }
    if (!found) {
      idMappings.push({error: "NOT_FOUND"});
    }
  }

  return res.send({mappings: idMappings})
})

/**
 * @api {get} /mappings/:cohort/:id Get mapping by cohort and id
 * @apiName GetIDMappingByCohort
 * @apiGroup Mappings
 * @apiDescription Search a specific cohort for a specific mapping by id
 *
 * @apiParam {String} cohort - Cohort name
 * @apiParam {String} id - Either sample ID or clinical ID
 *
 * @apiHeader {String} Authorization JWT "Bearer: <token>"
 *
 * @apiSuccess {Object[]} mappings - Mappings
 */
router.get("/:cohort/:id", checkJwt, function (req, res, next) {
  const cohort = req.params.cohort;
  const id = req.params.id;
  const permissions = req.user[process.env.AUTH0_CLAIMS];
  const cohortPerm = mappings[cohort];

  if (!db[cohort]) return res.status(404).send({ err: "Unknown cohort" });
  if (!permissions.includes(cohortPerm + "/pheno" && cohort !== "demo")) {
    return res.status(401).send({ err: "Permission denied" });
  }

  db[cohort]
    .findOne({ where: { [Op.or]: [{ clinicalId: id }, { sampleId: id }] } })
    .then((mapping) => {
      if (mapping) return res.send({ mapping: mapping });
      return res
        .status(404)
        .send({ error: { status: 404, message: "ID not found" } });
    })
    .catch((err) => {
      console.error("Error querying specific patient");
      console.error(cohort);
      console.error(err);
      res.send(500).send({ err: err });
    });
});

module.exports = router;
