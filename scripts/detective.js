// GPU Mystery Game - Detective Solution Validator
// Created by Srihari Ananthan
// Handles user input validation, stats tracking, and edge cases

class GPUMysteryGame {
    constructor() {
        this.gameStartTime = Date.now();
        this.attempts = {
            location: 0,
            password: 0
        };
        this.solved = {
            location: false,
            password: false
        };
        
        // Valid solutions (normalized for comparison)
        this.correctAnswers = {
            location: [
                // Primary answers
                "4th pc", "fourth pc", "pc 4", "pc #4",
                "4th computer", "fourth computer", "computer 4", "computer #4",
                
                // Demo variations
                "demo pc 4", "demo computer 4", "4th demo pc", "fourth demo pc",
                "demo setup 4", "4th demo setup", "fourth demo setup",
                "setup 4", "setup #4", "4th setup", "fourth setup",
                
                // Alternative phrasings
                "pc four", "computer four", "the 4th pc", "the fourth pc",
                "demonstration pc 4", "demonstration computer 4"
            ],
            password: [
                "video", "VIDEO", "Video", "ViDeO", "vIdEo"
            ]
        };
        
        // Easter eggs and creative answers
        this.easterEggs = {
            location: [
                "sherlock holmes", "batman", "detective", "elementary",
                "magnifying glass", "deduction", "clue", "mystery"
            ],
            password: [
                "elementary", "watson", "sherlock", "clues", "deduction",
                "mystery", "cipher", "code", "encryption"
            ]
        };
        
        // Common wrong answers to provide specific hints
        this.commonMistakes = {
            location: {
                "pc 1": "Close! But check the performance data more carefully.",
                "pc 2": "Not quite. Look at which PC shows unusual performance.",
                "pc 3": "Getting warmer, but examine the benchmarks again.",
                "pc 5": "Check the performance comparison - one PC stands out.",
                "vault": "That's where it was stolen from, not where it's hidden now.",
                "server": "Think smaller - check the demo equipment.",
                "storage": "Already searched. Think about hiding in plain sight."
            },
            password: [
                "password", "1234", "admin", "gpu", "nvidia", "techcorp",
                "secret", "access", "unlock", "override"
            ]
        };
        
        this.initialize();
    }
    
    initialize() {
        console.log("🕵️ GPU Mystery Game Loaded");
        console.log("💡 Tip: Case-sensitive? No. Spelling matters? Yes.");
        
        // Track page load for analytics
        this.logEvent("game_loaded", { timestamp: new Date().toISOString() });
    }
    
    // Main validation function for location answers
    validateLocation(userInput) {
        this.attempts.location++;
        
        if (!userInput || userInput.trim().length === 0) {
            return this.createResult(false, "Please enter your answer.", "empty_input");
        }
        
        // Normalize input: lowercase, remove extra spaces, special chars
        const normalized = this.normalizeInput(userInput);
        
        // Check for correct answer
        if (this.isCorrectLocation(normalized)) {
            this.solved.location = true;
            this.logEvent("location_solved", { 
                attempts: this.attempts.location, 
                answer: userInput,
                time_taken: this.getElapsedTime()
            });
            
            return this.createResult(true, 
                "🎉 Excellent detective work! You found the GPU's hiding place.",
                "correct"
            );
        }
        
        // Check for easter eggs
        if (this.isEasterEgg("location", normalized)) {
            this.logEvent("easter_egg_found", { type: "location", input: userInput });
            return this.createResult(false,
                "🎭 Creative thinking, detective! But focus on the evidence at hand.",
                "easter_egg"
            );
        }
        
        // Check for common mistakes
        const specificHint = this.getSpecificLocationHint(normalized);
        if (specificHint) {
            return this.createResult(false, `❌ ${specificHint}`, "specific_hint");
        }
        
        // Progressive hints based on attempt count
        const progressiveHint = this.getProgressiveLocationHint();
        this.logEvent("location_attempt", { 
            attempt: this.attempts.location, 
            answer: userInput,
            hint_given: progressiveHint
        });
        
        return this.createResult(false, `❌ ${progressiveHint}`, "progressive_hint");
    }
    
