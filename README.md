# 🌍 World Clock - Multiple Time Zones

A real-time digital clock application that displays the current time in multiple time zones simultaneously.

## Features

✨ **Core Features:**
- Real-time clock updates (every second)
- Display time in multiple time zones
- Shows local time, UTC, and major world cities by default
- UTC offset for each timezone
- Clean, modern dark UI
- Responsive design (works on mobile, tablet, desktop)

🎛️ **Customization:**
- Add custom time zones from a searchable list
- Remove unwanted time zones
- Reset to default time zones
- Auto-save preferences to browser storage

🌐 **Supported Time Zones:**
- UTC
- Americas: New York, Chicago, Denver, Los Angeles, Toronto, Mexico City, Buenos Aires, São Paulo
- Europe: London, Paris, Berlin, Moscow
- Asia: Dubai, Kolkata, Bangkok, Shanghai, Tokyo, Seoul, Singapore, Hong Kong, Jakarta, Manila
- Africa: Cairo, Johannesburg
- Oceania: Sydney, Auckland

## How to Use

### Quick Start
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Clocks will start updating automatically

### Adding Time Zones
1. Click the **"+ Add Time Zone"** button
2. Search for your desired timezone
3. Click on it to add it to the display

### Removing Time Zones
1. Click the **✕** button on any clock card to remove it

### Reset
1. Click the **"Reset"** button to restore default time zones

## Technical Stack

- **HTML5** - Structure
- **CSS3** - Styling with gradients and animations
- **Vanilla JavaScript** - No dependencies
- **Intl API** - For timezone formatting
- **localStorage** - For persisting user preferences

## File Structure

```
.
├── index.html       # HTML structure
├─��� style.css        # Styling and animations
├── script.js        # Clock logic and interactivity
├── package.json     # Project metadata
└── README.md        # This file
```

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- iOS Safari: ✅ Full support
- Android Chrome: ✅ Full support

## Features Explained

### Real-Time Updates
The clock updates every 1000ms (1 second) using JavaScript's `setInterval()` function. Each timezone is formatted using the `Intl.DateTimeFormat` API which respects browser and system locale settings.

### UTC Offset Calculation
The offset is calculated by comparing the UTC time with the timezone-specific time, giving you a quick reference for how far ahead or behind UTC each timezone is.

### Persistent Storage
Your selected timezones are automatically saved to the browser's `localStorage`. When you return to the page, your previous selections are restored.

### Timezone Search
The modal search filters through all 26+ supported timezones in real-time, making it easy to find your desired timezone.

## Customization

### Change Default Timezones
Edit the `DEFAULT_TIMEZONES` array in `script.js`:

```javascript
const DEFAULT_TIMEZONES = [
  { timezone: 'UTC', label: 'UTC' },
  { timezone: 'Your/Timezone', label: 'Your Label' },
  // Add more...
];
```

### Add More Time Zones
Add to the `ALL_TIMEZONES` array in `script.js`:

```javascript
const ALL_TIMEZONES = [
  'Your/New/Timezone',
  // ...
];
```

### Customize Colors
Edit CSS variables in `style.css`:

```css
:root {
  --primary: #3b82f6;      /* Blue accent */
  --bg: #0f172a;           /* Dark background */
  --text: #e2e8f0;         /* Light text */
  /* ... more variables */
}
```

## Performance

- Lightweight (no external dependencies)
- Efficient updates using single `setInterval`
- Minimal DOM manipulation
- Smooth CSS transitions and animations

## License

MIT - Feel free to use and modify

## Author

Created with ❤️ for timezone tracking
