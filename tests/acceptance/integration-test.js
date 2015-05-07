import Ember from 'ember';
import {
  module,
  test,
  skip
} from 'qunit';
import startApp from '../helpers/start-app';

let application;
const { run } = Ember;

module('Acceptance: Integration', {
  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('Ember wordpress', function(assert) {
   assert.expect(1);
   visit('/');
   assert.ok("OK!");
});