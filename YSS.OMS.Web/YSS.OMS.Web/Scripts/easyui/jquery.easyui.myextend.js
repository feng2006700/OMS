(function () {
    $.extend($.fn.accordion.methods, {
        //显示遮罩  
        loading: function (jq, msg) {
            return jq.each(function () {
                var panel = $(this);
                if (msg == undefined) {
                    msg = "loading";
                }
                $("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: panel.width(), height: panel.height() }).appendTo(panel);
                $("<div class=\"datagrid-mask-msg\"></div>").html(msg).appendTo(panel).css({ display: "block", left: (panel.width() - $("div.datagrid-mask-msg", panel).outerWidth()) / 2, top: (panel.height() - $("div.datagrid-mask-msg", panel).outerHeight()) / 2 });
            });
        }
,
        //隐藏遮罩  
        loaded: function (jq) {
            return jq.each(function () {
                var panel = $(this);
                panel.find("div.datagrid-mask-msg").remove();
                panel.find("div.datagrid-mask").remove();
            });
        }
    });
    $.validator.unobtrusive.options = {
        keyArray: new Array(),
        valueArray: new Array(),
        invalidHandler: function (event, validator) {
            //老的元素全部都隐藏一遍
            if ($.validator.unobtrusive.options.keyArray.length > 0) {
                for (var i = 0; i < $.validator.unobtrusive.options.keyArray.length; i++) {
                    var key = $.validator.unobtrusive.options.keyArray[i];
                    $('#' + key).trigger("hiddenError");
                }
                $.validator.unobtrusive.options.keyArray.length = 0;
                $.validator.unobtrusive.options.valueArray.length = 0;
            }
            //合并相同的元素，一个一个弹出
            for (var i = 0; i < validator.errorList.length; i++) {
                var element = validator.errorList[i];
                var key = $(element.element).attr("ID");
                var message = element.message;
                var findIndex = -1;
                for (var j = 0; j < $.validator.unobtrusive.options.keyArray.length; j++) {
                    if ($.validator.unobtrusive.options.keyArray[j] == key) {
                        message = $.validator.unobtrusive.options.valueArray[j] + "</br>" + message;
                        findIndex = j;
                        break;
                    }
                }
                if (findIndex >= 0) {
                    $.validator.unobtrusive.options.valueArray[findIndex] = message;
                }
                else {
                    $.validator.unobtrusive.options.keyArray[$.validator.unobtrusive.options.keyArray.length] = key;
                    $.validator.unobtrusive.options.valueArray[$.validator.unobtrusive.options.valueArray.length] = message;
                }
            }
            for (var i = 0; i < $.validator.unobtrusive.options.keyArray.length; i++) {
                var key = $.validator.unobtrusive.options.keyArray[i];
                var message = $.validator.unobtrusive.options.valueArray[i];
                $('#' + key).tooltip({
                    position: 'right',
                    showEvent: 'showError',
                    hideEvent: 'hiddenError',
                    content: '<span style="color:#000">' + message + '</span>',
                    onShow: function () {
                        $(this).tooltip('tip').css({
                            backgroundColor: '#FFFFCC',
                            borderColor: '#CC9933'
                        });
                    }
                });
                $('#' + key).trigger("showError");
            }
        },
        success: function (error, element) {
            $(element).trigger('hiddenError');
        }
    };
})(jQuery);
//searchbox extend
(function () {
    function changeControl(searchbox, opts) {
        var input = searchbox.find('input.textbox-text');
        input.prop('readonly', true);
        input.prop('disabled', true);
        input.unbind('.searchbox');

        var valueinput = searchbox.find('input.textbox-value');
        var name = valueinput.attr('name');
        if (name) {
            input.attr('name', name + 'Text');
        }
        var button = searchbox.find('span.textbox-addon > a.searchbox-button');
        var clearbutton = $('<a tabindex="-1" class="textbox-icon searchbox-clearbutton" style="width: 18px; height: 20px;" href="javascript:void(0)" icon-index="0"></a>').insertAfter(button);
    };
    function bindEvents(target, searchbox, opts) {
        var spanButtons = searchbox.find('span.textbox-addon');
        spanButtons.unbind('click');
        var t = $(target);
        var searchbutton = searchbox.find('a.searchbox-button');
        searchbutton.bind('click', function () {
            var opts = t.searchbox("options");
            if (opts.searcher)
                opts.searcher.call(t, t.searchbox("getValue"), t.searchbox("getName"));
        });
        var clearbutton = searchbox.find('a.searchbox-clearbutton');
        var text = searchbox.find('input.textbox-text');
        var value = searchbox.find('input.textbox-value');
        clearbutton.bind('click', function () {
            t.searchbox('setText', '');
            text.val(opts.prompt);
            text.addClass('textbox-prompt');
            t.searchbox('setValue', '');
            var name = $.fn.prop ? value.prop('name') : value.attr('name');
            if (opts.clear)
                opts.clear.call(t, opts, name);
        });
    };
    function initValue(searchbox, opts) {
        var text = searchbox.find('input.textbox-text');
        var value = searchbox.find('input.textbox-value');
        if (opts.text && opts.text != "" && opts.text != opts.prompt) {
            text.val(opts.text);
            text.removeClass('textbox-prompt');
        } else {
            text.val(opts.prompt);
            text.addClass('textbox-prompt');
        };
        if ((opts.value && opts.value != "")) value.val(opts.value)
    }
    $.extend($.fn.searchbox.methods, {
        readonly: function (jq) {
            return jq.each(function () {
                var searchbox = $.data(this, 'searchbox').searchbox;
                var opts = $.data(this, 'searchbox').options;
                changeControl(searchbox, opts);
                initValue(searchbox, opts);
                bindEvents(this, searchbox, opts);
                opts.readonlyextend = true;
            });
        },
        valuebox: function (jq) {
            return $.data(jq[0], 'searchbox').searchbox.find('input.textbox-value');
        },
        clear: function (jq) {
            return jq.each(function () {
                $.data(this, 'searchbox').searchbox.find('span.searchbox-clearbutton').click();
            });
        },
        setValue: function (jq, value) {
            return jq.each(function () {
                var opts = $.data(this, 'searchbox').options;
                if (opts.readonlyextend) {
                    $(this).searchbox('options').value = value;
                    $(this).searchbox('valuebox').val(value);
                } else {
                    $(this).searchbox('options').value = value;
                    $(this).searchbox('textbox').val(value);
                    $(this).searchbox('valuebox').val(value);
                    $(this).searchbox('textbox').blur();
                }
            });
        },
        getText: function (jq) {
            var opts = $.data(jq[0], 'searchbox').options;
            return opts.readonly ? opts.text : opts.value;
        },
        setText: function (jq, value) {
            return jq.each(function () {
                var opts = $.data(this, 'searchbox').options;
                if (opts.readonlyextend) {
                    var searchbox = $.data(this, 'searchbox').searchbox;
                    var opts = $.data(this, 'searchbox').options;
                    opts.text = value;
                    var textBox = searchbox.find('input.textbox-text');
                    textBox.val(value);
                    if (value != opts.prompt)
                        textBox.removeClass('textbox-prompt');
                    else
                        textBox.addClass('textbox-prompt');
                } else {
                    $(this).searchbox('setValue', value);
                }
            });
        }
    });
})(jQuery);
//textbox extend
(function () {
    function initialize(target) {
        var t = $(target), state = $.data(target, "textbox"),
            opts = t.textbox("options"),
            exts = opts.extensions ? opts.extensions : opts.extensions = {};
        if (!exts._initialized) {
            t.textbox("textbox").bind('keydown', function (e) {
                if (e.keyCode == 13) {
                    if ($.isFunction(opts.onEnter)) { opts.onEnter.call(target); }
                }
            });
            exts._initialized = true;
        }
    }
    var _textbox = $.fn.textbox;
    $.fn.textbox = function (options, param) {
        if (typeof options == "string") {
            return _textbox.apply(this, arguments);
        }
        options = options || {};
        return this.each(function () {
            var jq = $(this), hasInit = $.data(this, "textbox") ? true : false,
                opts = hasInit ? options : $.extend({}, $.fn.textbox.parseOptions(this), options);
            _textbox.call(jq, opts);
            initialize(this);
        });
    };
    $.union($.fn.textbox, _textbox);
    var defaults = {
        onEnter: function () { }
    };
    $.extend($.fn.textbox.defaults, defaults);
})(jQuery);
function TreeErrorHanderLoader(param, success, error) {
    var that = $(this);
    var opts = that.treegrid("options");
    if (!opts.url) {
        return false;
    }
    $.ajax({
        type: opts.method,
        url: opts.url,
        data: param,
        dataType: "json",
        success: function (data) {
            if (data.errorMsg) {
                $.messager.show({ title: '错误消息', msg: data.errorMsg });
                error.apply(this, arguments);
            }
            else
                success(data);
        },
        error: function (xhr, statusText, err) {
            if (xhr.status == 500)
                $('body').html(xhr.responseText);
            error.apply(this, arguments);
        }
    });
}

function GridErrorHanderLoader(param, success, error) {
    var that = $(this);
    var opts = that.datagrid("options");
    if (!opts.url) {
        return false;
    }
    $.ajax({
        type: opts.method,
        url: opts.url,
        data: param,
        dataType: "json",
        success: function (data) {
            if (data.errorMsg) {
                $.messager.show({ title: '错误消息', msg: data.errorMsg });
                error.apply(this, arguments);
            }
            else
                success(data);
        },
        error: function (xhr, statusText, err) {
            if (xhr.status == 500)
                $('body').html(xhr.responseText);
            error.apply(this, arguments);
        }
    });
}

function ShowWindowDefaultLoader(win, content) {
    if (content) {
        try {
            content.doInit(win);
        }
        catch (e) { }
    }
}

function dateFormat(value, row, index) {
    if (row.isFooter)
        return "";
    if (value != null && value != "") {
        var date = new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10))
        return date.pattern("yyyy-MM-dd");
    } else {
        return "";
    }
}

