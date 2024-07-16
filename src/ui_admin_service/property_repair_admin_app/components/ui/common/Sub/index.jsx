import Link from "next/link";

const VALUES = {
  project: [
    {
      title: "Add",
      href: "/project/add",
    },
    {
      title: "Active",
      href: "/project/active",
    },
    {
      title: "Completed",
      href: "/project/complete",
    },
    {
      title: "Cancelled",
      href: "/project/cancelled",
    },
    {
      title: "Schedule",
      href: "/project/schedule",
    },
  ],
  invoice: [
    {
      title: "New",
      href: "invoice/new",
    },
    {
      title: "Approved",
      href: "invoice/approved",
    },
  ],
  quote: [
    {
      title: "New",
      href: "quote/new",
    },
    {
      title: "Approved",
      href: "quote/approved",
    },
  ],
  payment: [
    {
      title: "Upcoming",
      href: "payments/upcoming",
    },
    {
      title: "History",
      href: "payments/history",
    },
  ],
};

const CLASS = {
  project: "mr-64 ml-8 justify-between lg:mr-[50%]",
  quote: "ml-32",
  invoice: "ml-56",
  payment: "ml-80",
};

export default function SubHeader({ value }) {
  let topic = VALUES[value];
  let className = CLASS[value];

  return (
    <section className="bg-white text-black w-full relative font-header text-md">
      <div className={`py-2`}>
        <div className={`flex flex-row ${className}`}>
          {topic &&
            topic.map((t, index) => (
              <div key={index} className="px-4 hover:scale-110">
                <Link href={t.href} legacyBehavior>
                  <a>{t.title}</a>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
