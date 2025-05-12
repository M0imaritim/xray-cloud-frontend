import React from "react";
import { Hospital, Patient, Study, Series, Instance } from "../../types";
import HospitalDetails from "./HospitalDetails";
import PatientDetails from "./PatientDetails";
import StudyDetails from "./StudyDetails";
import SeriesDetails from "./SeriesDetails";
import InstanceDetails from "./InstanceDetails";

interface SelectedItemDetailsProps {
  selectedItem: Hospital | Patient | Study | Series | Instance | null;
  itemType?: "hospital" | "patient" | "study" | "series" | "instance";
}

const SelectedItemDetails: React.FC<SelectedItemDetailsProps> = ({
  selectedItem,
  itemType,
}) => {
  if (!selectedItem) {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-center">
          Select an item to view details
        </p>
      </div>
    );
  }

  // Determine the type of item if not explicitly provided
  let type = itemType;
  if (!type) {
    if ("patients" in selectedItem) {
      type = "hospital";
    } else if ("studies" in selectedItem) {
      type = "patient";
    } else if ("series" in selectedItem) {
      type = "study";
    } else if ("instances" in selectedItem) {
      type = "series";
    } else {
      type = "instance";
    }
  }

  return (
    <div className="p-4 h-full overflow-auto">
      {type === "hospital" && (
        <HospitalDetails hospital={selectedItem as Hospital} />
      )}
      {type === "patient" && (
        <PatientDetails patient={selectedItem as Patient} />
      )}
      {type === "study" && <StudyDetails study={selectedItem as Study} />}
      {type === "series" && <SeriesDetails series={selectedItem as Series} />}
      {type === "instance" && (
        <InstanceDetails instance={selectedItem as Instance} />
      )}
    </div>
  );
};

export default SelectedItemDetails;
