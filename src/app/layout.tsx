import type { Metadata } from 'next'
import '../index.css';

export const metadata: Metadata = {
  title: 'ProjectFlow - Project Management App',
  description: 'Web site created with Next.js.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <head>
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </head>
        <body>
            <div id="root">{children}</div>
            <script type="module" src="/src/main.tsx"></script>
        </body>
    </html>
  )
}