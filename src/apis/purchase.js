import axios from 'axios'

export const getAllPurchaseAsset = () => {
    return axios
        .get(`http://localhost:8088/api/purchase/getAllPurchaseAsset`)
};

export const requestPurchaseAsset = (purchaseAssetInfo) => {
    return axios
        .post(`http://localhost:8088/api/purchase/requestPurchaseAsset`, {
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
