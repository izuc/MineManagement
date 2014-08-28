Ext.data.JsonP.Mz_aggregate_Aggregators({"tagname":"class","name":"Mz.aggregate.Aggregators","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"Aggregators.js","href":"Aggregators.html#Mz-aggregate-Aggregators"}],"singleton":true,"aliases":{},"alternateClassNames":[],"extends":"Ext.Base","mixins":[],"requires":[],"uses":[],"members":[{"name":"avg","tagname":"method","owner":"Mz.aggregate.Aggregators","id":"method-avg","meta":{}},{"name":"count","tagname":"method","owner":"Mz.aggregate.Aggregators","id":"method-count","meta":{}},{"name":"groupCountPercentage","tagname":"method","owner":"Mz.aggregate.Aggregators","id":"method-groupCountPercentage","meta":{}},{"name":"groupSumPercentage","tagname":"method","owner":"Mz.aggregate.Aggregators","id":"method-groupSumPercentage","meta":{}},{"name":"max","tagname":"method","owner":"Mz.aggregate.Aggregators","id":"method-max","meta":{}},{"name":"min","tagname":"method","owner":"Mz.aggregate.Aggregators","id":"method-min","meta":{}},{"name":"sum","tagname":"method","owner":"Mz.aggregate.Aggregators","id":"method-sum","meta":{}}],"code_type":"ext_define","id":"class-Mz.aggregate.Aggregators","component":false,"superclasses":["Ext.Base"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>Mz.aggregate.Aggregators</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/Aggregators.html#Mz-aggregate-Aggregators' target='_blank'>Aggregators.js</a></div></pre><div class='doc-contents'><p>This class contains all predefined aggregator functions.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-avg' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.aggregate.Aggregators'>Mz.aggregate.Aggregators</span><br/><a href='source/Aggregators.html#Mz-aggregate-Aggregators-method-avg' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.Aggregators-method-avg' class='name expandable'>avg</a>( <span class='pre'>records, measure, matrix, rowGroupKey, colGroupKey</span> ) : Float/String<span class=\"signature\"></span></div><div class='description'><div class='short'>Calculates the avg of all records using the measure field. ...</div><div class='long'><p>Calculates the avg of all records using the measure field.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>records</span> : Array<div class='sub-desc'><p>Records to process.</p>\n</div></li><li><span class='pre'>measure</span> : String<div class='sub-desc'><p>Field to aggregate by.</p>\n</div></li><li><span class='pre'>matrix</span> : Mz.pivot.Matrix<div class='sub-desc'><p>The matrix object reference.</p>\n</div></li><li><span class='pre'>rowGroupKey</span> : String<div class='sub-desc'><p>Key of the row group.</p>\n</div></li><li><span class='pre'>colGroupKey</span> : String<div class='sub-desc'><p>Key of the col group.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Float/String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-count' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.aggregate.Aggregators'>Mz.aggregate.Aggregators</span><br/><a href='source/Aggregators.html#Mz-aggregate-Aggregators-method-count' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.Aggregators-method-count' class='name expandable'>count</a>( <span class='pre'>records, measure, matrix, rowGroupKey, colGroupKey</span> ) : Float/String<span class=\"signature\"></span></div><div class='description'><div class='short'>Calculates the count of all records using the measure field. ...</div><div class='long'><p>Calculates the count of all records using the measure field.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>records</span> : Array<div class='sub-desc'><p>Records to process.</p>\n</div></li><li><span class='pre'>measure</span> : String<div class='sub-desc'><p>Field to aggregate by.</p>\n</div></li><li><span class='pre'>matrix</span> : Mz.pivot.Matrix<div class='sub-desc'><p>The matrix object reference.</p>\n</div></li><li><span class='pre'>rowGroupKey</span> : String<div class='sub-desc'><p>Key of the row group.</p>\n</div></li><li><span class='pre'>colGroupKey</span> : String<div class='sub-desc'><p>Key of the col group.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Float/String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-groupCountPercentage' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.aggregate.Aggregators'>Mz.aggregate.Aggregators</span><br/><a href='source/Aggregators.html#Mz-aggregate-Aggregators-method-groupCountPercentage' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.Aggregators-method-groupCountPercentage' class='name expandable'>groupCountPercentage</a>( <span class='pre'>records, measure, matrix, rowGroupKey, colGroupKey</span> ) : Float/String<span class=\"signature\"></span></div><div class='description'><div class='short'>Calculates the percentage from the row group count. ...</div><div class='long'><p>Calculates the percentage from the row group count.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>records</span> : Array<div class='sub-desc'><p>Records to process.</p>\n</div></li><li><span class='pre'>measure</span> : String<div class='sub-desc'><p>Field to aggregate by.</p>\n</div></li><li><span class='pre'>matrix</span> : Mz.pivot.Matrix<div class='sub-desc'><p>The matrix object reference.</p>\n</div></li><li><span class='pre'>rowGroupKey</span> : String<div class='sub-desc'><p>Key of the row group.</p>\n</div></li><li><span class='pre'>colGroupKey</span> : String<div class='sub-desc'><p>Key of the col group.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Float/String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-groupSumPercentage' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.aggregate.Aggregators'>Mz.aggregate.Aggregators</span><br/><a href='source/Aggregators.html#Mz-aggregate-Aggregators-method-groupSumPercentage' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.Aggregators-method-groupSumPercentage' class='name expandable'>groupSumPercentage</a>( <span class='pre'>records, measure, matrix, rowGroupKey, colGroupKey</span> ) : Float/String<span class=\"signature\"></span></div><div class='description'><div class='short'>Calculates the percentage from the row group sum. ...</div><div class='long'><p>Calculates the percentage from the row group sum.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>records</span> : Array<div class='sub-desc'><p>Records to process.</p>\n</div></li><li><span class='pre'>measure</span> : String<div class='sub-desc'><p>Field to aggregate by.</p>\n</div></li><li><span class='pre'>matrix</span> : Mz.pivot.Matrix<div class='sub-desc'><p>The matrix object reference.</p>\n</div></li><li><span class='pre'>rowGroupKey</span> : String<div class='sub-desc'><p>Key of the row group.</p>\n</div></li><li><span class='pre'>colGroupKey</span> : String<div class='sub-desc'><p>Key of the col group.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Float/String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-max' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.aggregate.Aggregators'>Mz.aggregate.Aggregators</span><br/><a href='source/Aggregators.html#Mz-aggregate-Aggregators-method-max' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.Aggregators-method-max' class='name expandable'>max</a>( <span class='pre'>records, measure, matrix, rowGroupKey, colGroupKey</span> ) : Float/String<span class=\"signature\"></span></div><div class='description'><div class='short'>Calculates the max of all records using the measure field. ...</div><div class='long'><p>Calculates the max of all records using the measure field.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>records</span> : Array<div class='sub-desc'><p>Records to process.</p>\n</div></li><li><span class='pre'>measure</span> : String<div class='sub-desc'><p>Field to aggregate by.</p>\n</div></li><li><span class='pre'>matrix</span> : Mz.pivot.Matrix<div class='sub-desc'><p>The matrix object reference.</p>\n</div></li><li><span class='pre'>rowGroupKey</span> : String<div class='sub-desc'><p>Key of the row group.</p>\n</div></li><li><span class='pre'>colGroupKey</span> : String<div class='sub-desc'><p>Key of the col group.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Float/String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-min' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.aggregate.Aggregators'>Mz.aggregate.Aggregators</span><br/><a href='source/Aggregators.html#Mz-aggregate-Aggregators-method-min' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.Aggregators-method-min' class='name expandable'>min</a>( <span class='pre'>records, measure, matrix, rowGroupKey, colGroupKey</span> ) : Float/String<span class=\"signature\"></span></div><div class='description'><div class='short'>Calculates the min of all records using the measure field. ...</div><div class='long'><p>Calculates the min of all records using the measure field.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>records</span> : Array<div class='sub-desc'><p>Records to process.</p>\n</div></li><li><span class='pre'>measure</span> : String<div class='sub-desc'><p>Field to aggregate by.</p>\n</div></li><li><span class='pre'>matrix</span> : Mz.pivot.Matrix<div class='sub-desc'><p>The matrix object reference.</p>\n</div></li><li><span class='pre'>rowGroupKey</span> : String<div class='sub-desc'><p>Key of the row group.</p>\n</div></li><li><span class='pre'>colGroupKey</span> : String<div class='sub-desc'><p>Key of the col group.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Float/String</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-sum' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Mz.aggregate.Aggregators'>Mz.aggregate.Aggregators</span><br/><a href='source/Aggregators.html#Mz-aggregate-Aggregators-method-sum' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Mz.aggregate.Aggregators-method-sum' class='name expandable'>sum</a>( <span class='pre'>records, measure, matrix, rowGroupKey, colGroupKey</span> ) : Float/String<span class=\"signature\"></span></div><div class='description'><div class='short'>Calculates the sum of all records using the measure field. ...</div><div class='long'><p>Calculates the sum of all records using the measure field.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>records</span> : Array<div class='sub-desc'><p>Records to process.</p>\n</div></li><li><span class='pre'>measure</span> : String<div class='sub-desc'><p>Field to aggregate by.</p>\n</div></li><li><span class='pre'>matrix</span> : Mz.pivot.Matrix<div class='sub-desc'><p>The matrix object reference.</p>\n</div></li><li><span class='pre'>rowGroupKey</span> : String<div class='sub-desc'><p>Key of the row group.</p>\n</div></li><li><span class='pre'>colGroupKey</span> : String<div class='sub-desc'><p>Key of the col group.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Float/String</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});