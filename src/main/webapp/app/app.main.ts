import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProdConfig } from './blocks/config/prod.config';
import { RoazhonBetApplicationAppModule } from './app.module';
import { FuseConfig } from './@fuse/types';

ProdConfig();

if (module['hot']) {
  module['hot'].accept();
}

platformBrowserDynamic()
  .bootstrapModule(RoazhonBetApplicationAppModule, { preserveWhitespaces: true })
  // eslint-disable-next-line no-console
  .then(success => console.log('Application started'))
  .catch(err => console.error(err));

export const fuseConfig: FuseConfig = {
  // Color themes can be defined in src/app/app.theme.scss
  colorTheme: 'theme-default',
  customScrollbars: true,
  layout: {
    style: 'vertical-layout-1',
    width: 'fullwidth',
    navbar: {
      primaryBackground: 'fuse-navy-700',
      secondaryBackground: 'fuse-navy-900',
      folded: false,
      hidden: false,
      position: 'left',
      variant: 'vertical-style-1'
    },
    toolbar: {
      customBackgroundColor: false,
      background: 'fuse-white-500',
      hidden: false,
      position: 'below-static'
    },
    footer: {
      customBackgroundColor: true,
      background: 'fuse-navy-900',
      hidden: false,
      position: 'below-fixed'
    },
    sidepanel: {
      hidden: false,
      position: 'right'
    }
  }
};
