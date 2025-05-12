import React from "react";
import {
  RefreshCw,
  Hospital as HospitalIcon,
  User,
  FileText,
  Layers,
} from "lucide-react";
import TreeNode from "./TreeNode";
import { Hospital, Patient, Study, SelectedItem } from "../../types";

interface TreeBrowserProps {
  hospital: Hospital;
  patient: Patient;
  study: Study;
  openNodes: Record<string | number, boolean>;
  selectedItem: SelectedItem | null;
  onToggleNode: (id: string | number) => void;
  onSelectItem: (item: SelectedItem) => void;
  onRefresh: () => void;
}

const TreeBrowser: React.FC<TreeBrowserProps> = ({
  hospital,
  patient,
  study,
  openNodes,
  selectedItem,
  onToggleNode,
  onSelectItem,
  onRefresh,
}) => {
  return (
    <div className="w-full md:w-64 lg:w-72 bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-gray-700">PACS Browser</h2>
        <button
          onClick={onRefresh}
          className="text-gray-500 hover:text-indigo-600"
          title="Refresh data"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Tree browser */}
      <div className="overflow-y-auto max-h-96">
        {/* Hospital Node */}
        <TreeNode
          label={hospital.name}
          id={hospital.id}
          type="hospital"
          isOpen={openNodes[hospital.id]}
          onToggle={onToggleNode}
          onSelect={onSelectItem}
          isSelected={
            selectedItem?.id === hospital.id &&
            selectedItem?.type === "hospital"
          }
          count={1} // One patient in this view
          icon={HospitalIcon}
        />

        {openNodes[hospital.id] && (
          <div className="pl-6">
            {/* Patient Node */}
            <TreeNode
              label={patient.full_name}
              id={patient.id}
              type="patient"
              isOpen={openNodes[patient.id]}
              onToggle={onToggleNode}
              onSelect={onSelectItem}
              isSelected={
                selectedItem?.id === patient.id &&
                selectedItem?.type === "patient"
              }
              count={1} // One study in this view
              icon={User}
            />

            {openNodes[patient.id] && (
              <div className="pl-6">
                {/* Study Node */}
                <TreeNode
                  label={study.description}
                  id={study.id}
                  type="study"
                  isOpen={openNodes[study.id]}
                  onToggle={onToggleNode}
                  onSelect={onSelectItem}
                  isSelected={
                    selectedItem?.id === study.id &&
                    selectedItem?.type === "study"
                  }
                  count={study.series.length}
                  icon={FileText}
                />

                {openNodes[study.id] && (
                  <div className="pl-6">
                    {/* Series Nodes */}
                    {study.series.map((series) => (
                      <TreeNode
                        key={series.id}
                        label={series.description}
                        id={series.id}
                        type="series"
                        isOpen={openNodes[series.id]}
                        onToggle={onToggleNode}
                        onSelect={onSelectItem}
                        isSelected={
                          selectedItem?.id === series.id &&
                          selectedItem?.type === "series"
                        }
                        count={series.number_of_instances}
                        icon={Layers}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeBrowser;
