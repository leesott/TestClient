/**
 * Created by eastflag on 2016-05-10.
 */
angular.module('homeApp')
  .controller('UploadCtrl', function ($scope, $log, uiUploader) {
    $scope.btn_remove = function(file) {
      $log.info('deleting=' + file);
      uiUploader.removeFile(file);
    };
    $scope.btn_clean = function() {
      uiUploader.removeAll();
    };
    $scope.btn_upload = function() {
      $log.info('uploading...');
      uiUploader.startUpload({
        url: 'http://localhost:8080/api/upload',
        options: {
          withCredentials: true
        },
        concurrency: 2,
        onProgress: function(file) {
          $log.info(file.name + '=' + file.humanSize);
          $scope.$apply();
        },
        onCompleted: function(file, response) {
          $log.info(file + 'response' + response);
        }
      });
    };
    $scope.files = [];
    var element = document.getElementById('file1');
    element.addEventListener('change', function(e) {
      var files = e.target.files;
      uiUploader.addFiles(files);
      $scope.files = uiUploader.getFiles();
      $scope.$apply();
    });
  });
