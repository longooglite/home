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
var arrayCopy = function(arr) {
    var newarr = [];
    for(var a = 0; a < arr.length; a++) {
        if(arr[a] !== null && typeof arr[a] === 'object') {
            newarr[a] = carbonCopy(arr[a]);
        } else if(arr[a].constructor === Array) {
            newarr[a] = arrayCopy(arr[a]);
        } else {
            newarr[a] = arr[a];
        }
    }
}
module.exports.arrayCopy = arrayCopy;
var carbonCopy = function(obj) {
    var newobj = {};
    for(var i in obj) {
        if(obj.hasOwnProperty(i)) {
            if(obj[i] !== null && typeof obj[i] === 'object') {
                newobj[i] = carbonCopy(obj[i]);
            } else if(obj[i].constructor === Array) {
                newobj[i] = arrayCopy(obj[i]);
            } else {
                newobj[i] = obj[i];
            }
        }
    }
    return newobj;
}
module.exports.carbonCopy = carbonCopy;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvc2NyaXB0L21haW4uanMiLCJwdWJsaWMvc2NyaXB0L3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscy5qcycpO1xyXG51dGlscy5hdXRvVXRpbHMoKTtcclxudXRpbHMuc2NyZWVuU2l6ZSgpO1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBoZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoZWFkZXInKVswXTtcclxuICAgIGlmKHdpbmRvdy5zY3JvbGxZID4gMTAwKSB7XHJcbiAgICAgICAgdXRpbHMuYWRkQ2xhc3MoaGVhZGVyLCAnaGVhZGVyLS1taW5pJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKGhlYWRlciwgJ2hlYWRlci0tbWluaScpO1xyXG4gICAgfVxyXG59KTtcclxudmFyIHNob3dNb3JlVHJpZ2dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LW1vcmUtdHJpZ2dlcicpO1xyXG5zaG93TW9yZVRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgbmF2T3ZlcmZsb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCduYXZfX292ZXJmbG93JylbMF07XHJcbiAgICBpZihuYXZPdmVyZmxvdy5jbGFzc05hbWUuaW5kZXhPZignLS1oaWRkZW4nKSA+PSAwKSB7XHJcbiAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MobmF2T3ZlcmZsb3csICduYXZfX292ZXJmbG93LS1oaWRkZW4nKTtcclxuICAgICAgICBlLnRhcmdldC5pbm5lclRleHQgPSAnY2xvc2UnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB1dGlscy5hZGRDbGFzcyhuYXZPdmVyZmxvdywgJ25hdl9fb3ZlcmZsb3ctLWhpZGRlbicpO1xyXG4gICAgICAgIGUudGFyZ2V0LmlubmVyVGV4dCA9ICdtb3JlLi4uJztcclxuICAgIH1cclxufSk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1dGlscy5zY3JlZW5TaXplKTtcclxudmFyIGV4cFRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc29ydGFibGUnKVswXTtcclxuaWYoZXhwVGFibGUpIHtcclxuICAgIGV4cFRhYmxlID0gZHN0KGV4cFRhYmxlKTtcclxuICAgIGV4cFRhYmxlLnRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnVEgnKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKGUudGFyZ2V0LCAnZHN0LWhlYWRlci1tb3VzZS1kb3duJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBleHBUYWJsZS50YWJsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1RIJykge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSB1dGlscy5nZXRDaGlsZEluZGV4KGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3MoZS50YXJnZXQsICdkc3QtaGVhZGVyLWhvdmVyJyk7XHJcbiAgICAgICAgICAgIGV4cFRhYmxlLmdldENlbGxPZkNvbHVtbihpbmRleCkuZm9yRWFjaChmdW5jdGlvbihzZSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3Moc2UsICdkc3QtY2VsbC1jb2x1bW4taG92ZXInKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdUUicpIHtcclxuICAgICAgICAgICAgdmFyIHJvdyA9IGUudGFyZ2V0O1xyXG4gICAgICAgICAgICB2YXIgY2VsbHMgPSB1dGlscy5hcnJheUxpa2VUb0FycmF5KHJvdy5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKHJvdywgJ2RzdC1yb3ctaG92ZXInKTtcclxuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaChmdW5jdGlvbihzZSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3Moc2UsICdkc3QtY2VsbC1yb3ctaG92ZXInKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdURCcgfHwgZS50YXJnZXQudGFnTmFtZSA9PT0gJ1NQQU4nKSB7XHJcbiAgICAgICAgICAgIHZhciBjZWxsID0gZS50YXJnZXQudGFnTmFtZSA9PT0gJ1REJyA/IGUudGFyZ2V0IDogZS50YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgdmFyIHBhcmVudFJvdyA9IGNlbGwucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgdmFyIGNoaWxkQ2VsbHMgPSB1dGlscy5hcnJheUxpa2VUb0FycmF5KHBhcmVudFJvdy5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKHBhcmVudFJvdywgJ2RzdC1yb3ctaG92ZXInKTtcclxuICAgICAgICAgICAgY2hpbGRDZWxscy5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5hZGRDbGFzcyhzZSwgJ2RzdC1jZWxsLXJvdy1ob3ZlcicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGNlbGxkZXggPSB1dGlscy5nZXRDaGlsZEluZGV4KGNlbGwpO1xyXG4gICAgICAgICAgICBleHBUYWJsZS5nZXRDZWxsT2ZDb2x1bW4oY2VsbGRleCkuZm9yRWFjaChmdW5jdGlvbihzZSkge1xyXG4gICAgICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3Moc2UsICdkc3QtY29sdW1uLWNlbGwtaG92ZXInKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKGV4cFRhYmxlLmhlYWRlcnNbY2VsbGRleF0sICdkc3QtY29sdW1uLWhlYWRlci1ob3ZlcicpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgZXhwVGFibGUudGFibGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnVEgnKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKGUudGFyZ2V0LCAnZHN0LWhlYWRlci1tb3VzZS1kb3duJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBleHBUYWJsZS50YWJsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnVEgnKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHV0aWxzLmdldENoaWxkSW5kZXgoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhlLnRhcmdldCwgJ2RzdC1oZWFkZXItbW91c2UtZG93bicpO1xyXG4gICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhlLnRhcmdldCwgJ2RzdC1oZWFkZXItaG92ZXInKTtcclxuICAgICAgICAgICAgZXhwVGFibGUuZ2V0Q2VsbE9mQ29sdW1uKGluZGV4KS5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhzZSwgJ2RzdC1jZWxsLWNvbHVtbi1ob3ZlcicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1RSJykge1xyXG4gICAgICAgICAgICB2YXIgcm93ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKHJvdywgJ2RzdC1yb3ctaG92ZXInKTtcclxuICAgICAgICAgICAgdmFyIGNlbGxzID0gdXRpbHMuYXJyYXlMaWtlVG9BcnJheShyb3cuY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhzZSwgJ2RzdC1jZWxsLXJvdy1ob3ZlcicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1REJyB8fCBlLnRhcmdldC50YWdOYW1lID09PSAnU1BBTicpIHtcclxuICAgICAgICAgICAgdmFyIGNlbGwgPSBlLnRhcmdldC50YWdOYW1lID09PSAnVEQnID8gZS50YXJnZXQgOiBlLnRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50Um93ID0gY2VsbC5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICB2YXIgY2hpbGRDZWxscyA9IHV0aWxzLmFycmF5TGlrZVRvQXJyYXkocGFyZW50Um93LmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MocGFyZW50Um93LCAnZHN0LXJvdy1ob3ZlcicpO1xyXG4gICAgICAgICAgICBjaGlsZENlbGxzLmZvckVhY2goZnVuY3Rpb24oc2UpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKHNlLCAnZHN0LWNlbGwtcm93LWhvdmVyJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgY2VsbGRleCA9IHV0aWxzLmdldENoaWxkSW5kZXgoY2VsbCk7XHJcbiAgICAgICAgICAgIGV4cFRhYmxlLmdldENlbGxPZkNvbHVtbihjZWxsZGV4KS5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhzZSwgJ2RzdC1jb2x1bW4tY2VsbC1ob3ZlcicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MoZXhwVGFibGUuaGVhZGVyc1tjZWxsZGV4XSwgJ2RzdC1jb2x1bW4taGVhZGVyLWhvdmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxudmFyIGxpZ2h0Ym94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpZ2h0Ym94Jyk7XHJcbiAgICBpZihsaWdodGJveCkge1xyXG4gICAgICAgIGxpZ2h0Ym94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKHRoaXMsICdsaWdodGJveC1oaWRkZW4nKTtcclxuICAgICAgICAgICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xyXG4gICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhib2R5LCAnbGlnaHRib3gtdXAnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxudmFyIHBpY3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJyk7XHJcbnZhciBsaWdodGJveEltYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgc3JjID0gdGhpcy5zcmM7XHJcbiAgICB2YXIgdGV4dCA9IHRoaXMucGFyZW50Tm9kZS50ZXh0Q29udGVudDtcclxuICAgIHZhciBsYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaWdodGJveCcpO1xyXG4gICAgdmFyIGxiSW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpZ2h0Ym94LWltYWdlJyk7XHJcbiAgICB2YXIgbGJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpZ2h0Ym94LXRleHQtY29udGVudCcpO1xyXG4gICAgbGJJbWcuc3JjID0gc3JjO1xyXG4gICAgaWYodGhpcy5jbGFzc05hbWUuaW5kZXhPZigncG9ydHJhaXQnKSA+PSAwKSB7XHJcbiAgICAgICAgdXRpbHMuYWRkQ2xhc3MobGJJbWcsICdwb3J0cmFpdCcpO1xyXG4gICAgfVxyXG4gICAgbGJUZXh0LmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgICB1dGlscy5yZW1vdmVDbGFzcyhsYiwgJ2xpZ2h0Ym94LWhpZGRlbicpO1xyXG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xyXG4gICAgdXRpbHMuYWRkQ2xhc3MoYm9keSwgJ2xpZ2h0Ym94LXVwJyk7XHJcbn07XHJcbmlmKHBpY3MpIHtcclxuICAgIHBpY3MgPSBbXS5zbGljZS5jYWxsKHBpY3MpO1xyXG4gICAgcGljcy5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGlnaHRib3hJbWFnZSlcclxuICAgIH0pXHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMuYXV0b1V0aWxzID0gZnVuY3Rpb24oKXtcclxuICAgIGlmICh0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBBcnJheS5pc0FycmF5ID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgU3RyaW5nLnByb3RvdHlwZS5zdHJpcENvbW1hcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoLyheLCl8KCwkKS9nLCBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgfTtcclxuICAgIFN0cmluZy5wcm90b3R5cGUuc3RyaXBTcGFjZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC8oXlxccyl8KFxccyQpL2csIFwiXCIpLnRvU3RyaW5nKCk7XHJcbiAgICB9O1xyXG4gICAgU3RyaW5nLnByb3RvdHlwZS5sZWZ0UGFkID0gZnVuY3Rpb24ocGFkZGluZywgcGFkZGluZ0NoYXJhY3Rlcikge1xyXG4gICAgICAgIGlmKCghcGFkZGluZyAmJiBwYWRkaW5nICE9PSAwKSB8fCBOdW1iZXIocGFkZGluZykgPCB0aGlzLmxlbmd0aCkgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcclxuICAgICAgICB2YXIgcGMgPSBwYWRkaW5nQ2hhcmFjdGVyID09PSB1bmRlZmluZWQgPyBcIiBcIiA6IHBhZGRpbmdDaGFyYWN0ZXI7XHJcbiAgICAgICAgdmFyIHBhZGRlZFN0cmluZyA9IHRoaXM7XHJcbiAgICAgICAgZm9yKHZhciBwaW5kZXggPSB0aGlzLmxlbmd0aDsgcGluZGV4IDwgcGFkZGluZzsgcGluZGV4KyspIHBhZGRlZFN0cmluZyA9IHBjICsgcGFkZGVkU3RyaW5nO1xyXG4gICAgICAgIHJldHVybiBwYWRkZWRTdHJpbmcudG9TdHJpbmcoKTtcclxuICAgIH07XHJcbiAgICBTdHJpbmcucHJvdG90eXBlLmh5cGhlbnNUb0NhbWVscyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvLShbYS16XSkvZywgZnVuY3Rpb24gKGcpIHsgcmV0dXJuIGdbMV0udG9VcHBlckNhc2UoKTsgfSk7XHJcbiAgICB9O1xyXG4gICAgU3RyaW5nLnByb3RvdHlwZS5yaWdodFBhZCA9IGZ1bmN0aW9uKHBhZGRpbmcsIHBhZGRpbmdDaGFyYWN0ZXIpIHtcclxuICAgICAgICBpZigoIXBhZGRpbmcgJiYgcGFkZGluZyAhPT0gMCkgfHwgTnVtYmVyKHBhZGRpbmcpIDwgdGhpcy5sZW5ndGgpIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdmFyIHBjID0gcGFkZGluZ0NoYXJhY3RlciA9PT0gdW5kZWZpbmVkID8gXCIgXCIgOiBwYWRkaW5nQ2hhcmFjdGVyO1xyXG4gICAgICAgIHZhciBwYWRkZWRTdHJpbmcgPSB0aGlzO1xyXG4gICAgICAgIGZvcih2YXIgcGluZGV4ID0gdGhpcy5sZW5ndGg7IHBpbmRleCA8IHBhZGRpbmc7IHBpbmRleCsrKSBwYWRkZWRTdHJpbmcgPSBwYWRkZWRTdHJpbmcgKyBwYztcclxuICAgICAgICByZXR1cm4gcGFkZGVkU3RyaW5nLnRvU3RyaW5nKCk7XHJcbiAgICB9O1xyXG4gICAgU3RyaW5nLnByb3RvdHlwZS5sZWZ0VHJ1bmMgPSBmdW5jdGlvbih0cnVuY1RvKSB7XHJcbiAgICAgICAgaWYoKCF0cnVuY1RvICYmIHRydW5jVG8gIT09IDApIHx8IHRoaXMubGVuZ3RoIDwgdHJ1bmNUbykgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcclxuICAgICAgICBlbHNlIHJldHVybiB0aGlzLnN1YnN0cigwLCB0cnVuY1RvKTtcclxuICAgIH07XHJcbiAgICBTdHJpbmcucHJvdG90eXBlLnJpZ2h0VHJ1bmMgPSBmdW5jdGlvbih0cnVuY1RvKSB7XHJcbiAgICAgICAgaWYoKCF0cnVuY1RvICYmIHRydW5jVG8gIT09IDApIHx8IHRoaXMubGVuZ3RoIDwgdHJ1bmNUbykgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcclxuICAgICAgICBlbHNlIHJldHVybiB0aGlzLnN1YnN0cih0aGlzLmxlbmd0aCAtIHRydW5jVG8sIHRoaXMubGVuZ3RoIC0gMSk7XHJcbiAgICB9O1xyXG4gICAgU3RyaW5nLnByb3RvdHlwZS5sZWZ0Tm9ybWFsaXplID0gZnVuY3Rpb24obGVuZ3RoLCBwYWRkaW5nQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgaWYoIWxlbmd0aCAmJiBsZW5ndGggIT09IDApIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYodGhpcy5sZW5ndGggPiBsZW5ndGgpIHJldHVybiB0aGlzLmxlZnRUcnVuYyhsZW5ndGgpO1xyXG4gICAgICAgIGVsc2UgIHJldHVybiB0aGlzLmxlZnRQYWQobGVuZ3RoLCBwYWRkaW5nQ2hhcmFjdGVyKTtcclxuICAgIH07XHJcbiAgICBTdHJpbmcucHJvdG90eXBlLnJpZ2h0Tm9ybWFsaXplID0gZnVuY3Rpb24obGVuZ3RoLCBwYWRkaW5nQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgaWYoKCFsZW5ndGggJiYgbGVuZ3RoICE9PSAwKSkgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcclxuICAgICAgICBpZih0aGlzLmxlbmd0aCA+IGxlbmd0aCkgcmV0dXJuIHRoaXMucmlnaHRUcnVuYyhsZW5ndGgpO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMucmlnaHRQYWQobGVuZ3RoLCBwYWRkaW5nQ2hhcmFjdGVyKTtcclxuICAgIH07XHJcbiAgICBTdHJpbmcucHJvdG90eXBlLnVuQ2FtZWwgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoLyhbQS1aXSkvZywgJyAkMScpO1xyXG4gICAgfTtcclxuICAgIFN0cmluZy5wcm90b3R5cGUucmVwbGFjZUFsbCA9IGZ1bmN0aW9uKHNlYXJjaCwgcmVwbGFjZW1lbnQpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gdGFyZ2V0LnJlcGxhY2UobmV3IFJlZ0V4cChzZWFyY2gsICdnJyksIHJlcGxhY2VtZW50KTtcclxuICAgIH07XHJcbiAgICBBcnJheS5wcm90b3R5cGUuZmluZFdpdGhBdHRyID0gZnVuY3Rpb24oYXR0ciwgdmFsdWUpIHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBpZih0aGlzW2ldW2F0dHJdID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuICAgIEFycmF5LnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24gKG9sZEluZGV4LCBuZXdJbmRleCkge1xyXG4gICAgICAgIGlmIChuZXdJbmRleCA+PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgayA9IG5ld0luZGV4IC0gdGhpcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHdoaWxlICgoay0tKSArIDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHVzaCh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3BsaWNlKG5ld0luZGV4LCAwLCB0aGlzLnNwbGljZShvbGRJbmRleCwgMSlbMF0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEFycmF5LnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgQXJyYXkucHJvdG90eXBlLnB1c2hUb0luZGV4ID0gZnVuY3Rpb24oaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICB0aGlzLnNwbGljZShpbmRleCwgMCwgaXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgQXJyYXkucHJvdG90eXBlLmpvaW5BdHRyID0gZnVuY3Rpb24oYXR0cikge1xyXG4gICAgICAgIHZhciBjaGVjayA9IGF0dHIuc3BsaXQoJy4nKTtcclxuICAgICAgICB2YXIgZGVlcCA9IGZhbHNlO1xyXG4gICAgICAgIGlmKGNoZWNrLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgZGVlcCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXQgPSAnJztcclxuICAgICAgICBmb3IodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzW2luZGV4XTtcclxuICAgICAgICAgICAgaWYoIWRlZXApIHtcclxuICAgICAgICAgICAgICAgIGlmKGVudHJ5W2F0dHJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0ICs9IGVudHJ5W2F0dHJdICsgJywnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZihlbnRyeVtjaGVja1swXV1bY2hlY2tbMV1dKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0ICs9IGVudHJ5W2NoZWNrWzBdXVtjaGVja1sxXV0gKyAnLCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0LnN0cmlwQ29tbWFzKCk7XHJcbiAgICB9O1xyXG4gICAgQXJyYXkucHJvdG90eXBlLmRlZXBlckZpbmQgPSBmdW5jdGlvbihhdHRyLCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciBjaGVjayA9IGF0dHIuc3BsaXQoJy4nKTtcclxuICAgICAgICB2YXIgZGVlcCA9IGZhbHNlO1xyXG4gICAgICAgIGlmKGNoZWNrLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgZGVlcCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcih2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXNbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZighZGVlcCkge1xyXG4gICAgICAgICAgICAgICAgaWYoZW50cnlbYXR0cl0gPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYoZW50cnlbY2hlY2tbMF1dW2NoZWNrWzFdXSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxufTtcclxubW9kdWxlLmV4cG9ydHMuZ2V0Q2hpbGRJbmRleCA9IGZ1bmN0aW9uKGNoaWxkKSB7XHJcbiAgICB2YXIgcGFyZW50ID0gY2hpbGQucGFyZW50Tm9kZTtcclxuICAgIHZhciBjaGlsZHJlbiA9IHBhcmVudC5jaGlsZHJlbjtcclxuICAgIHZhciBjb3VudCA9IGNoaWxkcmVuLmxlbmd0aDtcclxuICAgIHZhciBjaGlsZF9pbmRleDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgIGlmIChjaGlsZCA9PT0gY2hpbGRyZW5baV0pIHtcclxuICAgICAgICAgICAgY2hpbGRfaW5kZXggPSBpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hpbGRfaW5kZXg7XHJcbn07XHJcbnZhciBhcnJheUNvcHkgPSBmdW5jdGlvbihhcnIpIHtcclxuICAgIHZhciBuZXdhcnIgPSBbXTtcclxuICAgIGZvcih2YXIgYSA9IDA7IGEgPCBhcnIubGVuZ3RoOyBhKyspIHtcclxuICAgICAgICBpZihhcnJbYV0gIT09IG51bGwgJiYgdHlwZW9mIGFyclthXSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgbmV3YXJyW2FdID0gY2FyYm9uQ29weShhcnJbYV0pO1xyXG4gICAgICAgIH0gZWxzZSBpZihhcnJbYV0uY29uc3RydWN0b3IgPT09IEFycmF5KSB7XHJcbiAgICAgICAgICAgIG5ld2FyclthXSA9IGFycmF5Q29weShhcnJbYV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld2FyclthXSA9IGFyclthXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMuYXJyYXlDb3B5ID0gYXJyYXlDb3B5O1xyXG52YXIgY2FyYm9uQ29weSA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgdmFyIG5ld29iaiA9IHt9O1xyXG4gICAgZm9yKHZhciBpIGluIG9iaikge1xyXG4gICAgICAgIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICAgICAgICBpZihvYmpbaV0gIT09IG51bGwgJiYgdHlwZW9mIG9ialtpXSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIG5ld29ialtpXSA9IGNhcmJvbkNvcHkob2JqW2ldKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKG9ialtpXS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIG5ld29ialtpXSA9IGFycmF5Q29weShvYmpbaV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3b2JqW2ldID0gb2JqW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld29iajtcclxufVxyXG5tb2R1bGUuZXhwb3J0cy5jYXJib25Db3B5ID0gY2FyYm9uQ29weTtcclxubW9kdWxlLmV4cG9ydHMudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbihlbGVtZW50LCBjTmFtZSkge1xyXG4gICAgdmFyIHNldHRlciA9IGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY05hbWUpID49IDAgPyByZW1vdmVDbGFzcyA6IGFkZENsYXNzO1xyXG4gICAgcmV0dXJuIHNldHRlcihlbGVtZW50LCBjTmFtZSk7XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzLmdldERhdGEgPSBmdW5jdGlvbihlbGVtZW50LCBhdHRyKSB7XHJcbiAgICByZXR1cm4gZWxlbWVudC5kYXRhc2V0ID8gZWxlbWVudC5kYXRhc2V0W2F0dHJdIDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIGF0dHIpO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy5hcnJheUxpa2VUb0FycmF5ID0gZnVuY3Rpb24oYXJyYXlMaWtlKSB7XHJcbiAgICByZXR1cm4gW10uc2xpY2UuY2FsbChhcnJheUxpa2UpO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy5zZXREYXRhID0gZnVuY3Rpb24oZWxlbWVudCwgYXR0ciwgZGF0YSkge1xyXG4gICAgaWYoZWxlbWVudC5kYXRhc2V0KSBlbGVtZW50LmRhdGFzZXRbYXR0cl0gPSBkYXRhO1xyXG4gICAgZWxzZSBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS0nICsgYXR0ciwgZGF0YSk7XHJcbn07XHJcbnZhciByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsZW1lbnQsIGNOYW1lKXtcclxuICAgIGlmKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY05hbWUpID49IDApIHtcclxuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IFN0cmluZyhlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlQWxsKGNOYW1lLCAnJykpLnN0cmlwU3BhY2VzKCk7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufTtcclxudmFyIGFkZENsYXNzID0gZnVuY3Rpb24oZWxlbWVudCwgY05hbWUpIHtcclxuICAgIGlmKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY05hbWUpIDwgMCkge1xyXG4gICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gU3RyaW5nKGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnICsgY05hbWUpLnN0cmlwU3BhY2VzKCk7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufTtcclxubW9kdWxlLmV4cG9ydHMucmVtb3ZlQ2xhc3MgPSByZW1vdmVDbGFzcztcclxubW9kdWxlLmV4cG9ydHMuYWRkQ2xhc3MgPSBhZGRDbGFzcztcclxubW9kdWxlLmV4cG9ydHMuc2NyZWVuU2l6ZSA9IGZ1bmN0aW9uKG1vYmlsZSwgc21hbGxEZXNrdG9wLCBtZWREZXNrdG9wKSB7XHJcbiAgICB2YXIgbW9iaWxlU2l6ZSA9IG1vYmlsZSA9PSB1bmRlZmluZWQgfHwgIU51bWJlcihtb2JpbGUpID8gOTAwIDogbW9iaWxlO1xyXG4gICAgdmFyIGRlc2t0b3BTbWFsbCA9IHNtYWxsRGVza3RvcCA9PSB1bmRlZmluZWQgPyAxMDAwIDogc21hbGxEZXNrdG9wO1xyXG4gICAgdmFyIGRlc2t0b3BNZWQgPSBtZWREZXNrdG9wID09IHVuZGVmaW5lZCA/IDE1MDAgOiBtZWREZXNrdG9wO1xyXG4gICAgLy9zaXplcyB0aGF0IGNvcnJlc3BvbmQgdG8gd2hhdCBJIG5lZWQgdGhlbSB0b28sIG1vYmlsZSBpcyBwcm9iYWJseSB3aGF0IHNob3VsZCBiZSBhZGp1c3RlZCBtb3JlIG9mdGVuXHJcbiAgICAvL1RPRE86QWRkIGJyZWFrcG9pbnRzIGZvciBjb21tb24gbW9iaWxlIGRldmljZXMsIHNwZWNpZnkgdHlwZSB0byBkZXZpY2VcclxuICAgIHZhciBzaXplID0gXCJcIiwgdHlwZSA9IFwiXCI7XHJcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XHJcbiAgICAvL3VzZWQgdG8gZG8gdGhpcyBieSBJRCwgYnV0IGFza2luZyBwZW9wbGUgdG8gYWRkIElEcyB0byB0aGVpciBib2R5IGlzIGp1c3QgZHVtYlxyXG4gICAgdmFyIHdpZHRoID0gYm9keS5vZmZzZXRXaWR0aDtcclxuICAgIC8vb2Zmc2V0V2lkdGggZ2l2ZXMgYSBnZW5lcmFsbHkgYWNjdXJhdGUgdmlldywgY2VydGFpbmx5IGdvb2QgZW5vdWdoIGZvciBqdXN0IENTU1xyXG4gICAgaWYod2lkdGggPD0gbW9iaWxlU2l6ZSkge1xyXG4gICAgICAgIHR5cGUgPSBcIm1vYmlsZVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0eXBlID0gXCJkZXNrdG9wXCI7XHJcbiAgICAgICAgaWYod2lkdGggPCBkZXNrdG9wTWVkKSB7XHJcbiAgICAgICAgICAgIGlmKHdpZHRoIDwgZGVza3RvcFNtYWxsKSB7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gXCJzbWFsbC1zY3JlZW5cIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBcIm1lZC1zY3JlZW5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNpemUgPSBcImxhcmdlLXNjcmVlblwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbW92ZUNsYXNzKGJvZHksICdtb2JpbGUnKTtcclxuICAgIHJlbW92ZUNsYXNzKGJvZHksICdkZXNrdG9wJyk7XHJcbiAgICByZW1vdmVDbGFzcyhib2R5LCAnc21hbGwtc2NyZWVuJyk7XHJcbiAgICByZW1vdmVDbGFzcyhib2R5LCAnbWVkLXNjcmVlbicpO1xyXG4gICAgcmVtb3ZlQ2xhc3MoYm9keSwgJ2xhcmdlLXNjcmVlbicpO1xyXG4gICAgYWRkQ2xhc3MoYm9keSwgdHlwZSk7XHJcbiAgICBhZGRDbGFzcyhib2R5LCBzaXplKTtcclxuICAgIC8vcHJlc2VydmVzIGFscmVhZHkgc2V0IGNsYXNzbmFtZXMhXHJcbn07Il19
