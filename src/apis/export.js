import req from './https'

export const getExport = (filterInfo) => {
    return req('post', `/api/export/report`, filterInfo)
};
