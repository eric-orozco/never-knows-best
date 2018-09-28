import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import { PostListComponent } from './post-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'posts-list', 
                component: PostListComponent
            }
        ])
    ],
    exports: [
        RouterModule    
    ]
})
export class PostListRoutingModule {}