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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvc2NyaXB0L21haW4uanMiLCJwdWJsaWMvc2NyaXB0L3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XG51dGlscy5hdXRvVXRpbHMoKTtcbnV0aWxzLnNjcmVlblNpemUoKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBoZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoZWFkZXInKVswXTtcbiAgICBpZih3aW5kb3cuc2Nyb2xsWSA+IDEwMCkge1xuICAgICAgICB1dGlscy5hZGRDbGFzcyhoZWFkZXIsICdoZWFkZXItLW1pbmknKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhoZWFkZXIsICdoZWFkZXItLW1pbmknKTtcbiAgICB9XG59KTtcbnZhciBzaG93TW9yZVRyaWdnZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1tb3JlLXRyaWdnZXInKTtcbnNob3dNb3JlVHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIG5hdk92ZXJmbG93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmF2X19vdmVyZmxvdycpWzBdO1xuICAgIGlmKG5hdk92ZXJmbG93LmNsYXNzTmFtZS5pbmRleE9mKCctLWhpZGRlbicpID49IDApIHtcbiAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MobmF2T3ZlcmZsb3csICduYXZfX292ZXJmbG93LS1oaWRkZW4nKTtcbiAgICAgICAgZS50YXJnZXQuaW5uZXJUZXh0ID0gJ2Nsb3NlJztcbiAgICB9IGVsc2Uge1xuICAgICAgICB1dGlscy5hZGRDbGFzcyhuYXZPdmVyZmxvdywgJ25hdl9fb3ZlcmZsb3ctLWhpZGRlbicpO1xuICAgICAgICBlLnRhcmdldC5pbm5lclRleHQgPSAnbW9yZS4uLic7XG4gICAgfVxufSk7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXRpbHMuc2NyZWVuU2l6ZSk7XG52YXIgZXhwVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzb3J0YWJsZScpWzBdO1xuaWYoZXhwVGFibGUpIHtcbiAgICBleHBUYWJsZSA9IGRzdChleHBUYWJsZSk7XG4gICAgZXhwVGFibGUudGFibGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnVEgnKSB7XG4gICAgICAgICAgICB1dGlscy5hZGRDbGFzcyhlLnRhcmdldCwgJ2RzdC1oZWFkZXItbW91c2UtZG93bicpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZXhwVGFibGUudGFibGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnVEgnKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSB1dGlscy5nZXRDaGlsZEluZGV4KGUudGFyZ2V0KTtcbiAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKGUudGFyZ2V0LCAnZHN0LWhlYWRlci1ob3ZlcicpO1xuICAgICAgICAgICAgZXhwVGFibGUuZ2V0Q2VsbE9mQ29sdW1uKGluZGV4KS5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XG4gICAgICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3Moc2UsICdkc3QtY2VsbC1jb2x1bW4taG92ZXInKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdUUicpIHtcbiAgICAgICAgICAgIHZhciByb3cgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIHZhciBjZWxscyA9IHV0aWxzLmFycmF5TGlrZVRvQXJyYXkocm93LmNoaWxkcmVuKTtcbiAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKHJvdywgJ2RzdC1yb3ctaG92ZXInKTtcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goZnVuY3Rpb24oc2UpIHtcbiAgICAgICAgICAgICAgICB1dGlscy5hZGRDbGFzcyhzZSwgJ2RzdC1jZWxsLXJvdy1ob3ZlcicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1REJyB8fCBlLnRhcmdldC50YWdOYW1lID09PSAnU1BBTicpIHtcbiAgICAgICAgICAgIHZhciBjZWxsID0gZS50YXJnZXQudGFnTmFtZSA9PT0gJ1REJyA/IGUudGFyZ2V0IDogZS50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIHZhciBwYXJlbnRSb3cgPSBjZWxsLnBhcmVudE5vZGU7XG4gICAgICAgICAgICB2YXIgY2hpbGRDZWxscyA9IHV0aWxzLmFycmF5TGlrZVRvQXJyYXkocGFyZW50Um93LmNoaWxkcmVuKTtcbiAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKHBhcmVudFJvdywgJ2RzdC1yb3ctaG92ZXInKTtcbiAgICAgICAgICAgIGNoaWxkQ2VsbHMuZm9yRWFjaChmdW5jdGlvbihzZSkge1xuICAgICAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKHNlLCAnZHN0LWNlbGwtcm93LWhvdmVyJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBjZWxsZGV4ID0gdXRpbHMuZ2V0Q2hpbGRJbmRleChjZWxsKTtcbiAgICAgICAgICAgIGV4cFRhYmxlLmdldENlbGxPZkNvbHVtbihjZWxsZGV4KS5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XG4gICAgICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3Moc2UsICdkc3QtY29sdW1uLWNlbGwtaG92ZXInKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3MoZXhwVGFibGUuaGVhZGVyc1tjZWxsZGV4XSwgJ2RzdC1jb2x1bW4taGVhZGVyLWhvdmVyJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBleHBUYWJsZS50YWJsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnVEgnKSB7XG4gICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhlLnRhcmdldCwgJ2RzdC1oZWFkZXItbW91c2UtZG93bicpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZXhwVGFibGUudGFibGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdUSCcpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHV0aWxzLmdldENoaWxkSW5kZXgoZS50YXJnZXQpO1xuICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MoZS50YXJnZXQsICdkc3QtaGVhZGVyLW1vdXNlLWRvd24nKTtcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKGUudGFyZ2V0LCAnZHN0LWhlYWRlci1ob3ZlcicpO1xuICAgICAgICAgICAgZXhwVGFibGUuZ2V0Q2VsbE9mQ29sdW1uKGluZGV4KS5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XG4gICAgICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3Moc2UsICdkc3QtY2VsbC1jb2x1bW4taG92ZXInKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdUUicpIHtcbiAgICAgICAgICAgIHZhciByb3cgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKHJvdywgJ2RzdC1yb3ctaG92ZXInKTtcbiAgICAgICAgICAgIHZhciBjZWxscyA9IHV0aWxzLmFycmF5TGlrZVRvQXJyYXkocm93LmNoaWxkcmVuKTtcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goZnVuY3Rpb24oc2UpIHtcbiAgICAgICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhzZSwgJ2RzdC1jZWxsLXJvdy1ob3ZlcicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1REJyB8fCBlLnRhcmdldC50YWdOYW1lID09PSAnU1BBTicpIHtcbiAgICAgICAgICAgIHZhciBjZWxsID0gZS50YXJnZXQudGFnTmFtZSA9PT0gJ1REJyA/IGUudGFyZ2V0IDogZS50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIHZhciBwYXJlbnRSb3cgPSBjZWxsLnBhcmVudE5vZGU7XG4gICAgICAgICAgICB2YXIgY2hpbGRDZWxscyA9IHV0aWxzLmFycmF5TGlrZVRvQXJyYXkocGFyZW50Um93LmNoaWxkcmVuKTtcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKHBhcmVudFJvdywgJ2RzdC1yb3ctaG92ZXInKTtcbiAgICAgICAgICAgIGNoaWxkQ2VsbHMuZm9yRWFjaChmdW5jdGlvbihzZSkge1xuICAgICAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKHNlLCAnZHN0LWNlbGwtcm93LWhvdmVyJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBjZWxsZGV4ID0gdXRpbHMuZ2V0Q2hpbGRJbmRleChjZWxsKTtcbiAgICAgICAgICAgIGV4cFRhYmxlLmdldENlbGxPZkNvbHVtbihjZWxsZGV4KS5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XG4gICAgICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3Moc2UsICdkc3QtY29sdW1uLWNlbGwtaG92ZXInKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MoZXhwVGFibGUuaGVhZGVyc1tjZWxsZGV4XSwgJ2RzdC1jb2x1bW4taGVhZGVyLWhvdmVyJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbnZhciBsaWdodGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaWdodGJveCcpO1xuICAgIGlmKGxpZ2h0Ym94KSB7XG4gICAgICAgIGxpZ2h0Ym94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB1dGlscy5hZGRDbGFzcyh0aGlzLCAnbGlnaHRib3gtaGlkZGVuJyk7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhib2R5LCAnbGlnaHRib3gtdXAnKTtcbiAgICAgICAgfSk7XG4gICAgfVxudmFyIHBpY3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJyk7XG52YXIgbGlnaHRib3hJbWFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzcmMgPSB0aGlzLnNyYztcbiAgICB2YXIgdGV4dCA9IHRoaXMucGFyZW50Tm9kZS50ZXh0Q29udGVudDtcbiAgICB2YXIgbGIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlnaHRib3gnKTtcbiAgICB2YXIgbGJJbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlnaHRib3gtaW1hZ2UnKTtcbiAgICB2YXIgbGJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpZ2h0Ym94LXRleHQtY29udGVudCcpO1xuICAgIGxiSW1nLnNyYyA9IHNyYztcbiAgICBpZih0aGlzLmNsYXNzTmFtZS5pbmRleE9mKCdwb3J0cmFpdCcpID49IDApIHtcbiAgICAgICAgdXRpbHMuYWRkQ2xhc3MobGJJbWcsICdwb3J0cmFpdCcpO1xuICAgIH1cbiAgICBsYlRleHQuaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB1dGlscy5yZW1vdmVDbGFzcyhsYiwgJ2xpZ2h0Ym94LWhpZGRlbicpO1xuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICB1dGlscy5hZGRDbGFzcyhib2R5LCAnbGlnaHRib3gtdXAnKTtcbn07XG5pZihwaWNzKSB7XG4gICAgcGljcyA9IFtdLnNsaWNlLmNhbGwocGljcyk7XG4gICAgcGljcy5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpZ2h0Ym94SW1hZ2UpXG4gICAgfSlcbn1cbiIsIm1vZHVsZS5leHBvcnRzLmF1dG9VdGlscyA9IGZ1bmN0aW9uKCl7XG4gICAgaWYgKHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBBcnJheS5pc0FycmF5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFN0cmluZy5wcm90b3R5cGUuc3RyaXBDb21tYXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvKF4sKXwoLCQpL2csIFwiXCIpLnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgICBTdHJpbmcucHJvdG90eXBlLnN0cmlwU3BhY2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoLyheXFxzKXwoXFxzJCkvZywgXCJcIikudG9TdHJpbmcoKTtcbiAgICB9O1xuICAgIFN0cmluZy5wcm90b3R5cGUubGVmdFBhZCA9IGZ1bmN0aW9uKHBhZGRpbmcsIHBhZGRpbmdDaGFyYWN0ZXIpIHtcbiAgICAgICAgaWYoKCFwYWRkaW5nICYmIHBhZGRpbmcgIT09IDApIHx8IE51bWJlcihwYWRkaW5nKSA8IHRoaXMubGVuZ3RoKSByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICAgICAgICB2YXIgcGMgPSBwYWRkaW5nQ2hhcmFjdGVyID09PSB1bmRlZmluZWQgPyBcIiBcIiA6IHBhZGRpbmdDaGFyYWN0ZXI7XG4gICAgICAgIHZhciBwYWRkZWRTdHJpbmcgPSB0aGlzO1xuICAgICAgICBmb3IodmFyIHBpbmRleCA9IHRoaXMubGVuZ3RoOyBwaW5kZXggPCBwYWRkaW5nOyBwaW5kZXgrKykgcGFkZGVkU3RyaW5nID0gcGMgKyBwYWRkZWRTdHJpbmc7XG4gICAgICAgIHJldHVybiBwYWRkZWRTdHJpbmcudG9TdHJpbmcoKTtcbiAgICB9O1xuICAgIFN0cmluZy5wcm90b3R5cGUuaHlwaGVuc1RvQ2FtZWxzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvLShbYS16XSkvZywgZnVuY3Rpb24gKGcpIHsgcmV0dXJuIGdbMV0udG9VcHBlckNhc2UoKTsgfSk7XG4gICAgfTtcbiAgICBTdHJpbmcucHJvdG90eXBlLnJpZ2h0UGFkID0gZnVuY3Rpb24ocGFkZGluZywgcGFkZGluZ0NoYXJhY3Rlcikge1xuICAgICAgICBpZigoIXBhZGRpbmcgJiYgcGFkZGluZyAhPT0gMCkgfHwgTnVtYmVyKHBhZGRpbmcpIDwgdGhpcy5sZW5ndGgpIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgIHZhciBwYyA9IHBhZGRpbmdDaGFyYWN0ZXIgPT09IHVuZGVmaW5lZCA/IFwiIFwiIDogcGFkZGluZ0NoYXJhY3RlcjtcbiAgICAgICAgdmFyIHBhZGRlZFN0cmluZyA9IHRoaXM7XG4gICAgICAgIGZvcih2YXIgcGluZGV4ID0gdGhpcy5sZW5ndGg7IHBpbmRleCA8IHBhZGRpbmc7IHBpbmRleCsrKSBwYWRkZWRTdHJpbmcgPSBwYWRkZWRTdHJpbmcgKyBwYztcbiAgICAgICAgcmV0dXJuIHBhZGRlZFN0cmluZy50b1N0cmluZygpO1xuICAgIH07XG4gICAgU3RyaW5nLnByb3RvdHlwZS5sZWZ0VHJ1bmMgPSBmdW5jdGlvbih0cnVuY1RvKSB7XG4gICAgICAgIGlmKCghdHJ1bmNUbyAmJiB0cnVuY1RvICE9PSAwKSB8fCB0aGlzLmxlbmd0aCA8IHRydW5jVG8pIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuc3Vic3RyKDAsIHRydW5jVG8pO1xuICAgIH07XG4gICAgU3RyaW5nLnByb3RvdHlwZS5yaWdodFRydW5jID0gZnVuY3Rpb24odHJ1bmNUbykge1xuICAgICAgICBpZigoIXRydW5jVG8gJiYgdHJ1bmNUbyAhPT0gMCkgfHwgdGhpcy5sZW5ndGggPCB0cnVuY1RvKSByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICAgICAgICBlbHNlIHJldHVybiB0aGlzLnN1YnN0cih0aGlzLmxlbmd0aCAtIHRydW5jVG8sIHRoaXMubGVuZ3RoIC0gMSk7XG4gICAgfTtcbiAgICBTdHJpbmcucHJvdG90eXBlLmxlZnROb3JtYWxpemUgPSBmdW5jdGlvbihsZW5ndGgsIHBhZGRpbmdDaGFyYWN0ZXIpIHtcbiAgICAgICAgaWYoIWxlbmd0aCAmJiBsZW5ndGggIT09IDApIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmKHRoaXMubGVuZ3RoID4gbGVuZ3RoKSByZXR1cm4gdGhpcy5sZWZ0VHJ1bmMobGVuZ3RoKTtcbiAgICAgICAgZWxzZSAgcmV0dXJuIHRoaXMubGVmdFBhZChsZW5ndGgsIHBhZGRpbmdDaGFyYWN0ZXIpO1xuICAgIH07XG4gICAgU3RyaW5nLnByb3RvdHlwZS5yaWdodE5vcm1hbGl6ZSA9IGZ1bmN0aW9uKGxlbmd0aCwgcGFkZGluZ0NoYXJhY3Rlcikge1xuICAgICAgICBpZigoIWxlbmd0aCAmJiBsZW5ndGggIT09IDApKSByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICAgICAgICBpZih0aGlzLmxlbmd0aCA+IGxlbmd0aCkgcmV0dXJuIHRoaXMucmlnaHRUcnVuYyhsZW5ndGgpO1xuICAgICAgICBlbHNlIHJldHVybiB0aGlzLnJpZ2h0UGFkKGxlbmd0aCwgcGFkZGluZ0NoYXJhY3Rlcik7XG4gICAgfTtcbiAgICBTdHJpbmcucHJvdG90eXBlLnVuQ2FtZWwgPSBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC8oW0EtWl0pL2csICcgJDEnKTtcbiAgICB9O1xuICAgIFN0cmluZy5wcm90b3R5cGUucmVwbGFjZUFsbCA9IGZ1bmN0aW9uKHNlYXJjaCwgcmVwbGFjZW1lbnQpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXM7XG4gICAgICAgIHJldHVybiB0YXJnZXQucmVwbGFjZShuZXcgUmVnRXhwKHNlYXJjaCwgJ2cnKSwgcmVwbGFjZW1lbnQpO1xuICAgIH07XG4gICAgQXJyYXkucHJvdG90eXBlLmZpbmRXaXRoQXR0ciA9IGZ1bmN0aW9uKGF0dHIsIHZhbHVlKSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZih0aGlzW2ldW2F0dHJdID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIEFycmF5LnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24gKG9sZEluZGV4LCBuZXdJbmRleCkge1xuICAgICAgICBpZiAobmV3SW5kZXggPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBrID0gbmV3SW5kZXggLSB0aGlzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICgoay0tKSArIDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNwbGljZShuZXdJbmRleCwgMCwgdGhpcy5zcGxpY2Uob2xkSW5kZXgsIDEpWzBdKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBBcnJheS5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBBcnJheS5wcm90b3R5cGUucHVzaFRvSW5kZXggPSBmdW5jdGlvbihpbmRleCwgaXRlbSkge1xuICAgICAgICB0aGlzLnNwbGljZShpbmRleCwgMCwgaXRlbSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQXJyYXkucHJvdG90eXBlLmpvaW5BdHRyID0gZnVuY3Rpb24oYXR0cikge1xuICAgICAgICB2YXIgY2hlY2sgPSBhdHRyLnNwbGl0KCcuJyk7XG4gICAgICAgIHZhciBkZWVwID0gZmFsc2U7XG4gICAgICAgIGlmKGNoZWNrLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGRlZXAgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXQgPSAnJztcbiAgICAgICAgZm9yKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXNbaW5kZXhdO1xuICAgICAgICAgICAgaWYoIWRlZXApIHtcbiAgICAgICAgICAgICAgICBpZihlbnRyeVthdHRyXSkge1xuICAgICAgICAgICAgICAgICAgICByZXQgKz0gZW50cnlbYXR0cl0gKyAnLCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKGVudHJ5W2NoZWNrWzBdXVtjaGVja1sxXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0ICs9IGVudHJ5W2NoZWNrWzBdXVtjaGVja1sxXV0gKyAnLCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldC5zdHJpcENvbW1hcygpO1xuICAgIH07XG4gICAgQXJyYXkucHJvdG90eXBlLmRlZXBlckZpbmQgPSBmdW5jdGlvbihhdHRyLCB2YWx1ZSkge1xuICAgICAgICB2YXIgY2hlY2sgPSBhdHRyLnNwbGl0KCcuJyk7XG4gICAgICAgIHZhciBkZWVwID0gZmFsc2U7XG4gICAgICAgIGlmKGNoZWNrLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGRlZXAgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGZvcih2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzW2luZGV4XTtcbiAgICAgICAgICAgIGlmKCFkZWVwKSB7XG4gICAgICAgICAgICAgICAgaWYoZW50cnlbYXR0cl0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKGVudHJ5W2NoZWNrWzBdXVtjaGVja1sxXV0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG59O1xubW9kdWxlLmV4cG9ydHMuZ2V0Q2hpbGRJbmRleCA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgdmFyIHBhcmVudCA9IGNoaWxkLnBhcmVudE5vZGU7XG4gICAgdmFyIGNoaWxkcmVuID0gcGFyZW50LmNoaWxkcmVuO1xuICAgIHZhciBjb3VudCA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICB2YXIgY2hpbGRfaW5kZXg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgIGlmIChjaGlsZCA9PT0gY2hpbGRyZW5baV0pIHtcbiAgICAgICAgICAgIGNoaWxkX2luZGV4ID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjaGlsZF9pbmRleDtcbn07XG5tb2R1bGUuZXhwb3J0cy50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uKGVsZW1lbnQsIGNOYW1lKSB7XG4gICAgdmFyIHNldHRlciA9IGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY05hbWUpID49IDAgPyByZW1vdmVDbGFzcyA6IGFkZENsYXNzO1xuICAgIHJldHVybiBzZXR0ZXIoZWxlbWVudCwgY05hbWUpO1xufTtcbm1vZHVsZS5leHBvcnRzLmdldERhdGEgPSBmdW5jdGlvbihlbGVtZW50LCBhdHRyKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuZGF0YXNldCA/IGVsZW1lbnQuZGF0YXNldFthdHRyXSA6IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBhdHRyKTtcbn07XG5tb2R1bGUuZXhwb3J0cy5hcnJheUxpa2VUb0FycmF5ID0gZnVuY3Rpb24oYXJyYXlMaWtlKSB7XG4gICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwoYXJyYXlMaWtlKTtcbn07XG5tb2R1bGUuZXhwb3J0cy5zZXREYXRhID0gZnVuY3Rpb24oZWxlbWVudCwgYXR0ciwgZGF0YSkge1xuICAgIGlmKGVsZW1lbnQuZGF0YXNldCkgZWxlbWVudC5kYXRhc2V0W2F0dHJdID0gZGF0YTtcbiAgICBlbHNlIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLScgKyBhdHRyLCBkYXRhKTtcbn07XG52YXIgcmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbGVtZW50LCBjTmFtZSl7XG4gICAgaWYoZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZihjTmFtZSkgPj0gMCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IFN0cmluZyhlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlQWxsKGNOYW1lLCAnJykpLnN0cmlwU3BhY2VzKCk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn07XG52YXIgYWRkQ2xhc3MgPSBmdW5jdGlvbihlbGVtZW50LCBjTmFtZSkge1xuICAgIGlmKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY05hbWUpIDwgMCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IFN0cmluZyhlbGVtZW50LmNsYXNzTmFtZSArICcgJyArIGNOYW1lKS5zdHJpcFNwYWNlcygpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59O1xubW9kdWxlLmV4cG9ydHMucmVtb3ZlQ2xhc3MgPSByZW1vdmVDbGFzcztcbm1vZHVsZS5leHBvcnRzLmFkZENsYXNzID0gYWRkQ2xhc3M7XG5tb2R1bGUuZXhwb3J0cy5zY3JlZW5TaXplID0gZnVuY3Rpb24obW9iaWxlLCBzbWFsbERlc2t0b3AsIG1lZERlc2t0b3ApIHtcbiAgICB2YXIgbW9iaWxlU2l6ZSA9IG1vYmlsZSA9PSB1bmRlZmluZWQgfHwgIU51bWJlcihtb2JpbGUpID8gOTAwIDogbW9iaWxlO1xuICAgIHZhciBkZXNrdG9wU21hbGwgPSBzbWFsbERlc2t0b3AgPT0gdW5kZWZpbmVkID8gMTAwMCA6IHNtYWxsRGVza3RvcDtcbiAgICB2YXIgZGVza3RvcE1lZCA9IG1lZERlc2t0b3AgPT0gdW5kZWZpbmVkID8gMTUwMCA6IG1lZERlc2t0b3A7XG4gICAgLy9zaXplcyB0aGF0IGNvcnJlc3BvbmQgdG8gd2hhdCBJIG5lZWQgdGhlbSB0b28sIG1vYmlsZSBpcyBwcm9iYWJseSB3aGF0IHNob3VsZCBiZSBhZGp1c3RlZCBtb3JlIG9mdGVuXG4gICAgLy9UT0RPOkFkZCBicmVha3BvaW50cyBmb3IgY29tbW9uIG1vYmlsZSBkZXZpY2VzLCBzcGVjaWZ5IHR5cGUgdG8gZGV2aWNlXG4gICAgdmFyIHNpemUgPSBcIlwiLCB0eXBlID0gXCJcIjtcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgLy91c2VkIHRvIGRvIHRoaXMgYnkgSUQsIGJ1dCBhc2tpbmcgcGVvcGxlIHRvIGFkZCBJRHMgdG8gdGhlaXIgYm9keSBpcyBqdXN0IGR1bWJcbiAgICB2YXIgd2lkdGggPSBib2R5Lm9mZnNldFdpZHRoO1xuICAgIC8vb2Zmc2V0V2lkdGggZ2l2ZXMgYSBnZW5lcmFsbHkgYWNjdXJhdGUgdmlldywgY2VydGFpbmx5IGdvb2QgZW5vdWdoIGZvciBqdXN0IENTU1xuICAgIGlmKHdpZHRoIDw9IG1vYmlsZVNpemUpIHtcbiAgICAgICAgdHlwZSA9IFwibW9iaWxlXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdHlwZSA9IFwiZGVza3RvcFwiO1xuICAgICAgICBpZih3aWR0aCA8IGRlc2t0b3BNZWQpIHtcbiAgICAgICAgICAgIGlmKHdpZHRoIDwgZGVza3RvcFNtYWxsKSB7XG4gICAgICAgICAgICAgICAgc2l6ZSA9IFwic21hbGwtc2NyZWVuXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNpemUgPSBcIm1lZC1zY3JlZW5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNpemUgPSBcImxhcmdlLXNjcmVlblwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZUNsYXNzKGJvZHksICdtb2JpbGUnKTtcbiAgICByZW1vdmVDbGFzcyhib2R5LCAnZGVza3RvcCcpO1xuICAgIHJlbW92ZUNsYXNzKGJvZHksICdzbWFsbC1zY3JlZW4nKTtcbiAgICByZW1vdmVDbGFzcyhib2R5LCAnbWVkLXNjcmVlbicpO1xuICAgIHJlbW92ZUNsYXNzKGJvZHksICdsYXJnZS1zY3JlZW4nKTtcbiAgICBhZGRDbGFzcyhib2R5LCB0eXBlKTtcbiAgICBhZGRDbGFzcyhib2R5LCBzaXplKTtcbiAgICAvL3ByZXNlcnZlcyBhbHJlYWR5IHNldCBjbGFzc25hbWVzIVxufTsiXX0=
