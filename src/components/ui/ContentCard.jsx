export default function ContentCard({ title, content, image }) {
  return (
    <div className="bg-gray-800/60 backdrop-blur-lg shadow-xl p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl flex flex-col md:flex-row items-center gap-6 md:gap-8 border border-gray-700">
      {image && (
        <div className="flex-shrink-0 w-full md:w-auto">
          <img
            src={image}
            alt={title}
            className="w-full md:w-56 lg:w-64 h-48 md:h-56 object-cover rounded-xl shadow-lg border border-gray-600"
          />
        </div>
      )}

      <div className="flex-1">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-white">{title}</h3>
        <div className="text-gray-300 text-base md:text-lg leading-relaxed">{content}</div>
      </div>
    </div>
  );
}