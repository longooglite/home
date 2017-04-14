(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var utils = require('./utils.js');
utils.autoUtils();
utils.screenSize();
document.addEventListener('scroll', function() {
    var header = document.getElementsByClassName('header')[0];
    if(window.scrollY > 100) {
        utils.addClass(header, 'header--mini');
    } else {
        utils.removeClass(header, 'header--mini');
    }
});
var showMoreTrigger = document.getElementById('show-more-trigger');
showMoreTrigger.addEventListener('click', function(e) {
    e.preventDefault();
    var navOverflow = document.getElementsByClassName('nav__overflow')[0];
    if(navOverflow.className.indexOf('--hidden') >= 0) {
        utils.removeClass(navOverflow, 'nav__overflow--hidden');
        e.target.innerText = 'close';
    } else {
        utils.addClass(navOverflow, 'nav__overflow--hidden');
        e.target.innerText = 'more...';
    }
});
window.addEventListener('resize', utils.screenSize);
var expTable = document.getElementsByClassName('sortable')[0];
if(expTable) {
    expTable = dst(expTable);
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
var lightbox = document.getElementById('lightbox');
    if(lightbox) {
        lightbox.addEventListener('click', function() {
            utils.addClass(this, 'lightbox-hidden');
            var body = document.getElementsByTagName('body')[0];
            utils.removeClass(body, 'lightbox-up');
        });
    }
var pics = document.getElementsByTagName('img');
var lightboxImage = function() {
    var src = this.src;
    var text = this.parentNode.textContent;
    var lb = document.getElementById('lightbox');
    var lbImg = document.getElementById('lightbox-image');
    var lbText = document.getElementById('lightbox-text-content');
    lbImg.src = src;
    if(this.className.indexOf('portrait') >= 0) {
        utils.addClass(lbImg, 'portrait');
    }
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

},{"./utils.js":2}],2:[function(require,module,exports){
module.exports.autoUtils = function(){
    if (typeof Array.isArray === 'undefined') {
        Array.isArray = function(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        };
    }
    String.prototype.stripCommas = function() {
        return this.replace(/(^,)|(,$)/g, "").toString();
    };
    String.prototype.stripSpaces = function() {
        return this.replace(/(^\s)|(\s$)/g, "").toString();
    };
    String.prototype.leftPad = function(padding, paddingCharacter) {
        if((!padding && padding !== 0) || Number(padding) < this.length) return this.toString();
        var pc = paddingCharacter === undefined ? " " : paddingCharacter;
        var paddedString = this;
        for(var pindex = this.length; pindex < padding; pindex++) paddedString = pc + paddedString;
        return paddedString.toString();
    };
    String.prototype.hyphensToCamels = function(){
        return this.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    };
    String.prototype.rightPad = function(padding, paddingCharacter) {
        if((!padding && padding !== 0) || Number(padding) < this.length) return this.toString();
        var pc = paddingCharacter === undefined ? " " : paddingCharacter;
        var paddedString = this;
        for(var pindex = this.length; pindex < padding; pindex++) paddedString = paddedString + pc;
        return paddedString.toString();
    };
    String.prototype.leftTrunc = function(truncTo) {
        if((!truncTo && truncTo !== 0) || this.length < truncTo) return this.toString();
        else return this.substr(0, truncTo);
    };
    String.prototype.rightTrunc = function(truncTo) {
        if((!truncTo && truncTo !== 0) || this.length < truncTo) return this.toString();
        else return this.substr(this.length - truncTo, this.length - 1);
    };
    String.prototype.leftNormalize = function(length, paddingCharacter) {
        if(!length && length !== 0) return this.toString();
        if(this.length > length) return this.leftTrunc(length);
        else  return this.leftPad(length, paddingCharacter);
    };
    String.prototype.rightNormalize = function(length, paddingCharacter) {
        if((!length && length !== 0)) return this.toString();
        if(this.length > length) return this.rightTrunc(length);
        else return this.rightPad(length, paddingCharacter);
    };
    String.prototype.unCamel = function(){
        return this.replace(/([A-Z])/g, ' $1');
    };
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
    Array.prototype.findWithAttr = function(attr, value) {
        for(var i = 0; i < this.length; i += 1) {
            if(this[i][attr] === value) {
                return i;
            }
        }
        return false;
    };
    Array.prototype.move = function (oldIndex, newIndex) {
        if (newIndex >= this.length) {
            var k = newIndex - this.length;
            while ((k--) + 1) {
                this.push(undefined);
            }
        }
        this.splice(newIndex, 0, this.splice(oldIndex, 1)[0]);
        return this;
    };
    Array.prototype.delete = function (index) {
        this.splice(index, 1);
        return this;
    };
    Array.prototype.pushToIndex = function(index, item) {
        this.splice(index, 0, item);
        return this;
    };
    Array.prototype.joinAttr = function(attr) {
        var check = attr.split('.');
        var deep = false;
        if(check.length > 1) {
            deep = true;
        }
        var ret = '';
        for(var index = 0; index < this.length; index++) {
            var entry = this[index];
            if(!deep) {
                if(entry[attr]) {
                    ret += entry[attr] + ','
                }
            } else {
                if(entry[check[0]][check[1]]) {
                    ret += entry[check[0]][check[1]] + ','
                }
            }
        }
        return ret.stripCommas();
    };
    Array.prototype.deeperFind = function(attr, value) {
        var check = attr.split('.');
        var deep = false;
        if(check.length > 1) {
            deep = true;
        }
        for(var index = 0; index < this.length; index++) {
            var entry = this[index];
            if(!deep) {
                if(entry[attr] === value) {
                    return index;
                }
            } else {
                if(entry[check[0]][check[1]] === value) {
                    return index;
                }
            }
        }
        return false;
    };
};
module.exports.getChildIndex = function(child) {
    var parent = child.parentNode;
    var children = parent.children;
    var count = children.length;
    var child_index;
    for (var i = 0; i < count; i++) {
        if (child === children[i]) {
            child_index = i;
            break;
        }
    }
    return child_index;
};
module.exports.toggleClass = function(element, cName) {
    var setter = element.className.indexOf(cName) >= 0 ? removeClass : addClass;
    return setter(element, cName);
};
module.exports.getData = function(element, attr) {
    return element.dataset ? element.dataset[attr] : element.getAttribute('data-' + attr);
};
module.exports.arrayLikeToArray = function(arrayLike) {
    return [].slice.call(arrayLike);
};
module.exports.setData = function(element, attr, data) {
    if(element.dataset) element.dataset[attr] = data;
    else element.setAttribute('data-' + attr, data);
};
var removeClass = function(element, cName){
    if(element.className.indexOf(cName) >= 0) {
        element.className = String(element.className.replaceAll(cName, '')).stripSpaces();
        return element;
    }
    return element;
};
var addClass = function(element, cName) {
    if(element.className.indexOf(cName) < 0) {
        element.className = String(element.className + ' ' + cName).stripSpaces();
        return element;
    }
    return element;
};
module.exports.removeClass = removeClass;
module.exports.addClass = addClass;
module.exports.screenSize = function(mobile, smallDesktop, medDesktop) {
    var mobileSize = mobile == undefined || !Number(mobile) ? 900 : mobile;
    var desktopSmall = smallDesktop == undefined ? 1000 : smallDesktop;
    var desktopMed = medDesktop == undefined ? 1500 : medDesktop;
    //sizes that correspond to what I need them too, mobile is probably what should be adjusted more often
    //TODO:Add breakpoints for common mobile devices, specify type to device
    var size = "", type = "";
    var body = document.getElementsByTagName('body')[0];
    //used to do this by ID, but asking people to add IDs to their body is just dumb
    var width = body.offsetWidth;
    //offsetWidth gives a generally accurate view, certainly good enough for just CSS
    if(width <= mobileSize) {
        type = "mobile";
    } else {
        type = "desktop";
        if(width < desktopMed) {
            if(width < desktopSmall) {
                size = "small-screen";
            } else {
                size = "med-screen";
            }
        } else {
            size = "large-screen";
        }
    }
    removeClass(body, 'mobile');
    removeClass(body, 'desktop');
    removeClass(body, 'small-screen');
    removeClass(body, 'med-screen');
    removeClass(body, 'large-screen');
    addClass(body, type);
    addClass(body, size);
    //preserves already set classnames!
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvc2NyaXB0L21haW4uanMiLCJwdWJsaWMvc2NyaXB0L3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XHJcbnV0aWxzLmF1dG9VdGlscygpO1xyXG51dGlscy5zY3JlZW5TaXplKCk7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hlYWRlcicpWzBdO1xyXG4gICAgaWYod2luZG93LnNjcm9sbFkgPiAxMDApIHtcclxuICAgICAgICB1dGlscy5hZGRDbGFzcyhoZWFkZXIsICdoZWFkZXItLW1pbmknKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MoaGVhZGVyLCAnaGVhZGVyLS1taW5pJyk7XHJcbiAgICB9XHJcbn0pO1xyXG52YXIgc2hvd01vcmVUcmlnZ2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3ctbW9yZS10cmlnZ2VyJyk7XHJcbnNob3dNb3JlVHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBuYXZPdmVyZmxvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25hdl9fb3ZlcmZsb3cnKVswXTtcclxuICAgIGlmKG5hdk92ZXJmbG93LmNsYXNzTmFtZS5pbmRleE9mKCctLWhpZGRlbicpID49IDApIHtcclxuICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhuYXZPdmVyZmxvdywgJ25hdl9fb3ZlcmZsb3ctLWhpZGRlbicpO1xyXG4gICAgICAgIGUudGFyZ2V0LmlubmVyVGV4dCA9ICdjbG9zZSc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHV0aWxzLmFkZENsYXNzKG5hdk92ZXJmbG93LCAnbmF2X19vdmVyZmxvdy0taGlkZGVuJyk7XHJcbiAgICAgICAgZS50YXJnZXQuaW5uZXJUZXh0ID0gJ21vcmUuLi4nO1xyXG4gICAgfVxyXG59KTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHV0aWxzLnNjcmVlblNpemUpO1xyXG52YXIgZXhwVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzb3J0YWJsZScpWzBdO1xyXG5pZihleHBUYWJsZSkge1xyXG4gICAgZXhwVGFibGUgPSBkc3QoZXhwVGFibGUpO1xyXG4gICAgZXhwVGFibGUudGFibGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdUSCcpIHtcclxuICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3MoZS50YXJnZXQsICdkc3QtaGVhZGVyLW1vdXNlLWRvd24nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGV4cFRhYmxlLnRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnVEgnKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHV0aWxzLmdldENoaWxkSW5kZXgoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICB1dGlscy5hZGRDbGFzcyhlLnRhcmdldCwgJ2RzdC1oZWFkZXItaG92ZXInKTtcclxuICAgICAgICAgICAgZXhwVGFibGUuZ2V0Q2VsbE9mQ29sdW1uKGluZGV4KS5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5hZGRDbGFzcyhzZSwgJ2RzdC1jZWxsLWNvbHVtbi1ob3ZlcicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1RSJykge1xyXG4gICAgICAgICAgICB2YXIgcm93ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgICAgIHZhciBjZWxscyA9IHV0aWxzLmFycmF5TGlrZVRvQXJyYXkocm93LmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3Mocm93LCAnZHN0LXJvdy1ob3ZlcicpO1xyXG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5hZGRDbGFzcyhzZSwgJ2RzdC1jZWxsLXJvdy1ob3ZlcicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1REJyB8fCBlLnRhcmdldC50YWdOYW1lID09PSAnU1BBTicpIHtcclxuICAgICAgICAgICAgdmFyIGNlbGwgPSBlLnRhcmdldC50YWdOYW1lID09PSAnVEQnID8gZS50YXJnZXQgOiBlLnRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50Um93ID0gY2VsbC5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICB2YXIgY2hpbGRDZWxscyA9IHV0aWxzLmFycmF5TGlrZVRvQXJyYXkocGFyZW50Um93LmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3MocGFyZW50Um93LCAnZHN0LXJvdy1ob3ZlcicpO1xyXG4gICAgICAgICAgICBjaGlsZENlbGxzLmZvckVhY2goZnVuY3Rpb24oc2UpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKHNlLCAnZHN0LWNlbGwtcm93LWhvdmVyJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgY2VsbGRleCA9IHV0aWxzLmdldENoaWxkSW5kZXgoY2VsbCk7XHJcbiAgICAgICAgICAgIGV4cFRhYmxlLmdldENlbGxPZkNvbHVtbihjZWxsZGV4KS5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5hZGRDbGFzcyhzZSwgJ2RzdC1jb2x1bW4tY2VsbC1ob3ZlcicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3MoZXhwVGFibGUuaGVhZGVyc1tjZWxsZGV4XSwgJ2RzdC1jb2x1bW4taGVhZGVyLWhvdmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBleHBUYWJsZS50YWJsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdUSCcpIHtcclxuICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MoZS50YXJnZXQsICdkc3QtaGVhZGVyLW1vdXNlLWRvd24nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGV4cFRhYmxlLnRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdUSCcpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdXRpbHMuZ2V0Q2hpbGRJbmRleChlLnRhcmdldCk7XHJcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKGUudGFyZ2V0LCAnZHN0LWhlYWRlci1tb3VzZS1kb3duJyk7XHJcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKGUudGFyZ2V0LCAnZHN0LWhlYWRlci1ob3ZlcicpO1xyXG4gICAgICAgICAgICBleHBUYWJsZS5nZXRDZWxsT2ZDb2x1bW4oaW5kZXgpLmZvckVhY2goZnVuY3Rpb24oc2UpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKHNlLCAnZHN0LWNlbGwtY29sdW1uLWhvdmVyJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnVFInKSB7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSBlLnRhcmdldDtcclxuICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3Mocm93LCAnZHN0LXJvdy1ob3ZlcicpO1xyXG4gICAgICAgICAgICB2YXIgY2VsbHMgPSB1dGlscy5hcnJheUxpa2VUb0FycmF5KHJvdy5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goZnVuY3Rpb24oc2UpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKHNlLCAnZHN0LWNlbGwtcm93LWhvdmVyJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnVEQnIHx8IGUudGFyZ2V0LnRhZ05hbWUgPT09ICdTUEFOJykge1xyXG4gICAgICAgICAgICB2YXIgY2VsbCA9IGUudGFyZ2V0LnRhZ05hbWUgPT09ICdURCcgPyBlLnRhcmdldCA6IGUudGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnRSb3cgPSBjZWxsLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZENlbGxzID0gdXRpbHMuYXJyYXlMaWtlVG9BcnJheShwYXJlbnRSb3cuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhwYXJlbnRSb3csICdkc3Qtcm93LWhvdmVyJyk7XHJcbiAgICAgICAgICAgIGNoaWxkQ2VsbHMuZm9yRWFjaChmdW5jdGlvbihzZSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3Moc2UsICdkc3QtY2VsbC1yb3ctaG92ZXInKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBjZWxsZGV4ID0gdXRpbHMuZ2V0Q2hpbGRJbmRleChjZWxsKTtcclxuICAgICAgICAgICAgZXhwVGFibGUuZ2V0Q2VsbE9mQ29sdW1uKGNlbGxkZXgpLmZvckVhY2goZnVuY3Rpb24oc2UpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKHNlLCAnZHN0LWNvbHVtbi1jZWxsLWhvdmVyJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhleHBUYWJsZS5oZWFkZXJzW2NlbGxkZXhdLCAnZHN0LWNvbHVtbi1oZWFkZXItaG92ZXInKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG52YXIgbGlnaHRib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlnaHRib3gnKTtcclxuICAgIGlmKGxpZ2h0Ym94KSB7XHJcbiAgICAgICAgbGlnaHRib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3ModGhpcywgJ2xpZ2h0Ym94LWhpZGRlbicpO1xyXG4gICAgICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XHJcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKGJvZHksICdsaWdodGJveC11cCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG52YXIgcGljcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKTtcclxudmFyIGxpZ2h0Ym94SW1hZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzcmMgPSB0aGlzLnNyYztcclxuICAgIHZhciB0ZXh0ID0gdGhpcy5wYXJlbnROb2RlLnRleHRDb250ZW50O1xyXG4gICAgdmFyIGxiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpZ2h0Ym94Jyk7XHJcbiAgICB2YXIgbGJJbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlnaHRib3gtaW1hZ2UnKTtcclxuICAgIHZhciBsYlRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlnaHRib3gtdGV4dC1jb250ZW50Jyk7XHJcbiAgICBsYkltZy5zcmMgPSBzcmM7XHJcbiAgICBpZih0aGlzLmNsYXNzTmFtZS5pbmRleE9mKCdwb3J0cmFpdCcpID49IDApIHtcclxuICAgICAgICB1dGlscy5hZGRDbGFzcyhsYkltZywgJ3BvcnRyYWl0Jyk7XHJcbiAgICB9XHJcbiAgICBsYlRleHQuaW5uZXJUZXh0ID0gdGV4dDtcclxuICAgIHV0aWxzLnJlbW92ZUNsYXNzKGxiLCAnbGlnaHRib3gtaGlkZGVuJyk7XHJcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XHJcbiAgICB1dGlscy5hZGRDbGFzcyhib2R5LCAnbGlnaHRib3gtdXAnKTtcclxufTtcclxuaWYocGljcykge1xyXG4gICAgcGljcyA9IFtdLnNsaWNlLmNhbGwocGljcyk7XHJcbiAgICBwaWNzLmZvckVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsaWdodGJveEltYWdlKVxyXG4gICAgfSlcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cy5hdXRvVXRpbHMgPSBmdW5jdGlvbigpe1xyXG4gICAgaWYgKHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIEFycmF5LmlzQXJyYXkgPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBTdHJpbmcucHJvdG90eXBlLnN0cmlwQ29tbWFzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvKF4sKXwoLCQpL2csIFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICB9O1xyXG4gICAgU3RyaW5nLnByb3RvdHlwZS5zdHJpcFNwYWNlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoLyheXFxzKXwoXFxzJCkvZywgXCJcIikudG9TdHJpbmcoKTtcclxuICAgIH07XHJcbiAgICBTdHJpbmcucHJvdG90eXBlLmxlZnRQYWQgPSBmdW5jdGlvbihwYWRkaW5nLCBwYWRkaW5nQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgaWYoKCFwYWRkaW5nICYmIHBhZGRpbmcgIT09IDApIHx8IE51bWJlcihwYWRkaW5nKSA8IHRoaXMubGVuZ3RoKSByZXR1cm4gdGhpcy50b1N0cmluZygpO1xyXG4gICAgICAgIHZhciBwYyA9IHBhZGRpbmdDaGFyYWN0ZXIgPT09IHVuZGVmaW5lZCA/IFwiIFwiIDogcGFkZGluZ0NoYXJhY3RlcjtcclxuICAgICAgICB2YXIgcGFkZGVkU3RyaW5nID0gdGhpcztcclxuICAgICAgICBmb3IodmFyIHBpbmRleCA9IHRoaXMubGVuZ3RoOyBwaW5kZXggPCBwYWRkaW5nOyBwaW5kZXgrKykgcGFkZGVkU3RyaW5nID0gcGMgKyBwYWRkZWRTdHJpbmc7XHJcbiAgICAgICAgcmV0dXJuIHBhZGRlZFN0cmluZy50b1N0cmluZygpO1xyXG4gICAgfTtcclxuICAgIFN0cmluZy5wcm90b3R5cGUuaHlwaGVuc1RvQ2FtZWxzID0gZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC8tKFthLXpdKS9nLCBmdW5jdGlvbiAoZykgeyByZXR1cm4gZ1sxXS50b1VwcGVyQ2FzZSgpOyB9KTtcclxuICAgIH07XHJcbiAgICBTdHJpbmcucHJvdG90eXBlLnJpZ2h0UGFkID0gZnVuY3Rpb24ocGFkZGluZywgcGFkZGluZ0NoYXJhY3Rlcikge1xyXG4gICAgICAgIGlmKCghcGFkZGluZyAmJiBwYWRkaW5nICE9PSAwKSB8fCBOdW1iZXIocGFkZGluZykgPCB0aGlzLmxlbmd0aCkgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcclxuICAgICAgICB2YXIgcGMgPSBwYWRkaW5nQ2hhcmFjdGVyID09PSB1bmRlZmluZWQgPyBcIiBcIiA6IHBhZGRpbmdDaGFyYWN0ZXI7XHJcbiAgICAgICAgdmFyIHBhZGRlZFN0cmluZyA9IHRoaXM7XHJcbiAgICAgICAgZm9yKHZhciBwaW5kZXggPSB0aGlzLmxlbmd0aDsgcGluZGV4IDwgcGFkZGluZzsgcGluZGV4KyspIHBhZGRlZFN0cmluZyA9IHBhZGRlZFN0cmluZyArIHBjO1xyXG4gICAgICAgIHJldHVybiBwYWRkZWRTdHJpbmcudG9TdHJpbmcoKTtcclxuICAgIH07XHJcbiAgICBTdHJpbmcucHJvdG90eXBlLmxlZnRUcnVuYyA9IGZ1bmN0aW9uKHRydW5jVG8pIHtcclxuICAgICAgICBpZigoIXRydW5jVG8gJiYgdHJ1bmNUbyAhPT0gMCkgfHwgdGhpcy5sZW5ndGggPCB0cnVuY1RvKSByZXR1cm4gdGhpcy50b1N0cmluZygpO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuc3Vic3RyKDAsIHRydW5jVG8pO1xyXG4gICAgfTtcclxuICAgIFN0cmluZy5wcm90b3R5cGUucmlnaHRUcnVuYyA9IGZ1bmN0aW9uKHRydW5jVG8pIHtcclxuICAgICAgICBpZigoIXRydW5jVG8gJiYgdHJ1bmNUbyAhPT0gMCkgfHwgdGhpcy5sZW5ndGggPCB0cnVuY1RvKSByZXR1cm4gdGhpcy50b1N0cmluZygpO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuc3Vic3RyKHRoaXMubGVuZ3RoIC0gdHJ1bmNUbywgdGhpcy5sZW5ndGggLSAxKTtcclxuICAgIH07XHJcbiAgICBTdHJpbmcucHJvdG90eXBlLmxlZnROb3JtYWxpemUgPSBmdW5jdGlvbihsZW5ndGgsIHBhZGRpbmdDaGFyYWN0ZXIpIHtcclxuICAgICAgICBpZighbGVuZ3RoICYmIGxlbmd0aCAhPT0gMCkgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcclxuICAgICAgICBpZih0aGlzLmxlbmd0aCA+IGxlbmd0aCkgcmV0dXJuIHRoaXMubGVmdFRydW5jKGxlbmd0aCk7XHJcbiAgICAgICAgZWxzZSAgcmV0dXJuIHRoaXMubGVmdFBhZChsZW5ndGgsIHBhZGRpbmdDaGFyYWN0ZXIpO1xyXG4gICAgfTtcclxuICAgIFN0cmluZy5wcm90b3R5cGUucmlnaHROb3JtYWxpemUgPSBmdW5jdGlvbihsZW5ndGgsIHBhZGRpbmdDaGFyYWN0ZXIpIHtcclxuICAgICAgICBpZigoIWxlbmd0aCAmJiBsZW5ndGggIT09IDApKSByZXR1cm4gdGhpcy50b1N0cmluZygpO1xyXG4gICAgICAgIGlmKHRoaXMubGVuZ3RoID4gbGVuZ3RoKSByZXR1cm4gdGhpcy5yaWdodFRydW5jKGxlbmd0aCk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5yaWdodFBhZChsZW5ndGgsIHBhZGRpbmdDaGFyYWN0ZXIpO1xyXG4gICAgfTtcclxuICAgIFN0cmluZy5wcm90b3R5cGUudW5DYW1lbCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvKFtBLVpdKS9nLCAnICQxJyk7XHJcbiAgICB9O1xyXG4gICAgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlQWxsID0gZnVuY3Rpb24oc2VhcmNoLCByZXBsYWNlbWVudCkge1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiB0YXJnZXQucmVwbGFjZShuZXcgUmVnRXhwKHNlYXJjaCwgJ2cnKSwgcmVwbGFjZW1lbnQpO1xyXG4gICAgfTtcclxuICAgIEFycmF5LnByb3RvdHlwZS5maW5kV2l0aEF0dHIgPSBmdW5jdGlvbihhdHRyLCB2YWx1ZSkge1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXNbaV1bYXR0cl0gPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgQXJyYXkucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbiAob2xkSW5kZXgsIG5ld0luZGV4KSB7XHJcbiAgICAgICAgaWYgKG5ld0luZGV4ID49IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciBrID0gbmV3SW5kZXggLSB0aGlzLmxlbmd0aDtcclxuICAgICAgICAgICAgd2hpbGUgKChrLS0pICsgMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zcGxpY2UobmV3SW5kZXgsIDAsIHRoaXMuc3BsaWNlKG9sZEluZGV4LCAxKVswXSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgQXJyYXkucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIHRoaXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBBcnJheS5wcm90b3R5cGUucHVzaFRvSW5kZXggPSBmdW5jdGlvbihpbmRleCwgaXRlbSkge1xyXG4gICAgICAgIHRoaXMuc3BsaWNlKGluZGV4LCAwLCBpdGVtKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBBcnJheS5wcm90b3R5cGUuam9pbkF0dHIgPSBmdW5jdGlvbihhdHRyKSB7XHJcbiAgICAgICAgdmFyIGNoZWNrID0gYXR0ci5zcGxpdCgnLicpO1xyXG4gICAgICAgIHZhciBkZWVwID0gZmFsc2U7XHJcbiAgICAgICAgaWYoY2hlY2subGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBkZWVwID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJldCA9ICcnO1xyXG4gICAgICAgIGZvcih2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXNbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZighZGVlcCkge1xyXG4gICAgICAgICAgICAgICAgaWYoZW50cnlbYXR0cl0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXQgKz0gZW50cnlbYXR0cl0gKyAnLCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmKGVudHJ5W2NoZWNrWzBdXVtjaGVja1sxXV0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXQgKz0gZW50cnlbY2hlY2tbMF1dW2NoZWNrWzFdXSArICcsJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXQuc3RyaXBDb21tYXMoKTtcclxuICAgIH07XHJcbiAgICBBcnJheS5wcm90b3R5cGUuZGVlcGVyRmluZCA9IGZ1bmN0aW9uKGF0dHIsIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGNoZWNrID0gYXR0ci5zcGxpdCgnLicpO1xyXG4gICAgICAgIHZhciBkZWVwID0gZmFsc2U7XHJcbiAgICAgICAgaWYoY2hlY2subGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBkZWVwID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpc1tpbmRleF07XHJcbiAgICAgICAgICAgIGlmKCFkZWVwKSB7XHJcbiAgICAgICAgICAgICAgICBpZihlbnRyeVthdHRyXSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZihlbnRyeVtjaGVja1swXV1bY2hlY2tbMV1dID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy5nZXRDaGlsZEluZGV4ID0gZnVuY3Rpb24oY2hpbGQpIHtcclxuICAgIHZhciBwYXJlbnQgPSBjaGlsZC5wYXJlbnROb2RlO1xyXG4gICAgdmFyIGNoaWxkcmVuID0gcGFyZW50LmNoaWxkcmVuO1xyXG4gICAgdmFyIGNvdW50ID0gY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgdmFyIGNoaWxkX2luZGV4O1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNoaWxkID09PSBjaGlsZHJlbltpXSkge1xyXG4gICAgICAgICAgICBjaGlsZF9pbmRleCA9IGk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjaGlsZF9pbmRleDtcclxufTtcclxubW9kdWxlLmV4cG9ydHMudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbihlbGVtZW50LCBjTmFtZSkge1xyXG4gICAgdmFyIHNldHRlciA9IGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY05hbWUpID49IDAgPyByZW1vdmVDbGFzcyA6IGFkZENsYXNzO1xyXG4gICAgcmV0dXJuIHNldHRlcihlbGVtZW50LCBjTmFtZSk7XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzLmdldERhdGEgPSBmdW5jdGlvbihlbGVtZW50LCBhdHRyKSB7XHJcbiAgICByZXR1cm4gZWxlbWVudC5kYXRhc2V0ID8gZWxlbWVudC5kYXRhc2V0W2F0dHJdIDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIGF0dHIpO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy5hcnJheUxpa2VUb0FycmF5ID0gZnVuY3Rpb24oYXJyYXlMaWtlKSB7XHJcbiAgICByZXR1cm4gW10uc2xpY2UuY2FsbChhcnJheUxpa2UpO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy5zZXREYXRhID0gZnVuY3Rpb24oZWxlbWVudCwgYXR0ciwgZGF0YSkge1xyXG4gICAgaWYoZWxlbWVudC5kYXRhc2V0KSBlbGVtZW50LmRhdGFzZXRbYXR0cl0gPSBkYXRhO1xyXG4gICAgZWxzZSBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS0nICsgYXR0ciwgZGF0YSk7XHJcbn07XHJcbnZhciByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsZW1lbnQsIGNOYW1lKXtcclxuICAgIGlmKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY05hbWUpID49IDApIHtcclxuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IFN0cmluZyhlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlQWxsKGNOYW1lLCAnJykpLnN0cmlwU3BhY2VzKCk7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufTtcclxudmFyIGFkZENsYXNzID0gZnVuY3Rpb24oZWxlbWVudCwgY05hbWUpIHtcclxuICAgIGlmKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY05hbWUpIDwgMCkge1xyXG4gICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gU3RyaW5nKGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnICsgY05hbWUpLnN0cmlwU3BhY2VzKCk7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufTtcclxubW9kdWxlLmV4cG9ydHMucmVtb3ZlQ2xhc3MgPSByZW1vdmVDbGFzcztcclxubW9kdWxlLmV4cG9ydHMuYWRkQ2xhc3MgPSBhZGRDbGFzcztcclxubW9kdWxlLmV4cG9ydHMuc2NyZWVuU2l6ZSA9IGZ1bmN0aW9uKG1vYmlsZSwgc21hbGxEZXNrdG9wLCBtZWREZXNrdG9wKSB7XHJcbiAgICB2YXIgbW9iaWxlU2l6ZSA9IG1vYmlsZSA9PSB1bmRlZmluZWQgfHwgIU51bWJlcihtb2JpbGUpID8gOTAwIDogbW9iaWxlO1xyXG4gICAgdmFyIGRlc2t0b3BTbWFsbCA9IHNtYWxsRGVza3RvcCA9PSB1bmRlZmluZWQgPyAxMDAwIDogc21hbGxEZXNrdG9wO1xyXG4gICAgdmFyIGRlc2t0b3BNZWQgPSBtZWREZXNrdG9wID09IHVuZGVmaW5lZCA/IDE1MDAgOiBtZWREZXNrdG9wO1xyXG4gICAgLy9zaXplcyB0aGF0IGNvcnJlc3BvbmQgdG8gd2hhdCBJIG5lZWQgdGhlbSB0b28sIG1vYmlsZSBpcyBwcm9iYWJseSB3aGF0IHNob3VsZCBiZSBhZGp1c3RlZCBtb3JlIG9mdGVuXHJcbiAgICAvL1RPRE86QWRkIGJyZWFrcG9pbnRzIGZvciBjb21tb24gbW9iaWxlIGRldmljZXMsIHNwZWNpZnkgdHlwZSB0byBkZXZpY2VcclxuICAgIHZhciBzaXplID0gXCJcIiwgdHlwZSA9IFwiXCI7XHJcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XHJcbiAgICAvL3VzZWQgdG8gZG8gdGhpcyBieSBJRCwgYnV0IGFza2luZyBwZW9wbGUgdG8gYWRkIElEcyB0byB0aGVpciBib2R5IGlzIGp1c3QgZHVtYlxyXG4gICAgdmFyIHdpZHRoID0gYm9keS5vZmZzZXRXaWR0aDtcclxuICAgIC8vb2Zmc2V0V2lkdGggZ2l2ZXMgYSBnZW5lcmFsbHkgYWNjdXJhdGUgdmlldywgY2VydGFpbmx5IGdvb2QgZW5vdWdoIGZvciBqdXN0IENTU1xyXG4gICAgaWYod2lkdGggPD0gbW9iaWxlU2l6ZSkge1xyXG4gICAgICAgIHR5cGUgPSBcIm1vYmlsZVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0eXBlID0gXCJkZXNrdG9wXCI7XHJcbiAgICAgICAgaWYod2lkdGggPCBkZXNrdG9wTWVkKSB7XHJcbiAgICAgICAgICAgIGlmKHdpZHRoIDwgZGVza3RvcFNtYWxsKSB7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gXCJzbWFsbC1zY3JlZW5cIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBcIm1lZC1zY3JlZW5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNpemUgPSBcImxhcmdlLXNjcmVlblwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbW92ZUNsYXNzKGJvZHksICdtb2JpbGUnKTtcclxuICAgIHJlbW92ZUNsYXNzKGJvZHksICdkZXNrdG9wJyk7XHJcbiAgICByZW1vdmVDbGFzcyhib2R5LCAnc21hbGwtc2NyZWVuJyk7XHJcbiAgICByZW1vdmVDbGFzcyhib2R5LCAnbWVkLXNjcmVlbicpO1xyXG4gICAgcmVtb3ZlQ2xhc3MoYm9keSwgJ2xhcmdlLXNjcmVlbicpO1xyXG4gICAgYWRkQ2xhc3MoYm9keSwgdHlwZSk7XHJcbiAgICBhZGRDbGFzcyhib2R5LCBzaXplKTtcclxuICAgIC8vcHJlc2VydmVzIGFscmVhZHkgc2V0IGNsYXNzbmFtZXMhXHJcbn07Il19
