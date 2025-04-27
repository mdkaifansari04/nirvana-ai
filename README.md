![github-submission-banner](https://github.com/user-attachments/assets/a1493b84-e4e2-456e-a791-ce35ee2bcf2f)

# Nirvana AI

> Empowering mental well‑being through empathetic AI, evidence‑based support, and user‑centered privacy.

---

## 📌 Problem Statement

**Problem Statement 1 – Weave AI magic with Groq**

---

## 🎯 Objective

**Problem & Audience**  
Nirvana AI addresses the global mental health crisis—where 1 in 4 people experience challenges yet face high costs, long wait times, and stigma around seeking help—by serving anyone seeking accessible, affordable, and confidential support.

**Real‑World Use Case**  
A working professional feels overwhelmed by stress but can’t fit traditional therapy into their schedule or budget. They turn to Nirvana AI’s mobile app to chat with an empathetic AI, log their thoughts in an AI‑guided journal, and complete quick, CBT‑inspired micro‑exercises whenever and wherever they need them.

**Value Provided**

- **Accessibility**: 24/7 support at a fraction of the cost of in‑person therapy
- **Personalization**: NLP‑driven chatbot adapts to each user’s emotional state and history
- **Effectiveness**: Evidence‑based CBT techniques help users build coping skills and track progress over time
- **Privacy & Stigma Reduction**: Private, digital format empowers users to seek help without fear of judgment.

---

## 🧠 Team & Approach

### Team Name:

`Xcoders`

### Team Members:

- K Om Senapati ([GitHub](https://github.com/kom-senapati))
- Md Kaif Ansari ([GitHub](https://github.com/mdkaifansari04))
- Arjun Vijay Prakash ([GitHub](https://github.com/ArjunCodess))
- Nihal Soni ([GitHub](https://github.com/nihal-soni))

### Your Approach:

**Why we chose this problem:**  
We built Nirvana.AI because we needed it ourselves. Mental health tools often feel like chores, but we wanted something simple and powerful that helps people offload, understand, and evolve their minds—on their terms.  

**Key challenges we addressed:**  
1. **Designing the Report Schema:** Structuring a flexible yet detailed JSON schema for AI-generated mental health reports was tricky.  
2. **Prompt Engineering:** Getting the AI to generate empathetic, human-like reports required refining prompts through experimentation.  
3. **Data Aggregation:** Combining past conversations, reports, and exercises into meaningful, context-aware outputs was complex.  
4. **User Privacy:** Ensuring sensitive mental health data was secure and handled with care was critical.  

**Pivots, brainstorms, or breakthroughs:**  
- Iterated on the schema design to balance detail and flexibility.  
- Fine-tuned prompts to blend structure with emotional intelligence.  
- Developed layered methods to feed context into the AI for better outputs.  
- Implemented encryption and anonymized storage to protect user privacy.  

We didn’t just build this because it sounded cool—we built it because it mattered.

---

## 🛠️ Tech Stack

### Core Technologies Used:

- Frontend: Next JS, React Query
- Backend: Express JS, Groq SDK
- Database: Mongo DB
<!--
- APIs:
- Hosting:
  -->

### Sponsor Technologies Used (if any):

- [x] **Groq:** _Accelerated AI inference with Groq hardware._

---

## ✨ Key Features

- Rich Journaling
  A beautiful, distraction-free editor for brain dumps, emotional logs, and daily reflections.

  ![image](https://github.com/user-attachments/assets/c8748784-72fd-4e89-bb35-f5070cec3b4a)

- AI Chat
  Talk with an empathetic AI that adapts to your emotional state and history. Not just a bot — a guide.

  ![image](https://github.com/user-attachments/assets/ea15316c-0b6b-4e2f-b858-6c170e74e608)

- Micro-Exercises
  Quick CBT-based activities to boost resilience, fight spiralling thoughts, and build better habits.

  ![image](https://github.com/user-attachments/assets/0a3ea86c-bd3f-4a43-8661-a985969ccf27)

- Mood Tracking
  Visualise your emotional health over time with smart analytics, without feeling like you're "being measured."

  ![image](https://github.com/user-attachments/assets/2334982c-c874-4fdd-bcdf-7fdfcf8167bb)

- Privacy First: Fully encrypted, anonymised storage. Your mind is yours alone.

---

## 📽️ Demo & Deliverables

- **Demo Video Link:** [Youtube](https://youtu.be/Yo5_u46kiN0)
<!--
- **Pitch Deck / PPT Link:** [Paste Google Slides / PDF link here]
-->

---

## ✅ Tasks & Bonus Checklist

- [x] **All members of the team completed the mandatory task - Followed at least 2 of our social channels and filled the form** (Details in Participant Manual)
- [x] **All members of the team completed Bonus Task 1 - Sharing of Badges and filled the form (2 points)**  (Details in Participant Manual)
- [x] **All members of the team completed Bonus Task 2 - Signing up for Sprint.dev and filled the form (3 points)**  (Details in Participant Manual)

---

## 🧪 How to Run the Project

### Requirements:
- Node.js
- Bun (for package and task management)
- MongoDB
- Environment Variables:
  - Backend:
    ```dotenv
    PORT=5500
    GROQ_API_KEY=
    MONGO_URL=
    CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    ```
  - Frontend:
    ```dotenv
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_HOST_URL=
    ```

### Local Setup:
```bash
# Backend Setup
cd backend
bun i # Install dependencies
bun dev # Start backend server

# Frontend Setup
cd frontend
bun i # Install dependencies
bun dev # Start frontend server
```

#### Notes:
- Ensure MongoDB is running and accessible via the `MONGO_URL` environment variable.
- Obtain and configure the required Clerk API keys (`CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`).
- The `GROQ_API_KEY` must be set for backend functionality.

---

## 🧬 Future Scope  

List of improvements, extensions, or follow-up features:  

- 📈 **More integrations**: Sync with fitness trackers, calendars, and other wellness apps for a holistic experience.  
- 🛡️ **Security enhancements**: Explore advanced encryption methods and biometric authentication for added safety.  
- 🧠 **Advanced AI insights**: Introduce predictive analytics and deeper emotional trend analysis.  

---

## 🏁 Final Words

At HackHazards 2025, we didn’t just code — we solved. The world is drowning in anxiety, overthinking, and burnout, and traditional tools either feel out of reach or too shallow to make a real impact. So, we built **Nirvana.AI**, a mental health companion designed for clarity, depth, and real reflection.  

This journey wasn’t easy. From nailing the perfect AI tone to ensuring user privacy, every step pushed us to think deeper and build smarter. But through late-night brainstorming, countless iterations, and moments of breakthrough, we created something we’re truly proud of.  

Shout-out to our team for their relentless energy and to everyone at HackHazards for inspiring us to tackle what matters. Here’s to building tools that help people breathe easier. 💙

---
