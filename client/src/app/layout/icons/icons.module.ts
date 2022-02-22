import { NgModule } from '@angular/core';

import { TablerIconsModule } from 'angular-tabler-icons';
import { IconAlignJustified, IconHome } from 'angular-tabler-icons/icons';

const icons = {
  IconAlignJustified,
  IconHome
};

@NgModule({
  imports: [
    TablerIconsModule.pick(icons)
  ],
  exports: [
    TablerIconsModule
  ]
})
export class IconsModule {
}
