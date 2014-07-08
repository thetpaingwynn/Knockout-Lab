ko.subscribable.fn.filter = function (search, property) {
    return ko.computed(function () {
        //search and property could be observables
        var searchValue = ko.unwrap(search).toLocaleLowerCase();
        var prop = ko.unwrap(property);
        return ko.utils.arrayFilter(this(), function (item) {
            if (prop) {
                //item[prop] could be an observable
                var itemProp = ko.unwrap(item[prop]).toString().toLocaleLowerCase();
                return itemProp.toString().indexOf(searchValue) > -1;
            } else {
                return item.indexOf(searchValue) > -1;
            }
        });
    }, this);
};

ko.subscribable.fn.orderBy = function (propertyName) {
    return ko.computed(function () {
        var propName = ko.unwrap(propertyName);
        if (propName) {
            return this().sort(function (a, b) {
                var aProp = ko.unwrap(a[propName]);
                var bProp = ko.unwrap(b[propName]);
                return aProp < bProp ? -1 : aProp > bProp ? 1 : 0;
            });
        } else {
            return this().sort();
        }
    }, this);
};

ko.subscribable.fn.currency = function (symbol) {
    return ko.computed(function () {
        //symbol could be an observable
        return accounting.formatMoney(this(), ko.unwrap(symbol));
    }, this);
};

ko.subscribable.fn.date = function (format) {
    return ko.computed(function () {
        //format could be an observable
        return moment(this()).format(ko.unwrap(format));
    }, this);
};
