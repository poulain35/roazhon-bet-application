import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { RoazhonBetApplicationSharedModule } from 'app/shared/shared.module';
import { RoazhonBetApplicationCoreModule } from 'app/core/core.module';
import { RoazhonBetApplicationAppRoutingModule } from './app-routing.module';
import { RoazhonBetApplicationHomeModule } from './home/home.module';
import { RoazhonBetApplicationEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { VerticalLayout1Module } from 'app/layouts/vertical/layout-1/layout-1.module';
import { ToolbarModule } from 'app/layouts/components/toolbar/toolbar.module';

import 'hammerjs';

import { fuseConfig } from 'app/fuse-config';

import { FuseModule } from 'app/@fuse/fuse.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from 'app/@fuse/components';
import { FuseSharedModule } from 'app/@fuse/shared.module';
import { LayoutModule } from 'app/layouts/layout.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule, Routes } from '@angular/router';
import { NavbarModule } from 'app/layouts/components/navbar/navbar.module';
import { AppComponent } from 'app/app.component';
import { FakeDbService } from 'app/fake-db/fake-db.service';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AppStoreModule } from 'app/store/store.module';

const appRoutes: Routes = [
  {
    path: '**',
    redirectTo: 'sample'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RoazhonBetApplicationSharedModule,
    RoazhonBetApplicationCoreModule,
    RoazhonBetApplicationHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    RoazhonBetApplicationEntityModule,
    RoazhonBetApplicationAppRoutingModule,
    VerticalLayout1Module,
    ToolbarModule,

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // RouterModule.forRoot(appRoutes),

    TranslateModule.forRoot(),
    InMemoryWebApiModule.forRoot(FakeDbService, {
      delay: 0,
      passThruUnknownUrl: true
    }),

    // Material moment date module
    MatMomentDateModule,

    // Material
    MatButtonModule,
    MatIconModule,

    // Fuse modules
    FuseModule.forRoot(fuseConfig),
    FuseProgressBarModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,

    // App modules
    LayoutModule,
    AppStoreModule
  ],
  declarations: [AppComponent], // , NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [AppComponent]
})
export class RoazhonBetApplicationAppModule {}
