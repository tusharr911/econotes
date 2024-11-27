# Econotes

Econotes is a note-taking application built with React, TypeScript, and Firebase. It allows users to create, edit, pin, and delete notes. The application uses Redux for state management and Tailwind CSS for styling.

## Features

- **Create Notes**: Add new notes with a title, tagline, and body.
- **Edit Notes**: Modify existing notes.
- **Pin Notes**: Pin important notes to the top.
- **Delete Notes**: Remove notes that are no longer needed.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm or Yarn**: Ensure you have npm or Yarn installed for package management.
- **Firebase Account**: You need a Firebase account and a project set up. You can create one at [firebase.google.com](https://firebase.google.com/).

## Getting Started

Follow these steps to get started with the project:

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/econotes.git
cd econotes
```

### 2. Install Dependencies

Using npm:
```sh
npm install
```

Or using Yarn:
```sh
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your Firebase configuration:

```plaintext
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Start the Development Server

Using npm:
```sh
npm run dev
```

Or using Yarn:
```sh
yarn dev
```

## Project Structure

- `src/components`: Contains React components.
- `src/store`: Contains Redux slices and store configuration.
- `src/firebase`: Firebase configuration and initialization.
- `src/types`: TypeScript types used in the project.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript.
- **Firebase**: Backend-as-a-Service for authentication and database.
- **Redux**: State management library.
- **Tailwind CSS**: Utility-first CSS framework.

## Contribution

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/)
- [Redux](https://redux.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)


