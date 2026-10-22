# To-Do List Life Dashboard - Project Steering

This document provides guidance for understanding and working with the To-Do List Life Dashboard project.

## Project Overview

**Name**: To-Do List Life Dashboard  
**Course**: Software Engineering CodingCamp  
**Batch**: August 24, 2026  
**Type**: Vanilla JavaScript Web Application  
**Deployment**: GitHub Pages  

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Browser Local Storage API
- **Build**: None (static files)
- **Deployment**: GitHub Pages
- **Version Control**: Git

## Architecture

### File Structure
```
To-Do List Life Dashboard/
├── index.html              # Main HTML structure
├── css/
│   └── style.css          # Responsive styling (single file)
├── js/
│   └── script.js          # All functionality (single file)
├── README.md              # Project documentation
├── .gitignore             # Git configuration
└── .kiro/                 # Kiro IDE configuration
    ├── steering.md        # This file
    └── settings.json      # Kiro settings
```

### Code Organization

#### HTML (index.html)
- Semantic HTML5 structure
- Organized into logical sections
- Proper form inputs with IDs
- Modal dialogs for editing
- ~90 lines of clean markup

#### CSS (css/style.css)
- Single comprehensive file (~400 lines)
- CSS custom properties for theming
- Responsive design with media queries
- Support for light and dark modes
- Flexbox and CSS Grid layouts

#### JavaScript (js/script.js)
- Single file containing all functionality (~500 lines)
- Organized into logical sections with comments
- State management object
- Event-driven architecture
- Local Storage integration

## Features

### Core Features (4)
1. Greeting and Clock - Live time display with dynamic greetings
2. Focus Timer - 25-minute Pomodoro with custom duration
3. To-Do List - Full CRUD operations with validation
4. Quick Links - Save and manage website shortcuts

### Challenges (3)
1. Light/Dark Mode - Theme toggle with persistence
2. Custom Name - Personalized greeting
3. Duplicate Prevention - Case-insensitive task validation

### Data Persistence (4)
- Tasks (dashboard_tasks)
- Links (dashboard_links)
- User Name (dashboard_user_name)
- Theme (dashboard_theme)

## Development Guidelines

### Code Style
- Use clear, descriptive variable names
- Add comments for complex logic
- Organize code into logical sections
- Keep functions focused and single-responsibility
- Use const/let (no var)
- Use arrow functions where appropriate

### HTML Guidelines
- Use semantic elements (section, article, nav, etc.)
- Proper heading hierarchy (h1, h2, h3)
- Descriptive IDs and classes
- Accessibility attributes (labels, alt text)
- No inline event handlers

### CSS Guidelines
- Use CSS custom properties for colors
- Mobile-first responsive design
- Use Flexbox and Grid for layouts
- No CSS frameworks
- Group related styles with comments
- Use meaningful class names

### JavaScript Guidelines
- No external frameworks or libraries
- Vanilla JavaScript only
- Pure functions where possible
- State management with object
- Event delegation for dynamic elements
- Error handling for edge cases

## Local Storage Keys

All data is stored in browser Local Storage with these keys:

```javascript
dashboard_tasks       // Array of task objects
dashboard_links       // Array of link objects
dashboard_user_name   // String (user's name)
dashboard_theme       // String ("light" or "dark")
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Requires:
- Local Storage support
- ES6+ JavaScript support
- CSS Grid support
- CSS Flexbox support

## Responsive Design

### Breakpoints
- **Desktop**: 1200px and above (two-column layout)
- **Tablet**: 769px - 1199px (adjusted layout)
- **Mobile**: Below 768px (single column)

### Responsive Components
- Grid layout changes at breakpoints
- Input fields full-width on mobile
- Buttons stack vertically on mobile
- Typography scales appropriately
- Images and content adapt

## Performance Considerations

- **Bundle Size**: ~10KB total
- **Load Time**: <1 second
- **No Dependencies**: Pure vanilla JavaScript
- **Efficient DOM Updates**: Minimal re-renders
- **Local Storage**: Fast client-side operations

## Security

### XSS Prevention
- HTML escaping for user input
- No innerHTML with user data
- Proper text node handling

### URL Validation
- Validates link URLs before saving
- Uses URL constructor for validation
- Safe link attributes (rel="noopener noreferrer")

### Input Validation
- All form inputs validated
- Type checking
- Range validation for numbers
- Empty string prevention

## Testing

### Manual Testing Areas
1. Clock updates every second
2. Timer starts, pauses, resumes, resets
3. Tasks CRUD operations
4. Quick links management
5. Custom name in greeting
6. Theme toggle persistence
7. Duplicate task prevention
8. Data persists after refresh
9. Responsive on all devices
10. No console errors

### Browser Testing
- Test on Chrome, Firefox, Safari, Edge
- Test on desktop, tablet, mobile
- Test light and dark modes
- Test with DevTools open

## Deployment

### GitHub Pages
1. Create GitHub repository
2. Enable GitHub Pages in Settings
3. Select main branch
4. URL: `https://username.github.io/repo-name`

### Static Files Only
- No build process required
- No server-side processing
- All files are static
- Relative paths for assets

## Maintenance

### Future Enhancements
- Sound notifications for timer
- Task categories or tags
- Export/import data
- More timer durations
- Task priority levels
- Recurring tasks

### Bug Fixes
- Use issue tracker
- Test before deployment
- Maintain backward compatibility
- Update documentation

## Learning Resources

### HTML5
- Semantic elements
- Form controls
- Accessibility attributes

### CSS3
- CSS Grid and Flexbox
- CSS custom properties
- Media queries
- Animations and transitions

### Vanilla JavaScript
- Event handling
- DOM manipulation
- Local Storage API
- Date/Time APIs
- State management

## Project Status

**Status**: Complete and Production-Ready  
**Last Updated**: October 22, 2026  
**Version**: 1.0  

### Completeness
- ✅ All MVP features implemented
- ✅ All optional challenges implemented
- ✅ Responsive design working
- ✅ Cross-browser compatible
- ✅ Documentation complete
- ✅ Ready for GitHub Pages deployment

## Contact & Support

For questions about the project:
1. Review the README.md file
2. Check the code comments
3. Review the HTML/CSS/JavaScript files
4. Test in browser console (F12)

## License

This project is created for educational purposes as part of the Software Engineering CodingCamp course.
