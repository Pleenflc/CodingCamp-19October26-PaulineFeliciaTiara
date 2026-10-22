# To-Do List Life Dashboard

A modern, responsive productivity dashboard for managing tasks, time, and quick links. Built with vanilla HTML, CSS, and JavaScript.

## Features

### Core Features
- **Greeting and Clock**: Live time and date display with time-based greetings (Good Morning, Afternoon, Evening, Night)
- **Focus Timer**: 25-minute Pomodoro timer with Start, Pause, and Reset controls
- **To-Do List**: Full task management with add, edit, complete, and delete functionality
- **Quick Links**: Save favorite website shortcuts for easy access

### Optional Challenges (Implemented)
1. **Light/Dark Mode**: Toggle between light and dark themes with persistent storage
2. **Custom Name in Greeting**: Personalize your dashboard with a custom name in the greeting
3. **Duplicate Task Prevention**: Prevents adding tasks with the same text (case-insensitive)

### Data Persistence
- All data is saved to browser Local Storage
- Tasks, links, custom name, and theme preference persist after page refresh
- No backend or database required

## Project Structure

```
To-Do List Life Dashboard/
├── index.html           # Main HTML file
├── css/
│   └── style.css        # Styling (single file)
├── js/
│   └── script.js        # All JavaScript functionality
├── README.md            # This file
└── .gitignore           # Git ignore file
```

## Getting Started

### Running Locally
1. Clone the repository or download the files
2. Open `index.html` directly in your web browser
3. No server or installation required

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Usage

### Adding Tasks
1. Type your task in the input field
2. Click "Add" or press Enter
3. Tasks are automatically saved to Local Storage

### Timer Usage
1. Click "Start" to begin the 25-minute timer
2. Click "Pause" to pause the timer (time is preserved)
3. Click "Reset" to return to 25:00
4. Timer completion shows an alert notification

### Quick Links
1. Enter a link name and URL
2. Click "Add Link"
3. Click any link to open it in a new tab
4. Click the × button to remove a link

### Personalization
1. Click "Edit Name" in the greeting card
2. Enter your name
3. Your custom greeting will update immediately

### Theme Toggle
- Click the moon/sun button in the bottom-right corner
- Theme preference is saved automatically

## Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Responsive design with CSS Grid and Flexbox
- **Vanilla JavaScript**: No frameworks or libraries
- **Local Storage API**: Client-side data persistence

## Features Implemented

✅ Live clock and dynamic greeting  
✅ 25-minute Pomodoro timer  
✅ Full task CRUD operations  
✅ Quick link management  
✅ Local Storage persistence  
✅ Light/Dark mode toggle  
✅ Custom user name  
✅ Duplicate task prevention  
✅ Responsive design (desktop, tablet, mobile)  
✅ Accessible and semantic HTML  
✅ Clean, modern UI with purple gradient background  

## Local Storage Keys

- `dashboard_tasks`: Task list
- `dashboard_links`: Quick links
- `dashboard_user_name`: Custom user name
- `dashboard_theme`: Theme preference (light/dark)

## Responsive Design

The dashboard is fully responsive and adapts to:
- Desktop (1200px+)
- Tablet (769px - 1199px)
- Mobile (up to 768px)

All features are fully functional on all screen sizes.

Built with care for beginner web developers learning HTML, CSS, and Vanilla JavaScript.
