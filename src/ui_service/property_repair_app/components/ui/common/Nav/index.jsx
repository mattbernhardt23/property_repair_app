import Link from "next/link";
import { User } from "@components/ui/common";
import Image from "next/image";

export default function Navbar() {
  return (
    <section className="fixed top-0 z-50 bg-white w-full">
      <nav aria-label="Global" className="relative">
        <div className="flex justify-between font-header text-lg py-8 mx-8">
          <div className="flex flex-row justify-between">
            <div className="px-4 hover:scale-110">
              <Link href="/" legacyBehavior>
                <a>Projects</a>
              </Link>
            </div>
            <div className="px-4 hover:scale-110">
              <Link href="/schedule" legacyBehavior>
                <a>Schedule</a>
              </Link>
            </div>
            <div className="px-4 hover:scale-110">
              <Link href="/invoices" legacyBehavior>
                <a>Invoices</a>
              </Link>
            </div>
            <div className="px-4 hover:scale-110">
              <Link href="/payments" legacyBehavior>
                <a>Payments</a>
              </Link>
            </div>
          </div>

          <div className="flex">
            <User />
          </div>
        </div>
      </nav>
    </section>
  );
}
