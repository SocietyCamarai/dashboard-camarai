# CamarAI Dashboard

A modern React dashboard with authentication interface.

## Features

- **Authentication Interface**: Modern login/register interface with social login options
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic theme switching based on system preferences
- **Animated Background**: Beautiful animated background on desktop/tablet views
- **Social Login**: Google and Microsoft authentication options
- **PWA Ready**: Includes web manifest and favicon support

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npx vercel dev
   ```

3. Open your browser and navigate to the URL shown in the terminal.

## Dashboard

The main dashboard is now the authentication interface, featuring:

- **Login Form**: Email and password authentication
- **Register Form**: User registration with password confirmation
- **Social Login**: Google and Microsoft OAuth integration
- **Responsive Design**: Optimized for all device sizes
- **Dark Mode**: Automatic theme detection and switching

## Assets

The authentication page requires a logo file at `src/assets/images/loading_v3.gif`. Currently, there's a placeholder file that will show a text fallback if the actual GIF is not available.

## Styling

The authentication page uses custom CSS with CSS variables for theming. The styles are located in `src/assets/styles/auth.css` and include:

- Responsive design with mobile-first approach
- Dark mode support
- Animated background effects
- Modern form styling with focus states
- Social login button styling

## Development

- Built with React 18 and TypeScript
- Uses Vite for fast development and building
- ESLint configured for code quality
- CSS modules support available

## Build

To build for production:

```bash
npm run build
npx vercel --prod
```
or deploy a change to production

The built files will be in the `dist` directory.