function dateTimeFormat(value, row, index) {
    if (row.isFooter)
        return "";
    if (value != null && value != "") {
        var date = new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10))
        return date.pattern("yyyy-MM-dd HH:mm");
    } else {
        return "";
    }
}

function yesBoolFormat(value, row, index) {
    if (row.isFooter)
        return "";
    if (eval(value)) {
        return "是";
    }
    else {
        return "";
    }
}

function noBoolFormat(value, row, index) {
    if (row.isFooter)
        return "";
    if (eval(value)) {
        return "";
    }
    else {
        return "否";
    }
}

function yesnoBoolFormat(value, row, index){
    if (row.isFooter)
        return "";
    if (eval(value)) {
        return "是";
    }
    else {
        return "否";
    }
}

function roleTypeFormat(value, row, index) {
    if (eval(value) == 1) {
        return "系统角色";
    }
    else {
        return "自定义角色";
    }
}

function boolFormat(value, row, index) {
    if (row.isFooter)
        return "";
    if (eval(value)) {
        return "是";
    }
    else {
        return "否";
    }
}

function wrapFormat(value, row, index) {
    if (value)
        return "<div class=" + this.field + " width='" + this.width + "px' style='white-space: normal; border:0px'>" + value + "</div>";
    else
        return "";
}

