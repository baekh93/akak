import MSG from "../../js/cmm/message";
import store from "../cmm/redux/store";
import Handlebars from 'handlebars'
import _ from 'lodash'

let currentState = [];
const headerHtml = `
    <div class = "main-head-container">
        <div class="main-head-content row">
            <div class="mg-right-auto"><h2>${MSG.main.headerTitle}</h2></div>
            <div class="mg-left-auto">
                <nav>
                    <ul id="mainHeaderList">
                        {{#headList}}
                         <li class="cursor-pointer"><a id="{{menuNo}}"><span>{{menuNm}}</span></a></li>
                        {{/headList}} 
                    </ul>
                </nav>
            </div>
        <div class="main-loginBox" ><a class ="head-btn">LOGIN</a></div>
        </div>
    </div>
    <div id="board-wrap"></div>
`;


const board = `
<div id="boardPOP">
    <div class="title">
        <h4>공지사항</h4> 
    </div>
    <div class="boardList">
        
    </div>
</div>
`;

const render = (data) => {
    const template = Handlebars.compile(headerHtml);
    document.querySelector("#mainHead").innerHTML = template(data);
};



const addEvent = () => {
    _.each(document.querySelectorAll('#mainHeaderList a'),item => {
       item.addEventListener('click',evt =>{
            switch (item.id) {
                case '7': document.querySelector("#board-wrap").innerHTML = board; break;
                case '8': console.log(item.id); break;
                case '9': console.log(item.id); break;
                case '10':console.log(item.id); break;
            }
       });
    });
};


store.subscribe(() => {
    const previousValue = currentState;
    window.sstate = store.getState();
    currentState = store.getState().mainHeaders;
    if (previousValue !== currentState) {
        render({headList: currentState});
        addEvent();
    }
});

