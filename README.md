# Aora-ReactNative

A React Native project created using Expo.

## Description

Aora is a short videos application where users can upload new videos, like, and save videos. This app provides an engaging platform for users to share and discover short-form video content. It leverages the power of React Native to create a smooth, native-like experience on both Android and iOS devices.

### About React Native

React Native is an open-source mobile application framework created by Facebook. It allows developers to use React along with native platform capabilities to build mobile applications. With React Native, you can create truly native apps and do it all with a single codebase, which is shared between platforms. This significantly speeds up development and ensures a consistent look and feel across different devices.

## Getting Started

To get started with this project, follow these steps:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the app:

   ```bash
   npx expo start
   ```

   You'll find options to open the app in a development build, Android emulator, iOS simulator, or Expo Go.

## Project Structure

The project structure is as follows:

- `app/` - Main application code
- `assets/` - Image and other assets
- `components/` - Reusable components
- `constants/` - Application constants
- `context/` - React context for state management
- `hooks/` - Custom hooks
- `lib/` - Utility functions and libraries
- `scripts/` - Automation scripts

## Appwrite Backend Setup

### Steps to Create an Appwrite Project for Android/iOS

1. **Sign Up / Log In** to Appwrite:
   Visit [Appwrite Cloud](https://appwrite.io/) and sign up or log in.

2. **Create a Project**:

   - Go to the Appwrite console.
   - Click on "Create Project".
   - Enter your project name and select your region.

3. **Add a Platform**:
   - Select a platform to add.
   - Name your Android app and the package name.
   - Add a new platform and follow the instructions for your target platform.

### Steps to Create a Database and Collections

1. **Create a Database**:

   - Go to your project dashboard.
   - Click on "Databases".
   - Click on "Create Database".

2. **Create Collections**:

   - Within your database, click on "Create Collection" and add the following collections:

     **Users Collection**:

     - `username` (String)
     - `email` (Email)
     - `avatar` (URL)
     - `accountId` (String)
     - Allow CRUD permissions for Any user.

     **Videos Collection**:

     - `title` (String)
     - `thumbnail` (URL)
     - `prompt` (String)
     - `video` (URL)
     - `creator` (Relationship: Many to One with Users)
     - Allow CRUD permissions for Users.

     **Saved Collection**:

     - `users` (Relationship: Many to One with Users)
     - `videos` (Relationship: Many to One with Videos)
     - Allow CRUD permissions for Users.

3. **Get Collection IDs**:

   - After creating each collection, note down the collection IDs from the collection settings.

4. **Create Storage**:
   - Go to your project dashboard.
   - Click on "Storage".
   - Click on "Create Bucket".
   - Enter your bucket name 'files'.
   - Give CRUD permissions to Users and READ permission to Guests.
   - Set maximum fil size to 50 megabytes.
   - Add allowed file extensions png, gif, mp4, jpg, jpeg.

### Configuration

Create a config.js file in the lib directory and use the following configuration in your project:

```javascript
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "YOUR_PACKAGE_NAME",
  projectId: "YOUR_PROJECT_ID",
  databaseId: "YOUR_DATABASE_ID",
  userCollectionId: "YOUR_USER_COLLECTION_ID",
  videoCollectionId: "YOUR_VIDEO_COLLECTION_ID",
  savedCollectionId: "YOUR_SAVED_COLLECTION_ID",
  storageId: "YOUR_STORAGE_ID",
};
```

## Available Scripts

In the project directory, you can run:

### `npm run reset-project`

This command will move the starter code to the `app-example` directory and create a blank `app` directory for development.

## Learn More

To learn more about developing with Expo, check out these resources:

- [Expo documentation](https://docs.expo.dev)
- [Learn Expo tutorial](https://docs.expo.dev/get-started/installation/)
