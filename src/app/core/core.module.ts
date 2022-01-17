import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService } from './property.service';
import { SearchService } from './search.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [SearchService, PropertyService]
})
export class CoreModule {}
