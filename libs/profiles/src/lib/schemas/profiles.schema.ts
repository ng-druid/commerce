export const schema =
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Profile",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "Id": {
      "type": [
        "null",
        "string"
      ],
      "title": "Id",
      "widget": {
        "formlyConfig": {
          "templateOptions": {}
        }
      }
    },
    "ParentId": {
      "type": [
        "null",
        "string"
      ],
      "title": "ParentId",
      "widget": {
        "formlyConfig": {
          "templateOptions": {}
        }
      }
    },
    "UserId": {
      "type": [
        "null",
        "string"
      ],
      "title": "UserId",
      "widget": {
        "formlyConfig": {
          "templateOptions": {}
        }
      }
    },
    "Title": {
      "type": [
        "null",
        "string"
      ],
      "title": "Title",
      "widget": {
        "formlyConfig": {
          "templateOptions": {}
        }
      }
    },
    "Status": {
      "type": "integer",
      "title": "Status",
      "widget": {
        "formlyConfig": {
          "templateOptions": {
            "options": [
              {
                "value": 0,
                "label": "Submitted"
              },
              {
                "value": 1,
                "label": "Approved"
              },
              {
                "value": 2,
                "label": "Rejected"
              },
              {
                "value": 3,
                "label": "Deleted"
              }
            ]
          },
          "type": "native-select"
        }
      }
    },
    "Type": {
      "type": "integer",
      "title": "Type",
      "widget": {
        "formlyConfig": {
          "templateOptions": {
            "options": [
              {
                "value": 0,
                "label": "Person"
              },
              {
                "value": 1,
                "label": "Company"
              },
              {
                "value": 2,
                "label": "Shop"
              }
            ]
          },
          "type": "native-select"
        }
      }
    },
    "Subtype": {
      "type": "integer",
      "title": "Subtype",
      "widget": {
        "formlyConfig": {
          "templateOptions": {
            "options": [
              {
                "value": 0,
                "label": "Agent"
              },
              {
                "value": 1,
                "label": "Broker"
              },
              {
                "value": 2,
                "label": "Dealer"
              },
              {
                "value": 3,
                "label": "Seller"
              }
            ]
          },
          "type": "native-select"
        }
      }
    },
    "Adspace": {
      "type": "integer",
      "title": "Adspace",
      "widget": {
        "formlyConfig": {
          "templateOptions": {
            "options": [
              {
                "value": 0,
                "label": "General"
              },
              {
                "value": 1,
                "label": "RealEstate"
              },
              {
                "value": 2,
                "label": "Rental"
              },
              {
                "value": 3,
                "label": "Auto"
              },
              {
                "value": 4,
                "label": "Job"
              }
            ]
          },
          "type": "native-select"
        }
      }
    },
    "FirstName": {
      "type": [
        "null",
        "string"
      ],
      "title": "FirstName",
      "widget": {
        "formlyConfig": {
          "templateOptions": {}
        }
      }
    },
    "LastName": {
      "type": [
        "null",
        "string"
      ],
      "title": "LastName",
      "widget": {
        "formlyConfig": {
          "templateOptions": {}
        }
      }
    },
    "MiddleName": {
      "type": [
        "null",
        "string"
      ],
      "title": "MiddleName",
      "widget": {
        "formlyConfig": {
          "templateOptions": {}
        }
      }
    },
    "PreferredName": {
      "type": [
        "null",
        "string"
      ],
      "title": "PreferredName",
      "widget": {
        "formlyConfig": {
          "templateOptions": {}
        }
      }
    },
    "CompanyName": {
      "type": [
        "null",
        "string"
      ],
      "title": "CompanyName",
      "widget": {
        "formlyConfig": {
          "templateOptions": {}
        }
      }
    },
    "Email": {
      "type": [
        "null",
        "string"
      ],
      "title": "Email",
      "widget": {
        "formlyConfig": {
          "templateOptions": {}
        }
      }
    },
    "Introduction": {
      "type": [
        "null",
        "string"
      ],
      "title": "Introduction",
      "widget": {
        "formlyConfig": {
          "templateOptions": {}
        }
      }
    },
    "Logo": {
      "oneOf": [
        {
          "type": "null"
        },
        {
          "$ref": "#/definitions/ProfileImage"
        }
      ],
      "title": "Logo",
      "widget": {
        "formlyConfig": {
          "templateOptions": {}
        }
      }
    },
    "Headshot": {
      "oneOf": [
        {
          "type": "null"
        },
        {
          "$ref": "#/definitions/ProfileImage"
        }
      ],
      "title": "Headshot",
      "widget": {
        "formlyConfig": {
          "templateOptions": {}
        }
      }
    },
    "PhoneNumbers": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/PhoneNumber"
      }
    },
    "Locations": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Location"
      }
    }
  },
  "definitions": {
    "ProfileStatuses": {
      "type": "integer",
      "description": "",
      "x-enumFlags": true,
      "x-enumNames": [
        "Submitted",
        "Approved",
        "Rejected",
        "Deleted"
      ],
      "enum": [
        0,
        1,
        2,
        3
      ]
    },
    "ProfileTypes": {
      "type": "integer",
      "description": "",
      "x-enumFlags": true,
      "x-enumNames": [
        "Person",
        "Company",
        "Shop"
      ],
      "enum": [
        0,
        1,
        2
      ]
    },
    "ProfileSubtypes": {
      "type": "integer",
      "description": "",
      "x-enumFlags": true,
      "x-enumNames": [
        "Agent",
        "Broker",
        "Dealer",
        "Seller"
      ],
      "enum": [
        0,
        1,
        2,
        3
      ]
    },
    "AdTypes": {
      "type": "integer",
      "description": "",
      "x-enumFlags": true,
      "x-enumNames": [
        "General",
        "RealEstate",
        "Rental",
        "Auto",
        "Job"
      ],
      "enum": [
        0,
        1,
        2,
        3,
        4
      ]
    },
    "ProfileImage": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "Id": {
          "type": [
            "null",
            "string"
          ]
        },
        "Path": {
          "type": [
            "null",
            "string"
          ]
        },
        "Weight": {
          "$ref": "#/definitions/SByte"
        }
      }
    },
    "SByte": {
      "type": "object",
      "additionalProperties": false
    },
    "PhoneNumber": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "Type": {
          "type": "integer",
          "title": "Type",
          "widget": {
            "formlyConfig": {
              "templateOptions": {}
            }
          }
        },
        "Value": {
          "type": [
            "null",
            "string"
          ],
          "title": "Value",
          "widget": {
            "formlyConfig": {
              "templateOptions": {}
            }
          }
        }
      }
    },
    "PhoneNumberTypes": {
      "type": "integer",
      "description": "",
      "x-enumFlags": true,
      "x-enumNames": [
        "Email",
        "Fax"
      ],
      "enum": [
        0,
        1
      ]
    },
    "Location": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "Address"
      ],
      "properties": {
        "Title": {
          "type": [
            "null",
            "string"
          ],
          "title": "Title",
          "widget": {
            "formlyConfig": {
              "templateOptions": {}
            }
          }
        },
        "Type": {
          "type": "integer",
          "title": "Type",
          "widget": {
            "formlyConfig": {
              "templateOptions": {
                "options": [
                  {
                    "value": 0,
                    "label": "Home"
                  },
                  {
                    "value": 1,
                    "label": "Office"
                  }
                ]
              },
              "type": "native-select"
            }
          }
        },
        "Address": {
          "$ref": "#/definitions/Address",
          "title": "Address",
          "widget": {
            "formlyConfig": {
              "templateOptions": {}
            }
          }
        },
        "PhoneNumbers": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/PhoneNumber"
          }
        }
      }
    },
    "LocationTypes": {
      "type": "integer",
      "description": "",
      "x-enumFlags": true,
      "x-enumNames": [
        "Home",
        "Office"
      ],
      "enum": [
        0,
        1
      ]
    },
    "Address": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "Street1": {
          "type": [
            "null",
            "string"
          ],
          "title": "Street1",
          "widget": {
            "formlyConfig": {
              "templateOptions": {}
            }
          }
        },
        "Street2": {
          "type": [
            "null",
            "string"
          ],
          "title": "Street2",
          "widget": {
            "formlyConfig": {
              "templateOptions": {}
            }
          }
        },
        "Street3": {
          "type": [
            "null",
            "string"
          ],
          "title": "Street3",
          "widget": {
            "formlyConfig": {
              "templateOptions": {}
            }
          }
        },
        "City": {
          "type": [
            "null",
            "string"
          ],
          "title": "City",
          "widget": {
            "formlyConfig": {
              "templateOptions": {}
            }
          }
        },
        "State": {
          "type": [
            "null",
            "string"
          ],
          "title": "State",
          "widget": {
            "formlyConfig": {
              "templateOptions": {}
            }
          }
        },
        "Zip": {
          "type": [
            "null",
            "string"
          ],
          "title": "Zip",
          "widget": {
            "formlyConfig": {
              "templateOptions": {}
            }
          }
        },
        "Country": {
          "type": [
            "null",
            "string"
          ],
          "title": "Country",
          "widget": {
            "formlyConfig": {
              "templateOptions": {}
            }
          }
        }
      }
    }
  }
};
