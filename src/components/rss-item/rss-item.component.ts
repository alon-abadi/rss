import { Item } from './../../models/item.model';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'rss-item',
    templateUrl: 'rss-item.component.html',
    styleUrls: ['rss-item.component.css']
})
export class RssItemComponent {
    @Input() private item: Item;
}
