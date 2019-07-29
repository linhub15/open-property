import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('github',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/github-circle-white.svg'));
    iconRegistry.addSvgIcon('data',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/chart-bar-regular.svg'));
  }

  ngOnInit() { }

}