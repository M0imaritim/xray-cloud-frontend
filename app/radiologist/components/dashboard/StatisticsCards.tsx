import React from "react";
import {
  Hospital as HospitalIcon,
  User,
  FileText,
  Layers,
  Image as ImageIcon,
} from "lucide-react";
import { Stats } from "../../types";

interface StatisticsCardsProps {
  stats: Stats;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="bg-indigo-100 p-2 rounded-full mr-4">
          <HospitalIcon size={20} className="text-indigo-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Hospitals</p>
          <p className="text-xl font-semibold">{stats.hospitals}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="bg-blue-100 p-2 rounded-full mr-4">
          <User size={20} className="text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Patients</p>
          <p className="text-xl font-semibold">{stats.patients}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="bg-green-100 p-2 rounded-full mr-4">
          <FileText size={20} className="text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Studies</p>
          <p className="text-xl font-semibold">{stats.studies}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="bg-yellow-100 p-2 rounded-full mr-4">
          <Layers size={20} className="text-yellow-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Series</p>
          <p className="text-xl font-semibold">{stats.series}</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4 flex items-center">
        <div className="bg-purple-100 p-2 rounded-full mr-4">
          <ImageIcon size={20} className="text-purple-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Instances</p>
          <p className="text-xl font-semibold">{stats.instances}</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCards;
