# GitHub Starred Repositories Viewer

## Overview
This application allows users to authenticate via GitHub OAuth and fetch their starred repositories. It's built using Vue 3 and TypeScript for the frontend, and Node.js with JavaScript for the backend.

## Features
• User authentication via GitHub OAuth \
• Fetching and displaying user's starred repositories

## Create GitHub OAuth Application:
• Go to your GitHub account settings.\
• Navigate to "Developer settings" > "OAuth Apps" > "New OAuth App".\
• Fill in the required details, such as the application name, homepage URL (e.g., http://localhost:5173), and callback URL (e.g., http://localhost:5173/callback). \
• You may also check this documentation https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app. \
• After creating the OAuth app, note down the client ID and client secret. // reform the "you may also check this documentation" to better form
Environment Variables:

## Installation
Clone the Repository:

```
git clone <repository-url>
```
### Frontend:
(from the root directory)
```
cd .\client\
npm install
npm run dev
```

### Backend: 
(from the root directory)
```
cd .\server\
npm install
npm run dev
```

## Create a .env file in the root directory of the backend.

### Add the following environment variables:
```
VITE_CLIENT_ID=<your-github-client-id>
VITE_CLIENT_SECRET=<your-github-client-secret>
```
• Open your web browser and navigate to the specified URL http://localhost:5173.


