import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    updateListOfUrls(listOfUrls: string[]) {
        window.localStorage.setItem('listOfUrls', JSON.stringify(listOfUrls));
    }

    getListOfUrls(): string[] {
        return JSON.parse(window.localStorage.getItem('listOfUrls'))
    }
}
