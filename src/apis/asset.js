import axios from 'axios'

export const getAllAsset = () => {
    return axios
        .get(`http://localhost:8088/api/asset/getAssetList`)
        .then(res => {
            return res
        })
        .catch(err => console.log(err));
};
