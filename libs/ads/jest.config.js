module.exports = {
  name: 'ads',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ads',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
