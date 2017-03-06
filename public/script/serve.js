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
document.addEventListener('resize', utils.screenSize);
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
module.exports.removeClass = function(element, cName){
    if(element.className.indexOf(cName) >= 0) {
        element.className = String(element.className.replaceAll(cName, '')).stripSpaces();
        return element;
    }
    return element;
};
module.exports.addClass = function(element, cName) {
    if(element.className.indexOf(cName) < 0) {
        element.className = String(element.className + ' ' + cName).stripSpaces();
        return element;
    }
    return element;
};
module.exports.screenSize = function(mobile, smallDesktop, medDesktop){
    var mobileSize = mobile == undefined ? 980 : mobile;
    var desktopSmall = smallDesktop == undefined ? 1000 : smallDesktop;
    var desktopMed = medDesktop == undefined ? 1500 : medDesktop;
    //sizes that correspond to what I need them too, mobile is probably what should be adjusted more often
    //TODO:Add breakpoints for common mobile devices, specify type to device
    var size = "", type = "";
    var body = document.getElementsByTagName('body')[0];
    //used to do this by ID, but asking people to add IDs to their body is just dumb
    var width = body.offsetWidth;
    //offsetWidth gives a generally accurate view, certainly good enough for just CSS
    if(width <= mobileSize) type = "mobile";
    else
    {
        type = "desktop";
        if(width < desktopMed)
        {
            if(width < desktopSmall) size = "small-screen";
            else size = "med-screen";
        }
        else size = "large-screen";
    }
    body.className = body.className + " " + type + " " + size;
    //preserves already set classnames!
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvc2NyaXB0L21haW4uanMiLCJwdWJsaWMvc2NyaXB0L3NvcnRhYmxlVGFibGVzLmpzIiwicHVibGljL3NjcmlwdC91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XG52YXIgc29ydEFibGUgPSByZXF1aXJlKCcuL3NvcnRhYmxlVGFibGVzLmpzJyk7XG51dGlscy5hdXRvVXRpbHMoKTtcbnV0aWxzLnNjcmVlblNpemUoKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBoZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoZWFkZXInKVswXTtcbiAgICBpZih3aW5kb3cuc2Nyb2xsWSA+IDEwMCkge1xuICAgICAgICB1dGlscy5hZGRDbGFzcyhoZWFkZXIsICdtaW5pJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MoaGVhZGVyLCAnbWluaScpO1xuICAgIH1cbn0pO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXRpbHMuc2NyZWVuU2l6ZSk7XG52YXIgZXhwVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzb3J0YWJsZScpWzBdO1xuaWYoZXhwVGFibGUpIHtcbiAgICBleHBUYWJsZSA9IHNvcnRBYmxlLnNvcnRhYmxlVGFibGUoZXhwVGFibGUpO1xuICAgIGV4cFRhYmxlLnRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1RIJykge1xuICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3MoZS50YXJnZXQsICdkc3QtaGVhZGVyLW1vdXNlLWRvd24nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGV4cFRhYmxlLnRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1RIJykge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gdXRpbHMuZ2V0Q2hpbGRJbmRleChlLnRhcmdldCk7XG4gICAgICAgICAgICB1dGlscy5hZGRDbGFzcyhlLnRhcmdldCwgJ2RzdC1oZWFkZXItaG92ZXInKTtcbiAgICAgICAgICAgIGV4cFRhYmxlLmdldENlbGxPZkNvbHVtbihpbmRleCkuZm9yRWFjaChmdW5jdGlvbihzZSkge1xuICAgICAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKHNlLCAnZHN0LWNlbGwtY29sdW1uLWhvdmVyJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnVFInKSB7XG4gICAgICAgICAgICB2YXIgcm93ID0gZS50YXJnZXQ7XG4gICAgICAgICAgICB2YXIgY2VsbHMgPSB1dGlscy5hcnJheUxpa2VUb0FycmF5KHJvdy5jaGlsZHJlbik7XG4gICAgICAgICAgICB1dGlscy5hZGRDbGFzcyhyb3csICdkc3Qtcm93LWhvdmVyJyk7XG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XG4gICAgICAgICAgICAgICAgdXRpbHMuYWRkQ2xhc3Moc2UsICdkc3QtY2VsbC1yb3ctaG92ZXInKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdURCcgfHwgZS50YXJnZXQudGFnTmFtZSA9PT0gJ1NQQU4nKSB7XG4gICAgICAgICAgICB2YXIgY2VsbCA9IGUudGFyZ2V0LnRhZ05hbWUgPT09ICdURCcgPyBlLnRhcmdldCA6IGUudGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgICAgICB2YXIgcGFyZW50Um93ID0gY2VsbC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgdmFyIGNoaWxkQ2VsbHMgPSB1dGlscy5hcnJheUxpa2VUb0FycmF5KHBhcmVudFJvdy5jaGlsZHJlbik7XG4gICAgICAgICAgICB1dGlscy5hZGRDbGFzcyhwYXJlbnRSb3csICdkc3Qtcm93LWhvdmVyJyk7XG4gICAgICAgICAgICBjaGlsZENlbGxzLmZvckVhY2goZnVuY3Rpb24oc2UpIHtcbiAgICAgICAgICAgICAgICB1dGlscy5hZGRDbGFzcyhzZSwgJ2RzdC1jZWxsLXJvdy1ob3ZlcicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgY2VsbGRleCA9IHV0aWxzLmdldENoaWxkSW5kZXgoY2VsbCk7XG4gICAgICAgICAgICBleHBUYWJsZS5nZXRDZWxsT2ZDb2x1bW4oY2VsbGRleCkuZm9yRWFjaChmdW5jdGlvbihzZSkge1xuICAgICAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKHNlLCAnZHN0LWNvbHVtbi1jZWxsLWhvdmVyJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHV0aWxzLmFkZENsYXNzKGV4cFRhYmxlLmhlYWRlcnNbY2VsbGRleF0sICdkc3QtY29sdW1uLWhlYWRlci1ob3ZlcicpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgZXhwVGFibGUudGFibGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ1RIJykge1xuICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3MoZS50YXJnZXQsICdkc3QtaGVhZGVyLW1vdXNlLWRvd24nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGV4cFRhYmxlLnRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnVEgnKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSB1dGlscy5nZXRDaGlsZEluZGV4KGUudGFyZ2V0KTtcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKGUudGFyZ2V0LCAnZHN0LWhlYWRlci1tb3VzZS1kb3duJyk7XG4gICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhlLnRhcmdldCwgJ2RzdC1oZWFkZXItaG92ZXInKTtcbiAgICAgICAgICAgIGV4cFRhYmxlLmdldENlbGxPZkNvbHVtbihpbmRleCkuZm9yRWFjaChmdW5jdGlvbihzZSkge1xuICAgICAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKHNlLCAnZHN0LWNlbGwtY29sdW1uLWhvdmVyJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnVFInKSB7XG4gICAgICAgICAgICB2YXIgcm93ID0gZS50YXJnZXQ7XG4gICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhyb3csICdkc3Qtcm93LWhvdmVyJyk7XG4gICAgICAgICAgICB2YXIgY2VsbHMgPSB1dGlscy5hcnJheUxpa2VUb0FycmF5KHJvdy5jaGlsZHJlbik7XG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKGZ1bmN0aW9uKHNlKSB7XG4gICAgICAgICAgICAgICAgdXRpbHMucmVtb3ZlQ2xhc3Moc2UsICdkc3QtY2VsbC1yb3ctaG92ZXInKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdURCcgfHwgZS50YXJnZXQudGFnTmFtZSA9PT0gJ1NQQU4nKSB7XG4gICAgICAgICAgICB2YXIgY2VsbCA9IGUudGFyZ2V0LnRhZ05hbWUgPT09ICdURCcgPyBlLnRhcmdldCA6IGUudGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgICAgICB2YXIgcGFyZW50Um93ID0gY2VsbC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgdmFyIGNoaWxkQ2VsbHMgPSB1dGlscy5hcnJheUxpa2VUb0FycmF5KHBhcmVudFJvdy5jaGlsZHJlbik7XG4gICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhwYXJlbnRSb3csICdkc3Qtcm93LWhvdmVyJyk7XG4gICAgICAgICAgICBjaGlsZENlbGxzLmZvckVhY2goZnVuY3Rpb24oc2UpIHtcbiAgICAgICAgICAgICAgICB1dGlscy5yZW1vdmVDbGFzcyhzZSwgJ2RzdC1jZWxsLXJvdy1ob3ZlcicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgY2VsbGRleCA9IHV0aWxzLmdldENoaWxkSW5kZXgoY2VsbCk7XG4gICAgICAgICAgICBleHBUYWJsZS5nZXRDZWxsT2ZDb2x1bW4oY2VsbGRleCkuZm9yRWFjaChmdW5jdGlvbihzZSkge1xuICAgICAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKHNlLCAnZHN0LWNvbHVtbi1jZWxsLWhvdmVyJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHV0aWxzLnJlbW92ZUNsYXNzKGV4cFRhYmxlLmhlYWRlcnNbY2VsbGRleF0sICdkc3QtY29sdW1uLWhlYWRlci1ob3ZlcicpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cy5zb3J0YWJsZVRhYmxlID0gZnVuY3Rpb24odGFibGUpIHtcbiAgICB2YXIgcm93cyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyJykubGVuZ3RoID8gW10uc2xpY2UuY2FsbCh0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSB0cicpKSA6IFtdO1xuICAgIHZhciBoZWFkZXJSb3cgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0aGVhZCB0cicpO1xuICAgIHZhciBoZWFkZXJzID0gaGVhZGVyUm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RoZWFkIHRyIHRoJyk7XG4gICAgdmFyIHRib2R5ID0gdGFibGUucXVlcnlTZWxlY3RvcigndGJvZHknKTtcbiAgICB2YXIgc1RhYmxlID0ge1xuICAgICAgICAndGFibGUnOiB0YWJsZSxcbiAgICAgICAgJ3Rib2R5JzogdGJvZHksXG4gICAgICAgICdoZWFkZXJzJzogaGVhZGVycyxcbiAgICAgICAgJ3Jvd3MnOiByb3dzLFxuICAgICAgICAnZGlyZWN0aW9uJzogJ2Rvd24nLFxuICAgICAgICBcImdldENlbGxPZkNvbHVtblwiOiBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHNUYWJsZS5yb3dzLm1hcChmdW5jdGlvbihzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZS5jaGlsZHJlbltpbmRleF07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NsaWNrSGFuZGxlcic6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBlLnRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gW10uc2xpY2UuY2FsbChwYXJlbnQuY2hpbGRyZW4pO1xuICAgICAgICAgICAgdmFyIGNoaWxkX2luZGV4ID0gY2hpbGRyZW4uaW5kZXhPZihlLnRhcmdldCk7XG4gICAgICAgICAgICBzZWxmLnNvcnRSb3dzKGNoaWxkX2luZGV4KTtcbiAgICAgICAgICAgIHNlbGYucGxhY2VSb3dzKCk7XG4gICAgICAgIH0sXG4gICAgICAgICdwbGFjZVJvd3MnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHNlbGYucm93cy5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRib2R5LmFwcGVuZENoaWxkKGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgICdzb3J0Um93cyc6IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBzZWxmLnJvd3MgPSBzZWxmLnNvcnRGdW5jdGlvbihpbmRleCwgc2VsZi5yb3dzKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3NvcnRGdW5jdGlvbic6IGZ1bmN0aW9uKGluZGV4LCByb3dzKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICByb3dzID0gcm93cy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICB2YXIgQUNlbGxBdERleCA9IGEuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgICAgICAgICAgIHZhciBCQ2VsbEF0RGV4ID0gYi5jaGlsZHJlbltpbmRleF07XG4gICAgICAgICAgICAgICAgaWYoQUNlbGxBdERleCAmJiBCQ2VsbEF0RGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhVGV4dCA9IE51bWJlcihBQ2VsbEF0RGV4LmlubmVyVGV4dCkgfHwgQUNlbGxBdERleC5pbm5lclRleHQgPT09ICcwJyA/IE51bWJlcihBQ2VsbEF0RGV4LmlubmVySFRNTCkgOiBBQ2VsbEF0RGV4LmlubmVySFRNTDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJUZXh0ID0gTnVtYmVyKEJDZWxsQXREZXguaW5uZXJUZXh0KSB8fCBCQ2VsbEF0RGV4LmlubmVyVGV4dCA9PT0gJzAnID8gTnVtYmVyKEJDZWxsQXREZXguaW5uZXJIVE1MKSA6IEJDZWxsQXREZXguaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgICAgICBpZihhVGV4dCA+IGJUZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5kaXJlY3Rpb24gPT09ICd1cCcgPyAtMSA6IDE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihiVGV4dCA+IGFUZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5kaXJlY3Rpb24gPT09ICd1cCcgPyAxIDogLTFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5kaXJlY3Rpb24gPSBzZWxmLmRpcmVjdGlvbiA9PT0gJ3VwJyA/ICdkb3duJyA6ICd1cCc7XG4gICAgICAgICAgICByZXR1cm4gcm93cztcbiAgICAgICAgfVxuICAgIH07XG4gICAgc1RhYmxlLnRhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnVEgnKSB7XG4gICAgICAgICAgICBzVGFibGUuY2xpY2tIYW5kbGVyKGUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHNUYWJsZTtcbn07IiwibW9kdWxlLmV4cG9ydHMuYXV0b1V0aWxzID0gZnVuY3Rpb24oKXtcbiAgICBpZiAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIEFycmF5LmlzQXJyYXkgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICAgICAgfTtcbiAgICB9XG4gICAgU3RyaW5nLnByb3RvdHlwZS5zdHJpcENvbW1hcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC8oXiwpfCgsJCkvZywgXCJcIikudG9TdHJpbmcoKTtcbiAgICB9O1xuICAgIFN0cmluZy5wcm90b3R5cGUuc3RyaXBTcGFjZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvKF5cXHMpfChcXHMkKS9nLCBcIlwiKS50b1N0cmluZygpO1xuICAgIH07XG4gICAgU3RyaW5nLnByb3RvdHlwZS5sZWZ0UGFkID0gZnVuY3Rpb24ocGFkZGluZywgcGFkZGluZ0NoYXJhY3Rlcikge1xuICAgICAgICBpZigoIXBhZGRpbmcgJiYgcGFkZGluZyAhPT0gMCkgfHwgTnVtYmVyKHBhZGRpbmcpIDwgdGhpcy5sZW5ndGgpIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgIHZhciBwYyA9IHBhZGRpbmdDaGFyYWN0ZXIgPT09IHVuZGVmaW5lZCA/IFwiIFwiIDogcGFkZGluZ0NoYXJhY3RlcjtcbiAgICAgICAgdmFyIHBhZGRlZFN0cmluZyA9IHRoaXM7XG4gICAgICAgIGZvcih2YXIgcGluZGV4ID0gdGhpcy5sZW5ndGg7IHBpbmRleCA8IHBhZGRpbmc7IHBpbmRleCsrKSBwYWRkZWRTdHJpbmcgPSBwYyArIHBhZGRlZFN0cmluZztcbiAgICAgICAgcmV0dXJuIHBhZGRlZFN0cmluZy50b1N0cmluZygpO1xuICAgIH07XG4gICAgU3RyaW5nLnByb3RvdHlwZS5oeXBoZW5zVG9DYW1lbHMgPSBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC8tKFthLXpdKS9nLCBmdW5jdGlvbiAoZykgeyByZXR1cm4gZ1sxXS50b1VwcGVyQ2FzZSgpOyB9KTtcbiAgICB9O1xuICAgIFN0cmluZy5wcm90b3R5cGUucmlnaHRQYWQgPSBmdW5jdGlvbihwYWRkaW5nLCBwYWRkaW5nQ2hhcmFjdGVyKSB7XG4gICAgICAgIGlmKCghcGFkZGluZyAmJiBwYWRkaW5nICE9PSAwKSB8fCBOdW1iZXIocGFkZGluZykgPCB0aGlzLmxlbmd0aCkgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgdmFyIHBjID0gcGFkZGluZ0NoYXJhY3RlciA9PT0gdW5kZWZpbmVkID8gXCIgXCIgOiBwYWRkaW5nQ2hhcmFjdGVyO1xuICAgICAgICB2YXIgcGFkZGVkU3RyaW5nID0gdGhpcztcbiAgICAgICAgZm9yKHZhciBwaW5kZXggPSB0aGlzLmxlbmd0aDsgcGluZGV4IDwgcGFkZGluZzsgcGluZGV4KyspIHBhZGRlZFN0cmluZyA9IHBhZGRlZFN0cmluZyArIHBjO1xuICAgICAgICByZXR1cm4gcGFkZGVkU3RyaW5nLnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgICBTdHJpbmcucHJvdG90eXBlLmxlZnRUcnVuYyA9IGZ1bmN0aW9uKHRydW5jVG8pIHtcbiAgICAgICAgaWYoKCF0cnVuY1RvICYmIHRydW5jVG8gIT09IDApIHx8IHRoaXMubGVuZ3RoIDwgdHJ1bmNUbykgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5zdWJzdHIoMCwgdHJ1bmNUbyk7XG4gICAgfTtcbiAgICBTdHJpbmcucHJvdG90eXBlLnJpZ2h0VHJ1bmMgPSBmdW5jdGlvbih0cnVuY1RvKSB7XG4gICAgICAgIGlmKCghdHJ1bmNUbyAmJiB0cnVuY1RvICE9PSAwKSB8fCB0aGlzLmxlbmd0aCA8IHRydW5jVG8pIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuc3Vic3RyKHRoaXMubGVuZ3RoIC0gdHJ1bmNUbywgdGhpcy5sZW5ndGggLSAxKTtcbiAgICB9O1xuICAgIFN0cmluZy5wcm90b3R5cGUubGVmdE5vcm1hbGl6ZSA9IGZ1bmN0aW9uKGxlbmd0aCwgcGFkZGluZ0NoYXJhY3Rlcikge1xuICAgICAgICBpZighbGVuZ3RoICYmIGxlbmd0aCAhPT0gMCkgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgaWYodGhpcy5sZW5ndGggPiBsZW5ndGgpIHJldHVybiB0aGlzLmxlZnRUcnVuYyhsZW5ndGgpO1xuICAgICAgICBlbHNlICByZXR1cm4gdGhpcy5sZWZ0UGFkKGxlbmd0aCwgcGFkZGluZ0NoYXJhY3Rlcik7XG4gICAgfTtcbiAgICBTdHJpbmcucHJvdG90eXBlLnJpZ2h0Tm9ybWFsaXplID0gZnVuY3Rpb24obGVuZ3RoLCBwYWRkaW5nQ2hhcmFjdGVyKSB7XG4gICAgICAgIGlmKCghbGVuZ3RoICYmIGxlbmd0aCAhPT0gMCkpIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmKHRoaXMubGVuZ3RoID4gbGVuZ3RoKSByZXR1cm4gdGhpcy5yaWdodFRydW5jKGxlbmd0aCk7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRoaXMucmlnaHRQYWQobGVuZ3RoLCBwYWRkaW5nQ2hhcmFjdGVyKTtcbiAgICB9O1xuICAgIFN0cmluZy5wcm90b3R5cGUudW5DYW1lbCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoLyhbQS1aXSkvZywgJyAkMScpO1xuICAgIH07XG4gICAgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlQWxsID0gZnVuY3Rpb24oc2VhcmNoLCByZXBsYWNlbWVudCkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRhcmdldC5yZXBsYWNlKG5ldyBSZWdFeHAoc2VhcmNoLCAnZycpLCByZXBsYWNlbWVudCk7XG4gICAgfTtcbiAgICBBcnJheS5wcm90b3R5cGUuZmluZFdpdGhBdHRyID0gZnVuY3Rpb24oYXR0ciwgdmFsdWUpIHtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmKHRoaXNbaV1bYXR0cl0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgQXJyYXkucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbiAob2xkSW5kZXgsIG5ld0luZGV4KSB7XG4gICAgICAgIGlmIChuZXdJbmRleCA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGsgPSBuZXdJbmRleCAtIHRoaXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKChrLS0pICsgMSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3BsaWNlKG5ld0luZGV4LCAwLCB0aGlzLnNwbGljZShvbGRJbmRleCwgMSlbMF0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEFycmF5LnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEFycmF5LnByb3RvdHlwZS5wdXNoVG9JbmRleCA9IGZ1bmN0aW9uKGluZGV4LCBpdGVtKSB7XG4gICAgICAgIHRoaXMuc3BsaWNlKGluZGV4LCAwLCBpdGVtKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBBcnJheS5wcm90b3R5cGUuam9pbkF0dHIgPSBmdW5jdGlvbihhdHRyKSB7XG4gICAgICAgIHZhciBjaGVjayA9IGF0dHIuc3BsaXQoJy4nKTtcbiAgICAgICAgdmFyIGRlZXAgPSBmYWxzZTtcbiAgICAgICAgaWYoY2hlY2subGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgZGVlcCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJldCA9ICcnO1xuICAgICAgICBmb3IodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpc1tpbmRleF07XG4gICAgICAgICAgICBpZighZGVlcCkge1xuICAgICAgICAgICAgICAgIGlmKGVudHJ5W2F0dHJdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCArPSBlbnRyeVthdHRyXSArICcsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYoZW50cnlbY2hlY2tbMF1dW2NoZWNrWzFdXSkge1xuICAgICAgICAgICAgICAgICAgICByZXQgKz0gZW50cnlbY2hlY2tbMF1dW2NoZWNrWzFdXSArICcsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0LnN0cmlwQ29tbWFzKCk7XG4gICAgfTtcbiAgICBBcnJheS5wcm90b3R5cGUuZGVlcGVyRmluZCA9IGZ1bmN0aW9uKGF0dHIsIHZhbHVlKSB7XG4gICAgICAgIHZhciBjaGVjayA9IGF0dHIuc3BsaXQoJy4nKTtcbiAgICAgICAgdmFyIGRlZXAgPSBmYWxzZTtcbiAgICAgICAgaWYoY2hlY2subGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgZGVlcCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZm9yKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXNbaW5kZXhdO1xuICAgICAgICAgICAgaWYoIWRlZXApIHtcbiAgICAgICAgICAgICAgICBpZihlbnRyeVthdHRyXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYoZW50cnlbY2hlY2tbMF1dW2NoZWNrWzFdXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbn07XG5tb2R1bGUuZXhwb3J0cy5nZXRDaGlsZEluZGV4ID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgICB2YXIgcGFyZW50ID0gY2hpbGQucGFyZW50Tm9kZTtcbiAgICB2YXIgY2hpbGRyZW4gPSBwYXJlbnQuY2hpbGRyZW47XG4gICAgdmFyIGNvdW50ID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgIHZhciBjaGlsZF9pbmRleDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgaWYgKGNoaWxkID09PSBjaGlsZHJlbltpXSkge1xuICAgICAgICAgICAgY2hpbGRfaW5kZXggPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkX2luZGV4O1xufTtcbm1vZHVsZS5leHBvcnRzLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24oZWxlbWVudCwgY05hbWUpIHtcbiAgICB2YXIgc2V0dGVyID0gZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZihjTmFtZSkgPj0gMCA/IHJlbW92ZUNsYXNzIDogYWRkQ2xhc3M7XG4gICAgcmV0dXJuIHNldHRlcihlbGVtZW50LCBjTmFtZSk7XG59O1xubW9kdWxlLmV4cG9ydHMuZ2V0RGF0YSA9IGZ1bmN0aW9uKGVsZW1lbnQsIGF0dHIpIHtcbiAgICByZXR1cm4gZWxlbWVudC5kYXRhc2V0ID8gZWxlbWVudC5kYXRhc2V0W2F0dHJdIDogZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIGF0dHIpO1xufTtcbm1vZHVsZS5leHBvcnRzLmFycmF5TGlrZVRvQXJyYXkgPSBmdW5jdGlvbihhcnJheUxpa2UpIHtcbiAgICByZXR1cm4gW10uc2xpY2UuY2FsbChhcnJheUxpa2UpO1xufTtcbm1vZHVsZS5leHBvcnRzLnNldERhdGEgPSBmdW5jdGlvbihlbGVtZW50LCBhdHRyLCBkYXRhKSB7XG4gICAgaWYoZWxlbWVudC5kYXRhc2V0KSBlbGVtZW50LmRhdGFzZXRbYXR0cl0gPSBkYXRhO1xuICAgIGVsc2UgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIGF0dHIsIGRhdGEpO1xufTtcbm1vZHVsZS5leHBvcnRzLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWxlbWVudCwgY05hbWUpe1xuICAgIGlmKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY05hbWUpID49IDApIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBTdHJpbmcoZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZUFsbChjTmFtZSwgJycpKS5zdHJpcFNwYWNlcygpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59O1xubW9kdWxlLmV4cG9ydHMuYWRkQ2xhc3MgPSBmdW5jdGlvbihlbGVtZW50LCBjTmFtZSkge1xuICAgIGlmKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY05hbWUpIDwgMCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IFN0cmluZyhlbGVtZW50LmNsYXNzTmFtZSArICcgJyArIGNOYW1lKS5zdHJpcFNwYWNlcygpO1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59O1xubW9kdWxlLmV4cG9ydHMuc2NyZWVuU2l6ZSA9IGZ1bmN0aW9uKG1vYmlsZSwgc21hbGxEZXNrdG9wLCBtZWREZXNrdG9wKXtcbiAgICB2YXIgbW9iaWxlU2l6ZSA9IG1vYmlsZSA9PSB1bmRlZmluZWQgPyA5ODAgOiBtb2JpbGU7XG4gICAgdmFyIGRlc2t0b3BTbWFsbCA9IHNtYWxsRGVza3RvcCA9PSB1bmRlZmluZWQgPyAxMDAwIDogc21hbGxEZXNrdG9wO1xuICAgIHZhciBkZXNrdG9wTWVkID0gbWVkRGVza3RvcCA9PSB1bmRlZmluZWQgPyAxNTAwIDogbWVkRGVza3RvcDtcbiAgICAvL3NpemVzIHRoYXQgY29ycmVzcG9uZCB0byB3aGF0IEkgbmVlZCB0aGVtIHRvbywgbW9iaWxlIGlzIHByb2JhYmx5IHdoYXQgc2hvdWxkIGJlIGFkanVzdGVkIG1vcmUgb2Z0ZW5cbiAgICAvL1RPRE86QWRkIGJyZWFrcG9pbnRzIGZvciBjb21tb24gbW9iaWxlIGRldmljZXMsIHNwZWNpZnkgdHlwZSB0byBkZXZpY2VcbiAgICB2YXIgc2l6ZSA9IFwiXCIsIHR5cGUgPSBcIlwiO1xuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICAvL3VzZWQgdG8gZG8gdGhpcyBieSBJRCwgYnV0IGFza2luZyBwZW9wbGUgdG8gYWRkIElEcyB0byB0aGVpciBib2R5IGlzIGp1c3QgZHVtYlxuICAgIHZhciB3aWR0aCA9IGJvZHkub2Zmc2V0V2lkdGg7XG4gICAgLy9vZmZzZXRXaWR0aCBnaXZlcyBhIGdlbmVyYWxseSBhY2N1cmF0ZSB2aWV3LCBjZXJ0YWlubHkgZ29vZCBlbm91Z2ggZm9yIGp1c3QgQ1NTXG4gICAgaWYod2lkdGggPD0gbW9iaWxlU2l6ZSkgdHlwZSA9IFwibW9iaWxlXCI7XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgdHlwZSA9IFwiZGVza3RvcFwiO1xuICAgICAgICBpZih3aWR0aCA8IGRlc2t0b3BNZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHdpZHRoIDwgZGVza3RvcFNtYWxsKSBzaXplID0gXCJzbWFsbC1zY3JlZW5cIjtcbiAgICAgICAgICAgIGVsc2Ugc2l6ZSA9IFwibWVkLXNjcmVlblwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Ugc2l6ZSA9IFwibGFyZ2Utc2NyZWVuXCI7XG4gICAgfVxuICAgIGJvZHkuY2xhc3NOYW1lID0gYm9keS5jbGFzc05hbWUgKyBcIiBcIiArIHR5cGUgKyBcIiBcIiArIHNpemU7XG4gICAgLy9wcmVzZXJ2ZXMgYWxyZWFkeSBzZXQgY2xhc3NuYW1lcyFcbn07Il19
