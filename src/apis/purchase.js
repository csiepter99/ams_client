import req from './https'

export const getAllPurchaseAsset = () => {
    return req('get', `/api/purchase/getAllPurchaseAsset`)
};

export const requestPurchaseAsset = (purchaseAssetInfo) => {
    return req('post', `/api/purchase/requestPurchaseAsset`, {
        studentId: purchaseAssetInfo.studentId,
        studentName: purchaseAssetInfo.studentName,
        productName: purchaseAssetInfo.productName,
        link: purchaseAssetInfo.link,
        price: parseInt(purchaseAssetInfo.price),
        quantity: parseInt(purchaseAssetInfo.quantity),
        totalPrice: parseInt(purchaseAssetInfo.totalPrice),
        notes: purchaseAssetInfo.notes
    })
};
