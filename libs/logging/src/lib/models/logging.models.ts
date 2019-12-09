export class LoggingSettings {
  endpointUrl: string;
  constructor(data?: LoggingSettings) {
    if(data) {
      this.endpointUrl = data.endpointUrl;
    }
  }
}
