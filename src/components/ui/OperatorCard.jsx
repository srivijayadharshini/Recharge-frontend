export default function OperatorCard({ color, logo, name, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br ${color} flex flex-col items-center justify-center text-white rounded-xl p-4 md:p-5 cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl group border border-gray-300`}
    >
      <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-900 rounded-full p-3 mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 border border-gray-300">
        <img src={logo} alt={name} className="w-full h-full object-contain" />
      </div>
      <p className="text-base md:text-lg font-bold mb-1">{name}</p>
      <p className="text-xs md:text-sm text-gray-200">{description}</p>
      <div className="mt-3 md:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs bg-gray-900/50 px-3 py-1 rounded-full border border-gray-300">View Plans →</span>
      </div>
    </div>
  );
}