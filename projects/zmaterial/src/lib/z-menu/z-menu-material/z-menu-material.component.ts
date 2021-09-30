import { ZModalService } from '../../z-modal/z-modal.service';
import { ZTranslateService } from './../../services/z-translate.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivationStart, NavigationEnd, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ZMenuProfile, ZMenuItems } from '../interfaces';
import { ZMenuProvider } from './zMenuProvider';

@Component({
  selector: 'z-menu-material',
  templateUrl: './z-menu-material.component.html',
  styleUrls: ['./z-menu-material.component.scss']
})

export class ZMenuMaterialComponent implements OnInit, OnDestroy {

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
   * Define menu Provider
   */
  @Input() menuProvider: ZMenuProvider;

  /**
   * Define profile items
   */
  public profile: ZMenuProfile;

  /**
   * Define menu items
   */
  public menuItems: ZMenuItems[];

  /**
   * Define Loading
   */
  public isLoading = false;

  // ? Input - Show Itens

  /**
   * If show button logout or not.
   */
  @Input() showLogout: boolean;

  /**
   * Is Authenticate
   */
  @Input() isAuth: boolean;

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

  private subscription = new Subscription();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private tService: ZTranslateService,
    private modal: ZModalService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.subscription.add(this.menuProvider.profile.subscribe((profile) => {
      this.profile = profile;
    }));

    this.subscription.add(this.router.events.pipe(
      filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd)
    ).subscribe(event => {
      if ((event.id === 1 || event.id === 2) && event.url === event.urlAfterRedirects) {
        this.isLoading = true;
        this.subscription.add(this.menuProvider.menus.subscribe((menu) => {
          this.menuItems = menu;
          this.isLoading = false;
        }, (err) => {
          console.log('Falha ao Carregar Menu: ', err);
          this.isLoading = false;
        }));
      }
    }));

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
