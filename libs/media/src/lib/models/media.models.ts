export class MediaSettings {
  endpointUrl: string;
  constructor(data?: MediaSettings) {
    if(data) {
      this.endpointUrl = data.endpointUrl;
    }
  }
}

export class MediaFile {
  id: string;
  contentType: string;
  contentDisposition: string;
  path: string;
  length: number;
  fileName: string;
  constructor(data?: MediaFile) {
    if (data) {
      this.id = data.id;
      this.contentType = data.contentType;
      this.contentDisposition = data.contentDisposition;
      this.path = data.path;
      this.fileName = data.fileName;
      this.length = data.length;
    }
  }
}
