module.exports = {
  name: 'attributes',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/attributes',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
