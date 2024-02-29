# GitHub Starred Repositories Viewer

## Overview
This application allows users to authenticate via GitHub OAuth and fetch their starred repositories. It's built using Vue 3 and TypeScript for the frontend, and Node.js with JavaScript for the backend.

## Features
• User authentication via GitHub OAuth \
• Fetching and displaying user's starred repositories

## Create GitHub OAuth Application:
1. Go to your GitHub account settings.
2. Navigate to "Developer settings" > "OAuth Apps" > "New OAuth App".
3. Fill in the required details, such as the application name, homepage URL (e.g., http://localhost:5173), and callback URL (e.g., http://localhost:5173/callback). 
4. After creating the OAuth app, note down the client ID and client secret. // reform the "you may also check this documentation" to better form

You may also refer to this documentation for more detailed instructions: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app.

## Environment Variables:
Create a .env file in the root directory of the backend.

```
VITE_CLIENT_ID=<your-github-client-id>
VITE_CLIENT_SECRET=<your-github-client-secret>
```

## Installation
1. Clone the Repository:
```
git clone <repository-url>
```
2. Navigate to the project directory:
```
cd .\RepoViewer\
```
3. Install dependencies for both frontend and backend:
```
cd .\client\
npm install

cd .\server\
npm install
```

## Running the application:

1. Start the backend server:
```
cd .\server\
npm run dev
```
2. Start the frontend development server:
```
cd .\client\
npm run dev
```
3. Open your web browser and navigate to the URL http://localhost:5173.


