import '../../../../css/context-menu.css'
import Handlebars from "handlebars";
import _ from 'lodash'
import store from "../redux/store";
let currentState = {};

export default function contextMenu (param) {
    this.element = param.element;
    this.targetElement = param.targetElement;
    this.selector = param.selector;
    this.items =  {items : param.items};
    this.onItemClick = param.onItemClick;
    this.onClose = param.onClose;
}

contextMenu.prototype.init = function() {
    const that = this;
    let element;
    if(that.element.parentNode.className.includes('fancytree-has-children')) { //부모노드일때(자식가지고있을때)
        if (typeof this.element !== 'undefined') element = this.element;
        element.addEventListener('contextmenu', ev => {
            ev.preventDefault();
        })
    }
    else {

        if (typeof this.element !== 'undefined') element = this.element;
        if (typeof this.selector !== 'undefined') element = document.querySelector(this.selector);

        const template = Handlebars.compile(getHtml());
        const html = template(this.items);

        function createNode(ev) {
            const preContextMenu = document.querySelector('.toc-contextmenu');
            if(preContextMenu !== null) preContextMenu.remove();
            const node = document.createElement("div");
            node.style.position = "absolute";
            node.style.top = ev.y;
            node.style.left = ev.x + 'px';
            node.style.padding = '0.5rem';
            node.className = 'card card-body toc-contextmenu';
            node.innerHTML = html;

            const items = node.querySelectorAll('li');
            node.addEventListener('mouseleave', evt => {
                that.onClose(evt);
                node.remove();
            });

            _.each(items, item => {
                item.addEventListener('click', evt => {
                    //clickElement: 우클릭한 객체
                    that.onItemClick(item.dataset.id * 1, evt);
                });
            });

            return node;
        }

        element.addEventListener('contextmenu', ev => {
            ev.preventDefault();
            const node = createNode(ev);
            element.appendChild(node);

        });
    }
};


contextMenu.prototype.on = function () {


};

contextMenu.prototype.off = function () {


};

function getHtml() {
    return `
    <ul class="context-menu nav flex-column">
        {{#items}}   
            <li class="nav-item" data-id="{{id}}">
                <a href="javascript:void(0);" class="nav-link">
                <i class="nav-link-icon {{icon}}"></i>
                <span>{{title}}</span>
                </a>
            </li>
        {{/items}}
    </ul>
    `;
}

store.subscribe(() => {
    const previousValue = currentState;
    currentState = store.getState()

})