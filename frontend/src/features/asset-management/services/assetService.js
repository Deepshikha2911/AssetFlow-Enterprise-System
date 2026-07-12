const API_BASE = '/api/assets';

export const assetService = {
  listAssets: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE}${params ? `?${params}` : ''}`);
    return response.json();
  },

  getAssetById: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`);
    return response.json();
  },

  createAsset: async (payload) => {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.json();
  },

  updateAsset: async (id, payload) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.json();
  },

  deleteAsset: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};
