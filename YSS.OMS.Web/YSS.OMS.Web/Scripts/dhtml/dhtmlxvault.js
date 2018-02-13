//v.2.0 build 131220
dhtmlx=function(a){for(var b in a)dhtmlx[b]=a[b];return dhtmlx};dhtmlx.extend_api=function(a,b,c){var d=window[a];if(d)window[a]=function(a){if(a&&typeof a=="object"&&!a.tagName){var c=d.apply(this,b._init?b._init(a):arguments),f;for(f in dhtmlx)if(b[f])this[b[f]](dhtmlx[f]);for(f in a)if(b[f])this[b[f]](a[f]);else f.indexOf("on")==0&&this.attachEvent(f,a[f])}else c=d.apply(this,arguments);b._patch&&b._patch(this);return c||this},window[a].prototype=d.prototype,c&&dhtmlXHeir(window[a].prototype,c)};
dhtmlxAjax={get:function(a,b){var c=new dtmlXMLLoaderObject(!0);c.async=arguments.length<3;c.waitCall=b;c.loadXML(a);return c},post:function(a,b,c){var d=new dtmlXMLLoaderObject(!0);d.async=arguments.length<4;d.waitCall=c;d.loadXML(a,!0,b);return d},getSync:function(a){return this.get(a,null,!0)},postSync:function(a,b){return this.post(a,b,null,!0)}};
function dtmlXMLLoaderObject(a,b,c,d){this.xmlDoc="";this.async=typeof c!="undefined"?c:!0;this.onloadAction=a||null;this.mainObject=b||null;this.waitCall=null;this.rSeed=d||!1;return this}dtmlXMLLoaderObject.count=0;
dtmlXMLLoaderObject.prototype.waitLoadFunction=function(a){var b=!0;return this.check=function(){if(a&&a.onloadAction!=null&&(!a.xmlDoc.readyState||a.xmlDoc.readyState==4)&&b){b=!1;dtmlXMLLoaderObject.count++;if(typeof a.onloadAction=="function")a.onloadAction(a.mainObject,null,null,null,a);if(a.waitCall)a.waitCall.call(this,a),a.waitCall=null}}};
dtmlXMLLoaderObject.prototype.getXMLTopNode=function(a,b){if(this.xmlDoc.responseXML){var c=this.xmlDoc.responseXML.getElementsByTagName(a);c.length==0&&a.indexOf(":")!=-1&&(c=this.xmlDoc.responseXML.getElementsByTagName(a.split(":")[1]));var d=c[0]}else d=this.xmlDoc.documentElement;if(d)return this._retry=!1,d;if(!this._retry&&_isIE)return this._retry=!0,b=this.xmlDoc,this.loadXMLString(this.xmlDoc.responseText.replace(/^[\s]+/,""),!0),this.getXMLTopNode(a,b);dhtmlxError.throwError("LoadXML","Incorrect XML",
[b||this.xmlDoc,this.mainObject]);return document.createElement("DIV")};dtmlXMLLoaderObject.prototype.loadXMLString=function(a,b){if(_isIE)this.xmlDoc=new ActiveXObject("Microsoft.XMLDOM"),this.xmlDoc.async=this.async,this.xmlDoc.onreadystatechange=function(){},this.xmlDoc.loadXML(a);else{var c=new DOMParser;this.xmlDoc=c.parseFromString(a,"text/xml")}if(!b){if(this.onloadAction)this.onloadAction(this.mainObject,null,null,null,this);if(this.waitCall)this.waitCall(),this.waitCall=null}};
dtmlXMLLoaderObject.prototype.loadXML=function(a,b,c,d){this.rSeed&&(a+=(a.indexOf("?")!=-1?"&":"?")+"a_dhx_rSeed="+(new Date).valueOf());this.filePath=a;this.xmlDoc=!_isIE&&window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");if(this.async)this.xmlDoc.onreadystatechange=new this.waitLoadFunction(this);this.xmlDoc.open(b?"POST":"GET",a,this.async);d?(this.xmlDoc.setRequestHeader("User-Agent","dhtmlxRPC v0.1 ("+navigator.userAgent+")"),this.xmlDoc.setRequestHeader("Content-type",
"text/xml")):b&&this.xmlDoc.setRequestHeader("Content-type",this.contenttype||"application/x-www-form-urlencoded");this.xmlDoc.setRequestHeader("X-Requested-With","XMLHttpRequest");this.xmlDoc.send(c);this.async||(new this.waitLoadFunction(this))()};
dtmlXMLLoaderObject.prototype.destructor=function(){return this.setXSLParamValue=this.getXMLTopNode=this.xmlNodeToJSON=this.doSerialization=this.loadXMLString=this.loadXML=this.doXSLTransToString=this.doXSLTransToObject=this.doXPathOpera=this.doXPath=this.xmlDoc=this.mainObject=this.onloadAction=this.filePath=this.rSeed=this.async=this._retry=this._getAllNamedChilds=this._filterXPath=null};
dtmlXMLLoaderObject.prototype.xmlNodeToJSON=function(a){for(var b={},c=0;c<a.attributes.length;c++)b[a.attributes[c].name]=a.attributes[c].value;b._tagvalue=a.firstChild?a.firstChild.nodeValue:"";for(c=0;c<a.childNodes.length;c++){var d=a.childNodes[c].tagName;d&&(b[d]||(b[d]=[]),b[d].push(this.xmlNodeToJSON(a.childNodes[c])))}return b};function callerFunction(a,b){return this.handler=function(c){if(!c)c=window.event;a(c,b);return!0}}function getAbsoluteLeft(a){return getOffset(a).left}
function getAbsoluteTop(a){return getOffset(a).top}function getOffsetSum(a){for(var b=0,c=0;a;)b+=parseInt(a.offsetTop),c+=parseInt(a.offsetLeft),a=a.offsetParent;return{top:b,left:c}}
function getOffsetRect(a){var b=a.getBoundingClientRect(),c=document.body,d=document.documentElement,e=window.pageYOffset||d.scrollTop||c.scrollTop,g=window.pageXOffset||d.scrollLeft||c.scrollLeft,f=d.clientTop||c.clientTop||0,h=d.clientLeft||c.clientLeft||0,i=b.top+e-f,k=b.left+g-h;return{top:Math.round(i),left:Math.round(k)}}function getOffset(a){return a.getBoundingClientRect?getOffsetRect(a):getOffsetSum(a)}
function convertStringToBoolean(a){typeof a=="string"&&(a=a.toLowerCase());switch(a){case "1":case "true":case "yes":case "y":case 1:case !0:return!0;default:return!1}}function getUrlSymbol(a){return a.indexOf("?")!=-1?"&":"?"}function dhtmlDragAndDropObject(){if(window.dhtmlDragAndDrop)return window.dhtmlDragAndDrop;this.dragStartObject=this.dragStartNode=this.dragNode=this.lastLanding=0;this.tempDOMM=this.tempDOMU=null;this.waitDrag=0;window.dhtmlDragAndDrop=this;return this}
dhtmlDragAndDropObject.prototype.removeDraggableItem=function(a){a.onmousedown=null;a.dragStarter=null;a.dragLanding=null};dhtmlDragAndDropObject.prototype.addDraggableItem=function(a,b){a.onmousedown=this.preCreateDragCopy;a.dragStarter=b;this.addDragLanding(a,b)};dhtmlDragAndDropObject.prototype.addDragLanding=function(a,b){a.dragLanding=b};
dhtmlDragAndDropObject.prototype.preCreateDragCopy=function(a){if(!((a||window.event)&&(a||event).button==2)){if(window.dhtmlDragAndDrop.waitDrag)return window.dhtmlDragAndDrop.waitDrag=0,document.body.onmouseup=window.dhtmlDragAndDrop.tempDOMU,document.body.onmousemove=window.dhtmlDragAndDrop.tempDOMM,!1;window.dhtmlDragAndDrop.dragNode&&window.dhtmlDragAndDrop.stopDrag(a);window.dhtmlDragAndDrop.waitDrag=1;window.dhtmlDragAndDrop.tempDOMU=document.body.onmouseup;window.dhtmlDragAndDrop.tempDOMM=
document.body.onmousemove;window.dhtmlDragAndDrop.dragStartNode=this;window.dhtmlDragAndDrop.dragStartObject=this.dragStarter;document.body.onmouseup=window.dhtmlDragAndDrop.preCreateDragCopy;document.body.onmousemove=window.dhtmlDragAndDrop.callDrag;window.dhtmlDragAndDrop.downtime=(new Date).valueOf();a&&a.preventDefault&&a.preventDefault();return!1}};
dhtmlDragAndDropObject.prototype.callDrag=function(a){if(!a)a=window.event;dragger=window.dhtmlDragAndDrop;if(!((new Date).valueOf()-dragger.downtime<100)){if(!dragger.dragNode)if(dragger.waitDrag){dragger.dragNode=dragger.dragStartObject._createDragNode(dragger.dragStartNode,a);if(!dragger.dragNode)return dragger.stopDrag();dragger.dragNode.onselectstart=function(){return!1};dragger.gldragNode=dragger.dragNode;document.body.appendChild(dragger.dragNode);document.body.onmouseup=dragger.stopDrag;dragger.waitDrag=
0;dragger.dragNode.pWindow=window;dragger.initFrameRoute()}else return dragger.stopDrag(a,!0);if(dragger.dragNode.parentNode!=window.document.body&&dragger.gldragNode){var b=dragger.gldragNode;if(dragger.gldragNode.old)b=dragger.gldragNode.old;b.parentNode.removeChild(b);var c=dragger.dragNode.pWindow;b.pWindow&&b.pWindow.dhtmlDragAndDrop.lastLanding&&b.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(b.pWindow.dhtmlDragAndDrop.lastLanding);if(_isIE){var d=document.createElement("Div");d.innerHTML=
dragger.dragNode.outerHTML;dragger.dragNode=d.childNodes[0]}else dragger.dragNode=dragger.dragNode.cloneNode(!0);dragger.dragNode.pWindow=window;dragger.gldragNode.old=dragger.dragNode;document.body.appendChild(dragger.dragNode);c.dhtmlDragAndDrop.dragNode=dragger.dragNode}dragger.dragNode.style.left=a.clientX+15+(dragger.fx?dragger.fx*-1:0)+(document.body.scrollLeft||document.documentElement.scrollLeft)+"px";dragger.dragNode.style.top=a.clientY+3+(dragger.fy?dragger.fy*-1:0)+(document.body.scrollTop||
document.documentElement.scrollTop)+"px";var e=a.srcElement?a.srcElement:a.target;dragger.checkLanding(e,a)}};dhtmlDragAndDropObject.prototype.calculateFramePosition=function(a){if(window.name){for(var b=parent.frames[window.name].frameElement.offsetParent,c=0,d=0;b;)c+=b.offsetLeft,d+=b.offsetTop,b=b.offsetParent;if(parent.dhtmlDragAndDrop){var e=parent.dhtmlDragAndDrop.calculateFramePosition(1);c+=e.split("_")[0]*1;d+=e.split("_")[1]*1}if(a)return c+"_"+d;else this.fx=c;this.fy=d}return"0_0"};
dhtmlDragAndDropObject.prototype.checkLanding=function(a,b){a&&a.dragLanding?(this.lastLanding&&this.lastLanding.dragLanding._dragOut(this.lastLanding),this.lastLanding=a,this.lastLanding=this.lastLanding.dragLanding._dragIn(this.lastLanding,this.dragStartNode,b.clientX,b.clientY,b),this.lastLanding_scr=_isIE?b.srcElement:b.target):a&&a.tagName!="BODY"?this.checkLanding(a.parentNode,b):(this.lastLanding&&this.lastLanding.dragLanding._dragOut(this.lastLanding,b.clientX,b.clientY,b),this.lastLanding=
0,this._onNotFound&&this._onNotFound())};
dhtmlDragAndDropObject.prototype.stopDrag=function(a,b){dragger=window.dhtmlDragAndDrop;if(!b){dragger.stopFrameRoute();var c=dragger.lastLanding;dragger.lastLanding=null;c&&c.dragLanding._drag(dragger.dragStartNode,dragger.dragStartObject,c,_isIE?event.srcElement:a.target)}dragger.lastLanding=null;dragger.dragNode&&dragger.dragNode.parentNode==document.body&&dragger.dragNode.parentNode.removeChild(dragger.dragNode);dragger.dragNode=0;dragger.gldragNode=0;dragger.fx=0;dragger.fy=0;dragger.dragStartNode=
0;dragger.dragStartObject=0;document.body.onmouseup=dragger.tempDOMU;document.body.onmousemove=dragger.tempDOMM;dragger.tempDOMU=null;dragger.tempDOMM=null;dragger.waitDrag=0};dhtmlDragAndDropObject.prototype.stopFrameRoute=function(a){a&&window.dhtmlDragAndDrop.stopDrag(1,1);for(var b=0;b<window.frames.length;b++)try{window.frames[b]!=a&&window.frames[b].dhtmlDragAndDrop&&window.frames[b].dhtmlDragAndDrop.stopFrameRoute(window)}catch(c){}try{parent.dhtmlDragAndDrop&&parent!=window&&parent!=a&&parent.dhtmlDragAndDrop.stopFrameRoute(window)}catch(d){}};
dhtmlDragAndDropObject.prototype.initFrameRoute=function(a,b){if(a)window.dhtmlDragAndDrop.preCreateDragCopy(),window.dhtmlDragAndDrop.dragStartNode=a.dhtmlDragAndDrop.dragStartNode,window.dhtmlDragAndDrop.dragStartObject=a.dhtmlDragAndDrop.dragStartObject,window.dhtmlDragAndDrop.dragNode=a.dhtmlDragAndDrop.dragNode,window.dhtmlDragAndDrop.gldragNode=a.dhtmlDragAndDrop.dragNode,window.document.body.onmouseup=window.dhtmlDragAndDrop.stopDrag,window.waitDrag=0,!_isIE&&b&&(!_isFF||_FFrv<1.8)&&window.dhtmlDragAndDrop.calculateFramePosition();
try{parent.dhtmlDragAndDrop&&parent!=window&&parent!=a&&parent.dhtmlDragAndDrop.initFrameRoute(window)}catch(c){}for(var d=0;d<window.frames.length;d++)try{window.frames[d]!=a&&window.frames[d].dhtmlDragAndDrop&&window.frames[d].dhtmlDragAndDrop.initFrameRoute(window,!a||b?1:0)}catch(e){}};_OperaRv=_KHTMLrv=_FFrv=_isChrome=_isMacOS=_isKHTML=_isOpera=_isIE=_isFF=!1;navigator.userAgent.indexOf("Macintosh")!=-1&&(_isMacOS=!0);navigator.userAgent.toLowerCase().indexOf("chrome")>-1&&(_isChrome=!0);
if(navigator.userAgent.indexOf("Safari")!=-1||navigator.userAgent.indexOf("Konqueror")!=-1)_KHTMLrv=parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Safari")+7,5)),_KHTMLrv>525?(_isFF=!0,_FFrv=1.9):_isKHTML=!0;else if(navigator.userAgent.indexOf("Opera")!=-1)_isOpera=!0,_OperaRv=parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera")+6,3));else if(navigator.appName.indexOf("Microsoft")!=-1){if(_isIE=!0,(navigator.appVersion.indexOf("MSIE 8.0")!=-1||navigator.appVersion.indexOf("MSIE 9.0")!=
-1||navigator.appVersion.indexOf("MSIE 10.0")!=-1||document.documentMode>7)&&document.compatMode!="BackCompat")_isIE=8}else navigator.appName=="Netscape"&&navigator.userAgent.indexOf("Trident")!=-1?_isIE=8:(_isFF=!0,_FFrv=parseFloat(navigator.userAgent.split("rv:")[1]));
dtmlXMLLoaderObject.prototype.doXPath=function(a,b,c,d){if(_isKHTML||!_isIE&&!window.XPathResult)return this.doXPathOpera(a,b);if(_isIE)return b||(b=this.xmlDoc.nodeName?this.xmlDoc:this.xmlDoc.responseXML),b||dhtmlxError.throwError("LoadXML","Incorrect XML",[b||this.xmlDoc,this.mainObject]),c!=null&&b.setProperty("SelectionNamespaces","xmlns:xsl='"+c+"'"),d=="single"?b.selectSingleNode(a):b.selectNodes(a)||[];else{var e=b;b||(b=this.xmlDoc.nodeName?this.xmlDoc:this.xmlDoc.responseXML);b||dhtmlxError.throwError("LoadXML",
"Incorrect XML",[b||this.xmlDoc,this.mainObject]);b.nodeName.indexOf("document")!=-1?e=b:(e=b,b=b.ownerDocument);var g=XPathResult.ANY_TYPE;if(d=="single")g=XPathResult.FIRST_ORDERED_NODE_TYPE;var f=[],h=b.evaluate(a,e,function(){return c},g,null);if(g==XPathResult.FIRST_ORDERED_NODE_TYPE)return h.singleNodeValue;for(var i=h.iterateNext();i;)f[f.length]=i,i=h.iterateNext();return f}};function j(){if(!this.catches)this.catches=[];return this}j.prototype.catchError=function(a,b){this.catches[a]=b};
j.prototype.throwError=function(a,b,c){if(this.catches[a])return this.catches[a](a,b,c);if(this.catches.ALL)return this.catches.ALL(a,b,c);alert("Error type: "+a+"\nDescription: "+b);return null};window.dhtmlxError=new j;
dtmlXMLLoaderObject.prototype.doXPathOpera=function(a,b){var c=a.replace(/[\/]+/gi,"/").split("/"),d=null,e=1;if(!c.length)return[];if(c[0]==".")d=[b];else if(c[0]=="")d=(this.xmlDoc.responseXML||this.xmlDoc).getElementsByTagName(c[e].replace(/\[[^\]]*\]/g,"")),e++;else return[];for(;e<c.length;e++)d=this._getAllNamedChilds(d,c[e]);c[e-1].indexOf("[")!=-1&&(d=this._filterXPath(d,c[e-1]));return d};
dtmlXMLLoaderObject.prototype._filterXPath=function(a,b){for(var c=[],b=b.replace(/[^\[]*\[\@/g,"").replace(/[\[\]\@]*/g,""),d=0;d<a.length;d++)a[d].getAttribute(b)&&(c[c.length]=a[d]);return c};
dtmlXMLLoaderObject.prototype._getAllNamedChilds=function(a,b){var c=[];_isKHTML&&(b=b.toUpperCase());for(var d=0;d<a.length;d++)for(var e=0;e<a[d].childNodes.length;e++)_isKHTML?a[d].childNodes[e].tagName&&a[d].childNodes[e].tagName.toUpperCase()==b&&(c[c.length]=a[d].childNodes[e]):a[d].childNodes[e].tagName==b&&(c[c.length]=a[d].childNodes[e]);return c};function dhtmlXHeir(a,b){for(var c in b)typeof b[c]=="function"&&(a[c]=b[c]);return a}
function dhtmlxEvent(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c)}dtmlXMLLoaderObject.prototype.xslDoc=null;dtmlXMLLoaderObject.prototype.setXSLParamValue=function(a,b,c){if(!c)c=this.xslDoc;if(c.responseXML)c=c.responseXML;var d=this.doXPath("/xsl:stylesheet/xsl:variable[@name='"+a+"']",c,"http://www.w3.org/1999/XSL/Transform","single");if(d!=null)d.firstChild.nodeValue=b};
dtmlXMLLoaderObject.prototype.doXSLTransToObject=function(a,b){if(!a)a=this.xslDoc;if(a.responseXML)a=a.responseXML;if(!b)b=this.xmlDoc;if(b.responseXML)b=b.responseXML;if(_isIE){d=new ActiveXObject("Msxml2.DOMDocument.3.0");try{b.transformNodeToObject(a,d)}catch(c){d=b.transformNode(a)}}else{if(!this.XSLProcessor)this.XSLProcessor=new XSLTProcessor,this.XSLProcessor.importStylesheet(a);var d=this.XSLProcessor.transformToDocument(b)}return d};
dtmlXMLLoaderObject.prototype.doXSLTransToString=function(a,b){var c=this.doXSLTransToObject(a,b);return typeof c=="string"?c:this.doSerialization(c)};dtmlXMLLoaderObject.prototype.doSerialization=function(a){if(!a)a=this.xmlDoc;if(a.responseXML)a=a.responseXML;if(_isIE)return a.xml;else{var b=new XMLSerializer;return b.serializeToString(a)}};
dhtmlxEventable=function(a){a.attachEvent=function(a,c,d){a="ev_"+a.toLowerCase();this[a]||(this[a]=new this.eventCatcher(d||this));return a+":"+this[a].addEvent(c)};a.callEvent=function(a,c){a="ev_"+a.toLowerCase();return this[a]?this[a].apply(this,c):!0};a.checkEvent=function(a){return!!this["ev_"+a.toLowerCase()]};a.eventCatcher=function(a){var c=[],d=function(){for(var d=!0,g=0;g<c.length;g++)if(c[g]!=null)var f=c[g].apply(a,arguments),d=d&&f;return d};d.addEvent=function(a){typeof a!="function"&&
(a=eval(a));return a?c.push(a)-1:!1};d.removeEvent=function(a){c[a]=null};return d};a.detachEvent=function(a){if(a!=!1){var c=a.split(":");this[c[0]].removeEvent(c[1])}};a.detachAllEvents=function(){for(var a in this)a.indexOf("ev_")==0&&(this.detachEvent(a),this[a]=null)};a=null};

//v.2.0 build 131220
var swfobject=function(){var UNDEF="undefined",OBJECT="object",SHOCKWAVE_FLASH="Shockwave Flash",SHOCKWAVE_FLASH_AX="ShockwaveFlash.ShockwaveFlash",FLASH_MIME_TYPE="application/x-shockwave-flash",EXPRESS_INSTALL_ID="SWFObjectExprInst",ON_READY_STATE_CHANGE="onreadystatechange",win=window,doc=document,nav=navigator,plugin=false,domLoadFnArr=[main],regObjArr=[],objIdArr=[],listenersArr=[],storedAltContent,storedAltContentId,storedCallbackFn,storedCallbackObj,isDomLoaded=false,isExpressInstallActive=false,dynamicStylesheet,dynamicStylesheetMedia,autoHideShow=true,ua=function(){var w3cdom=typeof doc.getElementById!=UNDEF&&typeof doc.getElementsByTagName!=UNDEF&&typeof doc.createElement!=UNDEF,u=nav.userAgent.toLowerCase(),p=nav.platform.toLowerCase(),windows=p?/win/.test(p):/win/.test(u),mac=p?/mac/.test(p):/mac/.test(u),webkit=/webkit/.test(u)?parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,ie= ! +"\v1",playerVersion=[0,0,0],d=null;if(typeof nav.plugins!=UNDEF&&typeof nav.plugins[SHOCKWAVE_FLASH]==OBJECT){d=nav.plugins[SHOCKWAVE_FLASH].description;if(d&& !(typeof nav.mimeTypes!=UNDEF&&nav.mimeTypes[FLASH_MIME_TYPE]&& !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)){plugin=true;ie=false;d=d.replace(/^.*\s+(\S+\s+\S+$)/,"$1");playerVersion[0]=parseInt(d.replace(/^(.*)\..*$/,"$1"),10);playerVersion[1]=parseInt(d.replace(/^.*\.(.*)\s.*$/,"$1"),10);playerVersion[2]=/[a-zA-Z]/.test(d)?parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0;}}else if(typeof win.ActiveXObject!=UNDEF){try{var a=new ActiveXObject(SHOCKWAVE_FLASH_AX);if(a){d=a.GetVariable("$version");if(d){ie=true;d=d.split(" ")[1].split(",");playerVersion=[parseInt(d[0],10),parseInt(d[1],10),parseInt(d[2],10)];}}}catch(e){}}return{w3:w3cdom,pv:playerVersion,wk:webkit,ie:ie,win:windows,mac:mac};}(),onDomLoad=function(){if(!ua.w3){return;}if((typeof doc.readyState!=UNDEF&&doc.readyState=="complete")||(typeof doc.readyState==UNDEF&&(doc.getElementsByTagName("body")[0]||doc.body))){callDomLoadFunctions();}if(!isDomLoaded){if(typeof doc.addEventListener!=UNDEF){doc.addEventListener("DOMContentLoaded",callDomLoadFunctions,false);}if(ua.ie&&ua.win){doc.attachEvent(ON_READY_STATE_CHANGE,function(){if(doc.readyState=="complete"){doc.detachEvent(ON_READY_STATE_CHANGE,arguments.callee);callDomLoadFunctions();}});if(win==top){(function(){if(isDomLoaded){return;}try{doc.documentElement.doScroll("left");}catch(e){setTimeout(arguments.callee,0);return;}callDomLoadFunctions();})();}}if(ua.wk){(function(){if(isDomLoaded){return;}if(!/loaded|complete/.test(doc.readyState)){setTimeout(arguments.callee,0);return;}callDomLoadFunctions();})();}addLoadEvent(callDomLoadFunctions);}}();function callDomLoadFunctions(){if(isDomLoaded){return;}try{var t=doc.getElementsByTagName("body")[0].appendChild(createElement("span"));t.parentNode.removeChild(t);}catch(e){return;}isDomLoaded=true;var dl=domLoadFnArr.length;for(var i=0;i<dl;i++){domLoadFnArr[i]();}};function addDomLoadEvent(fn){if(isDomLoaded){fn();}else{domLoadFnArr[domLoadFnArr.length]=fn;}};function addLoadEvent(fn){if(typeof win.addEventListener!=UNDEF){win.addEventListener("load",fn,false);}else if(typeof doc.addEventListener!=UNDEF){doc.addEventListener("load",fn,false);}else if(typeof win.attachEvent!=UNDEF){addListener(win,"onload",fn);}else if(typeof win.onload=="function"){var fnOld=win.onload;win.onload=function(){fnOld();fn();};}else{win.onload=fn;}};function main(){if(plugin){testPlayerVersion();}else{matchVersions();}};function testPlayerVersion(){var b=doc.getElementsByTagName("body")[0];var o=createElement(OBJECT);o.setAttribute("type",FLASH_MIME_TYPE);var t=b.appendChild(o);if(t){var counter=0;(function(){if(typeof t.GetVariable!=UNDEF){var d=t.GetVariable("$version");if(d){d=d.split(" ")[1].split(",");ua.pv=[parseInt(d[0],10),parseInt(d[1],10),parseInt(d[2],10)];}}else if(counter<10){counter++;setTimeout(arguments.callee,10);return;}b.removeChild(o);t=null;matchVersions();})();}else{matchVersions();}};function matchVersions(){var rl=regObjArr.length;if(rl>0){for(var i=0;i<rl;i++){var id=regObjArr[i].id;var cb=regObjArr[i].callbackFn;var cbObj={success:false,id:id};if(ua.pv[0]>0){var obj=getElementById(id);if(obj){if(hasPlayerVersion(regObjArr[i].swfVersion)&& !(ua.wk&&ua.wk<312)){setVisibility(id,true);if(cb){cbObj.success=true;cbObj.ref=getObjectById(id);cb(cbObj);}}else if(regObjArr[i].expressInstall&&canExpressInstall()){var att={};att.data=regObjArr[i].expressInstall;att.width=obj.getAttribute("width")||"0";att.height=obj.getAttribute("height")||"0";if(obj.getAttribute("class")){att.styleclass=obj.getAttribute("class");}if(obj.getAttribute("align")){att.align=obj.getAttribute("align");}var asv={};var p=obj.getElementsByTagName("param");var pl=p.length;for(var j=0;j<pl;j++){if(p[j].getAttribute("name").toLowerCase()!="movie"){asv[p[j].getAttribute("name")]=p[j].getAttribute("value");}}showExpressInstall(att,asv,id,cb);}else{displayAltContent(obj);if(cb){cb(cbObj);}}}}else{setVisibility(id,true);if(cb){var o=getObjectById(id);if(o&&typeof o.SetVariable!=UNDEF){cbObj.success=true;cbObj.ref=o;}cb(cbObj);}}}}};function getObjectById(objectIdStr){var r=null;var o=getElementById(objectIdStr);if(o&&o.nodeName=="OBJECT"){if(typeof o.SetVariable!=UNDEF){r=o;}else{var n=o.getElementsByTagName(OBJECT)[0];if(n){r=n;}}}return r;};function canExpressInstall(){return!isExpressInstallActive&&hasPlayerVersion("6.0.65")&&(ua.win||ua.mac)&& !(ua.wk&&ua.wk<312);};function showExpressInstall(att,asv,replaceElemIdStr,callbackFn){isExpressInstallActive=true;storedCallbackFn=callbackFn||null;storedCallbackObj={success:false,id:replaceElemIdStr};var obj=getElementById(replaceElemIdStr);if(obj){if(obj.nodeName=="OBJECT"){storedAltContent=abstractAltContent(obj);storedAltContentId=null;}else{storedAltContent=obj;storedAltContentId=replaceElemIdStr;}att.id=EXPRESS_INSTALL_ID;if(typeof att.width==UNDEF||(!/%$/.test(att.width)&&parseInt(att.width,10)<310)){att.width="310";}if(typeof att.height==UNDEF||(!/%$/.test(att.height)&&parseInt(att.height,10)<137)){att.height="137";}doc.title=doc.title.slice(0,47)+" - Flash Player Installation";var pt=ua.ie&&ua.win?"ActiveX":"PlugIn",fv="MMredirectURL="+encodeURI(window.location).toString().replace(/&/g,"%26")+"&MMplayerType="+pt+"&MMdoctitle="+doc.title;if(typeof asv.flashvars!=UNDEF){asv.flashvars+="&"+fv;}else{asv.flashvars=fv;}if(ua.ie&&ua.win&&obj.readyState!=4){var newObj=createElement("div");replaceElemIdStr+="SWFObjectNew";newObj.setAttribute("id",replaceElemIdStr);obj.parentNode.insertBefore(newObj,obj);obj.style.display="none";(function(){if(obj.readyState==4){obj.parentNode.removeChild(obj);}else{setTimeout(arguments.callee,10);}})();}createSWF(att,asv,replaceElemIdStr);}};function displayAltContent(obj){if(ua.ie&&ua.win&&obj.readyState!=4){var el=createElement("div");obj.parentNode.insertBefore(el,obj);el.parentNode.replaceChild(abstractAltContent(obj),el);obj.style.display="none";(function(){if(obj.readyState==4){obj.parentNode.removeChild(obj);}else{setTimeout(arguments.callee,10);}})();}else{obj.parentNode.replaceChild(abstractAltContent(obj),obj);}};function abstractAltContent(obj){var ac=createElement("div");if(ua.win&&ua.ie){ac.innerHTML=obj.innerHTML;}else{var nestedObj=obj.getElementsByTagName(OBJECT)[0];if(nestedObj){var c=nestedObj.childNodes;if(c){var cl=c.length;for(var i=0;i<cl;i++){if(!(c[i].nodeType==1&&c[i].nodeName=="PARAM")&& !(c[i].nodeType==8)){ac.appendChild(c[i].cloneNode(true));}}}}}return ac;};function createSWF(attObj,parObj,id){var r,el=getElementById(id);if(ua.wk&&ua.wk<312){return r;}if(el){if(typeof attObj.id==UNDEF){attObj.id=id;}if(ua.ie&&ua.win){var att="";for(var i in attObj){if(attObj[i]!=Object.prototype[i]){if(i.toLowerCase()=="data"){parObj.movie=attObj[i];}else if(i.toLowerCase()=="styleclass"){att+=' class="'+attObj[i]+'"';}else if(i.toLowerCase()!="classid"){att+=' '+i+'="'+attObj[i]+'"';}}}var asv="";for(var j in parObj){if(parObj[j]!=Object.prototype[j]){asv+='<param name="'+j+'" value="'+parObj[j]+'" />';}}el.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+att+'>'+asv+'</object>';objIdArr[objIdArr.length]=attObj.id;r=getElementById(attObj.id);}else{var o=createElement(OBJECT);o.setAttribute("type",FLASH_MIME_TYPE);for(var m in attObj){if(attObj[m]!=Object.prototype[m]){if(m.toLowerCase()=="styleclass"){o.setAttribute("class",attObj[m]);}else if(m.toLowerCase()!="classid"){o.setAttribute(m,attObj[m]);}}}for(var n in parObj){if(parObj[n]!=Object.prototype[n]&&n.toLowerCase()!="movie"){createObjParam(o,n,parObj[n]);}}el.parentNode.replaceChild(o,el);r=o;}}return r;};function createObjParam(el,pName,pValue){var p=createElement("param");p.setAttribute("name",pName);p.setAttribute("value",pValue);el.appendChild(p);};function removeSWF(id){var obj=getElementById(id);if(obj&&obj.nodeName=="OBJECT"){if(ua.ie&&ua.win){obj.style.display="none";(function(){if(obj.readyState==4){removeObjectInIE(id);}else{setTimeout(arguments.callee,10);}})();}else{obj.parentNode.removeChild(obj);}}};function removeObjectInIE(id){var obj=getElementById(id);if(obj){for(var i in obj){if(typeof obj[i]=="function"){obj[i]=null;}}obj.parentNode.removeChild(obj);}};function getElementById(id){var el=null;try{el=doc.getElementById(id);}catch(e){}return el;};function createElement(el){return doc.createElement(el);};function addListener(target,eventType,fn){target.attachEvent(eventType,fn);listenersArr[listenersArr.length]=[target,eventType,fn];};function hasPlayerVersion(rv){var pv=ua.pv,v=rv.split(".");v[0]=parseInt(v[0],10);v[1]=parseInt(v[1],10)||0;v[2]=parseInt(v[2],10)||0;return(pv[0]>v[0]||(pv[0]==v[0]&&pv[1]>v[1])||(pv[0]==v[0]&&pv[1]==v[1]&&pv[2]>=v[2]))?true:false;};function createCSS(sel,decl,media,newStyle){if(ua.ie&&ua.mac){return;}var h=doc.getElementsByTagName("head")[0];if(!h){return;}var m=(media&&typeof media=="string")?media:"screen";if(newStyle){dynamicStylesheet=null;dynamicStylesheetMedia=null;}if(!dynamicStylesheet||dynamicStylesheetMedia!=m){var s=createElement("style");s.setAttribute("type","text/css");s.setAttribute("media",m);dynamicStylesheet=h.appendChild(s);if(ua.ie&&ua.win&&typeof doc.styleSheets!=UNDEF&&doc.styleSheets.length>0){dynamicStylesheet=doc.styleSheets[doc.styleSheets.length-1];}dynamicStylesheetMedia=m;}if(ua.ie&&ua.win){if(dynamicStylesheet&&typeof dynamicStylesheet.addRule==OBJECT){dynamicStylesheet.addRule(sel,decl);}}else{if(dynamicStylesheet&&typeof doc.createTextNode!=UNDEF){dynamicStylesheet.appendChild(doc.createTextNode(sel+" {"+decl+"}"));}}};function setVisibility(id,Yi){if(!autoHideShow){return;}var v=Yi?"visible":"hidden";if(isDomLoaded&&getElementById(id)){getElementById(id).style.visibility=v;}else{createCSS("#"+id,"visibility:"+v);}};function urlEncodeIfNecessary(s){var regex=/[\\\"<>\.;]/;var hasBadChars=regex.exec(s)!=null;return hasBadChars&&typeof encodeURIComponent!=UNDEF?encodeURIComponent(s):s;};var cleanup=function(){if(ua.ie&&ua.win){window.attachEvent("onunload",function(){var ll=listenersArr.length;for(var i=0;i<ll;i++){listenersArr[i][0].detachEvent(listenersArr[i][1],listenersArr[i][2]);}var il=objIdArr.length;for(var j=0;j<il;j++){removeSWF(objIdArr[j]);}for(var k in ua){ua[k]=null;}ua=null;for(var l in swfobject){swfobject[l]=null;}swfobject=null;});}}();return{registerObject:function(objectIdStr,swfVersionStr,xiSwfUrlStr,callbackFn){if(ua.w3&&objectIdStr&&swfVersionStr){var regObj={};regObj.id=objectIdStr;regObj.swfVersion=swfVersionStr;regObj.expressInstall=xiSwfUrlStr;regObj.callbackFn=callbackFn;regObjArr[regObjArr.length]=regObj;setVisibility(objectIdStr,false);}else if(callbackFn){callbackFn({success:false,id:objectIdStr});}},getObjectById:function(objectIdStr){if(ua.w3){return getObjectById(objectIdStr);}},embedSWF:function(swfUrlStr,replaceElemIdStr,widthStr,heightStr,swfVersionStr,xiSwfUrlStr,flashvarsObj,parObj,attObj,callbackFn){var callbackObj={success:false,id:replaceElemIdStr};if(ua.w3&& !(ua.wk&&ua.wk<312)&&swfUrlStr&&replaceElemIdStr&&widthStr&&heightStr&&swfVersionStr){setVisibility(replaceElemIdStr,false);addDomLoadEvent(function(){widthStr+="";heightStr+="";var att={};if(attObj&&typeof attObj===OBJECT){for(var i in attObj){att[i]=attObj[i];}}att.data=swfUrlStr;att.width=widthStr;att.height=heightStr;var asv={};if(parObj&&typeof parObj===OBJECT){for(var j in parObj){asv[j]=parObj[j];}}if(flashvarsObj&&typeof flashvarsObj===OBJECT){for(var k in flashvarsObj){if(typeof asv.flashvars!=UNDEF){asv.flashvars+="&"+k+"="+flashvarsObj[k];}else{asv.flashvars=k+"="+flashvarsObj[k];}}}if(hasPlayerVersion(swfVersionStr)){var obj=createSWF(att,asv,replaceElemIdStr);if(att.id==replaceElemIdStr){setVisibility(replaceElemIdStr,true);}callbackObj.success=true;callbackObj.ref=obj;}else if(xiSwfUrlStr&&canExpressInstall()){att.data=xiSwfUrlStr;showExpressInstall(att,asv,replaceElemIdStr,callbackFn);return;}else{setVisibility(replaceElemIdStr,true);}if(callbackFn){callbackFn(callbackObj);}});}else if(callbackFn){callbackFn(callbackObj);}},switchOffAutoHideShow:function(){autoHideShow=false;},ua:ua,getFlashPlayerVersion:function(){return{major:ua.pv[0],minor:ua.pv[1],release:ua.pv[2]};},hasFlashPlayerVersion:hasPlayerVersion,createSWF:function(attObj,parObj,replaceElemIdStr){if(ua.w3){return createSWF(attObj,parObj,replaceElemIdStr);}else{return undefined;}},showExpressInstall:function(att,asv,replaceElemIdStr,callbackFn){if(ua.w3&&canExpressInstall()){showExpressInstall(att,asv,replaceElemIdStr,callbackFn);}},removeSWF:function(objElemIdStr){if(ua.w3){removeSWF(objElemIdStr);}},createCSS:function(selStr,declStr,mediaStr,newStyleBoolean){if(ua.w3){createCSS(selStr,declStr,mediaStr,newStyleBoolean);}},addDomLoadEvent:addDomLoadEvent,addLoadEvent:addLoadEvent,getQueryParamValue:function(param){var q=doc.location.search||doc.location.hash;if(q){if(/\?/.test(q)){q=q.split("?")[1];}if(param==null){return urlEncodeIfNecessary(q);}var pairs=q.split("&");for(var i=0;i<pairs.length;i++){if(pairs[i].substring(0,pairs[i].indexOf("="))==param){return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=")+1)));}}}return "";},expressInstallCallback:function(){if(isExpressInstallActive){var obj=getElementById(EXPRESS_INSTALL_ID);if(obj&&storedAltContent){obj.parentNode.replaceChild(storedAltContent,obj);if(storedAltContentId){setVisibility(storedAltContentId,true);if(ua.ie&&ua.win){storedAltContent.style.display="block";}}if(storedCallbackFn){storedCallbackFn(storedCallbackObj);}}isExpressInstallActive=false;}}};}();

