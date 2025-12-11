interface ArchetypeCardProps {
  archetypeName: string;
  description: string;
}

export function ArchetypeCard({ archetypeName, description }: ArchetypeCardProps) {
  return (
    <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-4 border-primary-500">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-8 h-8">
          <img src="/favicon.png" alt="DealWars" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-2xl font-bold text-primary-900">{archetypeName}</h3>
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium text-justify">{description}</p>
      </div>
    </div>
  );
}
