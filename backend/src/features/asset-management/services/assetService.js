const { normalizeAssetPayload, validateAssetPayload } = require('../validators/assetValidator');

const generateAssetTag = async (db) => {
  const rows = await db.query('SELECT asset_tag FROM assets WHERE deleted_at IS NULL ORDER BY id DESC LIMIT 1');
  const lastTag = rows && rows[0] ? rows[0].asset_tag : null;
  const lastNumber = lastTag ? Number(String(lastTag).split('-')[1] || 0) : 0;
  return `AF-${String(lastNumber + 1).padStart(4, '0')}`;
};

const createAsset = async (db, payload) => {
  const { valid, errors } = validateAssetPayload(payload);
  if (!valid) {
    const error = new Error('Validation failed');
    error.statusCode = 400;
    error.details = errors;
    throw error;
  }

  const asset = normalizeAssetPayload(payload);
  const assetTag = await generateAssetTag(db);

  const result = await db.query(
    `INSERT INTO assets (asset_tag, asset_name, category, serial_number, acquisition_date, acquisition_cost, asset_condition, location, bookable, asset_photo, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [assetTag, asset.assetName, asset.category, asset.serialNumber, asset.acquisitionDate, asset.acquisitionCost, asset.condition, asset.location, asset.bookable ? 1 : 0, asset.assetPhoto, asset.status]
  );

  return { id: result.insertId, assetTag, ...asset };
};

const listAssets = async (db, filters = {}) => {
  const { search = '', category = '', status = '', location = '' } = filters;
  let query = 'SELECT * FROM assets WHERE deleted_at IS NULL';
  const values = [];

  if (search) {
    query += ' AND (asset_tag LIKE ? OR asset_name LIKE ? OR serial_number LIKE ?)';
    const term = `%${search}%`;
    values.push(term, term, term);
  }
  if (category) {
    query += ' AND category = ?';
    values.push(category);
  }
  if (status) {
    query += ' AND status = ?';
    values.push(status);
  }
  if (location) {
    query += ' AND location = ?';
    values.push(location);
  }

  query += ' ORDER BY created_at DESC';
  return db.query(query, values);
};

const getAssetById = async (db, id) => {
  const rows = await db.query('SELECT * FROM assets WHERE id = ? AND deleted_at IS NULL LIMIT 1', [id]);
  return rows[0] || null;
};

const updateAsset = async (db, id, payload) => {
  const { valid, errors } = validateAssetPayload(payload);
  if (!valid) {
    const error = new Error('Validation failed');
    error.statusCode = 400;
    error.details = errors;
    throw error;
  }

  const asset = normalizeAssetPayload(payload);
  await db.query(
    `UPDATE assets SET asset_name = ?, category = ?, serial_number = ?, acquisition_date = ?, acquisition_cost = ?, asset_condition = ?, location = ?, bookable = ?, asset_photo = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [asset.assetName, asset.category, asset.serialNumber, asset.acquisitionDate, asset.acquisitionCost, asset.condition, asset.location, asset.bookable ? 1 : 0, asset.assetPhoto, asset.status, id]
  );

  return getAssetById(db, id);
};

const deleteAsset = async (db, id) => {
  await db.query('UPDATE assets SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?', [id]);
  return { success: true, id };
};

module.exports = {
  createAsset,
  listAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
};
