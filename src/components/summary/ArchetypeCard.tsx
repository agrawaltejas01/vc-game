interface ArchetypeCardProps {
  archetypeName: string;
  description: string;
}

export function ArchetypeCard({ archetypeName, description }: ArchetypeCardProps) {
  return (
    <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-4 border-primary-500">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 text-white rounded-full text-2xl font-bold shadow-md">
          {archetypeName.charAt(0)}
        </div>
        <h3 className="text-2xl font-bold text-primary-900">{archetypeName}</h3>
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium">{description}</p>
      </div>
    </div>
  );
}
