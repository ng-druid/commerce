module.exports = {
  name: 'attributes',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/attributes',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
