import Axios from 'axios';
import * as facility from "../app-config";

const getList = async (param) => {
    try {
        return await Axios.get(facility.FACILITY_DOMAIN + '/' + param.id + facility.FACILITY_LIST, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
            },
            params: param.searchParam

        });
    } catch (e) {
        console.log(e);
    }
};
const getListAll = async (param) => {
    try {
        return await Axios.get(facility.FACILITY_DOMAIN + '/' + param.id + facility.FACILITY_LIST_ALL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token
            },
            params: param.searchParam
        });
    } catch (e) {
        console.log(e);
    }
};

/**
 * 검색결과에 따른 엑셀 출력을위해서 param을 검색조건에 맞게 가져올 수 있어야하는 로직 필요
 */

const getFacilItem = async (param) => {

    try {
        return await Axios.get(facility.FACILITY_DOMAIN + '/' + param.id + '/' + param.gid, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (e) {
        console.log(e);
    }
};

const setFacilItem = async (param) => {
    try {
        return await Axios.post(facility.FACILITY_DOMAIN + '/' + param.id + facility.FACILITY_DETAIL, param.detail);
    } catch (e) {
        console.log(e);
    }
};

const getFtrIdn = async (param) => {

    try {
        return await Axios.get(facility.FACILITY_DOMAIN + '/' +param.id + '/ftridn');
    } catch (e) {
        console.log(e)
    }
};
const httpGetCall = async ({url, param, headers}) => {

    try {
        return await Axios.get(url, {params: param, headers :{
                'Content-Type': 'application/json',
                // 'Authorization' : token
            },
            withCredentials: true
        });
    } catch (e) {
        console.log(e);
    }
};
const httpGetCallToUnionServer = async ({url, param, headers}) => {
    try {
        return await Axios.get(url, {params: param, headers :headers});
    } catch (e) {
        console.log(e);
    }
};


const httpPostCall = async ({url, data, headers}) => {
    try {
        return await Axios.post(url, data);
    } catch (e) {
        console.log('error',e);
    }
};

const httpDeleteCall = async  ({url, data, headers}) => {
    try {
        return await Axios.delete(url,{data,headers});
    } catch (e) {
        console.log('error',e);
    }
};

const regstList = async (sysId, regstrId) => {
    const param = {
        url: facility.COMN_REGSTR_LIST,
        param: {
            sysId : sysId,
            regstrId: regstrId
        }
    };
    return await httpGetCallToUnionServer(param);
};



export {getList, getListAll, getFacilItem, setFacilItem, httpGetCall, httpPostCall ,regstList, getFtrIdn,httpDeleteCall,httpGetCallToUnionServer};