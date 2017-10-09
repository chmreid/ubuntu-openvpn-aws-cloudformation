'use strict';

exports.handler = (event, context) => {
    console.log(JSON.stringify(event));

    var responseObject = {};
    responseObject.event = event;
    responseObject.context = context;

    if (event.RequestType == "Delete") {
        console.log("Handle Delete Event");
        var AWS = require('aws-sdk');
        var s3Client = new AWS.S3();
        clearBucket(s3Client, event.ResourceProperties.S3BucketName, responseObject);
    } else {
        console.log("Handle Create Event");
        sendResponse(responseObject);
    }
};

function sendResponse(responseObject) {
    var cfnResponse = require('cfn-response');
    cfnResponse.send(responseObject.event, responseObject.context, cfnResponse.SUCCESS);
}

function deleteBucket(s3Client, bucket, responseObject) {
    s3Client.deleteBucket({
        Bucket: bucket
    }, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);
        }
        sendResponse(responseObject);
    });
}

function clearBucket(s3Client, bucket, responseObject) {
    s3Client.listObjects({
        Bucket: bucket
    }, function(err, data) {
        if (err) {
            console.log("error listing bucket objects " + err);
            return;
        }
        var items = data.Contents;
        for (var i = 0; i < items.length; i += 1) {
            var deleteParams = {
                Bucket: bucket,
                Key: items[i].Key
            };
            deleteObject(s3Client, deleteParams);
        }
    });
    setTimeout(function() {
        deleteBucket(s3Client, bucket, responseObject);
    }, 10000);
}

function deleteObject(s3Client, deleteParams) {
    s3Client.deleteObject(deleteParams, function(err, data) {
        if (err) {
            console.log("Error Deleting Object: " + deleteParams.Key);
        } else {
          console.log("Deleted Object: " + deleteParams.Key);
        }
    });
}
