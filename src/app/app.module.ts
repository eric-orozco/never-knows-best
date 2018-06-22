import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs'

import { AppComponent } from './app.component';
//import { HomeComponent } from './home.component'; 
import { HeaderComponent } from './header/header.component'; 

import { AppRoutingModule } from './app-routing.module'; // includes root route
import { PostsModule } from './posts/posts.module'; // includes child routes
import { UsersModule } from './users/users.module'; // includes child routes
import { NotFoundModule } from './core/not-found/not-found.module'; // includes child routes

@NgModule({
    declarations: [
        AppComponent,
//        HomeComponent,
        HeaderComponent
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        MatToolbarModule,
        MatTabsModule,
        PostsModule,
        UsersModule,
        NotFoundModule
    ],
    providers: [
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}