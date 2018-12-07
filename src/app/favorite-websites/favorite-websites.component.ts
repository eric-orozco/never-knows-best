import {
  AfterViewInit,
  Component,
  QueryList,
  OnDestroy,
  OnInit,
  ViewChildren
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort, MatTableDataSource } from '@angular/material';

import { FavoriteWebsite } from './favorite-website.model';
import { FavoriteWebsitesService } from './favorite-websites.service';

export interface MainCategory {
  nameFilter: string;
  name: string;
  dataSource: any;
  chipFilters: string[];
}

@Component({
  templateUrl: './favorite-websites.component.html',
  styleUrls: ['./favorite-websites.component.scss']
})
export class FavoriteWebsitesComponent implements AfterViewInit, OnInit, OnDestroy {
  // MatTable dependencies
  @ViewChildren(MatSort) sorts: QueryList<MatSort>;

  mainCategories: MainCategory[];
  displayedColumns: string[];

  // flag used to toggle loading indicators (if any)
  isLoading = false;

  private favoriteWebsitesSub: Subscription;
  private sortsSub: Subscription;

  // make service available for use
  constructor(public favoriteWebsitesService: FavoriteWebsitesService) {}

  /**
   *
   *
   */
  ngOnInit() {
    // indicate loading has begun
    this.isLoading = true;
    // set listener for favorite websites updates
    this.favoriteWebsitesSub = this.favoriteWebsitesService
      .getFavoriteWebsitesUpdateListener()
      .subscribe(websiteData => {
        // indicate loading has completed
        this.isLoading = false;
        this.mainCategories = websiteData['favoriteWebsitesCategories'];
        this.displayedColumns =
          websiteData['favoriteWebsitesDisplayedFields'].displayedFields;
        // for each category, set filters and data source
        this.mainCategories.forEach((category, index) => {
          // set model for filtering by tag
          category['chipFilters'] = this.getChipFiltersByCategory(
            websiteData['favoriteWebsites'],
            category
          );
          // set model for filtering by name
          category['nameFilter'] = '';
          // set website data source
          const dataToDisplay = websiteData['favoriteWebsites'].filter(
            website => {
              return website.tags.find(tag => {
                return tag === category['name'];
              });
            }
          );
          category['dataSource'] = this.getMatTableDataSource(
            dataToDisplay,
            null
          );
          // set filtering method
          category['dataSource'].filterPredicate = this.getFilterPredicate();
        });
      });
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
    const chipFilters = [];
    // for every website push an object that is inactive
    websites.forEach(website => {
      if (website.hasOwnProperty('tags')) {
        // if tags collection includes the given category
        if (
          website.tags.find(tag => {
            return tag === category.name;
          })
        ) {
          // collect the rest of the tags
          website.tags.forEach(tag => {
            // check if the tag is the same as the category and also if chip aleady exists in collection
            if (
              tag !== category.name &&
              !chipFilters.find(chipFilter => {
                return chipFilter.key === tag;
              })
            ) {
              chipFilters.push({ key: tag, value: false });
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
   * @param dataToDisplay - collection of data for the MatTable
   * to display
   * @return table data source
   */
  getMatTableDataSource(dataToDisplay, sort) {
    const matTableDataSource = new MatTableDataSource(dataToDisplay);
    // make sorting by strings more accurate
    matTableDataSource.sortingDataAccessor = (
      data: any,
      sortHeaderId: string
    ): string => {
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
  filterWebsites(
    dataSource: MatTableDataSource<Object>,
    name: string,
    tags: Object[]
  ) {
    let allFilters: Object[] = [];
    // include any name filtering
    if (name) {
      let nameTokens = [];
      name = name.trim().toLowerCase();
      nameTokens = name.split(' ');
      allFilters = allFilters.concat(nameTokens);
    }
    // include any tag filtering
    if (tags && tags.length) {
      const activeTags: Object[] = tags.filter(
        // only filter by the tags that are not checked
        f => {
          return f['value'] === true;
        }
      );
      allFilters = allFilters.concat(activeTags);
    }
    // apply all filters
    dataSource.filter = JSON.stringify(allFilters);
  }

  /**
   *
   */
  getFilterPredicate() {
    return (data: Element, filter: any) => {
      filter = JSON.parse(filter);
      const allFound = filter.every(currentFilter => {
        let tagFound = true;
        let nameFound = true;
        if (typeof currentFilter === 'string') {
          nameFound = data['name'].toLowerCase().indexOf(currentFilter) !== -1;
        } else {
          tagFound = data['tags'].includes(currentFilter['key']);
        }
        return nameFound && tagFound;
      });
      return allFound;
    };
  }

  /**
   *
   *
   */
  unsubscribe() {
    // remove listener(s) (subscription(s)) to prevent memory leak(s)
    this.favoriteWebsitesSub.unsubscribe();
    this.sortsSub.unsubscribe();
  }

  /**
   * remove subscription to websites listener
   */
  ngOnDestroy() {
    this.unsubscribe();
  }

  /**
   *
   *
   */
  ngAfterViewInit() {
    // add sort to table data sources
    this.sortsSub = this.sorts.changes.subscribe(() => {
      const matSorts = this.sorts.toArray();
      this.mainCategories.forEach((category, index) => {
        category['dataSource'].sort = matSorts[index];
      });
    });
  }
}
