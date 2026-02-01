// ===== STATE TRACKING =====
// These variables keep track of what the user has done
let noClickCount = 0; // Counts how many times they clicked "No"
let alreadySaidYes = false; // Checks if they already said Yes
let moveInterval = null; // Stores the continuous movement interval
let annoyedGifs = [
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTVzc2ozdXc2eDVnbXU5eHNzdGY5dmFlMWd3d2VjOXhwMGRrcHJuaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Wwn5NKv4At2CIc8XQa/giphy.gif',
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTZjcWdtb3M3NDI2NmV5YXBvYWNtdGNxbndieHJ6bWZoeTlzOTAydCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H5C8CevNMbpBqNqFjl/giphy.gif',
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTRlYWdtZmsxdnl2aTQzMGVpYjF3cDN6MDdvZmhweDBhcWI0bG45cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/10uQlPcgpmDrTW/giphy.gif',
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmg3ZXEyOXR2ZHNkdzRpYXoyYXF2a2RqYWpxdXJqaWZrNTg4ZW9iMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wr7oA0rSjnWuiLJOY5/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExemRtcXA4cGxvZ2NtZ3BoeTdmcGR4cHl1ZDZtbGJsaTFkbjE3NmdiMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/yyq0WXMv720OcpZvmA/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExemRtcXA4cGxvZ2NtZ3BoeTdmcGR4cHl1ZDZtbGJsaTFkbjE3NmdiMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/yialCX0MqjLgAgoifw/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExemRtcXA4cGxvZ2NtZ3BoeTdmcGR4cHl1ZDZtbGJsaTFkbjE3NmdiMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/FvKKZHr9dut8Pib9Xn/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExemRtcXA4cGxvZ2NtZ3BoeTdmcGR4cHl1ZDZtbGJsaTFkbjE3NmdiMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mEH2SqVPj257XTEKss/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExemRtcXA4cGxvZ2NtZ3BoeTdmcGR4cHl1ZDZtbGJsaTFkbjE3NmdiMyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/AAsj7jdrHjtp6/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ejE3d2ZsN2ozcXZzd3piMTgxY3RtMG85cGF0Y2ZncGN1ODd0ZGJ2biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kopN26K2ThF9j7RL4K/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ejE3d2ZsN2ozcXZzd3piMTgxY3RtMG85cGF0Y2ZncGN1ODd0ZGJ2biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/hECJDGJs4hQjjWLqRV/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ejE3d2ZsN2ozcXZzd3piMTgxY3RtMG85cGF0Y2ZncGN1ODd0ZGJ2biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/r7mBun5sXQUJl59IVw/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ejE3d2ZsN2ozcXZzd3piMTgxY3RtMG85cGF0Y2ZncGN1ODd0ZGJ2biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qdqxysIbFi6zHijLjp/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MGp2a3ZvZW83dGpkZjRmNXBneHRxcnE5dDN4OGh2NHN2bWwxY240MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OHRF8LZis06OiPDJby/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MGp2a3ZvZW83dGpkZjRmNXBneHRxcnE5dDN4OGh2NHN2bWwxY240MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/CumzjGEnkK01Fnr3wm/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aDI1OWZybWRmMDdpbjB6YXBzaWVlMHZyM3J6YTBicHh5ZDB2NDJ0ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YYCAPVKo73l1mRwtCz/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZWNmMGpzdXM5Y2ZiZ2ZkYXMxYmRsM2NkbHAycjZidHVvNGZ6c2VhZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/bcqAMUTUHoLDy/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZnB0djZmejY2bmZsN3M4d3N3aTR5c2NwbXFjY2s1dDluN2tkODZxNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/zZbf6UpZslp3nvFjIR/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MHpzaXh4dnowZ3FvMTNhcTVia2wydmVnd3ZpZWtpMTZ6Y3Y0aXpwZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PvSGE5EgKD3jlsPwgx/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NWQ0MWppMTVzc200dmk5N2xnOW15MmU1MzJ1bTU3OTVuYmcwOXJldCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WRgsiNC2GCn21l4gtV/giphy.gif'
];
let remainingGifs = [...annoyedGifs]; // Track which gifs haven't been shown yet
let currentGifIndex = 0; // Track position in current cycle

