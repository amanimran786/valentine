# 💕 Valentine's Day Interactive Website

A sweet, interactive website to ask someone to be your Valentine! The site features a "Yes" button that stays still and a "No" button that playfully moves away from clicks.

## Features

✨ **Interactive Buttons**
- **Yes Button**: Stays still and bold - leads to celebration
- **No Button**: Slowly moves away when clicked (but still catchable!)
- Progressive messages based on user interactions

📱 **Fully Mobile Responsive**
- Works on all screen sizes (phones, tablets, desktops)
- Compatible with all browsers on Android, iPhone, and desktop
- Optimized for browsers used in Pakistan (UC Browser, Opera Mini, Chrome, etc.)

🎉 **Celebration Screen**
- Shows a fun gif/video when "Yes" is selected
- Beautiful gradient background and smooth animations

## File Structure

```
├── index.html      # The HTML structure (skeleton of the page)
├── style.css       # The styling (colors, layout, animations)
├── script.js       # The interactive logic (button clicks, animations)
└── README.md       # This file
```

## How to Use Locally

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Test the buttons and interactions!

## Customization Guide

### Change the Celebration Gif
In `script.js`, find this line:
```javascript
const gifUrl = 'https://media.giphy.com/media/g9GUusdUZsKFO/giphy.gif';
```
Replace the URL with your own gif or video URL.

### Change Colors
In `style.css`, look for color values like `#ff6b9d`. You can:
- Change the hex color codes to your preferred colors
- Update the gradient in the `body` background

### Change Text
In `index.html`, modify:
- The `<h1>` tag for the main question
- Button text (inside the `<button>` tags)
- Messages in `script.js` functions

### Adjust Button Speed
In `script.js`, in the `moveNoButton()` function, change:
```javascript
style.transition = 'all 0.5s ease'; // Change 0.5s to make it faster/slower
```

## Deploying to GitHub Pages

1. Push this project to a GitHub repository
2. Go to repository Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and click Save
5. Your site will be live at: `https://yourusername.github.io/repository-name`

## Browser Compatibility

✅ Chrome, Firefox, Safari, Edge
✅ UC Browser (Pakistan Android browsers)
✅ Opera Mini
✅ All modern mobile browsers

## Tips

- Test on mobile before sharing the link!
- Use a gif that makes you smile
- The "No" button moves smoothly - it's fun to catch it!

---

Made with 💕 for someone special!
