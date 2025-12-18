export default function ContactItem({ icon, title, detail, subdetail }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="text-2xl text-gray-300">{icon}</div>
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-gray-300">{detail}</p>
        <p className="text-sm text-gray-500 mt-1">{subdetail}</p>
      </div>
    </div>
  );
}