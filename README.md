# Padel Core - Sports Community Platform

## Overview

Padel Core is a comprehensive platform for the padel tennis community, featuring rankings, tournaments, live streaming, and social features. The platform is built with React for web and NativeScript for mobile applications.

## 🚀 Quick Start

### Web Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Mobile Development

1. Install the NativeScript Preview app:
- [iOS App Store](https://apps.apple.com/us/app/nativescript-preview/id1264484702)
- [Google Play Store](https://play.google.com/store/apps/details?id=org.nativescript.preview)

2. Start the mobile preview:
```bash
setup-nativescript-stackblitz && ns preview
```

3. Scan the QR code with the NativeScript Preview app

## 🎨 Frontend Customization Guide

### Safe-to-Edit Files

You can safely modify these files without breaking core functionality:

```
src/
├── components/         # UI components
│   ├── ui/            # Base UI components (from shadcn/ui)
│   ├── layouts/       # Layout components
│   ├── features/      # Feature-specific components
│   └── shared/        # Shared components
├── styles/            # Global styles
└── lib/              # Utilities and helpers
```

### Adding New Components

1. Create a new component in the appropriate directory:
```tsx
// src/components/features/MyNewFeature.tsx
import { Button } from "@/components/ui/button"

export function MyNewFeature() {
  return (
    <div>
      <h2>My New Feature</h2>
      <Button>Click Me</Button>
    </div>
  )
}
```

2. Import and use it in your pages:
```tsx
import { MyNewFeature } from "@/components/features/MyNewFeature"
```

### Design System

We use shadcn/ui components with Tailwind CSS for styling:

- All UI components are in `src/components/ui/`
- Use Tailwind classes for styling
- Follow the existing color scheme and variables
- Check `tailwind.config.js` for theme configuration

Example of styling:
```tsx
<div className="p-4 bg-background border rounded-lg">
  <h2 className="text-2xl font-bold text-foreground">Title</h2>
  <p className="text-muted-foreground">Content</p>
</div>
```

### Mobile-Specific Components

Mobile components are in `src/mobile/`:
```
src/mobile/
├── components/        # Mobile-specific UI components
├── screens/          # Mobile screens
└── navigation/       # Mobile navigation
```

## 📱 Mobile Development

### Preview on Mobile

1. Start the preview server:
```bash
setup-nativescript-stackblitz && ns preview
```

2. Use the NativeScript Preview app to scan the QR code

### Mobile-Specific Features

- Native UI components
- Touch gestures
- Device features (camera, GPS)
- Platform-specific styling

Example of a mobile component:
```xml
<!-- src/mobile/screens/HomeScreen.xml -->
<Page>
    <ActionBar title="Padel Core" />
    <StackLayout>
        <Label text="Welcome to Padel Core" class="h1" />
        <Button text="View Rankings" tap="{{ onViewRankings }}" />
    </StackLayout>
</Page>
```

## 🔧 Common Tasks

### Adding a New Page

1. Create the page component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Create mobile version in `src/mobile/screens/` if needed

### Modifying Styles

1. Global styles: Edit `src/index.css`
2. Component styles: Use Tailwind classes
3. Mobile styles: Edit `src/mobile/app.css`

### Adding New Features

1. Plan the feature structure
2. Create necessary components
3. Add routes if needed
4. Implement mobile version
5. Test across platforms

## 🎯 Best Practices

1. Keep components small and focused
2. Use TypeScript for type safety
3. Follow existing naming conventions
4. Test changes across platforms
5. Use responsive design
6. Keep mobile and web versions in sync

## 🚨 Common Issues

### Web Development

- **Hot Reload Not Working**: Restart the dev server
- **Type Errors**: Check TypeScript definitions
- **Styling Issues**: Check Tailwind classes and theme variables

### Mobile Development

- **Preview Not Working**: Update NativeScript Preview app
- **Platform Differences**: Test on both iOS and Android
- **Performance Issues**: Use native components when possible

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [NativeScript Documentation](https://docs.nativescript.org)
- [React Documentation](https://react.dev)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - see LICENSE.md

## 🆘 Support

For support, please open an issue in the repository or contact the development team.