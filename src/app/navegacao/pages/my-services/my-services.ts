import { Component, Inject, OnDestroy } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { AuthQuery, AuthNeededService } from '@espm/core';
import deburr from 'lodash-es/deburr';
import { ItemMenu } from '../../models';
import { MenuService } from '../../providers/menu.service';
import { MenuToken } from '@espm/core/menu';
import { MenusQuery, MenusStore } from '../../providers';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@IonicPage()
@Component({
  selector: 'page-my-services',
  templateUrl: 'my-services.html'
})
export class MyServicesPage implements OnDestroy {
    
  private destroyed$ = new Subject();
  filteredMenus: ItemMenu[];
  private slides: Array<Array<ItemMenu[]>> = [];
  
  constructor(
    protected appCtrl: App,
    protected authQuery: AuthQuery,
    protected authNeeded: AuthNeededService,
    protected navCtrl: NavController,
    @Inject(MenuToken) private menus: ItemMenu[],
    private menuService: MenuService,
    private menusStore: MenusStore,
    private menuQuery: MenusQuery
  ) {
    this.menuQuery.favorites$
    // .pipe( filter(() => !this.menusStore.isPristine),	
    //     takeUntil(this.destroyed$))	
    //      .subscribe(() => {
    //     this.filteredMenus = this.menuService.getMenus().sort(this.sortModules);
    //     this.updateSlides()
    //   });

    this.menuService.loadMenu();
    this.filteredMenus = this.menuService.getMenus();
    console.log('FilteredMenus', this.filteredMenus);
    
    this.filteredMenus.map((elemento: ItemMenu, index: number) => {
      if (index%6 === 0) this.slides.push([]);
      let lastSlideIndex: number = this.slides.length - 1;

      if (index%2 === 0) this.slides[lastSlideIndex].push([]);
      let lastLineIndex: number = this.slides[lastSlideIndex].length - 1;

      this.slides[lastSlideIndex][lastLineIndex].push(elemento);
    });
  }

  /**
   * 
   */
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   *
   */
  openPage = (page: string, accessDenied: boolean = false) => {
    if (accessDenied) {
      this.authNeeded.showAuthNeededModal();
    } else {
      this.appCtrl.getRootNav().push(page);
    }
  };

  /**
   * 
   */
  goToSelectFavorites() {
    this.navCtrl.push('SelectFavoritePage')
  }

  /**
   *
   */
  search = e => {
    const search = this.normalize(e.target.value);
    this.filteredMenus = this.menus.filter(select => {
      return this.normalize(select.title).includes(search) || this.normalize(select.title).includes(search);
    });
    console.log(this.filteredMenus);

    this.slides = [];
    this.filteredMenus.map((elemento: ItemMenu, index: number) => {
      if (index%6 === 0) this.slides.push([]);
      let lastSlideIndex: number = this.slides.length - 1;

      if (index%2 === 0) this.slides[lastSlideIndex].push([]);
      let lastLineIndex: number = this.slides[lastSlideIndex].length - 1;

      this.slides[lastSlideIndex][lastLineIndex].push(elemento);
    });
  };
  
  /**
   *
   */
  clear = () => {
    this.filteredMenus = [...this.filteredMenus];
  };
  
  /**
   *
   */
  private normalize = (term: string) => (term ? deburr(term.toLowerCase()) : '');
}
