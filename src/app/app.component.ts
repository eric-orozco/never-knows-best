import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    navLinks = [
        {
            label: 'Home',
            path: '/'
        },
        {
            label: 'Blog',
            path: '/blog'
        },
        {
            label: 'Users',
            path: '/users'
        },
        {
            label: 'Posts/Create',
            path: '/posts-create'
        },
        {
            label: 'Posts/List',
            path: '/posts-list'
        }
    ];
}