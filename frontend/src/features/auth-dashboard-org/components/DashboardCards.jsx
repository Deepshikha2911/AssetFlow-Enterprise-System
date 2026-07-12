function DashboardCards() {
  const cards = [
    {
      title: 'Total Employees',
      value: '150',
      description: 'Employees in organization',
      icon: '👥',
      color: 'bg-blue-600',
    },
    {
      title: 'Departments',
      value: '8',
      description: 'Active departments',
      icon: '🏢',
      color: 'bg-emerald-600',
    },
    {
      title: 'Asset Categories',
      value: '12',
      description: 'Available categories',
      icon: '📦',
      color: 'bg-amber-500',
    },
    {
      title: 'Total Assets',
      value: '325',
      description: 'Registered assets',
      icon: '💻',
      color: 'bg-violet-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:shadow-lg"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">{card.title}</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">{card.value}</h2>
              <p className="mt-2 text-sm text-slate-500">{card.description}</p>
            </div>

            <div className={`${card.color} flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;