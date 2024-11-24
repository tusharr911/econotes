export default function Card({ sampleData }) {
  return (
    <div className="flex-shrink-0 relative w-64 h-80 rounded-3xl text-white py-8 px-6 overflow-hidden bg-zinc-900 bg-opacity-90 shadow-lg">
      <div className="flex justify-between items-center">
        <span className="cursor-pointer text-lg">✏️</span>
        <span className="cursor-pointer text-xl">❌</span>
      </div>

      <h2 className="text-lg font-bold mb-2">{sampleData.title}</h2>

      <p className="text-sm italic mb-4 text-gray-300">{sampleData.tagline}</p>

      <p className="text-sm leading-tight text-white">{sampleData.body}</p>

      <div className="footer absolute w-full bottom-0 left-0 px-6 py-3">
        <div className="flex justify-between items-center">
          <h5 className="text-xs text-gray-400">{sampleData.date}</h5>
        </div>
        <div className="tag w-full py-5 flex justify-center items-center">
          <h3 className="text-sm font-semibold cursor-pointer">Pin</h3>
        </div>
      </div>
    </div>
  );
}
