import React from "react";
import { Instance } from "../../types";

interface ImageGridProps {
  instances: Instance[];
  onSelectInstance: (instance: Instance) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({
  instances,
  onSelectInstance,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {instances.map((instance) => (
        <div
          key={instance.sop_instance_uid}
          className="border rounded-lg overflow-hidden hover:shadow-md cursor-pointer transition-shadow"
          onClick={() => onSelectInstance(instance)}
        >
          <div className="aspect-square bg-gray-100 flex items-center justify-center">
            <img
              src={instance.dicom_file || `/api/placeholder/256/256`}
              alt={`Instance ${instance.instance_number}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="p-2 bg-white">
            <p className="text-xs text-gray-700 truncate">
              Instance {instance.instance_number}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {instance.sop_instance_uid}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
