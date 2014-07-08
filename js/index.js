(function ($, window) {

    var model3 = {
        listData: ko.observableArray([{"Text":"-- All --","Value":"0"}, {"Text":"500 Follow bet","Value":38},{"Text":"500 MYR Sina","Value":39},{"Text":"932","Value":72},{"Text":"932 FB","Value":112}])
    };
    ko.applyBindings(model3, document.getElementById("dropdown3"));

    model3.listData.push({"Text":"Newbee!","Value":10})

    $('#dropdown1').change(function(e){
        console.log($(this).val());
    });
})(jQuery, window);
