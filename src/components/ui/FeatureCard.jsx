export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-gray-700 hover:shadow-xl transition-shadow duration-300 hover:border-gray-600">
      <div className="text-2xl md:text-3xl mb-3 md:mb-4">{icon}</div>
      <h3 className="text-lg md:text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm md:text-base">{description}</p>
    </div>
  );
}