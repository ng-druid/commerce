import { Observable } from 'rxjs';

export interface ContextResolver {
  resolve(): Observable<any>
}

export class ContextPlugin {
  name: string
  title: string;
  baseObject: any;
  resolver: ContextResolver;
  constructor(data?: ContextPlugin) {
    if (data) {
      this.name = data.name;
      this.title = data.title;
      this.baseObject = data.baseObject;
      this.resolver = data.resolver;
    }
  }
}
