import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
      label: 'Favorite Websites',
      path: '/favorite-websites'
    }
  ];
}
