import { useState } from "react";
import Card from "./Card";
import DailogBox from "./components/custom/dailogBox";

const sampleData = {
  id: 1,
  title: "The quick brown fox jumps over the lazy dog",
  tagline: "A quick brown fox jumps over the lazy dog",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel ante nec nisl fermentum luctus..",
};

export default function Foreground() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleEdit = (data) => {
    setSelectedData(data);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <Card sampleData={sampleData} onEdit={handleEdit} />
      </div>
      {selectedData && (
        <DailogBox
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          sampleData={selectedData}
        />
      )}
    </div>
  );
}
