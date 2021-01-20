import '../../../../css/Common-Tool.css'
import _ from 'lodash';
import {getUniqueId} from "./index";

export default function Modal(param) {
    this.selector = param.selector || '.modals';
    this.title = param.title || 'title';
    this.body = param.body || '';
    this.width = param.width || '23%';
    this.height = param.height || 'fit-content';
    this.footer = param.footer || false;
    this.dragable = param.dragable || true;
    this.isFullSize = param.isFullSize || false;
}

Modal.prototype.pop = function () {
    this._setRootNode();
    setTitle(this.root, this.title);
    setBody(this.root, this.body);
    this._setBtnEvent();
    if (this.dragable) setDragAndDrop(this.root);
};

Modal.prototype.getSelector = function () {
    return this.selector;
};

Modal.prototype.getTitle = function () {
    return this.title;
};

Modal.prototype.getBody = function () {
    return this.body;
};

Modal.prototype.getWidth = function () {
    return this.width;
};

Modal.prototype.getHeight = function () {
    return this.height;
};

Modal.prototype.getFooter = function () {
    return this.footer;
};

Modal.prototype.setSelector = function (selector) {
    this.selector = selector;
};

Modal.prototype.setTitle = function (title) {
    this.title = title;
    setTitle(this.root, this.title);
};

Modal.prototype.setBody = function (body) {
    this.body = body;
    setBody(this.root, this.body);
};

Modal.prototype.setWidth = function (width) {
    this.width = width;
};

Modal.prototype.setHeight = function (height) {
    this.height = height;
};

Modal.prototype.setFooter = function (footer) {
    this.footer = footer;
};

Modal.prototype.close = function () {
    this.onClose();
    this.root.parentNode.removeChild(this.root);
};

Modal.prototype.setOnClose = function (onclose) {
    if(typeof onclose ==="function")
        this.onClose = onclose;
};
Modal.prototype.minMax = function () {
    this.onMinMax(this.isFullSzie, this);
};
Modal.prototype.setOnMinMax = function (onMinMax) {
    if(typeof onMinMax ==="function")
        this.onMinMax = onMinMax;
};


Modal.prototype.getIsFullSize = function () {
    return this.isFullSize;
};

Modal.prototype.constructor = Modal;

const setTitle = (root, title) => {
    if (!root) return;
    root.querySelector('.modal-title').innerHTML = title;
};

const setBody = (root, body) => {
    if (!root) return;
    root.querySelector(".modal-body").innerHTML = body;
};


// Modal Drag
const setDragAndDrop = (root) => {
    if (!root) return;
    dragElement(root);
};


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elmnt.querySelector('.modal-header')) {
        // if present, the header is where you move the DIV from:
        elmnt.querySelector('.modal-header').onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// 헤더 버튼 이벤트
Modal.prototype._setBtnEvent = function () {
    const that = this;
    const root = this.root;

    // 닫기 버튼 클릭
    root.querySelector('.close-pop')
        .addEventListener('click', function (ev) {
            if(typeof that.onClose === 'function')
                that.onClose();
            root.parentNode.removeChild(root);
        });
    // 최대화 이벤트
  /*  root.querySelector('.full-size')
        .addEventListener('click', function (ev) {
            if(!that.isFullSzie) {
                root.style.width = "75%";
                root.style.height = '95%';
                root.style.top = 0;
                root.style.left = 315;
                root.querySelector('.modal-dialog').style.position ="absolute";
                root.querySelector('.modal-dialog').style.height ="100%";
                root.querySelector('.modal-content').style.position ="absolute";
                root.querySelector('.modal-footer').style.position ="absolute";
                this.innerHTML = '<i class="fas fa-compress-arrows-alt"></i>';
            } else {
                root.style.width = that.width;
                root.style.height = that.height;
                root.style.top = 0;
                root.style.left = 315;
                root.querySelector('.modal-dialog').style.position ="static";
                root.querySelector('.modal-dialog').style.height ="auto";
                root.querySelector('.modal-content').style.position ="static";
                root.querySelector('.modal-footer').style.position ="static";
                this.innerHTML = '<i class="fas fa-expand-arrows-alt"></i>';
            }
            that.isFullSzie = !that.isFullSzie;
            if(typeof that.onMinMax === 'function') {
                that.onMinMax(that.isFullSzie, that);
            }
        });*/
    //
    // // 최소화 이벤트
    // root.querySelector('.minimize')
    //     .addEventListener('click', function (ev) {
    //         root.querySelector('.modal-footer').style.display = 'none';
    //         root.querySelector('.modal-body').style.display = 'none';
    //     });
};


// 모달 엘리먼트 노드 가져오기
Modal.prototype._setRootNode = function () {
    var node = document.createElement("div");
    const modalId = getUniqueId('modal_');
    node.innerHTML = getHtml(modalId,this.width,this.height);
    document.querySelector(this.selector).appendChild(node);
    this.root = document.querySelector('#' + modalId);
};


function getHtml(id, width, height) {
    return `
<!-- modal -->
<div id="${id}"
     class="modal animated bounceIn" style="width: ${width}; height: ${height}">

  <!-- dialog -->
  <div class="modal-dialog">

    <!-- content -->
    <div class="modal-content">

      <!-- header -->
      <div class="modal-header">
        <h2 class="modal-title">
          Modal title
        </h2>
        <div class="modal-header-icon">
<!--        <div class="minimize">-->
<!--            <i class="fas fa-window-minimize"></i>-->
<!--        </div>-->
    <!--    <div class="full-size">
            <i class="fas fa-expand-arrows-alt"></i>
        </div>-->
        <div class="close-pop">
            <i class="fas fa-times"></i>
        </div>
        </div>
      </div>
      <!-- header -->
      
      <!-- body -->
      <div class="modal-body">

      </div>
      <!-- body -->

    </div>
    <!-- content -->

  </div>
  <!-- dialog -->

</div>
<!-- modal -->
`;
}