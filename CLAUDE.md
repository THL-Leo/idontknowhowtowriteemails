# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `npm run dev` - Run development server with turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style Guidelines
- **Components**: Use React.forwardRef for components; add displayName
- **Styling**: Use Tailwind CSS with cn() utility for class composition
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Imports**: Group by: React, external libs, components, types, styles
- **Types**: Define TypeScript interfaces for props; extend HTML attributes
- **API Routes**: Use NextResponse with appropriate status codes
- **Error Handling**: Try/catch in API routes with proper status codes
- **Auth**: Use NextAuth.js with Google OAuth provider
- **Database**: Supabase for storage; handle connection errors
- **State**: React hooks for state management
- **File Structure**: Follow Next.js 14 App Router conventions