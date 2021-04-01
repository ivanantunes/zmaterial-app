import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ZMenuProfile, ZMenuItens } from '../interfaces';

@Component({
    selector: 'z-menu-material',
    templateUrl: './z-menu-material.component.html',
    styleUrls: ['./z-menu-material.component.scss']
})

export class ZMenuMaterialComponent implements OnInit {

    // ? Input - Screen Infos

    @Input() titleProject: string;
    @Input() logoProject: string;
    @Input() profile: ZMenuProfile;
    @Input() menuItens: ZMenuItens[];

    // ? Input - Show Itens

    @Input() showLogout: boolean;

    // ? Output - Event Data
    @Output() logout = new Subject<boolean>();

    // ? Global

    public loading = true;
    public isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(result => result.matches)
    );

    constructor(
        private breakpointObserver: BreakpointObserver
    ) {}

    ngOnInit(): void {}

}
