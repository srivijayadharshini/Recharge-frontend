export default function FeatureRow({ icon, text }) {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-gray-400">{icon}</span>
      <span className="text-gray-300 text-sm md:text-base">{text}</span>
    </div>
  );
}