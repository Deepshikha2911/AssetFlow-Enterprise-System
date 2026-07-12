import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AssetDetailsCard } from '../components/AssetDetailsCard';
import { assetService } from '../services/assetService';

export const AssetDetailsPage = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    const loadAsset = async () => {
      const result = await assetService.getAssetById(id);
      if (result.success) {
        setAsset(result.data);
      }
    };
    loadAsset();
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Asset Details</h1>
      <AssetDetailsCard asset={asset} />
    </div>
  );
};
