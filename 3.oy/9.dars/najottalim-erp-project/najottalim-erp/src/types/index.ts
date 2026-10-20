export type PortalSection =
  | 'dashboard'
  | 'courses'
  | 'attendance'
  | 'rating'
  | 'payments';

export interface Student {
  id: string;
  fullName: string;
  coinBalance: number;
  groupName: string;
  courseProgress: number;
}

export interface Course {
  id: string;
  title: string;
  teacher: string;
  schedule: string;
  room: string;
}
