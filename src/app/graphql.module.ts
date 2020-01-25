import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { HttpHeaders } from '@angular/common/http';
import { githubToken } from '../environments/secret';

const uri = 'https://api.github.com/graphql';
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({
      uri: uri,
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + githubToken)
    }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
