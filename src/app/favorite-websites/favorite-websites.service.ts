import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { FavoriteWebsite } from './FavoriteWebsite.model';

@Injectable({
    providedIn: 'root' // allow angular to find this single instance
})
export class FavoriteWebsitesService {
    
    private favoriteWebsitesAPIURL = window.location.protocol + '//' + window.location.hostname + ':8081/api/favorite-websites';
    
    constructor(private http: HttpClient, private router: Router) {}
    
    private const favoriteWebsites: FavoriteWebsite[] = [];
    private favoriteWebsitesUpdated = new Subject<FavoriteWebsite[]>();
    
     /**
     * 
     * 
     */
    getFavoriteWebsites() {
        // return a spread so the original reference array remains immutable (unable to be changed)
        this.http.get<{message: string, favoriteWebsites: any}>(this.favoriteWebsitesAPIURL)
            // convert data fields to match UI models
            .pipe(map((favoriteWebsitesData) => {
                return favoriteWebsitesData.favoriteWebsites.map(favoriteWebsite => {
                    return {
                        name: favoriteWebsite.name,
                        URL: favoriteWebsite.URL,
                        tags: favoriteWebsite.tags
                    };
                });
            }))
            .subscribe(transformedFavoriteWebsites => {
                this.favoriteWebsites = transformedFavoriteWebsites;
                // send notification that favorite websites were updated
                this.favoriteWebsitesUpdated.next([...this.favoriteWebsites]);
            });
    }
    
    /**
     * 
     * 
     */
    getFavoriteWebsitesUpdateListener() {
        return this.favoriteWebsitesUpdated.asObservable();
    }
}