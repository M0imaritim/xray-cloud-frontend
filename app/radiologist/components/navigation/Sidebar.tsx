import React, { useState, useEffect } from "react";
// import {
//   fetchHospitals,
//   fetchPatients,
//   fetchStudies,
//   fetchSeries,
// } from "../../api/hospitalApi";
import TreeView from "./TreeView";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import { Hospital, Patient, Study, Series } from "../../types";

interface SidebarProps {
  onSelectSeries: (seriesId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectSeries }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [patients, setPatients] = useState<Record<string, Patient[]>>({});
  const [studies, setStudies] = useState<Record<string, Study[]>>({});
  const [series, setSeries] = useState<Record<string, Series[]>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    modalityFilter: "",
    dateRangeStart: "",
    dateRangeEnd: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch hospitals on component mount
  useEffect(() => {
    const loadHospitals = async () => {
      try {
        setLoading(true);
        const data = await fetchHospitals();
        setHospitals(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch hospitals");
        setLoading(false);
      }
    };

    loadHospitals();
  }, []);

  const handleHospitalSelect = async (hospitalId: string) => {
    if (patients[hospitalId]) return; // Already loaded

    try {
      const patientData = await fetchPatients(hospitalId);
      setPatients((prev) => ({
        ...prev,
        [hospitalId]: patientData,
      }));
    } catch (error) {
      setError(`Failed to fetch patients for hospital ${hospitalId}`);
    }
  };

  const handlePatientSelect = async (patientId: string) => {
    if (studies[patientId]) return; // Already loaded

    try {
      const studyData = await fetchStudies(patientId);
      setStudies((prev) => ({
        ...prev,
        [patientId]: studyData,
      }));
    } catch (error) {
      setError(`Failed to fetch studies for patient ${patientId}`);
    }
  };

  const handleStudySelect = async (studyId: string) => {
    if (series[studyId]) return; // Already loaded

    try {
      const seriesData = await fetchSeries(studyId);
      setSeries((prev) => ({
        ...prev,
        [studyId]: seriesData,
      }));
    } catch (error) {
      setError(`Failed to fetch series for study ${studyId}`);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters: {
    modalityFilter: string;
    dateRangeStart: string;
    dateRangeEnd: string;
  }) => {
    setFilters(newFilters);
  };

  // Apply search and filters to the data
  const filteredData = {
    hospitals: hospitals.filter((hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    patients,
    studies,
    series,
  };

  // Filter studies by modality and date range if filters are set
  const filterStudy = (study: Study): boolean => {
    const matchesModality =
      !filters.modalityFilter ||
      study.modality.toLowerCase() === filters.modalityFilter.toLowerCase();

    const studyDate = new Date(study.date);
    const startDate = filters.dateRangeStart
      ? new Date(filters.dateRangeStart)
      : null;
    const endDate = filters.dateRangeEnd
      ? new Date(filters.dateRangeEnd)
      : null;

    const matchesDateRange =
      (!startDate || studyDate >= startDate) &&
      (!endDate || studyDate <= endDate);

    return matchesModality && matchesDateRange;
  };

  return (
    <div className="sidebar w-64 h-full bg-gray-100 border-r">
      <div className="p-4">
        <SearchBar onSearch={handleSearch} />
        <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {loading ? (
        <div className="p-4">Loading...</div>
      ) : error ? (
        <div className="p-4 text-red-500">{error}</div>
      ) : (
        <TreeView
          data={filteredData}
          filterStudy={filterStudy}
          onHospitalSelect={handleHospitalSelect}
          onPatientSelect={handlePatientSelect}
          onStudySelect={handleStudySelect}
          onSeriesSelect={onSelectSeries}
        />
      )}
    </div>
  );
};

export default Sidebar;
