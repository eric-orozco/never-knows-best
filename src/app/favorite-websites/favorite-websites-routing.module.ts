import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import { FavoriteWebsitesComponent } from './favorite-websites.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'favorite-websites', 
                component: FavoriteWebsitesComponent
            }
        ])
    ],
    exports: [
        RouterModule    
    ]
})
export class FavoriteWebsitesRoutingModule {}