import Checklist from "./Checklist";

export default function ChecklistBoard() {
  return (
    <div className="w-full p-4 lg:p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <Checklist />
      </div>
    </div>
  );
}
