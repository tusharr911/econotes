import Card from "./Card";

const sampleData = {
  title: "The quick brown fox jumps over the lazy dog",
  tagline: "A quick brown fox jumps over the lazy dog",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel ante nec nisl fermentum luctus..",
};

export default function Foreground() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 px-3 fixed w-full h-full top-20 left-0 z-[3]">
      <Card sampleData={sampleData} />
      <Card sampleData={sampleData} />
      <Card sampleData={sampleData} />
      <Card sampleData={sampleData} />
      <Card sampleData={sampleData} />
      <Card sampleData={sampleData} />
    </div>
  );
}
