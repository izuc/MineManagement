Ext.data.JsonP.Mz_pivot_dataexport_excel_Workbase({"tagname":"class","name":"Mz.pivot.dataexport.excel.Workbase","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"Workbase.js","href":"Workbase.html#Mz-pivot-dataexport-excel-Workbase"}],"aliases":{},"alternateClassNames":[],"extends":"Ext.Base","mixins":[],"requires":["Ext.XTemplate","Mz.pivot.dataexport.excel.Style"],"uses":[],"members":[{"name":"cellBorderColor","tagname":"cfg","owner":"Mz.pivot.dataexport.excel.Workbase","id":"cfg-cellBorderColor","meta":{}},{"name":"cellFillColor","tagname":"cfg","owner":"Mz.pivot.dataexport.excel.Workbase","id":"cfg-cellFillColor","meta":{}},{"name":"cellFontName","tagname":"cfg","owner":"Mz.pivot.dataexport.excel.Workbase","id":"cfg-cellFontName","meta":{}},{"name":"cellFontSize","tagname":"cfg","owner":"Mz.pivot.dataexport.excel.Workbase","id":"cfg-cellFontSize","meta":{}},{"name":"dateFormat","tagname":"cfg","owner":"Mz.pivot.dataexport.excel.Workbase","id":"cfg-dateFormat","meta":{}},{"name":"numberFormat","tagname":"cfg","owner":"Mz.pivot.dataexport.excel.Workbase","id":"cfg-numberFormat","meta":{}},{"name":"title","tagname":"cfg","owner":"Mz.pivot.dataexport.excel.Workbase","id":"cfg-title","meta":{}},{"name":"titleFillColor","tagname":"cfg","owner":"Mz.pivot.dataexport.excel.Workbase","id":"cfg-titleFillColor","meta":{}},{"name":"titleFontSize","tagname":"cfg","owner":"Mz.pivot.dataexport.excel.Workbase","id":"cfg-titleFontSize","meta":{}},{"name":"compiledStyles","tagname":"property","owner":"Mz.pivot.dataexport.excel.Workbase","id":"property-compiledStyles","meta":{}},{"name":"styles","tagname":"property","owner":"Mz.pivot.dataexport.excel.Workbase","id":"property-styles","meta":{}},{"name":"constructor","tagname":"method","owner":"Mz.pivot.dataexport.excel.Workbase","id":"method-constructor","meta":{}},{"name":"addStyle","tagname":"method","owner":"Mz.pivot.dataexport.excel.Workbase","id":"method-addStyle","meta":{}},{"name":"getInteriorStyle","tagname":"method","owner":"Mz.pivot.dataexport.excel.Workbase","id":"method-getInteriorStyle","meta":{"private":true}}],"code_type":"ext_define","id":"class-Mz.pivot.dataexport.excel.Workbase","component":false,"superclasses":["Ext.Base"],"subclasses":["Mz.pivot.dataexport.excel.Workbook","Mz.pivot.dataexport.excel.Worksheet"],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>Mz.pivot.dataexport.excel.Workbase</strong></div></div><h4>Requires</h4><div class='dependency'>Ext.XTemplate</div><div class='dependency'><a href='#!/api/Mz.pivot.dataexport.excel.Style' rel='Mz.pivot.dataexport.excel.Style' class='docClass'>Mz.pivot.dataexport.excel.Style</a></div><h4>Subclasses</h4><div class='dependency'><a href='#!/api/Mz.pivot.dataexport.excel.Workbook' rel='Mz.pivot.dataexport.excel.Workbook' class='docClass'>Mz.pivot.dataexport.excel.Workbook</a></div><div class='dependency'><a href='#!/api/Mz.pivot.dataexport.excel.Worksheet' rel='Mz.pivot.dataexport.excel.Worksheet' class='docClass'>Mz.pivot.dataexport.excel.Worksheet</a></div><h4>Files</h4><div class='dependency'><a href='source/Workbase.html#Mz-pivot-dataexport-excel-Workbase' target='_blank'>Workbase.js</a></div></pre><div class='doc-contents'><p>Class used to create an Excel workbook</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-cellBorderColor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.dataexport.excel.Workbase'>Mz.pivot.dataexport.excel.Workbase</span><br/><a href='source/Workbase.html#Mz-pivot-dataexport-excel-Workbase-cfg-cellBorderColor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.dataexport.excel.Workbase-cfg-cellBorderColor' class='name expandable'>cellBorderColor</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The colour of border to use for each Cell ...</div><div class='long'><p>The colour of border to use for each Cell</p>\n<p>Defaults to: <code>&quot;#E4E4E4&quot;</code></p></div></div></div><div id='cfg-cellFillColor' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.dataexport.excel.Workbase'>Mz.pivot.dataexport.excel.Workbase</span><br/><a href='source/Workbase.html#Mz-pivot-dataexport-excel-Workbase-cfg-cellFillColor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.dataexport.excel.Workbase-cfg-cellFillColor' class='name expandable'>cellFillColor</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The fill colour of each summary Cell ...</div><div class='long'><p>The fill colour of each summary Cell</p>\n<p>Defaults to: <code>&quot;&quot;</code></p></div></div></div><div id='cfg-cellFontName' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.dataexport.excel.Workbase'>Mz.pivot.dataexport.excel.Workbase</span><br/><a href='source/Workbase.html#Mz-pivot-dataexport-excel-Workbase-cfg-cellFontName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.dataexport.excel.Workbase-cfg-cellFontName' class='name expandable'>cellFontName</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The default font name used in the workbook. ...</div><div class='long'><p>The default font name used in the workbook. This is applied when {hasDefaultStyle} is true.</p>\n<p>Defaults to: <code>&quot;Arial&quot;</code></p></div></div></div><div id='cfg-cellFontSize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.dataexport.excel.Workbase'>Mz.pivot.dataexport.excel.Workbase</span><br/><a href='source/Workbase.html#Mz-pivot-dataexport-excel-Workbase-cfg-cellFontSize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.dataexport.excel.Workbase-cfg-cellFontSize' class='name expandable'>cellFontSize</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The default font size used in the workbook. ...</div><div class='long'><p>The default font size used in the workbook. This is applied when {hasDefaultStyle} is true.</p>\n<p>Defaults to: <code>&quot;10&quot;</code></p></div></div></div><div id='cfg-dateFormat' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.dataexport.excel.Workbase'>Mz.pivot.dataexport.excel.Workbase</span><br/><a href='source/Workbase.html#Mz-pivot-dataexport-excel-Workbase-cfg-dateFormat' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.dataexport.excel.Workbase-cfg-dateFormat' class='name expandable'>dateFormat</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Default format used for the date values ...</div><div class='long'><p>Default format used for the date values</p>\n<p>Defaults to: <code>'Short Date'</code></p></div></div></div><div id='cfg-numberFormat' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.dataexport.excel.Workbase'>Mz.pivot.dataexport.excel.Workbase</span><br/><a href='source/Workbase.html#Mz-pivot-dataexport-excel-Workbase-cfg-numberFormat' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.dataexport.excel.Workbase-cfg-numberFormat' class='name expandable'>numberFormat</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Default format used for the number values ...</div><div class='long'><p>Default format used for the number values</p>\n<p>Defaults to: <code>'Standard'</code></p></div></div></div><div id='cfg-title' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.dataexport.excel.Workbase'>Mz.pivot.dataexport.excel.Workbase</span><br/><a href='source/Workbase.html#Mz-pivot-dataexport-excel-Workbase-cfg-title' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.dataexport.excel.Workbase-cfg-title' class='name expandable'>title</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>The title of the workbook ...</div><div class='long'><p>The title of the workbook</p>\n<p>Defaults to: <code>&quot;Workbook&quot;</code></p></div></div></div><div id='cfg-titleFillColor' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.dataexport.excel.Workbase'>Mz.pivot.dataexport.excel.Workbase</span><br/><a href='source/Workbase.html#Mz-pivot-dataexport-excel-Workbase-cfg-titleFillColor' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.dataexport.excel.Workbase-cfg-titleFillColor' class='name expandable'>titleFillColor</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Fill folor used for the table title ...</div><div class='long'><p>Fill folor used for the table title</p>\n<p>Defaults to: <code>&quot;&quot;</code></p></div></div></div><div id='cfg-titleFontSize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.dataexport.excel.Workbase'>Mz.pivot.dataexport.excel.Workbase</span><br/><a href='source/Workbase.html#Mz-pivot-dataexport-excel-Workbase-cfg-titleFontSize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.dataexport.excel.Workbase-cfg-titleFontSize' class='name expandable'>titleFontSize</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>Font size used for the table title ...</div><div class='long'><p>Font size used for the table title</p>\n<p>Defaults to: <code>&quot;14&quot;</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-compiledStyles' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.dataexport.excel.Workbase'>Mz.pivot.dataexport.excel.Workbase</span><br/><a href='source/Workbase.html#Mz-pivot-dataexport-excel-Workbase-property-compiledStyles' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.dataexport.excel.Workbase-property-compiledStyles' class='name expandable'>compiledStyles</a> : Array<span class=\"signature\"></span></div><div class='description'><div class='short'>Array of all rendered Mz.pivot.dataexport.excel.Style objects for this object ...</div><div class='long'><p>Array of all rendered <a href=\"#!/api/Mz.pivot.dataexport.excel.Style\" rel=\"Mz.pivot.dataexport.excel.Style\" class=\"docClass\">Mz.pivot.dataexport.excel.Style</a> objects for this object</p>\n<p>Defaults to: <code>[]</code></p></div></div></div><div id='property-styles' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.dataexport.excel.Workbase'>Mz.pivot.dataexport.excel.Workbase</span><br/><a href='source/Workbase.html#Mz-pivot-dataexport-excel-Workbase-property-styles' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.dataexport.excel.Workbase-property-styles' class='name expandable'>styles</a> : Array<span class=\"signature\"></span></div><div class='description'><div class='short'>The array of Mz.pivot.dataexport.excel.Style objects attached to this object ...</div><div class='long'><p>The array of <a href=\"#!/api/Mz.pivot.dataexport.excel.Style\" rel=\"Mz.pivot.dataexport.excel.Style\" class=\"docClass\">Mz.pivot.dataexport.excel.Style</a> objects attached to this object</p>\n<p>Defaults to: <code>[]</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.dataexport.excel.Workbase'>Mz.pivot.dataexport.excel.Workbase</span><br/><a href='source/Workbase.html#Mz-pivot-dataexport-excel-Workbase-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Mz.pivot.dataexport.excel.Workbase-method-constructor' class='name expandable'>Mz.pivot.dataexport.excel.Workbase</a>( <span class='pre'>config</span> ) : <a href=\"#!/api/Mz.pivot.dataexport.excel.Workbase\" rel=\"Mz.pivot.dataexport.excel.Workbase\" class=\"docClass\">Mz.pivot.dataexport.excel.Workbase</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Mz.pivot.dataexport.excel.Workbase\" rel=\"Mz.pivot.dataexport.excel.Workbase\" class=\"docClass\">Mz.pivot.dataexport.excel.Workbase</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-addStyle' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.dataexport.excel.Workbase'>Mz.pivot.dataexport.excel.Workbase</span><br/><a href='source/Workbase.html#Mz-pivot-dataexport-excel-Workbase-method-addStyle' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.dataexport.excel.Workbase-method-addStyle' class='name expandable'>addStyle</a>( <span class='pre'>config</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Adds a new Mz.pivot.dataexport.excel.Style to this Workbook ...</div><div class='long'><p>Adds a new <a href=\"#!/api/Mz.pivot.dataexport.excel.Style\" rel=\"Mz.pivot.dataexport.excel.Style\" class=\"docClass\">Mz.pivot.dataexport.excel.Style</a> to this Workbook</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>The style config, passed to the Style constructor (required)</p>\n</div></li></ul></div></div></div><div id='method-getInteriorStyle' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.pivot.dataexport.excel.Workbase'>Mz.pivot.dataexport.excel.Workbase</span><br/><a href='source/Workbase.html#Mz-pivot-dataexport-excel-Workbase-method-getInteriorStyle' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.pivot.dataexport.excel.Workbase-method-getInteriorStyle' class='name expandable'>getInteriorStyle</a>( <span class='pre'>fillColor</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>fillColor</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});