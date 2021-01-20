import {getElementBySelector} from "./index";
import Pagination from 'tui-pagination';

export const genoratePaging = ({selector, total,itemsPerPage}) => {
    let div;
    if(typeof selector === 'string')
        div = getElementBySelector(selector);
    else {
        div = selector
    }
    const tempPage = document.getElementById("pagination");
    if (tempPage)
        tempPage.remove();
    const child = '<ul id="pagination" class="pagination"></ul>';
    div.insertAdjacentHTML('beforeend',child);

    return new Pagination("pagination",{
        totalItems:total,
        visiblePages: 5,
        itemsPerPage: itemsPerPage || 5,
        firstItemClassName: 'page-item',
        lastItemClassName: 'page-item',
        template: {
            page: '<li class="page-item"><a href="#" class="page-link">{{page}}</a></li>',
            currentPage: '<li class="page-item active"><a href="#" class="page-link">{{page}}</a></li>',
            moveButton: ({type}) => {
                let template = '';
                if (type === 'first') {
                    template = '<li class="page-item"><a href="#" class="page-link"><<</a></li>';
                } else if(type === 'last') {
                    template = '<li class="page-item"><a href="#" class="page-link">>></a></li>';
                } else if (type === 'prev') {
                    template = '<li class="page-item"><a href="#" class="page-link"><</a></li>';
                } else if (type === 'next') {
                    template = '<li class="page-item"><a href="#" class="page-link">></a></li>';
                }
                return template;
            },
            disabledMoveButton: ({type}) => {
                let template = '';
                if (type === 'first') {
                    template = '<li class="page-item" aria-disabled="true"><a href="#" class="page-link"><<</a></li>';
                } else if(type === 'last') {
                    template = '<li class="page-item" aria-disabled="true"><a href="#" class="page-link">>></a></li>';
                } else if (type === 'prev') {
                    template = '<li class="page-item" aria-disabled="true"><a href="#" class="page-link"><</a></li>';
                } else if (type === 'next') {
                    template = '<li class="page-item" aria-disabled="true"><a href="#" class="page-link">></a></li>';
                }
                return template;
            },
            moreButton: '<li class="page-item"><a href="#" class="page-link">...</a></li>'
        }
    });

};


/*##################### private ######################*/
const _getTotalPage = (limit,total) => {
    return total % limit === 0 ? total / limit : (total / limit) + 1;
};