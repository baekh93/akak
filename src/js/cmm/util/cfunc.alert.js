import Swal from 'sweetalert2'

window.cfunc = window.cfunc || {};

cfunc.alert = (function () {
    /**
     *
     * @param msg1 : 타이틀
     */
    const alert = function (msg1) {
        Swal.fire(msg1).then(r => {});
    };

    /**
     * 정보 알람
     * @param msg1 : 타이틀
     * @param msg2 : 서브
     * @param callback : 콜백
     */
    const info = function (msg1, msg2, callback) {
        if (!msg2) {
            msg2 = "";
        }
        const btnOption = callbackCheck(callback);
        Swal.fire({
            title: msg1,
            text: msg2,
            icon: 'info',
            showCancelButton: btnOption.showCancelButton,
        }).then(function (result) {
            if (callback && typeof callback === "function") {
                callback(result);
            }
        });
    };

    /**
     *  성공 알람
     * @param msg1 : 타이틀
     * @param msg2 : 서브
     * @param callback : 콜백
     */
    const success = function (msg1, msg2, callback) {
        if (!msg2) msg2 = "";
        Swal.fire({
            title: msg1,
            text: msg2,
            icon: 'success',
            confirmButtonText: "확인"
        }).then(r => {
            if (callback && typeof callback === "function") {
                callback(r);
            }
        });
    };

    /**
     * 경고 알람
     * @param msg1 : 타이틀
     * @param msg2 : 서브
     * @param callback  파라미터로  ture false 반환
     */
    const warn = function (msg1, msg2, callback) {
        if (!msg2) msg2 = "";
        const btnOption = callbackCheck(callback);
        Swal.fire({
            title: msg1,
            text: msg2,
            icon: "warning",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "예",
            cancelButtonText: "아니요",
            showCancelButton: btnOption.showCancelButton
        }).then(r => {
            if (callback && typeof callback === "function") {
                callback(r);
            }
        });
    }
    /**
     * 경고 알람
     * @param msg1 : 타이틀
     * @param msg2 : 서브
     * @param callback  파라미터로  ture false 반환
     */
    const error = function (msg1, msg2, callback) {
        if (!msg2) msg2 = "";
        const btnOption = callbackCheck(callback);
        Swal.fire({
                title: msg1,
                text: msg2,
                icon: "error",
                confirmButtonText: "확인",
                cancelButtonText: "취소",
                showCancelButton: btnOption.showCancelButton,
                closeOnConfirm: btnOption.closeOnConfirm,
            }).then(r => {
            if (callback && typeof callback === "function") {
                callback(r);
            }
        });

    }

    /**
     * input 입력 창 이 있는 알람
     * @param msg1 : 타이틀 텍스트
     * @param msg2 : 서브 텍스트
     * @param callback : 콜백 : input에 입력한 값 반환
     */

    const prompt = function (msg1, msg2, callback) {
        if (!msg2) msg2 = "";
        const btnOption = callbackCheck(callback);
        Swal.fire({
            title: msg1,
            text: msg2,
            input: 'password',
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            showCancelButton: btnOption.showCancelButton,
            closeOnConfirm: btnOption.closeOnConfirm,
            inputPlaceholder: "입력하세요."
        }).then(r => {
            if (callback && typeof callback === "function") {
                callback(r);
            }
        });
    };

    const promptInputText = function (msg1, msg2, callback, placeHolder) {
        if (!msg2) msg2 = "";
        const btnOption = callbackCheck(callback);
        Swal.fire({
            title: msg1,
            text: msg2,
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            showCancelButton: btnOption.showCancelButton,
            inputPlaceholder: placeHolder || "입력하세요."
        }).then((result) => {
            if (callback && typeof callback === "function") {
                callback(result);
            }
        });
    };

    /**
     * 비동기 알람
     * @param msg1
     * @param msg2
     * @param callback 콜백 함수 내에서 비동기 작업 이 이뤄져야함
     */
    const alertAsync = function (msg1, msg2, callback) {
        if (!msg2) msg2 = "";
        const btnOption = callbackCheck(callback);
        Swal.fire({
            title: msg1,
            text: msg2,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            showCancelButton: btnOption.showCancelButton,
            showLoaderOnConfirm: true,
        }).then((result) => {
            if (callback && typeof callback === "function") {
                callback(result);
            }
        });
    };

    const callbackCheck = function (c) {
        const option = {};
        if (!c || typeof c !== 'function') {
            option.showCancelButton = false;
            option.closeOnConfirm = true;
        } else {
            option.showCancelButton = true;
            option.closeOnConfirm = false;
        }
        return option;
    };


    const module = {
        alert: alert
        , success: success
        , info: info
        , warn: warn
        , error: error
        , prompt: prompt
        , promptInputText: promptInputText
        , alertAsync: alertAsync
    };

    return module;

})();