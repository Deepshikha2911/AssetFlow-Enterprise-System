const ASSET_STATUSES = ['Available', 'Allocated', 'Reserved', 'Under Maintenance', 'Lost', 'Retired', 'Disposed'];

const validateAssetPayload = (payload) => {
  const errors = {};

  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: { base: 'Payload must be an object.' } };
  }

  const assetName = String(payload.assetName || '').trim();
  const category = String(payload.category || '').trim();
  const serialNumber = String(payload.serialNumber || '').trim();
  const acquisitionDate = String(payload.acquisitionDate || '').trim();
  const acquisitionCost = Number(payload.acquisitionCost || 0);
  const condition = String(payload.condition || '').trim();
  const location = String(payload.location || '').trim();
  const status = String(payload.status || 'Available').trim();

  if (!assetName) errors.assetName = 'Asset name is required.';
  if (!category) errors.category = 'Category is required.';
  if (!serialNumber) errors.serialNumber = 'Serial number is required.';
  if (!acquisitionDate) errors.acquisitionDate = 'Acquisition date is required.';
  if (!condition) errors.condition = 'Condition is required.';
  if (!location) errors.location = 'Location is required.';
  if (!ASSET_STATUSES.includes(status)) errors.status = 'Invalid asset status.';
  if (Number.isNaN(acquisitionCost) || acquisitionCost < 0) errors.acquisitionCost = 'Acquisition cost must be zero or greater.';

  return { valid: Object.keys(errors).length === 0, errors };
};

const normalizeAssetPayload = (payload) => ({
  assetName: String(payload.assetName || '').trim(),
  category: String(payload.category || '').trim(),
  serialNumber: String(payload.serialNumber || '').trim(),
  acquisitionDate: String(payload.acquisitionDate || '').trim(),
  acquisitionCost: Number(payload.acquisitionCost || 0),
  condition: String(payload.condition || '').trim(),
  location: String(payload.location || '').trim(),
  bookable: Boolean(payload.bookable),
  assetPhoto: payload.assetPhoto || null,
  status: String(payload.status || 'Available').trim(),
});

module.exports = {
  ASSET_STATUSES,
  validateAssetPayload,
  normalizeAssetPayload,
};
