export class ClientSettings {
  authority: string;
  client_id: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  constructor(data?: ClientSettings) {
    if(data) {
      this.authority = data.authority;
      this.client_id = data.client_id;
      this.redirect_uri = data.redirect_uri;
      this.response_type = data.response_type;
      this.scope = data.scope;
    }
  }
}
