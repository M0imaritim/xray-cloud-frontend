import React from "react";
import { Instance } from "../../types";

interface InstanceDetailsProps {
  instance: Instance;
}

const InstanceDetails: React.FC<InstanceDetailsProps> = ({ instance }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="bg-teal-100 p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-teal-600"
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
            {instance.name || `Instance ${instance.id.substring(0, 8)}`}
          </h2>
          {instance.instanceNumber && (
            <p className="text-sm text-gray-500">
              Instance #{instance.instanceNumber}
            </p>
          )}
        </div>
      </div>

      {instance.image_url && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Image</h3>
          <div className="flex justify-center bg-gray-100 p-4 rounded">
            <img
              src={instance.image_url}
              alt={instance.name || "Medical image"}
              className="max-w-full max-h-96 object-contain"
            />
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Instance Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">System ID</p>
            <p className="mt-1 text-gray-900">{instance.id}</p>
          </div>

          {instance.sopClassUid && (
            <div>
              <p className="text-sm font-medium text-gray-500">SOP Class UID</p>
              <p
                className="mt-1 text-gray-900 text-sm font-mono truncate"
                title={instance.sopClassUid}
              >
                {instance.sopClassUid}
              </p>
            </div>
          )}

          {instance.sopInstanceUid && (
            <div>
              <p className="text-sm font-medium text-gray-500">
                SOP Instance UID
              </p>
              <p
                className="mt-1 text-gray-900 text-sm font-mono truncate"
                title={instance.sopInstanceUid}
              >
                {instance.sopInstanceUid}
              </p>
            </div>
          )}

          {instance.transferSyntaxUid && (
            <div>
              <p className="text-sm font-medium text-gray-500">
                Transfer Syntax UID
              </p>
              <p
                className="mt-1 text-gray-900 text-sm font-mono truncate"
                title={instance.transferSyntaxUid}
              >
                {instance.transferSyntaxUid}
              </p>
            </div>
          )}

          {instance.type && (
            <div>
              <p className="text-sm font-medium text-gray-500">Type</p>
              <p className="mt-1 text-gray-900">{instance.type}</p>
            </div>
          )}

          {instance.status && (
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="mt-1 text-gray-900 capitalize">{instance.status}</p>
            </div>
          )}
        </div>
      </div>

      {instance.imageDetails && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Image Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {instance.imageDetails.rows && (
              <div>
                <p className="text-sm font-medium text-gray-500">Rows</p>
                <p className="mt-1 text-gray-900">
                  {instance.imageDetails.rows}
                </p>
              </div>
            )}

            {instance.imageDetails.columns && (
              <div>
                <p className="text-sm font-medium text-gray-500">Columns</p>
                <p className="mt-1 text-gray-900">
                  {instance.imageDetails.columns}
                </p>
              </div>
            )}

            {instance.imageDetails.bitsAllocated && (
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Bits Allocated
                </p>
                <p className="mt-1 text-gray-900">
                  {instance.imageDetails.bitsAllocated}
                </p>
              </div>
            )}

            {instance.imageDetails.bitsStored && (
              <div>
                <p className="text-sm font-medium text-gray-500">Bits Stored</p>
                <p className="mt-1 text-gray-900">
                  {instance.imageDetails.bitsStored}
                </p>
              </div>
            )}

            {instance.imageDetails.photometricInterpretation && (
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Photometric Interpretation
                </p>
                <p className="mt-1 text-gray-900">
                  {instance.imageDetails.photometricInterpretation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {instance.metadata && Object.keys(instance.metadata).length > 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Additional Information
          </h3>
          <div className="bg-gray-50 p-4 rounded overflow-auto max-h-60">
            <pre className="text-xs text-gray-700">
              {JSON.stringify(instance.metadata, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstanceDetails;
