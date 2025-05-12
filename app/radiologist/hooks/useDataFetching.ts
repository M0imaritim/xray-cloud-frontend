import { useState, useCallback, useEffect } from "react";
import { Study, Stats } from "../types";
import apiService from "../../utils/apiServices";

interface DataFetchingState {
  studies: Study[];
  loading: boolean;
  error: string | null;
  stats: Stats;
  fetchData: () => Promise<void>;
}

/**
 * Custom hook for fetching and managing data
 */
export const useDataFetching = (): DataFetchingState => {
  // State for studies data
  const [studies, setStudies] = useState<Study[]>([]);

  // Loading state
  const [loading, setLoading] = useState<boolean>(true);

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Statistics state
  const [stats, setStats] = useState<Stats>({
    hospitals: 0,
    patients: 0,
    studies: 0,
    series: 0,
    instances: 0,
  });

  /**
   * Function to fetch data from the backend
   */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Replace with your actual API endpoint
      const response = await apiService.get("/api/studies/studies/");

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      setStudies(data.studies || []);

      // Calculate stats from the fetched data
      const statsData = calculateStats(data.studies || []);
      setStats(statsData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Calculate statistics from studies data
   */
  const calculateStats = (studiesData: Study[]): Stats => {
    // Count unique patients
    const uniquePatientIds = new Set();
    studiesData.forEach((study) => {
      if (study.patient?.id) {
        uniquePatientIds.add(study.patient.id.toString());
      }
    });

    // Count series and instances
    let seriesCount = 0;
    let instanceCount = 0;

    studiesData.forEach((study) => {
      if (study.series) {
        seriesCount += study.series.length;

        study.series.forEach((series) => {
          if (series.instances) {
            instanceCount += series.instances.length;
          } else if (series.numberOfInstances) {
            instanceCount += series.numberOfInstances;
          }
        });
      }
    });

    // For hospitals, you might need to implement a similar logic based on your data structure
    // This is just a placeholder assuming one hospital per patient
    const hospitalCount = Math.min(uniquePatientIds.size, 10); // Arbitrary cap for demo

    return {
      hospitals: hospitalCount,
      patients: uniquePatientIds.size,
      studies: studiesData.length,
      series: seriesCount,
      instances: instanceCount,
    };
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    studies,
    loading,
    error,
    stats,
    fetchData,
  };
};
