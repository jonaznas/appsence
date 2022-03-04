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
  IconCalendarEvent,
  IconChevronRight,
  IconCalendarTime,
  IconList
} from 'angular-tabler-icons/icons';

const icons = {
  IconAlignJustified,
  IconHome,
  IconBrandGoogle,
  IconChevronDown,
  IconLogout,
  IconPlus,
  IconCalendarPlus,
  IconCalendarEvent,
  IconChevronRight,
  IconCalendarTime,
  IconList
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
