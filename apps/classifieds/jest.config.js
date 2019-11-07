module.exports = {
  name: 'classifieds',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/classifieds',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
