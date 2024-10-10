# Threads Clone

## Description
This project is a clone of the popular Threads app, built using React for the frontend and json-server for a mock backend. It demonstrates the power of React for building interactive user interfaces and showcases how to use a JSON file as a simple database for rapid prototyping and development.

## Features
- 📝 Create and view threads
- 💬 Comment on threads
- 👤 User profiles
- 🔄 Real-time updates using json-server
- 🎨 Responsive design
- 🚀 Fast development and prototyping

## Technologies Used
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [json-server](https://github.com/typicode/json-server) - Get a full fake REST API with zero coding
- [React Router](https://reactrouter.com/) - Declarative routing for React
- [Axios](https://axios-http.com/) - Promise based HTTP client for the browser and node.js
- [CSS Modules](https://github.com/css-modules/css-modules) - Locally scoped CSS

## Prerequisites
- Node.js (v14 or later)
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yusrilprayoga-code/threads-clone.git
   cd threads-clone
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the json-server (make sure you're in the project directory):
   ```
   json-server --watch db.json
   ```

4. In a new terminal, start the React development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Running the Backend
To start the mock backend server, run:
```
json-server --watch db.json
```
This will start the server at [http://localhost:3000](http://localhost:3000).

### Running the Frontend
In a separate terminal, run:
```
npm start
```
This will start the React app at [http://localhost:3001](http://localhost:3001) (or another available port if 3001 is in use).

### Creating Content
1. Use the "New Thread" button to create a new thread.
2. Click on a thread to view and add comments.
3. Visit user profiles by clicking on usernames.

### Customizing Data
1. Open `db.json` in the root directory.
2. Modify the JSON structure to add or change data.
3. The changes will be immediately reflected in the app.

## Project Structure
```
├── public/
├── src/
│   ├── components/  # React components
│   ├── pages/       # Page components
│   ├── styles/      # CSS Module files
│   ├── services/    # API services
│   ├── App.js       # Main App component
│   └── index.js     # Entry point
├── db.json          # JSON database file
├── package.json
└── README.md        # This file
```


## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements
- [Threads](https://www.threads.net/) for the inspiration
- [json-server](https://github.com/typicode/json-server) for the easy-to-use mock backend
- [Create React App](https://create-react-app.dev/) for the React project setup

---

Developed with ❤️ by Yusril Prayoga
