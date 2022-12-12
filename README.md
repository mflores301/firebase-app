# To Start The Project

First install dependencies with **PNPM**


`pnpm install`

Finally run the command `pnpm start`

**Note:** If you want the seed data run `pnpm run seed` in other terminal after all is up


# Lavamap Full-Stack Test

Welcome to the Lavamap full-stack developer test. This is intended to test basic proficiency with some of the tools that we use in our stack - Typescript, Firebase Firestore, Firebase Cloud Functions, Google Cloud Storage, and connecting these services to our user-facing front end clients.

## Pre-Requisites

You'll need to install Firebase CLI globally, so you'll want to run something like `npm i -g firebase-tools`. This should allow you to use the Firebase Emulators with our demo project. You'll be emulating Firebase's Cloud Functions, Firestore, and Storage for backend functionality, as well as Firebase Hosting to serve the front-end application you'll build. You can refer to the official documentation for the [Firebase CLI](https://firebase.google.com/docs/cli) for more information.

## Backend

All backend code should be written using Typescript. To run the Firebase backend locally, you'll use the [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite), which has been preconfigured. The first time you run it, it should automatically download the emulators and then serve the resources. To set the backend up to serve locally, simply run `npm run serve` in the CLI. This will run all of the emulators at once, including the Hosting emulator which will serve whatever files are in the frontend/public directory. We've configured the project to use the project ID `demo-lavamap`- the "demo-" prefix tells the emulator that this is an "offline" project, so no Firebase project is required, and the emulator will block any calls that might wind up in a live project.

### Seeding the Firestore

Assume that a user consists of (at least) a name, an email address, a username and an avatar image.

Before tackling the rest of the test, you'll need to seed the emulated Firestore with 200 "user" objects within a "users" collection. How this task is accomplished is an exercise left to the reader. Some people love FakerJS. If you have a script that seeds the database that should be run before using the application, please include instructions on how to do it.

### Cloud Functions

Provide a cloud function that retrieves a subset of the users. The Cloud Function should provide a list of 10, 25, or 50 users at once, and the pagination should be handled server-side within the cloud function. All the cloud functions should use the [firebase-admin](https://github.com/firebase/firebase-admin-node) package to communicate with backend resources.

### Editing a person's email

Provide a cloud function that allows you to update the email field of an individual person. The cloud function should do a basic validation to make sure the email address is relatively close to a valid email address.

### Editing a person's avatar (optional)

Depending on your configuration, you might need to provide a cloud function to update the avatar URL of a person. There are ways around this if you're creative, but we won't count it against you if you provide this as a cloud function.

## Front End

All frontend code should be written using Typescript.

While the requirements for the front-end are fairly simple and can be accomplished with plain TS/JS, we'd like you to flex your favorite framework here. Are you a React person? Vue? Something else? Build with whatever you think will get the job done and make you look good while you do it.

The frontend should use the [Firebase JS SDK](https://github.com/firebase/firebase-js-sdk), specifically version 9 or above. Under no circumstances should the frontend code use the `firebase-admin` package.

### Display a list of people

Simply retrieve and display a paginated list of people from the cloud function provided by the back end. There should be front-end controls for paging through the results, as well as changing the number of results per page. These controls should work in tandem with the cloud function. You should display a person's name, email address, and avatar, using a default avatar is there isn't a custom one.

### Edit a person's email address

Within the list of people, provide a way to edit anybody's email address. This change should persist if you reload the page, so you should use the cloud function that update's the person's email address in the firestore.

### Upload a new avatar (optional)

This is a nice-to-have and not strictly required. Provide a control to edit a person's avatar by uploading an image file. The image file should be uploaded to the Google Cloud Storage emulator, and the list of people should display the new avatar after it's uploaded. The new avatar should also persist through reloading the page.

### Hosting

The frontend of the application can be served by the framework's `npm start`, but we'd like to see it built and served using the Firebase Hosting emulator. The current default folder for files being served via the Hosting emulator is frontend/public. You'll probably want to set that as your application's build target. For more information on configuring and troubleshooting Firebase Hosting, refer to the [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting/quickstart).