//v.2.0 build 131220
function dhtmlXVaultObject(a) {
    var b = this;
    this.conf = {
        version: "2.0",
        skin: a.skin || dhtmlx.skin || this._skinDetect() || "dhx_skyblue",
        engine: null,
        list: "default",
        url: a.uploadUrl || "",
        idd: 1,
        swf_file: a.swfPath || "",
        swf_url: a.swfUrl || "",
        swf_logs: a.swfLogs,
        sl_xap: a.slXap,
        sl_url: a.slUrl,
        sl_logs: a.slLogs,
        get_url : a.getUrl || "",
        enabled: !0,
        auto_start: typeof a.autoStart != "undefined" ? a.autoStart == !0: !0,
        auto_remove: typeof a.autoRemove != "undefined" ? a.autoRemove == !0: !1,
        files_added: 0,
        uploaded_count: 0,
        files_limit: typeof a.filesLimit != "undefined" ? a.filesLimit: 0,
        max_file_size: 0,
        buttons: {
            upload: typeof a.buttonUpload != "undefined" ? a.buttonUpload == !0: !1,
            clear: typeof a.buttonClear != "undefined" ? a.buttonClear == !0: !0
        },
        ofs: {
            dhx_skyblue: 5,
            dhx_web: 7,
            dhx_terrace: 10,
            bootstrap: 10
        },
        uploaded_state: {},
        uploaded_files: {},
        progress_mode: "percent",
        icon_def: "",
        icons: {},
        remark: typeof a.remark != "undefined" ? a.remark : null
    };
    this.list = this["list_" + this.conf.list];
    this.list.config = this.conf;
    this.conf.icon_def = this.icon_def;
    for (var c in this.icons) for (var d = 0; d < this.icons[c].length; d++) this.conf.icons[this.icons[c][d]] = c;
    if (typeof a.mode == "string" &&  typeof this[a.mode] == "function") this.conf.engine = a.mode;
    else {
        this.conf.engine = "html4";
        var e = null;
        typeof window.FormData != "undefined" && typeof window.XMLHttpRequest != "undefined" && (e = new XMLHttpRequest, typeof e.upload == "undefined" && (e = null));
        if (e != null) this.conf.engine = "html5";
        else if (typeof window.swfobject != "undefined" || e === !1) {
            if (e = swfobject.getFlashPlayerVersion(), e.major >= 10) this.conf.engine = "flash"
        } else if (this.conf.sl_v = this.getSLVersion(), this.conf.sl_v) this.conf.engine = "sl";
        e = null
    }
    var f = typeof a.container == "string" ? document.getElementById(a.container) : a.container;
    f._attach_mode == !0 ? this.base = f: (this.base = document.createElement("DIV"), f.appendChild(this.base));
    this.base.className += " dhx_vault_" + this.conf.skin;
    if (f._no_border == !0) this.base.style.border = "0px solid white";
    f = a = null;
    this.p_controls = document.createElement("DIV");
    this.p_controls.className = "dhx_vault_controls";
    this.base.appendChild(this.p_controls);
    this.p_controls.onselectstart = function(a) {
        a = a || event;
        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
        return ! 1
    };
    this.p_files = document.createElement("DIV");
    this.p_files.className = "dhx_vault_files";
    this.base.appendChild(this.p_files);
    if(this.conf.remark){
		    this.remark = document.createElement("DIV");
		    this.remark.className = "dhx_vault_remark";
		    this.remark.innerText = this.conf.remark;
		    this.base.appendChild(this.remark);
	  }
    this._doOnFilesClick = function(a) {
        for (var a = a || event, c = a.target || a.srcElement, d = null; c != b.p_files && d == null;) d == null && c != null && c._action != null ? d = c._action: c = c.parentNode;
        d != null && d.data == "delete_file" && b.conf.enabled && b._removeFileFromQueue(d.id)
    };
    typeof window.addEventListener == "function" ? this.p_files.addEventListener("click", this._doOnFilesClick, !1) : this.p_files.attachEvent("onclick", 
    this._doOnFilesClick);
    this.setSizes();
    this.file_data = {};
    this.file_items = {};
    this._initToolbar = function() {
        this.b_opts = {
            browse: {
                str: "btnAdd",
                onclick: null
            },
            upload: {
                str: "btnUpload",
                onclick: function() {
                    b.conf.enabled && (b.conf.uploading || b._uploadStart())
                }
            },
            cancel: {
                str: "btnCancel",
                onclick: function() {
                    b.conf.enabled && (b._uploadStop(), b._switchButton(!1))
                }
            },
            clear: {
                str: "btnClean",
                onclick: function() {
                    b.conf.enabled && b.clear()
                },
                css: "float:right!important;"
            }
        };
        this.buttons = {};
        for (var a in this.b_opts) {
            var c = document.createElement("DIV");
            c.innerHTML = "<table cellspacing='0' cellpadding='0' border='0' class='dhxvault_btn_table dhxvault_btn_" + a + "' style='position:relative;'><tr><td class='dhxvault_btn_left'></td><td class='dhxvault_btn_middle'><div class='dhxvault_button_icon dhx_vault_icon_" + a + "'></div></td><td class='dhxvault_btn_middle'>" + this.strings[this.b_opts[a].str] + "</td><td class='dhxvault_btn_right'></td></tr></table>";
            this.b_opts[a].css != null && (c.style.cssText += this.b_opts[a].css);
            c.className = "dhx_vault_button";
            c._onclick = this.b_opts[a].onclick;
            c.onmouseover = function() {
                if (b.conf.enabled == !0 && this._hover != !0) this._hover = !0,
                this.className = "dhx_vault_button dhx_vault_button_hover"
            };
            c.onmouseout = function() {
                if (b.conf.enabled == !0 && this._hover == !0) this._hover = !1,
                this.className = "dhx_vault_button"
            };
            c.onmousedown = function() {
                if (b.conf.enabled == !0 && this._hover == !0) this._pressed = !0,
                this.className = "dhx_vault_button dhx_vault_button_pressed"
            };
            c.onmouseup = function() {
                if (b.conf.enabled == !0 && this._pressed == !0) this._pressed = !1,
                this.className = "dhx_vault_button" + (this._hover ? " dhx_vault_button_hover": ""),
                this._onclick != null && this._onclick()
            };
            if (this.b_opts[a].tooltip) c.title = this.b_opts[a].tooltip;
            this.p_controls.appendChild(c);
            this.buttons[a] = c;
            c = null;
            if (a == "upload" || a == "clear") this.buttons[a].style.display = this.conf.buttons[a] == !0 ? "": "none";
            this.b_opts[a].onclick = null;
            this.b_opts[a] = null;
            delete this.b_opts[a]
        }
        this.b_opts = null;
        delete this.b_opts;
        this.buttons.cancel.style.display = "none"
    };
    this._readableSize = function(a) {
        for (var b = !1, c = "b,Kb,Mb,Gb,Tb,Pb,Eb".split(","), 
        d = 0; d < c.length; d++) a > 1024 ? a /= 1024: b === !1 && (b = d);
        b === !1 && (b = c.length - 1);
        return Math.round(a * 100) / 100 + " " + c[b]
    };
    this._beforeAddFileToList = function(a, b) {
        return this.callEvent("onBeforeFileAdd", [{
            id: null,
            name: a,
            size: b,
            serverName: null,
            uploaded: !1
        }]) === !0
    };
    this._addFileToList = function(a, b, c, d, e) {
        var i = this.getFileExtension(b),
        f = i.length > 0 ? this.conf.icons[i.toLowerCase()] || this.conf.icon_def: this.conf.icon_def,
        h = document.createElement("DIV");
        this.p_files.appendChild(h);
        this.file_items[a] = h;
        h._idd = a;
        this.list.renderFileRecord(h, 
        {
            name: b,
            icon: f,
            size: c,
            readableSize: this._readableSize(c || 0),
            state: d,
            progress: e
        });
        this.callEvent("onFileAdd", [{
            id: a,
            name: b,
            size: c,
            serverName: null,
            uploaded: !1
        }]);
        h = null
    };
    this._removeFileFromList = function(a) {
        if (this.file_items[a]) this.list.removeFileRecord(this.file_items[a]),
        this.file_items[a]._idd = null,
        this.file_items[a].parentNode.removeChild(this.file_items[a]),
        this.file_items[a] = null,
        delete this.file_items[a],
        this.conf.uploaded_files[a] && (this.conf.uploaded_files[a] = null, delete this.conf.uploaded_files[a]),
        this.conf.uploaded_state[a] && (this.conf.uploaded_state[a] = null, delete this.conf.uploaded_state[a])
    };
    this._updateFileInList = function(a, b, c) {
        this.file_items[a] && (b == "uploading" && this.conf.progress_mode == "eta" && this._etaStart != null && this._etaStart(a), this._updateProgress(a, b, c))
    };
    this._updateProgress = function(a, c, d) {
        if (c == "added") 
            this.list.updateFileState(this.file_items[a], {state: c}),
            this.conf.progress_mode == "eta" && this._etaEnd != null && this._etaEnd(a);
        else if (c == "fail") 
        	this.list.updateFileState(this.file_items[a], {state: c, str_error: this.strings.error}),
        	this.conf.progress_mode == "eta" && this._etaEnd != null && this._etaEnd(a);
        else if (c == "uploaded") {
            this.conf.progress_mode == "eta" && this._etaEnd != null && this._etaEnd(a);
            var e = this.file_items[a],
            j = this.strings.done,
            f = this.conf.engine != "html4" ? null: {
                name: this.file_data[a].name,
                size: this.file_data[a].size,
                readableSize: this._readableSize(this.file_data[a].size || 0)
            };
            window.setTimeout(function() {
                f != null && b.list.updateFileNameSize(e, f);
                b.list.updateFileState(e, {state: "uploaded", str_done: j});
                e = null
            },100)
        } else if (c == "uploading") 
	        if (d < 100 && this.conf.progress_type == "loader") this.list.updateFileState(this.file_items[a], {state: "uploading_html4" });
		    else if (this.conf.progress_mode == "eta") {
		        var g = this._etaCheck != null ? this._etaCheck(a, d) : null;
		        this.list.updateFileState(this.file_items[a], {
		            state: "uploading",
		            progress: d,
		            eta: g == null ? null: "eta: " + g
		        })
		    } 
		    else 
		        this.conf.progress_mode == "percent" && this.list.updateFileState(this.file_items[a], {
		        state: "uploading",
		        progress: d,
		        eta: d + "%"
		    })
    };
    this._removeFilesByState = function(a) {
        for (var b in this.file_data)(a === !0 || this.file_data[b].state == a) && this._removeFileFromQueue(b)
    };
    this._switchButton = function(a) {
        if (a == !0) {
            if (this.conf.buttons.upload == !0) this.buttons.upload.style.display = "none",
            this.buttons.cancel.style.display = ""
        } else {
            var b = this.conf.uploaded_count,c = [],d;
            for (d in this.conf.uploaded_state) c.push({
                id: d,
                name: this._fileName,
                size: this.file_data[d] != null ? this.file_data[d].size: null,
                serverName: this.conf.uploaded_files[d] ? this.conf.uploaded_files[d].serverName: 
                null,
                uploaded: this.conf.uploaded_state[d]
            });
            if (this.conf.buttons.upload == !0) this.buttons.upload.style.display = "",this.buttons.cancel.style.display = "none";
            this.conf.uploaded_count = 0;
            this.conf.uploaded_state = {};
            b > 0 && this.callEvent("onUploadComplete", [c])
        }
    };
    this._uploadStart = function() {
        this._switchButton(!0);
        if (!this.conf.uploading) for (var a in this.file_data) if (this.file_data[a].state == "fail") this.file_data[a].state = "added",
        this._updateFileInList(a, "added", 0);
        this.conf.uploading = !0;
        var b = !1;
        for (a in this.file_data) if (!b && 
        [this.file_data[a].state] == "added") b = !0,
        this.file_data[a].state = "uploading",
        this._updateFileInList(a, "uploading", 0),
        this._doUploadFile(a);
        if (!b) this.conf.uploading = !1,
        this._switchButton(!1)
    };
    this._onUploadSuccess = function (a, b, c, d) {
        if (typeof c != "undefined" && this.conf.engine == "flash") {
            var e = null;
            try {
                eval("e=" + c.data)
            } catch (f) { }
            if (e != null && e.state == !0 && e.name != null) {
                if (b = e.name, e.extra != null) d = e.extra
            } else {
                this._onUploadFail(a, e != null && e.extra != null ? e.extra : null);
                return
            }
        }
        this.conf.uploaded_count++;
        this.conf.uploaded_files[a] =
        {
            realName: this.file_data[a].name,
            serverName: b
        };
        this.file_data[a].state = "uploaded";
        this.conf.uploaded_state[a] = !0;
        this._updateFileInList(a, "uploaded", 100);
        this.callEvent("onUploadFile", [{
            id: a,
            name: this.file_data[a].name,
            size: this.file_data[a].size,
            serverName: b,
            uploaded: !0
        }, d]);
        this.conf.auto_remove && this._removeFileFromQueue(a);
        this.conf.uploading && this._uploadStart()
    };
    this._onUploadFail = function(a, b) {
        this.file_data[a].state = "fail";
        this._updateFileInList(a, "fail", 0);
        this.conf.uploaded_state[a] = !1;
        this.callEvent("onUploadFail", [{
            id: a,
            name: this.file_data[a].name,
            size: this.file_data[a].size,
            serverName: null,
            uploaded: !1
        },
        b]);
        this.conf.uploading && this._uploadStart()
    };
    this._onUploadAbort = function(a) {
        this.conf.uploading = !1;
        this.file_data[a].state = "added";
        this._updateFileInList(a, "added", 0);
        this.callEvent("onUploadCancel", [{
            id: a,
            name: this.file_data[a].name,
            size: this.file_data[a].size,
            serverName: null,
            uploaded: !1
        }])
    };
    this.unload = function() {
        this.detachAllEvents();
        this.eventCatcher = this.detachAllEvents = 
        this.detachEvent = this.checkEvent = this.attachEvent = null;
        this.callEvent = function() {
            return ! 0
        };
        typeof window.addEventListener == "function" ? this.p_files.removeEventListener("click", this._doOnFilesClick, !1) : this.p_files.detachEvent("onclick", this._doOnFilesClick);
        this._removeFilesByState(!0);
        this.file_items = this.file_data = this.conf.uploaded_files = null;
        this._unloadEngine();
        this.icons = this.list_default = this.list = null;
        for (var a in this.buttons) this.buttons[a].onclick = null,
        this.buttons[a].onmouseover = null,
        this.buttons[a].onmouseout = 
        null,
        this.buttons[a].onmousedown = null,
        this.buttons[a].onmouseup = null,
        this.buttons[a]._onclick = null,
        this.buttons[a].parentNode.removeChild(this.buttons[a]),
        this.buttons[a] = null,
        delete this.buttons[a];
        this.buttons = null;
        this.p_controls.onselectstart = null;
        this.p_controls.parentNode.removeChild(this.p_controls);
        this.p_controls = null;
        this.p_files.parentNode.removeChild(this.p_files);
        this.setSLURL = this.getSLVersion = this.setSWFURL = this.setWidth = this.setStrings = this.setSkin = this.setSizes = this.setHeight = this.setFilesLimit = 
        this.getFileExtension = this.unload = this.clear = this.getMaxFileSize = this.getData = this.getStatus = this.disable = this.enable = this.setURL = this.setTitleText = this.setAutoRemove = this.setAutoStart = this.upload = this.callEvent = this._skinDetect = this._doOnFilesClick = this._onUploadAbort = this._onUploadFail = this._onUploadSuccess = this._uploadStart = this._switchButton = this._removeFilesByState = this._updateFileInList = this._removeFileFromList = this._updateProgress = this._beforeAddFileToList = this._addFileInput = this._addFileToList = 
        this._readableSize = this._initToolbar = this.callEvent = this.p_files = null;
        for (a in this.conf) this.conf[a] = null,
        delete this.conf[a];
        this.strings = this.conf = null;
        this.base._attach_mode != !0 && this.base.parentNode.removeChild(this.base);
        b = a = this.base = null
    };
    var g = new this[this.conf.engine];
    for (c in g) this[c] = g[c],g[c] = null;
    c = g = p = null;
    this._initToolbar();
    this._initEngine();
    this.setSkin(this.conf.skin);
    dhtmlxEventable(this);
    this.attachEvent("onFileAdd", function() {
        this.conf.files_added++;
        if(this.conf.files_added >= this.conf.files_limit) this.buttons.browse.style.display = "none";
    });
    this.attachEvent("onBeforeFileAdd", function() {
        return this.conf.files_limit == 0 ? !0: this.conf.files_added < this.conf.files_limit
    });
    this.attachEvent("onFileRemove", function() {
        this.conf.files_added--;
        if(this.conf.files_added < this.conf.files_limit) this.buttons.browse.style.display = "";
    });
    dhtmlxAjax.post(this.conf.url, "mode=conf&etc=" + (new Date).getTime(), 
    function(a) {
        var c = null;
        try {
            eval("c=" + a.xmlDoc.responseText)
        } catch(d) {}
        if (c != null && c.maxFileSize != null) b.conf.max_file_size = parseInt(c.maxFileSize)
    });
    return this
}
dhtmlXVaultObject.prototype.icon_def = "icon_def";
dhtmlXVaultObject.prototype.icons = {
    icon_image: "jpg,jpeg,gif,png,bmp,tiff,pcx,svg,ico".split(","),
    icon_psd: ["psd"],
    icon_video: "avi,mpg,mpeg,rm,move,mov,mkv,flv,f4v,mp4,3gp".split(","),
    icon_audio: "wav,aiff,au,mp3,aac,wma,ogg,flac,ape,wv,m4a,mid,midi".split(","),
    icon_arch: "rar,zip,tar,tgz,arj,gzip,bzip2,7z,ace,apk,deb".split(","),
    icon_text: ["txt", "nfo", "djvu", "xml"],
    icon_html: ["htm", "html"],
    icon_doc: ["doc", "docx", "rtf", "odt"],
    icon_pdf: ["pdf", "ps"],
    icon_xls: ["xls", "xlsx", "xlsm"],
    icon_exe: ["exe"],
    icon_dmg: ["dmg"]
};
dhtmlXVaultObject.prototype.upload = function() {
    this.conf.uploading || this._uploadStart()
};
dhtmlXVaultObject.prototype.setAutoStart = function(a) {
    this.conf.auto_start = a == !0
};
dhtmlXVaultObject.prototype.setAutoRemove = function(a) {
    this.conf.auto_remove = a == !0
};
dhtmlXVaultObject.prototype.setURL = function(a) {
    this.conf.url = a
};
dhtmlXVaultObject.prototype.enable = function() {
    if (this.conf.enabled != !0 && (this.conf.enabled = !0, this.base.className = String(this.base.className).replace(/\s{0,}dhx_vault_dis/gi, ""), this.conf.engine == "flash")) document.getElementById(this.conf.swf_obj_id).style.display = ""
};
dhtmlXVaultObject.prototype.disable = function() {
    if (this.conf.enabled == !0 && (this.conf.enabled = !1, this.base.className += " dhx_vault_dis", this.conf.engine == "flash")) document.getElementById(this.conf.swf_obj_id).style.display = "none"
};
dhtmlXVaultObject.prototype.setWidth = function(a) {
    if (this.base._attach_mode != !0) this.base.parentNode.style.width = a + "px",
    this.setSizes()
};
dhtmlXVaultObject.prototype.setHeight = function(a) {
    if (this.base._attach_mode != !0) this.base.parentNode.style.height = a + "px",
    this.setSizes()
};
dhtmlXVaultObject.prototype.setFilesLimit = function(a) {
    this.conf.files_added = 0;
    this.conf.files_limit = a
};
dhtmlXVaultObject.prototype.getStatus = function() {
    var a = 0, b;
    for (b in this.file_data) {
        if (this.file_data[b].state != "uploaded") return - 1;
        a = 1
    }
    return a
};
dhtmlXVaultObject.prototype.getData = function() {
    var a = [],
    b;
    for (b in this.conf.uploaded_files) a.push({
        id: b,
        name: this.file_data[b].name,
        size: this.file_data[b].size,
        serverName: this.conf.uploaded_files[b].serverName,
        uploaded: !0
    });
    return a
};
dhtmlXVaultObject.prototype.clear = function() {
    this.callEvent("onBeforeClear", []) === !0 && (this.conf.uploading && this._uploadStop(), this._switchButton(!1), this._removeFilesByState(!0), this.callEvent("onClear", []))
};
dhtmlXVaultObject.prototype.setSkin = function(a) {
    if (a != this.conf.skin) this.base.className = String(this.base.className).replace(RegExp("s{0,}dhx_vault_" + this.conf.skin), " dhx_vault_" + a),
    this.conf.skin = a;
    var b = this.conf.ofs[this.conf.skin];
    this.buttons.browse.style.marginLeft = b + "px";
    this.buttons.upload.style.marginLeft = a == "dhx_terrace" ? "-1px": b + "px";
    this.buttons.cancel.style.marginLeft = this.buttons.upload.style.marginLeft;
    this.buttons.clear.style.marginRight = b + "px";
    var c = a != "dhx_terrace" || this.conf.buttons.upload == 
    !0 && a == "dhx_terrace" ? "0px": "5px";
    this.buttons.browse.style.borderTopRightRadius = c;
    this.buttons.browse.style.borderBottomRightRadius = c;
    this.buttons.upload.style.borderTopLeftRadius = c;
    this.buttons.upload.style.borderBottomLeftRadius = c;
    this.buttons.cancel.style.borderTopLeftRadius = this.buttons.upload.style.borderTopLeftRadius;
    this.buttons.cancel.style.borderBottomLeftRadius = this.buttons.upload.style.borderBottomLeftRadius;
    this.setSizes()
};
dhtmlXVaultObject.prototype.setSizes = function() {
    var a = this.base.offsetWidth - (this.base.clientWidth || this.base.scrollWidth),
    b = this.base.offsetHeight - this.base.clientHeight;
    this.base.style.width = Math.max(0, this.base.parentNode.offsetWidth - a) + "px";
    this.base.style.height = Math.max(0, this.base.parentNode.offsetHeight - b) + "px";
    var c = this.conf.ofs[this.conf.skin];
    this.p_files.style.top = this.p_controls.offsetHeight + c + "px";
    this.p_files.style.left = c + "px";
    if (!this.conf.ofs_f) this.p_files.style.width = "100px",
    this.p_files.style.height = "100px",
    this.conf.ofs_f = {
        w: this.p_files.offsetWidth - this.p_files.clientWidth,
        h: this.p_files.offsetHeight - this.p_files.clientHeight
    };
    this.p_files.style.width = Math.max(this.base.clientWidth - c * 2 - this.conf.ofs_f.w, 0) + "px";
    this.p_files.style.height = Math.max(this.base.clientHeight - this.p_controls.offsetHeight - c * 2 - this.conf.ofs_f.h - (this.remark?this.remark.offsetHeight:0), 0) + "px"
    if(this.remark)this.remark.style.top = (this.p_controls.offsetHeight + c + this.p_files.offsetHeight + 1) + "px", this.remark.style.left= c + "px";
};
dhtmlXVaultObject.prototype.getFileExtension = function(a) {
    var b = "",
    c = String(a).match(/\.([^\.\s]*)$/i);
    c != null && (b = c[1]);
    return b
};
dhtmlXVaultObject.prototype.strings = {
    done: "Done",
    btnAdd: "Add files",
    btnUpload: "Upload",
    btnClean: "Clear all",
    btnCancel: "Cancel"
};
dhtmlXVaultObject.prototype.setStrings = function(a) {
    for (var b in a) this.strings[b] = a[b];
    for (b in this.file_items) {
        var c = this.file_data[b].state; (c == "uploaded" || c == "fail") && this.list.updateFileState(this.file_items[b], {
            state: c,
            str_error: this.strings.error,
            str_done: this.strings.done
        })
    }
    var d = {
        browse: "btnAdd",
        upload: "btnUpload",
        clear: "btnClean",
        cancel: "btnCancel"
    };
    for (b in d) this.buttons[b].firstChild.firstChild.firstChild.childNodes[2].innerHTML = this.strings[d[b]]
};
dhtmlXVaultObject.prototype.getMaxFileSize = function() {
    return this.conf.max_file_size
};
dhtmlXVaultObject.prototype._skinDetect = function() {
    var a = document.createElement("DIV");
    a.className = "dhx_vault_skin_detect";
    document.body.firstChild ? document.body.insertBefore(a, document.body.firstChild) : document.body.appendChild(a);
    var b = a.offsetWidth;
    a.parentNode.removeChild(a);
    a = null;
    return {
        10: "dhx_skyblue",
        20: "dhx_web",
        30: "dhx_terrace",
        110: "bootstrap"
    } [b] || null
};
dhtmlXVaultObject.prototype.html5 = function() {};
dhtmlXVaultObject.prototype.html5.prototype = {
    _initEngine: function() {
        var a = this;
        this.buttons.browse.onclick = function() {
            a.conf.enabled && a.f.click()
        };
        this.conf.progress_type = "percentage";
        this.conf.multiple_files = !0;
        this.conf.dnd_enabled = !0;
        var b = window.navigator.userAgent,
        c = !0;
        if (b.match(/Windows/gi) != null && b.match(/AppleWebKit/gi) != null && b.match(/Safari/gi) != null) {
            if (b.match(/Version\/5\.1\.5/gi)) this.conf.multiple_files = !1;
            if (b.match(/Version\/5\.1[^\.\d{1,}]/gi)) this.conf.dnd_enabled = !1;
            if (b.match(/Version\/5\.1\.1/gi)) this.conf.multiple_files = 
            !1,
            this.conf.dnd_enabled = !1;
            if (b.match(/Version\/5\.1\.2/gi)) this.conf.dnd_enabled = !1;
            if (b.match(/Version\/5\.1\.7/gi)) this._upload_mp = !1
        }
        this._addFileInput();
        this.conf.dnd_enabled && this._initDND != null && this._initDND()
    },
    _addFileInput: function() {
        if (this.f != null) this.f.onchange = null,
        this.f.parentNode.removeChild(this.f),
        this.f = null;
        var a = this;
        this.f = document.createElement("INPUT");
        this.f.type = "file";
        if (this.conf.multiple_files) this.f.multiple = "1";
        this.f.className = "dhx_vault_input";
        this.p_controls.appendChild(this.f);
        this.f.onchange = function() {
            a._parseFilesInInput(this.files);
            _isOpera && a._addFileInput()
        }
    },
    _doUploadFile: function(a) {
        var b = this;
        if (!this.loader) this.loader = new XMLHttpRequest,
        this.loader.upload.onprogress = function(a) {
            b.file_data[this._idd].state == "uploading" && b._updateFileInList(this._idd, "uploading", Math.round(a.loaded * 100 / a.total))
        },
        this.loader.onload = function() {
            var a = null;
            try {
                eval("a=" + this.responseText)
            } catch(c) {}
            a != null && typeof a == "object" && typeof a.state != "undefined" && a.state == !0 ? (b._onUploadSuccess(this.upload._idd, 
            a.name, null, a.extra), a = null) : b._onUploadFail(this.upload._idd, a != null && a.extra != null ? a.extra: null)
        },
        this.loader.onerror = function() {
            b._onUploadFail(this.upload._idd)
        },
        this.loader.onabort = function() {
            b._onUploadAbort(this.upload._idd)
        };
        this.loader.upload._idd = a;
        if (this.file_data[a].size == 0 && (navigator.userAgent.indexOf("MSIE") > 0 || navigator.userAgent.indexOf("Trident") > 0)) {
            var c = new FormData;
            c.append("file_name", String(this.file_data[a].name));
            c.append("zero_size", "1")
        } else c = new FormData,
        c.append("file", 
        this.file_data[a].file);
        this.loader.open("POST", this.conf.url + (String(this.conf.url).indexOf("?") < 0 ? "?": "&") + "mode=html5&" + (new Date).getTime(), !0);
        this.loader.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        this.loader.send(c)
    },
    _uploadStop: function() {
        this.conf.uploading && this.loader && this.loader.abort()
    },
    _parseFilesInInput: function(a) {
        for (var b = 0; b < a.length; b++) this._addFileToQueue(a[b])
    },
    _addFileToQueue: function(a) {
        if (this._beforeAddFileToList(a.name, a.size)) {
            var b = a._idd || this.conf.idd++;
            this.file_data[b] = {
                file: a,
                name: a.name,
                size: a.size,
                state: "added"
            };
            this._addFileToList(b, a.name, a.size, "added", 0);
            this.conf.auto_start && !this.conf.uploading && this._uploadStart(!0)
        }
    },
    _removeFileFromQueue: function(a) {
        if (this.file_data[a]) {
            var b = this.file_data[a].name,
            c = this.conf.uploaded_files != null && this.conf.uploaded_files[a] != null ? this.conf.uploaded_files[a].serverName: null,
            d = {
                id: Number(a),
                name: b,
                size: this.file_data[a].size,
                serverName: c,
                uploaded: this.file_data[a].state == "uploaded"
            };
            if (this.callEvent("onBeforeFileRemove", [d]) === !0) {
                var e = !1;
                this.conf.uploading && a == this.loader.upload._idd && this.file_data[a].state == "uploading" && (this._uploadStop(), e = !0);
                this.file_data[a].file = null;
                this.file_data[a].name = null;
                this.file_data[a].size = null;
                this.file_data[a].state = null;
                this.file_data[a] = null;
                delete this.file_data[a];
                this._removeFileFromList(a);
                this.callEvent("onFileRemove", [d]);
                e && this._uploadStart()
            }
        }
    },
    _unloadEngine: function() {
        this.buttons.browse.onclick = null;
        this.conf.dnd_enabled && this._unloadDND != null && this._unloadDND();
        this.f.onchange = null;
        this.f.parentNode.removeChild(this.f);
        this.f = null;
        if (this.loader) this.loader.upload.onprogress = null,
        this.loader.onload = null,
        this.loader.onerror = null,
        this.loader.onabort = null,
        this.loader = this.loader.upload._idd = null;
        this._unloadEngine = this._removeFileFromQueue = this._addFileToQueue = this._parseFilesInInput = this._uploadStop = this._doUploadFile = this._initEngine = null
    }
};
dhtmlXVaultObject.prototype.html4 = function() {};
dhtmlXVaultObject.prototype.html4.prototype = {
    _initEngine: function() {
        this._addForm();
        this.conf.progress_type = "loader"
    },
    _addForm: function() {
        var a = this,
        b = this.conf.idd++;
        if (!this.k) this.k = document.createElement("DIV"),
        this.k.className = "dhx_vault_file_form_cont",
        this.buttons.browse.appendChild(this.k),
        this.conf.fr_name = "dhx_vault_file_" + (new Date).getTime(),
        this.k.innerHTML = '<iframe name="' + this.conf.fr_name + '" style="height:0px;width:0px;" frameBorder="0"></iframe>',
        this.fr = this.k.firstChild,
        window.navigator.userAgent.indexOf("MSIE") >= 
        0 ? this.fr.onreadystatechange = function() {
            this.readyState == "complete" && a._onLoad()
        }: this.fr.onload = function() {
            a._onLoad()
        };
        var c = document.createElement("DIV");
        c.innerHTML = "<form method='POST' enctype='multipart/form-data' target='" + this.conf.fr_name + "' class='dhx_vault_file_form' name='dhx_vault_file_form_" + (new Date).getTime() + "'><input type='hidden' name='mode' value='html4'><input type='hidden' name='uid' value='" + b + "'><input type='file' name='file' class='dhx_vault_file_input'></form>";
        this.k.appendChild(c);
        c.firstChild.lastChild._idd = b;
        c.firstChild.lastChild.onchange = function() {
            var b = this.value.match(/[^\/\\]*$/)[0];
            if (a._beforeAddFileToList(b, null)) a._addFileToQueue(this),
            this.onchange = null,
            this.parentNode.parentNode.style.display = "none",
            a._addForm()
        };
        c = null
    },
    _onLoad: function() {
        if (this.conf.uploading) {
            var a = null;
            try {
                eval("a=" + this.fr.contentWindow.document.body.innerHTML)
            } catch(b) {}
            if (a != null && typeof a.state != "undefined") if (a.state == "cancelled") {
                this._onUploadAbort(this.fr._idd);
                this.fr.contentWindow.document.body.innerHTML = 
                "";
                a = null;
                return
            } else if (a.state == !0) {
                if (typeof a.size != "undefined" && !isNaN(a.size)) this.file_data[this.fr._idd].size = a.size;
                this._onUploadSuccess(this.fr._idd, a.name, null, a.extra);
                a = null;
                return
            }
            this._onUploadFail(this.fr._idd, a != null && a.extra != null ? a.extra: null)
        }
    },
    _addFileToQueue: function(a) {
        var b = a.value.match(/[^\\\/]*$/),
        b = b[0] != null ? b[0] : a.value;
        this.file_data[a._idd] = {
            name: b,
            form: a.parentNode,
            node: a.parentNode.parentNode,
            input: a,
            state: "added"
        };
        this._addFileToList(a._idd, b, !1, "added", 0);
        this.conf.auto_start && 
        !this.conf.uploading && this._uploadStart(!0)
    },
    _removeFileFromQueue: function(a) {
        var b = this.file_data[a].name,
        c = this.conf.uploaded_files != null && this.conf.uploaded_files[a] != null ? this.conf.uploaded_files[a].serverName: null,
        d = {
            id: Number(a),
            name: b,
            size: this.file_data[a].size || null,
            serverName: c,
            uploaded: this.file_data[a].state == "uploaded"
        };
        if (this.callEvent("onBeforeFileRemove", [d]) === !0) this.file_data[a].input.onchange = null,
        this.file_data[a].form.removeChild(this.file_data[a].input),
        this.file_data[a].node.removeChild(this.file_data[a].form),
        this.file_data[a].node.parentNode.removeChild(this.file_data[a].node),
        this.file_data[a].input = null,
        this.file_data[a].name = null,
        this.file_data[a].form = null,
        this.file_data[a].node = null,
        this.file_data[a].size = null,
        this.file_data[a].state = null,
        this.file_data[a] = null,
        delete this.file_data[a],
        this._removeFileFromList(a),
        this.callEvent("onFileRemove", [d])
    },
    _doUploadFile: function(a) {
        this.fr._idd = a;
        this.file_data[a].form.action = this.conf.url;
        this.file_data[a].form.submit()
    },
    _uploadStop: function() {
        if (this.conf.uploading) this._onUploadAbort(this.fr._idd),
        this.fr.contentWindow.location.href = this.conf.url + (this.conf.url.indexOf("?") < 0 ? "?": "&") + "mode=html4&action=cancel&etc=" + (new Date).getTime()
    },
    _unloadEngine: function() {
        if (this.k) this.conf.fr_name = null,
        this.fr.onreadystatechange = null,
        this.fr.onload = null,
        this.fr.parentNode.removeChild(this.fr),
        this.fr = null,
        this.k.firstChild.firstChild.lastChild.onchange = null,
        this.k.parentNode.removeChild(this.k),
        this.k = null;
        this._unloadEngine = this._uploadStop = this._doUploadFile = this._removeFileFromQueue = this._addFileToQueue = 
        this._onLoad = this._addForm = this._initEngine = null
    }
};
dhtmlXVaultObject.prototype.flash = function() {};
dhtmlXVaultObject.prototype.flash.prototype = {
    _initEngine: function () {
        if (!window.dhtmlXVaultSWFObjects) window.dhtmlXVaultSWFObjects = {
            items: {},
            uid: function () {
                this.id ? this.id++ : this.id = (new Date).getTime();
                return this.id
            },
            callEvent: function (a, b, e) {
                return window.dhtmlXVaultSWFObjects.items[a].uploader[b].apply(window.dhtmlXVaultSWFObjects.items[a].uploader, e)
            }
        };
        var a = this;
        this.conf.swf_obj_id = "dhxVaultSWFObject_" + window.dhtmlXVaultSWFObjects.uid();
        this.conf.swf_file = this.conf.swf_file + (this.conf.swf_file.indexOf("?") >= 0 ? "&" : "?") + "etc=" + (new Date).getTime();
        if (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0) this.buttons.browse.innerHTML += "<div style='position:absolute;width:100%;height:100%;background-color:white;opacity:0;filter:alpha(opacity=0);left:0px;top:0px;'></div>";
        this.buttons.browse.innerHTML += "<div class='dhx_vault_flash_obj'><div id='" + this.conf.swf_obj_id + "'></div></div>";
        swfobject.embedSWF(this.conf.swf_file, this.conf.swf_obj_id, "100%", "100%", "9", null, {
            ID: this.conf.swf_obj_id,
            enableLogs: this.conf.swf_logs,
            GVar: "dhtmlXVaultSWFObjects"
        },
        {
            wmode: "transparent"
        });
        var b = swfobject.getFlashPlayerVersion();
        this.conf.progress_type = "percentage";
        window.dhtmlXVaultSWFObjects.items[this.conf.swf_obj_id] = {
            id: this.conf.swf_obj_id,
            uploader: this
        }
    },
    _beforeAddFileToQueue: function (a, b) {
        return this.callEvent("onBeforeFileAdd", [{
            id: null,
            name: a,
            size: b,
            serverName: null,
            uploaded: !1
        }]) === !0
    },
    _addFileToQueue: function (a, b, c) {
        if (_isIE) {
            var d = document.createElement("INPUT");
            d.type = "TEXT";
            d.style.position =
            "absolute";
            d.style.left = "0px";
            d.style.top = getAbsoluteTop(this.buttons.browse) + "px";
            d.style.width = "10px";
            document.body.appendChild(d);
            d.focus();
            document.body.removeChild(d);
            d = null
        }
        this.file_data[a] = {
            name: b,
            size: c,
            state: "added"
        };
        this._addFileToList(a, b, c, "added", 0);
        this.conf.auto_start && !this.conf.uploading && this._uploadStart(!0)
    },
    _removeFileFromQueue: function (a) {
        if (this.file_data[a]) {
            var b = this.file_data[a].name,
            c = this.conf.uploaded_files != null && this.conf.uploaded_files[a] != null ? this.conf.uploaded_files[a].serverName :
            null,
            d = {
                id: Number(a),
                name: b,
                size: this.file_data[a].size,
                serverName: c,
                uploaded: this.file_data[a].state == "uploaded"
            };
            if (this.callEvent("onBeforeFileRemove", [d]) === !0) {
                var e = !1;
                this.conf.uploading && this.file_data[a].state == "uploading" && (this._uploadStop(), e = !0);
                if (swfobject.getObjectById(this.conf.swf_obj_id).removeFileById)
                    swfobject.getObjectById(this.conf.swf_obj_id).removeFileById(a);
                this.file_data[a].name = null;
                this.file_data[a].size = null;
                this.file_data[a].state = null;
                this.file_data[a] = null;
                delete this.file_data[a];
                this._removeFileFromList(a);
                this.callEvent("onFileRemove", [d]);
                e && this._uploadStart()
            }
        }
    },
    _doUploadFile: function (a) {
        swfobject.getObjectById(this.conf.swf_obj_id).upload(a, this.conf.swf_url)
    },
    _uploadStop: function () {
        for (var a in this.file_data) this.file_data[a].state == "uploading" && swfobject.getObjectById(this.conf.swf_obj_id).uploadStop(a)
    },
    _unloadEngine: function () {
        if (window.dhtmlXVaultSWFObjects.items[this.conf.swf_obj_id]) window.dhtmlXVaultSWFObjects.items[this.conf.swf_obj_id].id = null,
        window.dhtmlXVaultSWFObjects.items[this.conf.swf_obj_id].uploader = null,
        window.dhtmlXVaultSWFObjects.items[this.conf.swf_obj_id] = null,
        delete window.dhtmlXVaultSWFObjects.items[this.conf.swf_obj_id];
        this._unloadEngine = this._uploadStop = this._doUploadFile = this._removeFileFromQueue = this._addFileToQueue = this._initEngine = this.conf.swf_obj_id = null
    }
};
dhtmlXVaultObject.prototype.setSWFURL = function(a) {
    this.conf.swf_url = a
};
dhtmlXVaultObject.prototype.sl = function() {};
dhtmlXVaultObject.prototype.sl.prototype = {
    _initEngine: function() {
        if (typeof this.conf.sl_v == "undefined") this.conf.sl_v = this.getSLVersion();
        if (!window.dhtmlXVaultSLObjects) window.dhtmlXVaultSLObjects = {
            items: {},
            uid: function() {
                this.id ? this.id++:this.id = (new Date).getTime();
                return this.id
            },
            callEvent: function(a, b, c) {
                window.dhtmlXVaultSLObjects.items[a].uploader[b].apply(window.dhtmlXVaultSLObjects.items[a].uploader, c)
            }
        };
        this.conf.sl_obj_id = "dhtmlXFileUploaderSLObject_" + window.dhtmlXVaultSLObjects.uid();
        this.conf.sl_v != !1 ? this.buttons.browse.innerHTML += '<div style="width:100%;height:100%;left:0px;top:0px;position:absolute;"><object data="data:application/x-silverlight-2," type="application/x-silverlight-2" width="100%" height="100%" id="' + this.conf.sl_obj_id + '"><param name="source" value="' + this.conf.sl_xap + '"/><param name="background" value="Transparent"/><param name="windowless" value="true"/><param name="initParams" value="SLID=' + this.conf.sl_obj_id + ",LOGS=" + this.conf.sl_logs + ',GVAR=dhtmlXVaultSLObjects"/><param name="minRuntimeVersion" value="5.0"/></object></div>': 
        (this.buttons.browse.style.cursor = "wait", this.buttons.browse.title = "");
        this.conf.progress_type = "percentage";
        window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id] = {
            id: this.conf.sl_obj_id,
            uploader: this
        }
    },
    _addFileToQueue: function(a, b, c) {
        this.file_data[a] = {
            name: b,
            size: c,
            state: "added"
        };
        this._addFileToList(a, b, c, "added", 0);
        this.conf.auto_start && !this.conf.uploading && this._uploadStart(!0)
    },
    _removeFileFromQueue: function(a) {
        if (this.file_data[a]) {
            var b = !1;
            this.conf.uploading && this.file_data[a].state == "uploading" && 
            (this._uploadStop(), b = !0);
            document.getElementById([this.conf.sl_obj_id]).Content.a.removeFileById(a);
            this.file_data[a].name = null;
            this.file_data[a].size = null;
            this.file_data[a].state = null;
            this.file_data[a] = null;
            delete this.file_data[a];
            this._removeFileFromList(a);
            b && this._uploadStart()
        }
    },
    _doUploadFile: function(a) {
        document.getElementById(this.conf.sl_obj_id).Content.a.upload(a, this.conf.sl_url, "&mode=sl&etc=" + (new Date).getTime())
    },
    _uploadStop: function() {
        this.conf.uploading = !1;
        for (var a in this.file_data) this.file_data[a].state == 
        "uploading" && document.getElementById(this.conf.sl_obj_id).Content.a.uploadStop(a)
    },
    _unloadEngine: function() {
        if (window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id]) window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id].id = null,
        window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id].uploader = null,
        window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id] = null,
        delete window.dhtmlXVaultSLObjects.items[this.conf.sl_obj_id];
        this._unloadEngine = this._uploadStop = this._doUploadFile = this._removeFileFromQueue = 
        this._addFileToQueue = this._initEngine = this.conf.sl_obj_id = null
    }
};
dhtmlXVaultObject.prototype.setSLURL = function(a) {
    this.conf.sl_url = a
};
dhtmlXVaultObject.prototype.getSLVersion = function() {
    var a = !1;
    if (_isIE) try {
        var b = new ActiveXObject("AgControl.AgControl");
        if (b != null) for (var c = 4, d = 0; b.isVersionSupported([c, d].join("."));) a = [c, d],
        ++d > 9 && (c++, d = 0);
        b = null
    } catch(e) {} else navigator.plugins["Silverlight Plug-In"] != null && (a = navigator.plugins["Silverlight Plug-In"].description.split("."));
    return a
};
dhtmlXVaultObject.prototype.list_default = {
    config : null,
    renderFileRecord: function(a, b) {
        a.className = "dhx_vault_file dhx_vault_file_" + b.state;
        a.innerHTML = "<div class='dhx_vault_file_param dhx_vault_file_name'>&nbsp;</div><div class='dhx_vault_file_param dhx_vault_file_progress'>&nbsp;</div><div class='dhx_vault_file_param dhx_vault_file_delete'>&nbsp;</div><div class='dhx_vault_file_icon dhx_vault_" + b.icon + "'><div class='dhx_vault_all_icons'></div></div>";
        a.childNodes[2]._action = {
            id: a._idd,
            data: "delete_file"
        };
        this.updateFileNameSize(a, b);
        a = null
    },
    removeFileRecord: function(a) {
        a = a.childNodes[2]._action = null
    },
    updateFileNameSize: function(a, b) {
        a.childNodes[0].innerHTML = "<div class='dhx_vault_file_name_text'>" + b.name + (!isNaN(b.size) && b.size !== !1 ? " (" + b.readableSize + ")": "&nbsp;") + "</div>";
        a.childNodes[0].title = b.name + (!isNaN(b.size) && b.size !== !1 ? " (" + b.readableSize + ")": "");
        a.childNodes[0].linkName = b.name;
        a.childNodes[0].linkSize = (!isNaN(b.size) && b.size !== !1 ? " (" + b.readableSize + ")": "&nbsp;");
        a = null
    },
    updateFileState: function(a, b) {
        var c = !1;
        this.updateFileStateExtra != null && (c = this.updateFileStateExtra(a, b));
        if (!c) {
            if (b.state == "added") 
		            a.className = "dhx_vault_file dhx_vault_file_added",
		            a.childNodes[1].className = "dhx_vault_file_param dhx_vault_file_progress",
		            a.childNodes[1].innerHTML = "&nbsp;";
            if (b.state == "fail") 
		            a.className = "dhx_vault_file dhx_vault_file_fail",
		            a.childNodes[1].className = "dhx_vault_file_param dhx_vault_file_progress",
		            a.childNodes[1].innerHTML = b.str_error;
            if (b.state == "uploaded"){
                a.className = "dhx_vault_file dhx_vault_file_uploaded",
                a.childNodes[1].className = "dhx_vault_file_param dhx_vault_file_progress",
                a.childNodes[1].innerHTML = b.str_done;
	              var servername = this.config.uploaded_files != null && this.config.uploaded_files[a._idd] != null ? this.config.uploaded_files[a._idd].serverName: "",
        				fileDisName = "<a href='" + this.config.get_url + servername + "' target='_blank'>" + a.childNodes[0].linkName + "</a>";
        				a.childNodes[0].innerHTML = "<div class='dhx_vault_file_name_text'>" + fileDisName + a.childNodes[0].linkSize + "</div>";
	          }
            if (b.state == "uploading_html4" || b.state == "uploading") 
		            a.className = "dhx_vault_file dhx_vault_file_uploading",
		            a.childNodes[1].className = "dhx_vault_file_param dhx_vault_file_uploading",
		            a.childNodes[1].innerHTML = "<div class='dhx_vault_progress'><div class='dhx_vault_progress_loader'>&nbsp;</div></div>"
        }
        a = null
    },
    updateStrings: function() {}
};
if (window.dhtmlXContainer) {
    if (!dhtmlx.attaches) dhtmlx.attaches = {};
    dhtmlx.attaches.attachVault || (dhtmlx.attaches.attachVault = function(a) {
        var b = document.createElement("DIV");
        b.id = "dhxVaultObj_" + this._genStr(12);
        b.style.position = "relative";
        b.style.width = "100%";
        b.style.height = "100%";
        b.style.overflow = "hidden";
        b.cmp = "vault";
        b._attach_mode = !0;
        if (this.skin == "dhx_skyblue" && (this._isCell || this._isTabbarCell || this._isAcc)) b._no_border = !0;
        if (this.skin == "dhx_web" && (this._isCell || this._isTabbarCell || this._isAcc)) b._no_border = 
        !0;
        if (this.skin == "dhx_terrace" && (this._isWindow || this._isCell || this._isTabbarCell || this._isAcc)) b._no_border = !0;
        this.attachObject(b, !1, !0, !1);
        a || (a = {});
        a.container = b.id;
        if (typeof a.skin == "undefined") a.skin = this.skin;
        this.vs[this.av].sched = new dhtmlXVaultObject(a);
        this.vs[this.av].schedObj = b;
        this.skin == "dhx_terrace" && (this.adjust(), this.updateNestedObjects());
        return this.vs[this._viewRestore()].sched
    });
    if (!dhtmlx.detaches) dhtmlx.detaches = {};
    dhtmlx.detaches.detachVault || (dhtmlx.detaches.detachVault = 
    function(a) {
        if (a.sched) a.sched.unload(),
        a.sched = null,
        a.schedObj = null
    })
};

