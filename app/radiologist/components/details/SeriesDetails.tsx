import React from "react";
import { Series } from "../../types";

interface SeriesDetailsProps {
  series: Series;
}

const SeriesDetails: React.FC<SeriesDetailsProps> = ({ series }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="bg-amber-100 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {series.description || `Series ${series.id.substring(0, 8)}`}
          </h2>
          {series.seriesNumber && (
            <p className="text-sm text-gray-500">
              Series #{series.seriesNumber}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Series Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">System ID</p>
            <p className="mt-1 text-gray-900">{series.id}</p>
          </div>

          {series.modality && (
            <div>
              <p className="text-sm font-medium text-gray-500">Modality</p>
              <p className="mt-1 text-gray-900">{series.modality}</p>
            </div>
          )}

          {series.date && (
            <div>
              <p className="text-sm font-medium text-gray-500">Series Date</p>
              <p className="mt-1 text-gray-900">
                {new Date(series.date).toLocaleDateString()}
              </p>
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-gray-500">Instance Count</p>
            <p className="mt-1 text-gray-900">
              {series.instances?.length || 0}
            </p>
          </div>

          {series.bodyPartExamined && (
            <div>
              <p className="text-sm font-medium text-gray-500">
                Body Part Examined
              </p>
              <p className="mt-1 text-gray-900">{series.bodyPartExamined}</p>
            </div>
          )}

          {series.protocolName && (
            <div>
              <p className="text-sm font-medium text-gray-500">Protocol Name</p>
              <p className="mt-1 text-gray-900">{series.protocolName}</p>
            </div>
          )}
        </div>
      </div>

      {series.technicalDetails && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Technical Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {series.technicalDetails.manufacturer && (
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Manufacturer
                </p>
                <p className="mt-1 text-gray-900">
                  {series.technicalDetails.manufacturer}
                </p>
              </div>
            )}

            {series.technicalDetails.manufacturerModelName && (
              <div>
                <p className="text-sm font-medium text-gray-500">Model</p>
                <p className="mt-1 text-gray-900">
                  {series.technicalDetails.manufacturerModelName}
                </p>
              </div>
            )}

            {series.technicalDetails.sliceThickness && (
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Slice Thickness
                </p>
                <p className="mt-1 text-gray-900">
                  {series.technicalDetails.sliceThickness} mm
                </p>
              </div>
            )}

            {series.technicalDetails.pixelSpacing && (
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pixel Spacing
                </p>
                <p className="mt-1 text-gray-900">
                  {series.technicalDetails.pixelSpacing}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {series.metadata && Object.keys(series.metadata).length > 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Additional Information
          </h3>
          <div className="bg-gray-50 p-4 rounded overflow-auto max-h-60">
            <pre className="text-xs text-gray-700">
              {JSON.stringify(series.metadata, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeriesDetails;