// ===== GET ELEMENTS =====
// These grab the HTML elements so we can interact with them
const welcomePage = document.getElementById('welcomePage');
const questionPage = document.getElementById('questionPage');
const continueBtn = document.getElementById('continueBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainQuestion = document.getElementById('mainQuestion');
const questionGif = document.getElementById('questionGif');
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const annoyedGifBox = document.getElementById('annoyedGifBox');
const annoyedMediaContainer = document.getElementById('annoyedMediaContainer');
const celebrationBox = document.getElementById('celebrationBox');
const mediaContainer = document.getElementById('mediaContainer');
const kissingGifBox = document.getElementById('kissingGifBox');
const kissingMediaContainer = document.getElementById('kissingMediaContainer');
const finalGifBox = document.getElementById('finalGifBox');
const finalMediaContainer = document.getElementById('finalMediaContainer');

// ===== RESPONSE MESSAGES POOL =====
// Pool of 6 different messages that will be randomly selected
const responseMessages = [
    "Are you sure? 🥺",
    "Come on... 😢",
    "Stop being mean, you're just hurting my feelings... 💔",
    "Please? I promise to make you smile every day! 😭",
    "You're breaking my heart! 💔",
    "Just say yes already! 🙏"
];

// ===== EVENT LISTENERS =====
// When user clicks Continue button (on welcome page)
continueBtn.addEventListener('click', handleContinue);

// When user clicks Yes button
yesBtn.addEventListener('click', handleYesClick);

// When user clicks No button
noBtn.addEventListener('click', handleNoClick);

// ===== CONTINUE BUTTON HANDLER =====
// This function runs when they click Continue on the welcome page
function handleContinue() {
    // Hide the welcome page
    welcomePage.classList.add('hidden');
    
    // Show the question page
    questionPage.classList.remove('hidden');
}

// ===== YES BUTTON HANDLER =====
// This function runs when they click "Yes"
function handleYesClick() {
    alreadySaidYes = true;
    
    // Stop the continuous movement of the No button
    if (moveInterval) {
        clearInterval(moveInterval);
    }
    
    // Hide the buttons, question, and question gif
    mainQuestion.classList.add('hidden');
    questionGif.classList.add('hidden');
    document.querySelector('.button-container').classList.add('hidden');
    messageBox.classList.add('hidden');
    
    // Show the celebration section with message
    celebrationBox.classList.remove('hidden');
    
    // Load the kissing gif right away
    loadKissingGif();
}

// ===== NO BUTTON HANDLER =====
// This function runs when they click "No"
function handleNoClick() {
    noClickCount++; // Increase the count
    
    // Pick a random message from the pool
    const randomMessage = responseMessages[Math.floor(Math.random() * responseMessages.length)];
    showMessage(randomMessage);
    
    // Show the annoyed gif
    showAnnoyedGif();
    
    // Move the button immediately
    moveNoButton();
    
    // If not already moving continuously, start the movement
    if (!moveInterval) {
        startContinuousMovement();
    }
}

// ===== START CONTINUOUS MOVEMENT =====
// This function makes the No button keep moving continuously
function startContinuousMovement() {
    // Move the button every 750 milliseconds (0.75 seconds)
    moveInterval = setInterval(() => {
        moveNoButton();
    }, 750);
}

// ===== SHOW MESSAGE =====
// This function displays a message to the user
function showMessage(text) {
    messageText.textContent = text;
    messageBox.classList.remove('hidden');
}

// ===== SHOW ANNOYED GIF =====
// This function shows an annoyed/side eye gif when No is clicked
// Each gif is shown only once, then randomly after all have been cycled through
function showAnnoyedGif() {
    // If all gifs have been shown, shuffle and restart
    if (remainingGifs.length === 0) {
        remainingGifs = [...annoyedGifs];
        // Shuffle the array for random order on next cycle
        for (let i = remainingGifs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [remainingGifs[i], remainingGifs[j]] = [remainingGifs[j], remainingGifs[i]];
        }
    }
    
    // Get the next unique gif
    const nextGif = remainingGifs.shift();
    
    // Create an img element
    const img = document.createElement('img');
    img.src = nextGif;
    img.alt = 'Annoyed';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    
    // Clear and add the annoyed gif
    annoyedMediaContainer.innerHTML = '';
    annoyedMediaContainer.appendChild(img);
    
    // Hide the question gif temporarily
    questionGif.classList.add('hidden');
    
    // Show the annoyed gif box
    annoyedGifBox.classList.remove('hidden');
    
    // Hide the annoyed gif and show question gif again after 4.2 seconds
    setTimeout(() => {
        annoyedGifBox.classList.add('hidden');
        questionGif.classList.remove('hidden');
    }, 4200);
}

// ===== MOVE NO BUTTON =====
// This function makes the No button move to a random position
function moveNoButton() {
    // Get the button's current size
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;
    
    // Generate random position, making sure button stays visible
    const maxX = window.innerWidth - buttonWidth - 10;
    const maxY = window.innerHeight - buttonHeight - 10;
    
    const randomX = Math.max(10, Math.random() * maxX);
    const randomY = Math.max(10, Math.random() * maxY);
    
    // Apply the new position to the button
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.5s ease'; // Smooth movement
}

// ===== LOAD CELEBRATION GIF =====
// This function loads a gif when they say Yes
function loadCelebrationGif() {
    // Your celebration gif URL - the man gif
    const gifUrl = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGQ0cHFidGlmN2Y5ajBwbzd5Mm1vYTA2NnQyMDZrbDhtZ3Fzdmx3MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XLsl77TQAAPXkRGfMb/giphy.gif';
    
    // Create an img element and add it to the page
    const img = document.createElement('img');
    img.src = gifUrl;
    img.alt = 'Celebration';
    
    // Clear any previous content and add the new gif
    mediaContainer.innerHTML = '';
    mediaContainer.appendChild(img);
}

// ===== LOAD KISSING GIF =====
// This function loads the kissing gif right after Yes is clicked
function loadKissingGif() {
    // Your kissing gif URL
    const kissingGifUrl = 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmF1YTVrNWsydHlxaWo1cWVybGRkZGJqZThuOXdpNnFza2RuNDNwYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ANjMpBvC9LeRUopsoU/giphy.gif';
    
    // Create an img element and add it to the page
    const img = document.createElement('img');
    img.src = kissingGifUrl;
    img.alt = 'Kissing';
    
    // Clear any previous content and add the kissing gif
    kissingMediaContainer.innerHTML = '';
    kissingMediaContainer.appendChild(img);
    
    // Show the kissing gif box
    kissingGifBox.classList.remove('hidden');
    
    // Hide kissing gif and load final gif after 4 seconds
    setTimeout(() => {
        kissingGifBox.classList.add('hidden');
        loadFinalGif();
    }, 4000);
}

// ===== LOAD FINAL GIF =====
// This function loads the final gif at the very end
function loadFinalGif() {
    // Your final gif URL
    const finalGifUrl = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2JzeXBxZ2dwMWh3N2l6ZWd4NHkxOXRrdnZzZm45YWNrM3VycnFvbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XLsl77TQAAPXkRGfMb/giphy.gif';
    
    // Create an img element and add it to the page
    const img = document.createElement('img');
    img.src = finalGifUrl;
    img.alt = 'Final Celebration';
    
    // Clear any previous content and add the final gif
    finalMediaContainer.innerHTML = '';
    finalMediaContainer.appendChild(img);
    
    // Show the final gif box
    finalGifBox.classList.remove('hidden');
}

// ===== EXPLANATION FOR YOU =====
/*
HOW THIS WORKS:

1. VARIABLES (at the top):
   - We use variables to remember information
   - noClickCount keeps track of how many times they click No
   - alreadySaidYes remembers if they've already said Yes

2. EVENT LISTENERS:
   - These "listen" for when the user clicks a button
   - When clicked, they run a function (like handleYesClick)

3. FUNCTIONS:
   - handleYesClick: Runs when they click Yes
     * It hides the buttons and shows the celebration
     * Loads a gif to celebrate
   
   - handleNoClick: Runs when they click No
     * Counts how many times they clicked No
     * Shows a different message each time
     * Moves the button away from them
   
   - moveNoButton: Makes the No button run away
     * Generates random X and Y positions
     * Uses 'position: fixed' to move it anywhere on screen
     * Uses CSS transition for smooth animation
   
   - loadCelebrationGif: Loads a gif when they say Yes
     * Creates an <img> element
     * Sets the source to a gif URL
     * Adds it to the mediaContainer

4. KEY CONCEPT - classList:
   - classList.add('hidden') - HIDES an element
   - classList.remove('hidden') - SHOWS an element
   - The 'hidden' class is defined in CSS (display: none)

NEXT STEPS:
- Find a gif you want to use for celebration
- Replace the gifUrl with your own gif
- You can use a local file or an online URL
*/
