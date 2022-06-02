import req from './https'

export const getAllAssets = () => {
    return req('get', `/api/asset/getAssetList`)
};

export const addNewAsset = (assetInfo) => {
    return req('post', `/api/asset/addNewAsset`, {
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
    return req('put', `/api/asset/editAsset`, {
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
    return req('put', `/api/asset/inventoryAsset/${id}?inventoryDate=${inventoryDate}`)
};

export const deleteAsset = (id) => {
    return req('post', `/api/asset/deleteAsset/${id}`)
};

export const borrowAsset = (assetId, borrowInfo) => {
    return req('post', `/api/asset/borrowAsset`, {
            id: assetId,
            assetId: assetId, //will remove
            borrowerName: borrowInfo.borrowerName,
            time: borrowInfo.time,
            purpose: borrowInfo.purpose
        })
};

export const returnAsset = (id) => {
    return req('post', `/api/asset/returnAsset/${id}`)
};