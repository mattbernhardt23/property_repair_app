import Link from "next/link";
import { User, SubHeader } from "@components/ui/common";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [subCategory, setSubCategory] = useState(null);
  const [showSub, setShowSub] = useState(false);

  const handleHover = (value) => {
    setSubCategory(value);
    setShowSub(true);
  };

  return (
    <section className="fixed top-0 z-50 bg-black text-white w-full">
      <nav aria-label="Global" className="flex flex-col">
        <div className="relative">
          <div className="flex justify-between font-header text-lg py-8 mx-8">
            <div className="flex justify-between">
              <div
                className="px-4 hover:scale-110"
                onMouseEnter={() => handleHover("project")}
              >
                <Link href="/" legacyBehavior>
                  <a>Projects</a>
                </Link>
              </div>
              <div
                className="px-4 hover:scale-110"
                onMouseEnter={() => handleHover("quote")}
              >
                <Link href="/invoices" legacyBehavior>
                  <a>Quotes</a>
                </Link>
              </div>
              <div
                className="px-4 hover:scale-110"
                onMouseEnter={() => handleHover("invoice")}
              >
                <Link href="/invoices" legacyBehavior>
                  <a>Invoices</a>
                </Link>
              </div>
              <div
                className="px-4 hover:scale-110"
                onMouseEnter={() => handleHover("payment")}
              >
                <Link href="/payments" legacyBehavior>
                  <a>Payments</a>
                </Link>
              </div>
            </div>
            <div className="flex">
              <User />
            </div>
          </div>
        </div>
        {showSub && <SubHeader value={subCategory} />}
      </nav>
    </section>
  );
}
