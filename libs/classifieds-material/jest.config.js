module.exports = {
  name: 'classifieds-material',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/classifieds-material',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
