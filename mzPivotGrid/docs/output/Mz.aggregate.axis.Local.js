Ext.data.JsonP.Mz_aggregate_axis_Local({"tagname":"class","name":"Mz.aggregate.axis.Local","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"Local.js","href":"Local.html#Mz-aggregate-axis-Local"}],"aliases":{"pivotaxis":["local"]},"alternateClassNames":[],"extends":"Mz.aggregate.axis.Abstract","mixins":[],"requires":[],"uses":[],"members":[{"name":"dimensions","tagname":"property","owner":"Mz.aggregate.axis.Abstract","id":"property-dimensions","meta":{}},{"name":"items","tagname":"property","owner":"Mz.aggregate.axis.Abstract","id":"property-items","meta":{}},{"name":"leftAxis","tagname":"property","owner":"Mz.aggregate.axis.Abstract","id":"property-leftAxis","meta":{}},{"name":"levels","tagname":"property","owner":"Mz.aggregate.axis.Abstract","id":"property-levels","meta":{}},{"name":"matrix","tagname":"property","owner":"Mz.aggregate.axis.Abstract","id":"property-matrix","meta":{}},{"name":"tree","tagname":"property","owner":"Mz.aggregate.axis.Abstract","id":"property-tree","meta":{}},{"name":"constructor","tagname":"method","owner":"Mz.aggregate.axis.Abstract","id":"method-constructor","meta":{}},{"name":"addDimension","tagname":"method","owner":"Mz.aggregate.axis.Abstract","id":"method-addDimension","meta":{}},{"name":"addItem","tagname":"method","owner":"Mz.aggregate.axis.Abstract","id":"method-addItem","meta":{}},{"name":"addItemToTree","tagname":"method","owner":"Mz.aggregate.axis.Abstract","id":"method-addItemToTree","meta":{"private":true}},{"name":"addRecord","tagname":"method","owner":"Mz.aggregate.axis.Local","id":"method-addRecord","meta":{}},{"name":"buildTree","tagname":"method","owner":"Mz.aggregate.axis.Local","id":"method-buildTree","meta":{}},{"name":"canRemoveItem","tagname":"method","owner":"Mz.aggregate.axis.Local","id":"method-canRemoveItem","meta":{"private":true}},{"name":"destroy","tagname":"method","owner":"Mz.aggregate.axis.Abstract","id":"method-destroy","meta":{"private":true}},{"name":"filterTree","tagname":"method","owner":"Mz.aggregate.axis.Local","id":"method-filterTree","meta":{}},{"name":"filterTreeItems","tagname":"method","owner":"Mz.aggregate.axis.Local","id":"method-filterTreeItems","meta":{"private":true}},{"name":"findTreeElement","tagname":"method","owner":"Mz.aggregate.axis.Abstract","id":"method-findTreeElement","meta":{}},{"name":"getTree","tagname":"method","owner":"Mz.aggregate.axis.Abstract","id":"method-getTree","meta":{}},{"name":"removeItemsFromArray","tagname":"method","owner":"Mz.aggregate.axis.Local","id":"method-removeItemsFromArray","meta":{"private":true}},{"name":"removeRecordsByItem","tagname":"method","owner":"Mz.aggregate.axis.Local","id":"method-removeRecordsByItem","meta":{"private":true}},{"name":"removeRecordsFromResults","tagname":"method","owner":"Mz.aggregate.axis.Local","id":"method-removeRecordsFromResults","meta":{"private":true}},{"name":"sortTree","tagname":"method","owner":"Mz.aggregate.axis.Abstract","id":"method-sortTree","meta":{}},{"name":"sortTreeByField","tagname":"method","owner":"Mz.aggregate.axis.Abstract","id":"method-sortTreeByField","meta":{}},{"name":"sortTreeLeaves","tagname":"method","owner":"Mz.aggregate.axis.Abstract","id":"method-sortTreeLeaves","meta":{"private":true}},{"name":"sortTreeRecords","tagname":"method","owner":"Mz.aggregate.axis.Abstract","id":"method-sortTreeRecords","meta":{"private":true}}],"code_type":"ext_define","id":"class-Mz.aggregate.axis.Local","component":false,"superclasses":["Ext.Base","Mz.aggregate.axis.Abstract"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='docClass'>Mz.aggregate.axis.Abstract</a><div class='subclass '><strong>Mz.aggregate.axis.Local</strong></div></div></div><h4>Files</h4><div class='dependency'><a href='source/Local.html#Mz-aggregate-axis-Local' target='_blank'>Local.js</a></div></pre><div class='doc-contents'><p>Local processing axis class</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-dimensions' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-property-dimensions' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Abstract-property-dimensions' class='name expandable'>dimensions</a> : <a href=\"#!/api/Mz.aggregate.MixedCollection\" rel=\"Mz.aggregate.MixedCollection\" class=\"docClass\">Mz.aggregate.MixedCollection</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>All dimensions configured for this axis.</p>\n</div><div class='long'><p>All dimensions configured for this axis.</p>\n</div></div></div><div id='property-items' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-property-items' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Abstract-property-items' class='name expandable'>items</a> : <a href=\"#!/api/Mz.aggregate.MixedCollection\" rel=\"Mz.aggregate.MixedCollection\" class=\"docClass\">Mz.aggregate.MixedCollection</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>All items generated for this axis are stored in this collection.</p>\n</div><div class='long'><p>All items generated for this axis are stored in this collection.</p>\n</div></div></div><div id='property-leftAxis' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-property-leftAxis' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Abstract-property-leftAxis' class='name expandable'>leftAxis</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>internal flag to know which axis is this one ...</div><div class='long'><p>internal flag to know which axis is this one</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-levels' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-property-levels' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Abstract-property-levels' class='name expandable'>levels</a> : Number<span class=\"signature\"></span></div><div class='description'><div class='short'>No of levels this axis tree has ...</div><div class='long'><p>No of levels this axis tree has</p>\n<p>Defaults to: <code>0</code></p></div></div></div><div id='property-matrix' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-property-matrix' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Abstract-property-matrix' class='name expandable'>matrix</a> : <a href=\"#!/api/Mz.aggregate.matrix.Abstract\" rel=\"Mz.aggregate.matrix.Abstract\" class=\"docClass\">Mz.aggregate.matrix.Abstract</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p>Matrix instance.</p>\n</div><div class='long'><p>Matrix instance.</p>\n</div></div></div><div id='property-tree' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-property-tree' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Abstract-property-tree' class='name expandable'>tree</a> : Array<span class=\"signature\"></span></div><div class='description'><div class='short'><p>When the tree is built for this axis it is stored in this property.</p>\n</div><div class='long'><p>When the tree is built for this axis it is stored in this property.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Mz.aggregate.axis.Abstract-method-constructor' class='name expandable'>Mz.aggregate.axis.Local</a>( <span class='pre'>config</span> ) : <a href=\"#!/api/Mz.aggregate.axis.Abstract\" rel=\"Mz.aggregate.axis.Abstract\" class=\"docClass\">Mz.aggregate.axis.Abstract</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Mz.aggregate.axis.Abstract\" rel=\"Mz.aggregate.axis.Abstract\" class=\"docClass\">Mz.aggregate.axis.Abstract</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-addDimension' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-method-addDimension' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Abstract-method-addDimension' class='name expandable'>addDimension</a>( <span class='pre'>config</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Create a {Mz.aggregate.dimension.Item} object with the specified config and add it to the\ninternal collection of dime...</div><div class='long'><p>Create a {<a href=\"#!/api/Mz.aggregate.dimension.Item\" rel=\"Mz.aggregate.dimension.Item\" class=\"docClass\">Mz.aggregate.dimension.Item</a>} object with the specified config and add it to the\ninternal collection of dimensions.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-addItem' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-method-addItem' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Abstract-method-addItem' class='name expandable'>addItem</a>( <span class='pre'>item</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Add the specified item to the internal collection of items. ...</div><div class='long'><p>Add the specified item to the internal collection of items.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>item</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-addItemToTree' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-method-addItemToTree' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Abstract-method-addItemToTree' class='name expandable'>addItemToTree</a>( <span class='pre'>item</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Add the specified item to the tree ...</div><div class='long'><p>Add the specified item to the tree</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>item</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-addRecord' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.aggregate.axis.Local'>Mz.aggregate.axis.Local</span><br/><a href='source/Local.html#Mz-aggregate-axis-Local-method-addRecord' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Local-method-addRecord' class='name expandable'>addRecord</a>( <span class='pre'>record</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Provide a record to extract dimensions keys and build the internal tree. ...</div><div class='long'><p>Provide a record to extract dimensions keys and build the internal tree.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>record</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-buildTree' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.aggregate.axis.Local'>Mz.aggregate.axis.Local</span><br/><a href='source/Local.html#Mz-aggregate-axis-Local-method-buildTree' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Local-method-buildTree' class='name expandable'>buildTree</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Build the tree and apply value filters. ...</div><div class='long'><p>Build the tree and apply value filters.</p>\n<p>Overrides: <a href=\"#!/api/Mz.aggregate.axis.Abstract-method-buildTree\" rel=\"Mz.aggregate.axis.Abstract-method-buildTree\" class=\"docClass\">Mz.aggregate.axis.Abstract.buildTree</a></p></div></div></div><div id='method-canRemoveItem' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.aggregate.axis.Local'>Mz.aggregate.axis.Local</span><br/><a href='source/Local.html#Mz-aggregate-axis-Local-method-canRemoveItem' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Local-method-canRemoveItem' class='name expandable'>canRemoveItem</a>( <span class='pre'>item</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>item</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-destroy' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-method-destroy' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Abstract-method-destroy' class='name expandable'>destroy</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-filterTree' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.aggregate.axis.Local'>Mz.aggregate.axis.Local</span><br/><a href='source/Local.html#Mz-aggregate-axis-Local-method-filterTree' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Local-method-filterTree' class='name expandable'>filterTree</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Apply all value filters to the tree. ...</div><div class='long'><p>Apply all value filters to the tree.</p>\n</div></div></div><div id='method-filterTreeItems' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.aggregate.axis.Local'>Mz.aggregate.axis.Local</span><br/><a href='source/Local.html#Mz-aggregate-axis-Local-method-filterTreeItems' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Local-method-filterTreeItems' class='name expandable'>filterTreeItems</a>( <span class='pre'>items</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>items</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-findTreeElement' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-method-findTreeElement' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Abstract-method-findTreeElement' class='name expandable'>findTreeElement</a>( <span class='pre'>attribute, value</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Find the first element in the tree that matches the criteria (attribute = value). ...</div><div class='long'><p>Find the first element in the tree that matches the criteria (attribute = value).\n   It returns an object with the tree element and depth level.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>attribute</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>value</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getTree' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-method-getTree' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Abstract-method-getTree' class='name expandable'>getTree</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>This function parses the internal collection of items and builds a tree. ...</div><div class='long'><p>This function parses the internal collection of items and builds a tree.\nThis tree is used by the Matrix class to generate the pivot store and column headers.</p>\n</div></div></div><div id='method-removeItemsFromArray' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.aggregate.axis.Local'>Mz.aggregate.axis.Local</span><br/><a href='source/Local.html#Mz-aggregate-axis-Local-method-removeItemsFromArray' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Local-method-removeItemsFromArray' class='name expandable'>removeItemsFromArray</a>( <span class='pre'>source, toDelete</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>source</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>toDelete</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-removeRecordsByItem' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.aggregate.axis.Local'>Mz.aggregate.axis.Local</span><br/><a href='source/Local.html#Mz-aggregate-axis-Local-method-removeRecordsByItem' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Local-method-removeRecordsByItem' class='name expandable'>removeRecordsByItem</a>( <span class='pre'>item</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>item</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-removeRecordsFromResults' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.aggregate.axis.Local'>Mz.aggregate.axis.Local</span><br/><a href='source/Local.html#Mz-aggregate-axis-Local-method-removeRecordsFromResults' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Local-method-removeRecordsFromResults' class='name expandable'>removeRecordsFromResults</a>( <span class='pre'>items</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>items</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-sortTree' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-method-sortTree' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Abstract-method-sortTree' class='name expandable'>sortTree</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Sort the tree using the sorters defined on the axis dimensions ...</div><div class='long'><p>Sort the tree using the sorters defined on the axis dimensions</p>\n</div></div></div><div id='method-sortTreeByField' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-method-sortTreeByField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Abstract-method-sortTreeByField' class='name expandable'>sortTreeByField</a>( <span class='pre'>field, direction</span> ) : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Sort the tree by the specified field and direction. ...</div><div class='long'><p>Sort the tree by the specified field and direction.\nIf the field is one of the axis dimension then sort by that otherwise go to the records and sort\nthem by that field.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>field</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>direction</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-sortTreeLeaves' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-method-sortTreeLeaves' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Abstract-method-sortTreeLeaves' class='name expandable'>sortTreeLeaves</a>( <span class='pre'>tree, field, direction</span> ) : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>tree</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>field</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>direction</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-sortTreeRecords' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Mz.aggregate.axis.Abstract' rel='Mz.aggregate.axis.Abstract' class='defined-in docClass'>Mz.aggregate.axis.Abstract</a><br/><a href='source/Abstract.html#Mz-aggregate-axis-Abstract-method-sortTreeRecords' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.axis.Abstract-method-sortTreeRecords' class='name expandable'>sortTreeRecords</a>( <span class='pre'>tree, field, direction</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Sort the records array of each item in the tree ...</div><div class='long'><p>Sort the records array of each item in the tree</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>tree</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>field</span> : Object<div class='sub-desc'>\n</div></li><li><span class='pre'>direction</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});