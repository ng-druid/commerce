export class ContentProvider {
  title: string;
  constructor(data?: ContentProvider) {
    if (data) {
      this.title = data.title;
    }
  }
}
