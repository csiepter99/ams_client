import axios from 'axios'

export const getAllAsset = () => {
    return axios
        .get(`http://localhost:8088/api/asset/getAssetList`)
        .then(res => {
            return res
        })
        .catch(err => console.log(err));
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
        .then(res => {
            return res
        })
        .catch(err => console.log(err));
};
