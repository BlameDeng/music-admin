<template>
    <div id="plupload-container">
        <a id="plupload-selectfiles" href="javascript:void(0);" class='btn'>选择文件</a>
        <a id="plupload-postfiles" href="javascript:void(0);" class='btn'>开始上传</a>
    </div>
</template>
<script>
    import plupload from 'plupload';
    import Crypto from './crypto-min.js';
    import sha1 from './sha1-min.js';
    import hmac from './hmac-min.js';
    import Base64 from './base64.js';
    export default {
        name: 'Upload',
        props: {
            containerId: { type: String, default: 'plupload-container' },
            browseId: { type: String, default: 'plupload-selectfiles' },
            postId: { type: String, default: 'plupload-postfiles' }
        },
        methods: {},
        data() {
            return {
                url: ''
            }
        },
        mounted() {
            let _self = this;
            let host = 'https://songsbucket.oss-cn-shenzhen.aliyuncs.com';
            let policyText = {
                "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
                "conditions": [
                    ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
                ]
            };
            let policyBase64 = Base64.encode(JSON.stringify(policyText))
            let message = policyBase64
            let bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true });
            let signature = Crypto.util.bytesToBase64(bytes);

            function set_upload_param(up, filename, ret) {
                let new_multipart_params = {
                    'key': 'txt',
                    'OSSAccessKeyId': accessid,
                    'success_action_status': '200', //让服务端返回200,不然，默认会返回204
                    'policy': policyBase64,
                    'signature': signature,
                };

                up.setOption({
                    'url': host,
                    'multipart_params': new_multipart_params
                });

                up.start();
            }

            let uploader = new plupload.Uploader({
                runtimes: 'html5,flash,silverlight,html4',
                browse_button: _self.browseId,
                multi_selection: false,
                container: document.getElementById(_self.containerId),
                flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
                silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
                url: host,
                filters: { max_file_size: '8000kb' },

                init: {
                    PostInit: function() {
                        if (_self.postId) {
                            document.getElementById(_self.postId).onclick = function() {
                                set_upload_param(uploader, '', false);
                                return false;
                            };
                        }
                    },

                    FilesAdded: function(up, files) {
                        // if (!_self.postId) {
                        //     set_upload_param(uploader, '', false);
                        // } //自动上传
                        console.log(files[0].name)
                    },

                    BeforeUpload: function(up, file) {
                        set_upload_param(up, file.name, true);
                    },

                    UploadProgress: function(up, file) {
                        // let d = document.getElementById(file.id);
                        // d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                        // let prog = d.getElementsByTagName('div')[0];
                        // let progBar = prog.getElementsByTagName('div')[0]
                        // progBar.style.width = 2 * file.percent + 'px';
                        // progBar.setAttribute('aria-valuenow', file.percent);
                    },

                    FileUploaded: function(up, file, info) {
                        if (info.status == 200) {
                            // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + get_uploaded_object_name(file.name);
                            // _self.url = host + '/' + get_uploaded_object_name(file.name) + '?x-oss-process=style/avatar';
                            _self.$emit('uploaded', _self.url);
                        } else {
                            // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                        }
                    },

                    Error: function(up, err) {}
                }
            });
            uploader.init();
        }
    }
</script>
<style scoped lang="scss">
    #my-plupload {
        // position: fixed;
        // top: 50%;
        // left: 50%;
        // display: none;
    }
</style>