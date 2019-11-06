import { getGreeting } from '../support/app.po';

describe('sso-webapp', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to sso-webapp!');
  });
});
