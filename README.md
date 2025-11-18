# 🔍 The Missing GPU Mystery 

## 🎮 Interactive Detective Game

**Welcome, Detective!** A groundbreaking GPU worth millions has vanished during a high-stakes tech auction. Your mission: solve the case and recover the stolen hardware before it's too late.

---

## 📋 Case Overview

A revolutionary $2.5 million GPU has vanished from a high-security tech auction. The building is in lockdown, no one has left, but the device has seemingly disappeared into thin air. With a self-destruct countdown already activated, you have just 6 hours to solve this case.

**Your Role:** Lead Detective investigating the theft  
**Challenge:** Find the GPU's location + Discover the access password  
**Stakes:** Technology worth millions will self-destruct if not recovered safely

---

## 🚀 How to Play

### 📖 Step 1: Read the Case File
**Start here:** [🔍 THE CASE OF THE VANISHING GPU](./MYSTERY.md)

This contains the full story briefing, crime details, and your mission parameters.

### 🕵️ Step 2: Examine the Evidence
After reading the case file, investigate these evidence pieces in order:

- **Evidence #1:** [Police Report](./evidence/police-report.md)
- **Evidence #2:** [CCTV Analysis](./evidence/cctv-analysis.md)  
- **Evidence #3:** [Physical Evidence](./evidence/physical-evidence.md)
- **Evidence #4:** [Demo Area Investigation](./evidence/demo-area.md)
- **Evidence #5:** [Encrypted Clue](./evidence/encrypted-note.md)

### 🎯 Step 3: Solve the Mystery
Based on your investigation, answer these critical questions below:

---

## 🎯 Solve the Mystery

Based on your investigation, answer these critical questions:

### 🖥️ Location Discovery
**Where is the stolen GPU hidden?**

<div id="location-input">
  <label>The GPU is hidden inside: </label>
  <input type="text" id="location" placeholder="Enter your answer..." maxlength="20">
  <button onclick="checkLocation()">Submit Location</button>
  <div id="location-result"></div>
</div>

### 🔐 Security Override
**What is the access password to safely retrieve the GPU?**

<div id="password-input">
  <label>Access Password: </label>
  <input type="password" id="password" placeholder="Enter password..." maxlength="10">
  <button onclick="checkPassword()">Enter Password</button>
  <div id="password-result"></div>
</div>

---

## 🧩 Game Mechanics

- **Difficulty:** Intermediate Detective Skills Required
- **Time to Complete:** 15-30 minutes
- **Clues:** 4 interconnected pieces of evidence
- **Solution Method:** Deductive reasoning + pattern recognition
- **Failure Consequence:** GPU self-destructs (game reset required)

---

## 🎖️ Detective Rankings

**🏆 Master Detective:** Solved in under 10 minutes  
**🥈 Skilled Investigator:** Solved in 10-20 minutes  
**🥉 Junior Detective:** Solved in 20-30 minutes  
**🔄 Trainee:** Required multiple attempts  

---

## 💡 Hints System

Stuck? Click for progressive hints:

<details>
<summary>💡 Hint 1 - Physical Evidence</summary>
Look carefully at what was left behind at the crime scene. Tools tell stories about their users.
</details>

<details>
<summary>💡 Hint 2 - Demo Area</summary>
Sometimes the best hiding place is in plain sight. Check for anomalies in expected behavior patterns.
</details>

<details>
<summary>💡 Hint 3 - Encryption</summary>
Simple ciphers often use basic letter shifts. Consider the relationship between keyboard positions and alphabet order.
</details>

---

## 🛠️ Technical Implementation

This mystery game demonstrates:

- **Frontend Web Development:** Interactive HTML/CSS/JavaScript interface
- **Problem-Solving Design:** Multi-layered puzzle architecture  
- **User Experience:** Progressive disclosure of information
- **Security Concepts:** Basic cryptography and password protection
- **Creative Writing:** Technical storytelling and world-building

### Code Structure
```
gpu-mystery-game/
├── README.md                 # Main game interface
├── evidence/                 # Investigation materials
│   ├── police-report.md
│   ├── cctv-analysis.md
│   ├── physical-evidence.md
│   ├── demo-area.md
│   └── encrypted-note.md
├── assets/                   # Visual evidence
│   ├── screwdriver.png
│   ├── demo-setup.png
│   └── encrypted-note.png
└── scripts/                  # Game logic
    └── detective.js          # Solution validation
```

---

## 🎯 Learning Objectives

Players will practice:
- **Logical Deduction:** Connecting disparate clues to form conclusions
- **Pattern Recognition:** Identifying anomalies in expected behavior
- **Basic Cryptography:** Understanding simple cipher mechanisms
- **Technical Analysis:** Interpreting system performance data
- **Investigation Methodology:** Systematic evidence evaluation

---

## 🚀 About the Creator

This interactive mystery was created by **Srihari Ananthan** as a creative demonstration of:
- Full-stack development skills
- Game design and user experience
- Creative problem-solving approaches
- Technical storytelling abilities

Connect with me: [LinkedIn](https://www.linkedin.com/in/srihari-ananthan/) | [Portfolio](https://github.com/srihari7070)

---

## 📜 License & Credits

**Game Concept:** Original mystery design by Srihari Ananthan  
**License:** MIT - Feel free to fork, modify, and create your own mystery games!  
**Inspiration:** Classic detective stories meet modern technology  

---

<div class="game-footer">
  <h3>🎮 Ready to Start Your Investigation?</h3>
  <p><strong>Begin by reading the full case briefing: <a href="./MYSTERY.md">🔍 THE CASE OF THE VANISHING GPU</a></strong></p>
  <p><em>A $2.5 million GPU has vanished, and time is running out. Can you solve the case before it self-destructs?</em></p>
</div>

<script src="scripts/detective.js"></script>

<style>
  .game-footer {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    margin-top: 30px;
  }
  
  #location-input, #password-input {
    background: #f8f9fa;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    margin: 10px 0;
  }
  
  input[type="text"], input[type="password"] {
    padding: 8px 12px;
    margin: 5px;
    border: 2px solid #007bff;
    border-radius: 4px;
    font-size: 16px;
  }
  
  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background: #0056b3;
  }
  
  .success {
    color: #28a745;
    font-weight: bold;
    margin-top: 10px;
  }
  
  .error {
    color: #dc3545;
    font-weight: bold;
    margin-top: 10px;
  }
</style>
