import { Profile } from './profiles.model';

export class ProfileFormPayload {
  profile: Profile;
  logo: File;
  headshot: File;
  constructor(data?: ProfileFormPayload) {
    if(data) {
      this.profile = data.profile;
      this.logo = data.logo;
      this.headshot = data.headshot;
    }
  }
}
