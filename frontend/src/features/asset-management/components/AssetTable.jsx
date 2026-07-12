import { formatCurrency, formatDate, getStatusColor } from '../utils/assetUtils';

export const AssetTable = ({ assets = [], onEdit, onDelete }) => (
  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
    <table className="min-w-full text-sm">
      <thead className="bg-slate-50 text-left">
        <tr>
          <th className="px-4 py-3">Asset Tag</th>
          <th className="px-4 py-3">Name</th>
          <th className="px-4 py-3">Category</th>
          <th className="px-4 py-3">Location</th>
          <th className="px-4 py-3">Condition</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => (
          <tr key={asset.id} className="border-t border-slate-100">
            <td className="px-4 py-3 font-medium">{asset.asset_tag || asset.assetTag}</td>
            <td className="px-4 py-3">{asset.asset_name || asset.assetName}</td>
            <td className="px-4 py-3">{asset.category}</td>
            <td className="px-4 py-3">{asset.location}</td>
            <td className="px-4 py-3">{asset.asset_condition || asset.condition}</td>
            <td className="px-4 py-3">
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(asset.status)}`}>
                {asset.status}
              </span>
            </td>
            <td className="px-4 py-3">
              <div className="flex gap-2">
                <button onClick={() => onEdit(asset)} className="rounded bg-blue-600 px-2 py-1 text-white">Edit</button>
                <button onClick={() => onDelete(asset.id)} className="rounded bg-red-600 px-2 py-1 text-white">Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
