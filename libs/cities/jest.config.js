module.exports = {
  name: 'cities',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/cities',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
