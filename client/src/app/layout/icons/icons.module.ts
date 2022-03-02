import { NgModule } from '@angular/core';

import { TablerIconsModule } from 'angular-tabler-icons';
import {
  IconAlignJustified,
  IconHome,
  IconBrandGoogle,
  IconChevronDown,
  IconLogout,
  IconPlus,
  IconCalendarPlus,
  IconCalendarEvent
} from 'angular-tabler-icons/icons';

const icons = {
  IconAlignJustified,
  IconHome,
  IconBrandGoogle,
  IconChevronDown,
  IconLogout,
  IconPlus,
  IconCalendarPlus,
  IconCalendarEvent
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
