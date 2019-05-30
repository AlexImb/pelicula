import { Timestamp } from '@firebase/firestore-types';

export interface Event {
  id: string;
  timestamp: Timestamp | number;
  date: Date;
  description: string;
}
