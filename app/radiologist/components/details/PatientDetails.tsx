import React from "react";
import { Patient } from "../../types";

interface PatientDetailsProps {
  patient: Patient;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="bg-green-100 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {patient.name || `Patient ${patient.id.substring(0, 8)}`}
          </h2>
          {patient.patientId && (
            <p className="text-sm text-gray-500">
              Patient ID: {patient.patientId}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Patient Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">System ID</p>
            <p className="mt-1 text-gray-900">{patient.id}</p>
          </div>

          {patient.dateOfBirth && (
            <div>
              <p className="text-sm font-medium text-gray-500">Date of Birth</p>
              <p className="mt-1 text-gray-900">
                {new Date(patient.dateOfBirth).toLocaleDateString()}
              </p>
            </div>
          )}

          {patient.sex && (
            <div>
              <p className="text-sm font-medium text-gray-500">Sex</p>
              <p className="mt-1 text-gray-900 capitalize">{patient.sex}</p>
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-gray-500">Study Count</p>
            <p className="mt-1 text-gray-900">{patient.studies?.length || 0}</p>
          </div>
        </div>
      </div>

      {patient.mainDiagnosis && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Main Diagnosis
          </h3>
          <p className="text-gray-700">{patient.mainDiagnosis}</p>
        </div>
      )}

      {patient.medicalHistory && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Medical History
          </h3>
          <p className="text-gray-700">{patient.medicalHistory}</p>
        </div>
      )}

      {patient.metadata && Object.keys(patient.metadata).length > 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Additional Information
          </h3>
          <div className="bg-gray-50 p-4 rounded overflow-auto max-h-60">
            <pre className="text-xs text-gray-700">
              {JSON.stringify(patient.metadata, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
