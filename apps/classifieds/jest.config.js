module.exports = {
  name: 'classifieds',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/classifieds',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
