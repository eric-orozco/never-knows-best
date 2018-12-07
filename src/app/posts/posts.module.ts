import { NgModule } from '@angular/core';

import { PostListModule } from './post-list/post-list.module';
import { PostCreateModule } from './post-create/post-create.module';
import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';


@NgModule({
    declarations: [
        PostsComponent
    ],
    imports: [
        PostListModule,
        PostCreateModule,
        PostsRoutingModule
    ], 
    exports: [
        PostsComponent    
    ]
})
export class PostsModule {
}