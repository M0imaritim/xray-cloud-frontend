import React from "react";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  id: string;
  label: string;
  type: "hospital" | "patient" | "study" | "series" | "instance";
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onBreadcrumbClick: (item: BreadcrumbItem) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onBreadcrumbClick,
}) => {
  if (!items || items.length === 0) {
    return <div className="h-10 flex items-center px-4">No selection</div>;
  }

  return (
    <div className="flex items-center h-10 px-4 overflow-x-auto whitespace-nowrap">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={item.id}>
            <div
              className={`
                flex items-center 
                ${
                  isLast
                    ? "font-medium"
                    : "text-blue-500 hover:underline cursor-pointer"
                }
              `}
              onClick={() => !isLast && onBreadcrumbClick(item)}
            >
              <span>{item.label}</span>
            </div>

            {!isLast && (
              <ChevronRight size={16} className="mx-2 text-gray-400" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
