import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
    declarations: [UsersComponent],
    imports: [CommonModule, UsersRoutingModule, MatButtonModule, MatCheckboxModule]
})
export class UsersModule {}