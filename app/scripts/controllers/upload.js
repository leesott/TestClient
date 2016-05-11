/**
 * Created by eastflag on 2016-05-10.
 */
angular.module('homeApp')
  .controller('UploadCtrl', function ($scope, $log, Upload, $timeout) {
    $scope.uploadPic = function(file) {
      file.upload = Upload.upload({
        url: 'http://localhost:8080/api/upload',
        data: {user_id: 2, title: $scope.title, content: $scope.content, files: file}
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
  });
