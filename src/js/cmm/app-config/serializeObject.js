import $ from "jquery"

//array = serializeArray
const serializeObject =  (arr) => {
    let obj = null;
    try {
            if (arr) {
                obj = {};
                $.each(arr, function () {
                    if(this.value !== "") {
                        obj[this.name] = this.value;
                    }
                });
            }

    } catch (e) {
        alert(e.message);
    } finally {
    }
    return obj;
};

export {serializeObject}