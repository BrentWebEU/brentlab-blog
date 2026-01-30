# DevBlog - Ghost Theme

A professional yet fun custom Ghost theme designed for developer and Linux blogs. Features modern design, dark mode, beautiful code syntax highlighting, and smooth animations.

## Features

- 🎨 **Modern Design** - Clean, professional layout with playful elements
- 🌓 **Dark Mode** - Automatic theme detection with manual toggle (Ctrl/Cmd + Shift + D)
- 💻 **Code Highlighting** - Prism.js integration with copy buttons and line numbers
- 📱 **Fully Responsive** - Mobile-first design that looks great on all devices
- ⚡ **Performance Optimized** - Fast loading with lazy images and optimized fonts
- ♿ **Accessible** - WCAG AA compliant with keyboard navigation support
- 🎮 **Easter Eggs** - Konami code, coffee toggle, and more fun surprises
- 📊 **Analytics Ready** - Compatible with Ghost's built-in analytics
- 🔌 **ActivityPub Ready** - Works with Ghost's federation features

## Installation

### Docker Setup (Recommended)

1. Place the theme in `./data/ghost/themes/devblog/`
2. Restart Ghost: `docker compose restart ghost`
3. Log into Ghost Admin
4. Navigate to **Settings → Design**
5. Click **Change theme** and activate DevBlog

### Manual Installation

1. Download or clone this theme
2. Zip the theme folder
3. Upload via Ghost Admin: **Settings → Design → Change theme → Upload theme**

## Configuration

### Site Settings

Configure your blog in Ghost Admin:

- **Settings → General**
  - Site title and description
  - Site logo/icon
  - Publication cover image

- **Settings → Navigation**
  - Primary navigation (header)
  - Secondary navigation (footer)

- **Settings → Design**
  - Site-wide settings
  - Accent color (optional override)

### Theme Settings

The theme automatically adapts to Ghost's settings. You can customize:

- **Posts per page**: Set in `package.json` (default: 12)
- **Featured posts**: Tag posts as "Featured" to show them on homepage
- **Code blocks**: Use triple backticks with language for syntax highlighting

## Usage

### Code Blocks

Use code blocks with language specification:

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

**Features:**
- Language badge (top-left)
- Copy button (top-right)
- Line numbers (add `data-line-numbers` attribute)
- Highlight lines (add `data-line="1-3,5"` attribute)

### Dark Mode

- **Auto-detection**: Respects system preference
- **Manual toggle**: Click sun/moon icon in header
- **Keyboard shortcut**: `Ctrl/Cmd + Shift + D`
- **Persistent**: Saves preference in localStorage

### Post Features

- **Featured posts**: Show on homepage by marking as featured
- **Custom excerpt**: Set custom excerpt in post settings
- **Reading time**: Automatically calculated and displayed
- **Social sharing**: Twitter, Facebook, LinkedIn, and copy link
- **Author bio**: Displayed at bottom of posts
- **Related posts**: Auto-generated based on tags
- **Comments**: Supports Ghost's native comments

### Pages

Use the custom page template for static content:

- About page
- Contact page
- Privacy policy
- Any other static content

### Error Pages

Custom 404 error page with terminal theme and helpful navigation.

## Customization

### Colors

Edit CSS custom properties in `assets/css/screen.css`:

```css
:root {
  --color-primary: #2563EB;  /* Primary brand color */
  --color-accent: #F59E0B;   /* Accent color */
  --color-linux-green: #10B981; /* Linux theme accent */
}
```

### Fonts

Update font families in `assets/css/screen.css`:

```css
:root {
  --font-heading: 'Inter', sans-serif;
  --font-sans: system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Logo

Replace `assets/images/logo.svg` with your custom logo.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- Lighthouse score: 90+
- First Contentful Paint: <2s
- Time to Interactive: <3s
- Lazy loading images
- Deferred JavaScript
- Optimized fonts
- Minimal CSS

## Accessibility

- Semantic HTML5
- ARIA labels
- Keyboard navigation
- Focus indicators
- Screen reader support
- Reduced motion support
- WCAG AA compliant

## Development

### Local Development

```bash
# Watch for changes (if using gscan)
npx gscan . --verbose

# Test theme
npx gscan .
```

### File Structure

```
devblog/
├── assets/
│   ├── css/
│   │   ├── screen.css      # Main styles
│   │   ├── prism-theme.css # Code highlighting
│   │   └── animations.css  # Animations
│   ├── js/
│   │   ├── main.js         # Core functionality
│   │   ├── theme-toggle.js # Dark mode
│   │   └── prism.js        # Code highlighting
│   └── images/
│       └── logo.svg        # Theme logo
├── partials/
│   ├── header.hbs
│   ├── footer.hbs
│   ├── navigation.hbs
│   ├── post-card.hbs
│   └── social-share.hbs
├── default.hbs             # Base layout
├── index.hbs              # Blog listing
├── home.hbs               # Homepage
├── post.hbs               # Post template
├── page.hbs               # Page template
├── tag.hbs                # Tag archive
├── author.hbs             # Author archive
├── error.hbs              # 404 page
└── package.json           # Theme metadata
```

## Troubleshooting

### Dark mode not working
- Clear browser cache and reload
- Check localStorage in DevTools
- Ensure JavaScript is enabled

### Code blocks not highlighting
- Check internet connection (Prism.js loads from CDN)
- Verify language is supported
- Check browser console for errors

### Images not loading
- Verify image paths in content
- Check Ghost content directory permissions
- Ensure images are properly uploaded

## Credits

- **Ghost CMS**: https://ghost.org
- **Prism.js**: https://prismjs.com
- **Fonts**: Google Fonts (Inter, JetBrains Mono)
- **Icons**: Feather Icons (inline SVG)

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or contributions:
- GitHub Issues: [Your repo]
- Ghost Forum: https://forum.ghost.org
- Documentation: https://ghost.org/docs/themes/

## Changelog

### Version 1.0.0 (2026-01-30)
- Initial release
- Dark mode support
- Code syntax highlighting
- Responsive design
- Accessibility features
- Performance optimizations
- Easter eggs and personality elements

---

Made with ☕ and 🐧 for developers who love beautiful blogs.
