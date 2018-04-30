import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapseModule } from 'ngx-bootstrap';


import { RouterModule } from '@angular/router';


import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
    imports: [
        CommonModule,
        CollapseModule,

        RouterModule,
    ],
    declarations: [
        NavbarComponent,
        FooterComponent,

    ],
    exports: [
        NavbarComponent,
        FooterComponent,

    ]
})
export class DirectivesModule {}
