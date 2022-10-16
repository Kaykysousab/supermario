!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("AnimatedTiles",[],e):"object"==typeof exports?exports.AnimatedTiles=e():t.AnimatedTiles=e()}("undefined"!=typeof self?self:this,function(){return function(t){function e(n){if(i[n])return i[n].exports;var a=i[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var i={};return e.m=t,e.c=i,e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,i){"use strict";/**
* @author       Niklas Berg <nkholski@niklasberg.se>
* @copyright    2018 Niklas Berg
* @license      {@link https://github.com/nkholski/phaser3-animated-tiles/blob/master/LICENSE|MIT License}
*/
var n=function(t){this.scene=t,this.systems=t.sys,this.map=null,this.animatedTiles=[],this.rate=1,this.active=!1,this.activeLayer=[],this.followTimeScale=!0,t.sys.settings.isBooted||t.sys.events.once("boot",this.boot,this)};n.register=function(t){t.register("AnimatedTiles",n,"animatedTiles")},n.prototype={boot:function(){var t=this.systems.events;t.on("postupdate",this.postUpdate,this),t.on("shutdown",this.shutdown,this),t.on("destroy",this.destroy,this)},init:function(t){var e=this.getAnimatedTiles(t),i={map:t,animatedTiles:e,active:!0,rate:1,activeLayer:[]};t.layers.forEach(function(){return i.activeLayer.push(!0)}),this.animatedTiles.push(i),1===this.animatedTiles.length&&(this.active=!0)},setRate:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(null===e)null===i?this.rate=t:this.animatedTiles[i].rate=t;else{var n=function(i){i.forEach(function(i){i.index===e&&(i.rate=t)})};null===i?this.animatedTiles.forEach(function(t){n(t.animatedTiles)}):n(this.animatedTiles[i].animatedTiles)}},resetRates:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;null===t?(this.rate=1,this.animatedTiles.forEach(function(t){t.rate=1,t.animatedTiles.forEach(function(t){t.rate=1})})):(this.animatedTiles[t].rate=1,this.animatedTiles[t].animatedTiles.forEach(function(t){t.rate=1}))},resume:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=null===i?this:this.animatedTiles[i];null===e?n.active=!0:(n.activeLayer[e]=!0,n.animatedTiles.forEach(function(i){t.updateLayer(i,i.tiles[e])}))},pause:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=null===e?this:this.animatedTiles[e];null===t?i.active=!1:i.activeLayer[t]=!1},postUpdate:function(t,e){var i=this;if(this.active){var n=e*this.rate*(this.followTimeScale?this.scene.time.timeScale:1);this.animatedTiles.forEach(function(t){if(t.active){var e=n*t.rate;t.animatedTiles.forEach(function(n){if(n.next-=e*n.rate,n.next<0){var a=n.currentFrame,r=n.frames[a].tileid,s=a+1;s>n.frames.length-1&&(s=0),n.next=n.frames[s].duration,n.currentFrame=s,n.tiles.forEach(function(e,a){t.activeLayer[a]&&i.updateLayer(n,e,r)})}})}})}},updateLayer:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-1,n=[],a=t.frames[t.currentFrame].tileid;e.forEach(function(t){i>-1&&(null===t||t.index!==i)?n.push(t):t.index=a}),n.forEach(function(t){var i=e.indexOf(t);i>-1?e.splice(i,1):console.error("This shouldn't happen. Not at all. Blame Phaser Animated Tiles plugin. You'll be fine though.")})},shutdown:function(){},destroy:function(){this.shutdown(),this.scene=void 0},getAnimatedTiles:function(t){var e=this,i=[];return t.tilesets.forEach(function(e){var n=e.tileData;Object.keys(n).forEach(function(a){if(a=parseInt(a),n[a].hasOwnProperty("animation")){var r={index:a+e.firstgid,frames:[],currentFrame:0,tiles:[],rate:1};n[a].animation.forEach(function(t){var i={duration:t.duration,tileid:t.tileid+e.firstgid};r.frames.push(i)}),r.next=r.frames[0].duration,t.layers.forEach(function(t){if("StaticTilemapLayer"===t.tilemapLayer.type)return void r.tiles.push([]);var i=[];t.data.forEach(function(t){t.forEach(function(t){t.index-e.firstgid===a&&i.push(t)})}),r.tiles.push(i)}),i.push(r)}})}),t.layers.forEach(function(t,i){e.activeLayer[i]=!0}),i},putTileAt:function(t,e,i,n){},updateAnimatedTiles:function(){var t=null;null===t&&(t=[],this.animatedTiles.forEach(function(e){t.push(e)})),t.forEach(function(t){t.animatedTiles.forEach(function(e){e.tiles.forEach(function(i,n){if("StaticTilemapLayer"!==t.map.layers[n].type)for(var a=0;a<10;a++)for(var r=0;r<10;r++){var s=t.map.layers[n].data[a][r];s.index==e.index&&(-1===i.indexOf(s)&&i.push(s),s.index=e.frames[e.currentFrame].tileid)}})})})}},n.prototype.constructor=n,t.exports=n}])});