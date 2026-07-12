import { formatCurrency, formatDate, getStatusColor } from '../utils/assetUtils';

export const AssetDetailsCard = ({ asset }) => {
  if (!asset) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{asset.asset_name || asset.assetName}</h2>
          <p className="text-sm text-slate-600">{asset.asset_tag || asset.assetTag}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(asset.status)}`}>{asset.status}</span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div><strong>Category:</strong> {asset.category}</div>
        <div><strong>Serial Number:</strong> {asset.serial_number || asset.serialNumber}</div>
        <div><strong>Location:</strong> {asset.location}</div>
        <div><strong>Condition:</strong> {asset.asset_condition || asset.condition}</div>
        <div><strong>Acquisition Date:</strong> {formatDate(asset.acquisition_date || asset.acquisitionDate)}</div>
        <div><strong>Acquisition Cost:</strong> {formatCurrency(asset.acquisition_cost || asset.acquisitionCost)}</div>
        <div><strong>Bookable:</strong> {asset.bookable ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
};
