import {Component} from '@angular/core';

const Logo = require('./NKB.png');

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.css'    
    ]
})
export class HeaderComponent {
    public logoURL = Logo;
}
