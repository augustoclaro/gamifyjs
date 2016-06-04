const gamify=function(){const t=function(){const t=function(t){const n=[];for(var e in t)n.push(t[e]);return n},n=function(t){return"function"==typeof t},e=function(t){const n=arguments.length;if(2>n||!t)return t;const e=function(t,n,e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))};for(var i=1;n>i;i++)for(var o=arguments[i],r=Object.getOwnPropertyNames(o),c=0;c<r.length;c++)e(o,t,r[c]);return t},i=function(t,n){var i=Object.create(n.prototype);e(i||{},t.prototype||{}),t.prototype=i},o=function(t,n){n.forEach(function(n){t.push(n)})},r=function(t){return{x:t.pos.x,y:t.pos.y,w:t.size.width,h:t.size.height}},c=function(t,n){return t.x<n.x+n.w&&t.x+t.w>n.x&&t.y<n.y+n.h&&t.y+t.h>n.y};return{extend:e,isFunction:n,allValues:t,inherit:i,pushMany:o,box:r,boxCollision:c}}(),n=function(t){const n={},e=function(){};return e.prototype.on=function(e,i){if(!e)throw"Event name can't be null";if(!t.isFunction(i))throw"Invalid event function";return n[e]||(n[e]=[]),n[e].push(i),this},e.prototype.emit=function(t){if(!t)throw"Event name can't be null";var e=Array.prototype.slice.call(arguments,1),i=n[t];i&&i.length&&i.forEach(function(t){t.apply(null,e)})},e}(t),e=function(t,n){const e=function(t,n,e,i){const o=this;o.id="anim-"+t.length+"-"+(new Date).getTime(),o.animating=!0,o.frameIndex=0;const r=t,c=n,a=e,s=i;var u=t[0].time;const f=function(t){t.renderSprite(c,r[o.frameIndex].sprite,a,s)},h=function(t,n){o.animating&&(f(t),u-=n,0>=u&&(o.frameIndex++,o.frameIndex===r.length&&(o.frameIndex=0,o.emit("animated",o)),u=r[o.frameIndex].time))};o.render=f,o.animate=h};return t.inherit(e,n),e}(t,n),i=function(t,n,e,i){this.name=t,this.type=n,this.dependencies=e,this.fn=i},o=function(t){var n,e,i,o,r;const c=function(){o(n[e],function(){e++,i>e?c():t.isFunction(r)&&r()})},a=function(a,s,u){Array.isArray(a)&&a.length&&t.isFunction(s)&&(n=a,e=0,i=a.length,o=s,r=u,c())};return a}(t),r=function(){const t=function(){this.context.clearRect(0,0,this.element.width,this.element.height)},n=function(){return this.element},e=function(){return this.context},i=function(t){var n=this.context.getImageData(0,0,this.element.width,this.element.height);t.getContext().putImageData(n,0,0,0,0,this.element.width,this.element.height)},o=function(t,n){this.element=document.createElement("canvas"),t&&this.element.setAttribute("id",t),this.element.setAttribute("width",n.width),this.element.setAttribute("height",n.height),this.context=this.element.getContext("2d")};return o.prototype={clear:t,getElement:n,getContext:e,transferTo:i},o}(),c=function(){const t={ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,A:65,W:87,D:68,S:83,SPACE:32},n={left:"l",up:"u",right:"r",down:"d"},e=[t.ARROW_LEFT,t.ARROW_UP,t.ARROW_RIGHT,t.ARROW_DOWN,t.A,t.W,t.D,t.S];return{keys:t,directions:n,directionKeys:e}}(),a=function(){this.lastTick=(new Date).getTime(),this.getElapsedTicks=function(){return this.frameSpacing||0},this.tick=function(t){const n=(new Date).getTime();this.frameSpacing=n-this.lastTick,this.lastTick=n,t&&(this.lastTick-=this.frameSpacing%t)}},s=function(t){const n={},e=function(e,i){const o={},r=function(){Object.keys(o).length===Object.keys(e).length&&t.isFunction(i)&&i(o)},c=function(){n[this.alt]=o[this.alt]=this,r()};for(var a in e)if(e.hasOwnProperty(a))if(n.hasOwnProperty(a))o[a]=n[a],r();else{const s=new Image;s.alt=a,s.onload=c,s.src=e[a]}};return{loadImages:e}}(t),u=function(t){var n,e=t.getElement();this.clearInput=function(){n={leftMouseClick:0,rightMouseClick:0,pressedKeys:[]}},this.clearInput(),this.checkForInput=function(){e.onmousedown=function(t){0===t.button?n.leftMouseClick=1:n.rightMouseClick.leftMouseClick=1},e.onmouseup=function(){n.leftMouseClick=n.rightMouseClick=0},document.onkeydown=function(t){const e=t.keyCode||t.which;-1===n.pressedKeys.indexOf(e)&&n.pressedKeys.push(e)},document.onkeyup=function(t){const e=t.keyCode||t.which,i=n.pressedKeys.indexOf(e);i>-1&&n.pressedKeys.splice(i,1)}},this.getInput=function(){return n}},f=function(t,n){var e=function(){this.loaded=!1};return t.inherit(e,n),e}(t,n),h=function(t,n){if(!t)throw"No game canvas found.";if(!n)throw"No buffer canvas found.";const e=n.getContext();this.getContext=function(){return e},this.render=function(e){n.clear(),e(),n.transferTo(t)}},l=function(t,n){var e=t,i=n.width,o=n.height,r=n.margin||0,c=n.sprites;this.getOffset=function(t){for(var n=0;n<c.length;n++){const e=c[n];if(e.name===t)return{x:e.x*i+r,y:e.y*o+r,width:i-2*r,height:o-2*r,rotate:e.rotate}}return null},this.getImage=function(){return e},this.size={width:i,height:o}};var d=function(t){return function(){this.create=function(n,e){const i=new t;var o,r=e;return{run:function(){o?o-=i.getElapsedTicks():o=r,0>=o&&(o=0,n.apply(null,arguments)),i.tick()},setInterval:function(t){r=t}}}}}(a);const m=function(t){return function(n){const e=function(t){var e=n.animations.map(function(t){return t.id}).indexOf(t.id);if(0>e)throw"Could not found animation "+t;n.animations.splice(e,1)};this.create=function(n,e,i,o){return new t(n,e,i,o)},this.animateOnce=function(t){n.animations.push(t.on("animated",function(t){t.animating=!1}))},this.animate=function(t){n.animations.push(t)},this.stop=e}}(e),g=function(t){return function(n){const e=function(e,i,o,r){if(!i)throw"Watch argument mods1 can't be null";if(!o)throw"Watch argument mods2 can't be null";if(!t.isFunction(r))throw"Watch argument fn must be a function";Array.isArray(i)||(i=[i]),Array.isArray(o)||(o=[o]),n.collisionWatchs[e]={modules1:i,modules2:o,callback:r}};this.watch=e}}(t),p=function(){return function(t){this.getConfig=function(){return t.config}}}();var y=function(t){return function(){this.loadImages=t.loadImages}}(s);const w=function(t){return function(n){this.pressedKeys=function(){var e=n.inputManager.getInput(),i={allKeys:e.pressedKeys};return i.directionKeys=i.allKeys.filter(function(n){return t.directionKeys.indexOf(n)>-1}),i}}}(c),x=(function(t){return t.keys}(c),function(t,n){const e=function(e){var i=function(t){var n=e.getContainerInstance(t);if(!n)throw"Could not find module '"&t&"'";return n};this.load=function(o,r){Array.isArray(o)||(o=[o]),o.forEach(function(o){var r="string"==typeof o?new(i(o)):o;"string"==typeof o&&(r.type=o),t.inherit(r,n),e.moduleManager.register(r)}),e.moduleManager.loadAll(function(){t.isFunction(r)&&r()})},this.unload=function(t){Array.isArray(t)||(t=[t]),t.forEach(function(t){e.moduleManager.unregister(t)})},this.create=function(t){var n=i(t),e=Array.prototype.slice.call(arguments,1);e.unshift(null),n=Function.prototype.bind.apply(n,e);var o=new n;return o.type=t,o}};return e}(t,f)),v=function(){return function(){this.getCenterPoint=function(t,n){return{x:t.x+n.width/2,y:t.y+n.height/2}},this.fromCenterPoint=function(t,n){return{x:t.x-n.width/2,y:t.y-n.height/2}}}}(),C=function(t){var n=this;n.getContext=function(){return t.renderer.getContext()},n.renderCircle=function(t,e,i){const o=n.getContext();o.beginPath(),o.fillStyle=i,o.arc(t.x,t.y,e,0,2*Math.PI,!1),o.fill(),o.closePath()},n.fillBG=function(t){const e=n.getContext();e.beginPath(),e.fillStyle=t,e.rect(0,0,e.canvas.width,e.canvas.height),e.fill(),e.closePath()};const e=function(t,e,i,o,r){const c=n.getContext();r=r||0;var a=r*Math.PI/180;c.translate(e.x,e.y),c.rotate(a),c.drawImage(t,i.x,i.y,i.width,i.height,o.width/2*-1,o.height/2*-1,o.width,o.height),c.rotate(-1*a),c.translate(-1*e.x,-1*e.y)};n.renderSprite=function(n,i,o,r,c){const a=t.getContainerInstance("$pos");o=o||{x:0,y:0};const s=n.getOffset(i);r=r||{height:s.height,width:s.width};const u=c?o:a.getCenterPoint(o,r);e(n.getImage(),u,s,r,(s.rotate||0)+(o.rotate||0))},n.renderText=function(t,e){const i=n.getContext();e.font&&(i.font=e.font),e.color&&(i.fillStyle=e.color),e.align&&(i.textAlign=e.align);var o;e.maxWidth&&(o=e.maxWidth),i.fillText(t,e.pos.x,e.pos.y,o)}},k=function(t){return function(){this.create=function(n,e){return new t(n,e)}}}(l),A=function(){return function(t){this.changeTo=function(n){t.setState(n)}}}(),b=function(t){return function(){const n=new t;this.create=function(t,e){return n.create(t,e)}}}(d),I=function(t){const n=[],e=function(t){n.push(t)},i=function(t){n.splice(n.indexOf(t),1),t.loaded=!1},o=function(t){n.length=0},r=function(e){t(n,function(t,n){t.loaded?n():t.load(function(){t.loaded=!0,n()})},e)},c=function(){n.forEach(function(t){t.loaded&&(t.update(),t.render())})},a=function(t){return n.filter(function(n){return n.type===t})},s=function(){};return s.prototype={register:e,unregister:i,clear:o,loadAll:r,renderAll:c,getByType:a},s}(o),E=function(t,n){const e=new t;var i,o,r;const c=function(t,e){if(i=parseFloat(t),!n.isFunction(e))throw"GameLoop parameter must be a function.";o=e},a=function(){const t=1e3/i;r&&window.requestAnimationFrame(a);const n=e.getElapsedTicks();n>t&&o(n),e.tick(t)},s=function(){r=!0,e.tick(),a()},u=function(){r=!1};return c.prototype={start:s,stop:u},c}(a,t),O=function(t,n,e,i,o,r,c,a,s,u,f,h,l,d,m,g,p,y,w){const x=function(x,v,C){var k=this;const b={size:{width:500,height:500},fps:50,canvasId:"game-canvas-"+(new Date).getTime()},I=x,E=w.extend(b,v),O={},T={},M={},W={},F={};C.forEach(function(t){w.extend(O,t.services),w.extend(T,t.states),w.extend(M,t.modules),w.extend(W,t.consts)});const R=function(t,n,e,i){if(!t)throw i+" must have a name";if(!n||!Array.isArray(n)&&!w.isFunction(n))throw i+" '"&t&"' implementation must be a function or array containing a function.";const o=[];var r=n;if(Array.isArray(n)){for(;n.length&&!w.isFunction(n[0]);)o.push(n.shift());if(!n.length||!w.isFunction(n[0]))throw"Last parameter must be a function at "+t;r=n[0]}if(e[t])throw i+" '"&t&"' exists.";e[t]=new d(t,i,o,r)},S=function(t,n){R(t,n,O,"Service")},P=function(t,n){R(t,n,T,"State")},$=function(t,n){R(t,n,M,"Module")},D=function(t,n){if(!t)throw"Constant must have a name";if(W[t])throw" '"&t&"' exists.";W[t]=n};var K;const _=function(t,n){n||(K=t);const e=[];switch(t.dependencies.forEach(function(n){if(!F[n]){var i=O[n]||T[n]||M[n];if(!i)throw"Could not find dependency '"&n&"' at '"&t.name&"'.";if(i===K)throw"Circular dependency found: '"&K.name&"' -> '"&n&"'";_(i,!0)}e.push(F[n])}),t.type){case"Service":e.unshift(null),F[t.name]=new(Function.prototype.bind.apply(t.fn,e));break;case"State":case"Module":F[t.name]=t.fn.apply(null,e)}},j=function(){w.extend(F,W),F.$game=new m(k),F.$module=new g(k),F.$renderer=new p(k),F.$imageLoader=new s,F.$sprite=new a,F.$input=new i(k),F.$animation=new o(k),F.$collision=new c(k),F.$state=new A(k),F.$timedFunction=new y,F.$pos=new r,F.$keys=t.keys,w.allValues(O).forEach(_),w.allValues(T).forEach(_),w.allValues(M).forEach(_)};var z,N;const V=function(){z=new l(E.canvasId,E.size),N=new l("buffer-canvas-"+(new Date).getTime(),E.size);var t=document.querySelector("[gmf-app='"+I+"']");if(!t)throw"Could not find element to bootstrap game.";t.parentNode.replaceChild(z.getElement(),t)},L=new n;var B;const G=function(t){if(!t)throw"Invalid null argument 'data'.";var n=t;if("string"==typeof t&&(n=T[t]),!n)throw"Could not find state "+t;L.clear(),k.animations=[],k.collisionWatchs={},B=new F[n.name]};var q;k.animations=[];const H=new f,U=function(t){k.animations=k.animations.filter(function(t){return t.animating}),k.animations.forEach(function(n){n.animate(t,H.getElapsedTicks())})},J=function(t){return F[t]};k.collisionWatchs={};const Q=function(){w.allValues(k.collisionWatchs).forEach(function(t){const n=[],e=[];t.modules1.forEach(function(t){"string"==typeof t?w.pushMany(n,L.getByType(t)):n.push(t)}),t.modules2.forEach(function(t){"string"==typeof t?w.pushMany(e,L.getByType(t)):e.push(t)}),n.forEach(function(n){e.forEach(function(e){n.loaded&&e.loaded&&w.boxCollision(w.box(n),w.box(e))&&t.callback(n,e)})})})};var X=!1;const Y=function(){k.renderer=new u(z,N),k.inputManager=new e(z),k.inputManager.checkForInput(),H.tick(),q=new h(E.fps,function(t){const n=function(){B.update(function(){k.renderer.render(function(){Q(),L.renderAll(),H.tick(),U(J("$renderer"))})})};B.loaded?X||n():(X=B.loaded=!0,B.load(function(){X=!1}))}),q.start()},Z=function(){j(),V(),G(E.initialState||w.allValues(T)[0]),Y()};k.name=I,k.config=E,k.services=O,k.states=T,k.modules=M,k.consts=W,k.service=S,k.state=P,k.module=$,k["const"]=D,k.start=Z,k.getContainerInstance=J,k.moduleManager=L,k.setState=G};return x}(c,I,u,w,m,v,g,k,y,h,a,E,r,i,p,x,C,b,t),T=function(t){const n={},e=function(e,i,o){if(i===o===void 0){const r=n[e];if(!r)throw"Could not find game import '"+e+"'";return r}return n[e]=new t(e,i,o)};return{game:e}}(O);return T}();