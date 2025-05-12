import React from "react";
import { X } from "lucide-react";
import { Instance } from "../../types";

interface ImageViewerProps {
  instance: Instance | null;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ instance, onClose }) => {
  if (!instance) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-medium">Instance Viewer</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          <div className="aspect-square bg-gray-100 flex items-center justify-center mb-4">
            <img
              src={instance.dicom_file || `/api/placeholder/768/768`}
              alt={`Instance ${instance.instance_number}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm font-medium">SOP Instance UID</p>
              <p className="text-xs font-mono text-gray-700 break-all">
                {instance.sop_instance_uid}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm font-medium">Instance Number</p>
              <p className="text-lg">{instance.instance_number}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
