import React from "react";
import { Hospital, Folder, FileImage, User } from "lucide-react";
import TreeNode from "./TreeNode";
import { TreeBrowserProps, Study, Series, Patient } from "../../types";

const TreeBrowser: React.FC<TreeBrowserProps> = ({
  data,
  openNodes,
  selectedItem,
  onNodeToggle,
  onNodeSelect,
}) => {
  // Helper function to get the appropriate icon based on node type
  const getNodeIcon = (type: string) => {
    switch (type) {
      case "hospital":
        return Hospital;
      case "patient":
        return User;
      case "study":
        return Folder;
      case "series":
        return FileImage;
      default:
        return Folder;
    }
  };

  // Render a study node with its series
  const renderStudy = (study: Study) => {
    const isOpen = openNodes.includes(study.id.toString());
    const isSelected =
      selectedItem?.type === "study" &&
      selectedItem.id.toString() === study.id.toString();

    return (
      <div key={`study-${study.id}`} className="ml-2">
        <TreeNode
          label={study.description || `Study ${study.id}`}
          id={study.id}
          type="study"
          isOpen={isOpen}
          onToggle={onNodeToggle}
          onSelect={onNodeSelect}
          isSelected={isSelected}
          count={study.series?.length || 0}
          icon={getNodeIcon("study")}
        />

        {isOpen && study.series && study.series.length > 0 && (
          <div className="ml-4">
            {study.series.map((series) => renderSeries(series))}
          </div>
        )}
      </div>
    );
  };

  // Render a series node
  const renderSeries = (series: Series) => {
    const isSelected =
      selectedItem?.type === "series" &&
      selectedItem.id.toString() === series.id.toString();

    return (
      <TreeNode
        key={`series-${series.id}`}
        label={series.description || `Series ${series.id}`}
        id={series.id}
        type="series"
        isOpen={false}
        onToggle={() => {}} // Series don't toggle
        onSelect={onNodeSelect}
        isSelected={isSelected}
        count={0} // Series don't have children
        icon={getNodeIcon("series")}
      />
    );
  };

  // Render a patient with their studies
  const renderPatient = (patient: Patient) => {
    const isOpen = openNodes.includes(patient.id.toString());
    const isSelected =
      selectedItem?.type === "patient" &&
      selectedItem.id.toString() === patient.id.toString();

    const patientStudies = data.filter(
      (study) => study.patient?.id === patient.id
    );

    return (
      <div key={`patient-${patient.id}`} className="ml-2">
        <TreeNode
          label={patient.name || `Patient ${patient.id}`}
          id={patient.id}
          type="patient"
          isOpen={isOpen}
          onToggle={onNodeToggle}
          onSelect={onNodeSelect}
          isSelected={isSelected}
          count={patientStudies.length}
          icon={getNodeIcon("patient")}
        />

        {isOpen && patientStudies.length > 0 && (
          <div className="ml-4">
            {patientStudies.map((study) => renderStudy(study))}
          </div>
        )}
      </div>
    );
  };

  // Get unique patients from studies
  const getUniquePatients = (): Patient[] => {
    const patientsMap = new Map();

    data.forEach((study) => {
      if (study.patient && !patientsMap.has(study.patient.id)) {
        patientsMap.set(study.patient.id, study.patient);
      }
    });

    return Array.from(patientsMap.values());
  };

  const patients = getUniquePatients();

  return (
    <div className="tree-browser">
      <h3 className="text-lg font-medium mb-2">Data Browser</h3>

      {patients.length > 0 ? (
        patients.map((patient) => renderPatient(patient))
      ) : data.length > 0 ? (
        // If there are studies but no patients, render studies directly
        data.map((study) => renderStudy(study))
      ) : (
        <div className="text-gray-500 text-sm">No data available</div>
      )}
    </div>
  );
};

export default TreeBrowser;
