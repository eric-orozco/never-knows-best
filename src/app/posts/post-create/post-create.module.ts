import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

import { PostCreateComponent } from './post-create.component';
import { PostCreateRoutingModule } from './post-create-routing.module';

@NgModule({
    declarations: [
        PostCreateComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        PostCreateRoutingModule
    ],
    exports: [
        PostCreateComponent
    ]
})
export class PostCreateModule {}