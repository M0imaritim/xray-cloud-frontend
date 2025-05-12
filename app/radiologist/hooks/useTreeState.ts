import { useState } from "react";
import { SelectedItem } from "../types";

interface TreeState {
  openNodes: Record<string | number, boolean>;
  selectedItem: SelectedItem | null;
  toggleNode: (id: string | number) => void;
  selectItem: (item: SelectedItem) => void;
}

export const useTreeState = (): TreeState => {
  const [openNodes, setOpenNodes] = useState<Record<string | number, boolean>>(
    {}
  );
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  const toggleNode = (id: string | number) => {
    setOpenNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectItem = (item: SelectedItem) => {
    setSelectedItem(item);

    // Automatically open the node when selected
    if (item && !openNodes[item.id]) {
      toggleNode(item.id);
    }
  };

  return {
    openNodes,
    selectedItem,
    toggleNode,
    selectItem,
  };
};

export default useTreeState;
