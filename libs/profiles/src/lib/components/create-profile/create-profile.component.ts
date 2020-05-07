import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { Profile } from '../../models/profiles.model';

const schema =
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Profile",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "Id": {
      "title": "Id",
      "type": [
        "null",
        "string"
      ],
      "templateOptions": {}
    },
    "ParentId": {
      "title": "ParentId",
      "type": [
        "null",
        "string"
      ],
      "templateOptions": {}
    },
    "UserId": {
      "title": "UserId",
      "type": [
        "null",
        "string"
      ],
      "templateOptions": {}
    },
    "Title": {
      "title": "Title",
      "type": [
        "null",
        "string"
      ],
      "templateOptions": {}
    },
    "Status": {
      "title": "Status",
      "$ref": "#/definitions/ProfileStatuses",
      "templateOptions": {}
    },
    "Type": {
      "title": "Type",
      "$ref": "#/definitions/ProfileTypes",
      "templateOptions": {}
    },
    "Subtype": {
      "title": "Subtype",
      "$ref": "#/definitions/ProfileSubtypes",
      "templateOptions": {}
    },
    "Adspace": {
      "title": "Adspace",
      "$ref": "#/definitions/AdTypes",
      "templateOptions": {}
    },
    "FirstName": {
      "title": "FirstName",
      "type": [
        "null",
        "string"
      ],
      "templateOptions": {}
    },
    "LastName": {
      "title": "LastName",
      "type": [
        "null",
        "string"
      ],
      "templateOptions": {}
    },
    "MiddleName": {
      "title": "MiddleName",
      "type": [
        "null",
        "string"
      ],
      "templateOptions": {}
    },
    "PreferredName": {
      "title": "PreferredName",
      "type": [
        "null",
        "string"
      ],
      "templateOptions": {}
    },
    "CompanyName": {
      "title": "CompanyName",
      "type": [
        "null",
        "string"
      ],
      "templateOptions": {}
    },
    "Email": {
      "title": "Email",
      "type": [
        "null",
        "string"
      ],
      "templateOptions": {}
    },
    "Introduction": {
      "title": "Introduction",
      "type": [
        "null",
        "string"
      ],
      "templateOptions": {}
    },
    "Logo": {
      "title": "Logo",
      "oneOf": [
        {
          "type": "null"
        },
        {
          "$ref": "#/definitions/ProfileImage"
        }
      ],
      "templateOptions": {}
    },
    "Headshot": {
      "title": "Headshot",
      "oneOf": [
        {
          "type": "null"
        },
        {
          "$ref": "#/definitions/ProfileImage"
        }
      ],
      "templateOptions": {}
    },
    "PhoneNumbers": {
      "title": "PhoneNumbers",
      "type": "array",
      "items": {
        "$ref": "#/definitions/PhoneNumber"
      },
      "templateOptions": {}
    },
    "Locations": {
      "title": "Locations",
      "type": "array",
      "items": {
        "$ref": "#/definitions/Location"
      },
      "templateOptions": {}
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
      ],
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
          }
        }
      }
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
      ],
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
          }
        }
      }
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
      ],
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
          }
        }
      }
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
      ],
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
          }
        }
      }
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
          "title": "Type",
          "$ref": "#/definitions/PhoneNumberTypes",
          "templateOptions": {}
        },
        "Value": {
          "title": "Value",
          "type": [
            "null",
            "string"
          ],
          "templateOptions": {}
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
      ],
      "widget": {
        "formlyConfig": {
          "templateOptions": {
            "options": [
              {
                "value": 0,
                "label": "Email"
              },
              {
                "value": 1,
                "label": "Fax"
              }
            ]
          }
        }
      }
    },
    "Location": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "Title": {
          "title": "Title",
          "type": [
            "null",
            "string"
          ],
          "templateOptions": {}
        },
        "Type": {
          "title": "Type",
          "$ref": "#/definitions/LocationTypes",
          "templateOptions": {}
        },
        "Address": {
          "title": "Address",
          "oneOf": [
            {
              "type": "null"
            },
            {
              "$ref": "#/definitions/Address"
            }
          ],
          "templateOptions": {}
        },
        "PhoneNumbers": {
          "title": "PhoneNumbers",
          "type": "array",
          "items": {
            "$ref": "#/definitions/PhoneNumber"
          },
          "templateOptions": {}
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
      ],
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
          }
        }
      }
    },
    "Address": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "Street1": {
          "type": [
            "null",
            "string"
          ]
        },
        "Street2": {
          "type": [
            "null",
            "string"
          ]
        },
        "Street3": {
          "type": [
            "null",
            "string"
          ]
        },
        "City": {
          "type": [
            "null",
            "string"
          ]
        },
        "State": {
          "type": [
            "null",
            "string"
          ]
        },
        "Zip": {
          "type": [
            "null",
            "string"
          ]
        },
        "Country": {
          "type": [
            "null",
            "string"
          ]
        }
      }
    }
  }
};

@Component({
  selector: 'classifieds-ui-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  form: FormGroup;
  model: any;
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];

  constructor(private formlyJsonschema: FormlyJsonschema) { }

  ngOnInit(): void {
    // const config = this.formlyJsonschema.toFieldConfig(schema.schema);
    this.form = new FormGroup({});
    this.fields = [this.formlyJsonschema.toFieldConfig(schema)];
    this.model = new Profile();
  }

  onSubmit() {
    console.log(this.model);
  }

}
