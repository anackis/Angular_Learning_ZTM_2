

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit {
  videoOrder = '1'

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    // this.route.data.subscribe(console.log)
    this.route.queryParamMap.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === '2' ? params['sort'] : '1'
    })
  }

  sort(event: Event) {
    const { value } = (event.target as HTMLSelectElement)

    // this.router.navigateByUrl(`/manage?sort=${value}`)  // More Simple 
    this.router.navigate([], {                                // More Complex and powerfull.
      relativeTo: this.route,
      queryParams: {
        sort: value,
      }
    })                                
  }

}
