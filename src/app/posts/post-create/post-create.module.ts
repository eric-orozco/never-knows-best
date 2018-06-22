import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule, MatButtonModule, MatErrorModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PostCreateComponent } from './post-create.component';
import { PostCreateRoutingModule } from './post-create-routing.module';

@NgModule({
    declarations: [
        PostCreateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        PostCreateRoutingModule
    ],
    exports: [
        PostCreateComponent    
    ]
})
export class PostCreateModule {}