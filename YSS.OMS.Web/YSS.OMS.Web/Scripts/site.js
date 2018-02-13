function commonBoxLoader(param, success, error, url) {
    var q = param.q || '';
    if (q.length <= 1) { return false; }
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'POST',
        data: {
            keyword: q
        },
        success: function (data) {
            success(data);
        },
        error: function () {
            error.apply(this, arguments);
        }
    });
}
function MyAllCustomerLoader(param, success, error){
    commonBoxLoader(param, success, error, '/Customer/AllMyList');
}
function AllCustomerLoader(param, success, error) {
    commonBoxLoader(param, success, error, '/Customer/AllCustomer');
}
function AllImpCustomerLoader(param, success, error) {
    commonBoxLoader(param, success, error, '/Customer/AllImpCustomer');
}
function AllServiceCustomerLoader(param, success, error) {
    commonBoxLoader(param, success, error, '/Customer/AllServiceCustomer');
}
function AllReceiptCustomerLoader(param, success, error) {
    commonBoxLoader(param, success, error, '/Customer/AllReceiptCustomer');
}
function CompanyNotInCustomerLoader(param, success, error) {
    commonBoxLoader(param, success, error, '/Company/AllCompanyNotInCustomer');
}
function provinceSelectIndex(rec) {
    var url = '/Dictionary/GetSubDictionary?parentID=' + rec.value;
    $('#CityGuid').combobox('reload', url);
}
function provinceSelect(rec) {
    var url = '/Dictionary/GetSubDictionary?parentID=' + rec.value + "&includeselect=false";
    $('#CityGuid').combobox('reload', url);
}
function resetCity() {
    var data = $('#CityGuid').combobox('getData');
    var selectValue = $('#CityGuid').combobox('getValue');
    if (selectValue)
    {
        var i = data.length;
        while (i--) {
            if (data[i].value === selectValue) {
                return;
            }
        }
        $('#CityGuid').combobox('select', data[0].value);
    }    
}
function implementerFormat(value, row, index)
{
    return userFormat(value, row, index, 'ImplementerID');
}

function saleFormat(value, row, index)
{
    return userFormat(value, row, index, 'SellerID');
}

function createFormat(value, row, index) {
    if (row['CreateBy'] && !isNaN(row['CreateBy']))
        return userFormat(value, row, index, 'CreateBy');
    else
        return userFormat(value, row, index, 'CreateByInt');
}

function userFormat(value, row, index, userfield) {
    if (value && value != '') {
        var text = "<a href='#' class='easyui-tooltip' data-options='" +
            "content: $(\"<div>123123</div>\"),showEvent:\"click\"," +
            "onUpdate: function(content){content.panel({ width: 220, height: \"auto\", border: false, href: \"/User/Index/" + row[userfield] + "\"});}," +
            "onShow: function(){var t = $(this);t.tooltip(\"tip\").unbind().bind(\"mouseenter\", function(){t.tooltip(\"show\");}).bind(\"mouseleave\", function(){ t.tooltip(\"hide\");});}'><img src='/Content/easyui/icons/memeber.gif' style='border:none;vertical-align:middle'/></a>" + value
        return text;
    }
    else
        return value;
}

$.extend($,{
    union : function () {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === "boolean") { deep = target; target = arguments[1] || {}; i = 2; }
        if (typeof target !== "object" && !$.isFunction(target)) { target = {}; }
        if (length === i) { target = this; --i; }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) { continue; }
                    if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && $.isArray(src) ? src : [];
                        } else {
                            clone = src && $.isPlainObject(src) ? src : {};
                        }
                        target[name] = $.union(deep, clone, copy);
                    } else if (copy !== undefined && copy !== null && (src === undefined || src === null)) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    },
    currencyFormatter: function (num, symbol, precision) {

        if (!$.isNumeric(num))
            return num;

        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = 0;

        if (precision == undefined || precision == null)
            precision = 2;

        var reservedDecimal = Math.pow(10, precision);

        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * reservedDecimal + 0.50000000001);
        cents = num % reservedDecimal;
        num = Math.floor(num / reservedDecimal).toString();
        var scents = '';
        var rat = reservedDecimal / 10;
        while (rat > 1 && Math.floor(cents / rat) <= 0) {
            scents = "0" + scents;
            rat = rat / 10;
        }
        cents = scents + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
        if (num == "0" && cents == "00")
            sign = true;
        return (((sign) ? '' : '-') + symbol + num + '.' + cents);

    }
});

$.fn.serializeObject = function () {

    var self = this,
        json = {},
        push_counters = {},
        patterns = {
            "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
            "key": /[a-zA-Z0-9_]+|(?=\[\])/g,
            "push": /^$/,
            "fixed": /^\d+$/,
            "named": /^[a-zA-Z0-9_]+$/
        };


    this.build = function (base, key, value) {
        base[key] = value;
        return base;
    };

    this.push_counter = function (key) {
        if (push_counters[key] === undefined) {
            push_counters[key] = 0;
        }
        return push_counters[key]++;
    };

    $.each($(this).serializeArray(), function () {

        // skip invalid keys
        if (!patterns.validate.test(this.name)) {
            return;
        }

        var k,
            keys = this.name.match(patterns.key),
            merge = this.value,
            reverse_key = this.name;

        while ((k = keys.pop()) !== undefined) {

            // adjust reverse_key
            reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

            // push
            if (k.match(patterns.push)) {
                merge = self.build([], self.push_counter(reverse_key), merge);
            }

                // fixed
            else if (k.match(patterns.fixed)) {
                merge = self.build([], k, merge);
            }

                // named
            else if (k.match(patterns.named)) {
                merge = self.build({}, k, merge);
            }
        }

        json = $.union(true, json, merge);
    });

    return json;
};

Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份         
        "d+": this.getDate(), //日           
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时       
        "m+": this.getMinutes(), //分         
        "s+": this.getSeconds(), //秒         
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
        "S": this.getMilliseconds() //毫秒         
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
Date.prototype.add = function (strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's': return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'm': return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h': return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd': return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w': return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'M': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y': return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
}
Date.prototype.getMonday = function () {
    var dateOfWeek = this.getDay();
    if (dateOfWeek == 0) {
        dateOfWeek = 7;
    }
    return this.add('d', 1 - dateOfWeek);
}
Date.prototype.getSunday = function () {
    return this.getMonday().add('d', 6);
}
Date.prototype.getMondayFirstDay = function () {
    return new Date(this.getFullYear(), this.getMonth(), 1);
}
Date.prototype.getMondayEndDay = function () {
    return this.getMondayFirstDay().add('M', 1).add('d', -1);
}
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
Array.prototype.remove = function (obj) {
    var index = -1;
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            index = i;
            break;
        }
    }
    if(index > -1)
        return this.splice(index, 1);
}  

String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
}

String.prototype.endWith = function (str) {
    var reg = new RegExp(str + "$");
    return reg.test(this);
}

JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"' + obj + '"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof (v);
            if (t == "string") v = '"' + v + '"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};


function unSuccessFormHandler(response) {
    if (!$.isPlainObject(response)) {
        //$.messager.show({
        //    msg: $('#errorMessage > #errorMessage').html(),
        //    showType: 'fade',
        //    style: {
        //        right: '',
        //        top: document.body.scrollTop + document.documentElement.scrollTop,
        //        bottom: ''
        //    },
        //    width: '100%',
        //});
        $.messager.alert('错误消息', $('#errorMessage > #errorMessage').html());
    }
    else {
        //针对json对象显示对应的tooltips
    }
}




