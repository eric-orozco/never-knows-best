import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
    posts: Post[] = [];
    private postsSub: Subscription;

    constructor(public postsService: PostsService){}
    
    ngOnInit() {
        // get inital set of posts
        this.posts = this.postsService.getPosts();    
        
        // listen to post updates
        this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts:Post[])=>{
            this.posts = posts;
        });
    }
    
    ngOnDestroy() {
        // remove post listener (subscription) to prevent memory leak
        this.postsSub.unsubscribe();
    }
}