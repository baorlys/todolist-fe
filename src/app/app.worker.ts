/// <reference lib="webworker" />

import {EmailDetails, EmailService} from "./core/service/email.service";

addEventListener('message', ({ data }) => {
  const user = data;
  let details: EmailDetails = {
    recipient: user.email,
    subject: 'Welcome to Todo List',
    msgBody: 'Welcome to Todo List. We are excited to have you on board. You can now start creating your projects and todos. Enjoy!',
    attachment: null
  }
  const response = `worker response to ${data}`;
  postMessage(response);
});
