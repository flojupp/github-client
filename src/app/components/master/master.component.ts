import { Component, OnInit, OnDestroy } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable, Subscription} from 'rxjs';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.less']
})
export class MasterComponent implements OnInit, OnDestroy {
  
  githubResponseObservable: Observable<any>;
  githubResponse: any;
  querySubscription: Subscription;

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit() {
    this.githubResponseObservable = this.apollo.watchQuery({query: masterQuery}).valueChanges;
    this.querySubscription = this.githubResponseObservable.subscribe((data) => {
      console.log(data);
      this.githubResponse = data;
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  public openDetail(edge: any) {
    console.log(edge);
    this.router.navigateByUrl('../detail');// /' + edge.node.id');
  }

}

const masterQuery = gql`
{
  search(query: "is:public", type: REPOSITORY, first: 10) {
    repositoryCount
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        ... on Repository {
          id          
          name
          url
          createdAt
          updatedAt
          shortDescriptionHTML
        }
      }
    }
  }
}
`;
