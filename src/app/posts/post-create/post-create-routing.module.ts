import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import { PostCreateComponent } from './post-create.component';

/**
 * add the ability to route to this independent module
 */ 
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'posts-create', 
                component: PostCreateComponent
                //{ path: 'posts-create', loadChildren: './posts/post-create/post-create.module#PostCreateModule' },
            }
        ])
    ],
    exports: [
        RouterModule    
    ]
})
export class PostCreateRoutingModule {}