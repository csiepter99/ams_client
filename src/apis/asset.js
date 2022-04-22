import axios from 'axios'

export const getAllAsset = () => {
    return axios
        .get(`http://localhost:8088/api/asset/getAssetList`)
};

export const addNewAsset = (assetInfo) => {
    return axios
        .post(`http://localhost:8088/api/asset/addNewAsset`, {
            assetId: assetInfo.assetId,
            name: assetInfo.name,
            location: assetInfo.location,
            type: assetInfo.type,
            brand: assetInfo.brand,
            photoURL: assetInfo.photoURL,
            notes: assetInfo.notes,
            isInventoried: assetInfo.isInventoried,
        })
};

export const inventoryAsset = (assetInfo) => {
    return axios
        .put(`http://localhost:8088/api/asset/inventoryAsset`, {
            id: assetInfo.id,
            assetId: assetInfo.assetId,
            name: assetInfo.name,
            location: assetInfo.location,
            type: assetInfo.type,
            brand: assetInfo.brand,
            photoURL: assetInfo.photoURL,
            notes: assetInfo.notes,
            isInventoried: assetInfo.isInventoried,
        })
};
