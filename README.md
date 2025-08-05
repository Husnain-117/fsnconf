# COMSATS Conference Website

A modern, responsive website for the COMSATS Conference, built with React, TypeScript, and Vite. The website showcases event details, speakers, program schedule, and includes PDF download functionality for conference materials.

## ✨ Features

- 📅 Interactive program schedule
- 🎤 Speaker profiles and sessions
- 📝 Online registration form
- 📄 PDF download functionality for conference materials
- 🎨 Modern, responsive design
- ⚡ Fast performance with Vite
- 🛠 Type-safe with TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher) or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/comsats-conference.git
   cd comsats-conference
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 📄 PDF Download Functionality

The website includes functionality to download PDF files from the public folder. To add new PDFs:

1. Place your PDF files in the `public/pdfs/` directory
2. Reference them in your code using the path `/pdfs/your-file.pdf`
3. The files will be automatically included in the build and available for download

Example usage in your React component:

```jsx
<a 
  href="/pdfs/conference-program.pdf" 
  download
  className="download-link"
>
  Download Program PDF
</a>
```

## 🚀 Deployment

### Building for Production

```bash
npm run build
# or
yarn build
```

This will create a `dist` directory with a production-ready build of your app.

### Deployment Notes

- The application is configured to work with Vite's base URL settings
- PDF files in the `public/pdfs/` directory will be included in the build
- For SPA routing, ensure your hosting provider supports HTML5 history API fallback
- Set environment variables in `.env` file if needed

## 📂 Project Structure

```
comsatsconf/
├── public/                 # Static files
│   └── pdfs/               # PDF files for download
├── src/
│   ├── Components/         # React components
│   ├── assets/             # Images, fonts, etc.
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Entry point
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
