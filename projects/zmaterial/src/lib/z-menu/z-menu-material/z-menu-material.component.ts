import { ZTranslateService } from './../../services/z-translate.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivationStart, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ZMenuProfile, ZMenuItems } from '../interfaces';

@Component({
    selector: 'z-menu-material',
    templateUrl: './z-menu-material.component.html',
    styleUrls: ['./z-menu-material.component.scss']
})

export class ZMenuMaterialComponent implements OnInit {

    // ? Input - Screen Infos

    /**
     * Define title project
     */
    @Input() titleProject: string;

    /**
     * Define logo project
     */
    @Input() logoProject: string;

    /**
     * Define profile items
     */
    @Input() profile: ZMenuProfile;

    /**
     * Define menu items
     */
    @Input() menuItems: ZMenuItems[];

    // ? Input - Show Itens

    /**
     * If show button logout or not.
     */
    @Input() showLogout: boolean;

    // ? Output - Event Data

    /**
     * Event click logout.
     */
    @Output() logout = new Subject<boolean>();

    // ? Global

    /**
     * Defines whether it is a mobile device
     */
    public isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(result => result.matches)
    );

    /**
     * Hide sidebar of screen
     */
    public hideSidebar = false;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private tService: ZTranslateService
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

    public changeLang(lng: string): void {
      this.tService.setCurrentLanguage(lng).subscribe(() => {
        window.location.reload();
      }, (err) => {
        console.log('Falha ao Alterar Idioma: ', err);
      });
    }

}
