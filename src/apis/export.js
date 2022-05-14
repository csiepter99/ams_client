import axios from 'axios'
import { host } from '../config.ts'

export const getExport = (filterInfo) => {
    return axios.post(`${host}/api/export/report`, filterInfo)
};
