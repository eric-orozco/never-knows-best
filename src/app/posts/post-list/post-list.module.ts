import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatExpansionModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PostListComponent } from './post-list.component';
import { PostListRoutingModule } from './post-list-routing.module';

@NgModule({
    declarations: [
        PostListComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        PostListRoutingModule
    ],
    exports: [
        PostListComponent
    ]
})
export class PostListModule {}