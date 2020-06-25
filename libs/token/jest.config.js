module.exports = {
  name: 'token',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/token',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
