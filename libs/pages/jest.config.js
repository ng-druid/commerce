module.exports = {
  name: 'pages',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/pages',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
