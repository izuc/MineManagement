Ext.data.JsonP.Mz_pivot_feature_PivotView50({"tagname":"class","name":"Mz.pivot.feature.PivotView50","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"PivotView50.js","href":"PivotView50.html#Mz-pivot-feature-PivotView50"}],"aliases":{"feature":["pivotview50"]},"alternateClassNames":[],"extends":"Mz.pivot.feature.PivotViewCommon","mixins":[],"requires":[],"uses":[],"members":[{"name":"outerTpl","tagname":"property","owner":"Mz.pivot.feature.PivotView50","id":"property-outerTpl","meta":{"private":true}},{"name":"rowTpl","tagname":"property","owner":"Mz.pivot.feature.PivotView50","id":"property-rowTpl","meta":{"private":true}},{"name":"getGridListeners","tagname":"method","owner":"Mz.pivot.feature.PivotView50","id":"method-getGridListeners","meta":{"private":true}},{"name":"getViewListeners","tagname":"method","owner":"Mz.pivot.feature.PivotView50","id":"method-getViewListeners","meta":{"private":true}},{"name":"init","tagname":"method","owner":"Mz.pivot.feature.PivotView50","id":"method-init","meta":{"private":true}},{"name":"onBeforeGridRendered","tagname":"method","owner":"Mz.pivot.feature.PivotView50","id":"method-onBeforeGridRendered","meta":{"private":true}},{"name":"onViewReady","tagname":"method","owner":"Mz.pivot.feature.PivotView50","id":"method-onViewReady","meta":{"private":true}},{"name":"setupRowData","tagname":"method","owner":"Mz.pivot.feature.PivotView50","id":"method-setupRowData","meta":{"private":true}},{"name":"vetoEvent","tagname":"method","owner":"Mz.pivot.feature.PivotView50","id":"method-vetoEvent","meta":{"private":true}}],"code_type":"ext_define","id":"class-Mz.pivot.feature.PivotView50","component":false,"superclasses":["Mz.pivot.feature.PivotViewCommon"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Mz.pivot.feature.PivotViewCommon<div class='subclass '><strong>Mz.pivot.feature.PivotView50</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/PivotView50.html#Mz-pivot-feature-PivotView50' target='_blank'>PivotView50.js</a></div></pre><div class='doc-contents'><p>This class is used when running in ExtJS 5.0.x\nIt is automatically added to the pivot grid.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-outerTpl' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.feature.PivotView50'>Mz.pivot.feature.PivotView50</span><br/><a href='source/PivotView50.html#Mz-pivot-feature-PivotView50-property-outerTpl' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.feature.PivotView50-property-outerTpl' class='name expandable'>outerTpl</a> : Array<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>['{%', 'var me = this.pivotViewFeature;', 'if (!(me.disabled)) {', 'me.setup();', '}', 'this.nextTpl.applyOut(values, out, parent);', '%}', {priority: 200}]</code></p></div></div></div><div id='property-rowTpl' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.feature.PivotView50'>Mz.pivot.feature.PivotView50</span><br/><a href='source/PivotView50.html#Mz-pivot-feature-PivotView50-property-rowTpl' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.feature.PivotView50-property-rowTpl' class='name expandable'>rowTpl</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-getGridListeners' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.feature.PivotView50'>Mz.pivot.feature.PivotView50</span><br/><a href='source/PivotView50.html#Mz-pivot-feature-PivotView50-method-getGridListeners' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.feature.PivotView50-method-getGridListeners' class='name expandable'>getGridListeners</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getViewListeners' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.feature.PivotView50'>Mz.pivot.feature.PivotView50</span><br/><a href='source/PivotView50.html#Mz-pivot-feature-PivotView50-method-getViewListeners' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.feature.PivotView50-method-getViewListeners' class='name expandable'>getViewListeners</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-init' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.feature.PivotView50'>Mz.pivot.feature.PivotView50</span><br/><a href='source/PivotView50.html#Mz-pivot-feature-PivotView50-method-init' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.feature.PivotView50-method-init' class='name expandable'>init</a>( <span class='pre'>grid</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>grid</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onBeforeGridRendered' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.feature.PivotView50'>Mz.pivot.feature.PivotView50</span><br/><a href='source/PivotView50.html#Mz-pivot-feature-PivotView50-method-onBeforeGridRendered' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.feature.PivotView50-method-onBeforeGridRendered' class='name expandable'>onBeforeGridRendered</a>( <span class='pre'>grid</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>grid</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-onViewReady' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.feature.PivotView50'>Mz.pivot.feature.PivotView50</span><br/><a href='source/PivotView50.html#Mz-pivot-feature-PivotView50-method-onViewReady' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.feature.PivotView50-method-onViewReady' class='name expandable'>onViewReady</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-setupRowData' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.feature.PivotView50'>Mz.pivot.feature.PivotView50</span><br/><a href='source/PivotView50.html#Mz-pivot-feature-PivotView50-method-setupRowData' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.feature.PivotView50-method-setupRowData' class='name expandable'>setupRowData</a>( <span class='pre'>record, idx, rowValues</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>record</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>idx</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>rowValues</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-vetoEvent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.feature.PivotView50'>Mz.pivot.feature.PivotView50</span><br/><a href='source/PivotView50.html#Mz-pivot-feature-PivotView50-method-vetoEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.feature.PivotView50-method-vetoEvent' class='name expandable'>vetoEvent</a>( <span class='pre'>record, row, rowIndex, e</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>record</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>row</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>rowIndex</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>e</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{}});