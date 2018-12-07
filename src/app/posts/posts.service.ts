import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({
    providedIn: 'root' // allow angular to find this single instance
})
export class PostsService {
    private posts: Post[] = [];
    // pass posts as subject payload
    private postsUpdated = new Subject<Post[]>();
    private postsAPIURL = window.location.protocol + '//' + window.location.hostname + ':8081/api/posts';
    
    constructor(private http: HttpClient, private router: Router) {}
    
    /**
     * 
     * 
     */
    getPosts() {
        // return a spread so the original reference array remains immutable (unable to be changed)
        //return [...this.posts];
        
        this.http.get<{message: string, posts: any}>(this.postsAPIURL)
            // convert data fields to match UI models
            .pipe(map((postData) => {
                return postData.posts.map(post => {
                    return {
                        id: post._id,
                        title: post.title,
                        content: post.content
                    };
                });
            }))
            .subscribe(transformedPosts => {
                this.posts = transformedPosts;
                // send notification that posts were updated
                this.postsUpdated.next([...this.posts]);
            });
    }
    
    
    getPost(id: string) {
        return this.http.get<{ _id: string; title: string; content: string }>(
            this.postsAPIURL + "/" + id
        );   
    }
    
    deletePost(postId: string) {
        this.http.delete(this.postsAPIURL + '/' + postId)
            .subscribe(() => {
                // remove the post that was deleted from collection
                const updatedPosts = this.posts.filter(post => {
                    return post.id !== postId;
                });
                this.posts = updatedPosts;
                // send notification that posts were updated
                this.postsUpdated.next([...this.posts]);
                console.log('Deleted post ' + postId);
            }
        );
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
            id: null,
            title: title,
            content: content
        }
        
        this.http.post<{message: string, postId: string}>(this.postsAPIURL, post)
            .subscribe((responseData) => {
                console.log('responseData message: ', responseData.message);
                const id = responseData.postId;
                post.id = id;
                this.posts.push(post);
                // pushes/emits new value of copy (spread) of updated posts
                this.postsUpdated.next([...this.posts]);
                this.router.navigate(['/']);
            });
    }
    
    updatePost(id: string, title: string, content: string) {
        const post: Post = { id: id, title: title, content: content };
        this.http
          .put(this.postsAPIURL + '/' + id, post)
          .subscribe(response => {
            const updatedPosts = [...this.posts];
            const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
            updatedPosts[oldPostIndex] = post;
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(["/"]);
          });
      }
}