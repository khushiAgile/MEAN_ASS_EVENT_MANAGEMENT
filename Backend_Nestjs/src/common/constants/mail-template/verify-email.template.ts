export const verifyUserTemplate = (token: string, frontUrl: string) => `

<!DOCTYPE html>
<html lang="en">
  
  <body>
   <h2>Forgot Password</h2>
   <p>Please click the button below to show your invitation to the event:</p>
   <a href="${frontUrl}/reset-password?token=${token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
   
  </body>
</html>`;
