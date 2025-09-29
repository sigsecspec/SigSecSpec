# SigSecSpec - Operations Status Portal

A modern, responsive web application for displaying company operations status, app development progress, and important updates. Built with vanilla HTML, CSS, and JavaScript for optimal performance and compatibility.

## 🛡️ Features

- **Real-time Operations Status**: Track licenses, insurance, certifications, and permits
- **App Development Progress**: Monitor test, beta, and release versions
- **Important Updates**: Company announcements with filtering and pagination
- **Modern UI**: Black, white, grey, and emerald green color scheme
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Interactive Elements**: Particle system and floating animations
- **Admin Guide**: Built-in documentation for content management

## 🚀 Live Demo

This project is designed to run on GitHub Pages. Once deployed, your site will be available at:
`https://yourusername.github.io/SigSecSpec`

## 📁 Project Structure

```
SigSecSpec/
├── index.html              # Main operations status page
├── admin.html              # Admin guide and documentation
├── public/
│   ├── app.js              # Main application logic
│   ├── styles.css          # Styling and responsive design
│   ├── particles.js        # Interactive particle system
│   └── floating-elements.js # Floating background animations
├── README.md               # This file
├── .gitignore             # Git ignore rules
└── 404.html               # Custom error page
```

## 🎨 Design System

The application uses a consistent color scheme:
- **Primary**: Emerald Green (#10b981)
- **Background**: Dark gradient with black, white, and grey tones
- **Text**: High contrast white text on dark backgrounds
- **Accents**: Subtle emerald green glows and highlights

## 📱 Content Management

All content is managed through the JavaScript file `public/app.js`. The admin guide (`admin.html`) provides detailed instructions for:

- Updating app status information
- Managing operations data (licenses, insurance, etc.)
- Adding important company updates
- Managing app download links

## 🛠️ Setup Instructions

### For GitHub Pages Deployment:

1. **Create a new repository** on GitHub named `SigSecSpec`
2. **Upload all files** using the GitHub web interface:
   - Upload `index.html` to the root
   - Upload `admin.html` to the root
   - Upload the entire `public/` folder
   - Upload `README.md`, `.gitignore`, and `404.html`
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
4. **Access your site** at `https://yourusername.github.io/SigSecSpec`

### For Local Development:

1. Clone or download the repository
2. Open `index.html` in a web browser
3. For live editing, use a local server (optional):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

## 🔧 Customization

### Updating Content

1. **App Status**: Edit the `loadAppStatus()` function in `public/app.js`
2. **Operations Data**: Edit the `loadOperationsStatus()` function
3. **Updates**: Edit the `loadUpdates()` function
4. **App Links**: Edit the `loadAppLinks()` function

### Styling

- Main styles are in `public/styles.css`
- CSS custom properties (variables) are defined in `:root`
- Responsive breakpoints: 768px and 480px

### Adding Features

- All JavaScript is in `public/app.js`
- Particle system is in `public/particles.js`
- Floating elements are in `public/floating-elements.js`

## 📋 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🔒 Security

- No external dependencies
- No server-side code
- All data is client-side only
- XSS protection through proper HTML escaping

## 📄 License

© 2024 SigSec. All rights reserved.

## 🆘 Support

For technical support or questions:
1. Check the admin guide at `/admin.html`
2. Review the JavaScript console for errors
3. Validate your JSON syntax when editing content
4. Contact the development team

---

**Note**: This is a static website designed for GitHub Pages. All content updates are done by editing the JavaScript files directly.
