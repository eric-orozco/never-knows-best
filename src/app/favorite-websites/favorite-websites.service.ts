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
    
    private APIURL = window.location.protocol + '//' + window.location.hostname + ':8081/api/favorite-websites';

    constructor(private http: HttpClient, private router: Router) {}
    
    private favoriteWebsites: FavoriteWebsite[] = [];
    
    private FAVORITE_WEBSITES_DATA = {};
    private favoriteWebsitesUpdated = new Subject<FavoriteWebsite[]>();
    
    /**
     * 
     * 
     */
    getFavoriteWebsites() {
        // return a spread so the original reference array remains immutable (unable to be changed)
        this.http.get<{message: string, favoriteWebsitesDisplayedFields: any, favoriteWebsitesCategories: any, favoriteWebsites: any}>(this.APIURL)
            // convert data fields to match UI models
            .pipe(map((favoriteWebsitesData) => {
                //let mappedData = {};
                console.log('favoriteWebsitesData', favoriteWebsitesData);
                
                if(favoriteWebsitesData.favoriteWebsitesDisplayedFields) {
                     this.FAVORITE_WEBSITES_DATA.favoriteWebsitesDisplayedFields = favoriteWebsitesData.favoriteWebsitesDisplayedFields;
                }
                
                if(favoriteWebsitesData.favoriteWebsitesCategories) {
                    this.FAVORITE_WEBSITES_DATA.favoriteWebsitesCategories = favoriteWebsitesData.favoriteWebsitesCategories.map(favoriteWebsitesCategory => {
                        return {
                            name: favoriteWebsitesCategory.name,
                            isSecret: favoriteWebsitesCategory.isSecret
                        };
                    });
                }
                
                if(favoriteWebsitesData.favoriteWebsites) {
                    this.FAVORITE_WEBSITES_DATA.favoriteWebsites = favoriteWebsitesData.favoriteWebsites.map(favoriteWebsite => {
                        return {
                            name: favoriteWebsite.name,
                            URL: favoriteWebsite.URL,
                            tags: favoriteWebsite.tags
                        };
                    });
                }
                console.log('mapped data', this.FAVORITE_WEBSITES_DATA);
                return this.FAVORITE_WEBSITES_DATA;
            }))
            .subscribe(transformedFavoriteWebsites => {
                //console.log('transformedFavoriteWebsites', transformedFavoriteWebsites)
                //this.favoriteWebsites = transformedFavoriteWebsites;
                // send notification that favorite websites were updated
                 // this.favoriteWebsitesUpdated.next([...this.favoriteWebsites]);
                this.favoriteWebsitesUpdated.next(
                    this.FAVORITE_WEBSITES_DATA
                );
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