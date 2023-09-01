export default function Footer() {
  return (
    <footer className="bg-white pt-1 h-40 mr-6">
      <div className="container mx-auto px-6">
        <div className="mt-5 flex flex-col items-center">
          <div className="py-6">
            <p className="mb-6 text-black font-header text-sm text-primary-2 font-bold">
              © {new Date().getFullYear()} Property Repair App
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
