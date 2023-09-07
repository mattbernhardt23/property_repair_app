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

export default function SubHeader({ value }) {
  let topic = VALUES[value];

  return (
    <section className="bg-white text-black w-full relative font-header text-md">
      <div className="flex justify-between py-2 mx-8">
        <div className="flex flex-row justify-between">
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
