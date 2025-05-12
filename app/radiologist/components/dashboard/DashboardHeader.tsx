import React from "react";
import { Layers, Grid } from "lucide-react";

interface DashboardHeaderProps {
  viewMode: string;
  onChangeViewMode: (mode: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  viewMode,
  onChangeViewMode,
}) => {
  return (
    <header className="bg-white shadow py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium text-gray-800">
          PACS Imaging Dashboard
        </h1>
        <div className="flex items-center">
          <button
            onClick={() => onChangeViewMode("tree")}
            className={`p-2 rounded-l ${
              viewMode === "tree"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <Layers size={18} />
          </button>
          <button
            onClick={() => onChangeViewMode("grid")}
            className={`p-2 rounded-r ${
              viewMode === "grid"
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <Grid size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
