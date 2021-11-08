define({ "api": [
  {
    "type": "get",
    "url": "/mappings/:cohort/:id",
    "title": "Get mapping by cohort and id",
    "name": "GetIDMappingByCohort",
    "group": "Mappings",
    "description": "<p>Search a specific cohort for a specific mapping by id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cohort",
            "description": "<ul> <li>Cohort name</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>Either sample ID or clinical ID</li> </ul>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT &quot;Bearer: <token>&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "mappings",
            "description": "<ul> <li>Mappings</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/mappings.js",
    "groupTitle": "Mappings"
  },
  {
    "type": "get",
    "url": "/mappings/individual/:id",
    "title": "Get mapping by id",
    "name": "GetMapping",
    "group": "Mappings",
    "description": "<p>Searches all cohorts for a specific mapping by id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<ul> <li>Either sample ID or clinical ID</li> </ul>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT &quot;Bearer: <token>&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "mapping",
            "description": "<p>Mapping</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/mappings.js",
    "groupTitle": "Mappings"
  },
  {
    "type": "get",
    "url": "/mappings/individual?ids=",
    "title": "Get mapping by ids",
    "name": "GetMappings",
    "group": "Mappings",
    "description": "<p>Searches all cohorts for the mappings listed</p>",
    "query": [
      {
        "group": "Query",
        "type": "String",
        "optional": false,
        "field": "A",
        "description": "<p>csv of patient ids</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT &quot;Bearer: <token>&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "mapping",
            "description": "<p>Mapping</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/mappings.js",
    "groupTitle": "Mappings"
  }
] });
