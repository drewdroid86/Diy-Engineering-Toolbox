
interface ResultDisplayProps {
  label: string;
  value: string;
  unit?: string;
}

export const ResultDisplay = ({ label, value, unit }: ResultDisplayProps) => {
  return (
    <div className="mt-8 p-6 bg-accent/10 border border-accent/20 rounded-xl text-center">
      <p className="text-sm font-medium text-accent uppercase tracking-widest mb-1">{label}</p>
      <p className="text-4xl font-bold">{value} {unit}</p>
    </div>
  );
};
