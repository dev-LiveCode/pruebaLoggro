import { ObjectId } from 'mongodb';

export interface IToast {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning'; // Determines color/icon
}

export interface IMenu {
  path: string;
  text: string;
}

export interface IImage {
  _id: ObjectId;
  personName: string;
  size: number;
  url: string;
  requestDate?: Date;
  createdAt?: Date;
  updateAt?: Date;
}

export interface IImageForm {
  personName: string;
  requestDate?: Date;
  file: File;
}

export interface IRangeDate {
  startDate: String;
  endDate: String;
}

export interface IStats {
  hour: string,
  count: number
}

export interface ICertifications {
  text: string,
  image: string,
  pdf: string,
}
