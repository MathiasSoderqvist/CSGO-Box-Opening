import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

export interface openedBox {
  id: number;
  itemValue: number;
}

const GET_BOXES = gql`
query Root($free: Boolean, $purchasable: Boolean, $openable: Boolean) {
  boxes(free: $free, purchasable: $purchasable, openable: $openable) {
    edges {
      node {
        id
        backgroundImageUrl
        type
        name
        openable
        description
        iconUrl
        price
        cost
        free
      }
      cursor
    }
    total
  }
}
`;

const OPEN_BOX = gql `
mutation Root($input: OpenBoxInput!) {
  openBox(input: $input) {
    box {
      id
      openable
      updatedAt
    }
    boxOpenings {
      profit
      userItem {
        id
        currentValue
      }
      id
      itemValue
     }
  }
}
`;

@Component({
  selector: 'app-box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.scss']
})

export class BoxListComponent implements OnInit, OnDestroy {
  loading: boolean | undefined;
  boxes: any;
  open: boolean;
  


  private querySubscription: Subscription | undefined;
  constructor(private apollo: Apollo) {
    this.open = false;
   }
  
  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_BOXES,
      variables: {
        free: false,
        purchasable: true,
        openable: true
      },
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.open= false;
        this.boxes = data.boxes.edges;
      });
  }

  openBox(e: { preventDefault: () => void; target: { id: string | number; }; }) {
    this.apollo.mutate({
      
      mutation: OPEN_BOX,
      variables: {"input": {
        "boxId": e,
          "amount": 1
        }},
    }).subscribe(({ data }) => {
      console.log('got data📬', data);
    },(error) => {
      console.log('there was an error sending the query⛔️', error);
    });
  }

  mockOpenBox(e: { preventDefault: () => void; target: { iconUrl: string | number; }; }) {
    console.log("opening mock box..");
    this.open = true;
    for (let i = 0; i < this.boxes.length; i++) {
      if (this.boxes[i].node.id === e) {
        console.log(this.boxes[i].node.iconUrl)
        this.boxes[i].node.iconUrl = "angular12app/src/assets/reward-1.png";
      }
    }
  }
  
  ngOnDestroy() {
    this.querySubscription?.unsubscribe();
  }
}

