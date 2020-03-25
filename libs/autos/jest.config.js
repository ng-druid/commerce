module.exports = {
  name: 'autos',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/autos',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
