import React from "react";
import {
  Hospital as HospitalIcon,
  User,
  FileText,
  Layers,
  Image as ImageIcon,
} from "lucide-react";

// Update the interface to match how it's used in page.tsx
interface StatisticsCardsProps {
  statistics: Array<{
    title: string;
    value: number;
    change: string;
    icon: string;
  }>;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ statistics }) => {
  // Helper function to get the right icon component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "🏥":
        return <HospitalIcon size={20} className="text-indigo-600" />;
      case "👤":
        return <User size={20} className="text-blue-600" />;
      case "📊":
        return <FileText size={20} className="text-green-600" />;
      case "📁":
        return <Layers size={20} className="text-yellow-600" />;
      case "🖼️":
        return <ImageIcon size={20} className="text-purple-600" />;
      default:
        return <FileText size={20} className="text-gray-600" />;
    }
  };

  // Helper function to get the right background color
  const getBgColor = (index: number) => {
    const colors = ["indigo", "blue", "green", "yellow", "purple"];
    return colors[index % colors.length];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {statistics.map((stat, index) => (
        <div
          key={stat.title}
          className="bg-white rounded-lg shadow p-4 flex items-center"
        >
          <div className={`bg-${getBgColor(index)}-100 p-2 rounded-full mr-4`}>
            {getIcon(stat.icon)}
          </div>
          <div>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-xl font-semibold">{stat.value}</p>
            {stat.change && (
              <p className="text-xs text-green-500">{stat.change}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;
