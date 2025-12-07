interface ArchetypeCardProps {
  archetypeName: string;
  description: string;
}

export function ArchetypeCard({ archetypeName, description }: ArchetypeCardProps) {
  return (
    <div className="card bg-gradient-to-br from-primary-50 to-blue-50 border-2 border-primary-200">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold">
          {archetypeName.charAt(0)}
        </div>
        <h3 className="text-2xl font-bold text-primary-900">{archetypeName}</h3>
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">{description}</p>
      </div>
    </div>
  );
}