    // Main validation function for password answers
    validatePassword(userInput) {
        this.attempts.password++;
        
        if (!userInput || userInput.trim().length === 0) {
            return this.createResult(false, "Please enter the password.", "empty_input");
        }
        
        // Check for correct answer (case-insensitive)
        if (this.isCorrectPassword(userInput.trim())) {
            this.solved.password = true;
            this.logEvent("password_solved", { 
                attempts: this.attempts.password, 
                answer: userInput,
                time_taken: this.getElapsedTime()
            });
            
            // Check if both puzzles are solved
            if (this.solved.location && this.solved.password) {
                setTimeout(() => this.showVictory(), 1000);
            }
            
            return this.createResult(true, 
                "🔓 Access granted! Security system disarmed successfully.",
                "correct"
            );
        }
        
        // Check for easter eggs
        if (this.isEasterEgg("password", userInput.toLowerCase().trim())) {
            this.logEvent("easter_egg_found", { type: "password", input: userInput });
            return this.createResult(false,
                "🔍 Impressive deduction! But you need the actual decrypted password.",
                "easter_egg"
            );
        }
        
        // Security lockout warning
        if (this.attempts.password >= 5) {
            this.logEvent("security_warning", { attempts: this.attempts.password });
            return this.createResult(false,
                "⚠️ WARNING: Multiple failed attempts detected! GPU security protocol activated!",
                "security_warning"
            );
        }
        
        // Progressive hints
        const progressiveHint = this.getProgressivePasswordHint();
        this.logEvent("password_attempt", { 
            attempt: this.attempts.password, 
            answer: userInput,
            hint_given: progressiveHint
        });
        
        return this.createResult(false, `❌ ${progressiveHint}`, "progressive_hint");
    }
    
    // Helper functions
    normalizeInput(input) {
        return input.toLowerCase()
                   .trim()
                   .replace(/[^\w\s]/g, ' ')  // Replace special chars with spaces
                   .replace(/\s+/g, ' ')      // Collapse multiple spaces
                   .trim();
    }
    
    isCorrectLocation(normalized) {
        return this.correctAnswers.location.some(answer => 
            normalized === answer || 
            normalized.includes(answer) || 
            this.fuzzyMatch(normalized, answer)
        );
    }
    
    isCorrectPassword(input) {
        return this.correctAnswers.password.some(answer => 
            input === answer || input.toLowerCase() === answer.toLowerCase()
        );
    }
    
    isEasterEgg(type, normalized) {
        return this.easterEggs[type].some(egg => 
            normalized.includes(egg) || normalized === egg
        );
    }
    
