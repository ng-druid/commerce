module.exports = {
  name: 'vocabulary',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/vocabulary',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
