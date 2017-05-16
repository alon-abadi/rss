import { StorageService } from './../services/storage.service';
import { Item } from './../models/item.model';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { parseString } from 'xml2js';
import { PlatformLocation } from '@angular/common';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  private listOfUrls: string[] = [];
  private url = '';
  private selectedUrlIndex = 0;
  private selectedUrl = '';
  private currentItems: Item[] = [];

  constructor(private http: Http, private platformLocation: PlatformLocation, private storageService: StorageService) {
    this.listOfUrls = JSON.parse(window.localStorage.getItem('listOfUrls')) || [];
    this.platformLocation.onPopState(() => this.selectUrl(this.listOfUrls.indexOf(history.state)));
  }

  addUrl() {
    if (this.url) {
      this.listOfUrls.unshift(this.url);
      this.storageService.updateListOfUrls(this.listOfUrls);
      this.selectUrl(0, true);
      this.url = '';
    }
  }

  removeUrl(indexToDelete: number) {
    this.listOfUrls.splice(indexToDelete, 1);
    this.storageService.updateListOfUrls(this.listOfUrls);
    if (this.selectedUrlIndex === indexToDelete) {
      this.currentItems = [];
      this.selectedUrl = '';
    }
  }

  selectUrl(indexToSelect, pushState = false) {
    this.selectedUrlIndex = indexToSelect;
    this.selectedUrl = this.listOfUrls[indexToSelect];
    if (pushState) {
      this.platformLocation.pushState(this.selectedUrl, this.selectedUrl, '');
    }
    this.fetchRss();
  }

  fetchRss() {
    this.http.get(this.listOfUrls[this.selectedUrlIndex])
      .map(response => response.text())
      .subscribe(xml => parseString(xml, (err, res) => {
        this.currentItems = <Item[]>res.rss.channel[0].item;
      }));
  }
}
