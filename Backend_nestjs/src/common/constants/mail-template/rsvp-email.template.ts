import { IEventDetail } from "src/common/interfaces/events.inteface";

export const sendRsvpTemplate = (eventDetail: IEventDetail) => `

<!DOCTYPE html>
<html lang="en">
  
  <body>
  <h2>You're Invited to ${eventDetail.title}!</h2>
  <p><strong>Date:</strong> ${eventDetail.date}</p>
  <p><strong>Time:</strong> ${eventDetail.time}</p>
  <p><strong>Location:</strong> ${eventDetail.location}</p>
  
  <p>We are excited to have you at this event. Please mark your calendar!</p>
  
  </body>
</html>`;
