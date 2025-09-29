# GitHub Pages Deployment Guide

This guide will walk you through deploying your SigSecSpec Operations Portal to GitHub Pages.

## 🚀 Quick Start

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** button in the top right corner
3. Select **"New repository"**
4. Name your repository: `SigSecSpec`
5. Make it **Public** (required for free GitHub Pages)
6. **Do NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

### Step 2: Upload Files

Since you prefer using the GitHub web interface [[memory:8711121]], here's how to upload your files:

#### Option A: Upload Individual Files
1. In your new repository, click **"uploading an existing file"**
2. Drag and drop or select these files one by one:
   - `index.html`
   - `admin.html`
   - `404.html`
   - `README.md`
   - `.gitignore`
   - `DEPLOYMENT.md`

#### Option B: Upload the Public Folder
1. Click **"uploading an existing file"**
2. Create a new folder called `public`
3. Upload these files into the `public` folder:
   - `app.js`
   - `styles.css`
   - `particles.js`
   - `floating-elements.js`

### Step 3: Enable GitHub Pages

1. Go to your repository **Settings** tab
2. Scroll down to the **"Pages"** section in the left sidebar
3. Under **"Source"**, select **"Deploy from a branch"**
4. Choose **"main"** branch
5. Select **"/ (root)"** folder
6. Click **"Save"**

### Step 4: Access Your Site

1. GitHub will show you the URL: `https://yourusername.github.io/SigSecSpec`
2. It may take 5-10 minutes for the site to be available
3. You'll see a green checkmark when deployment is complete

## 📁 Final File Structure

Your repository should look like this:

```
SigSecSpec/
├── index.html              # Main page
├── admin.html              # Admin guide
├── 404.html                # Error page
├── README.md               # Documentation
├── .gitignore             # Git ignore rules
├── DEPLOYMENT.md          # This file
└── public/
    ├── app.js             # Main application
    ├── styles.css         # Styling
    ├── particles.js       # Particle effects
    └── floating-elements.js # Floating animations
```

## 🔧 Updating Your Site

### Method 1: GitHub Web Interface (Recommended)

1. Go to your repository on GitHub
2. Click on the file you want to edit
3. Click the **pencil icon** (Edit this file)
4. Make your changes
5. Scroll down and click **"Commit changes"**
6. Your site will automatically update in a few minutes

### Method 2: Upload New Files

1. Go to your repository
2. Click **"uploading an existing file"**
3. Upload the updated file
4. Commit the changes

## 🎨 Customizing Your Site

### Updating Content

1. **App Status**: Edit `public/app.js` → `loadAppStatus()` function
2. **Operations Data**: Edit `public/app.js` → `loadOperationsStatus()` function  
3. **Updates**: Edit `public/app.js` → `loadUpdates()` function
4. **App Links**: Edit `public/app.js` → `loadAppLinks()` function

### Changing Colors

Edit `public/styles.css` and modify the CSS custom properties in the `:root` section:

```css
:root {
  --primary-color: #10b981; /* Emerald green */
  --primary-dark: #059669;
  --primary-light: #34d399;
  /* ... other colors ... */
}
```

### Adding New Sections

1. Add HTML structure in `index.html`
2. Add corresponding JavaScript logic in `public/app.js`
3. Style with CSS in `public/styles.css`

## 🔍 Troubleshooting

### Site Not Loading
- Check that all files are uploaded correctly
- Verify the repository is public
- Wait 10-15 minutes for GitHub Pages to build
- Check the repository's "Actions" tab for build errors

### Styling Issues
- Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check that `public/styles.css` is uploaded correctly
- Verify file paths in HTML files

### JavaScript Errors
- Open browser Developer Tools (F12)
- Check the Console tab for errors
- Verify all JavaScript files are uploaded
- Check that JSON syntax is valid in `public/app.js`

### 404 Errors
- Make sure `404.html` is in the root directory
- Check that file names match exactly (case-sensitive)
- Verify all internal links use correct paths

## 📱 Testing Your Site

### Local Testing
1. Download all files to your computer
2. Open `index.html` in a web browser
3. Test all functionality before uploading changes

### Mobile Testing
- Test on different screen sizes
- Use browser developer tools to simulate mobile devices
- Check that the responsive design works correctly

## 🔒 Security Notes

- Your site is public and accessible to anyone
- All data is client-side only (no server security needed)
- No sensitive information should be in the code
- Consider using environment variables for any future API keys

## 📊 Analytics (Optional)

To track visitors, you can add Google Analytics:

1. Get a Google Analytics tracking ID
2. Add this code to the `<head>` section of `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🆘 Getting Help

If you encounter issues:

1. **Check GitHub Pages Status**: [status.github.com](https://status.github.com)
2. **GitHub Pages Documentation**: [docs.github.com/pages](https://docs.github.com/pages)
3. **Repository Issues**: Use the Issues tab in your repository
4. **Contact Support**: Reach out to the development team

## 🎉 Success!

Once deployed, your SigSecSpec Operations Portal will be live at:
`https://yourusername.github.io/SigSecSpec`

The site will automatically update whenever you push changes to the main branch.

---

**Remember**: Always test changes locally before uploading to ensure everything works correctly!
