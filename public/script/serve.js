(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
document.addEventListener('click', function(e) {
    if(e.target.className.indexOf('more-link') >= 0) {
        e.preventDefault();
        var header = document.getElementsByClassName('topnav')[0];
        if(header.className.indexOf('show-more') >= 0) {
            utils.removeClass(header, 'show-more');
            e.target.innerText = 'more...';
        } else {
            utils.addClass(header, 'show-more');
            e.target.innerText = 'close';
        }
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

},{"./sortableTables.js":2,"./utils.js":3}],2:[function(require,module,exports){
module.exports.sortableTable = function(table) {
    var rows = table.querySelectorAll('tbody tr').length ? [].slice.call(table.querySelectorAll('tbody tr')) : [];
    var headerRow = table.querySelector('thead tr');
    var headers = headerRow.querySelectorAll('thead tr th');
    var tbody = table.querySelector('tbody');
    var sTable = {
        'table': table,
        'tbody': tbody,
        'headers': headers,
        'rows': rows,
        'direction': 'down',
        "getCellOfColumn": function(index) {
            return sTable.rows.map(function(se) {
                return se.children[index];
            });
        },
        'clickHandler': function(e) {
            var self = this;
            var parent = e.target.parentNode;
            var children = [].slice.call(parent.children);
            var child_index = children.indexOf(e.target);
            self.sortRows(child_index);
            self.placeRows();
        },
        'placeRows': function() {
            var self = this;
            self.rows.forEach(function(e) {
                self.tbody.appendChild(e);
            });
        },
        'sortRows': function(index) {
            var self = this;
            self.rows = self.sortFunction(index, self.rows);
        },
        'sortFunction': function(index, rows) {
            var self = this;
            rows = rows.sort(function(a, b) {
                var ACellAtDex = a.children[index];
                var BCellAtDex = b.children[index];
                if(ACellAtDex && BCellAtDex) {
                    var aText = Number(ACellAtDex.innerText) || ACellAtDex.innerText === '0' ? Number(ACellAtDex.innerHTML) : ACellAtDex.innerHTML;
                    var bText = Number(BCellAtDex.innerText) || BCellAtDex.innerText === '0' ? Number(BCellAtDex.innerHTML) : BCellAtDex.innerHTML;
                    if(aText > bText) {
                        return self.direction === 'up' ? -1 : 1;
                    } else if(bText > aText) {
                        return self.direction === 'up' ? 1 : -1
                    }
                }
                return 0;
            });
            self.direction = self.direction === 'up' ? 'down' : 'up';
            return rows;
        }
    };
    sTable.table.addEventListener('click', function(e) {
        if(e.target.tagName === 'TH') {
            sTable.clickHandler(e);
        }
    });
    return sTable;
};
},{}],3:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvc2NyaXB0L21haW4uanMiLCJwdWJsaWMvc2NyaXB0L3NvcnRhYmxlVGFibGVzLmpzIiwicHVibGljL3NjcmlwdC91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XG52YXIgc29ydEFibGUgPSByZXF1aXJlKCcuL3NvcnRhYmxlVGFibGVzLmpzJyk7XG51dGlscy5hdXRvVXRpbHMoKTtcbnV0aWxzLnNjcmVlblNpemUoKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBoZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoZWFkZXInKVswXTtcbiAgICBpZih3aW5kb3cuc2Nyb2xsWSA+IDEwMCkge1xuICAgICAgICB1dGlscy5hZGRDbGFzcyhoZWFkZXIsICdtaW5pJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MoaGVhZGVyLCAnbWluaScpO1xuICAgIH1cbn0pO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgaWYoZS50YXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoJ21vcmUtbGluaycpID49IDApIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgaGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndG9wbmF2JylbMF07XG4gICAgICAgIGlmKGhlYWRlci5jbGFzc05hbWUuaW5kZXhPZignc2hvdy1tb3JlJykgPj0gMCkge1xuICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MoaGVhZGVyLCAnc2hvdy1tb3JlJyk7XG4gICAgICAgICAgICBlLnRhcmdldC5pbm5lclRleHQgPSAnbW9yZS4uLic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1dGlscy5hZGRDbGFzcyhoZWFkZXIsICdzaG93LW1vcmUnKTtcbiAgICAgICAgICAgIGUudGFyZ2V0LmlubmVyVGV4dCA9ICdjbG9zZSc7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1dGlscy5zY3JlZW5TaXplKTtcbnZhciBleHBUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NvcnRhYmxlJylbMF07XG5pZihleHBUYWJsZSkge1xuICAgIGV4cFRhYmxlID0gc29ydEFibGUuc29ydGFibGVUYWJsZShleHBUYWJsZSk7XG4gICAgZXhwVGFibGUudGFibGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnVEgnKSB7XG4gICAgICAgICAgICB1dGlscy5hZGRDbGFzcyhlLnRhcmdldCwgJ2RzdC1oZWFkZXItbW91c2UtZG93bicpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZXhwVGFibGUudGFibGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnVEgnKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSB1dGlscy5nZXRDaGlsZEluZGV4KGUudGFyZ2V0KTtcbiAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKGUudGFyZ2V0LCAnZHN0LWhlYWRlci1ob3ZlcicpO1xuICAgICAgICAgICAgZXhwVGFibGUuZ2V0Q2VsbE9mQ29sdW1uKGluZGV4KS5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XG4gICAgICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3Moc2UsICdkc3QtY2VsbC1jb2x1bW4taG92ZXInKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdUUicpIHtcbiAgICAgICAgICAgIHZhciByb3cgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIHZhciBjZWxscyA9IHV0aWxzLmFycmF5TGlrZVRvQXJyYXkocm93LmNoaWxkcmVuKTtcbiAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKHJvdywgJ2RzdC1yb3ctaG92ZXInKTtcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goZnVuY3Rpb24oc2UpIHtcbiAgICAgICAgICAgICAgICB1dGlscy5hZGRDbGFzcyhzZSwgJ2RzdC1jZWxsLXJvdy1ob3ZlcicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1REJyB8fCBlLnRhcmdldC50YWdOYW1lID09PSAnU1BBTicpIHtcbiAgICAgICAgICAgIHZhciBjZWxsID0gZS50YXJnZXQudGFnTmFtZSA9PT0gJ1REJyA/IGUudGFyZ2V0IDogZS50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIHZhciBwYXJlbnRSb3cgPSBjZWxsLnBhcmVudE5vZGU7XG4gICAgICAgICAgICB2YXIgY2hpbGRDZWxscyA9IHV0aWxzLmFycmF5TGlrZVRvQXJyYXkocGFyZW50Um93LmNoaWxkcmVuKTtcbiAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKHBhcmVudFJvdywgJ2RzdC1yb3ctaG92ZXInKTtcbiAgICAgICAgICAgIGNoaWxkQ2VsbHMuZm9yRWFjaChmdW5jdGlvbihzZSkge1xuICAgICAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKHNlLCAnZHN0LWNlbGwtcm93LWhvdmVyJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBjZWxsZGV4ID0gdXRpbHMuZ2V0Q2hpbGRJbmRleChjZWxsKTtcbiAgICAgICAgICAgIGV4cFRhYmxlLmdldENlbGxPZkNvbHVtbihjZWxsZGV4KS5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XG4gICAgICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3Moc2UsICdkc3QtY29sdW1uLWNlbGwtaG92ZXInKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3MoZXhwVGFibGUuaGVhZGVyc1tjZWxsZGV4XSwgJ2RzdC1jb2x1bW4taGVhZGVyLWhvdmVyJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBleHBUYWJsZS50YWJsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnVEgnKSB7XG4gICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhlLnRhcmdldCwgJ2RzdC1oZWFkZXItbW91c2UtZG93bicpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZXhwVGFibGUudGFibGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdUSCcpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHV0aWxzLmdldENoaWxkSW5kZXgoZS50YXJnZXQpO1xuICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MoZS50YXJnZXQsICdkc3QtaGVhZGVyLW1vdXNlLWRvd24nKTtcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKGUudGFyZ2V0LCAnZHN0LWhlYWRlci1ob3ZlcicpO1xuICAgICAgICAgICAgZXhwVGFibGUuZ2V0Q2VsbE9mQ29sdW1uKGluZGV4KS5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XG4gICAgICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3Moc2UsICdkc3QtY2VsbC1jb2x1bW4taG92ZXInKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdUUicpIHtcbiAgICAgICAgICAgIHZhciByb3cgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKHJvdywgJ2RzdC1yb3ctaG92ZXInKTtcbiAgICAgICAgICAgIHZhciBjZWxscyA9IHV0aWxzLmFycmF5TGlrZVRvQXJyYXkocm93LmNoaWxkcmVuKTtcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goZnVuY3Rpb24oc2UpIHtcbiAgICAgICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhzZSwgJ2RzdC1jZWxsLXJvdy1ob3ZlcicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1REJyB8fCBlLnRhcmdldC50YWdOYW1lID09PSAnU1BBTicpIHtcbiAgICAgICAgICAgIHZhciBjZWxsID0gZS50YXJnZXQudGFnTmFtZSA9PT0gJ1REJyA/IGUudGFyZ2V0IDogZS50YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIHZhciBwYXJlbnRSb3cgPSBjZWxsLnBhcmVudE5vZGU7XG4gICAgICAgICAgICB2YXIgY2hpbGRDZWxscyA9IHV0aWxzLmFycmF5TGlrZVRvQXJyYXkocGFyZW50Um93LmNoaWxkcmVuKTtcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKHBhcmVudFJvdywgJ2RzdC1yb3ctaG92ZXInKTtcbiAgICAgICAgICAgIGNoaWxkQ2VsbHMuZm9yRWFjaChmdW5jdGlvbihzZSkge1xuICAgICAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKHNlLCAnZHN0LWNlbGwtcm93LWhvdmVyJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBjZWxsZGV4ID0gdXRpbHMuZ2V0Q2hpbGRJbmRleChjZWxsKTtcbiAgICAgICAgICAgIGV4cFRhYmxlLmdldENlbGxPZkNvbHVtbihjZWxsZGV4KS5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XG4gICAgICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3Moc2UsICdkc3QtY29sdW1uLWNlbGwtaG92ZXInKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MoZXhwVGFibGUuaGVhZGVyc1tjZWxsZGV4XSwgJ2RzdC1jb2x1bW4taGVhZGVyLWhvdmVyJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbnZhciBsaWdodGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaWdodGJveCcpO1xuICAgIGlmKGxpZ2h0Ym94KSB7XG4gICAgICAgIGxpZ2h0Ym94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB1dGlscy5hZGRDbGFzcyh0aGlzLCAnbGlnaHRib3gtaGlkZGVuJyk7XG4gICAgICAgICAgICB2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhib2R5LCAnbGlnaHRib3gtdXAnKTtcbiAgICAgICAgfSk7XG4gICAgfVxudmFyIHBpY3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJyk7XG52YXIgbGlnaHRib3hJbWFnZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzcmMgPSB0aGlzLnNyYztcbiAgICB2YXIgdGV4dCA9IHRoaXMucGFyZW50Tm9kZS50ZXh0Q29udGVudDtcbiAgICB2YXIgbGIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlnaHRib3gnKTtcbiAgICB2YXIgbGJJbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlnaHRib3gtaW1hZ2UnKTtcbiAgICB2YXIgbGJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpZ2h0Ym94LXRleHQtY29udGVudCcpO1xuICAgIGxiSW1nLnNyYyA9IHNyYztcbiAgICBpZih0aGlzLmNsYXNzTmFtZS5pbmRleE9mKCdwb3J0cmFpdCcpID49IDApIHtcbiAgICAgICAgdXRpbHMuYWRkQ2xhc3MobGJJbWcsICdwb3J0cmFpdCcpO1xuICAgIH1cbiAgICBsYlRleHQuaW5uZXJUZXh0ID0gdGV4dDtcbiAgICB1dGlscy5yZW1vdmVDbGFzcyhsYiwgJ2xpZ2h0Ym94LWhpZGRlbicpO1xuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICB1dGlscy5hZGRDbGFzcyhib2R5LCAnbGlnaHRib3gtdXAnKTtcbn07XG5pZihwaWNzKSB7XG4gICAgcGljcyA9IFtdLnNsaWNlLmNhbGwocGljcyk7XG4gICAgcGljcy5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpZ2h0Ym94SW1hZ2UpXG4gICAgfSlcbn1cbiIsIm1vZHVsZS5leHBvcnRzLnNvcnRhYmxlVGFibGUgPSBmdW5jdGlvbih0YWJsZSkge1xuICAgIHZhciByb3dzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbCgndGJvZHkgdHInKS5sZW5ndGggPyBbXS5zbGljZS5jYWxsKHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyJykpIDogW107XG4gICAgdmFyIGhlYWRlclJvdyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkIHRyJyk7XG4gICAgdmFyIGhlYWRlcnMgPSBoZWFkZXJSb3cucXVlcnlTZWxlY3RvckFsbCgndGhlYWQgdHIgdGgnKTtcbiAgICB2YXIgdGJvZHkgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpO1xuICAgIHZhciBzVGFibGUgPSB7XG4gICAgICAgICd0YWJsZSc6IHRhYmxlLFxuICAgICAgICAndGJvZHknOiB0Ym9keSxcbiAgICAgICAgJ2hlYWRlcnMnOiBoZWFkZXJzLFxuICAgICAgICAncm93cyc6IHJvd3MsXG4gICAgICAgICdkaXJlY3Rpb24nOiAnZG93bicsXG4gICAgICAgIFwiZ2V0Q2VsbE9mQ29sdW1uXCI6IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gc1RhYmxlLnJvd3MubWFwKGZ1bmN0aW9uKHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlLmNoaWxkcmVuW2luZGV4XTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICAnY2xpY2tIYW5kbGVyJzogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IGUudGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBbXS5zbGljZS5jYWxsKHBhcmVudC5jaGlsZHJlbik7XG4gICAgICAgICAgICB2YXIgY2hpbGRfaW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKGUudGFyZ2V0KTtcbiAgICAgICAgICAgIHNlbGYuc29ydFJvd3MoY2hpbGRfaW5kZXgpO1xuICAgICAgICAgICAgc2VsZi5wbGFjZVJvd3MoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3BsYWNlUm93cyc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgc2VsZi5yb3dzLmZvckVhY2goZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHNlbGYudGJvZHkuYXBwZW5kQ2hpbGQoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3NvcnRSb3dzJzogZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHNlbGYucm93cyA9IHNlbGYuc29ydEZ1bmN0aW9uKGluZGV4LCBzZWxmLnJvd3MpO1xuICAgICAgICB9LFxuICAgICAgICAnc29ydEZ1bmN0aW9uJzogZnVuY3Rpb24oaW5kZXgsIHJvd3MpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHJvd3MgPSByb3dzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgIHZhciBBQ2VsbEF0RGV4ID0gYS5jaGlsZHJlbltpbmRleF07XG4gICAgICAgICAgICAgICAgdmFyIEJDZWxsQXREZXggPSBiLmNoaWxkcmVuW2luZGV4XTtcbiAgICAgICAgICAgICAgICBpZihBQ2VsbEF0RGV4ICYmIEJDZWxsQXREZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFUZXh0ID0gTnVtYmVyKEFDZWxsQXREZXguaW5uZXJUZXh0KSB8fCBBQ2VsbEF0RGV4LmlubmVyVGV4dCA9PT0gJzAnID8gTnVtYmVyKEFDZWxsQXREZXguaW5uZXJIVE1MKSA6IEFDZWxsQXREZXguaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYlRleHQgPSBOdW1iZXIoQkNlbGxBdERleC5pbm5lclRleHQpIHx8IEJDZWxsQXREZXguaW5uZXJUZXh0ID09PSAnMCcgPyBOdW1iZXIoQkNlbGxBdERleC5pbm5lckhUTUwpIDogQkNlbGxBdERleC5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgICAgIGlmKGFUZXh0ID4gYlRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmRpcmVjdGlvbiA9PT0gJ3VwJyA/IC0xIDogMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGJUZXh0ID4gYVRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmRpcmVjdGlvbiA9PT0gJ3VwJyA/IDEgOiAtMVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLmRpcmVjdGlvbiA9IHNlbGYuZGlyZWN0aW9uID09PSAndXAnID8gJ2Rvd24nIDogJ3VwJztcbiAgICAgICAgICAgIHJldHVybiByb3dzO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBzVGFibGUudGFibGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdUSCcpIHtcbiAgICAgICAgICAgIHNUYWJsZS5jbGlja0hhbmRsZXIoZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc1RhYmxlO1xufTsiLCJtb2R1bGUuZXhwb3J0cy5hdXRvVXRpbHMgPSBmdW5jdGlvbigpe1xuICAgIGlmICh0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgQXJyYXkuaXNBcnJheSA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBTdHJpbmcucHJvdG90eXBlLnN0cmlwQ29tbWFzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoLyheLCl8KCwkKS9nLCBcIlwiKS50b1N0cmluZygpO1xuICAgIH07XG4gICAgU3RyaW5nLnByb3RvdHlwZS5zdHJpcFNwYWNlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC8oXlxccyl8KFxccyQpL2csIFwiXCIpLnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgICBTdHJpbmcucHJvdG90eXBlLmxlZnRQYWQgPSBmdW5jdGlvbihwYWRkaW5nLCBwYWRkaW5nQ2hhcmFjdGVyKSB7XG4gICAgICAgIGlmKCghcGFkZGluZyAmJiBwYWRkaW5nICE9PSAwKSB8fCBOdW1iZXIocGFkZGluZykgPCB0aGlzLmxlbmd0aCkgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgdmFyIHBjID0gcGFkZGluZ0NoYXJhY3RlciA9PT0gdW5kZWZpbmVkID8gXCIgXCIgOiBwYWRkaW5nQ2hhcmFjdGVyO1xuICAgICAgICB2YXIgcGFkZGVkU3RyaW5nID0gdGhpcztcbiAgICAgICAgZm9yKHZhciBwaW5kZXggPSB0aGlzLmxlbmd0aDsgcGluZGV4IDwgcGFkZGluZzsgcGluZGV4KyspIHBhZGRlZFN0cmluZyA9IHBjICsgcGFkZGVkU3RyaW5nO1xuICAgICAgICByZXR1cm4gcGFkZGVkU3RyaW5nLnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgICBTdHJpbmcucHJvdG90eXBlLmh5cGhlbnNUb0NhbWVscyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uIChnKSB7IHJldHVybiBnWzFdLnRvVXBwZXJDYXNlKCk7IH0pO1xuICAgIH07XG4gICAgU3RyaW5nLnByb3RvdHlwZS5yaWdodFBhZCA9IGZ1bmN0aW9uKHBhZGRpbmcsIHBhZGRpbmdDaGFyYWN0ZXIpIHtcbiAgICAgICAgaWYoKCFwYWRkaW5nICYmIHBhZGRpbmcgIT09IDApIHx8IE51bWJlcihwYWRkaW5nKSA8IHRoaXMubGVuZ3RoKSByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICAgICAgICB2YXIgcGMgPSBwYWRkaW5nQ2hhcmFjdGVyID09PSB1bmRlZmluZWQgPyBcIiBcIiA6IHBhZGRpbmdDaGFyYWN0ZXI7XG4gICAgICAgIHZhciBwYWRkZWRTdHJpbmcgPSB0aGlzO1xuICAgICAgICBmb3IodmFyIHBpbmRleCA9IHRoaXMubGVuZ3RoOyBwaW5kZXggPCBwYWRkaW5nOyBwaW5kZXgrKykgcGFkZGVkU3RyaW5nID0gcGFkZGVkU3RyaW5nICsgcGM7XG4gICAgICAgIHJldHVybiBwYWRkZWRTdHJpbmcudG9TdHJpbmcoKTtcbiAgICB9O1xuICAgIFN0cmluZy5wcm90b3R5cGUubGVmdFRydW5jID0gZnVuY3Rpb24odHJ1bmNUbykge1xuICAgICAgICBpZigoIXRydW5jVG8gJiYgdHJ1bmNUbyAhPT0gMCkgfHwgdGhpcy5sZW5ndGggPCB0cnVuY1RvKSByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICAgICAgICBlbHNlIHJldHVybiB0aGlzLnN1YnN0cigwLCB0cnVuY1RvKTtcbiAgICB9O1xuICAgIFN0cmluZy5wcm90b3R5cGUucmlnaHRUcnVuYyA9IGZ1bmN0aW9uKHRydW5jVG8pIHtcbiAgICAgICAgaWYoKCF0cnVuY1RvICYmIHRydW5jVG8gIT09IDApIHx8IHRoaXMubGVuZ3RoIDwgdHJ1bmNUbykgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5zdWJzdHIodGhpcy5sZW5ndGggLSB0cnVuY1RvLCB0aGlzLmxlbmd0aCAtIDEpO1xuICAgIH07XG4gICAgU3RyaW5nLnByb3RvdHlwZS5sZWZ0Tm9ybWFsaXplID0gZnVuY3Rpb24obGVuZ3RoLCBwYWRkaW5nQ2hhcmFjdGVyKSB7XG4gICAgICAgIGlmKCFsZW5ndGggJiYgbGVuZ3RoICE9PSAwKSByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICAgICAgICBpZih0aGlzLmxlbmd0aCA+IGxlbmd0aCkgcmV0dXJuIHRoaXMubGVmdFRydW5jKGxlbmd0aCk7XG4gICAgICAgIGVsc2UgIHJldHVybiB0aGlzLmxlZnRQYWQobGVuZ3RoLCBwYWRkaW5nQ2hhcmFjdGVyKTtcbiAgICB9O1xuICAgIFN0cmluZy5wcm90b3R5cGUucmlnaHROb3JtYWxpemUgPSBmdW5jdGlvbihsZW5ndGgsIHBhZGRpbmdDaGFyYWN0ZXIpIHtcbiAgICAgICAgaWYoKCFsZW5ndGggJiYgbGVuZ3RoICE9PSAwKSkgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgaWYodGhpcy5sZW5ndGggPiBsZW5ndGgpIHJldHVybiB0aGlzLnJpZ2h0VHJ1bmMobGVuZ3RoKTtcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5yaWdodFBhZChsZW5ndGgsIHBhZGRpbmdDaGFyYWN0ZXIpO1xuICAgIH07XG4gICAgU3RyaW5nLnByb3RvdHlwZS51bkNhbWVsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvKFtBLVpdKS9nLCAnICQxJyk7XG4gICAgfTtcbiAgICBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2VBbGwgPSBmdW5jdGlvbihzZWFyY2gsIHJlcGxhY2VtZW50KSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzO1xuICAgICAgICByZXR1cm4gdGFyZ2V0LnJlcGxhY2UobmV3IFJlZ0V4cChzZWFyY2gsICdnJyksIHJlcGxhY2VtZW50KTtcbiAgICB9O1xuICAgIEFycmF5LnByb3RvdHlwZS5maW5kV2l0aEF0dHIgPSBmdW5jdGlvbihhdHRyLCB2YWx1ZSkge1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYodGhpc1tpXVthdHRyXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBBcnJheS5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uIChvbGRJbmRleCwgbmV3SW5kZXgpIHtcbiAgICAgICAgaWYgKG5ld0luZGV4ID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgayA9IG5ld0luZGV4IC0gdGhpcy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoKGstLSkgKyAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zcGxpY2UobmV3SW5kZXgsIDAsIHRoaXMuc3BsaWNlKG9sZEluZGV4LCAxKVswXSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQXJyYXkucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aGlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQXJyYXkucHJvdG90eXBlLnB1c2hUb0luZGV4ID0gZnVuY3Rpb24oaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgdGhpcy5zcGxpY2UoaW5kZXgsIDAsIGl0ZW0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEFycmF5LnByb3RvdHlwZS5qb2luQXR0ciA9IGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAgICAgdmFyIGNoZWNrID0gYXR0ci5zcGxpdCgnLicpO1xuICAgICAgICB2YXIgZGVlcCA9IGZhbHNlO1xuICAgICAgICBpZihjaGVjay5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBkZWVwID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmV0ID0gJyc7XG4gICAgICAgIGZvcih2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzW2luZGV4XTtcbiAgICAgICAgICAgIGlmKCFkZWVwKSB7XG4gICAgICAgICAgICAgICAgaWYoZW50cnlbYXR0cl0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0ICs9IGVudHJ5W2F0dHJdICsgJywnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZihlbnRyeVtjaGVja1swXV1bY2hlY2tbMV1dKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCArPSBlbnRyeVtjaGVja1swXV1bY2hlY2tbMV1dICsgJywnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQuc3RyaXBDb21tYXMoKTtcbiAgICB9O1xuICAgIEFycmF5LnByb3RvdHlwZS5kZWVwZXJGaW5kID0gZnVuY3Rpb24oYXR0ciwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGNoZWNrID0gYXR0ci5zcGxpdCgnLicpO1xuICAgICAgICB2YXIgZGVlcCA9IGZhbHNlO1xuICAgICAgICBpZihjaGVjay5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBkZWVwID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpc1tpbmRleF07XG4gICAgICAgICAgICBpZighZGVlcCkge1xuICAgICAgICAgICAgICAgIGlmKGVudHJ5W2F0dHJdID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZihlbnRyeVtjaGVja1swXV1bY2hlY2tbMV1dID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xufTtcbm1vZHVsZS5leHBvcnRzLmdldENoaWxkSW5kZXggPSBmdW5jdGlvbihjaGlsZCkge1xuICAgIHZhciBwYXJlbnQgPSBjaGlsZC5wYXJlbnROb2RlO1xuICAgIHZhciBjaGlsZHJlbiA9IHBhcmVudC5jaGlsZHJlbjtcbiAgICB2YXIgY291bnQgPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgdmFyIGNoaWxkX2luZGV4O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICBpZiAoY2hpbGQgPT09IGNoaWxkcmVuW2ldKSB7XG4gICAgICAgICAgICBjaGlsZF9pbmRleCA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2hpbGRfaW5kZXg7XG59O1xubW9kdWxlLmV4cG9ydHMudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbihlbGVtZW50LCBjTmFtZSkge1xuICAgIHZhciBzZXR0ZXIgPSBlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKGNOYW1lKSA+PSAwID8gcmVtb3ZlQ2xhc3MgOiBhZGRDbGFzcztcbiAgICByZXR1cm4gc2V0dGVyKGVsZW1lbnQsIGNOYW1lKTtcbn07XG5tb2R1bGUuZXhwb3J0cy5nZXREYXRhID0gZnVuY3Rpb24oZWxlbWVudCwgYXR0cikge1xuICAgIHJldHVybiBlbGVtZW50LmRhdGFzZXQgPyBlbGVtZW50LmRhdGFzZXRbYXR0cl0gOiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS0nICsgYXR0cik7XG59O1xubW9kdWxlLmV4cG9ydHMuYXJyYXlMaWtlVG9BcnJheSA9IGZ1bmN0aW9uKGFycmF5TGlrZSkge1xuICAgIHJldHVybiBbXS5zbGljZS5jYWxsKGFycmF5TGlrZSk7XG59O1xubW9kdWxlLmV4cG9ydHMuc2V0RGF0YSA9IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHIsIGRhdGEpIHtcbiAgICBpZihlbGVtZW50LmRhdGFzZXQpIGVsZW1lbnQuZGF0YXNldFthdHRyXSA9IGRhdGE7XG4gICAgZWxzZSBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS0nICsgYXR0ciwgZGF0YSk7XG59O1xudmFyIHJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWxlbWVudCwgY05hbWUpe1xuICAgIGlmKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY05hbWUpID49IDApIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBTdHJpbmcoZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZUFsbChjTmFtZSwgJycpKS5zdHJpcFNwYWNlcygpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59O1xudmFyIGFkZENsYXNzID0gZnVuY3Rpb24oZWxlbWVudCwgY05hbWUpIHtcbiAgICBpZihlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKGNOYW1lKSA8IDApIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBTdHJpbmcoZWxlbWVudC5jbGFzc05hbWUgKyAnICcgKyBjTmFtZSkuc3RyaXBTcGFjZXMoKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xufTtcbm1vZHVsZS5leHBvcnRzLnJlbW92ZUNsYXNzID0gcmVtb3ZlQ2xhc3M7XG5tb2R1bGUuZXhwb3J0cy5hZGRDbGFzcyA9IGFkZENsYXNzO1xubW9kdWxlLmV4cG9ydHMuc2NyZWVuU2l6ZSA9IGZ1bmN0aW9uKG1vYmlsZSwgc21hbGxEZXNrdG9wLCBtZWREZXNrdG9wKSB7XG4gICAgdmFyIG1vYmlsZVNpemUgPSBtb2JpbGUgPT0gdW5kZWZpbmVkIHx8ICFOdW1iZXIobW9iaWxlKSA/IDkwMCA6IG1vYmlsZTtcbiAgICB2YXIgZGVza3RvcFNtYWxsID0gc21hbGxEZXNrdG9wID09IHVuZGVmaW5lZCA/IDEwMDAgOiBzbWFsbERlc2t0b3A7XG4gICAgdmFyIGRlc2t0b3BNZWQgPSBtZWREZXNrdG9wID09IHVuZGVmaW5lZCA/IDE1MDAgOiBtZWREZXNrdG9wO1xuICAgIC8vc2l6ZXMgdGhhdCBjb3JyZXNwb25kIHRvIHdoYXQgSSBuZWVkIHRoZW0gdG9vLCBtb2JpbGUgaXMgcHJvYmFibHkgd2hhdCBzaG91bGQgYmUgYWRqdXN0ZWQgbW9yZSBvZnRlblxuICAgIC8vVE9ETzpBZGQgYnJlYWtwb2ludHMgZm9yIGNvbW1vbiBtb2JpbGUgZGV2aWNlcywgc3BlY2lmeSB0eXBlIHRvIGRldmljZVxuICAgIHZhciBzaXplID0gXCJcIiwgdHlwZSA9IFwiXCI7XG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xuICAgIC8vdXNlZCB0byBkbyB0aGlzIGJ5IElELCBidXQgYXNraW5nIHBlb3BsZSB0byBhZGQgSURzIHRvIHRoZWlyIGJvZHkgaXMganVzdCBkdW1iXG4gICAgdmFyIHdpZHRoID0gYm9keS5vZmZzZXRXaWR0aDtcbiAgICAvL29mZnNldFdpZHRoIGdpdmVzIGEgZ2VuZXJhbGx5IGFjY3VyYXRlIHZpZXcsIGNlcnRhaW5seSBnb29kIGVub3VnaCBmb3IganVzdCBDU1NcbiAgICBpZih3aWR0aCA8PSBtb2JpbGVTaXplKSB7XG4gICAgICAgIHR5cGUgPSBcIm1vYmlsZVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHR5cGUgPSBcImRlc2t0b3BcIjtcbiAgICAgICAgaWYod2lkdGggPCBkZXNrdG9wTWVkKSB7XG4gICAgICAgICAgICBpZih3aWR0aCA8IGRlc2t0b3BTbWFsbCkge1xuICAgICAgICAgICAgICAgIHNpemUgPSBcInNtYWxsLXNjcmVlblwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaXplID0gXCJtZWQtc2NyZWVuXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaXplID0gXCJsYXJnZS1zY3JlZW5cIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW1vdmVDbGFzcyhib2R5LCAnbW9iaWxlJyk7XG4gICAgcmVtb3ZlQ2xhc3MoYm9keSwgJ2Rlc2t0b3AnKTtcbiAgICByZW1vdmVDbGFzcyhib2R5LCAnc21hbGwtc2NyZWVuJyk7XG4gICAgcmVtb3ZlQ2xhc3MoYm9keSwgJ21lZC1zY3JlZW4nKTtcbiAgICByZW1vdmVDbGFzcyhib2R5LCAnbGFyZ2Utc2NyZWVuJyk7XG4gICAgYWRkQ2xhc3MoYm9keSwgdHlwZSk7XG4gICAgYWRkQ2xhc3MoYm9keSwgc2l6ZSk7XG4gICAgLy9wcmVzZXJ2ZXMgYWxyZWFkeSBzZXQgY2xhc3NuYW1lcyFcbn07Il19
