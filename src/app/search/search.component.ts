import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchService } from '../core/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchValue$: Observable<string>;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchValue$ = this.searchService.searchValue$;
  }

  search(searchValue: string) {
    this.searchService.search(searchValue);
  }

  clear() {
    this.searchService.clear();
  }
}
