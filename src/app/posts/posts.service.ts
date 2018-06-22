import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({
    providedIn: 'root' // allow angular to find this single instance
})
export class PostsService {
    private posts: Post[] = [];
    // pass posts as subject payload
    private postsUpdated = new Subject<Post[]>();
    
    /**
     * 
     * 
     */
    getPosts() {
        // return a spread so the original reference array remains immutable (unable to be changed)
        return [...this.posts];
    }
    
    
    /**
     * 
     * 
     */
    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }
    
    /**
     * 
     * 
     * @param {string} title -
     * @param {string} content - 
     */
    addPost(title: string, content: string){
        const post: Post = {
            title: title,
            content: content
        }
        this.posts.push(post);
        // pushes/emits new value of copy (spread) of updated posts
        this.postsUpdated.next([...this.posts]);
    }
}