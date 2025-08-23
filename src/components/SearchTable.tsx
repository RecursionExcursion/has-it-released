"use client";

import { AppDTO } from "../app/types/app";

type SearchTableProps = {
  apps: AppDTO[];
};

export default function SearchTable(props: SearchTableProps) {
  return (
    <div className="max-h-46 overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700">
        <thead className="sticky top-0 bg-white ltr:text-left rtl:text-right dark:bg-gray-900">
          <tr className="*:font-medium *:text-gray-900 dark:*:text-white">
            <th className="px-3 py-2 whitespace-nowrap">Name</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {props.apps.map((app) => (
            <tr
              key={app.appid}
              className="*:text-gray-900 *:first:font-medium dark:*:text-white"
            >
              <td className="px-3 py-2 whitespace-nowrap">{app.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
