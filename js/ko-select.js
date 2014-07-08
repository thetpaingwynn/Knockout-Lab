ko.bindingHandlers.fadeVisible = {
    init: function (element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        $(element).toggle(ko.unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable

    },
    update: function (element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        ko.unwrap(value) ? $(element).slideUp({
            duration: 100
        }) : $(element).slideDown({
            duration: 100
        });
    }
};

ko.bindingHandlers.koSelect = {
    createNodes: function (rootElement, options) {

        var template = '<script id="ko-select-tmpl" type="text/html"><div class="ko-select-choosed-container" ><ul class="ko-select-choosed"><!-- ko foreach: dataSource.filter(\'true\', \'selected\') --><li class="ko-select-choosed-item"><span data-bind="text: text"></span><a href="#" class="ko-select-remove-choosed-item" data-bind="click: $parent.unSelect"></a></li><!-- /ko --><li class="ko-select-searchbox"><input data-bind="value: search, valueUpdate: \'afterkeydown\', hasFocus: hasFocus, event: { keypress: searchKeypress }, style: { width: searchBoxWidth() + \'px\' }" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="ko-select-input" tabindex="0" placeholder=""><a href="#" class="ko-select-close-dropdown" data-bind="click: $data.toggleDropdown"></a></li></ul></div><ul data-bind="foreach: dataSource.filter(search, \'text\'), fadeVisible: isShowDropDown" class="ko-select-list"><li class="ko-select-list-item"><input type="checkbox" data-bind="checked: selected , event: { change: $parent.selectedItemChanged }"><span data-bind="text: text"></span></li></ul></script>';
        //append templates
        if (!document.getElementById('ko-select-tmpl')) {
            document.body.insertAdjacentHTML('beforeend', template);
        }
        //apply first binding
        ko.applyBindingsToNode(rootElement, {
            template: {
                name: "ko-select-tmpl"
            }
        }, options);
    },
    init: function (element, valueAccessor) {

        var listItem = function (data) {
            this.text = ko.observable(data.Text || "");
            this.value = ko.observable(data.Value || "");
            this.selected = ko.observable(data.Selected || false);
        };

        var ViewModel = function (data, element) {
            var self = this;

            self.defautValue = "0";

            self.dataSource = ko.observableArray();
            self.search = ko.observable("")
            self.showSearchBox = ko.observable(false);
            self.showSelectedItems = true;
            self.hasFocus = ko.observable(false);
            self.isShowDropDown = ko.observable(true);
            //
            self.searchBoxWidth = ko.observable(100);

            self.clearSearch = function () {
                self.search("");
            }
            self.unSelect = function (item) {
                item.selected(false);
                self.selectedItemChanged(false);
                $(element).trigger('change');
            }

            self.selectedItemChanged = function (item) {
                self.hasFocus(true); // set focus to textbox
                self.clearSearch();

                if (element) {
                    var selectedValues = [];
                    var selectedText = [];

                    self.dataSource().forEach(function (data) {

                        if (data.selected()) {
                            if (item) {

                                // If the last selected item is default Value, deselect others
                                if (!item.selected() && item.value() === self.defautValue) {
                                    data.selected(false);
                                }

                                // If the last selected item is not default Value, deselect default
                                if (data.selected() && data.value() === self.defautValue && item.value() !== self.defautValue) {
                                    data.selected(false);
                                }

                                // If item is selected push it to selected values
                                if (data.selected() && data.value() != item.value()) {
                                    selectedValues.push(data.value());
                                    selectedText.push(data.text());
                                }
                            }
                            else {
                                selectedValues.push(data.value());
                                selectedText.push(data.text());
                            }
                        }

                    });

                    if (item && !item.selected()) {
                        selectedValues.push(item.value());
                        selectedText.push(item.text());
                    }

                    // If nothing is selected selecte the default
                    if (selectedValues.length == 0) {
                        self.dataSource()[0].selected(true);
                        selectedValues.push(self.dataSource()[0].value());
                        selectedText.push(self.dataSource()[0].text());
                    }


                    $(element).val(selectedValues);
                    $(element).data('selectedValues', selectedText);
                }
            }

            self.hasFocus.subscribe(function (newValue) {
                if (newValue) {
                    self.isShowDropDown(false);
                }
            });
            self.focus = function () {
                self.isShowDropDown(true);
            }
            self.toggleDropdown = function () {
                self.isShowDropDown(!self.isShowDropDown());
                self.showSearchBox(self.isShowDropDown());
                self.clearSearch();
            }
            self.searchKeypress = function () {
                var width = self.search().length * 9;
                if (width < 26)
                    width = 26;
                self.searchBoxWidth(width + 10);
                return true;
            }
            self.addRange = function (data) {
                self.dataSource.removeAll();
                data.forEach(function (value) {
                    var item = new listItem(value);
                    self.dataSource.push(item);
                });
                if (element) {
                    var selectedValues = [];
                    var selectedText = [];
                    self.dataSource().forEach(function (data) {

                        if (data.selected()) {
                            selectedValues.push(data.value());
                            selectedText.push(data.text());
                        }
                    });
                    $(element).val(selectedValues);
                    $(element).data('selectedValues', selectedText);
                }
            }

            if (data) {
                self.addRange(data);
            }
        };

        var options = valueAccessor();

        options.update = function () {
            console.log('Update Me');
        }

        if (!options.listData()) {
            throw new Error("ko.bindingHandlers.koSelect: No data to display");
        }

        var model = new ViewModel(options.listData(), element);

        // create dropdown
        ko.bindingHandlers.koSelect.createNodes(element, model);

        // update dropdown list on change
        valueAccessor().listData.subscribe(function (newValue) {
            model.addRange(newValue);
        });

        //let this handler control its descendants.
        return {
            controlsDescendantBindings: true
        };
    }
};
