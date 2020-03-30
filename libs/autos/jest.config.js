module.exports = {
  name: 'autos',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/autos',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
