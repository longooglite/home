var utils = require('./utils.js');
var sortAble = require('./sortableTables.js');
utils.autoUtils();
utils.screenSize();
document.addEventListener('scroll', function() {
    var header = document.getElementsByClassName('header')[0];
    if(window.scrollY > 100) {
        utils.addClass(header, 'mini');
    } else {
        utils.removeClass(header, 'mini');
    }
});
window.addEventListener('resize', utils.screenSize);
var expTable = document.getElementsByClassName('sortable')[0];
if(expTable) {
    expTable = sortAble.sortableTable(expTable);
    expTable.table.addEventListener('mousedown', function(e) {
        if(e.target.tagName === 'TH') {
            utils.addClass(e.target, 'dst-header-mouse-down');
        }
    });
    expTable.table.addEventListener('mouseover', function(e) {
        if(e.target.tagName === 'TH') {
            var index = utils.getChildIndex(e.target);
            utils.addClass(e.target, 'dst-header-hover');
            expTable.getCellOfColumn(index).forEach(function(se) {
                utils.addClass(se, 'dst-cell-column-hover');
            });
        }
        if(e.target.tagName === 'TR') {
            var row = e.target;
            var cells = utils.arrayLikeToArray(row.children);
            utils.addClass(row, 'dst-row-hover');
            cells.forEach(function(se) {
                utils.addClass(se, 'dst-cell-row-hover');
            });
        }
        if(e.target.tagName === 'TD' || e.target.tagName === 'SPAN') {
            var cell = e.target.tagName === 'TD' ? e.target : e.target.parentNode;
            var parentRow = cell.parentNode;
            var childCells = utils.arrayLikeToArray(parentRow.children);
            utils.addClass(parentRow, 'dst-row-hover');
            childCells.forEach(function(se) {
                utils.addClass(se, 'dst-cell-row-hover');
            });
            var celldex = utils.getChildIndex(cell);
            expTable.getCellOfColumn(celldex).forEach(function(se) {
                utils.addClass(se, 'dst-column-cell-hover');
            });
            utils.addClass(expTable.headers[celldex], 'dst-column-header-hover');
        }
    });
    expTable.table.addEventListener('mouseup', function(e) {
        if(e.target.tagName === 'TH') {
            utils.removeClass(e.target, 'dst-header-mouse-down');
        }
    });
    expTable.table.addEventListener('mouseout', function(e) {
        if(e.target.tagName === 'TH') {
            var index = utils.getChildIndex(e.target);
            utils.removeClass(e.target, 'dst-header-mouse-down');
            utils.removeClass(e.target, 'dst-header-hover');
            expTable.getCellOfColumn(index).forEach(function(se) {
                utils.removeClass(se, 'dst-cell-column-hover');
            });
        }
        if(e.target.tagName === 'TR') {
            var row = e.target;
            utils.removeClass(row, 'dst-row-hover');
            var cells = utils.arrayLikeToArray(row.children);
            cells.forEach(function(se) {
                utils.removeClass(se, 'dst-cell-row-hover');
            });
        }
        if(e.target.tagName === 'TD' || e.target.tagName === 'SPAN') {
            var cell = e.target.tagName === 'TD' ? e.target : e.target.parentNode;
            var parentRow = cell.parentNode;
            var childCells = utils.arrayLikeToArray(parentRow.children);
            utils.removeClass(parentRow, 'dst-row-hover');
            childCells.forEach(function(se) {
                utils.removeClass(se, 'dst-cell-row-hover');
            });
            var celldex = utils.getChildIndex(cell);
            expTable.getCellOfColumn(celldex).forEach(function(se) {
                utils.removeClass(se, 'dst-column-cell-hover');
            });
            utils.removeClass(expTable.headers[celldex], 'dst-column-header-hover');
        }
    });
}
document.getElementById('lightbox').addEventListener('click', function() {
    utils.addClass(this, 'lightbox-hidden');
    var body = document.getElementsByTagName('body')[0];
    utils.removeClass(body, 'lightbox-up');
});
var pics = document.getElementsByTagName('img');
var lightboxImage = function() {
    var src = this.src;
    var text = this.parentNode.textContent;
    var lb = document.getElementById('lightbox');
    var lbImg = document.getElementById('lightbox-image');
    var lbText = document.getElementById('lightbox-text-content');
    lbImg.src = src;
    lbText.innerText = text;
    utils.removeClass(lb, 'lightbox-hidden');
    var body = document.getElementsByTagName('body')[0];
    utils.addClass(body, 'lightbox-up');
};
if(pics) {
    pics = [].slice.call(pics);
    pics.forEach(function(e) {
        e.addEventListener('click', lightboxImage)
    })
}
