export type Absence = {
  id: number;
  date: string;
  hours: number;
  type: number;
  mustExcused: boolean;
  isExcused: boolean;
  annotation: string;
  picture: string | null;
  createdAt: string;
};
