# DevBlog Theme - Installation Guide

## Quick Start

Your custom DevBlog theme is ready to use! Follow these steps to activate it.

### Step 1: Restart Ghost

Since the theme is already in the correct location, simply restart Ghost:

```bash
docker compose restart ghost
```

### Step 2: Activate in Ghost Admin

1. Open your browser and navigate to your Ghost admin panel: `https://YOUR_DOMAIN/ghost`
2. Log in with your admin credentials
3. Go to **Settings → Design**
4. Click **Change theme**
5. You should see "DevBlog" in the list of installed themes
6. Click **Activate** next to DevBlog

### Step 3: Configure Your Site

1. **General Settings** (`Settings → General`)
   - Set your site title and description
   - Upload a site logo or icon
   - Add a publication cover image (optional)

2. **Navigation** (`Settings → Navigation`)
   - Configure your primary navigation (header menu)
   - Set up secondary navigation (footer menu)

3. **Design Settings** (`Settings → Design → Customize`)
   - The theme will use Ghost's default settings
   - Accent color can be customized (optional)

## Theme Features

### Dark Mode
- **Auto-detection**: Respects system preference
- **Manual toggle**: Click the sun/moon icon in the header
- **Keyboard shortcut**: `Ctrl/Cmd + Shift + D`

### Code Highlighting
Use code blocks with language specification for syntax highlighting:

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

### Featured Posts
Mark posts as "Featured" in the post settings to display them in the featured section on the homepage.

### Easter Eggs
- Try the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
- Click the coffee emoji in the footer repeatedly

## Validation Results

✅ **Theme Status**: Compatible with Ghost 3.x+
✅ **gscan Validation**: Passed
✅ **Required Templates**: All present
✅ **Required CSS Classes**: All implemented
✅ **Accessibility**: WCAG AA compliant

## Need Help?

- Check the [README.md](README.md) for detailed documentation
- Visit Ghost documentation: https://ghost.org/docs/themes/
- Run `npx gscan data/ghost/themes/devblog` to validate the theme

## Customization

To customize the theme, edit files in:
- `data/ghost/themes/devblog/assets/css/` - Styles
- `data/ghost/themes/devblog/assets/js/` - JavaScript
- `data/ghost/themes/devblog/*.hbs` - Templates

After making changes, restart Ghost to see updates:
```bash
docker compose restart ghost
```

Enjoy your new theme! 🎉
