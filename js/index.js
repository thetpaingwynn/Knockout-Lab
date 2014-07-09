(function ($, window) {

    var data = [{"Text":"Egypt","Value":0},{"Text":"Australia","Value":1},{"Text":"Pitcairn","Value":2},{"Text":"Chile","Value":3},{"Text":"Dominican Republic","Value":4},{"Text":"Monaco","Value":5},{"Text":"Aruba","Value":6},{"Text":"Angola","Value":7},{"Text":"Armenia","Value":8},{"Text":"Gibraltar","Value":9},{"Text":"American Samoa","Value":10},{"Text":"Bhutan","Value":11},{"Text":"Sri Lanka","Value":12},{"Text":"United Kingdom","Value":13},{"Text":"Cameroon","Value":14},{"Text":"Libya","Value":15},{"Text":"Jordan","Value":16},{"Text":"Comoros","Value":17},{"Text":"Wallis and Futuna Islands","Value":18},{"Text":"New Zealand","Value":19},{"Text":"Mauritania","Value":20},{"Text":"Afghanistan","Value":21},{"Text":"Senegal","Value":22},{"Text":"Equatorial Guinea","Value":23},{"Text":"Zambia","Value":24}];
    var viewModel = new ko.bindingHandlers.koSelect.viewModel(data);
    ko.applyBindings(viewModel, document.getElementById("dropdown3"));

    viewModel.add({"Text":"Newbee!","Value":10})

    $('#dropdown3').change(function(e){
        console.log($(this).val());
    });
})(jQuery, window);
