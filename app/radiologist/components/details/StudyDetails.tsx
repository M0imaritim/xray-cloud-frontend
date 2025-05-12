import React from "react";
import { Study } from "../../types";

interface StudyDetailsProps {
  study: Study;
}

const StudyDetails: React.FC<StudyDetailsProps> = ({ study }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="bg-purple-100 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {study.description || `Study ${study.id.substring(0, 8)}`}
          </h2>
          {study.studyId && (
            <p className="text-sm text-gray-500">Study ID: {study.studyId}</p>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Study Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">System ID</p>
            <p className="mt-1 text-gray-900">{study.id}</p>
          </div>

          {study.date && (
            <div>
              <p className="text-sm font-medium text-gray-500">Study Date</p>
              <p className="mt-1 text-gray-900">
                {new Date(study.date).toLocaleDateString()}
              </p>
            </div>
          )}

          {study.modality && (
            <div>
              <p className="text-sm font-medium text-gray-500">Modality</p>
              <p className="mt-1 text-gray-900">{study.modality}</p>
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-gray-500">Series Count</p>
            <p className="mt-1 text-gray-900">{study.series?.length || 0}</p>
          </div>

          {study.accessionNumber && (
            <div>
              <p className="text-sm font-medium text-gray-500">
                Accession Number
              </p>
              <p className="mt-1 text-gray-900">{study.accessionNumber}</p>
            </div>
          )}

          {study.referringPhysician && (
            <div>
              <p className="text-sm font-medium text-gray-500">
                Referring Physician
              </p>
              <p className="mt-1 text-gray-900">{study.referringPhysician}</p>
            </div>
          )}
        </div>
      </div>

      {study.clinicalHistory && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Clinical History
          </h3>
          <p className="text-gray-700">{study.clinicalHistory}</p>
        </div>
      )}

      {study.metadata && Object.keys(study.metadata).length > 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Additional Information
          </h3>
          <div className="bg-gray-50 p-4 rounded overflow-auto max-h-60">
            <pre className="text-xs text-gray-700">
              {JSON.stringify(study.metadata, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyDetails;
