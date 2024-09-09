import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environments';
import {
  IAddEventReq,
  IApiResponse,
  IAttendeesRes,
  IEvent,
  IEventListReq,
  IEventListRes,
  IRsvpEventListReq,
  IRsvpUserListReq,
} from '../../../common/interface/events.interface';
import { API_END_POINTS } from 'src/app/ helper/api.endpoints';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private httpClient: HttpClient) {}

  // Event list api call
  eventList(data: IEventListReq) {
    return this.httpClient.post<IApiResponse<IEventListRes>>(
      environment.apiEndpoint + API_END_POINTS.events.list,
      data,
    );
  }

  //  Event detail api call
  eventDetail(eventId: string) {
    return this.httpClient.get<IApiResponse<IEvent>>(
      environment.apiEndpoint + API_END_POINTS.events.event + `/${eventId}`,
    );
  }

  //   Event create api call
  eventCreate(data: IAddEventReq) {
    return this.httpClient.post<IApiResponse<IEvent>>(
      environment.apiEndpoint + API_END_POINTS.events.event,
      data,
    );
  }

  //   Event update api call
  eventUpdate(eventId: string, data: IAddEventReq) {
    return this.httpClient.patch<IApiResponse<IEvent>>(
      environment.apiEndpoint + API_END_POINTS.events.event + `/${eventId}`,
      data,
    );
  }

  //   Event delete api call
  eventDelete(eventId: string) {
    return this.httpClient.delete<IApiResponse<object>>(
      environment.apiEndpoint + API_END_POINTS.events.event + `/${eventId}`,
    );
  }

  // Event Attendees list api call
  eventAttendeesList(data: IRsvpUserListReq) {
    return this.httpClient.post<IApiResponse<IAttendeesRes>>(
      environment.apiEndpoint + API_END_POINTS.rsvp.userList,
      data,
    );
  }

  // Event list attended by user api call
  eventListAttendedByUser(data: IRsvpEventListReq) {
    return this.httpClient.post<IApiResponse<IEventListRes>>(
      environment.apiEndpoint + API_END_POINTS.rsvp.eventList,
      data,
    );
  }

  // User can rsvp to event api call
  userRsvp(eventId: string) {
    return this.httpClient.post<IApiResponse<object>>(
      environment.apiEndpoint + API_END_POINTS.rsvp.rsvp,
      { eventId },
    );
  }
}
