# Blog Website

This is a blog website where users can create, edit, and view blogs. The website allows users to register and log in to manage their blogs. It also provides a user-friendly interface for reading blogs and interacting with the community.

## Features

- User Authentication: Users can sign up and log in to the website using their user name, email, password and organisation.
- Create Blog: Authenticated users can create new blogs by providing a title and content.
- Edit Blog: Users can edit their existing blogs, updating the title and content.
- View Blog: All blogs are displayed on the homepage, and users can click on a blog to read the full content.
- Delete Blog: Authenticated users can delete their blogs if they wish to remove them.
- Blog Search: The website includes a search bar to find blogs based on keywords or titles.
- Blog Categories: Blogs are organized into different categories for easy navigation.
- Responsive Design: The website is fully responsive and works on various devices, including mobile phones and tablets.

## Tech Stack

- Frontend: React.js, Redux, Ant Design, React Router
- Backend: Node.js, Express.js, MongoDB
- Authentication: JWT (JSON Web Tokens)
- Markdown Editor: @uiw/react-md-editor
- Styling: CSS and Ant Design components

## Getting Started

To run the website locally, follow these steps:

1. Clone the repository: git clone <repository-url>
2. Install dependencies: npm install
3. Start the development server: npm start
4. Open your browser and go to http://localhost:3000

## Folder Structure

```
|-- src
|-- components
| |--Auth
| | |-- PrivateRoute.tsx
| |-- Blog
| | |-- EditBlog.tsx
| | |-- EditBlog.css
| |-- Blog.tsx
| |-- Blog.css
| |-- ...
|-- pages
| |-- Home
| | |-- Home.tsx
| | |-- Home.css
| |-- Login
| | |-- Login.tsx
| | |-- LoginForm.tsx
| |-- SignUp
| | |-- SignUpForm.tsx
| |-- ...
|-- reducer
| |-- api.ts
| |-- blogSlice.ts
| |-- userSlice.ts
| |-- store.ts
| |-- ...
|-- App.tsx
|-- App.css
|-- index.js
|-- ...
|-- utils
| |-- auth.helper.ts
| |-- constants.ts
|-- public
|-- package.json
|-- tsconfig.json
|-- ...
```

## APIs

The backend APIs are provided using Express.js and MySQL and Sequelize to manage user registration, authentication, and CRUD operations for blogs.

- POST /api/signup: Register a new user.
- POST /api/login: Log in an existing user.
- GET /api/blog/show: Get all blogs.
- GET /api/blogs/show/:blogId: Get a specific blog by ID.
- POST /api/blog: Create a new blog.
- PUT /api/blog/:blogId: Update an existing blog.
- DELETE /api/blog/:blogId: Delete a blog.
