import axios from 'axios'
import { host } from '../config.ts'

export const getExport = () => {
    return axios
        .get(`${host}/api/export/report`)
};
