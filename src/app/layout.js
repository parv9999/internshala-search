import './globals.css';

export const metadata = {
  title: 'Internshala – Find Your Perfect Internship',
  description:
    'Search and filter thousands of internships by profile, location, duration and stipend. Land your dream internship at top companies.',
  keywords: 'internship, jobs, internshala, internship search, stipend, work from home',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
