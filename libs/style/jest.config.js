module.exports = {
  name: 'style',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/style',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
