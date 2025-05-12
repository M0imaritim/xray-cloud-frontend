import { useState, useEffect } from "react";
import { Study, Stats } from "../types";
import apiService from "../../utils/apiServices";
import { calculateStats } from "../utils/dataTransformers";

interface DataFetchingResult {
  studies: Study[];
  loading: boolean;
  error: string | null;
  stats: Stats;
  fetchData: () => Promise<void>;
}

export const useDataFetching = (): DataFetchingResult => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    hospitals: 0,
    patients: 0,
    studies: 0,
    series: 0,
    instances: 0,
  });

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Make the API call to your backend
      const response = await apiService.get("/api/studies/studies/");

      // Process the data
      const studiesData = Array.isArray(response) ? response : [response];
      setStudies(studiesData);

      // Calculate statistics
      const newStats = calculateStats(studiesData);
      setStats(newStats);

      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to fetch dashboard data");
      setLoading(false);
    }
  };

  // Fetch data on hook initialization
  useEffect(() => {
    fetchData();
  }, []);

  return { studies, loading, error, stats, fetchData };
};

export default useDataFetching;
