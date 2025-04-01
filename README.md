# 🌟 ConvoCraft  
A seamless chatbot solution built with Python and Langchain, connected to a React.js frontend via FastAPI for crafting dynamic and intelligent conversations.  

## 🚀 Features  
- **Conversational Intelligence:** Powered by Langchain for advanced natural language understanding.  
- **Fast API:** Utilizes FastAPI for smooth and speedy backend communication.  
- **React Frontend:** Clean and responsive UI for a great user experience.  
- **Easy Deployment:** Optimized for Vercel deployment.  

---

## 🛠️ Project Structure  
```
ConvoCraft/
├── client/        # React frontend
├── server/        # FastAPI backend
├── README.md      # You’re here!
```

---

## ⚡ Quick Start  

### 1️⃣ Fork the Repository  
Hit the **Fork** button on the top-right to get started.  

---

### 2️⃣ Launch the Client  
```bash
cd client
npm install
npm start
```
- Access the React app at: [http://localhost:3000](http://localhost:3000)  

---

### 3️⃣ Launch the Server  
```bash
cd server
pip install -r requirements.txt
uvicorn src.api:app --reload --host 127.0.0.1 --port 2025
```
- Access the API at: [http://127.0.0.1:2025](http://127.0.0.1:2025)  

---

## 🌐 Deploying on Vercel  
1. Install Vercel CLI if you haven’t:  
   ```bash
   npm i -g vercel
   ```  
2. Run the following in both `/client` and `/server` directories:  
   ```bash
   vercel deploy
   ```  
3. Follow the prompts and get your app live!  

---

## 📚 Tech Stack  
- **Frontend:** React, Tailwind CSS  
- **Backend:** FastAPI, Langchain, LangGraph, Python  
- **Deployment:** Vercel  

---

## 🛠️ Key Scripts  
- **Start React App:** `npm start` inside `/client`  
- **Start FastAPI Server:** `uvicorn src.api:app --reload` inside `/server`  
- **Deploy:** `vercel deploy`  

---

## 🤝 Contributions  
Feel free to open issues or submit PRs for new features and improvements!  

---

## ⭐ Show Your Support  
If you like this project, consider giving it a **star**! 🌟  

---
