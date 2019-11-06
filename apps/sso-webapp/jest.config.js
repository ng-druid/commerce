module.exports = {
  name: 'sso-webapp',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/sso-webapp',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
