import { Absence } from 'src/app/absence/absence';

export type AbsenceHistory = {
  year: number;
  month: number;
  absences: Absence[];
}
