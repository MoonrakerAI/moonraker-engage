import {onRequest} from "firebase-functions/v2/https";

export const helloWorld = onRequest((request, response) => {
  response.json({result: "Hello from HIPAA Chatbot Functions!"});
});
