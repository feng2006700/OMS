
//v.2.0 build 131220
function dhtmlXVaultObject(a) {
    var b = this;
    this.conf = {
        version: "2.0",
        skin: a.skin || this._skinDetect() || "dhx_skyblue",
        list: "default",
        get_url: a.getUrl || "",
        uploaded_files: {},
        icon_def: "",
        icons: {},
        ofs: {
            dhx_skyblue: 0,
            dhx_web: 7,
            dhx_terrace: 10,
            bootstrap: 10
        }
    };
    this.list = this["list_" + this.conf.list];
    this.list.config = this.conf;
    this.conf.icon_def = this.icon_def;
    for (var c in this.icons) for (var d = 0; d < this.icons[c].length; d++) this.conf.icons[this.icons[c][d]] = c;
    var f = typeof a.container == "string" ? document.getElementById(a.container) : a.container;
    f._attach_mode == !0 ? this.base = f : (this.base = document.createElement("DIV"), f.appendChild(this.base));
    this.base.className += " dhx_vault_" + this.conf.skin;
    this.base.style.border = "0px solid white";
    f = a = null;
    this.p_files = document.createElement("DIV");
    this.p_files.className = "dhx_vault_files";
    this.base.appendChild(this.p_files);
    this.file_items = {};
    this._readableSize = function (a) {
        for (var b = !1, c = "b,Kb,Mb,Gb,Tb,Pb,Eb".split(","),
        d = 0; d < c.length; d++) a > 1024 ? a /= 1024 : b === !1 && (b = d);
        b === !1 && (b = c.length - 1);
        return Math.round(a * 100) / 100 + " " + c[b]
    };
    this.setSizes();
    this._addFileToList = function (a, b, c, d) {
        var i = this.getFileExtension(b),
        f = i.length > 0 ? this.conf.icons[i.toLowerCase()] || this.conf.icon_def : this.conf.icon_def,
        h = document.createElement("DIV");
        this.p_files.appendChild(h);
        this.file_items[a] = h;
        h._idd = a;
        this.list.renderFileRecord(h,
        {
            name: b,
            icon: f,
            size: c,
            readableSize: this._readableSize(c || 0)
        });
        this.conf.uploaded_files[a] =
        {
            serverName: d
        };
        this.list.updateFileState(h, { state: "uploaded" })
        h = null
    };
    this.setSkin(this.conf.skin);
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
dhtmlXVaultObject.prototype.setWidth = function (a) {
    if (this.base._attach_mode != !0) this.base.parentNode.style.width = a + "px",
    this.setSizes()
};
dhtmlXVaultObject.prototype.setHeight = function (a) {
    if (this.base._attach_mode != !0) this.base.parentNode.style.height = a + "px",
    this.setSizes()
};
dhtmlXVaultObject.prototype.setSkin = function (a) {
    if (a != this.conf.skin) this.base.className = String(this.base.className).replace(RegExp("s{0,}dhx_vault_" + this.conf.skin), " dhx_vault_" + a),
    this.conf.skin = a;
    this.setSizes()
};
dhtmlXVaultObject.prototype.setSizes = function () {
    var a = this.base.offsetWidth - (this.base.clientWidth || this.base.scrollWidth),
    b = this.base.offsetHeight - this.base.clientHeight;
    this.base.style.width = Math.max(0, this.base.parentNode.offsetWidth - a) + "px";
    this.base.style.height = Math.max(0, this.base.parentNode.offsetHeight - b) + "px";
    var c = this.conf.ofs[this.conf.skin];
    this.p_files.style.top = c + "px";
    this.p_files.style.left = c + "px";
    if (!this.conf.ofs_f) this.p_files.style.width = "100px",
    this.p_files.style.height = "100px",
    this.conf.ofs_f = {
        w: this.p_files.offsetWidth - this.p_files.clientWidth,
        h: this.p_files.offsetHeight - this.p_files.clientHeight
    };
    this.p_files.style.width = Math.max(this.base.clientWidth - c * 2 - this.conf.ofs_f.w, 0) + "px";
    this.p_files.style.height = Math.max(this.base.clientHeight - c * 2 - this.conf.ofs_f.h, 0) + "px"
};
dhtmlXVaultObject.prototype.getFileExtension = function (a) {
    var b = "",
    c = String(a).match(/\.([^\.\s]*)$/i);
    c != null && (b = c[1]);
    return b
};
dhtmlXVaultObject.prototype._skinDetect = function () {
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
    }[b] || null
};

dhtmlXVaultObject.prototype.list_default = {
    config: null,
    renderFileRecord: function (a, b) {
        a.className = "dhx_vault_file dhx_vault_file_" + b.state;
        a.innerHTML = "<div class='dhx_vault_file_param dhx_vault_file_name'>&nbsp;</div><div class='dhx_vault_file_param dhx_vault_file_progress'>&nbsp;</div><div class='dhx_vault_file_icon dhx_vault_" + b.icon + "'><div class='dhx_vault_all_icons'></div></div>";
        this.updateFileNameSize(a, b);
        a = null
    },
    updateFileNameSize: function (a, b) {
        a.childNodes[0].innerHTML = "<div class='dhx_vault_file_name_text'>" + b.name + (!isNaN(b.size) && b.size !== !1 ? " (" + b.readableSize + ")" : "&nbsp;") + "</div>";
        a.childNodes[0].title = b.name + (!isNaN(b.size) && b.size !== !1 ? " (" + b.readableSize + ")" : "");
        a.childNodes[0].linkName = b.name;
        a.childNodes[0].linkSize = (!isNaN(b.size) && b.size !== !1 ? " (" + b.readableSize + ")" : "&nbsp;");
        a = null
    },
    updateFileState: function (a, b) {
        a.className = "dhx_vault_file dhx_vault_file_uploaded", a.childNodes[1].className = "dhx_vault_file_param dhx_vault_file_progress";
        var servername = this.config.uploaded_files != null && this.config.uploaded_files[a._idd] != null ? this.config.uploaded_files[a._idd].serverName : "", fileDisName = "<a href='" + this.config.get_url + servername + "' target='_blank'>" + a.childNodes[0].linkName + "</a>";
        a.childNodes[0].innerHTML = "<div class='dhx_vault_file_name_text'>" + fileDisName + a.childNodes[0].linkSize + "</div>";
        a = null
    }
};