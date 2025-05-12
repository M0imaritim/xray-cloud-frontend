import React from "react";
import { Hospital } from "../../types";

interface HospitalDetailsProps {
  hospital: Hospital;
}

const HospitalDetails: React.FC<HospitalDetailsProps> = ({ hospital }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{hospital.name}</h2>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Hospital Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Hospital ID</p>
            <p className="mt-1 text-gray-900">{hospital.id}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Location</p>
            <p className="mt-1 text-gray-900">
              {hospital.location || "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Contact</p>
            <p className="mt-1 text-gray-900">
              {hospital.contact || "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Patient Count</p>
            <p className="mt-1 text-gray-900">
              {hospital.patients?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {hospital.description && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Description
          </h3>
          <p className="text-gray-700">{hospital.description}</p>
        </div>
      )}

      {hospital.metadata && Object.keys(hospital.metadata).length > 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Additional Information
          </h3>
          <div className="bg-gray-50 p-4 rounded overflow-auto max-h-60">
            <pre className="text-xs text-gray-700">
              {JSON.stringify(hospital.metadata, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalDetails;
