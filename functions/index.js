const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();

app.use(express.json());

const serviceAccount = require("./key/podx-test-firebase-adminsdk-ric0y-5ab307b4b6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://podx-test.firebaseio.com", // Your Database URL Name in firestore
});
const db = admin.firestore();

// Route by Express
app.post("/", (request, response) => {
  res = db.collection(request.query.collection).doc().set(request.body);
  return response.send(res);
});

//export function to firebase function
exports.api = functions.region("asia-east2").https.onRequest(app);
