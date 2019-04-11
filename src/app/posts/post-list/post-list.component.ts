import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
    posts: Post[] = [];
    isLoading = false;
    private postsSub: Subscription;

    constructor(public postsService: PostsService){}
    
    ngOnInit() {
        this.isLoading = true;
        // get inital set of posts
        this.postsService.getPosts();    
        
        // listen to post updates
        this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts:Post[])=>{
            this.isLoading = false;
            this.posts = posts;
        });
    }
    
    onDelete(postId: string) {
        this.postsService.deletePost(postId);
    }
    
    ngOnDestroy() {
        // remove post listener (subscription) to prevent memory leak
        this.postsSub.unsubscribe();
    }
}