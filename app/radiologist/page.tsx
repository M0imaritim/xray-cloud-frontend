"use client";

import { useEffect, useState } from "react";
import { DashboardHeader, StatisticsCards } from "./components/dashboard";
import { TreeBrowser } from "./components/tree";
import { FilterPanel, Breadcrumbs, Sidebar } from "./components/navigation";
import { SelectedItemDetails } from "./components/details";
import { ImageViewer } from "./components/images";
import { LoadingSpinner } from "./components/ui";
import { useDataFetching } from "./hooks/useDataFetching";
import { useTreeState } from "./hooks/useTreeState";
import { SelectedItem } from "./types";

export default function RadiologistDashboard() {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("browse"); // browse, images, details

  // Custom hooks for data fetching and tree state management
  const { studies, loading, error, stats, fetchData } = useDataFetching();
  const { openNodes, selectedItem, toggleNode, selectItem } = useTreeState();

  // Handle node selection
  const handleNodeSelect = (type: string, id: string | number) => {
    const item: SelectedItem = {
      id,
      type,
      // You might want to add more properties here depending on your SelectedItem type
      name: `${type} ${id}`,
    };
    selectItem(item);

    // If we're selecting a series and we're not in the images tab, switch to it
    if (type === "series") {
      setActiveTab("images");
    }
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic or API call here
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
    // Implement filter logic or API call here
  };

  // Get statistics for the dashboard
  const getStatistics = () => {
    return [
      {
        title: "Total Hospitals",
        value: stats.hospitals || 0,
        change: "+2%",
        icon: "🏥",
      },
      {
        title: "Total Patients",
        value: stats.patients || 0,
        change: "+5%",
        icon: "👤",
      },
      {
        title: "Total Studies",
        value: stats.studies || 0,
        change: "+2%",
        icon: "📊",
      },
      {
        title: "Total Series",
        value: stats.series || 0,
        change: "+3%",
        icon: "📁",
      },
      {
        title: "Total Instances",
        value: stats.instances || 0,
        change: "+1%",
        icon: "🖼️",
      },
    ];
  };

  // Refresh data
  const handleRefresh = () => {
    fetchData();
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-width duration-300 ease-in-out`}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <DashboardHeader
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          user={null}
        />

        {/* Main content area */}
        <div className="flex h-[calc(100%-64px)]">
          {/* Left panel - Tree browser with filters */}
          <div className="w-1/4 bg-white p-4 border-r overflow-y-auto">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            <Breadcrumbs
              path={
                selectedItem
                  ? [
                      { type: "root", id: "root", label: "All Data" },
                      // Generate breadcrumb path based on selected item
                      {
                        type: selectedItem.type,
                        id: selectedItem.id.toString(),
                        label:
                          selectedItem.name ||
                          `${selectedItem.type} ${selectedItem.id}`,
                      },
                    ]
                  : [{ type: "root", id: "root", label: "All Data" }]
              }
              onNavigate={handleNodeSelect}
            />

            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <TreeBrowser
                data={studies}
                openNodes={openNodes}
                selectedItem={selectedItem}
                onNodeToggle={toggleNode}
                onNodeSelect={handleNodeSelect}
              />
            )}
          </div>

          {/* Right panel - Content based on selected tab */}
          <div className="flex-1 p-4 overflow-y-auto">
            {loading ? (
              <LoadingSpinner />
            ) : activeTab === "browse" ? (
              <>
                <StatisticsCards statistics={getStatistics()} />

                {selectedItem ? (
                  <SelectedItemDetails
                    type={selectedItem.type}
                    id={selectedItem.id.toString()}
                    data={
                      selectedItem.type === "study"
                        ? studies.find(
                            (study) =>
                              study.id.toString() === selectedItem.id.toString()
                          )
                        : null
                    }
                  />
                ) : (
                  <div className="bg-white p-6 rounded-lg shadow-sm mt-4">
                    <h2 className="text-xl font-semibold mb-4">
                      Welcome to Radiologist Dashboard
                    </h2>
                    <p>
                      Select a patient, study, or series from the tree to view
                      details.
                    </p>
                  </div>
                )}
              </>
            ) : activeTab === "images" ? (
              <ImageViewer
                seriesId={
                  selectedItem?.type === "series"
                    ? selectedItem.id.toString()
                    : null
                }
                studyId={
                  selectedItem?.type === "study"
                    ? selectedItem.id.toString()
                    : null
                }
              />
            ) : activeTab === "details" ? (
              <SelectedItemDetails
                type={selectedItem?.type || ""}
                id={selectedItem?.id.toString() || ""}
                data={
                  selectedItem?.type === "study"
                    ? studies.find(
                        (study) =>
                          study.id.toString() === selectedItem.id.toString()
                      )
                    : null
                }
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
