JS.Enumerable=new JS.Module('Enumerable',{extend:{ALL_EQUAL:{},forEach:function(a,b){if(!a)return new JS.Enumerator(this,'forEach');for(var c=0;c<this.length;c++)a.call(b||null,this[c]);return this},isComparable:function(b){return b.all(function(a){return typeof a.compareTo==='function'})},areEqual:function(a,b){var c;if(a===b)return true;if(a&&typeof a.equals==='function')return a.equals(b);if(a instanceof Function)return a===b;if(a instanceof Array){if(!(b instanceof Array))return false;for(var d=0,e=a.length;d<e;d++){c=this.areEqual(a[d],b[d]);if(c===this.ALL_EQUAL)return true;if(!c)return false}if(a.length!==b.length)return false;return true}if(a instanceof Date){if(!(b instanceof Date))return false;if(a.getTime()!==b.getTime())return false;return true}if(a instanceof Object){if(!(b instanceof Object))return false;if(this.objectSize(a)!==this.objectSize(b))return false;for(var f in a){if(!this.areEqual(a[f],b[f]))return false}return true}return false},objectKeys:function(a,b){var c=[];for(var d in a){if(a.hasOwnProperty(d)||b!==false)c.push(d)}return c},objectSize:function(a){return this.objectKeys(a).length},Collection:new JS.Class({initialize:function(a){this.length=0;JS.Enumerable.forEach.call(a,this.push,this)},push:function(a){Array.prototype.push.call(this,a)},clear:function(){var a=this.length;while(a--)delete this[a];this.length=0}})},all:function(b,c){b=JS.Enumerable.toFn(b);var d=true;this.forEach(function(a){d=d&&(b?b.apply(c||null,arguments):a)});return!!d},any:function(b,c){b=JS.Enumerable.toFn(b);var d=false;this.forEach(function(a){d=d||(b?b.apply(c||null,arguments):a)});return!!d},count:function(a,b){if(typeof this.size==='function')return this.size();var c=0,d=a;if(a&&typeof a!=='function')a=function(x){return JS.Enumerable.areEqual(x,d)};this.forEach(function(){if(!a||a.apply(b||null,arguments))c+=1});return c},cycle:function(a,b,c){if(!b)return this.enumFor('cycle',a);b=JS.Enumerable.toFn(b);while(a--)this.forEach(b,c)},drop:function(c){var d=[];this.forEachWithIndex(function(a,b){if(b>=c)d.push(a)});return d},dropWhile:function(b,c){if(!b)return this.enumFor('dropWhile');b=JS.Enumerable.toFn(b);var d=[],e=true;this.forEach(function(a){if(e)e=e&&b.apply(c||null,arguments);if(!e)d.push(a)});return d},forEachCons:function(a,b,c){if(!b)return this.enumFor('forEachCons',a);b=JS.Enumerable.toFn(b);var d=this.toArray(),e=d.length,f=e-a,g;for(g=0;g<=f;g++)b.call(c||null,d.slice(g,g+a));return this},forEachSlice:function(a,b,c){if(!b)return this.enumFor('forEachSlice',a);b=JS.Enumerable.toFn(b);var d=this.toArray(),e=d.length,f=Math.ceil(e/a),g;for(g=0;g<f;g++)b.call(c||null,d.slice(g*a,(g+1)*a));return this},forEachWithIndex:function(c,d,e){if(typeof c==='function'){e=d;d=c;c=0}c=c||0;if(!d)return this.enumFor('forEachWithIndex',c);d=JS.Enumerable.toFn(d);return this.forEach(function(a){var b=d.call(e||null,a,c);c+=1;return b})},forEachWithObject:function(b,c,d){if(!c)return this.enumFor('forEachWithObject',b);c=JS.Enumerable.toFn(c);this.forEach(function(){var a=[b].concat(JS.array(arguments));c.apply(d||null,a)});return b},find:function(b,c){if(!b)return this.enumFor('find');b=JS.Enumerable.toFn(b);var d={},e=d;this.forEach(function(a){if(d!==e)return;d=b.apply(c||null,arguments)?a:d});return d===e?null:d},findIndex:function(c,d){if(c===undefined)return this.enumFor('findIndex');var e=null,f=(typeof c==='function');this.forEachWithIndex(function(a,b){if(e!==null)return;if(JS.Enumerable.areEqual(c,a)||(f&&c.apply(d||null,arguments)))e=b});return e},first:function(a){var b=this.toArray();return(a===undefined)?b[0]:b.slice(0,a)},grep:function(c,d,e){d=JS.Enumerable.toFn(d);var f=[];this.forEach(function(a){var b=(typeof c.match==='function')?c.match(a):(typeof c.test==='function')?c.test(a):JS.isType(a,c);if(!b)return;if(d)a=d.apply(e||null,arguments);f.push(a)});return f},groupBy:function(c,d){if(!c)return this.enumFor('groupBy');c=JS.Enumerable.toFn(c);var e=new JS.Hash();this.forEach(function(a){var b=c.apply(d||null,arguments);if(!e.hasKey(b))e.store(b,[]);e.get(b).push(a)});return e},inject:function(c,d,e){var f=JS.array(arguments),g=0,h={};switch(f.length){case 1:c=h;d=f[0];break;case 2:if(typeof c==='function'){c=h;d=f[0];e=f[1]}}d=JS.Enumerable.toFn(d);this.forEach(function(a){if(!g++&&c===h)return c=a;var b=[c].concat(JS.array(arguments));c=d.apply(e||null,b)});return c},map:function(a,b){if(!a)return this.enumFor('map');a=JS.Enumerable.toFn(a);var c=[];this.forEach(function(){c.push(a.apply(b||null,arguments))});return c},max:function(a,b){return this.minmax(a,b)[1]},maxBy:function(a,b){if(!a)return this.enumFor('maxBy');return this.minmaxBy(a,b)[1]},member:function(b){return this.any(function(a){return JS.Enumerable.areEqual(a,b)})},min:function(a,b){return this.minmax(a,b)[0]},minBy:function(a,b){if(!a)return this.enumFor('minBy');return this.minmaxBy(a,b)[0]},minmax:function(a,b){var c=this.sort(a,b);return[c[0],c[c.length-1]]},minmaxBy:function(a,b){if(!a)return this.enumFor('minmaxBy');var c=this.sortBy(a,b);return[c[0],c[c.length-1]]},none:function(a,b){return!this.any(a,b)},one:function(b,c){b=JS.Enumerable.toFn(b);var d=0;this.forEach(function(a){if(b?b.apply(c||null,arguments):a)d+=1});return d===1},partition:function(b,c){if(!b)return this.enumFor('partition');b=JS.Enumerable.toFn(b);var d=[],e=[];this.forEach(function(a){(b.apply(c||null,arguments)?d:e).push(a)});return[d,e]},reject:function(b,c){if(!b)return this.enumFor('reject');b=JS.Enumerable.toFn(b);var d=[];this.forEach(function(a){if(!b.apply(c||null,arguments))d.push(a)});return d},reverseForEach:function(a,b){if(!a)return this.enumFor('reverseForEach');a=JS.Enumerable.toFn(a);var c=this.toArray(),d=c.length;while(d--)a.call(b||null,c[d]);return this},select:function(b,c){if(!b)return this.enumFor('select');b=JS.Enumerable.toFn(b);var d=[];this.forEach(function(a){if(b.apply(c||null,arguments))d.push(a)});return d},sort:function(c,d){var e=JS.Enumerable.isComparable(this),f=this.toArray();c=c||(e?function(a,b){return a.compareTo(b)}:null);return c?f.sort(function(a,b){return c.call(d||null,a,b)}):f.sort()},sortBy:function(c,d){if(!c)return this.enumFor('sortBy');c=JS.Enumerable.toFn(c);var e=JS.Enumerable,f=new e.Collection(this.map(c,d)),g=e.isComparable(f);return new e.Collection(f.zip(this).sort(function(a,b){a=a[0];b=b[0];return g?a.compareTo(b):(a<b?-1:(a>b?1:0))})).map(function(a){return a[1]})},take:function(c){var d=[];this.forEachWithIndex(function(a,b){if(b<c)d.push(a)});return d},takeWhile:function(b,c){if(!b)return this.enumFor('takeWhile');b=JS.Enumerable.toFn(b);var d=[],e=true;this.forEach(function(a){if(e)e=e&&b.apply(c||null,arguments);if(e)d.push(a)});return d},toArray:function(){return this.drop(0)},zip:function(){var d=JS.Enumerable,e=[],f=0,g=arguments.length,h,i;if(typeof arguments[g-1]==='function'){h=arguments[g-1];i={}}if(typeof arguments[g-2]==='function'){h=arguments[g-2];i=arguments[g-1]}d.forEach.call(arguments,function(a){if(a===h||a===i)return;if(a.toArray)a=a.toArray();if(JS.isType(a,Array))e.push(a)});var j=this.map(function(b){var c=[b];d.forEach.call(e,function(a){c.push(a[f]===undefined?null:a[f])});return++f&&c});if(!h)return j;d.forEach.call(j,h,i)}});JS.Enumerable.define('forEach',JS.Enumerable.forEach);JS.Enumerable.alias({collect:'map',detect:'find',entries:'toArray',every:'all',findAll:'select',filter:'select',some:'any'});JS.Enumerable.extend({toFn:function(a){if(!a)return a;if(a.toFunction)return a.toFunction();if(this.OPS[a])return this.OPS[a];if(JS.isType(a,'string')||JS.isType(a,String))return function(){var b=JS.array(arguments),c=b.shift(),d=c[a];return(typeof d==='function')?d.apply(c,b):d};return a},OPS:{'+':function(a,b){return a+b},'-':function(a,b){return a-b},'*':function(a,b){return a*b},'/':function(a,b){return a/b},'%':function(a,b){return a%b},'^':function(a,b){return a^b},'&':function(a,b){return a&b},'&&':function(a,b){return a&&b},'|':function(a,b){return a|b},'||':function(a,b){return a||b},'==':function(a,b){return a==b},'!=':function(a,b){return a!=b},'>':function(a,b){return a>b},'>=':function(a,b){return a>=b},'<':function(a,b){return a<b},'<=':function(a,b){return a<=b},'===':function(a,b){return a===b},'!==':function(a,b){return a!==b},'[]':function(a,b){return a[b]},'()':function(a,b){return a(b)}},Enumerator:new JS.Class({include:JS.Enumerable,extend:{DEFAULT_METHOD:'forEach'},initialize:function(a,b,c){this._0=a;this._1=b||this.klass.DEFAULT_METHOD;this._2=(c||[]).slice()},equals:function(a){return JS.isType(a,this.klass)&&this._0===a._0&&this._1===a._1&&JS.Enumerable.areEqual(this._2,a._2)},forEach:function(a,b){if(!a)return this;var c=this._2.slice();c.push(a);if(b)c.push(b);return this._0[this._1].apply(this._0,c)}})});JS.Enumerable.Enumerator.alias({cons:'forEachCons',reverse:'reverseForEach',slice:'forEachSlice',withIndex:'forEachWithIndex',withObject:'forEachWithObject'});JS.Enumerable.Collection.include(JS.Enumerable);JS.Kernel.include({enumFor:function(a){var b=JS.array(arguments),a=b.shift();return new JS.Enumerable.Enumerator(this,a,b)}},{_3:false});JS.Kernel.alias({toEnum:'enumFor'});
//@ sourceMappingURL=enumerable.js.map