function moneyFormat(value, row, index) {
    if ((value == "" && value.length == 0) || value == undefined) {
        return "";
    }
    return $.currencyFormatter(value, "￥", 2);
}

function zeroNumberFormat(value, row, index) {
    if (!isNaN(value) && parseFloat(value) == 0) {
        return "";
    }
    return value;
}

function gridLoadSuccessTooltip(data) {
    $(".easyui-tooltip").each(function () {
        $(this).tooltip();
    });
}

function onDataGridResize(field, width) {
    $("div." + field).each(function (item, index) {
        $(item).css("width", width);
    });
}

function pagerFilter(data) {
    if (typeof data.length == 'number' && typeof data.splice == 'function') {	// is array
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage: function (pageNum, pageSize) {
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh', {
                pageNumber: pageNum,
                pageSize: pageSize
            });
            dg.datagrid('loadData', data);
        }
    });
    if (!data.originalRows) {
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}

function showWindows(title, url, icon, width, height, data) {
    if (!($.type(icon) === "string")) {
        icon = $(icon).linkbutton('options').iconCls;
    }
    else {
        if (icon == "View") {
            icon = "icon-view";
        }
        else if (icon == "Edit") {
            icon = "icon-edit";
        }
    }
    if (!width)
        width = 'full';
    if (!height)
        height = 'full';
    if (!data)
        data = {};
    $.showWindow({
        title: title, loadMsg: '正在加载页面', width: width, height: height,
        locate: 'document', iconCls: icon, modal: true, useiframe: true, showMask: true,
        content: 'url:' + url,
        onLoad: ShowWindowDefaultLoader,
        data: data
    });
}
function showParentWindows(title, url, icon, width, height, data) {
    if (!($.type(icon) === "string")) {
        icon = $(icon).linkbutton('options').iconCls;
    }
    if (!width)
        width = 'full';
    if (!height)
        height = 'full';
    if (!data)
        data = {};
    $.showWindow({
        title: title, loadMsg: '正在加载页面', width: width, height: height,
        locate: 'document.parent', iconCls: icon, modal: true, useiframe: true, showMask: false,
        content: 'url:' + url,
        onLoad: ShowWindowDefaultLoader,
        data: data
    });
}
function gridAjaxPost(gridID, url, data) {
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: "json",
        success: function (data) {
            if (data.errorMsg){
                $.messager.show({ title: '错误消息', msg: data.errorMsg });
            }
            else {
                $('#' + gridID).datagrid('clearSelections');
                $('#' + gridID).datagrid('reload');
            }
        },
        error: function (xhr, statusText, err) {
            if (xhr.status == 500)
                $('body').html(xhr.responseText);
        }
    });
}
/** 
* 在iframe中调用，在父窗口中出提示框(herf方式不用调父窗口)
*/
$.extend({
    messageBox5s: function (title, msg) {
        $.messager.show({
            title: title, msg: msg, timeout: 5000, showType: 'slide', style: {
                left: '',
                right: 5,
                top: '',
                bottom: -document.body.scrollTop - document.documentElement.scrollTop + 5
            }
        });
    }
});
$.extend({
    messageBox10s: function (title, msg) {
        $.messager.show({
            title: title, msg: msg, height: 'auto', width: 'auto', timeout: 10000, showType: 'slide', style: {
                left: '',
                right: 5,
                top: '',
                bottom: -document.body.scrollTop - document.documentElement.scrollTop + 5
            }
        });
    }
});

