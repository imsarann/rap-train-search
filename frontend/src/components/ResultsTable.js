import React from "react";

export default function ResultsTable({ searchResults }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table Head */}
        <thead className="bg-gray-50">
          <tr>
            {["Train Name", "Type", "Departure", "Arrival", "Distance", "Price"].map((heading) => (
              <th
                key={heading}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {searchResults.length > 0 ? (
            searchResults.map((train, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                {/* Train Name */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {train.trainName}
                  </div>
                </td>

                {/* Type */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      train.type === "Direct"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {train.type}
                  </span>
                </td>

                {/* Departure */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {train.departureTime}
                </td>

                {/* Arrival */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {train.arrivalTime}
                </td>

                {/* Distance */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {train.distance} km
                </td>

                {/* Price */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-green-600">
                    ₹{train.price}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                No trains available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
