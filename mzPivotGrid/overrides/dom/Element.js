if (Ext.getVersion('extjs').match('4.1')) {
    Ext.define('overrides.dom.Element', {
        override: 'Ext.dom.Element',

        getAttribute: (Ext.isIE6 || Ext.isIE7 || Ext.isIE8) ?
            function (name, ns) {
                var d = this.dom,
                        type;
                if (ns) {
                    type = typeof d[ns + ":" + name];
                    if (type != 'undefined' && type != 'unknown') {
                        return d[ns + ":" + name] || null;
                    }
                    return null;
                }
                if (name === "for") {
                    name = "htmlFor";
                }
                return d[name] || null;
            } : function (name, ns) {
                var d = this.dom;
                if (ns) {
                    return d.getAttributeNS(ns, name) || d.getAttribute(ns + ":" + name);
                }
                return d.getAttribute(name) || d[name] || null;
            }
    });


}