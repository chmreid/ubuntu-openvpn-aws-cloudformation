# openvpn_aws_cloudformation

This is a CloudFormation template to deploy OpenVPN as a personal internet proxy. The template provides a fully automated setup and teardown with "one-click" into any AWS region. Each time you build a new stack, your endpoint will have a fresh IP, generate new secrets, and create a pre-configured ovpn profile that you can import into any OpenVPN client.

I've tested with the OpenVPN Connect client on Android, openvpn on Linux, and Tunnelblick on Mac.

Usage:

1.) Run the template(openVPNSingleInstance.yaml) in CloudFormation, it will deploy into it's own VPC

2.) When the stack build is complete, download client/openVPNClientFiles.zip from the generated S3 bucket

3.) Extract the files and import openvpn_clientuser.ovpn into your OpenVPN client program, click connect and you should be good to go.

4.) When your done you can delete the stack and all associated resources will be removed.
