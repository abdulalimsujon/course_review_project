import { Types } from 'mongoose';

export type TcourseDetails = {
  level: string;
  description: string;
};
export type Ttags = {
  name: string;
  isDeleted: boolean;
};
export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: [Ttags];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  details: TcourseDetails;
};
