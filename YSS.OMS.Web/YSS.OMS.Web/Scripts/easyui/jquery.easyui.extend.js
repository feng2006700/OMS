(function ($) {
    /**
    *
    * @requires jQuery,EasyUI
    *
    * 防止panel/window/dialog组件超出浏览器边界
    * @param left
    * @param top
    */
    var easyuiPanelOnMove = function (left, top) {
        var l = left;
        var t = top;
        if (l < 1) {
            l = 1;
        }
        if (t < 1) {
            t = 1;
        }
        var width = parseInt($(this).parent().css('width')) + 14;
        var height = parseInt($(this).parent().css('height')) + 14;
        var right = l + width;
        var buttom = t + height;
        var browserWidth = $(window).width();
        var browserHeight = $(window).height();
        if (right > browserWidth) {
            l = browserWidth - width;
        }
        if (buttom > browserHeight) {
            t = browserHeight - height;
        }
        $(this).parent().css({/* 修正面板位置 */
            left: l,
            top: t
        });
    };
    $.fn.dialog.defaults.onMove = easyuiPanelOnMove;
    $.fn.window.defaults.onMove = easyuiPanelOnMove;
    $.fn.panel.defaults.onMove = easyuiPanelOnMove;

    /**
    *  销毁panel和window下的iframe并释放内存
    */
    var destroyFrameAndFreeTheMemory = function () {
        var frame = $('iframe', this);
        try {
            if (frame.length > 0) {
                frame[0].contentWindow.document.write('');
                frame[0].contentWindow.close();
                frame.remove();
                if (navigator.userAgent.indexOf('MSIE') > 0) {
                    CollectGarbage();
                }
            }
        } catch (e) { }
    }

    $.fn.panel.defaults.onBeforeDestroy = destroyFrameAndFreeTheMemory;
    $.fn.window.defaults.onBeforeDestroy = destroyFrameAndFreeTheMemory;
    $.fn.dialog.defaults.onBeforeDestroy = destroyFrameAndFreeTheMemory;

})(jQuery);

