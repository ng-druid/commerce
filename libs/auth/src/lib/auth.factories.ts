import { ClientSettings } from './models/auth.models';
import { UserManager } from 'oidc-client';

export const userManagerFactory = (clientSettings: ClientSettings) => {
  return new UserManager(clientSettings);
};
