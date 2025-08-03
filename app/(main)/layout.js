import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}