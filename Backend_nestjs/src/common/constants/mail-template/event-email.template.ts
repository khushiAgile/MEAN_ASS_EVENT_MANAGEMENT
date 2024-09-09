import { IEventDetail } from "src/common/interfaces/events.inteface";

export const sendEventTemplate = (eventDetail: IEventDetail) => `

<!DOCTYPE html>
<html lang="en">
  
  <body>
  <h2>New Event Created: ${eventDetail.title}</h2>
  <p><strong>Date:</strong> ${eventDetail.date}</p>
  <p><strong>Time:</strong> ${eventDetail.time}</p>
  <p><strong>Location:</strong> ${eventDetail.location}</p>
  <p>We are excited to have you at this event. Please mark your calendar!</p>
  
  <hr>
  <p>Best Regards,</p>
  <p>The Events Team</p>
  
  </body>
</html>`;
