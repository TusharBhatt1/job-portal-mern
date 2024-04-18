export default function Button({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="border-none px-4 py-2 rounded-md text-center bg-blue-500 hover:bg-blue-700 text-white"
    >
      {title}
    </button>
  );
}
