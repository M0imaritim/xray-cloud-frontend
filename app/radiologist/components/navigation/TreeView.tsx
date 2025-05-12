import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Hospital,
  User,
  FileText,
  Layers,
} from "lucide-react";
import { Hospital as HospitalType, Patient, Study, Series } from "../../types";

interface TreeViewProps {
  data: {
    hospitals: HospitalType[];
    patients: Record<string, Patient[]>;
    studies: Record<string, Study[]>;
    series: Record<string, Series[]>;
  };
  filterStudy: (study: Study) => boolean;
  onHospitalSelect: (hospitalId: string) => void;
  onPatientSelect: (patientId: string) => void;
  onStudySelect: (studyId: string) => void;
  onSeriesSelect: (seriesId: string) => void;
}

type ExpandedState = {
  hospitals: Record<string, boolean>;
  patients: Record<string, boolean>;
  studies: Record<string, boolean>;
};

const TreeView: React.FC<TreeViewProps> = ({
  data = { hospitals: [], patients: {}, studies: {}, series: {} },
  filterStudy,
  onHospitalSelect,
  onPatientSelect,
  onStudySelect,
  onSeriesSelect,
}) => {
  const [expanded, setExpanded] = useState<ExpandedState>({
    hospitals: {},
    patients: {},
    studies: {},
  });
  const [selected, setSelected] = useState<string | null>(null);

  const toggleHospital = (hospitalId: string) => {
    setExpanded((prev) => ({
      ...prev,
      hospitals: {
        ...prev.hospitals,
        [hospitalId]: !prev.hospitals[hospitalId],
      },
    }));
    onHospitalSelect(hospitalId);
  };

  const togglePatient = (patientId: string) => {
    setExpanded((prev) => ({
      ...prev,
      patients: {
        ...prev.patients,
        [patientId]: !prev.patients[patientId],
      },
    }));
    onPatientSelect(patientId);
  };

  const toggleStudy = (studyId: string) => {
    setExpanded((prev) => ({
      ...prev,
      studies: {
        ...prev.studies,
        [studyId]: !prev.studies[studyId],
      },
    }));
    onStudySelect(studyId);
  };

  const handleSeriesSelect = (seriesId: string) => {
    setSelected(seriesId);
    onSeriesSelect(seriesId);
  };

  return (
    <div className="tree-view overflow-y-auto max-h-full">
      <ul className="pl-2">
        {data.hospitals?.map((hospital) => (
          <li key={hospital.id} className="mb-1">
            <div
              className="flex items-center p-1 hover:bg-gray-200 cursor-pointer rounded"
              onClick={() => toggleHospital(hospital.id)}
            >
              {expanded.hospitals[hospital.id] ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
              <Hospital size={16} className="ml-1 mr-2" />
              <span>{hospital.name}</span>
            </div>

            {expanded.hospitals[hospital.id] && data.patients[hospital.id] && (
              <ul className="pl-6">
                {data.patients[hospital.id].map((patient) => (
                  <li key={patient.id} className="mb-1">
                    <div
                      className="flex items-center p-1 hover:bg-gray-200 cursor-pointer rounded"
                      onClick={() => togglePatient(patient.id)}
                    >
                      {expanded.patients[patient.id] ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                      <User size={16} className="ml-1 mr-2" />
                      <span>
                        {patient.name} ({patient.age}, {patient.gender})
                      </span>
                    </div>

                    {expanded.patients[patient.id] &&
                      data.studies[patient.id] && (
                        <ul className="pl-6">
                          {data.studies[patient.id]
                            .filter(filterStudy)
                            .map((study) => (
                              <li key={study.id} className="mb-1">
                                <div
                                  className="flex items-center p-1 hover:bg-gray-200 cursor-pointer rounded"
                                  onClick={() => toggleStudy(study.id)}
                                >
                                  {expanded.studies[study.id] ? (
                                    <ChevronDown size={16} />
                                  ) : (
                                    <ChevronRight size={16} />
                                  )}
                                  <FileText size={16} className="ml-1 mr-2" />
                                  <span>
                                    {study.description} ({study.modality}) -{" "}
                                    {study.date}
                                  </span>
                                </div>

                                {expanded.studies[study.id] &&
                                  data.series[study.id] && (
                                    <ul className="pl-6">
                                      {data.series[study.id].map((series) => (
                                        <li key={series.id} className="mb-1">
                                          <div
                                            className={`flex items-center p-1 hover:bg-gray-200 cursor-pointer rounded ${
                                              selected === series.id
                                                ? "bg-blue-100"
                                                : ""
                                            }`}
                                            onClick={() =>
                                              handleSeriesSelect(series.id)
                                            }
                                          >
                                            <Layers
                                              size={16}
                                              className="ml-1 mr-2"
                                            />
                                            <span>
                                              {series.description} (
                                              {series.numberOfInstances} images)
                                            </span>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                              </li>
                            ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TreeView;
