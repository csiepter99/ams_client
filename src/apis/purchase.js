import axios from 'axios'
import { host } from '../config.ts'

export const getAllPurchaseAsset = () => {
    return axios
        .get(`${host}/api/purchase/getAllPurchaseAsset`)
};

export const requestPurchaseAsset = (purchaseAssetInfo) => {
    return axios
        .post(`${host}/api/purchase/requestPurchaseAsset`, {
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
