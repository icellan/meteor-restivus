Package.describe({
  name: 'icellan:restivus',
  summary: 'Create authenticated REST APIs in Meteor via HTTP/HTTPS. Setup CRUD endpoints for Collections.',
  version: '2.2.0',
  git: 'https://github.com/icellan/meteor-restivus.git',
});

Package.onUse((api) => {
  // Meteor dependencies
  api.use('ecmascript@0.16.7');
  api.use('check@1.3.2');
  api.use('underscore@1.0.13');
  api.use('accounts-password@2.4.0');
  api.use('simple:json-routes@2.1.0');
  api.use('leaonline:oauth2-server@5.2.0');
  api.use('alanning:roles@1.3.0', 'server', { weak: true });

  api.addFiles([
    'lib/auth.js',
    'lib/route.js',
    'lib/restivus.js',
  ], 'server');
  api.mainModule('index.js', 'server');
});

Npm.depends({
  'url-parse': '1.5.10',
});

Package.onTest((api) => {
  // Meteor dependencies
  api.use('ecmascript');
  api.use('mongo');
  api.use('http');
  api.use('underscore');
  api.use('accounts-base@2.4.0');
  api.use('accounts-password@2.4.0');
  api.use('practicalmeteor:munit');
  api.use('test-helpers');
  api.use('icellan:restivus');
  api.use('alanning:roles@1.3.0');

  api.addFiles([
    'test/api_tests.js',
    'test/authentication_tests.js',
    'test/route_unit_tests.js',
    'test/user_hook_tests.js',
  ], 'server');
});
