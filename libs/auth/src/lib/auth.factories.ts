import { ClientSettings } from './models/auth.models';
import { UserManager, User } from 'oidc-client';
import { AuthFacade } from './+state/auth.facade';

export const userManagerFactory = (clientSettings: ClientSettings) => {
  const userManager = new UserManager(clientSettings);
  return userManager;
};

export const initAuthFactory = (userManager: UserManager, authFacade: AuthFacade) => {
  return () => {
    return new Promise(res => {
      if(document) {
        userManager.getUser().then(u => {
          if(u) {
            authFacade.setUser(u);
            setTimeout(() => res());
          } else {
            res();
          }
        });
      } else {
        res();
      }
    });
  }
}
