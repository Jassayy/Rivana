# Rivana

![Rivana Logo](https://api.placeholder.com/150)

## AI-Powered Content Generation Platform

Rivana is a modern Next.js application that leverages advanced AI models to help users generate high-quality letters, emails, marketing copy, and more. With built-in template management and content storage, Rivana streamlines your content creation workflow.

## ✨ Features

-    **AI Content Generation**: Create professional-quality content in seconds
-    **Multiple Content Types**: Generate emails, letters, blog posts, social media content, and more
-    **Template System**: Save and reuse your favorite prompts and settings
-    **Content Management**: Store, organize, and edit your generated content
-    **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
-    **Authentication**: Secure user accounts and content storage
-    **Export Options**: Download content in various formats (PDF, DOCX, TXT)

## 🚀 Getting Started

### Prerequisites

-    Node.js 18.0.0 or later
-    npm or yarn
-    Git

### Installation

1. Clone the repository:

     ```bash
     git clone https://github.com/yourusername/rivana.git
     cd rivana
     ```

2. Install dependencies:

     ```bash
     npm install
     # or
     yarn install
     ```

3. Set up environment variables:

     ```bash
     cp .env.example .env.local
     ```

     Then edit `.env.local` to add your API keys and configuration settings.

4. Run the development server:

     ```bash
     npm run dev
     # or
     yarn dev
     ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Tech Stack

-    **Framework**: [Next.js](https://nextjs.org/)
-    **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-    **Authentication**: [NextAuth.js](https://next-auth.js.org/)
-    **Database**: [Prisma](https://www.prisma.io/) with your preferred database
-    **AI Integration**: Compatible with OpenAI, Anthropic, and other AI providers
-    **State Management**: [React Context API](https://reactjs.org/docs/context.html)
-    **Deployment**: Ready for Vercel, Netlify, or any other Next.js-compatible hosting

## 📂 Project Structure

```
rivana/
├── app/                # Next.js app directory
│   ├── api/            # API routes
│   ├── auth/           # Authentication-related pages
│   ├── dashboard/      # User dashboard
│   ├── editor/         # Content editor
│   ├── templates/      # Template management
│   └── layout.js       # Root layout component
├── components/         # Reusable UI components
├── lib/                # Utility functions and shared logic
├── prisma/             # Database schema and migrations
├── public/             # Static assets
└── styles/             # Global styles
```

## 💡 Usage Examples

### Generating a Professional Email

1. Navigate to the dashboard
2. Click "New Content" and select "Email"
3. Choose a template or start from scratch
4. Provide a brief description of what you want to write
5. The AI will generate a draft email based on your input
6. Edit the content as needed and save or export

### Managing Templates

1. Go to the Templates section
2. Create a new template by clicking "New Template"
3. Define the template structure and AI generation parameters
4. Save the template for future use
5. Access your templates directly from the content editor

## 🔒 Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

```
# Database
DATABASE_URL="your-database-connection-string"

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="your-nextauth-secret"

# AI Provider (choose one or more)
OPENAI_API_KEY="your-openai-api-key"
ANTHROPIC_API_KEY="your-anthropic-api-key"

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID="your-analytics-id"
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📬 Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/rivana](https://github.com/yourusername/rivana)

---

Built with ❤️ using Next.js and AI technology
