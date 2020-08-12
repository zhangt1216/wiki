"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.getArrayValuesAsHashmapKeys=exports.getLookupTable=exports.keyOfItemWithProperty=exports.keysOfItemsWithProperty=exports.getDublicates=exports.getId=exports.refreshDataSet=exports.drawRaster=exports.getPrettyFilter=exports.groupByProperty=exports.isEdgeTypeMatch=exports.getEdgeTypeMatches=exports.getDataUri=exports.convert=exports.getValues=exports.getIterableCollection=exports.getLabel=undefined;var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};/* @preserve TW-Guard */
/*\

title: $:/plugins/felixhayashi/tiddlymap/js/lib/utils/tmap
type: application/javascript
module-type: library

@preserve

\*/
/* @preserve TW-Guard */var _vis=require("$:/plugins/felixhayashi/vis/vis.js");var _vis2=_interopRequireDefault(_vis);var _exception=require("$:/plugins/felixhayashi/tiddlymap/js/exception");var _basic=require("$:/plugins/felixhayashi/tiddlymap/js/lib/utils/basic");var basicUtils=_interopRequireWildcard(_basic);var _wiki=require("$:/plugins/felixhayashi/tiddlymap/js/lib/utils/wiki");var wikiUtils=_interopRequireWildcard(_wiki);function _interopRequireWildcard(e){if(e&&e.__esModule){return e}else{var t={};if(e!=null){for(var r in e){if(Object.prototype.hasOwnProperty.call(e,r))t[r]=e[r]}}t.default=e;return t}}function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var getLabel=exports.getLabel=function e(t,r){var i=wikiUtils.getTiddler(t);return(i&&i.fields[r]?i.fields[r]:i.fields.title).replace("\\n","\n")};var getIterableCollection=exports.getIterableCollection=function e(t){return t instanceof _vis2.default.DataSet?t.get():t};var getValues=exports.getValues=function e(t){if(Array.isArray(t)){return t}else if(t instanceof _vis2.default.DataSet){return t.get({returnType:"Array"})}var r=[];var i=Object.keys(t);for(var a=i.length;a--;){r.push(t[i[a]])}return r};var convert=exports.convert=function e(t,r){if((typeof t==="undefined"?"undefined":_typeof(t))!=="object"){throw new _exception.InvalidArgumentException(t,r)}if(r==="object"){r="hashmap"}var i={array:function e(t){return getValues(t)},hashmap:function e(t){return t instanceof _vis2.default.DataSet?t.get({returnType:"Object"}):t},dataset:function e(t){return t instanceof _vis2.default.DataSet?t:!Array.isArray(t)?getValues(t):new _vis2.default.DataSet(t)}};return i[r](t)};var getDataUri=exports.getDataUri=function e(t,r,i){var a=wikiUtils.getTiddler(t);r=r||a.fields.type||"image/svg+xml";var s=a.fields.text;var o=$tw.config.contentTypeInfo[r].encoding;if(r==="image/svg+xml"){s=s.replace(/\r?\n|\r/g," ");if(!basicUtils.hasSubString("xmlns",s)){s=s.replace(/<svg/,'<svg xmlns="http://www.w3.org/2000/svg"')}}if(i&&o!=="base64"){o="base64";s=basicUtils.base64(s)}return"data:"+r+";"+o+","+s};var eTyFiltAutoPrefix="[all[]] ";var getEdgeTypeMatches=exports.getEdgeTypeMatches=function e(){var t=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"";var r=arguments[1];if(!r){r=wikiUtils.getTiddlersByPrefix($tm.path.edgeTypes+"/",{iterator:"eachTiddlerPlusShadows",removePrefix:true})}if(r!=null&&!Array.isArray(r)){r=Object.keys(r)}return wikiUtils.getMatches(eTyFiltAutoPrefix+t,r)};var isEdgeTypeMatch=exports.isEdgeTypeMatch=function e(t){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"";return wikiUtils.isMatch(t,eTyFiltAutoPrefix+r)};var groupByProperty=exports.groupByProperty=function e(t,r){t=getIterableCollection(t);var i=basicUtils.makeHashMap();var a=Object.keys(t);for(var s in a){var o=t[a[s]];var n=o[r];if(n==null){throw"Cannot group by property "+r}else{if(!Array.isArray(i[n])){i[n]=[]}i[n].push(o)}}return i};var getPrettyFilter=exports.getPrettyFilter=function e(t){t=t.trim().replace("][","] [");var r=/[+-]?\[.+?[\]\}\>]\]/g;var i=t.match(r);t=t.replace(r," [] ").trim();var a=t.split(/\s+/);var s=0;var o=[];for(var n=0,l=a.length;n<l;n++){o[n]=a[n]==="[]"?i[s++]:a[n]}return o.join("\n")};var drawRaster=exports.drawRaster=function e(t,r,i,a){var s=arguments.length>4&&arguments[4]!==undefined?arguments[4]:"#D9D9D9";var o=basicUtils.getNearestRasterPosition(i,a),n=o.x,l=o.y;var u=t.canvas.width/r;var p=t.canvas.height/r;var f=a*2;var v=Math.ceil(u/a/2)*a+f;var c=Math.ceil(p/a/2)*a+f;var y=n-v;var d=n+v;var g=l-c;var h=l+c;t.beginPath();for(var b=y;b<d;b+=a){t.moveTo(b,g);t.lineTo(b,h)}for(var x=g;x<=h;x+=a){t.moveTo(y,x);t.lineTo(d,x)}t.strokeStyle=s;t.fillStyle=s;t.stroke()};var refreshDataSet=exports.refreshDataSet=function e(t,r){var i=t.get({returnType:"Object"});var a=[];var s=[];var o=[];var n=[];for(var l in r){if(i[l]){if(basicUtils.isEqual(i[l],r[l])){continue}s.push(l);t.remove(l)}else{a.push(l)}if(r[l].x===undefined){o.push(l)}t.add(r[l])}for(var u in i){if(!r[u]){n.push(u);t.remove(u)}}return{withoutPosition:o,inserted:a,updated:s,removed:n}};var getId=exports.getId=function e(t){return wikiUtils.getTiddler(t).fields["tmap.id"]};var getDublicates=exports.getDublicates=function e(t){var r=getId(t);if(!r){return[]}var i=wikiUtils.getTiddlersWithField("tmap.id",r,{limit:2});delete i[wikiUtils.getTiddlerRef(t)];return Object.keys(i)};var keysOfItemsWithProperty=exports.keysOfItemsWithProperty=function e(t,r,i,a){t=getIterableCollection(t);var s=Object.keys(t);var o=[];a=typeof a==="number"?a:s.length;for(var n=0,l=s.length;n<l;n++){var u=s[n];if(_typeof(t[u])==="object"&&t[u][r]){if(!i||t[u][r]===i){o.push(u);if(o.length===a){break}}}}return o};var keyOfItemWithProperty=exports.keyOfItemWithProperty=function e(t,r,i){return keysOfItemsWithProperty(t,r,i,1)[0]};var getLookupTable=exports.getLookupTable=function e(t,r){t=getIterableCollection(t);var i=basicUtils.makeHashMap();var a=Object.keys(t);for(var s=0,o=a.length;s<o;s++){var n=a[s];var l=r?t[n][r]:t[n];var u=typeof l==="undefined"?"undefined":_typeof(l);if(u==="string"&&l!==""||u==="number"){if(!i[l]){i[l]=r?t[n]:true;continue}}if(r){throw new Error('Cannot use "'+l+'" as lookup table index')}}return i};var getArrayValuesAsHashmapKeys=exports.getArrayValuesAsHashmapKeys=getLookupTable;
//# sourceMappingURL=./maps/felixhayashi/tiddlymap/js/lib/utils/tmap.js.map
