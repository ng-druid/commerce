export class Page {
  site: string;
  path: string;
  page: string;
  title: string;
  createdAt: string;
  published: boolean;
  body: string;
  constructor(data?: Page) {
    if(data) {
      this.site = data.site;
      this.path = data.path;
      this.page = data.page;
      this.title = data.title;
      this.createdAt = data.createdAt;
      this.published = data.published;
      this.body = data.body;
    }
  }
}