    fuzzyMatch(input, target, threshold = 0.8) {
        // Simple fuzzy matching for typos
        const longer = input.length > target.length ? input : target;
        const shorter = input.length > target.length ? target : input;
        
        if (longer.length === 0) return true;
        
        const similarity = (longer.length - this.levenshteinDistance(input, target)) / longer.length;
        return similarity >= threshold;
    }
    
    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }
    
    getSpecificLocationHint(normalized) {
        for (const [mistake, hint] of Object.entries(this.commonMistakes.location)) {
            if (normalized.includes(mistake) || normalized === mistake) {
                return hint;
            }
        }
        return null;
    }
    
    getProgressiveLocationHint() {
        const hints = [
            "Check the evidence more carefully. What was found at the crime scene?",
            "Look at the demo area. Which PC shows unusual performance?",
            "Compare the AI training times. One PC is much faster than the others.",
            "Focus on PC #4. Why would it perform 6x better than identical hardware?",
            "The answer involves a numbered position in the demo area."
        ];
        
        const hintIndex = Math.min(this.attempts.location - 1, hints.length - 1);
        return hints[hintIndex];
    }
    
    getProgressivePasswordHint() {
        const hints = [
            "Look for any encrypted messages in the evidence.",
            "Check if there's a cipher or code hidden in the clues.",
            "The note with W.J.E.F.P might need decryption. Try letter shifting.",
            "Each letter might be shifted by one position. W→V, J→I, E→D...",
            "The decrypted password is a common 5-letter word related to digital content."
        ];
        
        const hintIndex = Math.min(this.attempts.password - 1, hints.length - 1);
        return hints[hintIndex];
    }
    
    createResult(isCorrect, message, resultType) {
        return {
            success: isCorrect,
            message: message,
            type: resultType,
            attempts: isCorrect ? 
                (resultType === "correct" ? this.attempts : null) : 
                this.attempts
        };
    }
    
    showVictory() {
        const totalTime = this.getElapsedTime();
        const totalAttempts = this.attempts.location + this.attempts.password;
        const rank = this.calculateRank(totalTime, totalAttempts);
        
        this.logEvent("game_completed", {
            total_time: totalTime,
            total_attempts: totalAttempts,
            rank: rank,
            location_attempts: this.attempts.location,
            password_attempts: this.attempts.password
        });
        
        console.log(`🎉 CASE SOLVED!`);
        console.log(`⏱️  Total Time: ${totalTime} minutes`);
        console.log(`🎯 Total Attempts: ${totalAttempts}`);
        console.log(`🏆 Your Rank: ${rank}`);
        console.log(`🔍 Location found in ${this.attempts.location} attempts`);
        console.log(`🔐 Password cracked in ${this.attempts.password} attempts`);
        
        // Show success message
        alert(`🎉 CONGRATULATIONS DETECTIVE! 🎉\n\n` +
              `You successfully solved the GPU mystery!\n\n` +
              `📊 Your Performance:\n` +
              `⏱️ Time: ${totalTime} minutes\n` +
              `🎯 Attempts: ${totalAttempts}\n` +
              `🏆 Rank: ${rank}\n\n` +
              `The GPU has been safely recovered and the case is closed!`);
    }
    
    calculateRank(timeMinutes, attempts) {
        if (timeMinutes <= 10 && attempts <= 4) return "🏆 Master Detective";
        if (timeMinutes <= 20 && attempts <= 8) return "🥈 Skilled Investigator";  
        if (timeMinutes <= 30 && attempts <= 12) return "🥉 Junior Detective";
        return "🔄 Trainee Detective";
    }
    
    getElapsedTime() {
        return Math.round((Date.now() - this.gameStartTime) / 1000 / 60 * 10) / 10;
    }
    
    // Analytics and logging
    logEvent(eventType, data = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            event: eventType,
            elapsed_time: this.getElapsedTime(),
            ...data
        };
        
        console.log(`📊 Analytics: ${eventType}`, logEntry);
        
        // Store in localStorage for persistence
        try {
            const logs = JSON.parse(localStorage.getItem('gpu_mystery_logs') || '[]');
            logs.push(logEntry);
            
            // Keep only last 100 entries
            if (logs.length > 100) {
                logs.splice(0, logs.length - 100);
            }
            
            localStorage.setItem('gpu_mystery_logs', JSON.stringify(logs));
        } catch (e) {
            console.log("📊 Analytics storage not available");
        }
    }
    
    // Public methods for external use
    getGameStats() {
        return {
            attempts: this.attempts,
            solved: this.solved,
            elapsedTime: this.getElapsedTime(),
            gameStartTime: this.gameStartTime
        };
    }
    
    resetGame() {
        this.gameStartTime = Date.now();
        this.attempts = { location: 0, password: 0 };
        this.solved = { location: false, password: false };
        
        this.logEvent("game_reset");
        console.log("🔄 Game reset - New investigation started!");
    }
    
    // Debug mode for testing
    enableDebugMode() {
        console.log("🔧 Debug Mode Activated");
        console.log("📍 Location Answer: '4th PC' or 'PC #4'");
        console.log("🔐 Password Answer: 'VIDEO'");
        console.log("💡 All accepted variations logged below:");
        console.log("📍 Location variations:", this.correctAnswers.location);
        console.log("🔐 Password variations:", this.correctAnswers.password);
    }
}

// Global game instance
let mysteryGame;

// Public functions for use in HTML/testing
function initializeGame() {
    mysteryGame = new GPUMysteryGame();
    
    // Enable debug mode in development
    if (window.location.search.includes('debug=true') || 
        window.location.hostname === 'localhost') {
        mysteryGame.enableDebugMode();
    }
}

function checkLocation(userInput = null) {
    if (!mysteryGame) initializeGame();
    
    // Get input from parameter or prompt
    const input = userInput || prompt("Where is the GPU hidden?");
    
    if (input === null) return; // User cancelled
    
    const result = mysteryGame.validateLocation(input);
    
    console.log(`🔍 Location Check: ${result.message}`);
    if (result.success) {
        console.log("✅ Location found! Now find the password to complete the case.");
    }
    
    return result;
}

function checkPassword(userInput = null) {
    if (!mysteryGame) initializeGame();
    
    // Get input from parameter or prompt
    const input = userInput || prompt("Enter the access password:");
    
    if (input === null) return; // User cancelled
    
    const result = mysteryGame.validatePassword(input);
    
    console.log(`🔐 Password Check: ${result.message}`);
    
    return result;
}

function getGameStats() {
    if (!mysteryGame) initializeGame();
    return mysteryGame.getGameStats();
}

function resetGame() {
    if (!mysteryGame) initializeGame();
    mysteryGame.resetGame();
}

// Auto-initialize when script loads
document.addEventListener('DOMContentLoaded', initializeGame);

// Also initialize immediately for compatibility
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGame);
} else {
    initializeGame();
}

// Export for testing/external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        GPUMysteryGame, 
        checkLocation, 
        checkPassword, 
        getGameStats, 
        resetGame 
    };
}

console.log("🎮 GPU Mystery Game Scripts Loaded");
console.log("💡 Use checkLocation('your answer') and checkPassword('your answer') to test solutions");
console.log("📊 Use getGameStats() to see your progress");