dhtmlXVaultObject.prototype.setProgressMode=function(a){this.kZ.progress_mode=a};dhtmlXVaultObject.prototype.list_default.updateFileStateExtra=function(a,b){if(b.state=="uploading")a.className="dhx_vault_file dhx_vault_file_uploading",a.childNodes[1].className="dhx_vault_file_param dhx_vault_file_progress",a.childNodes[1].innerHTML="<div class='dhx_vault_progress'><div class='dhx_vault_progress_bg' style='width:"+b.progress+"%;'>&nbsp;</div></div>"+(b.eta!=null?"<span class='progress_eta'>"+b.eta+"</span>":"");a=null;return b.state=="uploading"};dhtmlXVaultObject.prototype._etaStart=function(a){if(typeof this.kZ.files_time=="undefined")this.kZ.files_time={};this.kZ.files_time[a]==null&&(this.kZ.files_time[a]={start:(new Date).getTime(),end:0,size:this.file_data[a].size})};dhtmlXVaultObject.prototype._etaCheck=function(a,b){var e=null;if(this.kZ.files_time[a]!=null&&b>0){var c=((new Date).getTime()-this.kZ.files_time[a].start)/1E3,f=(c*100/b-c).toFixed(0),d=(new Date).getTime();if((this.kZ.files_time[a].time_upd==null||this.kZ.files_time[a].time_upd+1100<d)&&this.kZ.files_time[a].start+3E3<d)this.kZ.files_time[a].time_left=Math.max(1,f),this.kZ.files_time[a].time_upd=d;this.kZ.files_time[a].time_left!=null&&(e=this._timeHIS(this.kZ.files_time[a].time_left))}return e};dhtmlXVaultObject.prototype._etaEnd=function(a){this.kZ.files_time[a]=null;delete this.kZ.files_time[a]};dhtmlXVaultObject.prototype._timeHIS=function(a){for(var b=["h","m","s"],e=[],c=3600,f=0;f<3;f++){var d=Math.floor(a/c);a-=d*c;(d>0||e.length>0)&&e.push(String(d)+b[f]);c>1&&(c/=60)}return e.join(" ")};
dhtmlXVaultObject.prototype._initDND=function(){var b=this;this.dnd={};this._showDNDBox=function(){if(this.kZ.enabled&& !this.dnd.box)this.dnd.box=document.createElement("DIV"),this.dnd.box.className="dhx_vault_dnd_box",this.base.appendChild(this.dnd.box),this.p_files.className="dhx_vault_files dhx_vault_dnd_box_over",this.dnd.box.style.top=this.p_files.style.top,this.dnd.box.style.left=this.p_files.style.left,this.dnd.box.style.width=this.p_files.offsetWidth-(this.dnd.box.offsetWidth-this.dnd.box.clientWidth)+"px",this.dnd.box.style.height=this.p_files.offsetHeight-(this.dnd.box.offsetHeight-this.dnd.box.clientHeight)+"px",this.dnd.box.innerHTML="<div class='dhx_vault_dnd_box_text' style='margin-top:"+Math.round(this.dnd.box.offsetHeight/2-24)+"px;'>drop files here</div>",this.dnd.box.ondragenter=function(a){b.dnd.last_node=a.target;if(a.dataTransfer)a.dataTransfer.effectAllowed="copy",a.dataTransfer.dropEffect="copy",a.stopPropagation(),a.preventDefault()},this.dnd.box.ondragover=function(a){b.dnd.last_node=a.target;a.dataTransfer&&(a.stopPropagation(),a.preventDefault())},this.dnd.box.ondrop=function(a){a.dataTransfer&&(a.stopPropagation(),a.preventDefault(),b._parseFilesInInput(a.dataTransfer.files),b._hideDNDBox())}};this._hideDNDBox=function(){if(this.dnd.box!=null)this.dnd.box.ondragenter=null,this.dnd.box.ondragover=null,this.dnd.box.ondrop=null,this.dnd.box.parentNode.removeChild(this.dnd.box),this.dnd.box=null,this.p_files.className="dhx_vault_files",this.dnd.last_node=null};this.dnd.last_node=null;this._doOnWinDragEnter=function(a){b.dnd.last_node=a.target;b._showDNDBox()};this._doOnWinDragLeave=function(a){b.dnd.last_node==a.target&&window.setTimeout(function(){b._hideDNDBox()},1)};window.addEventListener("dragenter",this._doOnWinDragEnter,!1);window.addEventListener("dragleave",this._doOnWinDragLeave,!1);this._doOnWinDragOver=function(a){if(a.dataTransfer)a.dataTransfer.effectAllowed="none",a.dataTransfer.dropEffect="none",a.stopPropagation(),a.preventDefault()};this._doOnWinDrop=function(a){a.dataTransfer&&(a.stopPropagation(),a.preventDefault(),b._hideDNDBox())};window.addEventListener("dragover",this._doOnWinDragOver,!1);window.addEventListener("drop",this._doOnWinDrop,!1);this._unloadDND=function(){window.removeEventListener("dragenter",this._doOnWinDragEnter,!1);window.removeEventListener("dragleave",this._doOnWinDragLeave,!1);window.removeEventListener("dragover",this._doOnWinDragOver,!1);window.removeEventListener("drop",this._doOnWinDrop,!1);this._hideDNDBox();b=this.dnd=this._unloadDND=this._initDND=this._doOnWinDrop=this._doOnWinDragOver=this._doOnWinDragLeave=this._doOnWinDragEnter=this._hideDNDBox=this._showDNDBox=null}};