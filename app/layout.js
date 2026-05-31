import './globals.css';

export const metadata = {
  title: 'Quiz App',
  description: 'A simple Next.js quiz starter app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

