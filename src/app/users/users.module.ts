import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    declarations: [ UsersComponent ],
    imports: [ 
        CommonModule, 
        UsersRoutingModule,
        MatButtonModule, 
        MatCheckboxModule, 
        MatSliderModule,
        MatSlideToggleModule
    ]
})
export class UsersModule {}