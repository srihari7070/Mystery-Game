# 🔍 The Missing GPU Mystery 

## 🎮 Interactive Detective Game

**Welcome, Detective!** A $2.5 million GPU has vanished during a high-stakes tech auction. The building is in lockdown, but the device has seemingly disappeared into thin air. You have 6 hours to solve this case before it self-destructs.

---

## 🚀 How to Play

1. **Read the case:** Start with the [Police Report](./evidence/police-report.md)
2. **Follow the clues:** Examine each piece of evidence carefully  
3. **Solve the mystery:** Find the GPU location and access password

---

## 🎯 Solve the Mystery

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

<div class="game-footer">
  <h3>🎮 Ready to Start Your Investigation?</h3>
  <p><strong>Begin with the <a href="./evidence/police-report.md">Police Report</a></strong></p>
  <p><em>Time is running out. Can you solve the case before the GPU self-destructs?</em></p>
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
