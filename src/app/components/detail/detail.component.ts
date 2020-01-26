import { Component, OnInit, OnDestroy } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable, Subscription} from 'rxjs';
import gql from 'graphql-tag';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit, OnDestroy {

  loading: boolean;
  githubResponseObservable: Observable<any>;
  githubResponse: any;
  querySubscription: Subscription;

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.githubResponseObservable = this.apollo.watchQuery({
        query: detailQuery,
        variables: {
          owner: params.owner,
          name: params.name
        }
      }).valueChanges;
      this.querySubscription = this.githubResponseObservable.subscribe((data) => {
        this.githubResponse = data;
        this.loading = false;
      });
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }


  public openMaster() {
    this.router.navigate(['master']);
  }
}


const detailQuery = gql`
query detailQuery($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    name
    createdAt
    updatedAt
    description
    shortDescriptionHTML
    homepageUrl
    owner {
      login
    }
    forkCount
    id
    isArchived
    isFork
    isLocked
    isMirror
    isTemplate
    isDisabled
    url
  }
}
`
