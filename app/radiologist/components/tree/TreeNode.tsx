import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { TreeNodeProps } from "../../types";

const TreeNode: React.FC<TreeNodeProps> = ({
  label,
  id,
  type,
  isOpen,
  onToggle,
  onSelect,
  isSelected,
  count,
  icon: Icon,
}) => {
  return (
    <div className="mb-1">
      <div
        className={`flex items-center p-2 rounded hover:bg-gray-100 ${
          isSelected ? "bg-blue-100" : ""
        }`}
        onClick={() => {
          onSelect({ id, type });
        }}
      >
        {count > 0 ? (
          <button
            className="mr-1 text-gray-500 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              onToggle(id);
            }}
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <div className="w-4 mr-1" />
        )}

        <Icon size={16} className="mr-2 text-gray-600" />
        <span className="text-sm flex-grow truncate">{label}</span>
        {count > 0 && (
          <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5">
            {count}
          </span>
        )}
      </div>
    </div>
  );
};

export default TreeNode;
