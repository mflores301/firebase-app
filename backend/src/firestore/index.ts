// external imports
import * as firebase from "firebase-admin";

const app = firebase.initializeApp({
  projectId: "demo-lavamap",
});

export const context = app.firestore();
