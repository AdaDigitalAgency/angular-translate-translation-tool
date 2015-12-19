var mainApp = angular.module("mainApp", []);

mainApp.controller("appController", function($scope) {
  $scope.version = "0.1";
  $scope.strings = {};
  $scope.outputfile = "output.json";

  $scope.load = function(which) {
    $('.file-' + which).trigger('click');
  };

  $scope.save = function() {
    var data = $scope.strings;
    $.each(data, function(key, item) {      
      data[key] = item.translation;
    });
    saveTextAs(JSON.stringify(data), $scope.outputfile);
  };
});

jQuery(function ($) {
  $(document).on('change', '.file-original,.file-translation', function() {
    var file = this.files[0],
        type = this.className.replace('file-', ''),
        reader = new FileReader();
    if(file) {
      reader.readAsText(file);
      $(reader).on('load', function(e) {
        var data = JSON.parse(e.target.result), $scope = angular.element($('body').get(0)).scope(), strings = $scope.strings;
        $scope.$apply(function() {
          $scope.outputfile = file.name;
          $.each(data, function(key, value) {
            if(!strings[key]) {
              strings[key] = { "original" : "", "translation" : "" };
            }
            strings[key][type] = value;
          });
          $scope.strings = strings;
        });
      });
    }
  });
});