var dateBoxClearButton = $.extend([], $.fn.datebox.defaults.buttons);
dateBoxClearButton.splice(1, 0, {
    text: '清理',
    handler: function (target) {
        $(target).datebox('clear');
    }
});


Date.prototype.format = function (format) {
    /*
    * eg:format="yyyy-MM-dd hh:mm:ss";
    */
    if (!format) {
        format = "yyyy-MM-dd hh:mm:ss";
    }

    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
        // millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

$.extend($.fn.datagrid.defaults.editors, {
    datetimebox: {// datetimebox就是你要自定义editor的名称
        init: function (container, options) {
            var input = $('<input class="easyuidatetimebox">').appendTo(container);
            return input.datetimebox({
                formatter: function (date) {
                    return new Date(date).format("yyyy-MM-dd hh:mm:ss");
                }
            });
        },
        getValue: function (target) {
            return $(target).parent().find('input.combo-value').val();
        },
        setValue: function (target, value) {
            $(target).datetimebox("setValue", value);
        },
        resize: function (target, width) {
            var input = $(target);
            if ($.boxModel == true) {
                input.width(width - (input.outerWidth() - input.width()));
            } else {
                input.width(width);
            }
        }
    }
});

$.extend($.fn.propertygrid.defaults.editors, {
    datetimebox: {// datetimebox就是你要自定义editor的名称
        init: function (container, options) {
            var input = $('<input class="easyui-datetimebox">').appendTo(container);
            return input.datetimebox({
                formatter: function (date) {
                    return new Date(date).format("yyyy-MM-dd hh:mm:ss");
                }
            });
        },
        getValue: function (target) {
            return $(target).parent().find('input.textbox-value').val();
        },
        setValue: function (target, value) {
            $(target).datetimebox("setValue", value);
        },
        resize: function (target, width) {
            var input = $(target);
            if ($.boxModel == true) {
                input.width(width - (input.outerWidth() - input.width()));
            } else {
                input.width(width);
            }
        }
    }
});

