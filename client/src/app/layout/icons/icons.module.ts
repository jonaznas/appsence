import { NgModule } from '@angular/core';

import { TablerIconsModule } from 'angular-tabler-icons';
import {
  IconAlignJustified,
  IconHome,
  IconBrandGoogle,
  IconChevronDown,
  IconLogout,
  IconCalendarPlus,
  IconPlus
} from 'angular-tabler-icons/icons';

const icons = {
  IconAlignJustified,
  IconHome,
  IconBrandGoogle,
  IconChevronDown,
  IconLogout,
  IconCalendarPlus,
  IconPlus
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
