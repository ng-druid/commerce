module.exports = {
  name: 'cities',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/cities',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
