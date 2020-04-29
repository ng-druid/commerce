export const adTypes = [
  {
    id: 0,
    name: 'General',
    attributes: [],
    filters: []
  },
  {
    id: 1,
    name: 'RealEstate',
    attributes: [
      {
        name: 'price',
        type: 0,
        label: 'Asking Price',
        required: true,
        widget: 'text',
        attributes: []
      },
      {
        name: 'beds',
        type: 0,
        label: 'Beds',
        required: true,
        widget: 'text',
        attributes: []
      },
      {
        name: 'baths',
        type: 0,
        label: 'Baths',
        required: true,
        widget: 'text',
        attributes: []
      },
      {
        name: 'sqft',
        type: 0,
        label: 'Sqft',
        required: false,
        widget: 'text',
        attributes: []
      }
    ],
    filters: []
  },
  {
    id: 2,
    name: 'Rental',
    attributes: [],
    filters: []
  },
  {
    id: 3,
    name: 'Auto',
    attributes: [],
    filters: []
  },
];
