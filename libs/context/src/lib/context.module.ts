import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTEXT_PLUGIN } from './context.tokens';
import { routeContextFactory } from './context.factories';
import { RouteResolver } from './resolvers/route.resolver';

@NgModule({
  imports: [CommonModule],
  providers: [
    { provide: RouteResolver, useClass: RouteResolver },
    { provide: CONTEXT_PLUGIN, useFactory: routeContextFactory, multi: true, deps: [ RouteResolver ] }
  ]
})
export class ContextModule {}
