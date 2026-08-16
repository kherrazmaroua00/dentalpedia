import './globals.css';

export const metadata = {
  title: 'Dentalpedia',
  description: 'Plateforme académique pour étudiants en dentaire',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-[linear-gradient(180deg,_#efe7f8_0%,_#f4effd_100%)] text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
