module.exports = {
  name: 'taxonomy',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/taxonomy',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
