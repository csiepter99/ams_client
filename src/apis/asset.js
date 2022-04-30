import axios from 'axios'
import { host } from '../config.ts'

export const getAllAsset = () => {
    return axios
        .get(`${host}/api/asset/getAssetList`)
};

export const addNewAsset = (assetInfo) => {
    return axios
        .post(`${host}/api/asset/addNewAsset`, {
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
        .put(`${host}/api/asset/inventoryAsset`, {
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

export const deleteAsset = (id) => {
    return axios
        .post(`${host}/api/asset/deleteAsset/${id}`)
};