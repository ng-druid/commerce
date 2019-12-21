module.exports = {
  name: 'taxonomy',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/taxonomy',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
