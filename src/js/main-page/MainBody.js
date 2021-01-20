import * as Util from "../../js/cmm/util";
import MSG from "../../js/cmm/message";
import store from '../../js/cmm/redux/store'
import Handlebars from "handlebars";
import _ from 'lodash'

let currentState;

const contextPath = Util.getContextPath();

const mainBodyHtml = `
    <div>
        <div class="main-body-title"><a>${MSG.main.bodyTitle}</a></div>
        <div id = "mainBodyList">
        {{#menuList}}
         <div class="main-icon-wrap">
            <a class="cursor-pointer"><img src="{{path relateImagePath}}" alt="{{menuNm}}"></a>
         </div>
        {{/menuList}}
        </div>
    </div>
    `;

Handlebars.registerHelper('path',(imagePath)=> {
    return contextPath+imagePath;
});

const render = (data) => {
    const template = Handlebars.compile(mainBodyHtml);
    document.querySelector("#mainBody").innerHTML = template(data);
};

const onClickItems = (state) => {
   _.each(document.querySelectorAll(".main-icon-wrap .cursor-pointer"), (el,idx) =>{
       el.addEventListener('click',()=>{
           // location.href="map-service.html?lyrId="+Util.convertSystemIdToKorName(state[idx].lyrId);
           location.href="map-service.html?lyrId="+state[idx].menuNm;
       });
   })
};

export const unSubscribe = store.subscribe(() => {
    const previousValue = currentState;
    currentState = store.getState().mainMenus;
     if (previousValue !== currentState) {
         render({menuList: currentState});
         onClickItems(currentState);
     }
});