Ext.define('overrides.util.Format', {
    override: 'Ext.util.Format',
    
    attributes: function(attributes) {
        if (typeof attributes === 'object') {
            var result = [],
                name;

            for (name in attributes) {
                result.push(name, '="', name === 'style' ? Ext.DomHelper.generateStyles(attributes[name]) : Ext.htmlEncode(attributes[name]), '"');
            }
            attributes = result.join('');
        }
        return attributes||'';
    }
});
