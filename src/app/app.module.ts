import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { CallbackPipe } from './shared/callback.pipe';

import { AppRoutingModule } from './app-routing.module'; // includes root route
import { PostsModule } from './posts/posts.module'; // includes child routes
import { UsersModule } from './users/users.module'; // includes child routes
import { FavoriteWebsitesModule } from './favorite-websites/favorite-websites.module'; // includes child routes
import { NotFoundModule } from './core/not-found/not-found.module'; // includes child routes

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        CallbackPipe
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatToolbarModule,
        MatTabsModule,
        PostsModule,
        UsersModule,
        FavoriteWebsitesModule,
        NotFoundModule // must ALWAYS be imported last to ensure correct routing
    ],
    providers: [
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}