export interface IEventListReq {
  offset: number;
  limit: number;
  search?: string;
  location?: string;
  date?: Date | null | string;
}

export interface IEventListRes {
  recordsTotal: number;
  recordsFiltered: number;
  result: IEvent[];
}

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  isRsvp:boolean
  createdAt: string;
  updatedAt: string;
}

export interface IAddEventReq {
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
}

export interface IAttendeesRes {
  result: IAttendee[];
  recordsTotal: number;
  recordsFiltered: number;
}

export interface IAttendee {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRsvpEventListReq {
  offset: number;
  limit: number;
  search?: string;
}

export interface IRsvpUserListReq {
  eventId: string;
  offset: number;
  limit: number;
  search?: string;
}

export interface IApiResponse<T>{
  data:T;
  statusCode: number;
  message: string;
}
