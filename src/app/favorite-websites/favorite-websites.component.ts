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
    
    mainCategories = [
        {
            "name": "development",
            "isSecret": false
        },
        {
            "name": "magic",
            "isSecret": true
        }
        ,
        {
            "name": "shopping",
            "isSecret": false
        }
    ];

    displayedColumns: string[] = ['name', 'tags'];

    // flag used to toggle loading indicators (if any)
    isLoading = false;
    
    private favoriteWebsitesSub: Subscription;

    // make service available for use
    constructor(public favoriteWebsitesService: FavoriteWebsitesService){}
    
    /**
     * 
     * 
     */
    filterTag(tag, mainCategoryTag) {
        return tag !== mainCategoryTag;
    }
    
    /**
     * 
     * 
     */
    ngOnInit() {
        // indicate loading has begun
        this.isLoading = true;
        // set listener for favorite websites updates
        this.favoriteWebsitesSub = this.favoriteWebsitesService.getFavoriteWebsitesUpdateListener().subscribe(
            (websites:FavoriteWebsite[]) => {
                // indicate loading has completed
                this.isLoading = false;
                // for each category, set filters and data source
                this.mainCategories.forEach((category, index) => {
                    // set filters
                    category.chipFilters = this.getChipFiltersByCategory(websites, category);
                    // set data source
                    category.dataSource = this.getMatTableDataSource(websites.filter((website) => {
                        return website.tags.find((tag) => {
                            return tag === category.name;
                        });
                    }), this.sorts._results[index]);
                });
            }
        );
        // get inital set of favorite websites
        this.refreshWebsites();
    }
    
    /**
     * 
     * 
     */
    refreshWebsites() {
        // make a call to retrieve favorite websites from service
        this.favoriteWebsitesService.getFavoriteWebsites();
    }
    
    /**
     * 
     * 
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
     * 
     */
    filterWebsitesByTags(filters, dataSource) {
        if (filters) {
            // define how the filter works
            dataSource.filterPredicate = 
                (data: Element, filter: Object[]) => {
                    let allFound = filter.every((currentFilter) => {
                        return data.tags.find((tag) => {
                           return currentFilter.key === tag;
                       }); 
                    });
                    return allFound;
                };
            // set the filter    
            dataSource.filter = filters;
        }
    }
    
    /**
     * 
     * 
     */ 
    onChange(event, item, filters, dataSource) {
        let activeFilters = filters.filter(
            // only filter by the tags that are not checked
            (f) => {
                return f.value === true;
            }
        ));
        // filter by all the tags to filter
        this.filterWebsitesByTags(activeFilters, dataSource);
    }
    
    /**
     * 
     * 
     * 
     */
    ngOnDestroy() {
        // remove favorite websites listener (subscription) to prevent memory leak
        this.favoriteWebsitesSub.unsubscribe();
    }
}