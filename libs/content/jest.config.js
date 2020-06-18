module.exports = {
  name: 'content',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/content',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
