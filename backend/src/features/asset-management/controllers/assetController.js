const assetService = require('../services/assetService');

const createAssetController = (db) => ({
  listAssets: async (req, res, next) => {
    try {
      const assets = await assetService.listAssets(db, req.query);
      res.status(200).json({ success: true, data: assets });
    } catch (error) {
      next(error);
    }
  },

  getAssetById: async (req, res, next) => {
    try {
      const asset = await assetService.getAssetById(db, req.params.id);
      if (!asset) {
        return res.status(404).json({ success: false, message: 'Asset not found.' });
      }
      return res.status(200).json({ success: true, data: asset });
    } catch (error) {
      return next(error);
    }
  },

  createAsset: async (req, res, next) => {
    try {
      const asset = await assetService.createAsset(db, req.body);
      res.status(201).json({ success: true, data: asset });
    } catch (error) {
      if (error.statusCode === 400) {
        return res.status(400).json({ success: false, message: 'Validation failed.', errors: error.details });
      }
      return next(error);
    }
  },

  updateAsset: async (req, res, next) => {
    try {
      const asset = await assetService.updateAsset(db, req.params.id, req.body);
      res.status(200).json({ success: true, data: asset });
    } catch (error) {
      if (error.statusCode === 400) {
        return res.status(400).json({ success: false, message: 'Validation failed.', errors: error.details });
      }
      return next(error);
    }
  },

  deleteAsset: async (req, res, next) => {
    try {
      const result = await assetService.deleteAsset(db, req.params.id);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },
});

module.exports = createAssetController;
