export const AssetForm = ({ initialValues = {}, onSubmit, isSubmitting = false }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      assetName: formData.get('assetName')?.toString().trim(),
      category: formData.get('category')?.toString().trim(),
      serialNumber: formData.get('serialNumber')?.toString().trim(),
      acquisitionDate: formData.get('acquisitionDate')?.toString().trim(),
      acquisitionCost: formData.get('acquisitionCost')?.toString().trim(),
      condition: formData.get('condition')?.toString().trim(),
      location: formData.get('location')?.toString().trim(),
      bookable: formData.get('bookable') === 'yes',
      status: formData.get('status')?.toString().trim() || 'Available',
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Asset Name</label>
          <input name="assetName" defaultValue={initialValues.assetName || ''} className="w-full rounded-lg border border-slate-300 px-3 py-2" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Category</label>
          <input name="category" defaultValue={initialValues.category || ''} className="w-full rounded-lg border border-slate-300 px-3 py-2" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Serial Number</label>
          <input name="serialNumber" defaultValue={initialValues.serialNumber || ''} className="w-full rounded-lg border border-slate-300 px-3 py-2" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Acquisition Date</label>
          <input type="date" name="acquisitionDate" defaultValue={initialValues.acquisitionDate || ''} className="w-full rounded-lg border border-slate-300 px-3 py-2" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Acquisition Cost</label>
          <input type="number" step="0.01" name="acquisitionCost" defaultValue={initialValues.acquisitionCost || ''} className="w-full rounded-lg border border-slate-300 px-3 py-2" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Condition</label>
          <select name="condition" defaultValue={initialValues.condition || 'Good'} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Location</label>
          <input name="location" defaultValue={initialValues.location || ''} className="w-full rounded-lg border border-slate-300 px-3 py-2" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Status</label>
          <select name="status" defaultValue={initialValues.status || 'Available'} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            <option value="Available">Available</option>
            <option value="Allocated">Allocated</option>
            <option value="Reserved">Reserved</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Lost">Lost</option>
            <option value="Retired">Retired</option>
            <option value="Disposed">Disposed</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Bookable</label>
          <select name="bookable" defaultValue={initialValues.bookable ? 'yes' : 'no'} className="w-full rounded-lg border border-slate-300 px-3 py-2">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="rounded-lg bg-slate-900 px-4 py-2 text-white disabled:opacity-60">
        {isSubmitting ? 'Saving...' : 'Save Asset'}
      </button>
    </form>
  );
};
