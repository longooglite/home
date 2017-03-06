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