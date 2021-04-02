import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
    public hideSidebar = false;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
    ) {}

    ngOnInit(): void {

      this.router.events.pipe(

        filter((event) => event instanceof ActivationStart)

      ).subscribe((event: ActivationStart) => {

        if (event.snapshot.data.hideSideBar) {
          this.hideSidebar = event.snapshot.data.hideSideBar;
        }

      });

    }

}
