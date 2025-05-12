import { useState, useCallback } from "react";
import { TreeState, SelectedItem } from "../types";

/**
 * Custom hook for managing tree state and node selection
 */
export const useTreeState = (): TreeState => {
  // State for open/expanded nodes
  const [openNodes, setOpenNodes] = useState<(string | number)[]>([]);

  // State for the currently selected item
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  /**
   * Toggle the expansion state of a node
   */
  const toggleNode = useCallback((id: string | number) => {
    setOpenNodes((prevOpenNodes) => {
      const idStr = id.toString();
      const isOpen = prevOpenNodes.some(
        (nodeId) => nodeId.toString() === idStr
      );

      if (isOpen) {
        // Close the node - remove it from openNodes
        return prevOpenNodes.filter((nodeId) => nodeId.toString() !== idStr);
      } else {
        // Open the node - add it to openNodes
        return [...prevOpenNodes, id];
      }
    });
  }, []);

  /**
   * Select an item in the tree
   */
  const selectItem = useCallback((item: SelectedItem) => {
    setSelectedItem(item);

    // If selecting a new item that has a parent, make sure the parent nodes are open
    // This is just a basic implementation - you may need to enhance this based on your data structure
    if (item.type === "series") {
      // For series, we might want to ensure its parent study is open
      // This would require knowledge of the parent-child relationships
      // You'll need to implement this based on your data structure
    }
  }, []);

  return {
    openNodes,
    selectedItem,
    toggleNode,
    selectItem,
  };
};
