module.exports = {
  name: 'media',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/media',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
