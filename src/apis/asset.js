import axios from 'axios'
import { host } from '../config.ts'

export const getAllAssets = () => {
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
            inventoryDate: assetInfo.inventoryDate,
        })
};

export const editAsset = (assetInfo) => {
    return axios
        .put(`${host}/api/asset/editAsset`, {
            id: assetInfo.id,
            assetId: assetInfo.assetId,
            name: assetInfo.name,
            location: assetInfo.location,
            type: assetInfo.type,
            brand: assetInfo.brand,
            photoURL: assetInfo.photoURL,
            notes: assetInfo.notes,
            inventoryDate: assetInfo.inventoryDate,
        })
};

export const inventoryAsset = (id, inventoryDate) => {
    return axios
        .put(`${host}/api/asset/inventoryAsset/${id}?inventoryDate=${inventoryDate}`)
};

export const deleteAsset = (id) => {
    return axios
        .post(`${host}/api/asset/deleteAsset/${id}`)
};


export const borrowAsset = (assetId, borrowInfo) => {
    return axios
        .post(`${host}/api/asset/borrowAsset`, {
            id: assetId,
            assetId: assetId, //will remove
            borrowerName: borrowInfo.borrowerName,
            time: borrowInfo.time,
            purpose: borrowInfo.purpose
        })
};

export const returnAsset = (id) => {
    return axios
        .post(`${host}/api/asset/returnAsset/${id}`)
};