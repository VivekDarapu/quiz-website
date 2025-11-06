# Quiz Website - What Personality Type Are You?
An interactive personality quiz website built with vanilla HTML, CSS, and JavaScript. This project is inspired by popular quiz formats and provides a fun, engaging user experience.

## Description

Interactive personality quiz website that helps users discover their personality type. Users answer a series of multiple-choice questions to find out if they're a Leader, Explorer, Architect, or Dreamer based on their energy and planning style.
## Features

- Single-page interactive quiz interface
- Multiple-choice questions with visual feedback
- Dynamic scoring system mapping to different personality results
- Result screen with images, descriptions, and social sharing
- Mobile responsive design
- Accessible with proper ARIA attributes
- Clean, modern UI with smooth transitions

## File Structure

```
quiz-website/
├── index.html      # Main HTML structure
├── style.css       # Styling and responsive design
├── script.js       # Quiz logic and interactivity
└── README.md       # This file
```

## How It Works

1. **Start Screen**: Users are greeted with a welcome message and start button
2. **Quiz Questions**: Users progress through a series of questions, selecting their preferred answers
3. **Navigation**: Previous/Next buttons allow users to move through questions
4. **Result Calculation**: Answers are scored and mapped to personality types
5. **Result Display**: Shows the user's result with image, description, and social sharing options
6. **Retake**: Users can retake the quiz to get a different result

## Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox/grid layouts and media queries
- **JavaScript (ES6+)**: Vanilla JS for quiz logic and DOM manipulation
- **No Dependencies**: Pure client-side application with no external libraries

## Deployment Options

### GitHub Pages

1. Go to repository Settings
2. Navigate to Pages section
3. Select 'main' branch as source
4. Save and wait for deployment
5. Access at: `https://username.github.io/quiz-website/`

### Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings (not required for static site)
3. Deploy automatically on push to main branch

### Vercel

1. Import repository to Vercel
2. Configure project settings
3. Deploy with automatic SSL and CDN

## Customization

To customize the quiz content:

1. **Questions**: Edit the `QUESTIONS` array in `script.js`
2. **Results**: Modify the `RESULTS` array in `script.js`
3. **Styling**: Update colors and layout in `style.css`
4. **Images**: Replace image URLs in the `RESULTS` array (use Unsplash, Pexels, or your own)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Future Enhancements

- Add more questions and result types
- Implement result sharing with custom images
- Add animations and transitions
- Save results to local storage
- Add analytics tracking
- Create multiple quiz themes
- Add accessibility improvements

## License

This project is open source and available for educational and personal use.

## Credits

Built following modern web development best practices. Images sourced from Unsplash.

---

**Ready to deploy!** Follow the deployment steps above to publish your quiz website.
