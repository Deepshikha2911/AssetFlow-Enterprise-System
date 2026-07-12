import { useEffect, useState } from 'react';
import { AssetForm } from '../components/AssetForm';
import { AssetTable } from '../components/AssetTable';
import { assetService } from '../services/assetService';

export const AssetManagementPage = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadAssets = async () => {
    const result = await assetService.listAssets({ search, category, status, location });
    if (result.success) {
      setAssets(result.data || []);
    }
  };

  useEffect(() => {
    loadAssets();
  }, [search, category, status, location]);

  const handleSubmit = async (payload) => {
    setIsSubmitting(true);
    const result = selectedAsset
      ? await assetService.updateAsset(selectedAsset.id, payload)
      : await assetService.createAsset(payload);
    setIsSubmitting(false);
    if (result.success) {
      setSelectedAsset(null);
      loadAssets();
    }
  };

  const handleDelete = async (id) => {
    const result = await assetService.deleteAsset(id);
    if (result.success) {
      loadAssets();
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Asset Management</h1>
          <p className="text-sm text-slate-600">Register, search, edit, and manage assets.</p>
        </div>
      </div>

      <AssetForm initialValues={selectedAsset || {}} onSubmit={handleSubmit} isSubmitting={isSubmitting} />

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 grid gap-3 md:grid-cols-4">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by tag, name, serial" className="rounded-lg border border-slate-300 px-3 py-2" />
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="rounded-lg border border-slate-300 px-3 py-2" />
          <input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" className="rounded-lg border border-slate-300 px-3 py-2" />
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="rounded-lg border border-slate-300 px-3 py-2" />
        </div>
        <AssetTable assets={assets} onEdit={setSelectedAsset} onDelete={handleDelete} />
      </div>
    </div>
  );
};
