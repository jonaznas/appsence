export type Absence = {
  id: number;
  date: string;
  hours: number;
  type: number;
  mustExcused: boolean;
  isExcused: boolean;
  annotation: string;
  createdAt: string;
};
