import React, { useState } from "react";
import { Filter } from "lucide-react";

interface FilterPanelProps {
  filters: {
    modalityFilter: string;
    dateRangeStart: string;
    dateRangeEnd: string;
  };
  onFilterChange: (filters: {
    modalityFilter: string;
    dateRangeStart: string;
    dateRangeEnd: string;
  }) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleModalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      modalityFilter: e.target.value,
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      modalityFilter: "",
      dateRangeStart: "",
      dateRangeEnd: "",
    });
  };

  return (
    <div className="filter-panel mb-4 border rounded p-3 bg-white">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex items-center">
          <Filter size={16} className="mr-2" />
          <span className="font-medium">Filters</span>
        </div>
        <span className="text-xs text-blue-500">
          {expanded ? "Hide" : "Show"}
        </span>
      </div>

      {expanded && (
        <div className="mt-3">
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Modality</label>
            <select
              className="w-full p-2 border rounded"
              value={filters.modalityFilter}
              onChange={handleModalityChange}
            >
              <option value="">All Modalities</option>
              <option value="CT">CT</option>
              <option value="MRI">MRI</option>
              <option value="X-Ray">X-Ray</option>
              <option value="Ultrasound">Ultrasound</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <div className="flex space-x-2">
              <div>
                <label className="block text-xs text-gray-500">From</label>
                <input
                  type="date"
                  name="dateRangeStart"
                  className="w-full p-2 border rounded"
                  value={filters.dateRangeStart}
                  onChange={handleDateChange}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500">To</label>
                <input
                  type="date"
                  name="dateRangeEnd"
                  className="w-full p-2 border rounded"
                  value={filters.dateRangeEnd}
                  onChange={handleDateChange}
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="text-sm text-blue-500 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
