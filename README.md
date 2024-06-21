## Live Demo

You can view the live demo [here](https://dynamic-form-app-u8yt.vercel.app/).

# Dynamic Form Builder and Response Collector

This project is a web application built with React that allows users to create dynamic forms, fill them out, and collect responses. It includes features like adding questions, selecting question types (single-choice or multiple-choice), saving forms, fetching saved forms, deleting forms, and submitting responses. The forms and responses are managed using a Node.js backend with MongoDB for data storage.

### Screenshots

![Screenshot 1](https://firebasestorage.googleapis.com/v0/b/portfolio-c5c0a.appspot.com/o/Screenshot%202024-06-21%20at%2012.48.35%E2%80%AFPM.png?alt=media&token=cf115a82-702b-43f0-9303-65c1e36fe70a)

## Features

- Form Builder: Create forms with customizable questions.
- Question Types: Choose between single-choice and multiple-choice questions.
- Form Management: Save forms, fetch saved forms, and delete forms.
- Response Collection: Allow users to respond to forms created using the app.
- Validation: Form input validation using Yup schema validation.
- UI Components: Utilizes Ant Design for UI components and FontAwesome icons for additional visual elements.
- Toast Notifications: Provides toast notifications using react-toastify to notify users of form and response actions.

## Technologies Used

- Frontend: React.js, Formik (for form handling), Yup (for schema validation), Ant Design (for UI components), FontAwesome (for icons), Axios (for HTTP requests), react-toastify (for notifications).
- Backend: Node.js, Express.js (for API routing), MongoDB (for database storage), Mongoose (for MongoDB object modeling), Axios (for HTTP requests).
- Deployment: Vercel (for frontend deployment and backend deployment).

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd dynamic-form-builder
   ```

2. Install dependencies:

   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the `server` directory.
   - Define environment variables like MongoDB connection URI and any other necessary variables.

4. Run the application:

   - Frontend:
     ```bash
     # From the 'client' directory
     npm start
     ```

   - Backend:
     ```bash
     # From the 'server' directory
     npm start
     ```

5. Access the application:

   - Open your browser and go to `http://localhost:3000` to access the frontend.
   - The backend server should be running on `http://localhost:5000`.

## API Endpoints

- GET /api/forms: Fetch all forms.
- POST /api/forms: Create a new form.
- GET /api/forms/:id: Fetch a specific form by ID.
- DELETE /api/forms/:id: Delete a form by ID.
- POST /api/forms/:id/responses: Submit responses for a form.

## Folder Structure

```
dynamic-form-builder/
├── client/              # Frontend React application
├── server/              # Backend Node.js application
├── README.md            # Project README file           
```

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or issues, feel free to open an issue or create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Make sure to replace `<repository-url>` with the actual URL of your GitHub repository. This README file provides an overview of your project, including features, technologies used, installation instructions, API endpoints, folder structure, and information on contributing and licensing. Adjust it further based on additional details specific to your application and project requirements.
