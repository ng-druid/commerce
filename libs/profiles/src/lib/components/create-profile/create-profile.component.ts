import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { Profile } from '../../models/profiles.model';

const schema =
{
  "schema": {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Profile",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "Id": {
        "type": [
          "null",
          "string"
        ]
      },
      "ParentId": {
        "type": [
          "null",
          "string"
        ]
      },
      "UserId": {
        "type": [
          "null",
          "string"
        ]
      },
      "Title": {
        "type": [
          "null",
          "string"
        ]
      },
      "Status": {
        "$ref": "#/definitions/ProfileStatuses"
      },
      "Type": {
        "$ref": "#/definitions/ProfileTypes"
      },
      "Subtype": {
        "$ref": "#/definitions/ProfileSubtypes"
      },
      "Adspace": {
        "$ref": "#/definitions/AdTypes"
      },
      "FirstName": {
        "type": [
          "null",
          "string"
        ]
      },
      "LastName": {
        "type": [
          "null",
          "string"
        ]
      },
      "MiddleName": {
        "type": [
          "null",
          "string"
        ]
      },
      "PreferredName": {
        "type": [
          "null",
          "string"
        ]
      },
      "CompanyName": {
        "type": [
          "null",
          "string"
        ]
      },
      "Email": {
        "type": [
          "null",
          "string"
        ]
      },
      "Introduction": {
        "type": [
          "null",
          "string"
        ]
      },
      "Logo": {
        "oneOf": [
          {
            "type": "null"
          },
          {
            "$ref": "#/definitions/ProfileImage"
          }
        ]
      },
      "Headshot": {
        "oneOf": [
          {
            "type": "null"
          },
          {
            "$ref": "#/definitions/ProfileImage"
          }
        ]
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
            "$ref": "#/definitions/PhoneNumberTypes"
          },
          "Value": {
            "type": [
              "null",
              "string"
            ]
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
        "properties": {
          "Title": {
            "type": [
              "null",
              "string"
            ]
          },
          "Type": {
            "$ref": "#/definitions/LocationTypes"
          },
          "Address": {
            "oneOf": [
              {
                "type": "null"
              },
              {
                "$ref": "#/definitions/Address"
              }
            ]
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
  },
  "layout": [
    {
      "key": "Id"
    },
    {
      "key": "ParentId"
    },
    {
      "key": "UserId"
    },
    {
      "key": "Title"
    },
    {
      "key": "Status",
      "widget": "select",
      "titleMap": [
        {
          "value": 0,
          "name": "Submitted"
        },
        {
          "value": 1,
          "name": "Approved"
        },
        {
          "value": 2,
          "name": "Rejected"
        },
        {
          "value": 3,
          "name": "Deleted"
        }
      ]
    },
    {
      "key": "Type",
      "widget": "select",
      "titleMap": [
        {
          "value": 0,
          "name": "Person"
        },
        {
          "value": 1,
          "name": "Company"
        },
        {
          "value": 2,
          "name": "Shop"
        }
      ]
    },
    {
      "key": "Subtype",
      "widget": "select",
      "titleMap": [
        {
          "value": 0,
          "name": "Agent"
        },
        {
          "value": 1,
          "name": "Broker"
        },
        {
          "value": 2,
          "name": "Dealer"
        },
        {
          "value": 3,
          "name": "Seller"
        }
      ]
    },
    {
      "key": "Adspace",
      "widget": "select",
      "titleMap": [
        {
          "value": 0,
          "name": "General"
        },
        {
          "value": 1,
          "name": "RealEstate"
        },
        {
          "value": 2,
          "name": "Rental"
        },
        {
          "value": 3,
          "name": "Auto"
        },
        {
          "value": 4,
          "name": "Job"
        }
      ]
    },
    {
      "key": "FirstName"
    },
    {
      "key": "LastName"
    },
    {
      "key": "MiddleName"
    },
    {
      "key": "PreferredName"
    },
    {
      "key": "CompanyName"
    },
    {
      "key": "Email"
    },
    {
      "key": "Introduction"
    },
    {
      "key": "Logo"
    },
    {
      "key": "Headshot"
    },
    {
      "key": "PhoneNumbers",
      "items": [
        {
          "key": "PhoneNumbers[].Type",
          "widget": "select",
          "titleMap": [
            {
              "value": 0,
              "name": "Email"
            },
            {
              "value": 1,
              "name": "Fax"
            }
          ]
        },
        {
          "key": "PhoneNumbers[].Value"
        }
      ]
    },
    {
      "key": "Locations",
      "items": [
        {
          "key": "Locations[].Title"
        },
        {
          "key": "Locations[].Type",
          "widget": "select",
          "titleMap": [
            {
              "value": 0,
              "name": "Home"
            },
            {
              "value": 1,
              "name": "Office"
            }
          ]
        },
        {
          "key": "Locations[].Address"
        },
        {
          "key": "Locations[].PhoneNumbers",
          "items": [
            {
              "key": "Locations[].PhoneNumbers[].Type",
              "widget": "select",
              "titleMap": [
                {
                  "value": 0,
                  "name": "Email"
                },
                {
                  "value": 1,
                  "name": "Fax"
                }
              ]
            },
            {
              "key": "Locations[].PhoneNumbers[].Value"
            }
          ]
        }
      ]
    }
  ]
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
    this.fields = [this.formlyJsonschema.toFieldConfig(schema.schema)];
    this.model = new Profile();
  }

  onSubmit() {
    // alert(JSON.stringify(this.model));
  }

}