(function ($) {
    $.extend({
        dateFormat: function (date, pattern) {
            if (date == null) {
                return null;
            }

            if (pattern == null) {
                var formatter = "yyyy-MM-dd";
            } else {
                var formatter = pattern;
            }

            var year = date.getFullYear().toString();
            var month = (date.getMonth() + 1).toString();
            var day = date.getDate().toString();
            var hours = date.getHours().toString();
            var minutes = date.getMinutes().toString();
            var seconds = date.getSeconds().toString();
            var yearMarker = formatter.replace(/[^y]/g, '');
            var monthMarker = formatter.replace(/[^M]/g, '');
            var dayMarker = formatter.replace(/[^d]/g, '');
            var hoursMarker = formatter.replace(/[^h]/g, '');
            var minutesMarker = formatter.replace(/[^m]/g, '');
            var secondsMarker = formatter.replace(/[^s]/g, '');
            if (yearMarker.length == 2) {
                year = year.substring(2, 4);
            }

            if (monthMarker.length > 1 && month.length == 1) {
                month = "0" + month;
            }

            if (dayMarker.length > 1 && day.length == 1) {
                day = "0" + day;
            }

            if (hoursMarker.length > 1 && hours.length == 1) {
                hours = "0" + hours;
            }

            if (minutesMarker.length > 1 && minutes.length == 1) {
                minutes = "0" + minutes;
            }

            if (secondsMarker.length > 1 && seconds.length == 1) {
                seconds = "0" + seconds;
            }

            if (yearMarker.length > 0) {
                formatter = formatter.replace(yearMarker, year);
            }
            if (monthMarker.length > 0) {
                formatter = formatter.replace(monthMarker, month);
            }

            if (dayMarker.length > 0) {
                formatter = formatter.replace(dayMarker, day);
            }

            if (hoursMarker.length > 0) {
                formatter = formatter.replace(hoursMarker, hours);
            }

            if (minutesMarker.length > 0) {
                formatter = formatter.replace(minutesMarker, minutes);
            }

            if (secondsMarker.length > 0) {
                formatter = formatter.replace(secondsMarker, seconds);
            }

            return formatter;
        },
        parseDate: function (dateString, pattern) {
            var today = new Date();
            if (dateString == null) {
                return today;
            }

            if (pattern == null) {
                var formatter = "yyyy-MM-dd";
            } else {
                var formatter = pattern;
            }

            var yearMarker = formatter.replace(/[^y]/g, '');
            var monthMarker = formatter.replace(/[^M]/g, '');
            var dayMarker = formatter.replace(/[^d]/g, '');
            var hoursMarker = formatter.replace(/[^h]/g, '');
            var minutesMarker = formatter.replace(/[^m]/g, '');
            var secondsMarker = formatter.replace(/[^s]/g, '');
            var yearPosition = formatter.indexOf(yearMarker);
            var yearLength = yearMarker.length;
            var year = parseInt(dateString.substring(yearPosition, yearPosition
                + yearLength));
            if (isNaN(year)) {
                year = today.getYear();
            } else {
                if (yearLength == 2) {
                    if (year < 50) {
                        year += 2000;
                    } else {
                        year += 1900;
                    }
                }
            }

            var monthPosition = formatter.indexOf(monthMarker);
            var month = parseInt(dateString.substring(monthPosition, monthPosition
                + monthMarker.length));
            if (isNaN(month)) {
                month = today.getMonth();
            } else {
                month -= 1
            }

            var dayPosition = formatter.indexOf(dayMarker);
            var day = parseInt(dateString.substring(dayPosition, dayPosition
                + dayMarker.length));
            if (isNaN(day)) {
                day = today.getDate();
            }

            var hoursPosition = formatter.indexOf(hoursMarker);
            var hours = parseInt(dateString.substring(hoursPosition, hoursPosition
                + hoursMarker.length));
            if (isNaN(hours)) {
                hours = 0;
            }

            var minutesPosition = formatter.indexOf(minutesMarker);
            var minutes = parseInt(dateString.substring(minutesPosition,
                minutesPosition + minutesMarker.length));
            if (isNaN(minutes)) {
                minutes = 0;
            }

            var secondsPosition = formatter.indexOf(secondsMarker);
            var seconds = parseInt(dateString.substring(secondsPosition,
                secondsPosition + secondsMarker.length));
            if (isNaN(seconds)) {
                seconds = 0;
            }

            return new Date(year, month, day, hours, minutes, seconds);
        }
    });
})(jQuery);
//mask formatter
(function ($) {
    function addCss(id, content) {
        if ($('#' + id).length > 0) return;
        return $('<style>' + content + '</style>').attr('id', id).attr('type', 'text/css').appendTo('head');
    }

    $.extend({
        mask: function (opts) {
            opts = opts || {};
            var options = $.extend({}, { target: 'body', loadMsg: $.fn.datagrid.defaults.loadMsg }, opts);
            this.unmask(options);

            if (options.target != 'body' && $(options.target).css('position') == 'static') {
                $(options.target).addClass('mask-relative');
            }

            var mask = $("<div class=\"datagrid-mask\" style=\"display:block;\"></div>").appendTo(options.target);
            var msg = $("<div class=\"datagrid-mask-msg\" style=\"display:block; left: 50%;\"></div>").html(options.loadMsg).appendTo(options.target);
            setTimeout(function () {
                msg.css("marginLeft", -msg.outerWidth() / 2);
            }, 5);

            var css = '.mask-relative {position: relative !important;}';
            addCss('mask_css', css);
        },
        unmask: function (options) {
            var target = options.target || 'body';
            $(">div.datagrid-mask-msg", target).remove();
            $(">div.datagrid-mask", target).remove();
            $(options.target).removeClass('mask-relative');
        }
    });
})(jQuery);
//menu extend
(function ($) {
    function appendItems(target, submenu, parentEl) {
        if (submenu && $.isArray(submenu)) {
            $.each(submenu, function () {
                var item = this;

                var parent = {};
                if (parentEl) {
                    $.extend(parent, { parent: parentEl });
                }

                if ($.isPlainObject(item)) {
                    $(target).menu('appendItem', $.extend(item, parent));

                    if (item.submenu) {
                        var p = $(target).menu('findItem', item.text);
                        appendItems(target, item.submenu, p.target);
                    }
                } else if (item == '-') {
                    var el = $(target).menu('appendItem', $.extend({ text: item }, parent)).menu('findItem', item).target;
                    $(el).removeClass('menu-item').addClass('menu-sep').removeAttr('style').empty();
                }
            });
        }
    }

    function addEventListener(target, eventName, handler, override) {
        var options = $(target).menu('options');
        var defaultActionEvent = options[eventName];
        switch (eventName) {
            case 'onShow':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function () {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onHide':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function () {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onClick':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (item) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            default:
                break;
        }
    }


    $.extend($.fn.menu.methods, {
        followCustomHandle: function (jq) {

        },
        appendItems: function (jq, param) {
            return jq.each(function () {
                appendItems(this, param);
            });
        },
        addEventListener: function (jq, param) {
            return jq.each(function () {
                var eventList = $.isArray(param) ? param : [param];
                var target = this;
                $.each(eventList, function (i, event) {
                    addEventListener(target, event.name, event.handler || function () { }, event.override);
                });
            });
        }
    });
})(jQuery);
//window extend
(function ($) {

    function getTop(w, options) {
        if (options.locate == 'document') {
            return w;
        }
        if (options.locate == 'document.parent') {
            return w.parent;
        }
        if (options.locate == 'document.parent.parent') {
            return w.parent.parent;
        }
        return w['top'];
    }

    function setWindowSize(w, options) {
        var _top = getTop(w, options);
        var wHeight = $(_top).height(), wWidth = $(_top).width();
        if (!/^#/.test(options.locate)) {
            if (options.height == 'auto') {
                options.height = wHeight * 0.6
            }
            else if (options.height == 'full'){
                options.height = wHeight
            }
            else if(options.height < 1){
                options.height = wHeight * options.height
            }

            if (options.width == 'auto') {
                options.width = wWidth * 0.6
            }
            else if (options.width == 'full') {
                options.width = wWidth
            }
            else if (options.width < 1){
                    options.width = wWidth * options.width
            }
        } else {
            var locate = /^#/.test(options.locate) ? options.locate : '#' + options.locate;
            if (options.height == 'auto') {
                options.height = $(locate).height() * 0.6
            }
            else if (options.height == 'full') {
                options.height = $(locate).height()
            }
            else if (options.height < 1) {
                options.height = $(locate).height() * options.height
            }
            if (options.width == 'auto') {
                options.width = $(locate).width() * 0.6
            }
            else if (options.width == 'full') {
                options.width = $(locate).width()
            }
            else if (options.width < 1) {
                options.width = $(locate).width() * options.width
            }
        }
    }

    $.extend({
        /**
        *
        * @param options
        * @return 返回当前窗体的引用
        *
        * 1、新增属性：
        *      useiframe: true|false，指定是否使用iframe加载页面。
        *      locate:  top|document|id 默认:top
        *      data:  方法回调参数
        *
        * 2、增强属性：
        *      content: 支持使用前缀url指定要加载的页面。
        */
        showWindow: function (options) {
            options = options || {};
            var target;
            var winOpts = $.extend({}, {
                iconCls: 'icon-form',
                useiframe: false,
                locate: 'top',
                data: undefined,
                width: 'auto',
                height: 'auto',
                cache: false,
                minimizable: true,
                maximizable: true,
                collapsible: true,
                resizable: true,
                loadMsg: $.fn.datagrid.defaults.loadMsg,
                showMask: false,
                onClose: function () { target.dialog('destroy'); }
            }, options);


            var iframe = null;

            if (/^url:/.test(winOpts.content)) {
                var url = winOpts.content.substr(4, winOpts.content.length);
                if (winOpts.useiframe) {
                    iframe = $('<iframe>')
                        .attr('height', '100%')
                        .attr('width', '100%')
                        .attr('marginheight', 0)
                        .attr('marginwidth', 0)
                        .attr('frameborder', 0);

                    setTimeout(function () {
                        iframe.bind('load', function () {
                            if (iframe[0].contentWindow) {
                                onLoadCallback && onLoadCallback.call(this, selfRefrence, iframe[0].contentWindow);
                                target.panel('body').children("div.datagrid-mask-msg").remove();
                                target.panel('body').children("div.datagrid-mask").remove();
                            }
                        });
                        iframe.attr('src', url);
                    }, 10);

                } else {
                    winOpts.href = url;
                }

                delete winOpts.content;
            }

            var selfRefrence = {
                getData: function (name) {
                    return winOpts.data ? winOpts.data[name] : null;
                },
                close: function () {
                    target.panel('close');
                }
            };

            var _top = getTop(window, winOpts);
            var warpHandler = function (handler) {
                if (typeof handler == 'function') {
                    return function () {
                        handler(selfRefrence);
                    };
                }

                if (typeof handler == 'string' && winOpts.useiframe) {
                    return function () {
                        iframe[0].contentWindow[handler](selfRefrence);
                    }
                }

                if (typeof handler == 'string') {
                    return function () {
                        eval(_top[handler])(selfRefrence);
                    }
                }
            }

            setWindowSize(window, winOpts);


            //包装toolbar中各对象的handler
            if (winOpts.toolbar && $.isArray(winOpts.toolbar)) {
                $.each(winOpts.toolbar, function (i, button) {
                    button.handler = warpHandler(button.handler);
                });
            }

            //包装buttons中各对象的handler
            if (winOpts.buttons && $.isArray(winOpts.buttons)) {
                $.each(winOpts.buttons, function (i, button) {
                    button.handler = warpHandler(button.handler);
                });
            }


            var onLoadCallback = winOpts.onLoad;
            winOpts.onLoad = function () {
                onLoadCallback && onLoadCallback.call(this, selfRefrence, _top);
            }

            if (!/^#/.test(winOpts.locate)) {
                if (winOpts.useiframe && iframe) {
                    if (winOpts.showMask) {
                        winOpts.onBeforeOpen = function () {
                            var panel = $(this).panel('panel');
                            var header = $(this).panel('header');
                            var body = $(this).panel('body');
                            body.css('position', 'relative');
                            var mask = $("<div class=\"datagrid-mask\" style=\"display:block;\"></div>").appendTo(body);
                            var msg = $("<div class=\"datagrid-mask-msg\" style=\"display:block; left: 50%;\"></div>").html(winOpts.loadMsg).appendTo(body);
                            setTimeout(function () {
                                msg.css("marginLeft", -msg.outerWidth() / 2);
                            }, 5);
                        }
                    }

                    target = _top.$('<div>').css({ 'overflow': 'hidden' }).append(iframe).dialog(winOpts);
                } else {
                    target = _top.$('<div>').dialog(winOpts);
                }
            } else {
                var locate = /^#/.test(winOpts.locate) ? winOpts.locate : '#' + winOpts.locate;
                target = $('<div>').appendTo(locate).dialog($.extend({}, winOpts, { inline: true }));
            }

            return target;
        },
        showModalDialog: function (options) {
            options = options || {};
            var opts = $.extend({}, options, {
                modal: true,
                minimizable: false,
                maximizable: false,
                resizable: false,
                collapsible: false
            });

            return $.showWindow(opts);
        }
    })
})(jQuery);
//validate extend
(function ($) {

    $.extend($.fn.validatebox.defaults.rules, {
        unequal: {
            validator: function (value, param) {
                return value != param;
            },
            message: $.fn.validatebox.defaults.missingMessage
        }
        , minLength: {
            validator: function (value, param) {
                return value.length >= param[0];
            }
        }
        , equals: {
            validator: function (value, param) {
                if (/^#/.test(param)) {
                    return value == $(param).val();
                } else {
                    return value == param;
                }
            }
        }
    });


    if ($.fn.validatebox) {
        $.fn.validatebox.defaults.rules.minLength.message = '请至少输入{0}个字符。';
        $.fn.validatebox.defaults.rules.equals.message = '字段不匹配';
    }
})(jQuery);
//toolbar extend
(function ($) {
    function init(target) {
        var options = $(target).toolbar('options');
        var tb = $(target).addClass('datagrid-toolbar').css({
            'border-top-width': 1
        });

        tb.append('<table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table>');
        if (options.buttonPosition == 'right') {
            tb.find('table').css('float', 'right');
        }

        if (options.data) {
            addItems(target, options.data);
        } else {
            options.loader.call(target, function (data) {
                options.data = data;
                addItems(target, options.data);
            }, function () {
                options.onLoadError.apply(target, arguments);
            });
        }
    }

    function add(target, item) {
        var tr = $(target).find('tr');
        if (typeof item == 'string' && $.trim(item) == '-') {
            $('<td><div class=\"dialog-tool-separator\"></div></td>').appendTo(tr);
        } else {
            if ($.trim(item.text) == '-') {
                $('<td><div class=\"dialog-tool-separator\"></div></td>').appendTo(tr);
            } else {
                var td = $('<td></td>').appendTo(tr);
                var button = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
                button[0].onclick = eval(item.handler || function () { });
                button.linkbutton($.extend({}, item, { plain: true }));
            }
        }
    }

    function addItems(target, items) {
        if (!$.isArray(items)) return;
        for (var i = 0; i < items.length; i++) {
            add(target, items[i]);
        }
    }

    $.fn.toolbar = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.toolbar.methods[options](this, param);
        }

        options = options || {};
        return this.each(function () {
            var state = $.data(this, 'toolbar');
            if (state) {
                $.extend(state.options, options);
            } else {
                $.data(this, 'toolbar', {
                    options: $.extend({}, $.fn.toolbar.defaults, $.parser.parseOptions(this), options)
                });
                init(this);
            }
        });
    }

    $.fn.toolbar.methods = {
        options: function (jq) {
            return $.data(jq[0], 'toolbar').options;
        },
        add: function (jq, items) {
            return jq.each(function () {
                addItems(this, items);
            });
        }
    }

    $.fn.toolbar.defaults = {
        data: null,
        url: undefined,
        buttonPosition: 'left',
        loader: function (success, error) {
            var options = $(this).toolbar('options');
            $.ajax({
                type: 'POST',
                url: 'toolbar_data.json',
                dataType: 'json',
                success: function (data) {
                    success(data);
                },
                error: function () {
                    error.apply(this, arguments);
                }
            });
        },
        onLoadError: function () { }
    }
})(jQuery);
//tab extend
(function ($) {
    function getContextMenuId(target) {
        return $(target).attr('id') + '_contextmenu';
    }

    function buildContextMenu(target, menuitems) {
        var menuid = getContextMenuId(target);
        var contextmenu = $('#' + menuid);
        if (contextmenu.length == 0) {
            contextmenu = $('<div>', { id: menuid }).menu();
            contextmenu.menu('appendItems', menuitems);
        }
        return contextmenu;
    }

    function getMenuItemOnClickHandler(menuitems) {
        var onclickHandler = {};

        $.each(menuitems, function () {
            var item = this;
            if (item.onclick) {
                var index = item.id || item.text;
                onclickHandler[index] = item.onclick;
                delete item.onclick;
            }

            if (item.submenu && $.isArray(item.submenu) && item.submenu.length > 0) {
                $.extend(onclickHandler, getMenuItemOnClickHandler(item.submenu));
            }
        });

        return onclickHandler;
    }

    /**
    * 解决在menu.onClick事件和item.onclick同时触发调用。
    * @param target
    */
    function initContextMenu(target) {
        var opts = $.extend(true, {}, $.fn.tabs.defaults, $.data(target, 'tabs').options);
        var menuOpts = opts.customAttr.contextMenu;
        if (!menuOpts.isShow) return;

        var menuitems = getDefaultContextMenuItems(target);
        if (menuOpts.isMerge && $.isArray(menuOpts.items) && menuOpts.items.length > 0) {
            menuitems = $.merge(menuitems, menuOpts.items);
        }

        if (!menuOpts.isMerge && $.isArray(menuOpts.items) && menuOpts.items.length > 0) {
            menuitems = menuOpts.items;
        }

        var onClickHandlerCache = getMenuItemOnClickHandler(menuitems);
        var contextmenu = buildContextMenu(target, menuitems);

        $(target).tabs('addEventListener', {
            name: 'onContextMenu',
            handler: function (e, title, index) {
                e.preventDefault();
                modifyItemText(target, contextmenu, index);
                contextmenu.menu('addEventListener', {
                    name: 'onClick',
                    override: true,
                    handler: function (item) {
                        var name = item.id || item.text;
                        if (onClickHandlerCache[name]) {
                            onClickHandlerCache[name].call(this, item, title, index, target);
                        }
                    }
                }).menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            }
        });
    }

    function modifyItemText(target, contextmenu, index) {
        var menuid = getContextMenuId(target);
        var itemEl = $('#' + menuid + '_fixed');
        if ($.inArray(index, $.fn.tabs.defaults.customAttr.fixedtabs) == -1 && !$(target).tabs('getTab', index).panel('options').closable) {
            contextmenu.menu('setText', { target: itemEl, text: $.fn.tabs.defaults.contextMenu.itemname.unfixtab });
        } else {
            contextmenu.menu('setText', { target: itemEl, text: $.fn.tabs.defaults.contextMenu.itemname.fixtab });
            if ($.inArray(index, $.fn.tabs.defaults.customAttr.fixedtabs) > -1) {
                contextmenu.menu('disableItem', itemEl);
            } else {
                contextmenu.menu('enableItem', itemEl);
            }
        }

        itemEl = $('#' + menuid + '_close');
        if (!$(target).tabs('getTab', index).panel('options').closable) {
            contextmenu.menu('disableItem', itemEl);
        } else {
            contextmenu.menu('enableItem', itemEl);
        }

    }

    function getDefaultContextMenuItems(target) {
        var menuid = getContextMenuId(target);
        return [
            {
                id: menuid + '_reload',
                text: $.fn.tabs.defaults.contextMenu.itemname.reload,
                onclick: $.fn.tabs.defaults.contextMenu.defaultEventsHandler.reload
            },
            {
                id: menuid + '_fixed',
                text: $.fn.tabs.defaults.contextMenu.itemname.fixtab,
                onclick: function (item, title, index, tabs) {
                    if (item.text == $.fn.tabs.defaults.contextMenu.itemname.fixtab)
                        $.fn.tabs.defaults.contextMenu.defaultEventsHandler.fixtab(item, title, index, tabs);
                    else
                        $.fn.tabs.defaults.contextMenu.defaultEventsHandler.unfixtab(item, title, index, tabs)
                }
            },
            '-',
            {
                id: menuid + '_close',
                text: $.fn.tabs.defaults.contextMenu.itemname.close,
                onclick: $.fn.tabs.defaults.contextMenu.defaultEventsHandler.closetab
            },
            {
                id: menuid + '_close_others',
                text: $.fn.tabs.defaults.contextMenu.itemname.closeothers,
                onclick: $.fn.tabs.defaults.contextMenu.defaultEventsHandler.closeOthersTab
            },
            {
                id: menuid + '_close_rightside',
                text: $.fn.tabs.defaults.contextMenu.itemname.closerightside,
                onclick: $.fn.tabs.defaults.contextMenu.defaultEventsHandler.closeRightSideTabs
            },
            {
                id: menuid + '_close_all',
                text: $.fn.tabs.defaults.contextMenu.itemname.closeall,
                onclick: $.fn.tabs.defaults.contextMenu.defaultEventsHandler.closeAll
            }
        ];
    }

    function getHeader(target, index) {
        var headers = [];
        index++;
        $(target).children('div.tabs-header').find('ul li:nth-child(' + index + ')').each(function () {
            headers.push(this);
        });
        return headers.length > 0 ? headers[0] : null;
    }

    function resortTabs(target, minIndex, maxIndex, reverse) {
        if (typeof maxIndex == 'number' && typeof minIndex == 'number') {
            var tabs = $.data(target, 'tabs').tabs;
            if (maxIndex < 0 || maxIndex > tabs.length) return;
            if (minIndex < 0 || minIndex > tabs.length) return;


            if (reverse) {
                var srcTab = tabs[maxIndex];
                for (var i = maxIndex; i > minIndex; i--) {
                    tabs.splice(i, 1, tabs[i - 1]);
                }
                tabs[minIndex] = srcTab;

                var destHeader = getHeader(target, minIndex);
                if (destHeader) {
                    var srcheader = getHeader(target, maxIndex);
                    $(destHeader).before(srcheader);
                }
            } else {
                var srcTab = tabs[minIndex];
                for (var j = minIndex; j <= maxIndex; j++) {
                    tabs.splice(j, 1, tabs[j + 1]);
                }
                tabs[maxIndex] = srcTab;

                var destHeader = getHeader(target, maxIndex);
                if (destHeader) {
                    var srcHeader = getHeader(target, minIndex);
                    $(destHeader).after(srcHeader);
                }
            }
        }
    }

    function getFixedTabs(target) {
        var tabs = $(target).tabs('tabs');
        var fixedtabs = [];
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            if (tab.panel('options').closable == undefined || !tab.panel('options').closable) {
                fixedtabs.push(tab);
            }
        }

        return fixedtabs;
    }

    function appendIframeToTab(target, tabTitle, url, showMask, loadMsg) {
        var iframe = $('<iframe>')
            .attr('height', '100%')
            .attr('width', '100%')
            .attr('marginheight', '0')
            .attr('marginwidth', '0')
            .attr('frameborder', '0');

        setTimeout(function () {
            //remove mask
            iframe.bind('load', function () {
                if (iframe[0].contentWindow) {
                    tab.panel('body').children("div.datagrid-mask-msg").remove();
                    tab.panel('body').children("div.datagrid-mask").remove();
                }
            });
            iframe.attr('src', url);
        }, 1);

        var tab = $(target).tabs('getTab', tabTitle);
        tab.panel('body').css({ 'overflow': 'hidden' }).empty().append(iframe);


        //add mask
        if (showMask) {
            var loadMsg = loadMsg || $.fn.datagrid.defaults.loadMsg;
            var body = tab.panel('body');
            body.css('position', 'relative');
            var mask = $("<div class=\"datagrid-mask\" style=\"display:block;\"></div>").appendTo(body);
            var msg = $("<div class=\"datagrid-mask-msg\" style=\"display:block; left: 50%;\"></div>").html(loadMsg).appendTo(body);
            setTimeout(function () {
                msg.css("marginLeft", -msg.outerWidth() / 2);
            }, 5);
        }

    }

    $.fn.tabs.defaults.contextMenu = {}
    $.fn.tabs.defaults.contextMenu.itemname = {};
    $.fn.tabs.defaults.contextMenu.itemname.reload = '重新加载';
    $.fn.tabs.defaults.contextMenu.itemname.fixtab = '固定标签页';
    $.fn.tabs.defaults.contextMenu.itemname.unfixtab = '取消固定标签';
    $.fn.tabs.defaults.contextMenu.itemname.close = '关闭标签页';
    $.fn.tabs.defaults.contextMenu.itemname.closeothers = '关闭其他标签页';
    $.fn.tabs.defaults.contextMenu.itemname.closerightside = '关闭右侧标签页';
    $.fn.tabs.defaults.contextMenu.itemname.closeall = '关闭所有标签页';

    $.fn.tabs.defaults.contextMenu.defaultEventsHandler = {
        reload: function (item, title, index, target) {
            var panel = $(target).tabs('getTab', index);
            var useiframe = panel.panel('options').useiframe;
            if (useiframe) {
                $('iframe', panel.panel('body')).each(function () {
                    this.contentWindow.location.reload();
                });
            } else {
                panel.panel('refresh');
            }
        },
        fixtab: function (item, title, index, target) {
            var tab = $(target).tabs('getTab', index);
            $(target).tabs('update', { tab: tab, options: { closable: false } });


            var minIndex = $.fn.tabs.defaults.customAttr.fixedtabs.length;
            resortTabs(target, minIndex, index, true);
        },
        unfixtab: function (item, title, index, target) {
            var maxIndex = getFixedTabs(target).length - 1;
            var tab = $(target).tabs('getTab', index);
            $(target).tabs('update', { tab: tab, options: { closable: true } });

            resortTabs(target, index, maxIndex);

        },
        closetab: function (item, title, index, target) {
            var panelOpts = $(target).tabs('getTab', index).panel('options');
            if (panelOpts.closable) {
                $(target).tabs('close', index);
            }
        },
        closeOthersTab: function (item, titl, index, target) {
            var tabs = $(target).tabs('tabs');
            var panels = $.grep(tabs, function (tab, i) {
                return tab.panel('options').closable && i != index;
            });

            $.each(panels, function () {
                $(target).tabs('close', this.panel('options').title);
            })
        },
        closeRightSideTabs: function (item, title, index, target) {
            var tabs = $(target).tabs('tabs');
            var panels = $.grep(tabs, function (tab, i) {
                return i > index && tab.panel('options').closable;
            });

            $.each(panels, function () {
                $(target).tabs('close', this.panel('options').title);
            });
        },
        closeAll: function (item, title, index, target) {
            var tabs = $(target).tabs('tabs');
            var panels = $.grep(tabs, function (tab, i) {
                return tab.panel('options').closable
            });
            $.each(panels, function () {
                $(target).tabs('close', this.panel('options').title);
            });
        }
    }

    function addEventListener(target, eventName, handler, override) {
        var options = $(target).tabs('options');
        var defaultActionEvent = options[eventName];
        switch (eventName) {
            case 'onLoad':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (panel) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onContextMenu':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (e, title, index) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            default:
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (title, index) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
        }
    }

    $.fn.tabs.defaults.customAttr = {
        fixedtabs: [0],
        contextMenu: {
            isShow: false,
            isMerge: true,
            items: []
        }
    };


    var defaultMethods = $.extend({}, $.fn.tabs.methods);

    $.extend($.fn.tabs.methods, {
        followCustomHandle: function (jq) {
            return jq.each(function () {
                initContextMenu(this);
            });
        },
        /**
        *
        * @param jq
        * @param options
        *        1、除原有属性外，再扩展如下属性：
        *          useiframe:  是否使用iframe加载远程页面。值：true|false
        *          showMask:   是否显示遮罩。 值true|false
        *          loadMsg:    加载提示信息。
        *          css:        设置panel样式。 其值Object，例如：{padding: '2px'}
        *        注意：showMask 和 loadMsg 属性当 useiframe=true 时生效。
        *
        *        2、增强content属性，支持url前缀，自动识别加载页面。
        * @returns {*}
        */
        add: function (jq, options) {
            return jq.each(function () {
                var url = null;
                if (options.href || /^url:/.test(options.content)) {
                    url = options.href || options.content.substr(4, options.content.length);
                    delete options.content;
                    delete options.href;
                }


                if (url) {
                    if (options.useiframe) {
                        defaultMethods.add(jq, options);
                        appendIframeToTab(this, options.title, url, options.showMask, options.loadMsg);
                    } else {
                        defaultMethods.add(jq, $.extend(options, { href: url }));
                    }
                } else {
                    defaultMethods.add(jq, options);
                }

                if (options.css) {
                    $(this).tabs('getTab', options.title).css(options.css);
                }
            });
        },
        addEventListener: function (jq, param) {
            return jq.each(function () {
                var eventList = $.isArray(param) ? param : [param];
                var target = this;
                $.each(eventList, function (i, event) {
                    addEventListener(target, event.name, event.handler || function () { }, event.override);
                });
            });
        }
    });
})(jQuery);
//panel extend
(function ($) {
    function initToolbar(target) {
        var options = $.extend(true, {}, $.fn.panel.defaults, $(target).panel('options'));
        var toolbar = options.customAttr.toolbar;
        if (!toolbar) return;

        var body = $(target).panel('body');
        if (typeof toolbar == 'string') {
            $(toolbar).addClass('dialog-toolbar panel-body').insertBefore(body);
            $(toolbar).show();
        } else {
            var tb = $('<div></div>').insertBefore(body);
            tb.toolbar(toolbar);
        }
    }

    function addEventListener(target, eventName, handler, override) {
        var options = $(target).panel('options');
        var defaultActionEvent = options[eventName];
        switch (eventName) {
            case 'onResize':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (width, height) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onMove':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (left, top) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            default:
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function () {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
        }
    }

    $.fn.panel.defaults.customAttr = {
        toolbar: {
            buttonPosition: 'left',
            data: undefined
        }
    };

    $.extend($.fn.panel.methods, {
        followCustomHandle: function (jq) {
            return jq.each(function () {
                initToolbar(this);
            });
        },
        addEventListener: function (jq, param) {
            return jq.each(function () {
                var eventList = $.isArray(param) ? param : [param];
                var target = this;
                $.each(eventList, function (i, event) {
                    addEventListener(target, event.name, event.handler || function () { }, event.override);
                });
            });
        }
    });
})(jQuery);
//tree extend
(function ($) {
    function getContextMenuId(target) {
        return $(target).attr('id') + '_contextmenu';
    }

    function buildContextMenu(target, menuitems) {
        var menuid = getContextMenuId(target);
        var contextmenu = $('#' + menuid);
        if (contextmenu.length == 0) {
            contextmenu = $('<div>', { id: menuid }).menu();
            contextmenu.menu('appendItems', menuitems);
        }
        return contextmenu;
    }

    function getMenuItemOnClickHandler(menuitems) {
        var onclickHandler = {};

        $.each(menuitems, function () {
            var item = this;
            if (item.onclick) {
                var index = item.id || item.text;
                onclickHandler[index] = item.onclick;
                delete item.onclick;
            }

            if (item.submenu && $.isArray(item.submenu) && item.submenu.length > 0) {
                $.extend(onclickHandler, getMenuItemOnClickHandler(item.submenu));
            }
        });

        return onclickHandler;
    }

    function getDefaultContextMenuItems(target) {
        var menuid = getContextMenuId(target);
        return [
            { id: menuid + '_moveup', text: '位置上移', iconCls: 'icon-moveup', onclick: $.fn.tree.contextmenu.defaultEvents.moveup },
            { id: menuid + '_movedown', text: '位置下移', iconCls: 'icon-movedown', onclick: $.fn.tree.contextmenu.defaultEvents.movedown }
        ];
    }

    function initContextMenu(target) {
        var opts = $.extend(true, {}, $.fn.tree.defaults, $(target).tree('options'));
        var menuOpts = opts.customAttr.contextMenu;
        if (!menuOpts.isShow) return;

        var menuitems = getDefaultContextMenuItems(target);
        if (menuOpts.isMerge && $.isArray(menuOpts.items) && menuOpts.items.length > 0) {
            menuitems = $.merge(menuitems, menuOpts.items);
        }

        if (!menuOpts.isMerge && $.isArray(menuOpts.items) && menuOpts.items.length > 0) {
            menuitems = menuOpts.items;
        }

        var onClickHandlerCache = getMenuItemOnClickHandler(menuitems);
        var contextmenu = buildContextMenu(target, menuitems);

        $(target).tree('addEventListener', {
            name: 'onContextMenu',
            handler: function (e, node) {
                e.preventDefault();

                $(target).tree('select', node.target);
                contextmenu.menu('addEventListener', {
                    name: 'onClick',
                    override: true,
                    handler: function (item) {
                        var name = item.id || item.text;
                        if (onClickHandlerCache[name]) {
                            onClickHandlerCache[name].call(this, item, node, target);
                        }
                    }
                }).menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            }
        });
    }

    function getPrevNode(target, node) {
        var nodeTag = node.id || node.text;
        var parent = $(target).tree('getParent', node.target);
        var children = getChildren(target, parent.target, false);
        var prevNodeIndex = -1;
        for (var i = 0, len = children.length; i < len; i++) {
            var childrenTag = children[i].id || children[i].text;
            if (nodeTag == childrenTag) {
                prevNodeIndex = i - 1;
                break;
            }
        }

        if (prevNodeIndex > -1) {
            return children[prevNodeIndex];
        }
        return null;
    }

    function getNextNode(target, node) {
        var nodeTag = node.id || node.text;
        var parent = $(target).tree('getParent', node.target);
        var children = getChildren(target, parent.target, false);
        var nextNodeIndex = -1;
        for (var i = 0, len = children.length; i < len; i++) {
            var childrenTag = children[i].id || children[i].text;
            if (nodeTag == childrenTag) {
                nextNodeIndex = i + 1;
                break;
            }
        }

        if (nextNodeIndex > -1 && nextNodeIndex < children.length) {
            return children[nextNodeIndex];
        }
        return null;
    }

    function getChildren(target, nodeTarget, isAll) {
        if (isAll) {
            return $(target).tree('getChildren', nodeTarget);
        } else {
            var children = [];
            $(nodeTarget).next().find('>li>div.tree-node').each(function () {
                children.push($(target).tree('getNode', this));
            });

            return children;
        }
    }


    function expandHandler(target) {
        var options = $.extend(true, {}, $.fn.tree.defaults, $(target).tree('options'));
        if (!options.customAttr.expandOnNodeClick && !options.customAttr.expandOnDblClick) return;


        if (options.customAttr.expandOnNodeClick) {
            $(target).tree('addEventListener', {
                name: 'onClick',
                handler: function (node) {
                    $(target).tree('toggle', node.target);
                }
            });

            return;
        }

        if (options.customAttr.expandOnDblClick) {
            $(target).tree('addEventListener', {
                name: 'onDblClick',
                handler: function (node) {
                    $(target).tree('toggle', node.target);
                }
            });
        }

    }

    function getLevel(target, node) {
        //        var p = $(node.target).parentsUntil('ul.tree', 'ul');
        //        return p.length + 1;

        var n = 1;
        var parentNode = $(target).tree('getParent', node.target);
        if (!parentNode) {
            return 1;
        }
        return n + getLevel(target, parentNode);
    }

    function expandTo(target, level, node) {
        var nodes = node ? [node] : $(target).tree('getRoots');
        for (var i = 0; i < nodes.length; i++) {
            var children = getChildren(target, nodes[i].target, false);
            for (var j = 0; j < children.length; j++) {
                $(target).tree('expandTo', children[j].target);
            }

            level--;
            if (level > 0) {
                for (var j = 0; j < children.length; j++) {
                    expandTo(target, level, children[j]);
                }
            }
        }
    }

    function onlyNodeExpandHandler(target) {
        var options = $.extend(true, {}, $.fn.tree.defaults, $(target).tree('options'));
        if (!options.customAttr.onlyNodeExpand) return;

        $(target).tree('addEventListener', {
            name: 'onBeforeExpand',
            handler: function (node) {
                var parent = $(target).tree('getParent', node.target);
                if (parent) {
                    var children = getChildren(target, parent.target, false);
                    for (var i = 0; i < children.length; i++) {
                        if (children[i].state == 'open') {
                            $(target).tree('collapseAll', children[i].target);
                        }
                    }
                } else {
                    $(target).tree('collapseAll');
                }
            }
        });
    }

    function addEventListener(target, eventName, handler, override) {
        var options = $(target).tree('options');
        var defaultActionEvent = options[eventName];
        switch (eventName) {
            case 'onBeforeLoad':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (node, param) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onLoadSuccess':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (node, data) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onLoadError':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (arguments) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onBeforeCheck':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (node, checked) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onCheck':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (node, checked) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onContextMenu':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (e, node) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onDragEnter':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (target, source) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onDragOver':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (target, source) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onDragLeave':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (target, source) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onBeforeDrop':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (target, source, point) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onDrop':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (target, source, point) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            default:
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (node) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
        }
    }

    function appendAttibutes(node, attributes) {
        if (!node['attributes']) {
            node['attributes'] = {};
        }

        for (var i = 0; i < attributes.length; i++) {
            node['attributes'][attributes[i]] = node[attributes[i]];
        }
    }

    function isTransfrom(options) {
        var flag = options.idField ||
            options.textField ||
            options.iconField ||
            options.childrenField ||
            options.attributesField ||
            options.attributes || false;

        return flag ? true : false;
    }

    function simpleDataTransform(options, data) {
        if (!isTransfrom(options)) return data;

        var idField = options.idField || 'id',
            textField = options.textField || 'text',
            iconField = options.iconField || 'iconCls',
            parentField = options.parentField || 'pid',
            attributes = options.attributes || [];

        var treeData = [], tmpMap = [];

        for (var i = 0, len = data.length; i < len; i++) {
            tmpMap[data[i][idField]] = data[i];
        }

        for (var i = 0, len = data.length; i < len; i++) {
            if (tmpMap[data[i][parentField]] && data[i][idField] != data[i][parentField]) {
                if (!tmpMap[data[i][parentField]]['children']) {
                    tmpMap[data[i][parentField]]['children'] = [];
                }

                data[i]['text'] = data[i][textField];
                data[i][iconField] && (data[i]['iconCls'] = data[i][iconField]);
                appendAttibutes(data[i], attributes);
                tmpMap[data[i][parentField]]['children'].push(data[i]);
            } else {
                data[i]['text'] = data[i][textField];
                data[i][iconField] && (data[i]['iconCls'] = data[i][iconField]);
                appendAttibutes(data[i], attributes);
                treeData.push(data[i]);
            }
        }

        return treeData;
    }

    function standardTransform(options, data) {
        if (!isTransfrom(options)) return data;

        var idField = options.idField || 'id',
            textField = options.textField || 'text',
            iconField = options.iconField || 'iconCls',
            childrenField = options.childrenField || 'children',
            attributesField = options.attributesField || 'attributes',
            attributes = options.attributes || [];

        var transform = function (node) {
            if (!node['id'] && node[idField]) node['id'] = node[idField];
            if (!node['text'] && node[textField]) node['text'] = node[textField];
            if (!node['iconCls'] && node[iconField]) node['iconCls'] = node[iconField];
            if (!node['children'] && node[childrenField]) node['children'] = node[childrenField];
            if (!node['attributes'] && node[attributesField]) node['attributes'] = node[attributesField];

            if (attributes && $.isArray(attributes)) {
                appendAttibutes(node, attributes);
            }

            if (node['children']) {
                for (var i = 0; i < node['children'].length; i++) {
                    transform(node['children'][i]);
                }
            }
        }

        for (var i = 0; i < data.length; i++) {
            transform(data[i]);
        }

        return data;
    }


    $.fn.tree.contextmenu = {};
    $.fn.tree.contextmenu.defaultEvents = {
        moveup: function (item, node, target) {
            var options = $.extend(true, {}, $.fn.tree.defaults, $(target).tree('options'));
            var prevnode = getPrevNode(target, node);
            if (prevnode) {
                var nodeData = $(target).tree('pop', node.target);
                $(target).tree('insert', {
                    before: prevnode.target,
                    data: nodeData
                });
                options.customAttr.onAfterMove.call(this, prevnode, node);
            }
        },
        movedown: function (item, node, target) {
            var options = $.extend(true, {}, $.fn.tree.defaults, $(target).tree('options'));
            var nextnode = getNextNode(target, node);
            if (nextnode) {
                var nodeData = $(target).tree('pop', node.target);
                $(target).tree('insert', {
                    after: nextnode.target,
                    data: nodeData
                });
                options.customAttr.onAfterMove.call(this, nextnode, node);
            }
        }
    }


    $.fn.tree.defaults.customAttr = {
        idField: null,
        textField: null,
        parentField: null,
        iconField: null,
        childrenField: null,
        attributesField: null,
        attributes: null,
        dataModel: null,
        /**
        * 单击节点展开收缩
        */
        expandOnNodeClick: false,
        /**
        * 双击节点展开收缩
        */
        expandOnDblClick: false,
        onlyNodeExpand: false,
        contextMenu: {
            isShow: false,
            isMerge: true,
            items: []
        },
        /**
        * 节点位置上、下移动后触发事件
        * @param target    被互换位置的节点对象
        * @param source    当前被操作要改变位置的节点对象
        */
        onAfterMove: function (target, source) { }
    };

    $.fn.tree.defaults.loadFilter = function (data, parent) {
        var cusOptions = $(this).tree('options').customAttr;
        if (cusOptions) {
            if (cusOptions.dataModel == 'simpleData') {
                return simpleDataTransform(cusOptions, data);
            } else {
                return standardTransform(cusOptions, data);
            }
        }
        return data;
    }

    $.fn.combotree.defaults.loadFilter = $.fn.tree.defaults.loadFilter;

    var defaultMethods = $.extend({}, $.fn.tree.methods);

    $.extend($.fn.tree.methods, {
        followCustomHandle: function (jq) {
            return jq.each(function () {
                initContextMenu(this);
                expandHandler(this);
                onlyNodeExpandHandler(this);
            });
        },
        /**
        * 获得节点层级
        */
        getLevel: function (jq, node) {
            return getLevel(jq[0], node);
        },
        expandTo: function (jq, target) {
            return jq.each(function () {
                if ($.type(target) == 'number') {
                    var level = target;
                    expandTo(this, level);
                } else {
                    defaultMethods.expandTo(jq, target);
                }
            });
        },
        addEventListener: function (jq, param) {
            return jq.each(function () {
                var eventList = $.isArray(param) ? param : [param];
                var target = this;
                $.each(eventList, function (i, event) {
                    addEventListener(target, event.name, event.handler || function () { }, event.override);
                });
            });
        }
    });
})(jQuery);
//tree grid extend
(function ($) {
    function getContextMenuId(target, surfix) {
        return $(target).attr('id') + '_' + surfix;
    }

    function buildContextMenu(target, menuitems, type) {
        var menuid = getContextMenuId(target, type);
        var contextmenu = $('#' + menuid);
        if (contextmenu.length == 0) {
            contextmenu = $('<div>', { id: menuid }).menu();
            contextmenu.menu('appendItems', menuitems);
        }
        return contextmenu;
    }

    function getMenuItemOnClickHandler(menuitems) {
        var onclickHandler = {};

        $.each(menuitems, function () {
            var item = this;
            if (item.onclick) {
                var index = item.id || item.text;
                onclickHandler[index] = item.onclick;
                delete item.onclick;
            }

            if (item.submenu && $.isArray(item.submenu) && item.submenu.length > 0) {
                $.extend(onclickHandler, getMenuItemOnClickHandler(item.submenu));
            }
        });

        return onclickHandler;
    }


    function getDefaultContextMenuItems(target) {
        var menuid = getContextMenuId(target, 'rowContextMenu');
        return [
            {
                id: menuid + '_delete',
                text: '删除',
                iconCls: 'icon-remove',
                onclick: $.fn.treegrid.headerContextMenu.defaultEvents.doRemove
            },
            '-',
            {
                id: menuid + '_reload',
                text: '刷新',
                iconCls: 'icon-reload',
                onclick: $.fn.treegrid.headerContextMenu.defaultEvents.doReload
            }
        ];
    }

    function initContextMenu(target) {
        var options = $.extend(true, {}, $.fn.treegrid.defaults, $(target).treegrid('options'));
        var menuOpts = options.customAttr.contextMenu;
        if (!menuOpts.isShow) return;

        var menuitems = getDefaultContextMenuItems(target);
        if (menuOpts.isMerge && $.isArray(menuOpts.items) && menuOpts.items.length > 0) {
            $.merge(menuitems, menuOpts.items);
        }

        if (!menuOpts.isMerge && $.isArray(menuOpts.items) && menuOpts.items.length > 0) {
            menuitems = menuOpts.items;
        }

        var onClickHandlerCache = getMenuItemOnClickHandler(menuitems);
        var contextmenu = buildContextMenu(target, menuitems, 'rowContextMenu');

        $(target).treegrid('addEventListener', {
            name: 'onContextMenu',
            handler: function (e, row) {
                e.preventDefault();
                $(target).treegrid('select', row[options.idField]);

                var menuOptions = contextmenu.menu('options');
                menuOptions.onClickCallback = menuOptions.onClickCallback || menuOptions.onClick;

                contextmenu.menu('addEventListener', {
                    name: 'onClick',
                    override: true,
                    handler: function (item) {
                        var name = item.id || item.text;
                        if (onClickHandlerCache[name]) {
                            onClickHandlerCache[name].call(this, item, row, target);
                        }
                    }
                }).menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            }
        });
    }

    function getDefaultHeaderContextMenuItems(target) {
        var menuid = getContextMenuId(target, 'headerContextMenu');
        var defaultMenuItems = [{
            text: '显示/隐藏列',
            iconCls: 'icon-columns',
            submenu: [{
                id: menuid + '_showAll',
                text: '全部显示',
                iconCls: 'icon-columns',
                onclick: function (item, field, datagrid) {
                    $.fn.datagrid.headerContextMenu.defaultEvents.doShowAll(datagrid);
                }
            }, {
                id: menuid + '_restore',
                text: '还原',
                iconCls: 'icon-columns',
                onclick: function (item, field, datagrid) {
                    $.fn.datagrid.headerContextMenu.defaultEvents.doRestore(datagrid);
                }
            },
            '-']
        }];


        var getFieldFromMenuItemId = function (id) {
            return id.substr(id.lastIndexOf('_') + 1, id.length);
        }

        var columnFieldsItem = [];
        var columnFields = $(target).treegrid('getColumnFields');
        var treeField = $(target).treegrid('options').treeField;
        $.each(columnFields, function (i, field) {
            if (!field) return true;

            var disabled = field == treeField ? true : false;
            var columnOption = $(target).treegrid('getColumnOption', field);
            columnOption._hidden = columnOption.hidden;

            columnFieldsItem.push({
                id: menuid + '_' + field,
                text: columnOption.title,
                iconCls: columnOption.hidden ? 'icon-unchecked' : 'icon-checked',
                disabled: disabled,
                onclick: function (item, fd, dg) {
                    var field = getFieldFromMenuItemId(item.id);
                    var hidden = $(dg).treegrid('getColumnOption', field).hidden;
                    if (!hidden) {
                        $.fn.datagrid.headerContextMenu.defaultEvents.doHideColumn(dg, field, item);
                    } else {
                        $.fn.datagrid.headerContextMenu.defaultEvents.doShowColumn(dg, field, item);
                    }
                }
            });
        });

        $.merge(defaultMenuItems[0].submenu, columnFieldsItem);

        return defaultMenuItems;
    }

    function initHeaderContextMenu(target) {
        var options = $.extend(true, {}, $.fn.treegrid.defaults, $(target).treegrid('options'));
        var headerContentMenuOptions = options.customAttr.headerContextMenu;
        if (!headerContentMenuOptions.isShow) return;

        var menuitems = getDefaultHeaderContextMenuItems(target);
        if (headerContentMenuOptions.isMerge) {
            $.merge(menuitems, headerContentMenuOptions.items);
        }

        if (!headerContentMenuOptions.isMerge &&
                $.isArray(headerContentMenuOptions.items) &&
                    headerContentMenuOptions.items.length > 0) {
            menuitems = headerContentMenuOptions.items;
        }


        var onClickHandlerCache = getMenuItemOnClickHandler(menuitems);
        var headerContextMenu = buildContextMenu(target, menuitems, 'headerContextMenu');

        $(target).treegrid('addEventListener', {
            name: 'onHeaderContextMenu',
            handler: function (e, field) {
                e.preventDefault();
                headerContextMenu.menu('addEventListener', {
                    name: 'onClick',
                    override: true,
                    handler: function (item) {
                        var name = item.id || item.text;
                        if (onClickHandlerCache[name]) {
                            onClickHandlerCache[name].call(this, item, field, target);
                        }
                    }
                }).menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            }
        });
    }

    function expandHandle(target) {
        var options = $.extend(true, {}, $.fn.treegrid.defaults, $(target).treegrid('options'));
        if (!options.customAttr.expandOnNodeClick && !options.customAttr.expandOnDblClick) return;


        var treeField = options.treeField;
        var idField = options.idField;
        if (options.customAttr.expandOnNodeClick) {
            $(target).treegrid('addEventListener', {
                name: 'onClickCell',
                handler: function (field, row) {
                    if (treeField == field) {
                        $(target).treegrid('toggle', row[idField]);
                    }
                }
            });

            return;
        }

        if (options.customAttr.expandOnDblClick) {
            $(target).treegrid('addEventListener', {
                name: 'onDblClickCell',
                handler: function (field, row) {
                    if (treeField == field) {
                        $(target).treegrid('toggle', row[idField]);
                    }
                }
            });
        }
    }

    function registRowEditingHandler(target) {
        var options = $.extend(true, {}, $.fn.treegrid.defaults, $(target).treegrid('options'));
        if (!options.customAttr.rowediting) return;

        var getEditorButtonsPanelId = function (target) {
            return $(target).attr('id') + '_editor_buttons_panel';
        }

        var deltaX = 120;
        var buildEditorButtonsPanel = function (target) {
            var panelId = getEditorButtonsPanelId(target);
            if ($('#' + panelId).length > 0) return;

            var panel = $(target).treegrid('getPanel');
            var datagrid_body = $('>div.datagrid-view>div.datagrid-view2>div.datagrid-body', panel);
            datagrid_body.css('position', 'relative');

            var edtBtnPanel = $('<div>', { id: panelId })
                .addClass('dialog-button')
                .appendTo(datagrid_body)
                .css({
                    'position': 'absolute',
                    'display': 'block',
                    'border-bottom': '1px solid #ddd',
                    'border-left': '1px solid #ddd',
                    'border-right': '1px solid #ddd',
                    'left': parseInt(panel.width() / 2) - deltaX,
                    'z-index': 2013,
                    'display': 'none',
                    'padding': '4px 5px'
                });


            $('<a href="javascript:void(0)">确定</a>')
                .css('margin-left', '0px')
                .linkbutton({ iconCls: 'icon-ok' })
                .click(function () {
                    var idField = options.idField;
                    var editingRow = $(target).treegrid('getEditingRow');
                    if (!options.customAttr.onConfirmEdit.call(target, editingRow)) return;
                    $(target).treegrid('endEdit', editingRow[idField]);
                })
                .appendTo(edtBtnPanel);

            $('<a href="javascript:void(0)">取消</a>')
                .css('margin-left', '6px')
                .linkbutton({ iconCls: 'icon-cancel' })
                .click(function () {
                    var idField = options.idField;
                    var editingRow = $(target).treegrid('getEditingRow');
                    $(target).treegrid('cancelEdit', editingRow[idField]);
                })
                .appendTo(edtBtnPanel);
        }

        var showEditorButtonsPanel = function (target, row) {
            var idField = options.idField;
            var tr = options.finder.getTr(target, row[idField], "body", 2);
            var position = tr.position();

            var edtBtnPanelId = '#' + getEditorButtonsPanelId(target);
            var panel = $(target).treegrid('getPanel');
            var datagrid_body = $('>div.datagrid-view>div.datagrid-view2>div.datagrid-body', panel);

            var fixPosition = function () {
                var trHeight = tr.height(), trWidth = tr.width();
                var top = position.top + datagrid_body.scrollTop(), left = position.left;
                var delta = 11;

                if (trWidth > datagrid_body.width()) {
                    left = datagrid_body.width() / 2 - deltaX;
                } else {
                    left = trWidth / 2 - deltaX;
                }

                if (position.top + (trHeight * 2 + delta) > datagrid_body.height()) {
                    top = top - (trHeight + delta)
                } else {
                    top = top + trHeight;
                }

                return { top: top, left: left };
            }


            $(edtBtnPanelId).css(fixPosition()).show();
        }

        var hideEditorButtonsPanel = function (target) {
            var edtBtnPanelId = '#' + getEditorButtonsPanelId(target);
            $(edtBtnPanelId).hide();
        }

        $(target).treegrid('addEventListener', [{
            name: 'onLoadSuccess',
            handler: function (row, data) {
                buildEditorButtonsPanel(this);
            }
        }, {
            name: 'onBeforeEdit',
            handler: function (row) {
                showEditorButtonsPanel(target, row);
            }
        }, {
            name: 'onAfterEdit',
            handler: function (row, changes) {
                hideEditorButtonsPanel(target);
            }
        }, {
            name: 'onCancelEdit',
            handler: function (row) {
                hideEditorButtonsPanel(target);
            }
        }]);

    }


    function buildTooltip(target) {
        var options = $.extend(true, {}, $.fn.treegrid.defaults, $(target).treegrid('options'));
        if (!options.customAttr.tooltip.enable) return;

        var showTooltip = function (target, opts) {
            var initOptions = {
                position: options.customAttr.tooltip.position,
                trackMouse: true,
                onHide: function () {
                    $(target).tooltip('destroy');
                },
                onShow: function () {
                    if ($.isPlainObject(opts) && opts.css) {
                        $(this).tooltip('tip').css(opts.css);
                    }
                }
            };

            $.extend(initOptions, $.isPlainObject(opts) ? opts : { content: opts });

            $(target).tooltip(initOptions).tooltip('show');
        }


        var bindRow = function (tr, formatter) {
            var nodeid = $(tr).attr('node-id');
            var node = $(target).treegrid('find', nodeid);
            var getDefaultContent = function (node) {
                var result = [];
                //排除没有设置field的column
                var fields = $.grep(
                    $.merge($(target).treegrid('getColumnFields', true),
                    $(target).treegrid('getColumnFields')),
                    function (n, i) {
                        return $.trim(n).length > 0;
                    });

                $.each(fields, function () {
                    var field = this;
                    var title = $(target).treegrid('getColumnOption', field).title;
                    result.push(title + ': ' + node[field]);
                });

                return result.join('<br>');
            }
            var content = formatter ? formatter(nodeid, node) : getDefaultContent(node);
            $(tr).mouseover(function () {
                showTooltip(this, content);
            });
        }

        var bindCell = function (cell, formatter) {
            cell.mouseover(function () {
                var nodeid = $(this).parent().attr('node-id');
                var node = $(target).treegrid('find', nodeid);
                var field = $(this).attr('field');
                var value = node[field];
                var content = formatter ? formatter(value, field, nodeid, node) : value;
                showTooltip(this, content);
            });
        }


        var initTooltip = function () {
            if (options.customAttr.tooltip.target == 'row') {
                options.finder.getTr(target, '', 'allbody').each(function () {
                    if ($(this).hasClass('datagrid-row')) {
                        bindRow(this, options.customAttr.tooltip.formatter);
                    }
                });
            } else {
                if (options.customAttr.tooltip.fields &&
                    $.isArray(options.customAttr.tooltip.fields)) {
                    var panel = $(target).treegrid('getPanel');
                    var datagrid_body = $('>div.datagrid-view>div.datagrid-view2>div.datagrid-body', panel);
                    $.each(options.customAttr.tooltip.fields, function () {
                        var field = this;
                        bindCell($('td[field=' + field + ']', datagrid_body), options.customAttr.tooltip.formatter);
                    });
                }
            }
        }

        $(target).treegrid('addEventListener', {
            name: 'onLoadSuccess',
            handler: function (row, data) {
                initTooltip();
            }
        });
    }

    function addEventListener(target, eventName, handler, override) {
        var options = $(target).treegrid('options');
        var defaultActionEvent = options[eventName];
        switch (eventName) {
            case 'onClickRow':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (row) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onDblClickRow':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (row) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onClickCell':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (field, row) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onDblClickCell':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (field, row) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onBeforeLoad':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (row, param) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onLoadSuccess':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (row, data) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onLoadError':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (arguments) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onBeforeExpand':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (row) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onExpand':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (row) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onBeforeCollapse':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (row) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onCollapse':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (row) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onContextMenu':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (e, row) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onBeforeEdit':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (row) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onAfterEdit':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (row, changes) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onCancelEdit':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (row) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            default:
                $(target).datagrid('addEventListener', {
                    name: eventName,
                    override: override,
                    handler: handler
                });
                break;
        }
    }

    $.fn.treegrid.headerContextMenu = {};
    $.fn.treegrid.headerContextMenu.defaultEvents = {
        doRemove: function (item, row, target) {
            $.messager.confirm('疑问', '您确定要删除已选中的行？', function (r) {
                if (r) {
                    var idField = $(target).treegrid('options').idField;
                    var id = row[idField];
                    $(target).treegrid('remove', id);
                }
            });
        },
        doReload: function (item, row, target) {
            $(target).treegrid('reload');
        }
    }

    $.fn.treegrid.defaults.customAttr = {
        iconField: null,
        parentField: null,
        expandOnNodeClick: false,
        expandOnDblClick: false,
        headerContextMenu: {
            isShow: false,
            isMerge: true,
            items: []
        },
        contextMenu: {
            isShow: false,
            isMerge: true,
            items: []
        },
        rowediting: false,
        /**
        * target: row|cell ,tooltip 的触发对象，默认row
        */
        tooltip: {
            enable: false,
            target: 'row',
            position: 'bottom',
            fields: undefined,
            formatter: undefined
        },
        onConfirmEdit: function (node) { return true }
    }

    $.fn.treegrid.defaults.loadFilter = function (data, parentId) {
        var options = $(this).treegrid('options');
        var cusOtpions = options.customAttr;
        if (cusOtpions && cusOtpions.parentField) {
            var idField = options.idField,
                parentField = cusOtpions.parentField,
                iconField = cusOtpions.iconField || 'icon';

            for (var i = 0, len = data.rows.length; i < len; i++) {
                if (data.rows[i][parentField] && data.rows[i][parentField] != '0' && data.rows[i][idField] != data.rows[i][parentField]) {
                    data.rows[i]['_parentId'] = data.rows[i][parentField];
                } else {
                    delete data.rows[i][parentField];
                }

                data.rows[i]['iconCls'] = data.rows[i][iconField];
            }
        }

        return data;
    }

    $.extend($.fn.treegrid.methods, {
        followCustomHandle: function (jq) {
            return jq.each(function () {
                initHeaderContextMenu(this);
                initContextMenu(this);
                expandHandle(this);
                registRowEditingHandler(this);
                buildTooltip(this);
            });
        },
        getEditingRow: function (jq) {
            var editingRows = jq.treegrid('getEditingRows');
            return editingRows.length ? editingRows[0] : null;
        },
        getEditingRows: function (jq) {
            var options = jq.treegrid('options');
            var editingRow = [];
            options.finder.getTr(jq[0], "", "allbody").each(function () {
                if ($(this).hasClass('datagrid-row-editing')) {
                    var nodeid = $(this).attr('node-id');
                    editingRow.push(jq.treegrid('find', nodeid));
                }
            });

            return editingRow;
        },
        addEventListener: function (jq, param) {
            return jq.each(function () {
                var eventList = $.isArray(param) ? param : [param];
                var target = this;
                $.each(eventList, function (i, event) {
                    addEventListener(target, event.name, event.handler || function () { }, event.override);
                });
            });
        }
    });
})(jQuery);
//combo extend
(function ($) {

    function showHeaderValue(target) {
        var optioins = $.data(target, 'combo').options;
        var opts = $.extend(true, {}, $.fn.combo.defaults, optioins);
        if (!opts.customAttr.headervalue) return;

        if (optioins.required) {
            var validType = ['unequal["' + opts.customAttr.headervalue + '"]'];
            if (optioins.validType) {
                if (typeof optioins.validType == 'string') {
                    validType.push(optioins.validType);
                    optioins.validType = validType;
                }

                if ($.isArray(optioins.validType)) {
                    $.merge(optioins.validType, validType)
                }
            } else {
                $.extend(optioins, { validType: validType });
            }
        }

        $(target).combo('addEventListener', {
            name: 'onChange',
            handler: function (newValue, oldValue) {
                if (newValue == null || newValue == '') $(target).combo('setText', opts.customAttr.headervalue);
            }
        }).combo('textbox')
            .val(opts.customAttr.headervalue)
            .attr('prompt', opts.customAttr.headervalue)
            .focus(function () {
                if ($(this).val() == opts.customAttr.headervalue) $(this).val('');
            })
            .blur(function () {
                if ($.trim($(this).val()) == '') $(this).val(opts.customAttr.headervalue);
                $(target).combo('validate');
            });
    }

    /**
    * 重写clear方法，目的是为了触发onChange事件，原生clear不触发onChange事件
    * @param target
    */
    function clear(target) {
        var value = $(target).combo('getValue');
        if (!value) return;

        var options = $.data(target, "combo").options;
        $(target).combo('setText', '');
        if (options.multiple) {
            $(target).combo('setValues', []);
        } else {
            $(target).combo('setValue', '');
        }
    }

    function getValue(target) {
        var values = $(target).combo('getValues');
        return values.length > 0 ? (values[0] != '' ? values[0] : null) : null;
    }

    function autocompleteHandle(target) {
        var optioins = $.extend(true, {}, $.fn.combo.defaults, $.data(target, 'combo').options);
        var autocompleteOpts = optioins.customAttr.autocomplete;
        if (!autocompleteOpts.enabled) return;

        $(target).combo('textbox').keyup(function (e) {
            if ($(this).val().length != 0 && ($(this).val().length % autocompleteOpts.minLength == 0) && autocompleteOpts.url) {
                $.ajax({
                    type: 'POST',
                    url: autocompleteOpts.url,
                    data: { wd: $(this).val() },
                    dataType: 'json',
                    success: function (data) {
                        var panel = $(target).combo('panel').empty();
                        for (var i = 0; i < data.length; i++) {
                            $('<div>').addClass('combobox-item')
                                .attr('value', data[i].id)
                                .text(data[i].text)
                                .click(function (e) {
                                    var v = $(this).attr('value');
                                    var s = $(this).text();
                                    $(target).combo('setValue', v).combo('setText', s).combo('hidePanel');
                                })
                                .hover(function () {
                                    $(this).addClass('combobox-item-hover');
                                }, function () {
                                    $(this).removeClass('combobox-item-hover');
                                })
                                .appendTo(panel);
                        }

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $.messager.alert('Error', errorThrown, 'error');
                    }
                });
            }
        });

    }

    function addEventListener(target, eventName, handler, override) {
        var options = $(target).combo('options');
        var defaultActionEvent = options[eventName];
        switch (eventName) {
            case 'onShowPanel':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function () {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onHidePanel':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function () {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onChange':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (newValue, oldValue) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            default:
                break;
        }
    }

    $.fn.combo.defaults.customAttr = {
        headervalue: null,
        autocomplete: {
            enabled: false,
            minLength: 3,
            url: undefined
        }
    };

    $.extend($.fn.combo.methods, {
        followCustomHandle: function (jq) {
            return jq.each(function () {
                showHeaderValue(this);
                autocompleteHandle(this);
            });
        }
        , clear: function (jq) {
            return jq.each(function () {
                clear(this);
            });
        }
        , getValue: function (jq) {
            return getValue(jq[0]);
        },
        addEventListener: function (jq, param) {
            return jq.each(function () {
                var eventList = $.isArray(param) ? param : [param];
                var target = this;
                $.each(eventList, function (i, event) {
                    addEventListener(target, event.name, event.handler || function () { }, event.override);
                });
            });
        }
    });
})(jQuery);
//combobox extend
(function ($) {
    function slaveHandle(target) {
        var optioins = $.extend(true, {}, $.fn.combobox.defaults, $(target).combobox('options'));
        var slaveOptions = optioins.customAttr.slave;
        if (slaveOptions.id == null) return;
        if (/^#/.test(slaveOptions.id)) {
            slaveOptions.id = slaveOptions.id;
        } else {
            slaveOptions.id = '#' + slaveOptions.id;
        }


        if (!optioins.multiple && !optioins.editable) {

            $(target).combobox('addEventListener', [{
                name: 'onSelect',
                handler: function (record) {
                    loadSlaveData(target, slaveOptions, record, optioins.valueField);
                }
            }, {
                name: 'onChange',
                handler: function (newValue, oldValue) {
                    if (newValue == null || newValue == '') {
                        $(slaveOptions.id).combobox('clear').combobox('loadData', []);
                        $(target).combobox('textbox').trigger('blur');
                    }
                }
            }]);
        }

    }

    function loadSlaveData(target, slaveOpts, record, valueField) {
        if (slaveOpts.remote) {
            var url = slaveOpts.url || $(slaveOpts.id).combobox('options').url;
            if (url.indexOf("?") > -1) {
                url += '&swd=' + record[valueField];
            } else {
                url += '?swd=' + record[valueField];
            }
            $(slaveOpts.id).combobox('clear').combobox('reload', url);
        } else {
            $(slaveOpts.id).combobox('clear').combobox('loadData', record.data);
        }
    }

    function fixShowHeaderValue(target) {
        var optioins = $(target).combobox('options');
        var opts = $.extend(true, {}, $.fn.combobox.defaults, optioins);
        if (!opts.customAttr.headervalue) return;

        $(target).combobox('addEventListener', {
            name: 'onLoadSuccess',
            handler: function () {
                $(target).combobox('textbox').trigger('blur');
            }
        });
    }

    function addEventListener(target, eventName, handler, override) {
        var options = $(target).combobox('options');
        var defaultActionEvent = options[eventName];
        switch (eventName) {
            case 'onBeforeLoad':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (param) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onLoadSuccess':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function () {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onLoadError':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function () {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onSelect':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (record) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onUnselect':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (record) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            default:
                $(target).combo('addEventListener', {
                    name: eventName,
                    override: override,
                    handler: handler
                });
                break;
        }
    }


    $.fn.combobox.defaults.customAttr = {
        slave: {
            id: null,
            remote: true,
            url: null
        }
    };


    $.extend($.fn.combobox.methods, {
        followCustomHandle: function (jq) {
            return jq.each(function () {
                fixShowHeaderValue(this);
                slaveHandle(this);
                $(this).combo('followCustomHandle');
            });
        },
        addEventListener: function (jq, param) {
            return jq.each(function () {
                var eventList = $.isArray(param) ? param : [param];
                var target = this;
                $.each(eventList, function (i, event) {
                    addEventListener(target, event.name, event.handler || function () { }, event.override);
                });
            });
        },
        getSelected: function (jq) {
            var options = jq.combobox('options');
            var key = options.valueField;
            var value = jq.combobox('getValue');
            var data = jq.combobox('getData');

            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (item[key] == value) {
                    return item;
                }
            }

            return null;
        }
    });
})(jQuery);
//combotree extend
(function ($) {
    $.extend($.fn.combotree.methods, {
        followCustomHandle: function (jq) {
            return jq.each(function () {
                $(this).combotree('tree').tree('followCustomHandle');
                $(this).combo('followCustomHandle');
            });
        }
    });
})(jQuery);
//combogrid extend
(function ($) {

    $.extend($.fn.combogrid.methods, {
        getSelected: function (jq) {
            return jq.combogrid('grid').datagrid('getSelected');
        }
    });
})(jQuery);
//datagrid extend
(function ($) {
    function buildContextMenu(target, menuitems, type) {
        var menuid = getContextMenuId(target, type);
        var contextmenu = $('#' + menuid);
        if (contextmenu.length == 0) {
            contextmenu = $('<div>', { id: menuid }).menu().menu('appendItems', menuitems);
        }
        return contextmenu;
    }

    function getContextMenuId(target, surfix) {
        return $(target).attr('id') + '_' + surfix;
    }

    function getMenuItemOnClickHandler(menuitems) {
        var onclickHandler = {};

        $.each(menuitems, function () {
            var item = this;
            if (item.onclick) {
                var index = item.id || item.text;
                onclickHandler[index] = item.onclick;
                delete item.onclick;
            }

            if (item.submenu && $.isArray(item.submenu) && item.submenu.length > 0) {
                $.extend(onclickHandler, getMenuItemOnClickHandler(item.submenu));
            }
        });

        return onclickHandler;
    }

    function getDefaultHeaderContextMenuItems(target) {
        var menuid = getContextMenuId(target, 'headerContextMenu');
        var defaultMenuItems = [{
            text: '显示/隐藏列',
            iconCls: 'icon-columns',
            submenu: [{
                id: menuid + '_showAll',
                text: '全部显示',
                iconCls: 'icon-columns',
                onclick: function (item, field, datagrid) {
                    $.fn.datagrid.headerContextMenu.defaultEvents.doShowAll(datagrid);
                }
            }, {
                id: menuid + '_restore',
                text: '还原',
                iconCls: 'icon-columns',
                onclick: function (item, field, datagrid) {
                    $.fn.datagrid.headerContextMenu.defaultEvents.doRestore(datagrid);
                }
            },
            '-']
        }];
        //        ,'-',{
        //            id: menuid + '_freezeColumn',
        //            text: '冻结此列',
        //            iconCls: 'icon-lock',
        //            disabled: true,
        //            onclick: function(item, field, datagrid){
        //                $.fn.datagrid.headerContextMenu.defaultEvents.freezeColumn(datagrid, field, item, true);
        //            }
        //        },{
        //            id: menuid + '_unfreezeColumn',
        //            text: '取消冻结',
        //            iconCls: 'icon-unlock',
        //            disabled: true,
        //            onclick: function(item, field, datagrid){
        //                $.fn.datagrid.headerContextMenu.defaultEvents.unfreezeColumn(datagrid, field, item);
        //            }
        //        }


        var getFieldFromMenuItemId = function (id) {
            return id.substr(id.lastIndexOf('_') + 1, id.length);
        }

        var columnFieldsItem = [];
        var frozenCloumnFields = $(target).datagrid('getColumnFields', true);
        var columnFields = $(target).datagrid('getColumnFields');
        //        columnSubMenuHandle(frozenCloumnFields, true);
        columnSubMenuHandle(columnFields, false);

        function columnSubMenuHandle(columnFields, disabled) {
            $.each(columnFields, function (i, field) {
                if (!field || field == 'ck') return true;
                var columnOption = $(target).datagrid('getColumnOption', field);
                columnOption._hidden = columnOption.hidden;

                columnFieldsItem.push({
                    id: menuid + '_' + field,
                    text: columnOption.title,
                    disabled: disabled,
                    iconCls: columnOption.hidden ? 'icon-unchecked' : 'icon-checked',
                    onclick: function (item, fd, dg) {
                        var field = getFieldFromMenuItemId(item.id);
                        var hidden = $(dg).datagrid('getColumnOption', field).hidden;
                        if (!hidden) {
                            $.fn.datagrid.headerContextMenu.defaultEvents.doHideColumn(dg, field, item);
                        } else {
                            $.fn.datagrid.headerContextMenu.defaultEvents.doShowColumn(dg, field, item);
                        }
                    }
                });
            });
        }

        $.merge(defaultMenuItems[0].submenu, columnFieldsItem);

        return defaultMenuItems;
    }

    function initHeaderContextMenu(target) {
        var options = $.extend(true, {}, $.fn.datagrid.defaults, $(target).datagrid('options'));
        var headerContentMenuOptions = options.customAttr.headerContextMenu;
        if (!headerContentMenuOptions.isShow) return;

        if (options.columns[0][0].checkbox) {
            options.columns[0][0].field = 'ck';
        }

        var menuitems = getDefaultHeaderContextMenuItems(target);
        if (headerContentMenuOptions.isMerge) {
            $.merge(menuitems, headerContentMenuOptions.items);
        }

        if (!headerContentMenuOptions.isMerge &&
                $.isArray(headerContentMenuOptions.items) &&
                    headerContentMenuOptions.items.length > 0) {
            menuitems = headerContentMenuOptions.items;
        }


        var onClickHandlerCache = getMenuItemOnClickHandler(menuitems);
        var headerContextMenu = buildContextMenu(target, menuitems, 'headerContextMenu');

        $(target).datagrid('addEventListener', {
            name: 'onHeaderContextMenu',
            handler: function (e, field) {
                e.preventDefault();
                headerContextMenu.menu('addEventListener', [{
                    name: 'onClick',
                    override: true,
                    handler: function (item) {
                        var name = item.id || item.text;
                        if (onClickHandlerCache[name]) {
                            onClickHandlerCache[name].call(this, item, field, target);
                        }
                    }
                }, {
                    name: 'onShow',
                    override: true,
                    handler: function () {
                        //                        switchFreezeAndUnfreezeMenuItem(field, target);
                        headerContentMenuOptions.onShow && headerContentMenuOptions.onShow.call(this, field, target);
                    }
                }, {
                    name: 'onHide',
                    override: true,
                    handler: function () {
                        headerContentMenuOptions.onHide && headerContentMenuOptions.onHide.call(this);
                    }
                }]).menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            }
        });
    }

    function getDefaultRowContextMenuItems(target) {
        var menuid = getContextMenuId(target, 'rowContextMenu');
        var defaultMenuItems = [{
            id: menuid + '_delete',
            text: '删除',
            iconCls: 'icon-remove',
            onclick: function (item, rowIndex, rowData, t) {
                $.fn.datagrid.rowContextMenu.defaultEvents.doDelete(item, rowIndex, rowData, t);
            }
        }, '-', {
            id: menuid + '_reload',
            text: '刷新',
            iconCls: 'icon-reload',
            onclick: function (item, rowIndex, rowData, t) {
                $.fn.datagrid.rowContextMenu.defaultEvents.doReload(item, rowIndex, rowData, t);
            }
        }, {
            id: menuid + '_reload_this_page',
            text: '刷新当前页',
            onclick: function (item, rowIndex, rowData, t) {
                $.fn.datagrid.rowContextMenu.defaultEvents.doReloadThisPage(item, rowIndex, rowData, t);
            }
        }]

        return defaultMenuItems;
    }

    function initRowContextMenu(target) {
        var options = $.extend(true, {}, $.fn.datagrid.defaults, $(target).datagrid('options'));
        var rowContentMenuOptions = options.customAttr.rowContextMenu;
        if (!rowContentMenuOptions.isShow) return;

        var menuitems = getDefaultRowContextMenuItems(target);
        if (rowContentMenuOptions.isMerge) {
            $.merge(menuitems, rowContentMenuOptions.items);
        }

        if (!rowContentMenuOptions.isMerge &&
            $.isArray(rowContentMenuOptions.items) &&
                rowContentMenuOptions.items.length > 0) {
            menuitems = rowContentMenuOptions.items;
        }

        var onClickHandlerCache = getMenuItemOnClickHandler(menuitems);
        var rowContextMenu = buildContextMenu(target, menuitems, 'rowContextMenu');

        $(target).datagrid('addEventListener', {
            name: 'onRowContextMenu',
            handler: function (e, rowIndex, rowData) {
                e.preventDefault();
                $(target).datagrid('selectRow', rowIndex);

                rowContextMenu.menu('addEventListener', {
                    name: 'onClick',
                    override: true,
                    handler: function (item) {
                        var name = item.id || item.text;
                        if (onClickHandlerCache[name]) {
                            onClickHandlerCache[name].call(this, item, rowIndex, rowData, target);
                        }
                    }
                }).menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
            }
        });
    }

    function setMasterSlave(target) {
        var options = $.extend(true, {}, $.fn.datagrid.defaults, $(target).datagrid('options'));
        if (!$.isArray(options.customAttr.slaveList)) return;
        if (options.customAttr.slaveList.length == 0) return;

        var slaveOptions = {
            slaveList: options.customAttr.slaveList,
            activeSlave: options.customAttr.activeSlave
        };
        var jq = $(target);

        //{id: 'slave1', params: {name: 'slave1'}}
        var commands = [];
        for (var i in slaveOptions.slaveList) {
            var cmd = {
                id: slaveOptions.slaveList[i].id,
                params: {}
            };

            var relatedfield = {}, relatedfieldName;
            if (!slaveOptions.slaveList[i].relatedfield) {
                relatedfieldName = jq.datagrid('options').idField;
                relatedfield[relatedfieldName] = 'undefined';
            } else {
                relatedfieldName = slaveOptions.slaveList[i].relatedfield;
                relatedfield[slaveOptions.slaveList[i].relatedfield] = 'undefined';
            }

            $.extend(cmd.params, relatedfield, slaveOptions.slaveList[i].queryParams);
            commands.push(cmd);
        }


        if (slaveOptions.activeSlave == $.fn.datagrid.defaults.customAttr.activeSlave) {

            jq.datagrid('addEventListener', {
                name: 'onDblClickRow',
                handler: function (rowIndex, rowData) {
                    for (var j in commands) {
                        commands[j].params[relatedfieldName] = rowData[relatedfieldName];
                        $('#' + commands[j].id).datagrid('load', commands[j].params);
                    }
                }
            });
        }
    }

    function registRowEditingHandler(target) {
        var options = $.extend(true, {}, $.fn.datagrid.defaults, $(target).datagrid('options'));
        if (!options.customAttr.rowediting) return;

        var getEditorButtonsPanelId = function (target) {
            return $(target).attr('id') + '_editor_buttons_panel';
        }

        var deltaX = 120;
        var buildEditorButtonsPanel = function (target) {
            var panelId = getEditorButtonsPanelId(target);
            if ($('#' + panelId).length > 0) return;

            var panel = $(target).datagrid('getPanel');
            var state = $.data(target, 'datagrid');
            var datagrid_body = state.dc.body2;
            datagrid_body.css('position', 'relative');

            var edtBtnPanel = $('<div>', { id: panelId })
                .addClass('dialog-button')
                .appendTo(datagrid_body)
                .css({
                    'position': 'absolute',
                    'display': 'block',
                    'border-bottom': '1px solid #ddd',
                    'border-left': '1px solid #ddd',
                    'border-right': '1px solid #ddd',
                    'left': parseInt(panel.width() / 2) - deltaX,
                    'z-index': 2013,
                    'display': 'none',
                    'padding': '4px 5px'
                });

            $('<a href="javascript:void(0)">确定</a>')
                .css('margin-left', '0px')
                .linkbutton({ iconCls: 'icon-ok' })
                .click(function () {
                    var editIndex = $(target).datagrid('getRowIndex', $(target).datagrid('getEditingRow'));
                    if (!options.customAttr.onConfirmEdit.call(target, editIndex)) return;
                    $(target).datagrid('endEdit', editIndex);
                })
                .appendTo(edtBtnPanel);
            $('<a href="javascript:void(0)">取消</a>')
                .css('margin-left', '6px')
                .linkbutton({ iconCls: 'icon-cancel' })
                .click(function () {
                    var editIndex = $(target).datagrid('getRowIndex', $(target).datagrid('getEditingRow'));
                    $(target).datagrid('cancelEdit', editIndex);
                })
                .appendTo(edtBtnPanel);

        }

        var showEditorButtonsPanel = function (target, index) {
            var opts = $.data(target, "datagrid").options;
            var tr = opts.finder.getTr(target, index, "body", 2);
            var position = tr.position();

            var edtBtnPanelId = '#' + getEditorButtonsPanelId(target);
            var state = $.data(target, 'datagrid');
            var datagrid_body = state.dc.body2;

            var fixPosition = function () {
                var trHeight = tr.height(), trWidth = tr.width();
                var top = position.top + datagrid_body.scrollTop(), left = position.left;
                var delta = 11;

                if (trWidth > datagrid_body.width()) {
                    left = datagrid_body.width() / 2 - deltaX;
                } else {
                    left = trWidth / 2 - deltaX;
                }

                if (position.top + (trHeight * 2 + delta) > datagrid_body.height()) {
                    top = top - (trHeight + delta)
                } else {
                    top = top + trHeight;
                }

                return { top: top, left: left };
            }

            $(edtBtnPanelId).css(fixPosition()).show();
        }

        var hideEditorButtonsPanel = function (target) {
            var edtBtnPanelId = '#' + getEditorButtonsPanelId(target);
            $(edtBtnPanelId).hide();
        }


        $(target).datagrid('addEventListener', [{
            name: 'onLoadSuccess',
            handler: function (data) {
                buildEditorButtonsPanel(this);
            }
        }, {
            name: 'onBeforeEdit',
            handler: function (index, data) {
                buildEditorButtonsPanel(target);
                showEditorButtonsPanel(target, index);
            }
        }, {
            name: 'onAfterEdit',
            handler: function (index, data, changes) {
                hideEditorButtonsPanel(target);
            }
        }, {
            name: 'onCancelEdit',
            handler: function (index, data) {
                hideEditorButtonsPanel(target);
            }
        }]);
    }

    function buildTooltip(target) {
        var options = $.extend(true, {}, $.fn.datagrid.defaults, $(target).datagrid('options'));
        if (!options.customAttr.tooltip.enable) return;

        var showTooltip = function (target, opts) {
            var initOptions = {
                position: options.customAttr.tooltip.position,
                trackMouse: true,
                onHide: function () {
                    $(target).tooltip('destroy');
                },
                onShow: function () {
                    if ($.isPlainObject(opts) && opts.css) {
                        $(this).tooltip('tip').css(opts.css);
                    }
                }
            };

            $.extend(initOptions, $.isPlainObject(opts) ? opts : { content: opts });

            $(target).tooltip(initOptions).tooltip('show');
        }

        var bindRow = function (row, formatter) {
            var rowIndex = parseInt(row.attr('datagrid-row-index'));
            var rowData = $(target).datagrid('getRows')[rowIndex];
            var getDefaultContent = function (rowData) {
                var result = [];
                //排除没有设置field的column
                var fields = $.grep($.merge($(target).datagrid('getColumnFields', true), $(target).datagrid('getColumnFields')), function (n, i) {
                    return $.trim(n).length > 0;
                });
                $.each(fields, function () {
                    var field = this;
                    var title = $(target).datagrid('getColumnOption', field).title;
                    result.push(title + ': ' + rowData[field]);
                });

                return result.join('<br>');
            }
            var content = formatter ? formatter(rowData, rowIndex) : getDefaultContent(rowData);
            row.mouseover(function () {
                showTooltip(this, content);
            });
        }

        var bindCell = function (cell, formatter) {
            cell.mouseover(function () {
                var rowIndex = $(this).parent().attr('datagrid-row-index');
                var rowData = $(target).datagrid('getRows')[rowIndex];
                var field = $(this).attr('field');
                var value = rowData[field];
                var content = formatter ? formatter(value, field) : value;
                showTooltip(this, content);
            });
        }

        var initTooltip = function () {
            if (options.customAttr.tooltip.target == 'row') {
                options.finder.getTr(target, '', 'allbody').each(function () {
                    var row = $(this);
                    if (row.hasClass('datagrid-row')) {
                        bindRow(row, options.customAttr.tooltip.formatter);
                    }
                });
            } else {
                if (options.customAttr.tooltip.fields && $.isArray(options.customAttr.tooltip.fields)) {
                    var panel = $(target).datagrid('getPanel');
                    var state = $.data(target, 'datagrid');
                    var datagrid_body = state.dc.body2;
                    $.each(options.customAttr.tooltip.fields, function () {
                        var field = this;
                        bindCell($('td[field=' + field + ']', datagrid_body), options.customAttr.tooltip.formatter);
                    });
                }

            }
        }


        $(target).datagrid('addEventListener', {
            name: 'onLoadSuccess',
            handler: function (data) {
                initTooltip();
            }
        });

    }

    function initPagination(target) {
        var options = $.extend(true, {}, $.fn.datagrid.defaults, $(target).datagrid('options'));
        if (!options.pagination) return;

        $(target).datagrid('addEventListener', {
            name: 'onLoadSuccess',
            handler: function (data) {
                $(target).datagrid('setPagination', options.customAttr.pagination);
            }
        });
    }

    function fixNoDataBug(target) {
        var options = $(target).datagrid('options');

        var fixBug = function (data) {
            var panel = $(target).datagrid('getPanel');
            if (data.rows.length == 0) {
                var header = $('div.datagrid-view2>div.datagrid-header>div.datagrid-header-inner>table', panel)[0];
                var body = $('>div.datagrid-view>div.datagrid-view2>div.datagrid-body', panel);
                $('<div>').html('&nbsp;').width($(header).width()).appendTo(body);
            } else {
                $('div.datagrid-view2>div.datagrid-body>div', panel).remove();
            }

        }

        $(target).datagrid('addEventListener', [{
            name: 'onLoadSuccess',
            handler: function (data) {
                fixBug(data);
            }
        }, {
            name: 'onLoadError',
            handler: function () {
                fixBug({ rows: [] });
            }
        }])
    }

    /**
    * 只对当前数据页有效，重新加载数据后失效（类似freezeRow）
    * 只冻结columns属性中定义的列
    */
    function _freezeColumn1(target, field) {
        var options = $(target).datagrid('options');
        var frozenColumnFields = $(target).datagrid('getColumnFields', true);
        var firstColumn = options.columns[0][0];
        if (frozenColumnFields.length == 0 && firstColumn.checkbox) {
            moveColumn(target, 'ck', 2, 1);
        }


        setMenuFieldItemState(target, field, true);
        moveColumn(target, field, 2, 1);
    }

    /**
    * 对所有数据页有效，重新加载数据后仍然有效
    */
    function _freezeColumn2(target, field) {
        var options = $(target).datagrid('options');
        if (!options.frozenColumns[0]) {
            options.frozenColumns = [[]];
        }

        var fieldOption = $(target).datagrid('getColumnOption', field);
        options.frozenColumns[0].push(fieldOption);
        removeColumn(fieldOption);
        $(target).datagrid(options);
        var fielditem = $(target).datagrid('getHeaderContextMenu').menu('findItem', fieldOption.title);
        $(target).datagrid('getHeaderContextMenu').menu('disableItem', fielditem.target);

        function removeColumn(fieldOption) {
            for (var i = 0; i < options.columns.length; i++) {
                for (var j = 0; j < options.columns[i].length; j++) {
                    if (options.columns[i][j].field == fieldOption.field) {
                        options.columns[i].splice(j, 1);
                        return;
                    }
                }
            }
        }
    }

    /**
    * 列移动
    */
    function moveColumn(target, field, from, to) {
        var options = $(target).datagrid('options');
        var dc = $.data(target, "datagrid").dc;
        var headerTd = null;

        var headerTd = (from == 1 ? dc.header1 : dc.header2).find('>table>tbody>tr.datagrid-header-row>td[field=' + field + ']');
        if (from > to) {
            //datagrid-view2 -> datagrid-view1
            (to == 1 ? dc.header1 : dc.header2).find('>table>tbody>tr.datagrid-header-row').append(headerTd);
        } else {
            //datagrid-view1 -> datagrid-view2
            (to == 1 ? dc.header1 : dc.header2).find('>table>tbody>tr.datagrid-header-row').children('td[field]').each(function () {
                if (isBefore(field, $(this).attr('field'))) {
                    $(this).before(headerTd);
                    return false;
                }
            });
        }


        var bodyTd = (from == 1 ? dc.body1 : dc.body2).find('>table>tbody>tr>td[field=' + field + ']');
        if (from > to) {
            //datagrid-view2 -> datagrid-view1
            $.each(bodyTd, function (i, td) {
                options.finder.getTr(target, i, 'body', to).append(td);
            });
        } else {
            //datagrid-view1 -> datagrid-view2
            $.each(bodyTd, function (i, td) {
                options.finder.getTr(target, i, 'body', to).children('td[field]').each(function () {
                    if (isBefore(field, $(this).attr('field'))) {
                        $(this).before(td);
                        return false;
                    }
                });
            });
        }

        $(target).datagrid('fixColumnSize');


        function isBefore(f1, f2) {
            return getFieldIndex(f1) < getFieldIndex(f2);
        }

        function getFieldIndex(field) {
            return $.inArray(field, $(target).datagrid('getColumnFields'));
        }
    }

    function setMenuFieldItemState(target, field, disabled) {
        var index = getFieldIndex(field);
        var fieldOption = $(target).datagrid('getColumnOption', field);
        $.extend(fieldOption, { index: index });

        var headerContextMenu = $(target).datagrid('getHeaderContextMenu');
        var item = headerContextMenu.menu('findItem', fieldOption.title);
        if (!item) return;

        if (disabled) {
            headerContextMenu.menu('disableItem', item.target);
        } else {
            headerContextMenu.menu('enableItem', item.target);
        }

        function getFieldIndex(field) {
            return $.inArray(field, $(target).datagrid('getColumnFields'));
        }
    }

    /**
    * 根据'显示/隐藏'子菜单中字段项是否可用来控制，当前列右键菜单中的"冻结此列"和"取消冻结"是否可用
    */
    function switchFreezeAndUnfreezeMenuItem(field, target) {
        var headerContextMenu = $(target).datagrid('getHeaderContextMenu');
        var fieldOption = $(target).datagrid('getColumnOption', field);
        var fieldItem = headerContextMenu.menu('findItem', fieldOption.title);

        if (fieldItem) {
            if (!fieldItem.disabled) {
                enableItem('冻结此列');
                disableItem('取消冻结');
            } else {
                enableItem('取消冻结');
                disableItem('冻结此列');
            }
        } else {
            disableItem('冻结此列');
            disableItem('取消冻结');
        }


        function disableItem(title) {
            var item = headerContextMenu.menu('findItem', title);
            if (item) {
                headerContextMenu.menu('disableItem', item.target);
            }
        }

        function enableItem(title) {
            var item = headerContextMenu.menu('findItem', title);
            if (item) {
                headerContextMenu.menu('enableItem', item.target);
            }
        }
    }

    function freezeColumn(target, field, isTemporary) {
        if (isTemporary) {
            _freezeColumn1(target, field);
        } else {
            _freezeColumn2(target, field);
        }
    }

    function unfreezeColumn(target, field) {
        setMenuFieldItemState(target, field, false);
        moveColumn(target, field, 1, 2);
    }


    function addEventListener(target, eventName, handler, override) {
        var options = $(target).datagrid('options');
        var defaultActionEvent = options[eventName];
        switch (eventName) {
            case 'onLoadSuccess':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (data) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onLoadError':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function () {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onBeforeLoad':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (param) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onClickRow':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (rowIndex, rowData) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onDblClickRow':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (rowIndex, rowData) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onClickCell':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (rowIndex, field, value) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onDblClickCell':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (rowIndex, field, value) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onSortColumn':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (sort, order) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onResizeColumn':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (field, width) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onSelect':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (rowIndex, rowData) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onUnselect':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (rowIndex, rowData) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onSelectAll':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (rows) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onUnselectAll':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (rows) {
                        defaultActionEvent.apply(this, arguments);
                        handlerapply(this, arguments);
                    }
                }
                break;
            case 'onCheck':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (rowIndex, rowData) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onUncheck':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (rowIndex, rowData) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onCheckAll':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (rows) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onUncheckAll':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (rows) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onBeforeEdit':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (rowIndex, rowData) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onAfterEdit':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (rowIndex, rowData, changes) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onCancelEdit':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (rowIndex, rowData) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onHeaderContextMenu':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (e, field) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onRowContextMenu':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (e, rowIndex, rowData) {
                        defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onExpandRow':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (index, row) {
                        defaultActionEvent && defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            case 'onCollapseRow':
                if (override) {
                    options[eventName] = handler;
                } else {
                    options[eventName] = function (index, row) {
                        defaultActionEvent && defaultActionEvent.apply(this, arguments);
                        handler.apply(this, arguments);
                    }
                }
                break;
            default:
                break;
        }
    }

    function getAllExpandRowIndex(target) {
        var options = $(target).datagrid('options');
        var index = [];
        options.finder.getTr(target, '', 'allbody', 1).each(function () {
            if ($('span.datagrid-row-collapse', this).length > 0) {
                index.push($(this).attr('datagrid-row-index'));
            }
        });
        return index;
    }


    $.fn.datagrid.headerContextMenu = {};
    $.fn.datagrid.headerContextMenu.defaultEvents = {
        /**
        *  对frozenColumns属性中的列不做隐藏控制
        */
        doHideColumn: function (target, field, item) {
            $(target).datagrid('hideColumn', field);
            var menu = $(target).datagrid('getHeaderContextMenu');
            menu.menu('setIcon', { target: item.target, iconCls: 'icon-unchecked' });
        },
        doShowColumn: function (target, field, item) {
            $(target).datagrid('showColumn', field);
            var menu = $(target).datagrid('getHeaderContextMenu');
            menu.menu('setIcon', { target: item.target, iconCls: 'icon-checked' });
        },
        doShowAll: function (target) {
            var fields = $(target).datagrid('getColumnFields');
            var menu = $(target).datagrid('getHeaderContextMenu');
            for (i in fields) {
                $(target).datagrid('showColumn', fields[i]);
                var columnOption = $(target).datagrid('getColumnOption', fields[i]);
                var item = menu.menu('findItem', columnOption.title);
                if (item) {
                    menu.menu('setIcon', { target: item.target, iconCls: 'icon-checked' });
                }
            }
        },
        doRestore: function (target) {
            var fields = $(target).datagrid('getColumnFields');
            var menu = $(target).datagrid('getHeaderContextMenu');
            for (i in fields) {
                var columnOption = $(target).datagrid('getColumnOption', fields[i]);
                var item = menu.menu('findItem', columnOption.title);
                if (!columnOption._hidden) {
                    $(target).datagrid('showColumn', fields[i]);
                    item && menu.menu('setIcon', { target: item.target, iconCls: 'icon-checked' });
                } else {
                    $(target).datagrid('hideColumn', fields[i]);
                    item && menu.menu('setIcon', { target: item.target, iconCls: 'icon-unchecked' });
                }
            }
        }

    };

    $.fn.datagrid.rowContextMenu = {};
    $.fn.datagrid.rowContextMenu.defaultEvents = {
        doAdd: function (item, rowIndex, rowData, target) {
            //            console.log('===>doAdd');
        },
        doEdit: function (item, rowIndex, rowData, target) {
            //            console.log('===>doEdit');
        },
        doDelete: function (item, rowIndex, rowData, target) {
            $.messager.confirm('疑问', '您确定要删除已选中的行？', function (r) {
                if (r) {
                    $(target).datagrid('deleteRows', $(target).datagrid('getSelections'));
                }
            })
        },
        doReload: function (item, rowIndex, rowData, target) {
            $(target).datagrid('load');
        },
        doReloadThisPage: function (item, rowIndex, rowData, target) {
            $(target).datagrid('reload');
        },
        doExportThisPage: function (item, rowIndex, rowData, target) {
            //            console.log('===>doExportThisPage');
        },
        doExprotAll: function (item, rowIndex, rowData, target) {
            //            console.log('===>doExprotAll');
        }
    }

    $.extend($.fn.datagrid.defaults.editors, {
        my97: {
            init: function (container, options) {
                var input = $('<input type="text" class="Wdate">').appendTo(container);
                options = options || {};
                options = $.extend({}, options, { readOnly: true });
                return input.focus(function () {
                    WdatePicker();
                });
            },
            getValue: function (target) {
                return $(target).val();
            },
            setValue: function (target, value) {
                $(target).val(value);
            },
            resize: function (target, width) {
                var input = $(target);
                if ($.boxModel == true) {
                    input.width(width - (input.outerWidth() - input.width()));
                } else {
                    input.width(width);
                }
            }
        },
        datetimebox: {
            init: function (container, options) {
                var input = $('<input type="text" class="easyui-datetimebox">').appendTo(container);
                options = options || {};
                options = $.extend({}, options, { formatter: function (date) { return $.dateFormat(new Date(date), 'yyyy-MM-dd HH:mm') } })
                return input.datetimebox(options);
            },
            getValue: function (target) {
                return $(target).datetimebox('getValue');
            },
            setValue: function (target, value) {
                $(target).datetimebox('setValue', value);
            },
            resize: function (target, width) {
                $(target).datetimebox('resize', width);
            }
        },
        numberspinner: {
            init: function (container, options) {
                var input = $('<input type="text">').appendTo(container);
                options = options || {};
                options = $.extend({}, options, { min: 0, editable: false });
                return input.numberspinner(options);
            },
            getValue: function (target) {
                return $(target).numberspinner('getValue');
            },
            setValue: function (target, value) {
                $(target).numberspinner('setValue', value);
            },
            resize: function (target, width) {
                $(target).numberspinner('resize', width);
            }
        },
        timespinner: {
            init: function (container, options) {
                var input = $('<input type="text">').appendTo(container);
                options = options || {};
                return input.timespinner(options);
            },
            getValue: function (target) {
                return $(target).timespinner('getValue');
            },
            setValue: function (target, value) {
                $(target).timespinner('setValue', value);
            },
            resize: function (target, width) {
                $(target).timespinner('resize', width);
            }
        },
        combogrid: {
            init: function (container, options) {
                var input = $('<input type="text">').appendTo(container);
                options = options || {};
                options = $.extend({}, options, { panelWidth: 400, editable: false });
                return input.combogrid(options);
            },
            getValue: function (target) {
                return $(target).combogrid('getValue');
            },
            setValue: function (target, value) {
                $(target).combogrid('setValue', value);
            },
            resize: function (target, width) {
                $(target).combogrid('resize', width);
            }
        }
    });

    $.fn.datagrid.defaults.customAttr = {
        /**
        * column右键菜单设置
        *  isShow：是否显示
        *  isMerge: 自定义菜单项与默认菜单项是否合并
        *  items: 自定义菜单项
        */
        headerContextMenu: {
            isShow: false,
            isMerge: true,
            items: [],
            onShow: function (field, target) { },
            onHide: function () { }
        },
        rowContextMenu: {
            isShow: false,
            isMerge: true,
            items: []
        },
        pagination: {
            showPageList: false,
            showRefresh: true,
            beforePageText: undefined,
            afterPageText: undefined,
            displayMsg: undefined
        },
        slaveList: undefined,
        activeSlave: 'dblclickrow',
        rowediting: false,
        tooltip: {
            enable: false,
            target: 'row',
            position: 'bottom',
            fields: undefined,
            formatter: undefined
        },
        onConfirmEdit: function (rowIndex) { return true; }
    };

    $.extend($.fn.datagrid.methods, {
        followCustomHandle: function (jq) {
            return jq.each(function () {
                fixNoDataBug(this);
                initHeaderContextMenu(this);
                initRowContextMenu(this);
                initPagination(this);
                setMasterSlave(this);
                registRowEditingHandler(this);
                buildTooltip(this);
            });
        },
        getHeaderContextMenu: function (jq) {
            return $('#' + getContextMenuId(jq[0], 'headerContextMenu'));
        },
        getRowContextMenu: function (jq) {
            return $('#' + getContextMenuId(jq[0], 'rowContextMenu'));
        },
        getEditingRow: function (jq) {
            var editingRows = jq.datagrid('getEditingRows');
            return editingRows.length ? editingRows[0] : null;
        },
        getEditingRows: function (jq) {
            var datagrid = $.data(jq[0], "datagrid");
            var opts = datagrid.options;
            var data = datagrid.data;
            var editingRow = [];
            opts.finder.getTr(jq[0], "", "allbody").each(function () {
                if ($(this).hasClass('datagrid-row-editing')) {
                    var index = parseInt($(this).attr('datagrid-row-index'));
                    editingRow.push(data.rows[index]);
                }
            });

            return editingRow;
        },
        setPagination: function (jq, opts) {
            return jq.each(function () {
                $(this).datagrid('getPager').pagination(opts);
            });
        },
        deleteRows: function (jq, rows) {
            return jq.each(function () {
                var delRows = undefined;
                if (!$.isArray(rows)) {
                    delRows = [rows];
                } else {
                    delRows = rows;
                }

                var target = this;
                $.each(delRows, function (i, row) {
                    if ($.isPlainObject(row)) {
                        var index = $(target).datagrid('getRowIndex', row);
                        $(target).datagrid('deleteRow', index);
                    } else {
                        $(target).datagrid('deleteRow', row);
                    }
                });
            });
        },
        freezeColumn: function (jq, field) {
            return jq.each(function () {
                freezeColumn(this, field, true);
            });
        },
        unfreezColumn: function (jq, field) {
            return jq.each(function () {
                unfreezeColumn(this, field);
            });
        },
        addEventListener: function (jq, param) {
            return jq.each(function () {
                var eventList = $.isArray(param) ? param : [param];
                var target = this;
                $.each(eventList, function (i, event) {
                    addEventListener(target, event.name, event.handler || function () { }, event.override);
                });
            });
        },
        /**
        * 用于detail View视图下，修改detailRow的宽度
        * @param jq
        * @param options 接收两个参数
        *          index: row索引
        *          handler: function(index, width) 可以在此方法中操作需要修改宽度的组件
        *
        * @returns {*}
        */
        fixDetailRowWidth: function (jq, options) {
            return jq.each(function () {
                var state = $.data(this, 'datagrid');
                var table = state.dc.header2.children();
                options.handler && options.handler.call(this, options.index, table.width());
            });
        },
        /**
        * 用于DetailView视图，获取所有展开行的索引
        * @param jq
        * @returns {*}
        */
        getAllExpandRowIndex: function (jq) {
            return getAllExpandRowIndex(jq[0]);
        },
        /**
        * 用于DetailView视图，获取第一个展开行索引
        * @param jq
        * @returns {*}
        */
        getExpandRowIndex: function (jq) {
            var indexArr = jq.datagrid('getAllExpandRowIndex');
            return indexArr.length > 0 ? indexArr[0] : -1;
        }
    });
})(jQuery);