(function ($, window) {

    var data = [{"Text":"-- All --","Value":"0"}, {"Text":"500 Follow bet","Value":38},{"Text":"500 MYR Sina","Value":39},{"Text":"932","Value":72},{"Text":"932 FB","Value":112}];
    var viewModel = new ko.bindingHandlers.koSelect.viewModel(data);
    ko.applyBindings(viewModel, document.getElementById("dropdown3"));

    viewModel.add({"Text":"Newbee!","Value":10})

    $('#dropdown3').change(function(e){
        console.log($(this).val());
    });
})(jQuery, window);
