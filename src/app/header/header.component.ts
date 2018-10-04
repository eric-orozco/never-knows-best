import {Component} from '@angular/core';

//import Logo from './NKB.png';

const Logo = require('./NKB.png');

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.css'    
    ]
})
export class HeaderComponent {
    // private logoURL = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '') + '/assets/images/NKB.png';
    public logoURL = Logo;
    console.log('logoURL', logoURL);
}
