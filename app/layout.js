import './globals.css';

export const metadata = {
  title: 'WarriorFitFlow | Calisthenics & MMA Training',
  description:
    'WarriorFitFlow offers elite calisthenics and MMA training with performance-driven coaching across three locations.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
