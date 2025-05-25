# NourishNet 🍽️  
A food waste reduction platform that connects donors with recipients to minimize food waste and promote social good.

## 🌟 Overview

**NourishNet** is a full-stack web application designed to streamline the redistribution of surplus food. It enables **donors** to post excess food items with details like images and expiration dates, and allows **recipients** to browse listings and apply to receive food. The platform also includes a notification system to manage the process from application to final confirmation.

The application is fully integrated with a Jenkins CI/CD pipeline to ensure smooth and automated deployment.

---

## 🚀 Features

- 🥗 **Donor Portal**: Post food listings with images, location, and expiration dates.
- 🛒 **Recipient Dashboard**: Browse and apply for available food items.
- 🔔 **Notification System**: Real-time updates for application status, confirmations, and more.
- 🔐 **JWT Authentication**: Secure login and user identity management.
- ⚙️ **CI/CD with Jenkins**: Automated testing, building, and deployment pipeline.

---

## 🛠️ Tech Stack

### Frontend
- **React** (TypeScript)
- **Redux** for state management
- **Bootstrap** for responsive UI

### Backend
- **ASP.NET Core** Web API
- **MySQL** database
- **JWT** for authentication and authorization

### DevOps
- **Jenkins** for CI/CD
- **Docker** *(optional for containerization and future scalability)*

### Tools
- Visual Studio 2022 (Community Edition)
- Visual Studio Code
- Git & GitHub
  
---

## 📂 Project Structure

/client --> React frontend (TypeScript)
/server --> ASP.NET Core backend
/Jenkinsfile --> Jenkins pipeline configuration
/docker --> Docker-related files (if used)
/README.md --> This file


---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js and npm
- .NET SDK 6.0 or later
- MySQL
- Jenkins (local or cloud)
- Git

### Backend Setup (ASP.NET Core)
1. Navigate to the `server` folder:
    ```bash
    cd server
    ```
2. Configure `appsettings.json` for your MySQL connection string.
3. Run migrations (if using EF Core):
    ```bash
    dotnet ef database update
    ```
4. Start the backend:
    ```bash
    dotnet run
    ```

### Frontend Setup (React)
1. Navigate to the `client` folder:
    ```bash
    cd client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the frontend:
    ```bash
    npm run dev
    ```

---

## 🔄 Jenkins CI/CD Pipeline

1. Configure your Jenkins server with the required plugins:
   - Git
   - NodeJS
   - .NET SDK
   - Docker (optional)

2. Use the `Jenkinsfile` in the root directory to define your build pipeline.

3. Setup GitHub Webhooks (optional) to trigger builds on each push.

---

## 👥 Contributors

- **Your Name** - [LinkedIn](https://www.linkedin.com) | [GitHub](https://github.com/yourusername)
- Team Members (add others here)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💡 Inspiration

Inspired by the growing need to tackle food insecurity and reduce food waste in communities by using technology for social good.

