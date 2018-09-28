import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatIconModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FavoriteWebsitesComponent } from './favorite-websites.component';
import { FavoriteWebsitesRoutingModule } from './favorite-websites-routing.module';

@NgModule({
    declarations: [
        FavoriteWebsitesComponent
    ],
    imports: [
        CommonModule,
        FavoriteWebsitesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule
    ],
    exports: [
        FavoriteWebsitesComponent
    ]
})
export class FavoriteWebsitesModule {}