import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PhotoComponent } from './photo.component';

@NgModule({
    declarations: [
        PhotoComponent
    ],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
    ],
    exports: [
        PhotoComponent
    ]
})
export class PhotoModule {}