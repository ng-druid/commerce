module.exports = {
  name: 'vocabulary',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/vocabulary',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
