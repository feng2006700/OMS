KindEditor.plugin('screencapture', function (K) {
    var self = this, name = 'screencapture';
    var baseUrl = K.undef(self.captureBaseUrl, "http://www.ncmem.com/download/ScreenCapture");
    var postUrl = K.undef(self.capturePostUrl, "http://www.ncmem.com/upload.aspx");
    var userUnid = K.undef(self.captureUserUnid, "83");
    self.plugin.ScreenCaptureError = {
        "0": "连接服务器失败"
	    , "1": "发送数据错误"
	    , "2": "未设置上传地址"
	    , "3": "公司未授权"
	    , "4": "域名未授权"
    };
    self.plugin.screencapture = {
        StateType: { Ready: 0, Posting: 1, Stop: 2, Error: 3, GetNewID: 4, Complete: 5, WaitContinueUpload: 6, None: 7, Waiting: 8 },
        State: null,
        Editor: self,
        Config: {
            "PostUrl": postUrl
                , "EncodeType": "utf-8"
                , "Version": "1,4,55,20964"
                , "Company": "荆门泽优软件有限公司"
                , "License": ""
                , "FileFieldName": "img"//文件字段名称。
                , "Authenticate": ""//Windows验证方式。basic,ntlm
                , "Language": "zhcn"//语言设置，en,zhcn
                , "Quality": 100//图片质量，仅对jpg格式有效
                , "ImageType": "jpg"//图片上传格式。png,jpg,bmp
                , "Clsid": "3B72F89C-DE36-4d14-B0E5-C5937A9A5D7E"
                , "ProjID": "Xproer.ScreenCapturePro"
                , "CabPath": baseUrl +"/ScreenCapture.cab"
            //IE64
                , "Clsid64": "988EF240-0CA2-4c59-8FC1-05BE5FA43638"
                , "ProjID64": "Xproer.ScreenCapturePro64"
                , "CabPath64": baseUrl + "/ScreenCapture64.cab"
            //FireFox
                , "MimeType": "application/npScreenCapturePro"
                , "XpiPath": baseUrl + "/ScreenCapturePro.xpi"
            //Chrome
                , "CrxName": "npScreenCapturePro"
                , "MimeTypeChr": "application/npScreenCapturePro"
                , "CrxPath": baseUrl + "/ScreenCapturePro.crx"
                , "ExePath": baseUrl + "/ScreenCapturePro.exe"
        },
        Fields: { "UserUnid": userUnid },
        BrowserFF: {
            GetHtml: function (capture) {
                var html = '<embed type="' + capture.Config["MimeType"] + '" pluginspage="' + capture.Config["XpiPath"] + '" width="1" height="1" id="objScreenCapture">';
                return html;
            },
            GetDisplay : function(capture){
                var html = '<div id="CaptureMessage">';
                html += '<div class="img"></div><span name="msg">图片上传中...</span><span name="process">10%</span>';
                html += '</div>';
                return html;
            },
            GetPlugin: function () {
                return document.getElementById("objScreenCapture");
            }, //检查插件是否已安装
            Check: function (capture) {
                var mimetype = navigator.mimeTypes;
                if (typeof mimetype == "object" && mimetype.length) {
                    for (var i = 0; i < mimetype.length; i++) {
                        if (mimetype[i].type == capture.Config["MimeType"].toLowerCase()) {
                            return mimetype[i].enabledPlugin;
                        }
                    }
                }
                else {
                    mimetype = [capture.Config["MimeType"]];
                }
                if (mimetype) {
                    return mimetype.enabledPlugin;
                }
                return false;
            }, //安装插件
            Setup: function (capture) {
                var xpi = new Object();
                xpi["Calendar"] = capture.Config["XpiPath"];
                InstallTrigger.install(xpi, function (name, result) { });
            }
        },
        BrowserChrome:{
            GetHtml: function (capture) {
                var html = '<embed type="' + capture.Config["MimeTypeChr"] + '" pluginspage="' + capture.Config["CabPath"] + '" width="1" height="1" id="objScreenCapture">';
                //截屏图片上传窗口
                return html;
            },
            GetDisplay : function(capture){
                var html = '<div id="CaptureMessage">';
                html += '<div class="img"></div><span name="msg">图片上传中...</span><span name="process">10%</span>';
                html += '</div>';
                return html;
            },
            GetPlugin: function () {
                return document.getElementById("objScreenCapture");
            },  //检查插件是否已安装
            Check: function (capture) {
                for (var i = 0, l = navigator.plugins.length; i < l; i++) {
                    if (navigator.plugins[i].name == capture.Config["CrxName"]) {
                        return true;
                    }
                }
                return false;
            },  //安装插件
            Setup: function (capture) {
                K(document.body).append('<iframe style="display:none;" src="' + capture.Config["CabPath"] + '"></iframe>');
            }
        },
        BrowserIE: {
            GetHtml: function (capture) {
                /*ActiveX的静态加载方式，如果在框架页面中使用此控件，推荐使用静态加截方式。
                <div style="display: none">
                <object id="objScreenCapture" classid="clsid:B10327CB-56EC-43D9-BED0-C91E4AE8F42E" codebase="http://www.ncmem.com/download/ScreenCapture/ScreenCapture.cab#version=1,6,26,54978" width="1" height="1"></object>
                </div>
                */
                var acx = '<div style="display: none">';
                acx += '<object id="objScreenCapture" classid="clsid:' + capture.Config["Clsid"] + '"';
                acx += ' codebase="' + capture.Config["CabPath"] + '#version=' + capture.Config["Version"] + '" width="1" height="1"></object>';                
                acx += '</div>';
                return acx;
            },
            GetDisplay: function (capture) {
                var html = '<div id="CaptureMessage">';
                html += '<div class="img"></div><span name="msg">图片上传中...</span><span name="process">10%</span>';
                html += '</div>';
                return html;
            },
            GetPlugin: function () {
                return document.getElementById("objScreenCapture");
            },  //检查插件是否已安装
            Check: function (capture) {
                try {
                    var com = new ActiveXObject(capture.Config["ProjID"]);
                    return true;
                }
                catch (e) { return false; }
            }
        },
        Browser: null,
        GetBrowser: function () {            
            if (this.Browser == null) {
                var browserName = navigator.userAgent.toLowerCase();
                var ie = browserName.indexOf("msie") > 0;
                //IE11
                ie = ie ? ie : browserName.search(/(msie\s|trident.*rv:)([\w.]+)/) != -1;
                var firefox = browserName.indexOf("firefox") > 0;
                var chrome = browserName.indexOf("chrome") > 0;
                if (ie) {
                    this.Browser = this.BrowserIE;
                    if (window.navigator.platform == "Win64") {
                        this.Config["Clsid"] = this.Config["Clsid64"];
                        this.Config["ProjID"] = this.Config["ProjID64"];
                        this.Config["CabPath"] = this.Config["CabPath64"];
                    }
                }
                else if (firefox) {
                    this.Config["CabPath"] = this.Config["XpiPath"];
                    this.Browser = this.BrowserFF;
                    if (!this.Browser.Check(this)) { this.Browser.Setup(this); }
                }
                else if (chrome) {
                    this.Config["CabPath"] = this.Config["CrxPath"];
                    this.Browser = this.BrowserChrome;
                    if (!this.Browser.Check(this)) { this.Browser.Setup(this); }
                }
            }
            return this.Browser;
        },
        Init: function () {
            this.State = this.StateType.None;
            this.ATL = this.GetBrowser().GetPlugin();
            this.ATL.Object = this;
            this.ATL.License = this.Config["License"];
            this.ATL.PostUrl = this.Config["PostUrl"];
            this.ATL.EncodeType = this.Config["EncodeType"];
            this.ATL.Language = this.Config["Language"];
            this.ATL.Quality = this.Config["Quality"];
            this.ATL.Company = this.Config["Company"];
            this.ATL.FileFieldName = this.Config["FileFieldName"];
            this.ATL.Authenticate = this.Config["Authenticate"];
            this.ATL.OnComplete = this.OnComplete;
            this.ATL.OnPost = this.OnProcess;
            this.ATL.OnStop = this.OnStop;
            this.ATL.OnError = this.OnError;
            this.ATL.OnConnected = this.OnConnect;
            this.ATL.AfterCapture = this.AfterCapture;
        },
        DialogDiv :null,
        ProgressText: function (text) {
            var progress = K("span[name='process']", this.DialogDiv);
            progress.html(text);
        },
        MessageText :function(text){
            var process = K("span[name='msg']", this.DialogDiv);
            process.html(text);
        },
        Load: function () {
            var text = this.GetBrowser().GetHtml(this);
            K(document.body).append(text);
        },
        Capture: function () {
            this.ATL.ClearFields();//清除附加字段
            var pname;
            for (pname in this.Fields) {
                this.ATL.AddField(pname, this.Fields[pname]);
            }
            this.ATL.Capture();
        },
        //截取整个屏幕
        CaptureScreen: function () {
            this.ATL.ClearFields(); //清除附加字段
            var pname;
            for (pname in this.Fields) {
                this.ATL.AddField(pname, this.Fields[pname]);
            }
            this.ATL.CaptureScreen();
        },
        OpenInfPanel: function (obj) {
            var dialog = self.createDialog({
                name: name,
                showMask:true,
                width: 300,
                title: self.lang(name),
                body: obj.GetBrowser().GetDisplay(obj),
                closeBtn: { name: '' },
                yesBtn: null,
                noBtn : null
            });
            this.DialogDiv = dialog.div;
        },
        CloseInfPanel: function () {
            self.hideDialog();
        },
        //添加到编辑器
        InsertToEditor: function (src) {
            var img = '<img src="';
            img += src;
            img += '"/>';
            this.Editor.insertHtml(img);
        },
        AfterCapture: function (obj) {
            if (obj) {
                obj.OpenInfPanel(obj);//打开信息面板
            }
        },
        OnError: function (obj, errCode) {
            obj.MessageText(self.plugin.ScreenCaptureError[errCode]);
            obj.ProgressText("");
            //obj.pButton.innerText = "重试";
            obj.State = obj.StateType.Error;
        },
        OnStop: function (obj) {
            obj.State = obj.StateType.Stop;
        },
        /*
	        事件-传输中....
	        参数:
		        obj		JS对象
		        speed	传输速度
		        postedLength 已传输长度。1Byte,1KB,1MB,1GB
		        percent 上传百分比
		        time 剩余时间
        */
        OnProcess : function(obj, speed, postedLength, percent, time) {
            obj.ProgressText(percent);
            //obj.pProcess.style.width = arguments[3] + "%";
            //obj.pMsg.innerText = "已上传:" + arguments[2];
            //obj.pMsg.innerText += " 速度:" + arguments[1] + "/s";
            //obj.pMsg.innerText += " 剩余时间:" + arguments[4];
        },
        OnComplete: function (obj) {
            obj.ProgressText("100%");
            obj.MessageText("上传完成");
            obj.State = obj.StateType.Complete;
            obj.CloseInfPanel(); //隐藏信息层
            //添加到编辑器
            obj.InsertToEditor(obj.ATL.Response);
        },
        OnConnect: function (obj) {
            obj.ProgressText("10%");
            obj.State = obj.StateType.Posting;
        }
    };
    self.plugin.screencapture.Load();
    self.plugin.screencapture.Init();
    // 点击图标时执行
    self.clickToolbar(name, function () {        
        self.plugin.screencapture.Capture();
    });
});

