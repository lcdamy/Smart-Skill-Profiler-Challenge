# SMART-SKILL-PROFILER-CHALLENGE

## 🧾 Description

This is an application for the Smart Skill Profiler Challenge, built with Next.js. The project features a form where users input their information, receive feedback on their skills, and get an improved bio generated using a Cohere AI model.

## 🔗 Live Preview

If deployed, you can view a live version of this application at:  
👉 [https://smart-skill-profiler.netlify.app](https://smart-skill-profiler.netlify.app)

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

## ✅ Prerequisite installation

- Node.js v18.18.0 or higher

## 🛠 Installation

1. **Clone the Repository**

    ```bash
    git clone git@github.com:lcdamy/Smart-Skill-Profiler-Challenge.git
    cd Smart-Skill-Profiler-Challenge
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

## 🏃‍♂️ Running in Development

To start the server in development mode:

1. Copy the example environment file:

    ```bash
    cp .env.example .env
    ```

2. Start the server:

    ```bash
    npm run dev
    ```

## 🏗️ Building for Production

To build the project for production, run:
```bash
npm run build
```

> **Note:** The built files will be in the `.next` directory.

📁 Folder Structure

```
smart-skill-profiler/
├── public/                     # Static assets (images, fonts, etc.)
├── netlify/                    # Has a serveless function that call Cohere AI API 
├── src/
│   ├── app/                    # Application routing
│   ├── components/             # Reusable UI components
│   ├── lib/                    # Constants, types, utility functions, and validation
│   └── store/                  # Zustand state management store
├── .env                        # Environment variables
├── .gitignore                  # Git ignore rules
├── package.json                # Project metadata and dependencies
└── README.md
```

## 👥 Contributors

- [lcdamy](https://www.linkedin.com/in/pierre-damien-murindangabo-cyuzuzo-709b53151/)
