import { Study, Stats } from "../types";

/**
 * Calculates statistics from the studies data
 */
export const calculateStats = (studies: Study[]): Stats => {
  if (!studies || studies.length === 0) {
    return {
      hospitals: 0,
      patients: 0,
      studies: 0,
      series: 0,
      instances: 0,
    };
  }

  // For simplicity, we're assuming a single study for the basic stats
  const study = studies[0];

  // Count series and instances
  let seriesCount = study.series ? study.series.length : 0;
  let instanceCount = 0;

  if (study.series) {
    study.series.forEach((series) => {
      instanceCount += series.instances ? series.instances.length : 0;
    });
  }

  return {
    hospitals: 1, // We're only showing one hospital in this view
    patients: 1, // One patient per study in this view
    studies: studies.length,
    series: seriesCount,
    instances: instanceCount,
  };
};

/**
 * Filters studies based on search query
 */
export const filterStudies = (studies: Study[], query: string): Study[] => {
  if (!query || !studies || studies.length === 0) return studies;

  const lowerCaseQuery = query.toLowerCase();

  return studies.filter((study) => {
    // Check if study description matches
    if (study.description.toLowerCase().includes(lowerCaseQuery)) return true;
    if (study.modality.toLowerCase().includes(lowerCaseQuery)) return true;
    if (study.accession_number.toLowerCase().includes(lowerCaseQuery))
      return true;

    // Check if patient name matches
    if (
      study.patient_detail &&
      study.patient_detail.full_name.toLowerCase().includes(lowerCaseQuery)
    )
      return true;

    // Check if hospital name matches
    if (
      study.hospital_detail &&
      study.hospital_detail.name.toLowerCase().includes(lowerCaseQuery)
    )
      return true;

    // Check series
    return study.series.some(
      (series) =>
        series.description.toLowerCase().includes(lowerCaseQuery) ||
        series.body_part_examined.toLowerCase().includes(lowerCaseQuery)
    );
  });
};
