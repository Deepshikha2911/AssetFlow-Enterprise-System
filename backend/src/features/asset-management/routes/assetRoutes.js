const express = require('express');
const createAssetController = require('../controllers/assetController');

module.exports = (db) => {
  const router = express.Router();
  const assetController = createAssetController(db);

  router.get('/', assetController.listAssets);
  router.post('/', assetController.createAsset);
  router.get('/:id', assetController.getAssetById);
  router.put('/:id', assetController.updateAsset);
  router.delete('/:id', assetController.deleteAsset);

  return router;
};
