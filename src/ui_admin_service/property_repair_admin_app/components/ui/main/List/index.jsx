import { Children } from "react";
import { StatusButton } from "@components/ui/project";
import Link from "next/link";

export default function List({ projects, children }) {
  return (
    <div className="rounded-lg overflow-auto">
      <table className="table-auto w-full rounded-lg">
        <thead className="bg-black text-white">
          <tr>
            <th className="py-2 px-4 text-center">Property Address</th>
            <th className="py-2 px-4 text-center">City</th>
            <th className="py-2 px-4 text-center">State</th>
            <th className="py-2 px-4 text-center">Distance</th>
            <th className="py-2 px-4 text-center">Type</th>
            <th className="py-2 px-4 text-center">Schedule</th>
            <th className="py-2 px-4 text-center">Status</th>
            {/* Add a column to add a schedule button */}
          </tr>
        </thead>
        <tbody className="text-black bg-white">
          {projects.map((project, index) => {
            const dateParts = project.date_created.split(" "); // Split by space
            const [, day, month, year, time] = dateParts;
            const scheduleDate = new Date(
              `${month} ${day}, ${year} ${time} UTC`
            );

            const formattedSchedule = `${(scheduleDate.getMonth() + 1)
              .toString()
              .padStart(2, "0")}/${scheduleDate
              .getDate()
              .toString()
              .padStart(2, "0")}/${scheduleDate
              .getFullYear()
              .toString()
              .slice(-2)}`;

            return (
              <Link href={`/project/${project.id}`} legacyBehavior>
                <tr
                  key={index}
                  className="border-t hover:bg-black hover:text-white cursor-pointer font-semibold"
                >
                  <td className="py-2 px-4 text-center">{project.address}</td>
                  <td className="py-2 px-4 text-center">{project.city}</td>
                  <td className="py-2 px-4 text-center">{project.state}</td>
                  <td className="py-2 px-4 text-center">
                    {project.distance_from_home.toFixed(2)} mi
                  </td>
                  <td className="py-2 px-4 text-center">{project.type}</td>
                  <td className="py-2 px-4 text-center">{formattedSchedule}</td>
                  <td className="py-2 px-4 text-center">
                    <StatusButton status={project.status} />
                  </td>
                  {/* Add a schedule button, opens a small calander and drop down
                  with a button to Send Request */}
                </tr>
              </Link>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
