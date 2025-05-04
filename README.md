# PersonalMail - Email Writing Assistant

> A hackathon project demonstrating Claude API capabilities by creating personalized emails that sound like you wrote them.

## 🚀 Overview

PersonalMail learns your email writing style from samples you provide and uses Claude's powerful AI to generate new emails that match your tone, formality, and structure. Perfect for busy professionals who want to maintain their authentic voice in communications.

## ✨ Features

- **OAuth Authentication**: Secure login with Google
- **Style Learning**: Upload email samples to teach Claude your writing style
- **Personalized Generation**: Get emails that sound like you wrote them
- **Real-time Editing**: Fine-tune generated emails directly in the app
- **One-click Copy**: Easily copy emails to your clipboard

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router
- **UI Components**: shadcn/ui (Tailwind CSS)
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: Supabase
- **AI**: Claude API (Anthropic)

## 📸 Screenshots

[Screenshots would go here in a real README]

## 🔧 How It Works

1. **Sign in** with your Google account
2. **Add email samples** to teach Claude your writing style
3. **Describe the email** you need to write (recipient, purpose, key points)
4. Claude **generates an email** that sounds like you wrote it
5. **Edit if needed** and copy to your clipboard

## 💡 The AI Magic

Under the hood, PersonalMail:

1. Stores your email samples securely in Supabase
2. Creates a specialized prompt for Claude that includes your writing examples
3. Instructs Claude to analyze your style (formality, sentence structure, greeting/sign-off patterns)
4. Uses Claude to generate a new email that matches your writing style
5. Presents the result in an editable interface for final touches

## 🏃‍♂️ Quick Start

Follow the detailed setup instructions in the Implementation Guide to get started.

## 🧩 Future Enhancements

If expanded beyond this hackathon, future features could include:

- Email templates for recurring communications
- Multiple writing styles for different contexts
- Direct email sending capabilities
- Multi-language support
- Subject line generator
- Calendar integration for scheduling
- Tone adjustment (more formal, more casual)

## 🔐 Security & Privacy

- All email samples are securely stored in your personal database
- Authentication leverages Google OAuth for security
- Your data is never used to train AI models
- All communications with Claude API are encrypted

## ⚡ Hackathon Notes

This project was created in under 12 hours as a demonstration of Claude API capabilities for a hackathon. It showcases:

1. **Personalization**: Claude's ability to adapt to individual writing styles
2. **Context Understanding**: Processing email scenarios and generating appropriate responses
3. **Natural Language Generation**: Creating coherent, contextually appropriate emails
4. **User-Centered Design**: Simple interface focused on solving a real user need

## 📝 License

[MIT License]