export const generateAssetTag = (lastTag = null) => {
  const nextNumber = lastTag ? Number(String(lastTag).split('-')[1] || 0) + 1 : 1;
  return `AF-${String(nextNumber).padStart(4, '0')}`;
};

export const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (value) => {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('en-US');
};

export const getStatusColor = (status) => {
  const colors = {
    Available: 'bg-green-100 text-green-700',
    Allocated: 'bg-blue-100 text-blue-700',
    Reserved: 'bg-yellow-100 text-yellow-700',
    'Under Maintenance': 'bg-orange-100 text-orange-700',
    Lost: 'bg-red-100 text-red-700',
    Retired: 'bg-gray-100 text-gray-700',
    Disposed: 'bg-purple-100 text-purple-700',
  };
  return colors[status] || 'bg-slate-100 text-slate-700';
};
