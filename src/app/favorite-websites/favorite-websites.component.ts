import { Component, ngOnDestroy, ngOnInit, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort, MatTableDataSource } from '@angular/material'; 

import { FavoriteWebsite } from './favorite-website.model';
import { FavoriteWebsitesService } from './favorite-websites.service';

@Component({
    templateUrl: './favorite-websites.component.html',
    styleUrls: ['./favorite-websites.component.css'],
})
export class FavoriteWebsitesComponent implements OnInit, OnDestroy {
    
    // MatTable dependencies
    @ViewChildren(MatSort) sorts;
    
    mainCategories: Object[];
    displayedColumns: string[];

    // flag used to toggle loading indicators (if any)
    isLoading = false;
    
    private favoriteWebsitesSub: Subscription;

    // make service available for use
    constructor(public favoriteWebsitesService: FavoriteWebsitesService){}
    
    /**
     * 
     * 
     */
    ngOnInit() {
        // indicate loading has begun
        this.isLoading = true;
        // set listener for favorite websites updates
        this.favoriteWebsitesSub = this.favoriteWebsitesService.getFavoriteWebsitesUpdateListener().subscribe(
            (websiteData) => {
                // indicate loading has completed
                this.isLoading = false;
                this.mainCategories = websiteData.favoriteWebsitesCategories;
                this.displayedColumns = websiteData.favoriteWebsitesDisplayedFields.displayedFields;
                // for each category, set filters and data source
                this.mainCategories.forEach((category, index) => {
                    // set model for filtering by tag
                    category.chipFilters = this.getChipFiltersByCategory(websiteData.favoriteWebsites, category);
                    // set model for filtering by name
                    category.nameFilter = '';
                    // set website data source
                    category.dataSource = this.getMatTableDataSource(websiteData.favoriteWebsites.filter((website) => {
                        return website.tags.find((tag) => {
                            return tag === category.name;
                        });
                    }), this.sorts._results[index]);
                    // set filtering method
                    category.dataSource.filterPredicate = this.getFilterPredicate();
                });
            }
        );
        // get inital set of favorite websites
        this.refreshWebsites();
    }
    
    /**
     * 
     */
    refreshWebsites() {
        // make a call to retrieve favorite websites from service
        this.favoriteWebsitesService.getFavoriteWebsites();
    }
    
    /**
     * 
     * @param websites -
     * @param category - 
     */ 
    getChipFiltersByCategory(websites, category) {
        let chipFilters = [];
        // for every website push an object that is inactive
        websites.forEach((website) => {
            if (website.hasOwnProperty('tags')) {
                // if tags collection includes the given category
                if(website.tags.find((tag) => {
                    return tag === category.name;
                })){
                    // collect the rest of the tags
                    website.tags.forEach((tag) => {
                        // check if the tag is the same as the category and also if chip aleady exists in collection
                        if (tag !== category.name && !chipFilters.find((chipFilter) => {
                            return chipFilter.key === tag;
                        })) {
                            chipFilters.push({'key': tag, 'value': false});
                        }
                    });
                }
            }
        });
        // sort chips alphabetically
        chipFilters.sort((a, b) => {
            return a.key.localeCompare(b.key);
        });
        return chipFilters;
    }
    
    /** 
     * returns a MatTableDataSource that has been sorted
     * 
     * @param {Object[]} dataToDisplay - collection of data for the MatTable 
     * to display
     * @return {MatTableDataSource} 
     */
    getMatTableDataSource(dataToDisplay, sort) {
        let matTableDataSource = new MatTableDataSource(dataToDisplay);
        // make sorting by strings more accurate
        matTableDataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }
          return data[sortHeaderId];
        };
        matTableDataSource.sort = sort;
        return matTableDataSource;
    }
    
    /**
     * 
     * @param dataSource <MatTableDataSource> -
     * @param name <string> -
     * @param tags <Object[]> -
     */ 
    filterWebsites(dataSource:MatTableDataSource, name:string, tags:Object[]) {
        let allFilters = [];
        // include any name filtering
        if (name) {
            let nameTokens = [];
            name = name.trim().toLowerCase()
            nameTokens = name.split(' ');
            allFilters = allFilters.concat(nameTokens);
        }
        // include any tag filtering
        if(tags && tags.length) {
            let activeTags = tags.filter(
                // only filter by the tags that are not checked
                (f) => {
                    return f.value === true;
                }
            ));
            allFilters = allFilters.concat(activeTags);
        }
        // apply all filters
        dataSource.filter = allFilters;
    }
    
    /**
     * 
     */
    getFilterPredicate() {
        return (data: Element, filter: Object[]) => {
            let allFound = filter.every((currentFilter) => {
                let tagFound = true;
                let nameFound = true;
                if (typeof currentFilter === 'string') {
                    nameFound = data.name.toLowerCase().indexOf(currentFilter) !== -1;
                } else {
                    tagFound = data.tags.includes(currentFilter.key); 
                }
                return nameFound && tagFound;
            });
            return allFound;
        };
    }
    
    /**
     * remove subscription to websites listener
     */
    ngOnDestroy() {
        // remove favorite websites listener (subscription) to prevent memory leak
        this.favoriteWebsitesSub.unsubscribe();
    }
}