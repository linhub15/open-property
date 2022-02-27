import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchService } from '../core/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public searchValue$: Observable<string>;
  #inputTimeoutId: number;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchValue$ = this.searchService.searchValue$;
  }

  search(searchValue: string) {
    window.clearTimeout(this.#inputTimeoutId);
    this.#inputTimeoutId = window.setTimeout(
      () => this.searchService.search(searchValue),
      400
    );
  }

  clear() {
    this.searchService.clear();
  }
}
