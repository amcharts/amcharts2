var inheriting={};var AmCharts={};
AmCharts.Class=function(c){var b=function(){if(arguments[0]===inheriting){return
}this.events={};this.construct.apply(this,arguments)
};if(c.inherits){b.prototype=new c.inherits(inheriting);
b.base=c.inherits.prototype;
delete c.inherits}else{b.prototype.createEvents=function(){for(var e=0,d=arguments.length;
e<d;e++){this.events[arguments[e]]=[]
}};b.prototype.listenTo=function(f,e,d){f.events[e].push({handler:d,scope:this})
};b.prototype.addListener=function(e,d,f){this.events[e].push({handler:d,scope:f})
};b.prototype.removeListener=function(h,g,e){var f=h.events[g];
for(var d=f.length-1;
d>=0;d--){if(f[d].handler===e){f.splice(d,1)
}}};b.prototype.fire=function(j,k){var e=this.events[j];
for(var f=0,d=e.length;
f<d;f++){var g=e[f];g.handler.call(g.scope,k)
}}}for(var a in c){b.prototype[a]=c[a]
}return b};AmCharts.AmChart=AmCharts.Class({construct:function(){this.createEvents("dataUpdated");
if(document.addEventListener){AmCharts.isNN=true;
AmCharts.isIE=false;AmCharts.ddd=0.5
}if(document.attachEvent){AmCharts.isNN=false;
AmCharts.isIE=true;AmCharts.ddd=0
}AmCharts.IEversion=0;
if(navigator.appVersion.indexOf("MSIE")!=-1){AmCharts.IEversion=parseFloat(navigator.appVersion.split("MSIE")[1])
}this.width="100%";this.height="100%";
this.dataChanged=true;
this.gesturesEnabled=false;
this.chartCreated=false;
this.previousHeight=0;
this.previousWidth=0;
this.backgroundColor="#FFFFFF";
this.backgroundAlpha=0;
this.borderAlpha=0;this.borderColor="#000000";
this.color="#000000";
this.fontFamily="Verdana";
this.fontWeight="normal";
this.fontSize=11;this.numberFormatter={precision:-1,decimalSeparator:".",thousandsSeparator:","};
this.percentFormatter={precision:2,decimalSeparator:".",thousandsSeparator:","};
this.labels=[];this.tempLabels=[];
this.allLabels=[];this.chartDiv=document.createElement("div");
this.chartDiv.style.overflow="hidden";
this.legendDiv=document.createElement("div");
this.legendDiv.style.overflow="hidden";
this.balloon=new AmCharts.AmBalloon();
this.balloon.chart=this;
try{document.createEvent("TouchEvent");
this.touchEventsEnabled=true
}catch(a){this.touchEventsEnabled=false
}try{document.createEvent("GestureEvent")
}catch(a){this.gesturesEnabled=false
}},drawChart:function(){this.destroy();
this.set=this.container.set();
if(this.backgroundColor!=undefined&&this.backgroundAlpha>0){this.background=AmCharts.rect(this.container,this.realWidth-1,this.realHeight,this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);
this.set.push(this.background)
}if(this.backgroundImage){var b=this.backgroundImage;
if(this.path){b=this.path+b
}var a=this.container.image(b,0,0,this.realWidth,this.realHeight);
this.set.push(a)}},write:function(d){if(!this.listenersAdded){this.addListeners();
this.listenersAdded=true
}var e=this;this.div=document.getElementById(d);
this.div.style.overflow="hidden";
this.measure();if(this.legend){var c=this.legend.position;
switch(c){case"bottom":this.div.appendChild(this.chartDiv);
this.div.appendChild(this.legendDiv);
break;case"top":this.div.appendChild(this.legendDiv);
this.div.appendChild(this.chartDiv);
break;case"absolute":this.legendDiv.style.position="absolute";
this.chartDiv.style.position="absolute";
if(this.legend.left!=undefined){this.legendDiv.style.left=this.legend.left
}if(this.legend.right!=undefined){this.legendDiv.style.right=this.legend.right
}if(this.legend.top!=undefined){this.legendDiv.style.top=this.legend.top
}if(this.legend.bottom!=undefined){this.legendDiv.style.bottom=this.legend.bottom
}this.div.appendChild(this.chartDiv);
this.div.appendChild(this.legendDiv);
break;case"left":this.legendDiv.style.position="relative";
this.chartDiv.style.position="absolute";
this.div.appendChild(this.chartDiv);
this.div.appendChild(this.legendDiv);
break;case"right":this.legendDiv.style.position="relative";
this.chartDiv.style.position="absolute";
this.div.appendChild(this.chartDiv);
this.div.appendChild(this.legendDiv);
break}}else{this.div.appendChild(this.chartDiv)
}this.container=Raphael(this.chartDiv,this.realWidth,this.realHeight);
this.initChart();if(this.tempLabels.length>0){for(var b=this.tempLabels.length-1;
b>=0;b--){var a=this.tempLabels[b];
this.addLabel(a.x,a.y,a.text,a.align,a.size,a.color,a.rotation,a.alpha,a.bold)
}this.tempLabels=[]}},initChart:function(){},measure:function(){this.divRealWidth=this.div.offsetWidth;
this.divRealHeight=this.div.offsetHeight;
if(this.div.clientHeight){this.divRealWidth=this.div.clientWidth;
this.divRealHeight=this.div.clientHeight
}this.divRealHeight=this.div.clientHeight;
this.realWidth=AmCharts.toCoordinate(this.width,this.divRealWidth);
this.realHeight=AmCharts.toCoordinate(this.height,this.divRealHeight);
if(this.realWidth!=this.previousWidth||this.realHeight!=this.previousHeight){this.chartDiv.style.width=this.realWidth+"px";
this.chartDiv.style.height=this.realHeight+"px";
if(this.container){this.container.setSize(this.realWidth,this.realHeight)
}this.balloon.setBounds(2,2,this.realWidth-2,this.realHeight)
}},destroy:function(){AmCharts.removeSet(this.set);
if(this.timeOuts){for(var a=0;
a<this.timeOuts.length;
a++){clearTimeout(this.timeOuts[a])
}}this.timeOuts=[]},setMouseCursor:function(a){document.body.style.cursor=a
},bringLabelsToFront:function(){for(var a=this.labels.length-1;
a>=0;a--){this.labels[a].toFront()
}},redrawLabels:function(){this.clearLabels();
for(var b=0;b<this.allLabels.length;
b++){var a=this.allLabels[b];
this.addLabel(a.x,a.y,a.text,a.align,a.size,a.color,a.rotation,a.alpha,a.bold)
}},addLabel:function(j,g,l,e,n,b,m,a,f){if(this.container){var d=AmCharts.toCoordinate(j,this.realWidth);
var c=AmCharts.toCoordinate(g,this.realHeight);
if(!d){d=0}if(!c){c=0
}if(b==undefined){b=this.color
}if(isNaN(n)){n=this.fontSize
}if(!e){e="start"}if(e=="left"){e="start"
}if(e=="right"){e="end"
}if(e=="center"){e="middle";
if(!m){d=this.realWidth/2-d
}else{c=this.realHeight-c+c/2
}}if(a==undefined){a=1
}if(m==undefined){m=0
}c+=n/2;var h=AmCharts.text(this.container,d,c,l,{fill:b,"fill-opacity":a,"text-anchor":e,"font-family":this.fontFamily,"font-size":n,rotation:m});
if(f){h.attr({"font-weight":"bold"})
}h.toFront();this.labels.push(h)
}else{var k={x:j,y:g,text:l,align:e,size:n,color:b,alpha:a,rotation:m,bold:f};
this.tempLabels.push(k);
this.allLabels.push(k)
}},clearLabels:function(){for(var a=this.labels.length-1;
a>=0;a--){this.labels[a].remove()
}this.labels=[]},updateHeight:function(){var a=this.divRealHeight;
if(this.legend){var b=Number(this.legendDiv.style.height.replace("px",""));
var c=this.legend.position;
if(c=="top"||c=="bottom"){a-=b;
if(a<0){a=0}this.chartDiv.style.height=a+"px"
}}return a},updateWidth:function(){var d=this.divRealWidth;
var a=this.divRealHeight;
if(this.legend){var e=Number(this.legendDiv.style.width.replace("px",""));
var b=Number(this.legendDiv.style.height.replace("px",""));
var c=this.legend.position;
if(c=="right"||c=="left"){d-=e;
if(d<0){d=0}this.chartDiv.style.width=d+"px";
if(c=="right"){this.chartDiv.style.left=e+"px"
}else{this.legendDiv.style.left=d+"px"
}this.legendDiv.style.top=(a-b)/2+"px"
}}return d},addListeners:function(){var a=this;
if(this.touchEventsEnabled){this.chartDiv.addEventListener("touchstart",function(b){a.handleTouchMove.call(a,b)
},true);this.chartDiv.addEventListener("touchmove",function(b){a.handleTouchMove.call(a,b)
},true);this.chartDiv.addEventListener("touchstart",function(b){a.handleTouchStart.call(a,b)
});this.chartDiv.addEventListener("touchend",function(b){a.handleTouchEnd.call(a,b)
});if(this.gesturesEnabled){this.chartDiv.addEventListener("gesturechange",function(b){a.handleGestureChange.call(a,b)
});this.chartDiv.handleGestureStart("gesturestart",function(b){a.handleTouchEnd.call(a,b)
});this.chartDiv.handleGestureEnd("gestureend",function(b){a.handleTouchEnd.call(a,b)
})}}else{if(AmCharts.isNN){document.addEventListener("mousemove",function(b){a.handleMouseMove.call(a,b)
},true);window.addEventListener("resize",function(){if(AmCharts.isPercents(a.width)||AmCharts.isPercents(a.height)){a.invalidateSize()
}},true);document.addEventListener("mouseup",function(b){a.handleReleaseOutside.call(a,b)
},true);this.chartDiv.addEventListener("mousedown",function(b){a.handleMouseDown.call(a,b)
},true);this.chartDiv.addEventListener("mouseover",function(b){a.handleMouseOver.call(a,b)
},true);this.chartDiv.addEventListener("mouseout",function(b){a.handleMouseOut.call(a,b)
},true)}if(AmCharts.isIE){document.attachEvent("onmousemove",function(b){a.handleMouseMove.call(a,b)
});this.chartDiv.attachEvent("onmousedown",function(b){a.handleMouseDown.call(a,b)
});this.chartDiv.attachEvent("onmouseover",function(b){a.handleMouseOver.call(a,b)
});this.chartDiv.attachEvent("onmouseout",function(b){a.handleMouseOut.call(a,b)
});document.attachEvent("onmouseup",function(){a.handleReleaseOutside.call(a,event)
});window.attachEvent("onresize",function(){if(AmCharts.isPercents(a.width)||AmCharts.isPercents(a.height)){a.invalidateSize()
}})}}},dispatchDataUpdatedEvent:function(){this.fire("dataUpdated",{type:"dataUpdated"})
},drb:function(){var a="moc.strahcma".split("").reverse().join("");
var k=window.location.hostname;
var h=k.split(".");if(h.length>=2){var e=h[h.length-2]+"."+h[h.length-1]
}if(e!=a){var b=this;
var f=this.container.set();
var d=AmCharts.rect(this.container,145,20,"#FFFFFF",1);
var g=AmCharts.text(this.container,2,2,"moc.strahcma yb trahc".split("").reverse().join(""),{fill:"#000000","font-family":"Verdana","font-size":11,"text-anchor":"start"});
g.translate(5+","+8);
f.push(d);f.push(g);this.set.push(f);
f.click(function(){window.location.href="http://"+a
});for(var c=0;c<f.length;
c++){f[c].attr({cursor:"pointer"})
}}},invalidateSize:function(){this.measure();
if(this.realWidth!=this.previousWidth||this.realHeight!=this.previousHeight){if(this.chartCreated){if(this.legend){this.legend.invalidateSize()
}this.redrawLabels();
this.initChart()}this.previousHeight=this.realWidth;
this.previousWidth=this.realHeight
}},validateData:function(){this.dataChanged=true;
this.initChart()},validateNow:function(){this.initChart()
},showItem:function(a){a.hidden=false;
this.initChart()},hideItem:function(a){a.hidden=true;
this.initChart()},hideBalloon:function(){var a=this;
this.hoverInt=setTimeout(function(){a.hideBalloonReal.call(a)
},100)},hideBalloonReal:function(){if(this.balloon){this.balloon.hide()
}},showBalloon:function(e,c,b,a,f){var d=this;
if(this.balloon.enabled){this.balloon.followCursor(false);
this.balloon.changeColor(c);
if(!b){this.balloon.setPosition(a,f)
}this.balloon.followCursor(b);
this.balloon.showBalloon(e)
}},handleTouchMove:function(c){var a;
var f;var d=this.chartDiv;
if(c.touches){var b=c.touches.item(0);
this.mouseX=b.clientX-AmCharts.findPosX(d);
this.mouseY=b.clientY-AmCharts.findPosY(d)
}},handleMouseOver:function(a){this.mouseIsOver=true
},handleMouseOut:function(a){this.mouseIsOver=false
},handleMouseMove:function(c){var d=this.chartDiv;
var b=0;var a=0;if(!c){c=widown.event
}if(document.attachEvent&&!window.opera){b=AmCharts.findPosX(d);
a=AmCharts.findPosY(d);
this.mouseX=window.event.clientX-b;
this.mouseY=window.event.clientY-a
}if(AmCharts.isNN||window.opera){this.mouseX=c.pageX-AmCharts.findPosX(d);
this.mouseY=c.pageY-AmCharts.findPosY(d)
}},handleTouchStart:function(a){this.handleMouseDown(a)
},handleTouchEnd:function(a){this.handleReleaseOutside(a)
},handleGestureChange:function(a){},handleGestureStart:function(a){},handleGestureEnd:function(a){},handleReleaseOutside:function(a){if(a){if(a.preventDefault){a.preventDefault()
}if(a.returnValue){a.returnValue=false
}if(a.stopPropagation){a.stopPropagation()
}}},handleMouseDown:function(a){if(a){if(a.preventDefault){a.preventDefault()
}if(a.stopPropagation){a.stopPropagation=true
}}},addLegend:function(a){this.legend=a;
this.legend.chart=this;
this.legend.div=this.legendDiv;
this.listenTo(this.legend,"showItem",this.handleLegendEvent);
this.listenTo(this.legend,"hideItem",this.handleLegendEvent);
this.listenTo(this.legend,"clickMarker",this.handleLegendEvent);
this.listenTo(this.legend,"rollOverItem",this.handleLegendEvent);
this.listenTo(this.legend,"rollOutItem",this.handleLegendEvent);
this.listenTo(this.legend,"rollOverMarker",this.handleLegendEvent);
this.listenTo(this.legend,"rollOutMarker",this.handleLegendEvent);
this.listenTo(this.legend,"clickLabel",this.handleLegendEvent)
},removeLegend:function(){this.legend=undefined
}});AmCharts.toBoolean=function(b,a){if(b==undefined){return a
}switch(String(b).toLowerCase()){case"true":case"yes":case"1":return true;
case"false":case"no":case"0":case null:return false;
default:return Boolean(b)
}};AmCharts.formatMilliseconds=function(d,c){if(d.indexOf("fff")!=-1){var b=c.getMilliseconds();
var a=String(b);if(b<10){a="00"+b
}if(b>=10&&b<100){a="0"+b
}d=d.replace(/fff/g,a)
}return d};AmCharts.toNumber=function(a){if(typeof(a)=="number"){return a
}else{return Number(String(a).replace(/[^0-9\-.]+/g,""))
}};AmCharts.toColor=function(c){if(c!=""&&c!=undefined){if(c.indexOf(",")!=-1){var a=c.split(",");
for(var b=0;b<a.length;
b++){var d=a[b].substring(a[b].length-6,a[b].length);
a[b]="#"+d}c=a}else{c=c.substring(c.length-6,c.length);
c="#"+c}}return c},AmCharts.toSvgColor=function(a,d){if(typeof(a)=="object"){if(d==undefined){d=90
}var b=d;for(var c=0;
c<a.length;c++){b+="-"+a[c]
}return b}else{return a
}};AmCharts.toCoordinate=function(c,a,b){var d;
if(c!=undefined){c=c.toString();
if(b){if(b<a){a=b}}d=Number(c);
if(c.indexOf("!")!=-1){d=a-Number(c.substr(1))
}if(c.indexOf("%")!=-1){d=a*Number(c.substr(0,c.length-1))/100
}}return d};AmCharts.fitToBounds=function(c,b,a){if(c<b){c=b
}if(c>a){c=a}return c
};AmCharts.isDefined=function(a){if(a==undefined){return false
}else{return true}};AmCharts.stripNumbers=function(a){return a.replace(/[0-9]+/g,"")
};AmCharts.extractPeriod=function(c){var a=AmCharts.stripNumbers(c);
var b=1;if(a!=c){b=Number(c.slice(0,c.indexOf(a)))
}return{period:a,count:b}
};AmCharts.resetDateToMin=function(a,f,d){var g;
var e;var h;var j;var c;
var k;var b;switch(f){case"YYYY":g=Math.floor(a.getFullYear()/d)*d;
e=0;h=1;j=0;c=0;k=0;b=0;
break;case"MM":g=a.getFullYear();
e=Math.floor((a.getMonth())/d)*d;
h=1;j=0;c=0;k=0;b=0;break;
case"WW":g=a.getFullYear();
e=a.getMonth();var l=a.getDay();
if(l==0){l=7}h=a.getDate()-l+1;
j=0;c=0;k=0;b=0;break;
case"DD":g=a.getFullYear();
e=a.getMonth();h=Math.floor((a.getDate())/d)*d;
j=0;c=0;k=0;b=0;break;
case"hh":g=a.getFullYear();
e=a.getMonth();h=a.getDate();
j=Math.floor(a.getHours()/d)*d;
c=0;k=0;b=0;break;case"mm":g=a.getFullYear();
e=a.getMonth();h=a.getDate();
j=a.getHours();c=Math.floor(a.getMinutes()/d)*d;
k=0;b=0;break;case"ss":g=a.getFullYear();
e=a.getMonth();h=a.getDate();
j=a.getHours();c=a.getMinutes();
k=Math.floor(a.getSeconds()/d)*d;
b=0;break;case"fff":g=a.getFullYear();
e=a.getMonth();h=a.getDate();
j=a.getHours();c=a.getMinutes();
k=a.getSeconds();b=Math.floor(a.getMilliseconds()/d)*d;
break}a=new Date(g,e,h,j,c,k,b);
return a};AmCharts.getPeriodDuration=function(c,a){if(a==undefined){a=1
}var b;switch(c){case"YYYY":b=31622400000;
break;case"MM":b=2678400000;
break;case"WW":b=604800000;
break;case"DD":b=86400000;
break;case"hh":b=3600000;
break;case"mm":b=60000;
break;case"ss":b=1000;
break;case"fff":b=1;break
}return b*a};AmCharts.roundTo=function(b,a){if(a<0){return b
}else{var c=Math.pow(10,a);
return(Math.round(b*c)/c)
}};AmCharts.formatNumber=function(c,n,m,f,q,j,h,k){c=AmCharts.roundTo(c,n.precision);
var r=n.decimalSeparator;
var l=n.thousandsSeparator;
if(c<0){var a="-"}else{var a=""
}c=Math.abs(c);if(h==true){p=AmCharts.toScientific(c,r)
}else{if(j!=undefined){for(var b=j.length-1;
b>-1;b--){if(k>j[b].number&&c!=0){c=c/j[b].number;
var e=j[b].letter;break
}}}if(c.toString().indexOf("e")!=-1){var o=scientificToNormal(c)
}else{var o=c.toString()
}var g=o.split(".");var p="";
var d=g[0].toString();
for(var b=d.length;b>=0;
b=b-3){if(b!=d.length){if(b!=0){p=d.substring(b-3,b)+l+p
}else{p=d.substring(b-3,b)+p
}}else{p=d.substring(b-3,b)
}}if(g[1]!=undefined){p=p+r+g[1]
}if(m!=undefined&&m>0&&p!="0"){p=AmCharts.addZeroes(p,r,m)
}if(e!=undefined){p=p+e
}}p=a+p;if(a==""&&f==true&&c!=0){p="+"+p
}if(q==true){p=p+"%"}return(p)
};AmCharts.addZeroes=function(b,c,a){var d=b.split(c);
if(d[1]==undefined&&a>0){d[1]="0"
}if(d[1].length<a){d[1]=d[1]+"0";
return AmCharts.addZeroes(d[0]+c+d[1],c,a)
}else{if(d[1]!=undefined){return d[0]+c+d[1]
}else{return d[0]}}};
AmCharts.toScientific=function(b,d){if(b==0){return"0"
}var c=Math.floor(Math.log(Math.abs(b))*Math.LOG10E);
var a=Math.pow(10,c);
mantissa=mantissa.toString().split(".").join(d);
return mantissa.toString()+"e"+c
};AmCharts.generateGradient=function(a,e,c){var d=e;
if(c){for(var b=c.length-1;
b>=0;b--){d+="-"+AmCharts.adjustLuminosity(a,c[b]/100)
}}else{if(typeof(a)=="object"){if(a.length>1){for(var b=0;
b<a.length;b++){d+="-"+a[b]
}}else{d=a[0]}}else{d=a
}}return d};AmCharts.randomColor=function(){function a(){return Math.floor(Math.random()*256).toString(16)
}return"#"+a()+a()+a()
};AmCharts.hitTest=function(g,e,h){var f=false;
var b=g.x;var a=g.x+g.width;
var d=g.y;var c=g.y+g.height;
if(!f){f=AmCharts.isInRectangle(b,d,e)
}if(!f){f=AmCharts.isInRectangle(b,c,e)
}if(!f){f=AmCharts.isInRectangle(a,d,e)
}if(!f){f=AmCharts.isInRectangle(a,c,e)
}if(!f&&h!=true){f=AmCharts.hitTest(e,g,true)
}return f};AmCharts.isInRectangle=function(a,c,b){if(a>=b.x&&a<=b.x+b.width&&c>=b.y&&c<=b.y+b.height){return true
}else{return false}};
AmCharts.isPercents=function(a){if(String(a).indexOf("%")!=-1){return true
}};AmCharts.dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
AmCharts.shortDayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
AmCharts.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
AmCharts.shortMonthNames=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
AmCharts.formatDate=function(x,u){var j=x.getFullYear();
var v=x.getYear();if(v<10){v="0"+v
}var B=x.getMonth();var g=B+1;
if(B<10){g="0"+g}var z=x.getDate();
var k=z;if(z<10){k="0"+z
}var r=x.getDay();var c="0"+r;
var t=x.getHours();var s=t;
if(s==24){s=0}var A=s;
if(A<10){A="0"+A}u=u.replace(/JJ/g,A);
u=u.replace(/J/g,s);var m=t;
if(m==0){m=24}var e=m;
if(e<10){e="0"+e}u=u.replace(/HH/g,e);
u=u.replace(/H/g,m);var y=t;
if(y>11){y-=12}var D=y;
if(D<10){D="0"+D}u=u.replace(/KK/g,D);
u=u.replace(/K/g,y);var a=t;
if(a>12){a-=12}var n=a;
if(n<10){n="0"+n}u=u.replace(/LL/g,n);
u=u.replace(/L/g,a);var q=x.getMinutes();
var b=q;if(b<10){b="0"+b
}u=u.replace(/NN/g,b);
u=u.replace(/N/g,q);var l=x.getSeconds();
var p=l;if(p<10){p="0"+p
}u=u.replace(/SS/g,p);
u=u.replace(/S/g,l);var h=x.getMilliseconds();
var o=h;if(o<10){o="00"+o
}if(o<100){o="0"+o}var C=h;
if(C<10){C="00"+C}u=u.replace(/QQQ/g,o);
u=u.replace(/QQ/g,C);
u=u.replace(/Q/g,h);if(t<12){u=u.replace(/A/g,"am")
}else{u=u.replace(/A/g,"pm")
}u=u.replace(/YYYY/g,"@IIII@");
u=u.replace(/YY/g,"@III@}");
u=u.replace(/MMMM/g,"@XXXX@");
u=u.replace(/MMM/g,"@XXX@");
u=u.replace(/MM/g,"@XX@");
u=u.replace(/M/g,"@X@");
u=u.replace(/DD/g,"@RR@");
u=u.replace(/D/g,"@R@");
u=u.replace(/EEEE/g,"@PPPP@");
u=u.replace(/EEE/g,"@PPP@");
u=u.replace(/EE/g,"@PP@");
u=u.replace(/E/g,"@P@");
u=u.replace(/@IIII@/g,j);
u=u.replace(/@II@/g,v);
u=u.replace(/@XXXX@/g,AmCharts.monthNames[B]);
u=u.replace(/@XXX@/g,AmCharts.shortMonthNames[B]);
u=u.replace(/@XX@/g,g);
u=u.replace(/@X@/g,(B+1));
u=u.replace(/@RR@/g,k);
u=u.replace(/@R@/g,z);
u=u.replace(/@PPPP@/g,AmCharts.dayNames[r]);
u=u.replace(/@PPP@/g,AmCharts.shortDayNames[r]);
u=u.replace(/@PP@/g,c);
u=u.replace(/@P@/g,r);
return u};AmCharts.findPosX=function(a){var b=a.offsetLeft;
while((a=a.offsetParent)){b+=a.offsetLeft;
if(a!=document.body&&a!=document.documentElement){b-=a.scrollLeft
}}return b};AmCharts.findPosY=function(a){var b=a.offsetTop;
while((a=a.offsetParent)){b+=a.offsetTop;
if(a!=document.body&&a!=document.documentElement){b-=a.scrollTop
}}return b};AmCharts.formatString=function(a,b,d,c){a=a.replace(/<br>/g,"\n");
if(b.value!=undefined){a=a.replace(/\[\[value\]\]/g,AmCharts.formatNumber(b.value,d))
}if(b.open!=undefined){a=a.replace(/\[\[open\]\]/g,AmCharts.formatNumber(b.open,d))
}if(b.close!=undefined){a=a.replace(/\[\[close\]\]/g,AmCharts.formatNumber(b.close,d))
}if(b.low!=undefined){a=a.replace(/\[\[low\]\]/g,AmCharts.formatNumber(b.low,d))
}if(b.high!=undefined){a=a.replace(/\[\[high\]\]/g,AmCharts.formatNumber(b.high,d))
}if(b.percents!=undefined){a=a.replace(/\[\[percents\]\]/g,AmCharts.formatNumber(b.percents,c))
}if(b.title!=undefined){a=a.replace(/\[\[title\]\]/g,b.title)
}else{a=a.replace(/\[\[title\]\]/g,"")
}if(b.category!=undefined){a=a.replace(/\[\[category\]\]/g,b.category)
}else{a=a.replace(/\[\[category\]\]/g,"")
}if(b.graphTitle!=undefined){a=a.replace(/\[\[graphTitle\]\]/g,b.graphTitle)
}else{a=a.replace(/\[\[graphTitle\]\]/g,"")
}if(b.description!=undefined){a=a.replace(/\[\[description\]\]/g,b.description)
}else{a=a.replace(/\[\[description\]\]/g,"")
}return a};AmCharts.removeSet=function(a){if(a){a.remove()
}};AmCharts.recommended=function(){var b="js";
var a=document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1");
if(!a){if(swfobject){if(swfobject.hasFlashPlayerVersion("8")){b="flash"
}}}return b};AmCharts.Bezier=AmCharts.Class({construct:function(a,p,m,g,f,o,c,d,b,r){if(typeof(c)=="object"){c=c[0]
}if(typeof(d)=="object"){d=d[0]
}var l="";if(b==1){l="."
}if(b>1){l="-"}var j={stroke:g,fill:c,"fill-opacity":d,"stroke-dasharray":l,opacity:f,"stroke-width":o};
var e="L";var n=p.length;
this.lineArray=["M",p[0],m[0]];
var q=[];for(var h=0;
h<n;h++){q.push({x:p[h],y:m[h]})
}if(q.length>1){var k=this.interpolate(q);
this.drawBeziers(k)}this.lineArray=this.lineArray.concat(r);
this.path=a.path(this.lineArray).attr(j)
},interpolate:function(l){var j=[];
j.push({x:l[0].x,y:l[0].y});
var e=l[1].x-l[0].x;var c=l[1].y-l[0].y;
j.push({x:l[0].x+e/6,y:l[0].y+c/6});
var b=3;var a=6;for(var d=1;
d<l.length-1;d++){var k=l[d-1];
var g=l[d];var f=l[d+1];
e=f.x-g.x;c=f.y-k.y;var h=g.x-k.x;
if(h>e){h=e}j.push({x:g.x-h/b,y:g.y-c/a});
j.push({x:g.x,y:g.y});
j.push({x:g.x+h/b,y:g.y+c/a})
}c=l[l.length-1].y-l[l.length-2].y;
e=l[l.length-1].x-l[l.length-2].x;
j.push({x:l[l.length-1].x-e/b,y:l[l.length-1].y-c/6});
j.push({x:l[l.length-1].x,y:l[l.length-1].y});
return j},drawBeziers:function(b){for(var a=0;
a<(b.length-1)/3;a++){this.drawBezierMidpoint(b[3*a],b[3*a+1],b[3*a+2],b[3*a+3])
}},drawBezierMidpoint:function(c,b,o,l){var f=this.getPointOnSegment(c,b,3/4);
var d=this.getPointOnSegment(l,o,3/4);
var p=(l.x-c.x)/16;var m=(l.y-c.y)/16;
var j=this.getPointOnSegment(c,b,3/8);
var h=this.getPointOnSegment(f,d,3/8);
h.x-=p;h.y-=m;var g=this.getPointOnSegment(d,f,3/8);
g.x+=p;g.y+=m;var e=this.getPointOnSegment(l,o,3/8);
var a=this.getMiddle(j,h);
var n=this.getMiddle(f,d);
var k=this.getMiddle(g,e);
this.lineArray.push("Q",j.x,j.y,a.x,a.y);
this.lineArray.push("Q",h.x,h.y,n.x,n.y);
this.lineArray.push("Q",g.x,g.y,k.x,k.y);
this.lineArray.push("Q",e.x,e.y,l.x,l.y)
},getMiddle:function(c,b){var a={x:(c.x+b.x)/2,y:(c.y+b.y)/2};
return a},getPointOnSegment:function(c,b,d){var a={x:c.x+(b.x-c.x)*d,y:c.y+(b.y-c.y)*d};
return a}});AmCharts.Cuboid=AmCharts.Class({construct:function(b,d,m,o,n,a,f,e,h,g,l,j){this.set=b.set();
this.container=b;this.h=m;
this.w=d;this.dx=o;this.dy=n;
this.colors=a;this.alpha=f;
this.bwidth=e;this.bcolor=h;
this.balpha=g;if(typeof(this.colors)!="object"){var k=this.colors;
this.colors=[k]}if(this.w<0&&l==0){l=180
}if(this.h<0&&l==270){l=90
}this.gradientRotation=l;
if(this.dx==0&&this.dy==0){this.cornerRadius=j
}this.draw()},draw:function(){this.set.remove();
var t=0;var m=Math.abs(this.w);
var s=Math.abs(this.h);
var n=this.dx;var l=this.dy;
if(this.dx>0||l>0){var c=this.colors[this.colors.length-1];
if(this.h>0){c=this.colors[0]
}var d=AmCharts.adjustLuminosity(c,-0.2);
var o=AmCharts.polygon(this.container,[0,n,m+n,m,0],[0,l,l,0,0],[d],this.alpha,0,0,0,this.gradientRotation);
this.set.push(o);var b=AmCharts.line(this.container,[0,n,m+n],[0,l,l],this.bcolor,this.balpha,this.bwidth);
this.set.push(b);var d=AmCharts.adjustLuminosity(this.colors[0],-0.2);
var q=AmCharts.rect(this.container,m,s,d,this.alpha,0,0,0,0,this.gradientRotation);
this.set.push(q);q.translate(n+","+(-s+l));
var k=AmCharts.line(this.container,[n,n],[l,-s+l],this.bcolor,this.balpha,this.bwidth);
this.set.push(k);var r=AmCharts.polygon(this.container,[0,0,n,n,0],[0,-s,-s+l,l,0],d,this.alpha,0,0,0,this.gradientRotation);
this.set.push(r);var j=AmCharts.polygon(this.container,[0,0,n,n,0],[0,-s,-s+l,l,0],d,this.alpha,0,0,0,this.gradientRotation);
j.translate(m+","+0);
this.set.push(j);var f=AmCharts.line(this.container,[0,n,n,0],[-s,-s+l,l,0],this.bcolor,this.balpha,this.bwidth);
this.set.push(f);f.translate(m+","+0);
var e=this.colors[0];
var g=this.alpha[0];if(this.h>0){e=this.colors[this.colors.length-1];
g=this.alpha[this.alpha.length-1]
}var d=AmCharts.adjustLuminosity(e,0.2);
var p=AmCharts.polygon(this.container,[0,n,m+n,m,0],[0,l,l,0,0],[d],this.alpha,0,0,0,this.gradientRotation);
p.translate(0+","+(-s));
this.set.push(p);var a=AmCharts.line(this.container,[0,n,m+n],[0,l,l],this.bcolor,this.balpha,this.bwidth);
a.translate(0+","+(-s));
this.set.push(a)}this.front=AmCharts.rect(this.container,Math.abs(m),Math.abs(s),this.colors,this.alpha,this.bwidth,this.bcolor,this.balpha,this.cornerRadius,this.gradientRotation);
this.front.translate(0+","+(-s));
this.set.push(this.front)
},y:function(a){if(this.h<0){this.set.translate(0+","+a)
}else{this.set.translate(0+","+(a+this.h))
}},x:function(a){if(this.w<0){this.set.translate((a+this.w)+","+0)
}else{this.set.translate(a+","+0)
}},width:function(a){this.w=a;
this.draw()},height:function(a){this.h=a;
this.draw()},getX:function(){return this.front.getBBox().x
},getY:function(){return this.front.getBBox().y
}});AmCharts.AmLegend=AmCharts.Class({construct:function(){this.createEvents("rollOverMarker","rollOverItem","rollOutMarker","rollOutItem","showItem","hideItem","clickMarker","rollOverItem","rollOutItem","clickLabel");
this.position="bottom";
this.color="#000000";
this.borderColor="#000000";
this.borderAlpha=0;this.markerLabelGap=5;
this.verticalGap=10;this.align="left";
this.horizontalGap=0;
this.spacing=10;this.markerDisabledColor="#AAB3B3";
this.markerType="square";
this.markerSize=16;this.markerBorderAlpha=0;
this.markerBorderThickness=1;
this.marginTop=10;this.marginBottom=10;
this.marginRight=15;this.marginLeft=80;
this.valueWidth=50;this.switchable=true;
this.switchType="x";this.switchColor="#FFFFFF";
this.rollOverColor="#CC0000";
this.selectedColor;this.reversedOrder=false;
this.labelText="[[title]]";
this.useMarkerColorForLabels=false;
this.rollOverGraphAlpha=1;
this.textClickEnabled=true;
this.usePositiveNegativeOnPercentsOnly=false
},setData:function(a){this.data=a;
this.invalidateSize()
},invalidateSize:function(){this.destroy();
this.entries=[];this.valueLabels=[];
if(this.data){if(this.data.length>0){this.drawLegend()
}}},drawLegend:function(){if(this.position=="right"||this.position=="left"){this.maxColumns=1;
this.marginRight=10;this.marginLeft=10
}if(this.width!=undefined){this.divWidth=AmCharts.toCoordinate(this.width,this.chart.realWidth)
}else{this.divWidth=this.chart.realWidth
}this.div.style.width=this.divWidth+"px";
this.container=Raphael(this.div,this.divWidth,this.chart.realHeight);
this.maxLabelWidth=0;
this.index=0;for(var a=0;
a<this.data.length;a++){this.createEntry(this.data[a])
}this.index=0;for(var a=0;
a<this.data.length;a++){this.createValue(this.data[a])
}this.arrangeEntries();
this.updateValues()},arrangeEntries:function(){w=this.divWidth-this.marginRight-this.marginLeft;
var q=0;var o=0;for(var p=0;
p<this.entries.length;
p++){var a=this.entries[p].getBBox();
var r=a.width;if(r>q){q=r
}var f=a.height;if(f>o){o=f
}}var k=0;var d=0;this.set=this.container.set();
for(var p=0;p<this.entries.length;
p++){var c=this.entries[p];
if(this.reversedOrder){c=this.entries[this.entries.length-p-1]
}var a=c.getBBox();var m=(this.horizontalGap+d*(q+this.spacing+this.markerLabelGap));
if(m+a.width>w&&p>0){k++;
d=0;m=this.horizontalGap
}var l=this.verticalGap+(o+this.verticalGap)*k;
c.translate(m+","+l);
d++;if(!isNaN(this.maxColumns)){if(d>=this.maxColumns){d=0;
k++}}this.set.push(c)
}var g=this.set.getBBox().height+2*this.verticalGap;
if(this.position=="left"||this.position=="right"){var s=this.set.getBBox().width+2*this.horizontalGap;
var b=s+this.marginLeft+this.marginRight;
this.div.style.width=b+"px"
}else{var s=this.divWidth-this.marginLeft-this.marginRight
}var j=this.marginLeft;
var h=this.marginTop;
var e=AmCharts.rect(this.container,s,g,this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);
e.toBack();this.set.push(e);
this.set.translate(j+","+h);
if(this.position=="top"||this.position=="bottom"){this.set.pop();
if(this.align=="center"){this.set.translate(((s-(this.set.getBBox().width))/2)+","+0)
}}var n=g+this.marginTop+this.marginBottom;
this.div.style.height=n+"px"
},createEntry:function(g){if(g.visibleInLegend!==false){var f=g.markerType;
if(!f){f=this.markerType
}var c=g.color;var b=g.alpha;
if(g.legendKeyColor){c=g.legendKeyColor()
}if(g.legendKeyAlpha){b=g.legendKeyAlpha()
}if(g.hidden==true){c=this.markerDisabledColor
}var e=this.createMarker(f,c,b);
e.dItem=g;if(this.switchType){if(this.switchType=="x"){var n=this.createX()
}else{var n=this.createV()
}}n.dItem=g;if(g.hidden!=true){if(this.switchType=="x"){n.hide()
}else{n.show()}}else{if(this.switchType!="x"){n.hide()
}}var j=this.container.set([e,n]);
var a=this;if(this.chart.touchEventsEnabled){j.touchend(function(){a.clickMarker(this.dItem)
});j.touchstart(function(){a.rollOverMarker(this.dItem)
})}else{j.hover(function(){a.rollOverMarker(this.dItem)
},function(){a.rollOutMarker(this.dItem)
}).click(function(){a.clickMarker(this.dItem)
})}var m=this.color;if(g.showBalloon&&this.textClickEnabled&&this.selectedColor!=undefined){m=this.selectedColor
}if(this.useMarkerColorForLabels){m=c
}if(g.hidden==true){m=this.markerDisabledColor
}var o=this.chart.fontSize;
if(!isNaN(this.fontSize)){o=this.fontSize
}var d=AmCharts.formatString(this.labelText,g,this.chart.numberFormatter,this.chart.percentFormatter);
if(d){var k=AmCharts.text(this.container,this.markerSize+this.markerLabelGap,this.markerSize/2,d,{fill:m,"text-anchor":"start","font-family":this.chart.fontFamily,"font-size":o});
var l=k.getBBox();lWidth=l.width;
if(this.maxLabelWidth<lWidth){this.maxLabelWidth=lWidth
}}var h=this.container.set();
if(e){h.push(e)}if(n){h.push(n)
}if(k){h.push(k)}this.entries[this.index]=h;
g.legendEntry=this.entries[this.index];
g.legendLabel=k;g.legendSwitch=n;
this.index++}},rollOverMarker:function(a){if(this.switchable){this.dispatch("rollOverMarker",a)
}else{this.dispatch("rollOverItem",a)
}},rollOutMarker:function(a){if(this.switchable){this.dispatch("rollOutMarker",a)
}else{this.dispatch("rollOutItem",a)
}},clickMarker:function(a){if(this.switchable){if(a.hidden==true){this.dispatch("showItem",a)
}else{this.dispatch("hideItem",a)
}}else{this.dispatch("clickMarker",a)
}},rollOverLabel:function(a){if(!a.hidden){if(a.legendLabel){a.legendLabel.attr({fill:this.rollOverColor})
}this.dispatch("rollOverItem",a)
}},rollOutLabel:function(b){if(!b.hidden){if(b.legendLabel){var a=this.color;
if(this.selectedColor!=undefined&&b.showBalloon){a=this.selectedColor
}b.legendLabel.attr({fill:a})
}this.dispatch("rollOutItem",b)
}},clickLabel:function(a){if(!a.hidden){this.dispatch("clickLabel",a)
}},dispatch:function(a,b){this.fire(a,{type:a,dataItem:b})
},createValue:function(d){if(d.visibleInLegend!==false){var c=this.maxLabelWidth;
if(this.valueText){var g=this.color;
if(this.useMarkerColorForLabels){g=color
}if(d.hidden==true){g=this.markerDisabledColor
}var j=this.chart.fontSize;
if(isNaN(this.fontSize)){j=this.fontSize
}var b=this.valueText;
var f=this.maxLabelWidth+this.markerSize+this.markerLabelGap*2+this.valueWidth;
var h=AmCharts.text(this.container,f,this.markerSize/2,b,{fill:g,"text-anchor":"end","font-family":this.chart.fontFamily,"font-size":j});
this.entries[this.index].push(h);
c+=this.valueWidth+this.markerLabelGap;
h.dItem=d;this.valueLabels.push(h)
}this.index++;var e=this.container.rect(this.markerSize+this.markerLabelGap,0,c,this.markerSize).attr({stroke:"none",fill:"#FFCCFF","fill-opacity":0});
e.dItem=d;this.entries[this.index-1].push(e);
var a=this;e.mouseover(function(){a.rollOverLabel(this.dItem)
}).mouseout(function(){a.rollOutLabel(this.dItem)
}).click(function(){a.clickLabel(this.dItem)
})}},createV:function(){var a=this.markerSize;
return this.container.path(["M",a/5,a/3,"L",a/2,a-a/5,"L",a-a/5,a/5,"L",a/2,a/1.7,"Z"]).attr({fill:this.switchColor,stroke:this.switchColor})
},createX:function(){var a=this.markerSize-3;
return this.container.path(["M",3,3,"L",a,a,"M",a,3,"L",3,a]).attr({stroke:this.switchColor,"stroke-width":3})
},createMarker:function(h,d,b){var l=this.markerSize;
var g=this.container;
var e;var j=this.markerBorderColor;
if(isNaN(j)){j=d}var f={fill:d,stroke:j,opacity:b,"stroke-opacity":this.markerBorderAlpha,"stroke-width":this.markerBorderThickness};
switch(h){case"square":e=g.rect(0,0,l,l).attr(f);
break;case"circle":e=g.circle(l/2,l/2,l/2).attr(f);
break;case"line":var a=g.rect(0,0,l,l).attr({fill:"none","fill-opacity":0,"stroke-opacity":0});
var k=g.path(["M",0,l/2,"L",l,l/2]).attr({stroke:d,"stroke-width":this.markerBorderThickness});
e=g.set([k,a]);break;
case"dashedLine":var a=g.rect(0,0,l,l).attr({fill:"none","fill-opacity":0,"stroke-opacity":0});
var k=g.path(["M",0,l/2,"L",l/2-2,l/2,"M",l/2+2,l/2,"L",l,l/2]).attr({stroke:d,"stroke-width":this.markerBorderThickness});
e=g.set([k,a]);break;
case"triangleUp":e=g.path(["M",0,l,"L",l/2,0,"L",l,l,"L",0,l,"Z"]).attr(f);
break;case"triangleDown":e=g.path(["M",0,0,"L",l/2,l,"L",l,0,"L",0,0,"Z"]).attr(f);
break;case"bubble":f.fill=NaN;
f.gradient="r"+d+"-"+AmChart.adjustLuminosity(d,-0.4);
e=g.circle(l/2,l/2,l/2).attr(f);
break;case"none":break
}return e},validateNow:function(){this.invalidateSize()
},updateValues:function(){for(var f=0;
f<this.valueLabels.length;
f++){var e=this.valueLabels[f];
var d=e.dItem;if(d.type!=undefined){if(d.currentDataItem){var h=this.valueText;
if(d.legendValueText){h=d.legendValueText
}var c=this.positiveValueColor;
var g=this.negativeValueColor;
if(d.hidden){c=NaN;g=NaN
}var b=AmCharts.formatString(h,d.currentDataItem.values,this.chart.numberFormatter,this.chart.percentFormatter,c,g,this.usePositiveNegativeOnPercentsOnly);
b=AmCharts.formatString(b,d.currentDataItem,this.chart.numberFormatter,this.chart.percentFormatter,c,g,this.usePositiveNegativeOnPercentsOnly);
b=this.cleanFromEmpty(b);
e.attr({text:b})}else{e.attr({text:" "})
}}else{var a=AmCharts.formatString(this.valueText,d,this.chart.numberFormatter,this.chart.percentFormatter);
e.attr({text:a})}}},cleanFromEmpty:function(b){var a=b.replace(/\[\[[^\]]*\]\]/,"");
return a},destroy:function(){if(this.set){this.set.remove()
}}});AmCharts.AmBalloon=AmCharts.Class({construct:function(){this.enabled=true;
this.fillColor="#CC0000";
this.fillAlpha=1;this.borderThickness=2;
this.borderColor="#FFFFFF";
this.borderAlpha=1;this.cornerRadius=6;
this.maximumWidth=220;
this.horizontalPadding=8;
this.verticalPadding=5;
this.pointerWidth=10;
this.pointerOrientation="vertical";
this.color="#FFFFFF";
this.textShadowColor="#000000";
this.adjustBorderColor=false;
this.showBullet=true;
this.follow=false;this.show=false
},draw:function(){if(this.color=="#000000"){this.textShadowColor=null
}if(!isNaN(this.pointToX)){this.container=this.chart.container;
if(this.set){this.set.remove()
}this.set=this.container.set();
if(this.balloonColor!=undefined){if(this.adjustBorderColor){this.borderColor=this.balloonColor
}else{this.fillColor=this.balloonColor
}}if(this.show){this.set.show();
var s=this.horizontalPadding;
var c=this.verticalPadding;
var o=this.pointerWidth;
var f=this.pointerOrientation;
var b=this.cornerRadius;
var k=this.textShadowColor;
var r=this.chart.fontFamily;
var m=this.fontSize;if(m==undefined){m=this.chart.fontSize
}this.textTF=AmCharts.text(this.container,0,0,this.text,{fill:this.color,"font-family":r,"font-size":m});
if(this.textShadowColor!=undefined){this.shadowTF=AmCharts.text(this.container,1,1,this.text,{fill:this.textShadowColor,opacity:0.4,"font-family":r,"font-size":m});
this.set.push(this.shadowTF)
}this.set.push(this.textTF);
var a=this.textTF.getBBox();
var q=a.height+2*c;var l=a.width+2*s;
if(window.opera){q+=6
}this.textTF.translate((l/2)+","+(q/2));
if(this.shadowTF){this.shadowTF.translate((l/2)+","+(q/2))
}var e;var d;if(f!="horizontal"){e=this.pointToX-l/2;
if(this.pointToY<this.t+30&&f!="down"){d=this.pointToY+o
}else{d=this.pointToY-q-o
}}else{if(o*2>q){o=q/2
}d=this.pointToY-q/2;
if(this.pointToX<this.l+(this.r-this.l)/2){e=this.pointToX+o
}else{e=this.pointToX-l-o
}}if(d+q>=this.b){d=this.b-q
}if(d<this.t){d=this.t
}if(e<this.l){e=this.l
}if(e+l>this.r){e=this.r-l
}var g;if(b>0){g=AmCharts.rect(this.container,l,q,[this.fillColor],[this.fillAlpha],this.borderThickness,this.borderColor,this.borderAlpha,this.cornerRadius);
if(this.showBullet){var p=AmCharts.circle(this.container,3,this.fillColor,this.fillAlpha);
p.translate(this.pointToX+","+this.pointToY)
}}else{var j=[];var n=[];
if(f!="horizontal"){var u=this.pointToX-e;
if(u>l-o){u=l-o}if(u<o){u=o
}j=[0,u-o,this.pointToX-e,u+o,l,l,0,0];
if(this.pointToY<this.t+(this.b-this.t)/2&&f!="down"){n=[0,0,this.pointToY-d+1,0,0,q,q,0]
}else{n=[q,q,this.pointToY-d-1,q,q,0,0,q]
}}else{var t=this.pointToY-d;
if(t>q-o){t=q-o}if(t<o){t=o
}n=[0,t-o,this.pointToY-d,t+o,q,q,0,0];
if(this.pointToX<this.l+(this.r-this.l)/2){j=[0,0,this.pointToX-e,0,0,l,l,0]
}else{j=[l,l,this.pointToX-e,l,l,0,0,l]
}}g=AmCharts.polygon(this.container,j,n,this.fillColor,this.fillAlpha,this.borderThickness,this.borderColor,this.borderAlpha)
}this.set.push(g);g.toFront();
if(this.shadowTF){this.shadowTF.toFront()
}this.textTF.toFront();
this.set.translate(e+","+d);
var a=g.getBBox();this.bottom=a.y+a.height;
this.yPos=a.y;if(p){this.set.push(p)
}}}},followMouse:function(){if(this.follow==true&&this.show==true){this.pointToX=this.chart.mouseX;
this.pointToY=this.chart.mouseY;
if(this.pointToX!=this.previousX||this.pointToY!=this.previousY){this.previousX=this.pointToX;
this.previousY=this.pointToY;
if(this.cornerRadius==0){this.draw()
}else{var b=this.set.getBBox();
var a=this.pointToX-b.width/2;
var c=this.pointToY-b.height-10;
if(a<this.l){a=this.l
}if(a>this.r-b.width){a=this.r-b.width
}this.set.translate((a-b.x)+","+(c-b.y))
}}}},destroy:function(){clearInterval(this.interval);
if(this.set){this.set.remove()
}},changeColor:function(a){this.balloonColor=a
},setBounds:function(c,d,e,a){this.l=c;
this.t=d;this.r=e;this.b=a
},showBalloon:function(a){this.text=a;
this.show=true;this.draw()
},hide:function(){this.show=false;
this.follow=false;this.destroy()
},setPosition:function(a,c,b){this.pointToX=a;
this.pointToY=c;if(b){if(this.pointToX!=this.previousX||this.pointToY!=this.previousY){this.draw()
}}this.previousX=a;this.previousY=c
},followCursor:function(a){if(a){this.pShowBullet=this.showBullet;
this.showBullet=false
}else{if(this.pShowBullet!=undefined){this.showBullet=this.pShowBullet
}}clearInterval(this.interval);
if(!isNaN(this.chart.mouseX)){if(a){this.pointToX=this.chart.mouseX;
this.pointToY=this.chart.mouseY;
var b=this;this.interval=setInterval(function(){b.followMouse.call(b)
},20);this.follow=a}}}});
AmCharts.AmCoordinateChart=AmCharts.Class({inherits:AmCharts.AmChart,construct:function(){AmCharts.AmCoordinateChart.base.construct.call(this);
this.plotAreaFillColors="#FFFFFF";
this.plotAreaFillAlphas=0;
this.plotAreaBorderColor="#000000";
this.plotAreaBorderAlpha=0;
this.startAlpha=0;this.startDuration=0;
this.startEffect="elastic";
this.sequencedAnimation=true;
this.colors=["#FF6600","#FCD202","#B0DE09","#0D8ECF","#2A0CD0","#CD0D74","#CC0000","#00CC00","#0000CC","#DDDDDD","#999999","#333333","#990000"];
this.valueAxes=[];this.graphs=[]
},initChart:function(){AmCharts.AmCoordinateChart.base.initChart.call(this);
if(this.valueAxes.length==0){var a=new AmCharts.ValueAxis();
this.addValueAxis(a)}if(this.legend){this.legend.setData(this.graphs)
}},parseData:function(){this.processValueAxes();
this.processGraphs()},addValueAxis:function(a){a.chart=this;
this.valueAxes.push(a);
this.invalidateData()
},removeValueAxis:function(d){var b=this.graphs.length;
for(var a=b-1;a>=0;a--){var c=this.graphs[a];
if(c){if(c.valueAxis==d){this.removeGraph(c)
}}}b=this.valueAxes.length;
for(a=b-1;a>=0;a--){if(this.valueAxes[a]==d){this.valueAxes.splice(a,1)
}}this.invalidateData()
},addGraph:function(a){this.graphs.push(a);
this.chooseGraphColor(a,this.graphs.length-1);
this.invalidateData()
},removeGraph:function(c){var b=this.graphs.length;
for(var a=b-1;a>=0;a--){if(this.graphs[a]==c){this.graphs.splice(a,1);
c.destroy()}}this.invalidateData()
},processValueAxes:function(){for(var a=0;
a<this.valueAxes.length;
a++){var b=this.valueAxes[a];
b.chart=this;if(!b.id){b.id="valueAxis"+a
}if(this.rotate){b.orientation="horizontal"
}else{b.orientation="vertical"
}}},processGraphs:function(){for(var a=0;
a<this.graphs.length;
a++){var b=this.graphs[a];
b.chart=this;if(!b.valueAxis){b.valueAxis=this.valueAxes[0]
}if(!b.id){b.id="graph"+a
}}},formatString:function(e,d){var a=d.serialDataItem;
if(this.categoryAxis){if(this.categoryAxis.parseDates){if(e.indexOf("[[category]]")!=-1){var b=AmCharts.formatDate(a.category,this.categoryBalloonDateFormat);
var f=AmCharts.formatDate(a.category,this.categoryBalloonDateFormat);
if(f.indexOf("fff")!=-1){f=AmCharts.formatMilliseconds(b,a.category)
}e=e.split("[[category]]").join(f)
}}}var c=graph.numberFormatter;
if(!c){c=this.numberFormatter
}if(a){e=e.replace(/\[\[category\]\]/g,a.category)
}e=AmCharts.formatString(e,d,c,this.percentFormatter);
e=AmCharts.formatString(e,d.values,c,this.percentFormatter);
return e},getBalloonColor:function(f,d){var c=f.lineColor;
var b=f.balloonColor;
var a=f.fillColors;if(typeof(a)=="object"){c=a[0]
}else{if(a!=undefined){c=a
}}if(d.isNegative){var e=f.negativeLineColor;
var g=f.negativeFillColors;
if(typeof(g)=="object"){e=g[0]
}else{if(g!=undefined){e=g
}}if(e!=undefined){c=e
}}if(d.color!=undefined){c=d.color
}if(b==undefined){b=c
}return b},getGraphById:function(e){var b;
var c=this.graphs.length;
for(var a=0;a<c;a++){var d=this.graphs[a];
if(d.id==e){b=d}}return b
},processFields:function(j,k,b){if(j.itemColors){var d=j.itemColors;
var f=k.index;if(f<d.length){k.color=d[f]
}else{k.color=AmCharts.randomColor()
}}var e=["color","alpha","fillColors","description","bullet","customBullet","bulletSize","bulletConfig","url"];
for(var c=0;c<e.length;
c++){var g=e[c];var h=j[g+"Field"];
if(h){var a=b[h];if(AmCharts.isDefined(a)){k[g]=a
}}}k.dataContext=b},chooseGraphColor:function(c,b){if(c.lineColor==undefined){var a;
if(this.colors.length-1>b){a=this.colors[b]
}else{a=AmCharts.randomColor()
}c.lineColor=a}},handleLegendEvent:function(d){var c=d.type;
var b=d.dataItem;if(b){var e=b.hidden;
var a=b.showBalloon;switch(c){case"clickMarker":if(a){this.hideGraphsBalloon(b)
}else{this.showGraphsBalloon(b)
}break;case"clickLabel":if(a){this.hideGraphsBalloon(b)
}else{this.showGraphsBalloon(b)
}break;case"rollOverItem":if(!e){}break;
case"rollOutItem":if(!e){}break;
case"hideItem":this.hideGraph(b);
break;case"showItem":this.showGraph(b);
break}}},highlightGraph:function(a){var c=this.graphs.length;
var b;var e=0.2;var d;
if(this.legend){e=this.legend.rollOverGraphAlpha
}for(b=0;b<c;b++){d=this.graphs[b];
if(d!=a){d.changeOpacity(e)
}}},unhighlightGraph:function(){var b=this.graphs.length;
for(var a=0;a<b;a++){var c=this.graphs[a];
c.changeOpacity(1)}},showGraph:function(a){a.hidden=false;
this.invalidateData()
},hideGraph:function(a){a.hidden=true;
this.invalidateData()
},hideGraphsBalloon:function(a){a.showBalloon=false;
this.updateLegend()},showGraphsBalloon:function(a){a.showBalloon=true;
this.updateLegend()},invalidateData:function(){if(this.chartCreated){this.dataChanged=true;
this.initChart()}},updateLegend:function(){if(this.legend){this.legend.invalidateSize()
}}});AmCharts.AmRectangularChart=AmCharts.Class({inherits:AmCharts.AmCoordinateChart,construct:function(){AmCharts.AmRectangularChart.base.construct.call(this);
this.createEvents("zoomed");
this.marginLeft=80;this.marginTop=15;
this.marginBottom=35;
this.marginRight=15;this.angle=0;
this.depth3D=0;this.plotArea;
this.horizontalPosition=0;
this.verticalPosition=0;
this.widthMultiplyer=1;
this.heightMultiplyer=1;
this.zoomOutText="Show all";
this.zoomOutButtonSet;
this.zoomOutButton={backgroundColor:"#b2e1ff",backgroundAlpha:1}
},initChart:function(){AmCharts.AmRectangularChart.base.initChart.call(this);
this.updateDxy();this.updateMargins();
this.updatePlotArea();
this.updateScrollbars();
this.updateChartCursor();
this.updateValueAxes();
this.updateGraphs()},drawChart:function(){AmCharts.AmRectangularChart.base.drawChart.call(this);
this.drawPlotArea();if(this.chartData){if(this.chartData.length>0){if(this.chartCursor){this.chartCursor.draw()
}if(this.zoomOutText!=""&&this.zoomOutText){this.drawZoomOutButton()
}}}},drawZoomOutButton:function(){var a=this;
this.zoomOutButtonSet=this.container.set();
var b=this.color;var k=this.fontSize;
if(this.zoomOutButton){if(this.zoomOutButton.fontSize){k=this.zoomOutButton.fontSize
}if(this.zoomOutButton.color){b=this.zoomOutButton.color
}}var g=AmCharts.text(this.container,29,8,this.zoomOutText,{fill:b,"font-family":this.fontFamily,"font-size":k,"text-anchor":"start"});
var e=g.getBBox();g.translate(0+","+e.height/2);
var d=AmCharts.rect(this.container,e.width+40,e.height+15,[this.zoomOutButton.backgroundColor],[this.zoomOutButton.backgroundAlpha]);
var f=this.container.image(this.pathToImages+"lens.png",7,7,16,16);
f.translate(0+","+(e.height/2-6));
f.toFront();g.toFront();
d.hide();this.zoomOutButtonBG=d;
this.lens=f;this.zoomOutButtonSet.push(d);
this.zoomOutButtonSet.push(f);
this.zoomOutButtonSet.push(g);
this.set.push(this.zoomOutButtonSet);
var h=this.zoomOutButtonSet.getBBox();
this.zoomOutButtonSet.translate((this.marginLeftReal+this.plotAreaWidth-h.width)+","+this.marginTopReal);
this.zoomOutButtonSet.hide();
if(this.touchEventsEnabled){this.zoomOutButtonSet.touchstart(function(){a.rollOverZB()
}).touchend(function(){a.clickZB()
})}this.zoomOutButtonSet.mouseover(function(){a.rollOverZB()
}).mouseout(function(){a.rollOutZB()
}).click(function(){a.clickZB()
});for(var c=0;c<this.zoomOutButtonSet.length;
c++){this.zoomOutButtonSet[c].attr({cursor:"pointer"})
}},rollOverZB:function(){this.zoomOutButtonBG.show()
},rollOutZB:function(){this.zoomOutButtonBG.hide()
},clickZB:function(){this.zoomOut()
},zoomOut:function(){this.updateScrollbar=true;
this.zoom()},drawPlotArea:function(){this.plotArea=this.container.set();
var n=this.dx;var m=this.dy;
var a=this.marginLeftReal;
var j=this.marginTopReal;
var k=this.plotAreaWidth;
var e=this.plotAreaHeight;
var c=AmCharts.toSvgColor(this.plotAreaFillColors);
var b=this.plotAreaFillAlphas;
if(typeof(b)=="object"){b=b[0]
}var d=AmCharts.rect(this.container,k,e,this.plotAreaFillColors,b,1,this.plotAreaBorderColor,this.plotAreaBorderAlpha);
d.translate(a+","+j);
this.plotArea.push(d);
this.set.push(d);if(n!=0&&m!=0){d.translate(n+","+m);
c=this.plotAreaFillColors;
if(typeof(c)=="object"){c=c[0]
}c=AmCharts.adjustLuminosity(c,-0.15);
var f={fill:c,"fill-opacity":b,stroke:this.plotAreaBorderColor,"stroke-opacity":this.plotAreaBorderAlpha};
var l=this.container.path(["M",0,0,"L",n,m,"L",k+n,m,"L",k,0,"L",0,0,"Z"]).attr(f);
l.translate(a+","+(j+e));
this.set.push(l);var g=this.container.path(["M",0,0,"L",0,e,"L",n,e+m,"L",n,m,"L",0,0,"Z"]).attr(f);
g.translate(a+","+j);
this.set.push(g)}},updatePlotArea:function(){this.realWidth=this.updateWidth();
this.realHeight=this.updateHeight();
var c=this.dx;var b=this.dy;
var d=this.marginLeftReal;
var f=this.marginTopReal;
var a=this.realWidth-d-this.marginRightReal-c;
var e=this.realHeight-f-this.marginBottomReal;
if(a<1){a=1}if(e<1){e=1
}this.plotAreaWidth=Math.round(a);
this.plotAreaHeight=Math.round(e)
},updateDxy:function(){this.dx=this.depth3D*Math.cos(this.angle*Math.PI/180);
this.dy=-this.depth3D*Math.sin(this.angle*Math.PI/180)
},updateMargins:function(){this.marginTopReal=this.marginTop-this.dy;
this.marginBottomReal=this.marginBottom;
this.marginLeftReal=this.marginLeft;
this.marginRightReal=this.marginRight
},updateValueAxes:function(){for(var a=0;
a<this.valueAxes.length;
a++){var b=this.valueAxes[a];
b.axisRenderer=AmCharts.RectangularAxisRenderer;
b.guideFillRenderer=AmCharts.RectangularAxisGuideFillRenderer;
b.axisItemRenderer=AmCharts.RectangularAxisItemRenderer;
if(this.rotate){b.orientation="horizontal"
}else{b.orientation="vertical"
}b.x=this.marginLeftReal;
b.y=this.marginTopReal;
b.dx=this.dx;b.dy=this.dy;
b.width=this.plotAreaWidth;
b.height=this.plotAreaHeight;
b.visibleAxisWidth=this.plotAreaWidth;
b.visibleAxisHeight=this.plotAreaHeight;
b.visibleAxisX=this.marginLeftReal;
b.visibleAxisY=this.marginTopReal
}},updateGraphs:function(){var b=this.graphs.length;
for(var a=0;a<b;a++){var c=this.graphs[a];
c.x=this.marginLeftReal+this.horizontalPosition;
c.y=this.marginTopReal+this.verticalPosition;
c.width=this.plotAreaWidth*this.widthMultiplyer;
c.height=this.plotAreaHeight*this.heightMultiplyer;
c.index=a;c.dx=this.dx;
c.dy=this.dy;c.rotate=this.rotate;
c.chartType=this.chartType
}},updateChartCursor:function(){if(this.chartCursor){var a=this.chartCursor;
this.chartCursor.x=this.marginLeftReal;
this.chartCursor.y=this.marginTopReal;
this.chartCursor.width=this.plotAreaWidth;
this.chartCursor.height=this.plotAreaHeight;
this.chartCursor.chart=this
}},updateScrollbars:function(){},addChartCursor:function(a){if(this.chartCursor){this.chartCursor.clean()
}this.chartCursor=a;if(this.chartCursor){this.listenTo(this.chartCursor,"changed",this.handleCursorChange);
this.listenTo(this.chartCursor,"zoomed",this.handleCursorZoom)
}},removeChartCursor:function(){if(this.chartCursor){this.chartCursor.clean();
this.chartCursor=null
}},addChartScrollbar:function(a){if(this.chartScrollbar){this.chartScrollbar.destroy()
}this.chartScrollbar=a;
if(this.chartScrollbar){this.chartScrollbar.chart=this;
this.listenTo(this.chartScrollbar,"zoomed",this.handleScrollbarZoom)
}if(this.rotate){if(this.chartScrollbar.width==undefined){this.chartScrollbar.width=this.chartScrollbar.scrollbarHeight
}}else{if(this.chartScrollbar.height==undefined){this.chartScrollbar.height=this.chartScrollbar.scrollbarHeight
}}},removeChartScrollbar:function(){if(this.chartScrollbar){this.chartScrollbar.clean();
this.chartScrollbar=null
}},handleReleaseOutside:function(a){AmCharts.AmRectangularChart.base.handleReleaseOutside.call(this,a);
if(this.chartScrollbar){this.chartScrollbar.handleReleaseOutside()
}if(this.chartCursor){this.chartCursor.handleReleaseOutside()
}},handleMouseDown:function(a){AmCharts.AmRectangularChart.base.handleMouseDown.call(this,a);
if(this.chartCursor){this.chartCursor.handleMouseDown(a)
}}});AmCharts.AmSerialChart=AmCharts.Class({inherits:AmCharts.AmRectangularChart,construct:function(){AmCharts.AmSerialChart.base.construct.call(this);
this.columnSpacing=5;
this.columnWidth=0.8;
this.maxSelectedSeries;
this.updateScrollbar=true;
this.maxSelectedTime;
this.categoryAxis=new AmCharts.CategoryAxis();
this.categoryAxis.chart=this;
this.chartType="serial"
},initChart:function(){AmCharts.AmSerialChart.base.initChart.call(this);
this.updateCategoryAxis();
if(this.dataChanged){this.updateData();
this.dataChanged=false;
this.dispatchDataUpdated=true
}this.updateScrollbar=true;
this.drawChart()},drawChart:function(){AmCharts.AmSerialChart.base.drawChart.call(this);
var d=this.chartData;
if(d){if(d.length>0){if(this.chartScrollbar){this.chartScrollbar.draw()
}var b=d.length-1;var c;
var a;if(this.categoryAxis.parseDates&&!this.categoryAxis.equalSpacing){c=this.startTime;
a=this.endTime;if(isNaN(c)||isNaN(a)){c=d[0].time;
a=d[b].time}}else{c=this.start;
a=this.end;if(isNaN(c)||isNaN(a)){c=0;
a=b}}this.start=undefined;
this.end=undefined;this.startTime=undefined;
this.endTime=undefined;
this.zoom(c,a)}}this.bringLabelsToFront();
this.chartCreated=true;
if(this.dispatchDataUpdated){this.dispatchDataUpdated=false;
this.dispatchDataUpdatedEvent()
}},updateCategoryAxis:function(){this.categoryAxis.id="categoryAxis";
this.categoryAxis.axisRenderer=AmCharts.RectangularAxisRenderer;
this.categoryAxis.guideFillRenderer=AmCharts.RectangularAxisGuideFillRenderer;
this.categoryAxis.axisItemRenderer=AmCharts.RectangularAxisItemRenderer;
if(this.rotate){this.categoryAxis.orientation="vertical"
}else{this.categoryAxis.orientation="horizontal"
}this.categoryAxis.x=this.marginLeftReal;
this.categoryAxis.y=this.marginTopReal;
this.categoryAxis.dx=this.dx;
this.categoryAxis.dy=this.dy;
this.categoryAxis.width=this.plotAreaWidth;
this.categoryAxis.height=this.plotAreaHeight;
this.categoryAxis.visibleAxisWidth=this.plotAreaWidth;
this.categoryAxis.visibleAxisHeight=this.plotAreaHeight;
this.categoryAxis.visibleAxisX=this.marginLeftReal;
this.categoryAxis.visibleAxisY=this.marginTopReal
},updateValueAxes:function(){AmCharts.AmSerialChart.base.updateValueAxes.call(this);
var b=this.valueAxes.length;
for(var a=0;a<b;a++){var c=this.valueAxes[a];
if(!this.categoryAxis.startOnAxis||this.categoryAxis.parseDates){c.expandMinMax=true
}}},updateData:function(){this.parseData();
this.columnCount=this.countColumns();
if(this.chartCursor){this.chartCursor.updateData()
}count=this.graphs.length;
for(i=0;i<count;i++){var a=this.graphs[i];
a.columnCount=this.columnCount;
a.data=this.chartData
}},updateMargins:function(){AmCharts.AmSerialChart.base.updateMargins.call(this);
this.scrollbarHeight=0;
if(this.chartScrollbar){if(this.rotate){this.scrollbarHeight=this.chartScrollbar.width
}else{this.scrollbarHeight=this.chartScrollbar.height
}if(this.rotate){if(this.categoryAxis.position=="bottom"||this.categoryAxis.position=="left"){this.scrollbarPosition="bottom"
}else{this.scrollbarPosition="top"
}}else{if(this.categoryAxis.position=="top"||this.categoryAxis.position=="right"){this.scrollbarPosition="bottom"
}else{this.scrollbarPosition="top"
}}if(this.scrollbarPosition=="top"){if(this.rotate){this.marginLeftReal+=this.scrollbarHeight
}else{this.marginTopReal+=this.scrollbarHeight
}}else{if(this.rotate){this.marginRightReal+=this.scrollbarHeight
}else{this.marginBottomReal+=this.scrollbarHeight
}}}},updateScrollbars:function(){if(this.chartScrollbar){if(this.scrollbarPosition=="top"){if(this.rotate){this.chartScrollbar.y=this.marginTopReal;
this.chartScrollbar.x=this.marginLeftReal-this.scrollbarHeight
}else{this.chartScrollbar.y=this.marginTopReal-this.scrollbarHeight+this.dy;
this.chartScrollbar.x=this.marginLeftReal+this.dx
}}else{if(this.rotate){this.chartScrollbar.y=this.marginTopReal+this.dy;
this.chartScrollbar.x=this.marginLeftReal+this.plotAreaWidth+this.dx
}else{this.chartScrollbar.y=this.marginTopReal+this.plotAreaHeight+1;
this.chartScrollbar.x=this.marginLeft
}}if(this.rotate){this.chartScrollbar.height=this.plotAreaHeight
}else{this.chartScrollbar.width=this.plotAreaWidth
}this.chartScrollbar.mainCategoryAxis=this.categoryAxis
}},zoom:function(b,a){if(this.categoryAxis.parseDates&&!this.categoryAxis.equalSpacing){this.timeZoom(b,a)
}else{this.indexZoom(b,a)
}this.updateDepths()},timeZoom:function(b,a){if(!isNaN(this.maxSelectedTime)){if(a!=this.endTime){if(a-b>this.maxSelectedTime){b=a-this.maxSelectedTime;
this.updateScrollbar=true
}}if(b!=this.startTime){if(a-b>this.maxSelectedTime){a=b+this.maxSelectedTime;
this.updateScrollbar=true
}}}if(b!=this.startTime||a!=this.endTime){var c=this.categoryAxis.minDuration();
this.firstTime=this.chartData[0].time;
this.lastTime=this.chartData[this.chartData.length-1].time;
if(!b){b=this.firstTime;
if(!isNaN(this.maxSelectedTime)){b=this.lastTime-this.maxSelectedTime
}}if(!a){a=this.lastTime
}if(b>this.lastTime){b=this.lastTime
}if(a<this.firstTime){a=this.firstTime
}if(b<this.firstTime){b=this.firstTime
}if(a>this.lastTime){a=this.lastTime
}if(a<b){a=b+c}this.startTime=b;
this.endTime=a;var d=this.chartData.length-1;
this.start=this.getClosestIndex(this.chartData,"time",this.startTime,true,0,d);
this.end=this.getClosestIndex(this.chartData,"time",this.endTime,false,this.start,d);
this.categoryAxis.timeZoom(this.startTime,this.endTime);
this.categoryAxis.zoom(this.start,this.end);
this.start=AmCharts.fitToBounds(this.start,0,d);
this.end=AmCharts.fitToBounds(this.end,0,d);
this.zoomAxesAndGraphs();
this.zoomScrollbar();
if(b!=this.firstTime||a!=this.lastTime){if(this.zoomOutButtonSet){this.zoomOutButtonSet.show();
this.zoomOutButtonBG.hide()
}}else{this.zoomOutButtonSet.hide()
}this.dispatchTimeZoomEvent()
}},indexZoom:function(c,a){if(!isNaN(this.maxSelectedSeries)){if(a!=this.end){if(a-c>this.maxSelectedSeries){c=a-this.maxSelectedSeries;
this.updateScrollbar=true
}}if(c!=this.start){if(a-c>this.maxSelectedSeries){a=c+this.maxSelectedSeries;
this.updateScrollbar=true
}}}if(c!=this.start||a!=this.end){var b=this.chartData.length-1;
if(isNaN(c)){c=0;if(!isNaN(this.maxSelectedSeries)){c=b-this.maxSelectedSeries
}}if(isNaN(a)){a=b}if(a<c){a=c
}if(a>b){a=b}if(c>b){c=b-1
}if(c<0){c=0}this.start=c;
this.end=a;this.categoryAxis.zoom(this.start,this.end);
this.zoomAxesAndGraphs();
this.zoomScrollbar();
if(c!=0||a!=this.dataProvider.length-1){if(this.zoomOutButtonSet){this.zoomOutButtonSet.show();
this.zoomOutButtonBG.hide()
}}else{if(this.zoomOutButtonSet){this.zoomOutButtonSet.hide()
}}this.dispatchIndexZoomEvent()
}},updateGraphs:function(){AmCharts.AmSerialChart.base.updateGraphs.call(this);
var b=this.graphs.length;
for(var a=0;a<b;a++){var c=this.graphs[a];
c.columnWidth=this.columnWidth;
c.categoryAxis=this.categoryAxis
}},updateDepths:function(){this.mostFrontObj=this.container.rect(0,0,10,10);
this.updateColumnsDepth();
var c=this.graphs.length;
for(var b=0;b<c;b++){var d=this.graphs[b];
if(d.type!="column"){d.set.insertBefore(this.mostFrontObj)
}if(d.allBullets){for(var a=0;
a<d.allBullets.length;
a++){d.allBullets[a].insertBefore(this.mostFrontObj)
}}if(d.objectsToClip){for(var a=0;
a<d.objectsToClip.length;
a++){this.setClipRect(d.objectsToClip[a])
}}if(d.positiveObjectsToClip){for(var a=0;
a<d.positiveObjectsToClip.length;
a++){d.setPositiveClipRect(d.positiveObjectsToClip[a])
}}if(d.negativeObjectsToClip){for(var a=0;
a<d.negativeObjectsToClip.length;
a++){d.setNegativeClipRect(d.negativeObjectsToClip[a])
}}if(!this.chartCursor){if(d.objectsToAddListeners){for(var a=0;
a<d.objectsToAddListeners.length;
a++){d.addMouseListeners(d.objectsToAddListeners[a])
}}}}if(this.chartCursor){this.chartCursor.set.insertBefore(this.mostFrontObj)
}if(this.zoomOutButtonSet){this.zoomOutButtonSet.insertBefore(this.mostFrontObj)
}c=this.valueAxes.length;
for(var b=0;b<c;b++){var e=this.valueAxes[b];
if(e.grid0){AmCharts.putSetToFront(e.grid0)
}AmCharts.putSetToFront(e.axisLine.set);
for(var a=0;a<e.allLabels.length;
a++){e.allLabels[a].toFront()
}}for(var a=0;a<this.categoryAxis.allLabels.length;
a++){this.categoryAxis.allLabels[a].toFront()
}this.mostFrontObj.remove();
this.drb()},updateColumnsDepth:function(){var b;
var f=this.graphs.length;
this.columnsArray=[];
for(b=0;b<f;b++){var d=this.graphs[b];
var c=d.columnsArray;
if(c){for(var a=0;a<c.length;
a++){this.columnsArray.push(c[a])
}}}var e=this;this.columnsArray.sort(this.compareDepth);
f=this.columnsArray.length;
for(b=0;b<f;b++){this.columnsArray[b].column.set.insertBefore(this.mostFrontObj);
this.setExtendedClipRect(this.columnsArray[b].column.set)
}},setExtendedClipRect:function(a){a.attr({"clip-rect":this.marginLeftReal+","+(this.marginTopReal+this.dy)+","+(this.plotAreaWidth+this.dx)+","+(this.plotAreaHeight-this.dy)})
},setClipRect:function(a){a.attr({"clip-rect":this.marginLeftReal+","+this.marginTopReal+","+this.plotAreaWidth+","+this.plotAreaHeight})
},compareDepth:function(d,c){if(d.depth>c.depth){return 1
}else{return -1}},zoomScrollbar:function(){if(this.chartScrollbar){if(this.updateScrollbar){if(this.categoryAxis.parseDates&&!this.categoryAxis.equalSpacing){this.chartScrollbar.timeZoom(this.startTime,this.endTime)
}else{this.chartScrollbar.zoom(this.start,this.end)
}this.updateScrollbar=true
}}},zoomAxesAndGraphs:function(){var b=this.valueAxes.length;
for(var a=0;a<b;a++){var d=this.valueAxes[a];
d.zoom(this.start,this.end)
}b=this.graphs.length;
for(a=0;a<b;a++){var c=this.graphs[a];
c.zoom(this.start,this.end)
}if(this.chartCursor){this.chartCursor.zoom(this.start,this.end,this.startTime,this.endTime)
}},countColumns:function(){var f=0;
var k=this.valueAxes.length;
var b=this.graphs.length;
var h;var a;var g=false;
var c;for(var d=0;d<k;
d++){a=this.valueAxes[d];
var e=a.stackType;if(e=="100%"||e=="regular"){g=false;
for(c=0;c<b;c++){h=this.graphs[c];
if(!h.hidden){if(h.valueAxis==a&&h.type=="column"){if(!g&&h.stackable){f++;
g=true}if(!h.stackable){f++
}h.columnIndex=f-1}}}}if(e=="none"||e=="3d"){for(c=0;
c<b;c++){h=this.graphs[c];
if(!h.hidden){if(h.valueAxis==a&&h.type=="column"){h.columnIndex=f;
f++}}}}if(e=="3d"){for(d=0;
d<b;d++){h=this.graphs[d];
h.depthCount=f}f=1}}return f
},parseData:function(){AmCharts.AmSerialChart.base.parseData.call(this);
if(this.dataProvider){this.chartData=[];
var f=this.dataProvider.length;
var g=this.categoryAxis.parseDates;
if(g){var u=AmCharts.extractPeriod(this.categoryAxis.minPeriod);
var l=u.period;var d=u.count
}for(var q=0;q<f;q++){var t=[];
var c=this.dataProvider[q];
var n=c[this.categoryField];
t.category=n;if(g){n=new Date(n);
n=AmCharts.resetDateToMin(n,l,d);
t.category=n;t.time=n.getTime()
}var h=this.valueAxes;
var e=h.length;t.axes={};
t.x={};for(var p=0;p<e;
p++){var s=h[p].id;t.axes[s]={};
t.axes[s].graphs={};graphs=this.graphs;
var a=graphs.length;for(var o=0;
o<a;o++){graph=this.graphs[o];
var m=graph.id;t.axes[s].graphs[m]={};
if(graph.valueAxis.id==s){var r={};
r.index=q;var b={};var v=Number(c[graph.valueField]);
if(!isNaN(v)){b.value=v
}var v=Number(c[graph.openField]);
if(!isNaN(v)){b.open=v
}var v=Number(c[graph.closeField]);
if(!isNaN(v)){b.close=v
}var v=Number(c[graph.lowField]);
if(!isNaN(v)){b.low=v
}var v=Number(c[graph.highField]);
if(!isNaN(v)){b.high=v
}r.values=b;this.processFields(graph,r,c);
r.category=String(t.category);
r.serialDataItem=t;r.graphTitle=graph.title;
t.axes[s].graphs[m]=r
}}}this.chartData[q]=t
}}},getCategoryIndexByValue:function(d){var c=this.chartData.length;
var a;for(var b=0;b<c;
b++){if(this.chartData[b].category==d){a=b
}}return a},handleCursorChange:function(a){this.dispatchCursorEvent(a.index)
},handleCursorZoom:function(a){this.updateScrollbar=true;
this.zoom(a.start,a.end)
},handleScrollbarZoom:function(a){this.updateScrollbar=false;
this.zoom(a.start,a.end)
},dispatchTimeZoomEvent:function(){if(this.prevStartTime!=this.startTime||this.prevEndTime!=this.endTime){var a={};
a.type="zoomed";a.startDate=new Date(this.startTime);
a.endDate=new Date(this.endTime);
a.startIndex=this.start;
a.endIndex=this.end;this.startIndex=this.start;
this.endIndex=this.end;
this.prevStartTime=this.startTime;
this.prevEndTime=this.endTime;
a.startValue=AmCharts.formatDate(a.startDate,this.categoryAxis.dateFormats[this.categoryAxis.minPeriod]);
a.endValue=AmCharts.formatDate(a.endDate,this.categoryAxis.dateFormats[this.categoryAxis.minPeriod]);
this.fire(a.type,a)}},dispatchIndexZoomEvent:function(){if(this.prevStartIndex!=this.start||this.prevEndIndex!=this.end){this.startIndex=this.start;
this.endIndex=this.end;
if(!isNaN(this.start)&&!isNaN(this.end)){var a={};
a.type="zoomed";a.startIndex=this.start;
a.endIndex=this.end;a.startValue=this.chartData[this.start].category;
a.endValue=this.chartData[this.end].category;
if(this.categoryAxis.parseDates){this.startTime=this.chartData[this.start].time;
this.endTime=this.chartData[this.end].time;
a.startDate=new Date(this.startTime);
a.endDate=new Date(this.endTime)
}this.prevStartIndex=this.start;
this.prevEndIndex=this.end;
this.fire(a.type,a)}}},dispatchCursorEvent:function(c){var e=this.graphs.length;
for(var d=0;d<e;d++){var f=this.graphs[d];
if(isNaN(c)){f.currentDataItem=undefined
}else{var b=this.chartData[c];
var a=b.axes[f.valueAxis.id].graphs[f.id];
f.currentDataItem=a}}if(this.legend){this.legend.updateValues()
}},getClosestIndex:function(j,f,g,c,a,b){if(a<0){a=0
}if(b>j.length-1){b=j.length-1
}var e=a+Math.round((b-a)/2);
var k=j[e][f];if(b-a<=1){if(c){return a
}else{var d=j[a][f];var h=j[b][f];
if(Math.abs(d-g)<Math.abs(h-g)){return a
}else{return b}}}if(g==k){return e
}else{if(g<k){return this.getClosestIndex(j,f,g,c,a,e)
}else{return this.getClosestIndex(j,f,g,c,e,b)
}}},zoomToIndexes:function(b,a){this.updateScrollbar=true;
if(b<0){b=0}if(a>this.chartData.length-1){a=this.chartData.length-1
}if(this.categoryAxis.parseDates&&!this.categoryAxis.equalSpacing){this.zoom(this.chartData[b].time,this.chartData[a].time)
}else{this.zoom(b,a)}}});
AmCharts.AxisBase=AmCharts.Class({construct:function(){this.dx=0;
this.dy=0;this.axisWidth;
this.axisThickness=1;
this.axisColor="#000000";
this.axisAlpha=1;this.tickLength=5;
this.gridCount=5;this.gridAlpha=0.2;
this.gridThickness=1;
this.gridColor="#000000";
this.dashLength=0;this.labelFrequency=1;
this.showFirstLabel=true;
this.showLastLabel=true;
this.fillColor="#FFFFFF";
this.fillAlpha=0;this.labelsEnabled=true;
this.labelRotation=0;
this.radarCategoriesEnabled=true;
this.axisTitleOffset=10;
this.gridType="polygons";
this.autoGridCount=false;
this.valueRollOverColor="#CC0000";
this.offset=0;this.guides=[];
this.visible=true;this.counter=0;
this.guides=[];this.inside=false
},zoom:function(b,a){this.start=b;
this.end=a;this.dataChanged=true;
this.draw()},draw:function(){this.allLabels=[];
this.counter=0;this.destroy();
this.rotate=this.chart.rotate;
this.set=this.chart.container.set();
var d=this.position;if(this.orientation=="horizontal"){if(d=="left"){d="bottom"
}if(d=="right"){d="top"
}}else{if(d=="bottom"){d="left"
}if(d=="top"){d="right"
}}this.position=d;this.axisLine=new this.axisRenderer(this);
this.chart.set.push(this.axisLine.set);
var a=this.axisLine.axisWidth;
if(this.autoGridCount){var b;
if(this.orientation=="vertical"){b=a/35;
if(b<3){b=3}}else{b=a/75
}this.gridCount=b}this.axisWidth=a
},addGuide:function(a){this.guides.push(a)
},removeGuide:function(a){var c=this.guides.length;
for(var b=0;b<c;b++){if(this.guides[b]==a){this.guides.splice(b,1)
}}},handleGuideOver:function(d){clearTimeout(this.chart.hoverInt);
var b=this.guides[d];
var e=b.graphics.getBBox();
var a=e.x+e.width/2;var f=e.y+e.height/2;
var c=b.fillColor;if(c==undefined){c=b.lineColor
}this.chart.showBalloon(b.balloonText,c,true,a,f)
},handleGuideOut:function(a){this.chart.hideBalloon()
},destroy:function(){AmCharts.removeSet(this.set)
}});AmCharts.ValueAxis=AmCharts.Class({inherits:AmCharts.AxisBase,construct:function(){this.createEvents("axisChanged");
AmCharts.ValueAxis.base.construct.call(this);
this.dataChanged=true;
this.gridCount=8;this.stackType="none";
this.position="left";
this.unitPosition="right";
this.integersOnly=false;
this.includeGuidesInMinMax=false;
this.includeHidden=false;
this.recalculateToPercents=false;
this.scrollbar=false;
this.maxDecCount;this.baseValue=0;
this.useScientificNotation=false
},updateData:function(){if(this.gridCount<=0){this.gridCount=1
}this.data=this.chart.chartData;
if(this.chart.chartType!="xy"){this.stackGraphs("smoothedLine");
this.stackGraphs("line");
this.stackGraphs("column");
this.stackGraphs("step")
}if(this.recalculateToPercents){this.recalculate()
}if(this.synchronizationMultiplyer&&this.synchronizeWithAxis){this.foundGraphs=true
}else{this.foundGraphs=false;
this.getMinMax()}},draw:function(){AmCharts.ValueAxis.base.draw.call(this);
if(this.dataChanged==true){this.updateData();
this.dataChanged=false
}if(this.logarithmic){var M=getMin(0,this.data.length-1);
if(M<=0){dispatchEvent(new ValueAxisEvent(ValueAxisEvent.LOGARITHMIC_AXIS_FAILED));
return}}this.grid0=null;
var r;var K;var g=this.chart.dx;
var e=this.chart.dy;var H=false;
if(!isNaN(this.min)&&!isNaN(this.max)&&this.foundGraphs&&this.min!=Infinity&&this.max!=-Infinity){var A=this.labelFrequency;
var v=this.showFirstLabel;
var z=this.showLastLabel;
var b=1;var E=0;var P=Math.round((this.max-this.min)/this.step)+1;
if(this.logarithmic==true){var h=Math.log(this.max)*Math.LOG10E-Math.log(this.minReal)*Math.LOG10E;
this.stepWidth=this.axisWidth/h;
if(h>2){P=h;E=Math.round((Math.log(this.minReal)*Math.LOG10E));
if(P>this.gridCount){b=Math.ceil(P/this.gridCount)
}}}else{this.stepWidth=this.axisWidth/(this.max-this.min)
}var I=0;if(this.step<1&&this.step>-1){var n=this.step.toString();
if(n.indexOf("e-")!=-1){I=Number(n.split("-")[1])
}else{I=n.split(".")[1].length
}}if(this.integersOnly){I=0
}if(I>this.maxDecCount){I=this.maxDecCount
}var j={};j.precision=I;
j.decimalSeparator=this.chart.numberFormatter.decimalSeparator;
j.thousandsSeparator=this.chart.numberFormatter.thousandsSeparator;
var u=false;var D=Number.MAX_VALUE;
for(K=E;K<P;K+=b){var B=this.step*K+this.min;
if(String(B).indexOf("e")!=-1){u=true;
var o=String(B).split("e");
var O=Number(o[1]);if(Math.abs(D)>Math.abs(O)){D=O
}}}for(K=E;K<P;K+=b){var F=this.step*K+this.min;
F=AmCharts.roundTo(F,this.maxDecCount+1);
if(this.integersOnly&&Math.round(F)!=F){}else{if(this.logarithmic==true){if(F==0){F=this.minReal
}if(h>2){F=Math.pow(10,K)
}if(String(F).indexOf("e")!=-1){u=true
}else{u=false}}var p;
if(this.useScientificNotation){u=true
}if(!u){if(this.logarithmic){var k=String(F).split(".");
if(k[1]){j.precision=k[1].length
}else{j.precision=-1}}p=AmCharts.formatNumber(F,j,j.precision)
}else{p=F.toExponential(19);
var f=p.split("e");var d=Number(f[0]);
var c=Number(f[1]);if(Math.abs(c)>Math.abs(D)){d=d*Math.pow(10,(c-D));
c=D}var T=this.maxDecCount-Math.abs(c)+1;
if(T<1){T=1}d=roundTo(d,T);
p=d+"e"+c;if(F==0){p="0"
}}if(this.recalculateToPercents){p=p+"%"
}else{if(this.unit){if(this.unitPosition=="left"){p=this.unit+p
}else{p=p+this.unit}}}if(Math.round(K/A)!=K/A){p=undefined
}if((K==0&&!v)||(K==(P-1)&&!z)){p=" "
}r=this.getCoordinate(F);
var a=new this.axisItemRenderer(this,r,p);
this.set.push(a.graphics());
if(F==this.baseValue&&this.chart.chartType!="radar"){var C;
var m;var L=this.visibleAxisWidth;
var Q=this.visibleAxisHeight;
if(this.orientation=="horizontal"){if(r>=this.x&&r<=this.x+L+1){C=[r,r,r+g];
m=[0+Q,0,e]}}else{if(r>=this.y&&r<=this.y+Q+1){C=[0,L,L+g];
m=[r,r,r+e]}}if(C){this.grid0=AmCharts.line(this.chart.container,C,m,this.gridColor,this.gridAlpha*2,1,0);
this.set.push(this.grid0)
}}}}var t=this.baseValue;
if(this.min>this.baseValue&&this.max>this.baseValue){t=this.min
}if(this.min<this.baseValue&&this.max<this.baseValue){t=this.max
}if(this.logarithmic){t=this.minReal
}this.baseCoord=this.getCoordinate(t);
var q="axisChanged";var S={type:q};
if(this.logarithmic){S.min=this.minReal
}else{S.min=this.min}S.max=this.max;
this.fire(q,S);this.axisCreated=true;
if(this.guides.length>0){var G=this.guides.length;
var s=this.fillAlpha;
this.fillAlpha=0;for(K=0;
K<G;K++){var R=this.guides[K];
var y=NaN;if(!isNaN(R.toValue)){y=this.getCoordinate(R.toValue);
var a=new this.axisItemRenderer(this,y,"",true,NaN,NaN,R);
this.set.push(a.graphics())
}var N=NaN;if(!isNaN(R.value)){N=this.getCoordinate(R.value);
var U=(y-N)/2;var a=new this.axisItemRenderer(this,N,R.label,true,NaN,U,R);
this.set.push(a.graphics())
}if(!isNaN(y-N)){var x=new this.guideFillRenderer(this,y-N,N,R);
var J=x.graphics();this.set.push(J);
R.graphics=J;J.index=K;
var l=this;if(R.balloonText){J.mouseover(function(){l.handleGuideOver(this.index)
});J.mouseout(function(){l.handleGuideOut(this.index)
})}}}this.fillAlpha=s
}}else{H=true}if(this.rotate){this.set.translate(0+","+this.chart.marginTopReal)
}else{this.set.translate(this.chart.marginLeftReal+","+0)
}if(!this.visible||H){this.set.hide();
this.axisLine.set.hide()
}else{this.set.show();
this.axisLine.set.show()
}},stackGraphs:function(l){var g=[];
var b=[];var o=[];var h=[];
var m;var k=this.chart.graphs;
var e;var a;var n;var p;
var d;var f;if((l=="line"||l=="step"||l=="smoothedLine")&&(this.stackType=="regular"||this.stackType=="100%")){for(d=0;
d<k.length;d++){n=k[d];
if(!n.hidden){a=n.type;
if(n.chart==this.chart&&n.valueAxis==this&&l==a&&n.stackable){if(e){n.stackGraph=e;
e=n}else{e=n}}}}}for(f=this.start;
f<=this.end;f++){for(d=0;
d<k.length;d++){n=k[d];
if(!n.hidden){a=n.type;
if(n.chart==this.chart&&n.valueAxis==this&&l==a&&n.stackable){p=this.data[f].axes[this.id].graphs[n.id];
m=p.values.value;if(!isNaN(m)){if(isNaN(h[f])){h[f]=Math.abs(m)
}else{h[f]+=Math.abs(m)
}if(this.stackType=="regular"){if(l=="line"||l=="step"||l=="smoothedLine"){if(isNaN(g[f])){g[f]=m;
p.values.close=m}else{if(isNaN(m)){p.values.close=g[f]
}else{p.values.close=m+g[f]
}g[f]=p.values.close}}if(l=="column"){if(!isNaN(m)){p.values.close=m;
if(m<0){p.values.close=m;
if(!isNaN(b[f])){p.values.close+=b[f];
p.values.open=b[f]}b[f]=p.values.close
}else{p.values.close=m;
if(!isNaN(o[f])){p.values.close+=o[f];
p.values.open=o[f]}o[f]=p.values.close
}}}}}}}}}for(f=this.start;
f<=this.end;f++){for(d=0;
d<k.length;d++){n=k[d];
if(!n.hidden){a=n.type;
if(n.chart==this.chart&&n.valueAxis==this&&l==a&&n.stackable){p=this.data[f].axes[this.id].graphs[n.id];
m=p.values.value;if(!isNaN(m)){var c=m/h[f]*100;
p.values.percents=c;p.values.total=h[f];
if(this.stackType=="100%"){if(isNaN(b[f])){b[f]=0
}if(isNaN(o[f])){o[f]=0
}if(c<0){p.values.close=c+b[f];
p.values.open=b[f];b[f]=p.values.close
}else{p.values.close=c+o[f];
p.values.open=o[f];o[f]=p.values.close
}}}}}}}},recalculate:function(){var d=this.chart.graphs.length;
for(var g=0;g<d;g++){var q=this.chart.graphs[g];
if(q.valueAxis==this){var p="value";
if(q.type=="candlestick"||q.type=="ohlc"){p="open"
}var a;var r;var f=AmCharts.fitToBounds(this.end+1,0,this.data.length-1);
var b=this.start;if(b>0){b--
}for(var o=this.start;
o<=f;o++){r=this.data[o].axes[this.id].graphs[q.id];
a=r.values[p];if(!isNaN(a)){break
}}for(var h=b;h<=f;h++){r=this.data[h].axes[this.id].graphs[q.id];
r.percents={};var m=r.values;
for(var e in m){if(e!="percents"){var c=m[e];
var l=c/a*100-100;r.percents[e]=l
}else{r.percents[e]=m[e]
}}}}}},getMinMax:function(){var p=false;
for(var k=0;k<this.chart.graphs.length;
k++){var l=this.chart.graphs[k].type;
if(l=="line"||l=="step"||l=="smoothedLine"){if(this.expandMinMax){p=true
}}}if(p){if(this.start>0){this.start--
}if(this.end<this.data.length-1){this.end++
}}if(this.chart.chartType=="serial"){if(this.chart.categoryAxis.parseDates==true&&!p){if(this.end<this.data.length-1){this.end++
}}}this.min=this.getMin(this.start,this.end);
this.max=this.getMax();
var o=this.guides.length;
if(this.includeGuidesInMinMax&&o>0){for(var h=0;
h<o;h++){var c=this.guides[h];
if(c.toValue<this.min){this.min=c.toValue
}if(c.value<this.min){this.min=c.value
}if(c.toValue>this.max){this.max=c.toValue
}if(c.value>this.max){this.max=c.value
}}}if(!isNaN(this.minimum)){this.min=this.minimum
}if(!isNaN(this.maximum)){this.max=this.maximum
}if(!isNaN(this.minTemp)){this.min=this.minTemp
}if(!isNaN(this.maxTemp)){this.max=this.maxTemp
}this.minReal=this.min;
this.maxReal=this.max;
if(this.min==0&&this.max==0){this.max=9
}if(this.min>this.max){this.min=this.max-1
}var q=this.min;var d=this.max;
var n=this.max-this.min;
var e;if(n==0){e=Math.pow(10,Math.floor(Math.log(Math.abs(this.max))*Math.LOG10E))/10
}else{e=Math.pow(10,Math.floor(Math.log(Math.abs(n))*Math.LOG10E))/10
}if(isNaN(this.maximum)&&isNaN(this.maxTemp)){this.max=Math.ceil(this.max/e)*e+e
}if(isNaN(this.minimum)&&isNaN(this.minTemp)){this.min=Math.floor(this.min/e)*e-e
}if(this.min<0&&q>=0){this.min=0
}if(this.max>0&&d<=0){this.max=0
}if(this.stackType=="100%"){if(this.min<0){this.min=-100
}else{this.min=0}if(this.max<0){this.max=0
}else{this.max=100}}n=this.max-this.min;
e=Math.pow(10,Math.floor(Math.log(Math.abs(n))*Math.LOG10E))/10;
this.step=Math.ceil((n/this.gridCount)/e)*e;
var m=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E));
var j=m.toExponential(0);
var b=j.split("e");var a=b[0];
var f=b[1];if(a==9){f++
}m=this.generateNumber(1,f);
var r=Math.ceil(this.step/m);
if(r>5){r=10}if(r<=5&&r>2){r=5
}this.step=Math.ceil(this.step/(m*r))*m*r;
if(m<1){this.maxDecCount=Math.abs(Math.log(Math.abs(m))*Math.LOG10E);
this.maxDecCount=Math.round(this.maxDecCount);
this.step=AmCharts.roundTo(this.step,this.maxDecCount+1)
}else{this.maxDecCount=0
}this.min=this.step*Math.floor(this.min/this.step);
this.max=this.step*Math.ceil(this.max/this.step);
if(this.min<0&&q>=0){this.min=0
}if(this.max>0&&d<=0){this.max=0
}if(this.minReal>1&&this.max-this.minReal>1){this.minReal=Math.floor(this.minReal)
}n=(Math.pow(10,Math.floor(Math.log(Math.abs(this.minReal))*Math.LOG10E)));
if(this.min==0){this.minReal=n
}if(this.min==0&&this.minReal>1){this.minReal=1
}if(this.min>0&&this.minReal-this.step>0){if(this.min+this.step<this.minReal){this.minReal=this.min+this.step
}else{this.minReal=this.min
}}},generateNumber:function(a,c){var d="";
var e;if(c<1){e=Math.abs(c)-1
}else{e=Math.abs(c)}for(var b=0;
b<e;b++){d=d+"0"}if(c<1){return Number("0."+d+String(a))
}else{return Number(String(a)+d)
}},getMin:function(a,d){var e;
for(var g=a;g<=d;g++){var h=this.data[g].axes[this.id].graphs;
for(var f in h){var m=this.chart.getGraphById(f);
if(m.includeInMinMax){if(!m.hidden||this.includeHidden){if(isNaN(e)){e=Infinity
}this.foundGraphs=true;
var l=h[f].values;if(this.recalculateToPercents){l=h[f].percents
}var b;if(this.minMaxField){b=l[this.minMaxField];
if(b<e){e=b}}else{for(var c in l){if(c!="percents"&&c!="total"){b=l[c];
if(b<e){e=b}}}}}}}}return e
},getMax:function(){var a;
for(var f=this.start;
f<=this.end;f++){var d=this.data[f].axes[this.id].graphs;
for(var e in d){var g=this.chart.getGraphById(e);
if(g.includeInMinMax){if(!g.hidden||this.includeHidden){if(isNaN(a)){a=-Infinity
}this.foundGraphs=true;
var c=d[e].values;if(this.recalculateToPercents){c=d[e].percents
}var h;if(this.minMaxField){h=c[this.minMaxField];
if(h>a){a=h}}else{for(var b in c){if(b!="percents"&&b!="total"){h=c[b];
if(h>a){a=h}}}}}}}}return a
},dispatchZoomEvent:function(b,a){var c=new ValueAxisEvent(ValueAxisEvent.AXIS_ZOOMED);
c.startValue=b;c.endValue=a;
dispatchEvent(c)},zoomToValues:function(b,a){},coordinateToValue:function(c){if(isNaN(c)){return NaN
}var a;if(this.logarithmic==true){var b;
if(this.chart.rotate){if(this.reversed==true){b=(this.axisWidth-c)/this.stepWidth
}else{b=c/this.stepWidth
}}else{if(this.reversed==true){b=c/this.stepWidth
}else{b=(this.axisWidth-c)/this.stepWidth
}}a=Math.pow(10,b+Math.log(this.minReal)*Math.LOG10E)
}else{if(this.reversed==true){if(this.chart.rotate){a=this.min-(c-this.axisWidth)/this.stepWidth
}else{a=c/this.stepWidth+this.min
}}else{if(this.chart.rotate){a=c/this.stepWidth+this.min
}else{a=this.min-(c-this.axisWidth)/this.stepWidth
}}}return a},getCoordinate:function(a){if(isNaN(a)){return NaN
}var c;if(this.logarithmic==true){var b=(Math.log(a)*Math.LOG10E)-Math.log(this.minReal)*Math.LOG10E;
if(this.chart.rotate){if(this.reversed==true){c=this.axisWidth-this.stepWidth*b
}else{c=this.stepWidth*b
}}else{if(this.reversed==true){c=this.stepWidth*b
}else{c=this.axisWidth-this.stepWidth*b
}}}else{if(this.reversed==true){if(this.chart.rotate){c=this.axisWidth-this.stepWidth*(a-this.min)
}else{c=this.stepWidth*(a-this.min)
}}else{if(this.chart.rotate){c=this.stepWidth*(a-this.min)
}else{c=this.axisWidth-this.stepWidth*(a-this.min)
}}}c=Math.round(c*10)/10;
if(this.rotate){c+=this.x
}else{c+=this.y}return c
},synchronizeWithAxis:function(a){this.synchronizeWithAxis=a;
this.removeListener(this.synchronizeWithAxis,"axisChanged",this.handleSynchronization);
this.listenTo(this.synchronizeWithAxis,"axisChanged",this.handleSynchronization)
},handleSynchronization:function(d){var e=this.synchronizeWithAxis.min;
var b=this.synchronizeWithAxis.max;
var c=this.synchronizeWithAxis.step;
if(this.synchronizationMultiplyer){this.min=e*this.synchronizationMultiplyer;
this.max=b*this.synchronizationMultiplyer;
this.step=c*this.synchronizationMultiplyer;
var a=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E));
this.maxDecCount=Math.abs(Math.log(Math.abs(a))*Math.LOG10E);
this.maxDecCount=Math.round(this.maxDecCount);
this.draw()}else{}}});
AmCharts.CategoryAxis=AmCharts.Class({inherits:AmCharts.AxisBase,construct:function(){AmCharts.CategoryAxis.base.construct.call(this);
this.minPeriod="DD";this.parseDates=false;
this.equalSpacing=false;
this.position="bottom";
this.startOnAxis=false;
this.periods=[{period:"ss",count:1},{period:"ss",count:5},{period:"ss",count:10},{period:"ss",count:30},{period:"mm",count:1},{period:"mm",count:5},{period:"mm",count:10},{period:"mm",count:30},{period:"hh",count:1},{period:"hh",count:6},{period:"hh",count:12},{period:"DD",count:1},{period:"WW",count:1},{period:"MM",count:1},{period:"MM",count:2},{period:"MM",count:3},{period:"MM",count:6},{period:"YYYY",count:1},{period:"YYYY",count:2},{period:"YYYY",count:5},{period:"YYYY",count:10},{period:"YYYY",count:50},{period:"YYYY",count:100}];
this.dateFormats={};this.dateFormats.fff="JJ:NN:SS";
this.dateFormats.ss="JJ:NN:SS";
this.dateFormats.mm="JJ:NN";
this.dateFormats.hh="JJ:NN";
this.dateFormats.DD="MMM DD";
this.dateFormats.MM="MMM";
this.dateFormats.YYYY="YYYY";
this.nextPeriod={};this.nextPeriod.fff="ss";
this.nextPeriod.ss="mm";
this.nextPeriod.mm="hh";
this.nextPeriod.hh="DD";
this.nextPeriod.DD="MM";
this.nextPeriod.MM="YYYY"
},draw:function(){AmCharts.CategoryAxis.base.draw.call(this);
this.data=this.chart.chartData;
if(this.data.length>0){var r=this.end;
var B=this.start;var H=this.labelFrequency;
var K=0;var k=r-B+1;var h=this.gridCount;
var x=this.showFirstLabel;
var E=this.showLastLabel;
var s;var m="";var n=AmCharts.extractPeriod(this.minPeriod);
var j=AmCharts.getPeriodDuration(n.period,n.count);
var F;var R;var D;var t;
var J;var y;var o;var e;
var B;var Q;var O;var q;
var A;var b;var W=this.data[this.data.length-1].time;
var f=AmCharts.resetDateToMin(new Date(W+j),this.minPeriod,1).getTime();
if(this.endTime>f){this.endTime=f
}if(this.parseDates&&!this.equalSpacing){this.timeDifference=this.endTime-this.startTime;
F=this.choosePeriod(0);
D=F.period;R=F.count;
t=AmCharts.getPeriodDuration(D,R);
if(t<j){D=n.period;R=n.count;
t=j}J=D;if(J=="WW"){J="DD"
}this.stepWidth=this.getStepWidth(this.timeDifference);
h=Math.ceil(this.timeDifference/t)+1;
y=AmCharts.resetDateToMin(new Date(this.startTime-t),D,R).getTime();
if(J==D&&R==1){o=t*this.stepWidth
}this.cellWidth=j*this.stepWidth;
e=Math.round(y/t);B=-1;
if(e/2==Math.round(e/2)){B=-2;
y-=t}if(this.gridCount>0){for(Q=B;
Q<=h;Q++){O=y+t*1.5;O=AmCharts.resetDateToMin(new Date(O),D,R).getTime();
s=(O-this.startTime)*this.stepWidth;
if(this.rotate){s+=this.y
}else{s+=this.x}q=false;
if(this.nextPeriod[J]){q=this.checkPeriodChange(this.nextPeriod[J],1,O,y)
}var c=false;if(q){A=this.dateFormats[this.nextPeriod[J]];
c=true}else{A=this.dateFormats[J]
}m=AmCharts.formatDate(new Date(O),A);
if((Q==B&&!x)||(Q==h&&!E)){m=" "
}var a=new this.axisItemRenderer(this,s,m,false,o,0,false,c);
this.set.push(a.graphics());
y=O}}}else{if(!this.parseDates){if(this.startOnAxis){this.cellWidth=this.axisWidth/(k-1)
}else{this.cellWidth=this.axisWidth/k
}if(k<h){h=k}K+=this.start;
this.stepWidth=this.getStepWidth(k);
if(h>0){var L=Math.floor(k/h);
b=K;if(b/2==Math.round(b/2)){b--
}if(b<0){b=0}for(Q=b;
Q<=this.end+2;Q+=L){if(Q>=0&&Q<this.data.length){var p=this.data[Q];
m=p.category}else{m=""
}s=this.getCoordinate(Q-K);
if((Q==B&&!x)||(Q==this.end&&!E)){m=" "
}if(Math.round(Q/H)!=Q/H){m=undefined
}var a=new this.axisItemRenderer(this,s,m,true,this.cellWidth);
this.set.push(a.graphics())
}}}else{if(this.parseDates&&this.equalSpacing){K=this.start;
this.startTime=this.data[this.start].time;
this.endTime=this.data[this.end].time;
this.timeDifference=this.endTime-this.startTime;
F=this.choosePeriod(0);
D=F.period;R=F.count;
t=AmCharts.getPeriodDuration(D,R);
if(t<j){D=n.period;R=n.count;
t=j}J=D;if(J=="WW"){J="DD"
}this.stepWidth=this.getStepWidth(k);
h=Math.ceil(this.timeDifference/t)+1;
y=AmCharts.resetDateToMin(new Date(this.startTime-t),D,R).getTime();
if(this.startOnAxis){this.cellWidth=this.axisWidth/(k-1)
}else{this.cellWidth=this.axisWidth/k
}e=Math.round(y/t);B=-1;
if(e/2==Math.round(e/2)){B=-2;
y-=t}var d=this.data.length;
b=this.start;if(b/2==Math.round(b/2)){b--
}if(b<0){b=0}var l=this.end+2;
if(l>=this.data.length){l=this.data.length
}var G=false;if(this.end-this.start>this.gridCount){G=true
}for(Q=b;Q<l;Q++){O=this.data[Q].time;
if(this.checkPeriodChange(D,R,O,y)){s=this.getCoordinate(Q-this.start);
q=false;if(this.nextPeriod[J]){q=this.checkPeriodChange(this.nextPeriod[J],1,O,y)
}var c=false;if(q){A=this.dateFormats[this.nextPeriod[J]];
c=true}else{A=this.dateFormats[J]
}m=AmCharts.formatDate(new Date(O),A);
if((Q==B&&!x)||(Q==h&&!E)){m=" "
}if(!G){var a=new this.axisItemRenderer(this,s,m,undefined,undefined,undefined,undefined,c);
this.set.push(a.graphics())
}else{G=false}y=O}}}}}for(Q=0;
Q<this.data.length;Q++){var u=this.data[Q];
if(u){var M;if(this.parseDates&&!this.equalSpacing){var I=u.time;
M=(I-this.startTime)*this.stepWidth+this.cellWidth/2;
if(this.rotate){M+=this.y
}else{M+=this.x}}else{M=this.getCoordinate(Q-K)
}u.x[this.id]=M}}}var N=this.guides.length;
for(Q=0;Q<N;Q++){var U=this.guides[Q];
var C=NaN;var S=NaN;var V=NaN;
if(U.toCategory){var v=this.chart.getCategoryIndexByValue(U.toCategory);
if(!isNaN(v)){C=this.getCoordinate(v-K);
var a=new this.axisItemRenderer(this,C,"",true,NaN,NaN,U);
this.set.push(a.graphics())
}}if(U.category){var T=this.chart.getCategoryIndexByValue(U.category);
if(!isNaN(T)){S=this.getCoordinate(T-K);
V=(C-S)/2;var a=new this.axisItemRenderer(this,S,U.label,true,NaN,V,U)
}}if(U.toDate){if(this.equalSpacing){var v=this.chart.getClosestIndex(this.data,"time",U.toDate.getTime(),false,0,this.data.length-1);
if(!isNaN(v)){C=this.getCoordinate(v-K)
}}else{C=(U.toDate.getTime()-this.startTime)*this.stepWidth;
if(this.rotate){C+=this.y
}else{C+=this.x}}var a=new this.axisItemRenderer(this,C,"",true,NaN,NaN,U);
this.set.push(a.graphics())
}if(U.date){if(this.equalSpacing){var T=this.chart.getClosestIndex(this.data,"time",U.date.getTime(),false,0,this.data.length-1);
if(!isNaN(T)){S=this.getCoordinate(T-K)
}}else{S=(U.date.getTime()-this.startTime)*this.stepWidth;
if(this.rotate){S+=this.y
}else{S+=this.x}}V=(C-S)/2;
if(this.orientation=="horizontal"){var a=new this.axisItemRenderer(this,S,U.label,false,V*2,NaN,U)
}else{var a=new this.axisItemRenderer(this,S,U.label,false,NaN,V,U)
}}this.set.push(a.graphics());
var z=new this.guideFillRenderer(this,C-S,S,U);
var P=z.graphics();this.set.push(P);
U.graphics=P;P.index=Q;
var g=this;if(U.balloonText){P.mouseover(function(){g.handleGuideOver(this.index)
});P.mouseout(function(){g.handleGuideOut(this.index)
})}}this.axisCreated=true;
if(this.rotate){this.set.translate(this.x+","+0)
}else{this.set.translate(0+","+this.y)
}if(this.axisLine.set){this.axisLine.set.toFront()
}},choosePeriod:function(b){var a=AmCharts.getPeriodDuration(this.periods[b].period,this.periods[b].count);
var c=Math.ceil(this.timeDifference/a);
if(c<=this.gridCount){return this.periods[b]
}else{if(b+1<this.periods.length){return this.choosePeriod(b+1)
}else{return this.periods[b]
}}},getStepWidth:function(a){var b;
if(this.startOnAxis){b=this.axisWidth/(a-1)
}else{b=this.axisWidth/a
}return b},getCoordinate:function(a){var b=a*this.stepWidth;
if(!this.startOnAxis){b+=this.stepWidth/2
}if(this.rotate){b+=this.y
}else{b+=this.x}return b
},timeZoom:function(b,a){this.startTime=b;
this.endTime=a+this.minDuration()
},minDuration:function(){var a=AmCharts.extractPeriod(this.minPeriod);
return AmCharts.getPeriodDuration(a.period,a.count)
},checkPeriodChange:function(h,d,f,b){var a=new Date(f);
var g=new Date(b);var e=AmCharts.resetDateToMin(a,h,d).getTime();
var c=AmCharts.resetDateToMin(g,h,d).getTime();
if(e!=c){return true}else{return false
}},xToIndex:function(a){if(this.chart.rotate){a=a-this.y
}else{a=a-this.x}var b;
if(this.parseDates&&!this.equalSpacing){var d=this.startTime+Math.round(a/this.stepWidth)-this.minDuration()/2;
b=this.chart.getClosestIndex(this.data,"time",d,false,this.start,this.end+1)
}else{if(!this.startOnAxis){a-=this.stepWidth/2
}b=this.start+Math.round(a/this.stepWidth)
}b=AmCharts.fitToBounds(b,0,this.data.length-1);
var c=this.data[b].x[this.id];
if(this.chart.rotate){if(c>this.height+1+this.y){b--
}if(c<this.y){b++}}else{if(c>this.width+1+this.x){b--
}if(c<this.x){b++}}b=AmCharts.fitToBounds(b,0,this.data.length-1);
return b}});AmCharts.RectangularAxisRenderer=AmCharts.Class({construct:function(d){var g=d.chart;
var s=d.axisThickness;
var j=d.axisColor;var q=d.axisAlpha;
var e=d.tickLength;var b=d.offset;
var u=d.dx;var r=d.dy;
var m=d.visibleAxisX;
var h=d.visibleAxisY;
var f=d.visibleAxisHeight;
var p=d.visibleAxisWidth;
var n;var k;if(d.orientation=="horizontal"){this.set=AmCharts.line(g.container,[0,p],[0,0],j,q,s);
this.axisWidth=d.width;
if(d.position=="bottom"){k=s/2+b+f+h-1;
n=m}else{k=-s/2-b+h+r;
n=u+m}}else{this.axisWidth=d.height;
if(d.position=="right"){this.set=AmCharts.line(g.container,[0,0,-u],[0,f,f-r],j,q,s);
k=h+r;n=s/2+b+u+p+m-1
}else{this.set=AmCharts.line(g.container,[0,0],[0,f],j,q,s);
k=h;n=-s/2-b+m}}this.set.translate(Math.round(n)+","+Math.round(k))
}});AmCharts.RectangularAxisItemRenderer=AmCharts.Class({construct:function(z,t,Q,H,p,ag,ac,c){if(Q==undefined){Q=""
}if(H==undefined){H=true
}var a=z.chart.fontFamily;
var E=z.fontSize;if(E==undefined){E=z.chart.fontSize
}var D=z.color;if(D==undefined){D=z.chart.color
}var G=z.chart.container;
this.set=G.set();var J=3;
var W=4;var g=z.axisThickness;
var F=z.axisColor;var Y=z.axisAlpha;
var I=z.tickLength;var r=z.gridAlpha;
var Z=z.gridThickness;
var aa=z.gridColor;var l=z.dashLength;
var ad=z.fillColor;var s=z.fillAlpha;
var T=z.labelsEnabled;
var R=z.labelRotation;
var d=z.counter;var j=z.inside;
var f=z.dx;var e=z.dy;
var A=z.orientation;var N=z.position;
var K=z.previousCoord;
var X=z.chart.rotate;
var h=z.autoTruncate;
var n=z.visibleAxisX;
var m=z.visibleAxisY;
var x=z.visibleAxisHeight;
var o=z.visibleAxisWidth;
var M=z.offset;var b;
var P;if(ac){T=true;if(!isNaN(ac.tickLength)){I=ac.tickLength
}if(ac.lineColor!=undefined){aa=ac.lineColor
}if(!isNaN(ac.lineAlpha)){r=ac.lineAlpha
}if(!isNaN(ac.dashLength)){l=ac.dashLength
}if(!isNaN(ac.lineThickness)){Z=ac.lineThickness
}if(ac.inside==true){j=true
}}else{if(!Q){r=r/3;I=I/2
}}var S="start";if(p){S="middle"
}var u=R*Math.PI/180;
var y;var k;var C=0;var B=0;
var V=0;var U=0;var L=0;
var O=0;var af=(n+f)+","+(m+e)+","+o+","+x;
if(A=="vertical"){R=0
}if(T){var ae=AmCharts.text(G,0,0,Q,{fill:D,"text-anchor":S,"font-family":a,"font-size":E,rotation:-R});
if(c==true){ae.attr({"font-weight":"bold"})
}this.set.push(ae);var v=ae.getBBox();
L=v.width;O=v.height}if(A=="horizontal"){if(t>=n&&t<=o+1+n){b=AmCharts.line(G,[t,t],[0,I],F,Y,Z);
this.set.push(b);P=AmCharts.line(G,[t,t+f,t+f],[x,x+e,e],aa,r,Z,l);
this.set.push(P)}B=0;
C=t;if(H==false){S="start";
if(!X){if(N=="bottom"){if(j){B+=I
}else{B-=I}}else{if(j){B-=I
}else{B+=I}}C+=3;if(p){C+=p/2;
S="middle"}}}else{S="middle"
}if(d==1&&s>0&&!ac){y=t-K;
fill=AmCharts.rect(G,y,z.height,[ad],[s]);
fill.translate((t-y+f)+","+e);
fill.attr({"clip-rect":af});
this.set.push(fill)}if(N=="bottom"){B+=x+E/2+M;
if(j){B-=I+E+J+J;if(R>0){C+=(L/2)*Math.cos(u);
B-=(L/2)*Math.sin(u)-(O/2)*Math.sin(u)
}}else{B+=I+g+J+3;if(R>0){C-=(L/2)*Math.cos(u);
B+=(L/2)*Math.sin(u)-(O/2)*Math.cos(u);
if(R==90){B-=8;if(AmCharts.isNN){C+=1
}else{C+=3}}}}}else{B+=e+E/2-M;
C+=f;if(j){B+=I+J;if(R>0){C-=(L/2)*Math.cos(u);
B+=(L/2)*Math.sin(u)-((O/2))*Math.sin(u)+3
}}else{B-=I+E+J+g+3;if(R>0){C+=(L/2)*Math.cos(u);
B-=(L/2)*Math.sin(u)-((O/2))*Math.sin(u)+3
}}}if(N=="bottom"){if(j){U=x-I-1
}else{U=x+g-1}U+=M}else{V=f;
if(j){U=e}else{U=e-I-g+1
}U-=M}if(ag){C+=ag}var ab=C;
if(R>0){ab+=(L/2)*Math.cos(u)
}if(ae){if(ab>n+o||ab<n){ae.hide()
}}}else{if(t>=m&&t<=x+1+m){b=AmCharts.line(G,[0,I],[t,t],F,Y,Z);
this.set.push(b);P=AmCharts.line(G,[0,f,o+f],[t,t+e,t+e],aa,r,Z,l);
this.set.push(P)}S="end";
if((j==true&&N=="left")||(j==false&&N=="right")){S="start"
}B=t-E/2;if(d==1&&s>0&&!ac){k=t-K;
fill=AmCharts.rect(G,z.width,k,[ad],[s]);
fill.translate(f+","+(t-k+e));
fill.attr({"clip-rect":af});
this.set.push(fill)}B+=E/2;
if(N=="right"){C+=f+o+M;
B+=e;if(j==true){C-=I+W;
if(!ag){B-=E/2+3}}else{C+=I+W+g;
B-=2}}else{if(j==true){C+=I+W-M;
if(!ag){B-=E/2+3}if(ac){C+=f;
B+=e}}else{C+=-I-g-W-2-M;
B-=2}}if(b){if(N=="right"){V+=f+M+o;
U+=e;if(j==true){V-=g
}else{V+=g}}else{V-=M;
if(j==true){}else{V-=I+g
}}}if(ag){B+=ag}var q=m-3;
if(N=="right"){q+=e}if(ae){if(B>x+m||B<q){ae.hide()
}}}if(b){b.translate(V+","+U)
}if(ae){ae.attr({"text-anchor":S});
ae.translate(C+","+B);
z.allLabels.push(ae)}if(z.visible==false){if(b){b.hide()
}if(ae){ae.hide()}}if(d==0){z.counter=1
}else{z.counter=0}z.previousCoord=t
},graphics:function(){return this.set
}});AmCharts.RectangularAxisGuideFillRenderer=AmCharts.Class({construct:function(g,k,j,f){var d=g.orientation;
var e=0;var c=f.fillAlpha;
var a=g.chart.container;
var m=g.dx;var l=g.dy;
if(isNaN(k)){k=4;e=2;
c=0}var b=f.fillColor;
if(b==undefined){b="#000000"
}if(k<0){if(typeof(b)=="object"){b=b.join(",").split(",").reverse()
}}if(isNaN(c)){c=0}var h=(g.visibleAxisX+m)+","+(g.visibleAxisY+l)+","+g.visibleAxisWidth+","+g.visibleAxisHeight;
if(d=="vertical"){this.fill=AmCharts.rect(a,g.width,k,b,c);
this.fill.translate(m+","+(j-e+l))
}else{this.fill=AmCharts.rect(a,k,g.height,b,c);
this.fill.translate((j-e+m)+","+l)
}this.fill.attr({"clip-rect":h})
},graphics:function(){return this.fill
}});AmCharts.AmGraph=AmCharts.Class({construct:function(){this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem");
this.type="line";this.stackable=true;
this.columnCount=1;this.columnIndex=0;
this.showBalloon=true;
this.centerCustomBullets=true;
this.maxBulletSize=50;
this.balloonText="[[value]]";
this.animationPlayed=false;
this.scrollbar=false;
this.hidden=false;this.columnWidth=0.8;
this.pointPosition="middle";
this.depthCount=1;this.includeInMinMax=true;
this.negativeBase=0;this.visibleInLegend=true;
this.showAllValueLabels=false;
this.showBalloonAt="close";
this.lineThickness=1;
this.dashLength=0;this.connect=true;
this.lineAlpha=1;this.bullet="none";
this.bulletBorderThickness=2;
this.bulletBorderAlpha=1;
this.bulletAlpha=1;this.bulletSize=8;
this.bulletOffset=0;this.hideBulletsCount=0;
this.labelPosition="top";
this.cornerRadiusTop=0;
this.cornerRadiusBottom=0;
this.cursorBulletAlpha=1;
this.gradientOrientation="vertical"
},draw:function(){var a=this;
this.container=this.chart.container;
this.destroy();this.set=this.container.set();
if(this.data){if(this.data.length>0&&this.valueAxis.axisCreated){this.columnsArray=[];
if(!this.hidden){this.createGraph()
}}}},createGraph:function(){if(this.labelPosition=="inside"){this.labelPosition="bottom"
}this.ownColumns=[];this.allBullets=[];
this.objectsToAddListeners=[];
this.startDuration=this.chart.startDuration;
this.startEffect=this.chart.startEffect;
this.startAlpha=this.chart.startAlpha;
this.sequencedAnimation=this.chart.sequencedAnimation;
this.baseCoord=this.valueAxis.baseCoord;
if(!this.fillColors){this.fillColors=[this.lineColor]
}if(this.fillAlphas==undefined){this.fillAlphas=0
}if(this.bulletColor==undefined){this.bulletColor=this.lineColor;
this.bulletColorNegative=this.negativeLineColor
}if(this.bulletAlpha==undefined){this.bulletAlpha=this.lineAlpha
}if(!this.bulletBorderColor){this.bulletBorderAlpha=0
}if(!isNaN(this.valueAxis.min)&&!isNaN(this.valueAxis.max)){switch(this.chartType){case"serial":this.createSerialGraph();
break;case"radar":this.createRadarGraph();
break;case"xy":this.createXYGraph();
break}this.animationPlayed=true
}},createSerialGraph:function(){if(typeof(this.fillAlphas)=="object"){this.fillAlphas=this.fillAlphas[0]
}if(typeof(this.negativefillAlphas)=="object"){this.negativefillAlphas=this.negativefillAlphas[0]
}this.objectsToClip=[];
this.positiveObjectsToClip=[];
this.negativeObjectsToClip=[];
this.animationArray=[];
var ar=this;var X=this.columnWidth;
var d=this.valueAxis.getCoordinate(this.valueAxis.min);
if(this.valueAxis.logarithmic){d=this.valueAxis.getCoordinate(this.valueAxis.minReal)
}this.minCoord=d;this.positiveMaskHeight=this.height;
this.positiveMaskWidth=this.width;
this.positiveMaskX=this.x;
this.positiveMaskY=this.y;
if(!this.scrollbar&&(this.type=="line"||this.type=="smoothedLine"||this.type=="step")){if(this.data.length==1&&this.type!="step"){this.bullet="round"
}if(this.negativeFillColors||this.negativeLineColor!=undefined){var an=this.negativeBase;
if(an>this.valueAxis.max){an=this.valueAxis.max
}if(an<this.valueAxis.min){an=this.valueAxis.min
}if(this.valueAxis.logarithmic){an=this.valueAxis.minReal
}var g=this.valueAxis.getCoordinate(an);
var a=this.valueAxis.getCoordinate(this.valueAxis.max);
if(this.rotate){this.positiveMaskHeight=this.height;
this.positiveMaskWidth=Math.abs(a-g);
this.negativeMaskHeight=this.height;
this.negativeMaskWidth=Math.abs(d-g);
this.positiveMaskY=this.y;
this.negativeMaskY=this.y;
if(this.valueAxis.reversed){this.positiveMaskX=this.x;
this.negativeMaskX=g}else{this.positiveMaskX=g;
this.negativeMaskX=this.x
}}else{this.positiveMaskWidth=this.width;
this.positiveMaskHeight=Math.abs(a-g);
this.negativeMaskWidth=this.width;
this.negativeMaskHeight=Math.abs(d-g);
this.positiveMaskX=this.x;
this.negativeMaskX=this.x;
if(this.valueAxis.reversed){this.positiveMaskY=g;
this.negativeMaskY=d+1
}else{this.positiveMaskY=a;
this.negativeMaskY=g}}}}var ah=this.chart.columnSpacing;
var aI=this.categoryAxis.cellWidth;
var I=(aI*X-this.columnCount)/this.columnCount;
if(ah>I){ah=I}if(this.type=="column"){X=(aI*X-(ah*(this.columnCount-1)))/this.columnCount
}else{X=aI*X}if(X<1){X=1
}var T=this.cornerRadiusTop;
var aq=AmCharts.toCoordinate(T,X/2);
var aD=this.connect;var ay=[];
var ak=[];var aB;var f;
var ac=this.chart.graphs.length;
var aA;var n=this.dx/this.depthCount;
var l=this.dy/this.depthCount;
var al=this.valueAxis.stackType;
var H=this.labelPosition;
if(H=="above"){H="top"
}if(H=="below"){H="bottom"
}var ae;var q=270;if(this.gradientOrientation=="horizontal"){q=0
}var W;var af;var G;var Q;
if(this.type=="line"||this.type=="step"||this.type=="smoothedLine"){if(this.start>0){for(Q=this.start-1;
Q>-1;Q--){W=this.data[Q];
af=W.axes[this.valueAxis.id].graphs[this.id];
G=af.values.value;if(G){this.start=Q;
break}}}if(this.end<this.data.length-1){for(Q=this.end+1;
Q<this.data.length;Q++){W=this.data[Q];
af=W.axes[this.valueAxis.id].graphs[this.id];
G=af.values.value;if(G){this.end=Q;
break}}}}if(this.end<this.data.length-1){this.end++
}for(Q=this.start;Q<=this.end;
Q++){W=this.data[Q];af=W.axes[this.valueAxis.id].graphs[this.id];
af.index=Q;var z="";if(af.url){z="pointer"
}var k=NaN;var x=NaN;
var J=NaN;var aF=NaN;
var ao=NaN;var h=NaN;
var m=NaN;var ag=NaN;
var S=NaN;var aG=NaN;
var aE=NaN;var aj=NaN;
var ai=NaN;var R=NaN;
var az=undefined;var e=this.fillColors;
if(af.color!=undefined){e=[af.color]
}if(af.fillColors){e=af.fillColors
}var K=this.fillAlphas;
if(!isNaN(af.alpha)){K=[af.alpha]
}var ab;var aa;var b;
var ad;var am;var y=af.values;
if(this.valueAxis.recalculateToPercents){y=af.percents
}if(!this.stackable||al=="none"||al=="3d"){R=y.value
}else{R=y.close}if(this.type=="candlestick"||this.type=="ohlc"){R=y.close;
var aH=y.low;m=this.valueAxis.getCoordinate(aH);
var o=y.high;S=this.valueAxis.getCoordinate(o)
}var L=y.open;J=this.valueAxis.getCoordinate(R);
if(!isNaN(L)){ao=this.valueAxis.getCoordinate(L)
}if(!this.scrollbar){if(this.showBalloonAt=="close"){af.y=J
}if(this.showBalloonAt=="open"){af.y=ao
}if(this.showBalloonAt=="high"){af.y=S
}if(this.showBalloonAt=="low"){af.y=m
}}k=W.x[this.categoryAxis.id];
var O=aI/2;var N=aI/2;
if(this.pointPosition=="start"){k-=aI/2;
O=0;N=aI}if(!this.scrollbar){af.x=k
}if(this.rotate){x=J;
aF=ao;J=k;ao=k;if(isNaN(L)){aF=this.baseCoord
}h=m;ag=S}else{x=k;aF=k;
if(isNaN(L)){ao=this.baseCoord
}}switch(this.type){case"line":if(!isNaN(R)){if(R<this.negativeBase){af.isNegative=true
}ay.push(x);ak.push(J);
aG=x;aE=J;aj=x;ai=J}else{if(!aD){this.drawLineGraph(ay,ak);
ay=[];ak=[]}}break;case"smoothedLine":if(!isNaN(R)){if(R<this.negativeBase){af.isNegative=true
}ay.push(x);ak.push(J);
aG=x;aE=J;aj=x;ai=J}else{if(!aD){this.drawSmoothedGraph(ay,ak);
ay=[];ak=[]}}break;case"step":if(!isNaN(R)){if(R<this.negativeBase){af.isNegative=true
}if(this.rotate){if(aB&&aD){ay.push(aB);
ak.push(J-O)}ak.push(J-O);
ay.push(x);ak.push(J+N);
ay.push(x)}else{if(f&&aD){ak.push(f);
ay.push(x-O)}ay.push(x-O);
ak.push(J);ay.push(x+N);
ak.push(J)}aB=x;f=J;aG=x;
aE=J;aj=x;ai=J}else{if(!aD){this.drawLineGraph(ay,ak);
ay=[];ak=[]}}break;case"column":var az;
if(!isNaN(R)){ab=e;b=this.lineColor;
if(R<this.negativeBase){af.isNegative=true;
if(this.negativeFillColors){ab=this.negativeFillColors
}if(this.negativeLineColor!=undefined){b=this.negativeLineColor
}}if(this.rotate){if(al=="3d"){var A=J-0.5*(X+ah)+ah/2+l*this.columnIndex;
var B=aF+n*this.columnIndex
}else{var A=J-(this.columnCount/2-this.columnIndex)*(X+ah)+ah/2;
var B=aF}var C=X;aG=x;
aE=A+X/2;aj=x;ai=A+X/2;
if(A+C>this.y+this.height){C=this.y+this.height-A
}if(A<this.y){C-=this.y-A;
A=this.y}if(A<this.y+this.height&&C>0){az=new AmCharts.Cuboid(this.container,x-aF,C,n,l,ab,K,this.lineThickness,b,this.lineAlpha,q,aq);
az.y(A);az.x(B);if(H!="bottom"){H="right";
if(R<0){H="left"}else{aG+=this.dx;
if(al!="regular"&&al!="100%"){aE+=this.dy
}}}}}else{H="top";if(al=="3d"){var B=x-0.5*(X+ah)+ah/2+n*this.columnIndex;
var A=ao+l*this.columnIndex
}else{var B=x-(this.columnCount/2-this.columnIndex)*(X+ah)+ah/2;
var A=ao}var C=X;aG=B+X/2;
aE=J;aj=B+X/2;ai=J;if(B+C>this.x+this.width){C=this.x+this.width-B
}if(B<this.x){C-=this.x-B;
B=this.x}if(B<this.x+this.width&&C>0){az=new AmCharts.Cuboid(this.container,C,J-ao,n,l,ab,K,this.lineThickness,b,this.lineAlpha,q,aq);
az.y(A);az.x(B);if(R<0){H="bottom"
}else{if(al!="regular"&&al!="100%"){aG+=this.dx
}aE+=this.dy}}}if(az){if(!this.scrollbar){if(al=="none"){if(this.rotate){aA=(this.end+1-Q)*ac-this.index
}else{aA=ac*Q+this.index
}}if(al=="3d"){aA=(ac-this.index)*(Q+1);
if(this.rotate){aE=A+X/2;
aE+=l*this.columnIndex
}else{aG+=n*this.columnIndex;
aE+=l*this.columnIndex
}}if(al=="regular"||al=="100%"){H="middle";
if(this.rotate){if(y.value>0){aA=(this.end+1-Q)*ac+this.index
}else{aA=(this.end+1-Q)*ac-this.index
}}else{if(y.value>0){aA=(ac*Q)+this.index
}else{aA=ac*Q-this.index
}}}this.columnsArray.push({column:az,depth:aA});
if(this.rotate){af.x=az.getY()+C/2
}else{af.x=az.getX()+C/2
}this.ownColumns.push(az);
if(this.dx==0&&this.dy==0){if(this.startDuration>0&&!this.animationPlayed){if(this.rotate){ad=x-aF;
pFinalDimension=x;pInitialDimension=aF
}else{ad=J-ao;pFinalDimension=J;
pInitialDimension=ao}if(this.sequencedAnimation){az.set.hide();
this.animationArray.push({obj:az.set,fh:ad,ip:pInitialDimension,fp:pFinalDimension});
ae=setTimeout(function(){ar.animate.call(ar)
},this.startDuration/(this.end-this.start+1)*(Q-this.start)*1000);
this.timeOuts.push(ae)
}else{this.animate(az.set,ad,pInitialDimension,pFinalDimension)
}}}var aJ=az.set;for(var P=0;
P<aJ.length;P++){aJ[P].dItem=af;
aJ[P].attr({cursor:z})
}this.objectsToAddListeners.push(az.set)
}this.set.push(az.set);
af.columnSprite=aJ}}break;
case"candlestick":if(!isNaN(L)&&!isNaN(o)&&!isNaN(aH)&&!isNaN(R)){var U;
var ax;ab=e;b=this.lineColor;
aa=this.fillAlphas;if(R<L){af.isNegative=true;
if(this.negativeFillColors){ab=this.negativeFillColors
}if(this.negativeFillAlphas){aa=this.negativeFillAlphas
}if(this.negativeLineColor!=undefined){b=this.negativeLineColor
}}if(this.rotate){var A=J-X/2;
var B=aF;var C=X;if(A+C>this.y+this.height){C=this.y+this.height-A
}if(A<this.y){C-=this.y-A;
A=this.y}if(A<this.y+this.height&&C>0){var M;
var aw;if(R>L){M=[x,ag];
aw=[aF,h]}else{M=[aF,ag];
aw=[x,h]}if(J<this.y+this.height&&J>this.y){U=AmCharts.line(this.container,M,[J,J],b,this.lineAlpha,this.lineThickness);
ax=AmCharts.line(this.container,aw,[J,J],b,this.lineAlpha,this.lineThickness)
}az=new AmCharts.Cuboid(this.container,x-aF,C,n,l,ab,K,this.lineThickness,b,this.lineAlpha,q,aq);
az.y(A);az.x(B)}}else{var B=x-X/2;
var A=ao+this.lineThickness/2;
var C=X;if(B+C>this.x+this.width){C=this.x+this.width-B
}if(B<this.x){C-=this.x-B;
B=this.x}if(B<this.x+this.width&&C>0){az=new AmCharts.Cuboid(this.container,C,J-ao,n,l,ab,aa,this.lineThickness,b,this.lineAlpha,q,aq);
az.x(B);az.y(A);var aC;
var D;if(R>L){aC=[J,S];
D=[ao,m]}else{aC=[ao,S];
D=[J,m]}if(x<this.x+this.width&&x>this.x){U=AmCharts.line(this.container,[x,x],aC,b,this.lineAlpha,this.lineThickness);
ax=AmCharts.line(this.container,[x,x],D,b,this.lineAlpha,this.lineThickness)
}}}if(az){this.set.push(az.set);
if(U){this.set.push(U);
this.set.push(ax)}aG=x;
aE=J;aj=x;ai=J;if(!this.scrollbar){if(this.rotate){af.x=az.getY()+C/2
}else{af.x=az.getX()+C/2
}if(this.dx==0&&this.dy==0){if(this.startDuration>0&&!this.animationPlayed){if(this.rotate){ad=x-aF;
pFinalDimension=x;pInitialDimension=aF
}else{ad=J-ao;pFinalDimension=J;
pInitialDimension=ao}if(this.sequencedAnimation){az.set.show();
this.animationArray.push({obj:az.set,fh:ad,ip:pInitialDimension,fp:pFinalDimension});
ae=setTimeout(function(){ar.animate.call(ar)
},this.startDuration/(this.end-this.start+1)*(Q-this.start)*1000);
this.timeOuts.push(ae)
}else{this.animate(az.set,ad,pInitialDimension,pFinalDimension)
}}}var aJ=az.set;for(var P=0;
P<aJ.length;P++){aJ[P].dItem=af;
aJ[P].attr({cursor:z})
}this.objectsToAddListeners.push(az.set)
}}}break;case"ohlc":if(!isNaN(L)&&!isNaN(o)&&!isNaN(aH)&&!isNaN(R)){b=this.lineColor;
if(R<L){af.isNegative=true;
if(this.negativeLineColor!=undefined){b=this.negativeLineColor
}}var s;var p;var t;if(this.rotate){p=AmCharts.line(this.container,[aF,aF],[J-X/2,J],b,this.lineAlpha,this.lineThickness,this.dashLength);
s=AmCharts.line(this.container,[h,ag],[J,J],b,this.lineAlpha,this.lineThickness,this.dashLength);
t=AmCharts.line(this.container,[x,x],[J,J+X/2],b,this.lineAlpha,this.lineThickness,this.dashLength)
}else{p=AmCharts.line(this.container,[x-X/2,x],[ao,ao],b,this.lineAlpha,this.lineThickness,this.dashLength);
s=AmCharts.line(this.container,[x,x],[m,S],b,this.lineAlpha,this.lineThickness,this.dashLength);
t=AmCharts.line(this.container,[x,x+X/2],[J,J],b,this.lineAlpha,this.lineThickness,this.dashLength)
}this.objectsToClip.push(p);
this.objectsToClip.push(s);
this.objectsToClip.push(t);
this.set.push(p);this.set.push(s);
this.set.push(t);aG=x;
aE=J;aj=x;ai=J}break}if(!this.scrollbar&&!isNaN(R)){if(this.end-this.start<=this.hideBulletsCount||this.hideBulletsCount==0){var r=this.createBullet(af,aj,ai,Q);
if(!r){r=0}if(this.labelText){var V=this.numberFormatter;
if(!V){V=this.chart.numberFormatter
}var u=this.color;if(u==undefined){u=this.chart.color
}var Z=this.fontSize;
if(Z==undefined){Z=this.chart.fontSize
}var ap=this.chart.formatString(this.labelText,af);
var Y=AmCharts.text(this.container,aG,aE,ap,{fill:u,"font-family":this.chart.fontFamily,"font-size":Z});
this.set.push(Y);this.allBullets.push(Y);
if(this.type=="column"){if(this.rotate){if(H=="right"||H=="bottom"){Y.attr({width:this.width})
}else{Y.attr({width:x-aF})
}}else{Y.attr({width:aI})
}}var av=0;var at=0;var F=NaN;
var E=NaN;var au=Y.getBBox();
var c=au.width;var v=au.height;
switch(H){case"left":av=-(c/2+r/2+3);
break;case"top":at=-(v/2+r/2+3);
break;case"right":av=r/2+2+c/2;
break;case"bottom":if(this.rotate&&this.type=="column"){if(R<0){F=aF-c/2-7
}else{F=aF+6+c/2}}else{at=r/2+v/2;
Y.x=-(c/2+2)}break;case"middle":if(this.type=="column"){if(this.rotate){F=(x-aF)/2+aF;
if(Math.abs(x-aF)<c){if(!this.showAllValueLabels){Y.remove()
}}}else{E=(J-ao)/2+ao+1;
if(Math.abs(J-ao)<v){if(!this.showAllValueLabels){Y.remove()
}}}}break}if(!isNaN(F)){Y.attr({x:F})
}if(!isNaN(E)){Y.attr({y:E})
}Y.translate(av+","+at);
au=Y.getBBox();if(au.x<this.x||au.y<this.y||au.x+au.width>this.x+this.width||au.y+au.height>this.y+this.height){Y.remove()
}}}}}if(this.type=="line"||this.type=="step"||this.type=="smoothedLine"){if(this.type=="smoothedLine"){this.drawSmoothedGraph(ay,ak)
}else{this.drawLineGraph(ay,ak)
}if(!this.scrollbar){this.launchAnimation()
}}},setPositiveClipRect:function(a){a.attr({"clip-rect":this.positiveMaskX+","+this.positiveMaskY+","+this.positiveMaskWidth+","+this.positiveMaskHeight})
},setNegativeClipRect:function(a){a.attr({"clip-rect":this.negativeMaskX+","+this.negativeMaskY+","+this.negativeMaskWidth+","+this.negativeMaskHeight})
},drawLineGraph:function(a,e){if(a.length>1){var k=AmCharts.line(this.container,a,e,this.lineColor,this.lineAlpha,this.lineThickness,this.dashLength);
this.positiveObjectsToClip.push(k);
this.set.push(k);if(this.negativeLineColor!=undefined){var d=AmCharts.line(this.container,a,e,this.negativeLineColor,this.lineAlpha,this.lineThickness,this.dashLength);
this.negativeObjectsToClip.push(d);
this.set.push(d)}if(this.fillAlphas!=undefined&&this.fillAlphas!=0){var b=a.join(";").split(";");
var h=e.join(";").split(";");
if(this.chartType=="serial"){if(this.rotate){h.push(h[h.length-1]);
b.push(this.baseCoord);
h.push(h[0]);b.push(this.baseCoord);
h.push(h[0]);b.push(b[0])
}else{b.push(b[b.length-1]);
h.push(this.baseCoord);
b.push(b[0]);h.push(this.baseCoord);
b.push(a[0]);h.push(h[0])
}}var j=AmCharts.polygon(this.container,b,h,this.fillColors,this.fillAlphas);
this.set.push(j);this.positiveObjectsToClip.push(j);
if(this.negativeFillColors||this.negativeLineColor!=undefined){var g=this.fillAlphas;
if(this.negativeFillAlphas){g=this.negativeFillAlphas
}var f=this.negativeLineColor;
if(this.negativeFillColors){f=this.negativeFillColors
}var c=AmCharts.polygon(this.container,b,h,f,g);
this.set.push(c);this.negativeObjectsToClip.push(c)
}}}},drawSmoothedGraph:function(a,d){var j=new AmCharts.Bezier(this.container,a,d,this.lineColor,this.lineAlpha,this.lineThickness,NaN,NaN,this.dashLength);
this.positiveObjectsToClip.push(j.path);
this.set.push(j.path);
if(this.negativeLineColor!=undefined){var c=new AmCharts.Bezier(this.container,a,d,this.negativeLineColor,this.lineAlpha,this.lineThickness,NaN,NaN,this.dashLength);
this.set.push(c.path);
this.negativeObjectsToClip.push(c.path)
}if(this.fillAlphas>0){var e=[];
if(this.rotate){e.push("L",this.baseCoord,d[d.length-1]);
e.push("L",this.baseCoord,d[0]);
e.push("L",a[0],d[0])
}else{e.push("L",a[a.length-1],this.baseCoord);
e.push("L",a[0],this.baseCoord);
e.push("L",a[0],d[0])
}var h=new AmCharts.Bezier(this.container,a,d,NaN,NaN,0,this.fillColors,this.fillAlphas,this.dashLength,e);
this.positiveObjectsToClip.push(h.path);
this.set.push(h.path);
if(this.negativeFillColors||this.negativeLineColor!=undefined){var g=this.fillAlphas;
if(this.negativeFillAlphas){g=this.negativeFillAlphas
}var f=this.negativeLineColor;
if(this.negativeFillColors){f=this.negativeFillColors
}var b=new AmCharts.Bezier(this.container,a,d,NaN,NaN,0,f,g,this.dashLength,e);
this.negativeObjectsToClip.push(b.path);
this.set.push(b.path)
}}},launchAnimation:function(){if(this.startDuration>0&&!this.animationPlayed){this.set.attr({opacity:this.startAlpha});
if(this.rotate){this.set.translate((-1000)+","+0)
}else{this.set.translate(0+","+(-1000))
}if(this.sequencedAnimation){var b=this;
var a=setTimeout(function(){b.animateGraphs.call(b)
},this.index*this.startDuration*1000);
this.timeOuts.push(a)
}else{this.animateGraphs()
}}},animateGraphs:function(){if(this.chartType=="radar"){}else{if(this.rotate){this.set.animate({opacity:1,translation:(1000+","+0)},this.startDuration*1000,this.startEffect)
}else{this.set.animate({opacity:1,translation:(0+","+1000)},this.startDuration*1000,this.startEffect)
}}},animate:function(d,a,e,b){var c=this.animationArray;
if(!d&&c.length>0){d=c[0].obj;
a=c[0].fh;e=c[0].ip;b=c[0].fp;
c.shift()}d.show();if(this.rotate){if(a>0){d.attr({"fill-opacity":this.startAlpha,width:1});
d.animate({"fill-opacity":this.fillAlphas,width:Math.abs(a)},this.startDuration*1000,this.startEffect)
}else{d.attr({"fill-opacity":this.startAlpha,width:1,x:e});
d.animate({"fill-opacity":this.fillAlphas,width:Math.abs(a),x:b},this.startDuration*1000,this.startEffect)
}}else{if(a>0){d.attr({"fill-opacity":this.startAlpha,height:0.1});
d.animate({"fill-opacity":this.fillAlphas,height:Math.abs(a)},this.startDuration*1000,this.startEffect)
}else{d.attr({"fill-opacity":this.startAlpha,height:0.1,y:e});
d.animate({"fill-opacity":this.fillAlphas,height:Math.abs(a),y:b},this.startDuration*1000,this.startEffect)
}}},legendKeyColor:function(){var a=this.legendColor;
var b=this.lineAlpha;
if(a==undefined){a=this.lineColor;
if(b==0){var c=this.fillColors;
if(c){if(typeof(c)=="object"){a=c[0]
}else{a=c}}}}return a
},legendKeyAlpha:function(){var a=this.legendAlpha;
if(a==undefined){a=this.lineAlpha;
if(a==0){if(this.fillAlphas){a=this.fillAlphas
}}}return a},createBullet:function(q,p,o,f){var s=this;
var j="";if(q.url){j="pointer"
}var l=this.bulletOffset;
var b=this.bulletSize;
if(!isNaN(q.bulletSize)){b=q.bulletSize
}if(!isNaN(this.maxValue)){var n=q.values.value;
if(!isNaN(n)){b=n/this.maxValue*this.maxBulletSize
}}var r;if(this.bullet=="none"&&!q.bullet){}else{var g=this.bulletColor;
if(q.isNegative&&this.bulletColorNegative!=undefined){g=this.bulletColorNegative
}if(q.color!=undefined){g=q.color
}var m=this.bullet;if(q.bullet){m=q.bullet
}var c=this.bulletBorderThickness;
var h=this.bulletBorderColor;
var k=this.bulletBorderAlpha;
var d=g;var e=this.bulletAlpha;
switch(m){case"round":r=AmCharts.circle(this.container,b/2,d,e,c,h,k);
break;case"square":r=AmCharts.rect(this.container,b,b,d,e,c,h,k);
r.translate(-b/2+","+(-b/2));
break;case"triangleUp":r=AmCharts.triangle(this.container,b,0,d,e,c,h,k);
break;case"triangleDown":r=AmCharts.triangle(this.container,b,180,d,e,c,h,k);
break;case"triangleLeft":r=AmCharts.triangle(this.container,b,270,d,e,c,h,k);
break;case"triangleRight":r=AmCharts.triangle(this.container,b,90,d,e,c,h,k);
break;case"bubble":r=AmCharts.circle(this.container,b/2,d,e,c,h,k,true);
break}if(r){r.translate(p+","+o)
}}if(this.customBullet||q.customBullet){var a=this.customBullet;
if(q.customBullet){a=q.customBullet
}if(a){if(this.chart.path){a=this.chart.path+a
}r=this.container.image(a,p,o,b,b).attr({preserveAspectRatio:true});
if(this.centerCustomBullets){r.translate(-b/2+","+(-b/2))
}}}if(r){r.attr({cursor:j});
if(this.rotate){r.translate(l+","+0)
}else{r.translate(0+","+(-l))
}this.allBullets.push(r);
this.set.push(r);this.objectsToClip.push(r);
r.dItem=q;this.objectsToAddListeners.push(r)
}return b},addMouseListeners:function(a){var b=this;
if(this.chart.touchEventsEnabled){a.touchstart(function(){b.handleRollOver(this.dItem)
}).touchend(function(){b.handleClick(this.dItem)
})}a.mouseover(function(){b.handleRollOver.call(b,this.dItem)
}).mouseout(function(){b.handleRollOut.call(b,this.dItem)
}).click(function(){b.handleClick.call(b,this.dItem)
}).dblclick(function(){b.handleDoubleClick.call(b,this.dItem)
})},handleRollOver:function(e){if(e){var b="rollOverGraphItem";
var c={type:b,item:e,index:e.index,graph:this};
this.fire(b,c);clearTimeout(this.chart.hoverInt);
var d=this.chart.formatString(this.balloonText,e);
var a=this.chart.getBalloonColor(this,e);
this.chart.balloon.showBullet=false;
this.chart.balloon.pointerOrientation="down";
this.chart.showBalloon(d,a,true)
}},handleRollOut:function(c){if(c){var a="rollOutGraphItem";
var b={type:a,item:c,index:c.index,graph:this};
this.fire(a,b);this.chart.hideBalloon()
}},handleClick:function(c){if(c){var a="clickGraphItem";
var b={type:a,item:c,index:c.index,graph:this};
this.fire(a,b);if(c.url){if(this.urlTarget=="_self"||!this.urlTarget){window.location.href=c.url
}else{window.open(c.url)
}}}},handleDoubleClick:function(c){if(c){var a="doubleClickGraphItem";
var b={type:a,item:c,index:c.index,graph:this};
this.fire(a,b)}},zoom:function(b,a){this.start=b;
this.end=a;this.draw()
},changeOpacity:function(b){if(this.set){this.set.attr({opacity:b})
}},destroy:function(){AmCharts.removeSet(this.set);
if(this.timeOuts){for(var a=0;
a<this.timeOuts.length;
a++){clearTimeout(this.timeOuts[a])
}}this.timeOuts=[]}});
AmCharts.ChartCursor=AmCharts.Class({construct:function(){this.createEvents("changed","zoomed");
this.cursorAlpha=1;this.selectionAlpha=0.2;
this.cursorColor="#CC0000";
this.categoryBalloonAlpha=1;
this.color="#FFFFFF";
this.type="cursor";this.zoomed=false;
this.inside=false;this.dx=0;
this.dy=0;this.rotate=false;
this.zoomable=true;this.pan=false;
this.animate=true;this.categoryBalloonDateFormat="MMM DD, YYYY";
this.valueBalloonsEnabled=true;
this.categoryBalloonEnabled=true;
this.rolledOver=false;
this.cursorPosition="middle";
this.skipZoomDispatch=false;
this.bulletsEnabled=false;
this.bulletSize=8},draw:function(){this.destroy();
var c=this;this.container=this.chart.container;
this.set=this.container.set();
var a=new AmCharts.AmBalloon();
a.cornerRadius=0;a.borderWidth=1;
a.borderAlpha=0;this.categoryBalloon=a;
this.categoryBalloon.chart=this.chart;
this.data=this.chart.chartData;
this.dx=this.chart.dx;
this.dy=this.chart.dy;
this.rotate=this.chart.rotate;
this.categoryAxis=this.chart.categoryAxis;
this.allBullets=this.container.set();
this.interval=setInterval(function(){c.detectMovement.call(c)
},20);var b=this.categoryBalloonColor;
if(b==undefined){b=this.cursorColor
}this.categoryBalloon.fillColor=b;
this.categoryBalloon.fillAlpha=this.categoryBalloonAlpha;
this.categoryBalloon.borderColor=b;
this.categoryBalloon.color=this.color;
if(this.rotate){this.categoryBalloon.pointerOrientation="horizontal"
}if(this.type=="cursor"){this.createCursor()
}else{this.createCrosshair()
}},updateData:function(){this.data=this.chart.chartData;
if(this.data.length>0){if(this.data){this.firstTime=this.data[0].time;
this.lastTime=this.data[this.data.length-1].time
}}},createCursor:function(){var a=this.cursorAlpha;
this.categoryBalloonPosition=this.categoryAxis.position;
this.inside=this.categoryAxis.inside;
this.axisThickness=this.categoryAxis.axisThickness;
var c;var d;if(this.rotate){c=[0,this.width,this.width+this.dx];
d=[0,0,this.dy]}else{c=[this.dx,0,0];
d=[this.dy,0,this.height]
}this.line=AmCharts.line(this.container,c,d,this.cursorColor,a,1);
this.line.translate(this.x+","+this.y);
this.set.push(this.line);
var b=this.categoryAxis.tickLength;
this.categoryBalloon.pointerWidth=b;
if(this.rotate){if(this.inside){this.categoryBalloon.pointerWidth=0
}if(this.categoryBalloonPosition=="right"){if(this.inside){this.categoryBalloon.setBounds(this.x,this.y+this.dy,this.x+this.width+this.dx,this.y+this.height+this.dy)
}else{this.categoryBalloon.setBounds(this.x+this.width+this.dx+this.axisThickness,this.y+this.dy,this.x+this.width+1000,this.y+this.height+this.dy)
}}else{if(this.inside){this.categoryBalloon.setBounds(this.x,this.y,this.width+this.x,this.height+this.y)
}else{this.categoryBalloon.setBounds(-1000,-1000,this.x-b-this.axisThickness,this.y+this.height+15)
}}}else{this.categoryBalloon.maxWidth=this.width;
if(this.categoryAxis.parseDates){b=0;
this.categoryBalloon.pointerWidth=0
}if(this.categoryBalloonPosition=="top"){if(this.inside){this.categoryBalloon.setBounds(this.x+this.dx,this.y+this.dy,this.width+this.dx+this.x,this.height+this.y)
}else{this.categoryBalloon.setBounds(this.x+this.dx,-1000,this.width+this.dx+this.x,this.y+this.dy-b-this.axisThickness)
}}else{if(this.inside){this.categoryBalloon.setBounds(this.x,this.y,this.width+this.x,this.height+this.y-b)
}else{this.categoryBalloon.setBounds(this.x,this.y+this.height+b+this.axisThickness-1,this.x+this.width,this.y+this.height+b+this.axisThickness)
}}}this.hideCursor()},createCrosshair:function(){},detectMovement:function(){if(this.chart.mouseX>this.x&&this.chart.mouseX<this.x+this.width&&this.chart.mouseY>this.y&&this.chart.mouseY<this.height+this.y){if(this.pan){if(!this.rolledOver){this.chart.setMouseCursor("move")
}}this.rolledOver=true;
this.setPosition()}else{if(this.rolledOver){this.handleMouseOut();
this.rolledOver=false
}}},getMousePosition:function(){var a;
if(this.rotate){a=this.chart.mouseY;
if(a<this.y){a=this.y
}if(a>this.height+this.y){a=this.height+this.y
}}else{a=this.chart.mouseX;
if(a<this.x){a=this.x
}if(a>this.width+this.x){a=this.width+this.x
}}return a},updateCrosshair:function(){},updateSelectionHeight:function(b){if(this.selection){this.selection.remove()
}var c;var a;if(this.selectionPosY>b){c=b;
a=this.selectionPosY-b
}if(this.selectionPosY<b){c=this.selectionPosY;
a=b-this.selectionPosY
}if(this.selectionPosY==b){c=b;
a=0}if(a>0){this.selection=AmCharts.rect(this.container,this.width,a,[this.cursorColor],[this.selectionAlpha]);
this.selection.translate(this.x+","+c);
this.set.push(this.selection)
}},updateSelectionWidth:function(c){if(this.selection){this.selection.remove()
}var a;var b;if(this.selectionPosX>c){a=c;
b=this.selectionPosX-c
}if(this.selectionPosX<c){a=this.selectionPosX;
b=c-this.selectionPosX
}if(this.selectionPosX==c){a=c;
b=0}if(b>0){this.selection=AmCharts.rect(this.container,b,this.height,[this.cursorColor],[this.selectionAlpha]);
this.selection.translate(a+","+this.y);
this.set.push(this.selection)
}},arrangeBalloons:function(){this.valueBalloons.sort(this.compareY);
var c=this.valueBalloons.length;
var a=this.y+this.height;
for(var b=0;b<c;b++){var d=this.valueBalloons[b].balloon;
d.setBounds(this.x,this.y,this.x+this.width,a);
d.draw();a=d.yPos-3}this.arrangeBalloons2()
},compareY:function(d,c){if(d.yy<c.yy){return 1
}else{return -1}},arrangeBalloons2:function(){this.valueBalloons.reverse();
var f=this.valueBalloons.length;
var a;var e;for(var d=0;
d<f;d++){var g=this.valueBalloons[d].balloon;
a=g.bottom;var c=g.bottom-g.yPos;
if(d>0){if(a-c<e+3){g.setBounds(this.x,e+3,this.x+this.width,e+c+3);
g.draw()}}g.set.show();
e=g.bottomCoordinate}},showBullets:function(){this.allBullets.remove();
for(var d=0;d<this.chart.graphs.length;
d++){var g=this.chart.graphs[d];
if(g.showBalloon&&!g.hidden&&g.balloonText){var e=this.data[this.index];
var h=e.axes[g.valueAxis.id].graphs[g.id];
var f=h.y;if(!isNaN(f)){var b;
var c;var j;b=h.x;if(this.rotate){c=f;
j=b}else{c=b;j=f}var a=AmCharts.circle(this.container,this.bulletSize/2,this.chart.getBalloonColor(g,h),g.cursorBulletAlpha);
a.translate(c+","+j);
this.allBullets.push(a);
this.set.push(a)}}}},destroy:function(){clearInterval(this.interval);
if(this.categoryBalloon){this.categoryBalloon.destroy()
}this.destroyValueBalloons();
AmCharts.removeSet(this.set)
},destroyValueBalloons:function(){if(this.valueBalloons){for(var a=0;
a<this.valueBalloons.length;
a++){this.valueBalloons[a].balloon.destroy()
}}},zoom:function(e,a,c,b){this.destroyValueBalloons();
this.zooming=false;if(this.rotate){currentMouse=this.chart.mouseY;
this.selectionPosY=currentMouse
}else{currentMouse=this.chart.mouseX;
this.selectionPosX=currentMouse
}this.start=e;this.end=a;
this.startTime=c;this.endTime=b;
this.zoomed=true;if(this.categoryAxis.parseDates&&!this.categoryAxis.equalSpacing){var d=this.endTime-this.startTime+this.categoryAxis.minDuration();
if(this.rotate){this.stepWidth=this.height/d
}else{this.stepWidth=this.width/d
}}else{if(this.rotate){this.stepWidth=this.height/(this.end-this.start)
}else{this.stepWidth=this.width/(this.end-this.start)
}}this.setPosition();
this.hideCursor()},hideCursor:function(a){this.set.hide();
this.categoryBalloon.hide();
this.destroyValueBalloons();
this.allBullets.remove();
this.previousIndex=NaN;
if(a){}},setPosition:function(a,c){if(c==undefined){c=true
}if(this.type=="cursor"){if(this.data.length>0){if(!a){a=this.getMousePosition()
}if(a!=this.previousMousePosition||this.zoomed==true){if(!isNaN(a)){var b=this.categoryAxis.xToIndex(a);
if(b!=this.previousIndex||this.zoomed||this.cursorPosition=="mouse"){this.updateCursor(b,c);
this.zoomed=false}}}this.previousMousePosition=a
}}else{this.updateCrosshair()
}},updateCursor:function(f,x){if(x==undefined){x=true
}this.index=f;var t=this.data[this.index];
var e=t.x[this.categoryAxis.id];
if(this.panning){var u;
if(this.rotate){u=this.panClickPos-this.chart.mouseY
}else{u=this.panClickPos-this.chart.mouseX
}var p=u/this.stepWidth;
if(!this.categoryAxis.parseDates||this.categoryAxis.equalSpacing){p=Math.round(p)
}if(p!=0){if(this.categoryAxis.parseDates&&!this.categoryAxis.equalSpacing){if(this.panClickEndTime+p>this.lastTime){p=this.lastTime-this.panClickEndTime
}if(this.panClickStartTime+p<this.firstTime){p=this.firstTime-this.panClickStartTime
}var a={};a.type="zoomed";
a.start=this.panClickStartTime+p;
a.end=this.panClickEndTime+p;
this.fire("zoomed",a)
}else{if(this.panClickEnd+p>=this.data.length||this.panClickStart+p<0){}else{var a={};
a.type="zoomed";a.start=this.panClickStart+p;
a.end=this.panClickEnd+p;
this.fire("zoomed",a)
}}}}else{if(this.cursorPosition=="start"){e-=this.categoryAxis.cellWidth/2
}if(this.cursorPosition=="mouse"){if(this.rotate){e=this.chart.mouseY-2
}else{e=this.chart.mouseX-2
}}if(this.rotate){if(e<this.y){if(this.zooming){e=this.y
}else{this.hideCursor();
return}}if(e>this.height+1+this.y){if(this.zooming){e=this.height+1+this.y
}else{this.hideCursor();
return}}}else{if(e<this.x){if(this.zooming){e=this.x
}else{this.hideCursor();
return}}if(e>this.width+this.x){if(this.zooming){e=this.width+this.x
}else{this.hideCursor();
return}}}if(this.cursorAlpha>0){var b=this.line.getBBox();
if(this.rotate){this.line.translate(0+","+Math.round((e-b.y+this.dy)))
}else{this.line.translate(Math.round((e-b.x))+","+0)
}this.line.show()}if(this.rotate){this.linePos=e+this.dy
}else{this.linePos=e}if(this.zooming){if(this.rotate){this.updateSelectionHeight(e)
}else{this.updateSelectionWidth(e)
}}var g=true;if(this.chart.touchEventsEnabled&&this.zooming){g=false
}if(this.categoryBalloonEnabled&&g){t=this.data[this.index];
if(this.rotate){if(this.inside){if(this.categoryBalloonPosition=="right"){this.categoryBalloon.setBounds(this.x,this.y+this.dy,this.x+this.width+this.dx,this.x+e+this.dy)
}else{this.categoryBalloon.setBounds(this.x,this.y+this.dy,this.x+this.width+this.dx,this.x+e)
}}var l=this.x+this.dx;
var k=this.y+this.dy;
if(this.categoryBalloonPosition=="right"){if(this.inside){this.categoryBalloon.setPosition(this.x+this.width+this.dx,e+this.dy)
}else{this.categoryBalloon.setPosition(this.x+this.width+this.dx+this.axisThickness,e+this.dy)
}}else{if(this.inside){this.categoryBalloon.setPosition(this.x,e)
}else{this.categoryBalloon.setPosition(this.x-this.axisThickness,e)
}}}else{if(this.categoryBalloonPosition=="top"){if(this.inside){this.categoryBalloon.setPosition(e+this.dx,this.y+this.dy)
}else{this.categoryBalloon.setPosition(e+this.dx,this.y+this.dy-this.axisThickness+1)
}}else{if(this.inside){this.categoryBalloon.setPosition(e,this.y+this.height)
}else{this.categoryBalloon.setPosition(e,this.y+this.height+this.axisThickness-1)
}}}if(this.categoryAxis.parseDates){var c=AmCharts.formatDate(t.category,this.categoryBalloonDateFormat);
if(c.indexOf("fff")!=-1){c=AmCharts.formatMilliseconds(c,t.category)
}this.categoryBalloon.showBalloon(c)
}else{this.categoryBalloon.showBalloon(t.category)
}}else{this.categoryBalloon.hide()
}if(this.chart.graphs&&this.bulletsEnabled){this.showBullets()
}this.destroyValueBalloons();
if(this.chart.graphs&&this.valueBalloonsEnabled&&g&&this.chart.balloon.enabled){this.valueBalloons=[];
for(var q=0;q<this.chart.graphs.length;
q++){var d=this.chart.graphs[q];
if(d.showBalloon&&!d.hidden&&d.balloonText){t=this.data[this.index];
var r=t.axes[d.valueAxis.id].graphs[d.id];
var n=r.y;if(!isNaN(n)){var o;
var m;var s;o=r.x;var j=true;
if(this.rotate){m=n;s=o;
if(s<this.y||s>this.y+this.height){j=false
}}else{m=o;s=n;if(m<this.x||m>this.x+this.width){j=false
}}if(j){var v=this.chart.getBalloonColor(d,r);
var h=new AmCharts.AmBalloon();
h.chart=this.chart;this.copyBalloonProperties(h);
h.setBounds(this.x,this.y,this.x+this.width,this.y+this.height);
h.pointerOrientation="horizontal";
h.changeColor(v);if(d.balloonAlpha!=undefined){h.fillAlpha=d.balloonAlpha
}if(d.balloonTextColor!=undefined){h.color=d.balloonTextColor
}h.setPosition(m,s);balloonText=this.chart.formatString(d.balloonText,r);
if(balloonText!=""){h.showBalloon(balloonText)
}if(!this.rotate){h.set.hide()
}this.valueBalloons.push({yy:n,balloon:h})
}}}}if(!this.rotate){this.arrangeBalloons()
}}if(x){var y="changed";
var a={type:y};a.index=this.index;
a.zooming=this.zooming;
if(this.rotate){a.position=this.chart.mouseY
}else{a.position=this.chart.mouseX
}this.fire(y,a);this.skipZoomDispatch=false
}else{this.skipZoomDispatch=true
}this.previousIndex=this.index
}if(!this.chart.mouseIsOver&&!this.zooming&&!this.panning){this.hideCursor()
}},copyBalloonProperties:function(c){var d=this.chart.balloon;
var b=["fillColor","fillAlpha","borderThickness","borderColor","borderAlpha","cornerRadius","maximumWidth","horizontalPadding","verticalPadding","pointerWidth","color","textShadowColor","adjustBorderColor"];
for(var a=0;a<b.length;
a++){c[b[a]]=d[b[a]]}},isZooming:function(a){if(a&&a!=this.zooming){this.handleMouseDown("fake")
}if(!a&&a!=this.zooming){this.handleMouseUp()
}},handleMouseOut:function(){if(this.zooming){this.setPosition()
}else{this.index=undefined;
var a={};a.type="changed";
a.index=undefined;this.fire("changed",a);
this.hideCursor()}},handleReleaseOutside:function(){this.handleMouseUp()
},handleMouseUp:function(){if(this.pan){this.rolledOver=false
}else{if(this.zoomable){if(this.zooming){if(this.selection){this.selection.remove()
}var c;if(this.type=="cursor"){var b;
if(this.rotate){b=this.chart.mouseY;
this.selectionPosY=b}else{b=this.chart.mouseX;
this.selectionPosX=b}if(Math.abs(b-this.initialMouse)<2&&this.fromIndex==this.index){}else{c={type:"zoomed"};
if(this.index<this.fromIndex){c.end=this.fromIndex;
c.start=this.index}else{c.end=this.index;
c.start=this.fromIndex
}if(this.categoryAxis.parseDates&&!this.categoryAxis.equalSpacing){c.start=this.data[c.start].time;
c.end=this.data[c.end].time
}this.allBullets.remove();
if(!this.skipZoomDispatch){this.fire("zoomed",c)
}}}else{var a=this.chart.mouseY;
var d=this.chart.mouseX;
if(Math.abs(d-this.initialMouseX)<3&&Math.abs(a-this.initialMouseY)<3){}else{c={type:"zoomed"};
c.selectionHeight=this.selection.height;
c.selectionWidth=this.selection.width;
c.selectionY=this.selection.y;
c.selectionX=this.selection.x;
if(!this.skipZoomDispatch){this.fire("zoomed",c)
}}}}}}this.skipZoomDispatch=false;
this.zooming=false;this.panning=false
},handleMouseDown:function(a){if(this.zoomable||this.pan){if((this.chart.mouseX>this.x&&this.chart.mouseX<this.x+this.width&&this.chart.mouseY>this.y&&this.chart.mouseY<this.height+this.y)||a=="fake"){this.setPosition();
if(this.pan){this.zoomable=false;
this.chart.setMouseCursor("move");
this.panning=true;this.hideCursor(true);
if(this.rotate){this.panClickPos=this.chart.mouseY
}else{this.panClickPos=this.chart.mouseX
}this.panClickStart=this.start;
this.panClickEnd=this.end;
this.panClickStartTime=this.startTime;
this.panClickEndTime=this.endTime
}if(this.zoomable){if(this.type=="cursor"){this.fromIndex=this.index;
if(this.rotate){this.initialMouse=this.chart.mouseY;
this.selectionPosY=this.linePos
}else{this.initialMouse=this.chart.mouseX;
this.selectionPosX=this.linePos
}}else{}this.zooming=true
}}}}});AmCharts.SimpleChartScrollbar=AmCharts.Class({construct:function(){this.createEvents("zoomed");
this.backgroundColor="#D4D4D4";
this.backgroundAlpha=1;
this.selectedBackgroundColor="#EFEFEF";
this.selectedBackgroundAlpha=1;
this.scrollDuration=2;
this.resizeEnabled=true;
this.hideResizeGrips=true;
this.scrollbarHeight=20;
this.updateOnReleaseOnly=false;
this.dragIconWidth=11;
this.dragIconHeight=18
},draw:function(){if(this.chart.touchEventsEnabled){this.updateOnReleaseOnly=true
}var c=this;this.destroy();
this.interval=setInterval(function(){c.updateScrollbar.call(c)
},20);this.container=this.chart.container;
this.set=this.container.set();
this.data=this.chart.chartData;
this.dx=this.chart.dx;
this.dy=this.chart.dy;
this.rotate=this.chart.rotate;
this.categoryAxis=this.chart.categoryAxis;
if(this.rotate){this.width=this.scrollbarHeight;
this.height=this.chart.plotAreaHeight
}else{this.height=this.scrollbarHeight;
this.width=this.chart.plotAreaWidth
}if(this.height&&this.width){var a=AmCharts.rect(this.container,this.width,this.height,[this.backgroundColor],[this.backgroundAlpha]);
this.set.push(a);if(this.chart.touchEventsEnabled){a.touchend(function(){c.handleBackgroundClick()
})}a.click(function(){c.handleBackgroundClick()
}).mouseover(function(){c.handleMouseOver()
}).mouseout(function(){c.handleMouseOut()
});this.selectedBG=AmCharts.rect(this.container,this.width,this.height,[this.selectedBackgroundColor],[this.selectedBackgroundAlpha]);
this.set.push(this.selectedBG);
this.dragger=AmCharts.rect(this.container,this.width,this.height,["#0000CC"],[0]);
this.set.push(this.dragger);
if(this.chart.touchEventsEnabled){this.dragger.touchstart(function(d){c.handleDragStart(d)
}).touchend(function(){c.handleDragStop()
})}this.dragger.mousedown(function(d){c.handleDragStart(d)
}).mouseup(function(){c.handleDragStop()
}).mouseover(function(){c.handleDraggerOver()
}).mouseout(function(){c.handleMouseOut()
});this.dragIconLeft=this.container.image(this.chart.pathToImages+"dragIcon.gif",0,0,this.dragIconWidth,this.dragIconHeight);
this.set.push(this.dragIconLeft);
this.dragIconRight=this.container.image(this.chart.pathToImages+"dragIcon.gif",0,0,this.dragIconWidth,this.dragIconHeight);
this.set.push(this.dragIconRight);
var b;if(this.rotate){b=Math.round(this.width/2-this.dragIconWidth/2);
this.dragIconLeft.attr("x",b);
this.dragIconRight.attr("x",b);
this.dragIconRight.attr("rotation",90);
this.dragIconLeft.attr("rotation",90)
}else{b=Math.round(this.height/2-this.dragIconHeight/2)+AmCharts.ddd;
this.dragIconLeft.attr("y",b);
this.dragIconRight.attr("y",b)
}this.iconPosition=b;
this.dragIconLeft.mousedown(function(){c.handleLeftIconDragStart()
}).mouseup(function(){c.handleLeftIconDragStop()
}).mouseover(function(){c.handleIconRollOver()
}).mouseout(function(){c.handleIconRollOut()
});this.dragIconRight.mousedown(function(){c.handleRightIconDragStart()
}).mouseup(function(){c.handleRightIconDragStop()
}).mouseover(function(){c.handleIconRollOver()
}).mouseout(function(){c.handleIconRollOut()
});if(this.data.length>0){this.set.show()
}else{this.set.hide()
}if(this.hideResizeGrips){this.dragIconLeft.hide();
this.dragIconRight.hide()
}}this.set.translate(this.x+","+this.y)
},updateScrollbarSize:function(b,a){if(this.rotate){this.clipX=this.x;
this.clipY=b;this.clipW=this.width;
this.clipH=a-b;var c=a-b;
this.dragger.attr("height",c);
this.dragger.attr("y",this.clipY)
}else{this.clipX=b;this.clipY=this.y;
this.clipW=a-b;this.clipH=this.height;
var c=a-b;this.dragger.attr("width",c);
this.dragger.attr("x",this.clipX)
}this.clipRect=this.clipX+","+this.clipY+","+this.clipW+","+this.clipH;
this.selectedBG.attr({"clip-rect":this.clipRect});
this.updateDragIconPositions();
this.maskGraphs()},updateScrollbar:function(){var h;
var d=false;var e;var f;
var g=this.dragger.getBBox();
if(this.dragging){if(this.rotate){var j=this.initialDragCoordinate+(this.chart.mouseY-this.initialMouseCoordinate);
if(j<this.y){j=this.y
}var c=this.y+this.height-g.height;
if(j>c){j=c}this.dragger.attr({y:j})
}else{var a=this.initialDragCoordinate+(this.chart.mouseX-this.initialMouseCoordinate);
if(a<this.x){a=this.x
}var b=this.x+this.width-g.width;
if(a>b){a=b}this.dragger.attr({x:a})
}}if(this.resizingRight){if(this.rotate){h=this.chart.mouseY-g.y;
if(h+g.y>this.height+this.y){h=this.height-g.y+this.y
}if(h<0){this.resizingRight=false;
this.resizingLeft=true;
d=true}else{if(h==0){h=0.1
}this.dragger.attr("height",h)
}}else{h=this.chart.mouseX-g.x;
if(h+g.x>this.width+this.x){h=this.width-g.x+this.x
}if(h<0){this.resizingRight=false;
this.resizingLeft=true;
d=true}else{if(h==0){h=0.1
}this.dragger.attr("width",h)
}}}if(this.resizingLeft){if(this.rotate){e=g.y;
f=this.chart.mouseY;if(f<this.y){f=this.y
}if(f>this.height+this.y){f=this.height+this.y
}if(d==true){h=e-f}else{h=g.height+e-f
}if(h<0){this.resizingRight=true;
this.resizingLeft=false;
this.dragger.attr("y",e+g.height)
}else{if(h==0){h=0.1}this.dragger.attr("y",f);
this.dragger.attr("height",h)
}}else{e=g.x;f=this.chart.mouseX;
if(f<this.x){f=this.x
}if(f>this.width+this.x){f=this.width+this.x
}if(d==true){h=e-f}else{h=g.width+e-f
}if(h<0){this.resizingRight=true;
this.resizingLeft=false;
this.dragger.attr("x",e+g.width)
}else{if(h==0){h=0.1}this.dragger.attr("x",f);
this.dragger.attr("width",h)
}}}g=this.dragger.getBBox();
if(this.clipX!=g.x||this.clipY!=g.y||this.clipW!=g.width||this.clipH!=g.height){this.clipX=g.x;
this.clipY=g.y;this.clipW=g.width;
this.clipH=g.height;this.clipRect=this.clipX+","+this.clipY+","+this.clipW+","+this.clipH;
this.selectedBG.attr({"clip-rect":this.clipRect});
this.updateDragIconPositions();
if(!this.updateOnReleaseOnly){this.dispatchScrollbarEvent()
}this.maskGraphs()}},maskGraphs:function(){},dispatchScrollbarEvent:function(){var g=this.dragger.getBBox();
var a=g.x-this.x;var h=g.y-this.y;
var e=g.width;var c=g.height;
var j;var d;var f;if(this.rotate){j=h;
d=c;f=this.height/c}else{j=a;
d=e;f=this.width/e}var b={type:"zoomed"};
b.position=j;b.multiplyer=f;
this.fire("zoomed",b)
},updateDragIconPositions:function(){var b=this.dragger.getBBox();
var a=b.x;var c=b.y;if(this.rotate){this.dragIconLeft.attr("y",Math.round(c-this.dragIconHeight/2));
this.dragIconRight.attr("y",Math.round(c+b.height-this.dragIconHeight/2))
}else{this.dragIconLeft.attr("x",Math.round(a-this.dragIconWidth/2));
this.dragIconRight.attr("x",Math.round(a-this.dragIconWidth/2+b.width))
}},showDragIcons:function(){if(this.resizeEnabled){this.dragIconLeft.show();
this.dragIconRight.show()
}},hideDragIcons:function(){if(!this.resizingLeft&&!this.resizingRight&&!this.dragging){if(this.hideResizeGrips){this.dragIconLeft.hide();
this.dragIconRight.hide()
}this.removeCursors()
}},removeCursors:function(){this.chart.setMouseCursor("auto")
},relativeZoom:function(b,a){this.multiplyer=b;
this.position=a;var d=a;
var c;if(this.rotate){c=d+this.height/b
}else{c=d+this.width/b
}this.updateScrollbarSize(d,c)
},destroy:function(){clearInterval(this.interval);
AmCharts.removeSet(this.set)
},handleDragStart:function(a){if(a){a.preventDefault()
}this.removeCursors();
this.dragging=true;var b=this.dragger.getBBox();
if(this.rotate){this.initialDragCoordinate=b.y;
this.initialMouseCoordinate=this.chart.mouseY
}else{this.initialDragCoordinate=b.x;
this.initialMouseCoordinate=this.chart.mouseX
}},handleDragStop:function(a){if(this.updateOnReleaseOnly){this.updateScrollbar();
this.skipEvent=false;
this.dispatchScrollbarEvent()
}this.dragging=false;
if(this.mouseIsOver){this.removeCursors()
}this.updateScrollbar()
},handleDraggerOver:function(a){this.handleMouseOver()
},handleLeftIconDragStart:function(a){this.resizingLeft=true
},handleLeftIconDragStop:function(a){this.resizingLeft=false;
if(!this.mouseIsOver){this.removeCursors()
}},handleRightIconDragStart:function(a){this.resizingRight=true
},handleRightIconDragStop:function(a){this.resizingRight=false;
if(!this.mouseIsOver){this.removeCursors()
}},handleIconRollOut:function(){this.removeCursors()
},handleIconRollOver:function(a){if(this.rotate){this.chart.setMouseCursor("n-resize")
}else{this.chart.setMouseCursor("e-resize")
}this.handleMouseOver()
},handleBackgroundClick:function(b){if(!this.resizingRight&&!this.resizingLeft){this.zooming=true;
var c;var f;var a;var d=this.scrollDuration;
var e=this.dragger.getBBox();
if(this.rotate){c="y";
f=e.y;a=this.chart.mouseY-e.height/2;
a=AmCharts.fitToBounds(a,this.y,this.y+this.height-e.height)
}else{c="x";f=e.x;a=this.chart.mouseX-e.width/2;
a=AmCharts.fitToBounds(a,this.x,this.x+this.width-e.width)
}if(this.updateOnReleaseOnly){this.skipEvent=false;
this.dragger.attr(c,a);
this.dispatchScrollbarEvent()
}else{if(this.rotate){this.dragger.animate({translation:0+","+(a-e.y)},d*1000,">")
}else{this.dragger.animate({translation:(a-e.x)+","+0},d*1000,">")
}}}},handleReleaseOutside:function(){if(this.set){if(this.resizingLeft||this.resizingRight||this.dragging){if(this.updateOnReleaseOnly){this.updateScrollbar();
this.skipEvent=false;
this.dispatchScrollbarEvent()
}}this.resizingLeft=false;
this.resizingRight=false;
this.dragging=false;this.mouseIsOver=false;
this.removeCursors();
if(this.hideResizeGrips){this.dragIconLeft.hide();
this.dragIconRight.hide()
}this.updateScrollbar()
}},handleMouseOver:function(a){this.mouseIsOver=true;
this.showDragIcons()},handleMouseOut:function(a){this.mouseIsOver=false;
this.hideDragIcons()}});
AmCharts.ChartScrollbar=AmCharts.Class({inherits:AmCharts.SimpleChartScrollbar,construct:function(){AmCharts.ChartScrollbar.base.construct.call(this);
this.graphLineColor="#000000";
this.graphLineAlpha=0;
this.graphFillColor="#000000";
this.graphFillAlpha=0.1;
this.selectedGraphLineColor="#000000";
this.selectedGraphLineAlpha=0;
this.selectedGraphFillColor="#000000";
this.selectedGraphFillAlpha=0.5;
this.gridCount=0;this.gridColor="#FFFFFF";
this.gridAlpha=0.7;this.autoGridCount=false;
this.skipEvent=false;
this.scrollbarCreated=false
},init:function(){if(!this.cAxis){this.cAxis=new AmCharts.CategoryAxis()
}this.cAxis.chart=this.chart;
this.cAxis.id="scrollbar";
this.cAxis.axisItemRenderer=AmCharts.RectangularAxisItemRenderer;
this.cAxis.axisRenderer=AmCharts.RectangularAxisRenderer;
this.cAxis.guideFillRenderer=AmCharts.RectangularAxisGuideFillRenderer;
this.cAxis.inside=true;
this.cAxis.tickLength=0;
this.cAxis.axisAlpha=0;
if(this.graph){if(!this.vAxis){this.vAxis=new AmCharts.ValueAxis();
this.vAxis.visible=false;
this.vAxis.scrollbar=true;
this.vAxis.axisItemRenderer=AmCharts.RectangularAxisItemRenderer;
this.vAxis.axisRenderer=AmCharts.RectangularAxisRenderer;
this.vAxis.guideFillRenderer=AmCharts.RectangularAxisGuideFillRenderer;
this.vAxis.chart=this.chart
}if(!this.selectedGraph){this.selectedGraph=new AmCharts.AmGraph();
this.selectedGraph.scrollbar=true
}if(!this.unselectedGraph){this.unselectedGraph=new AmCharts.AmGraph();
this.unselectedGraph.scrollbar=true
}}this.scrollbarCreated=true
},draw:function(){AmCharts.ChartScrollbar.base.draw.call(this);
if(!this.scrollbarCreated){this.init()
}var a=this;if(this.rotate){this.cAxis.orientation="vertical"
}else{this.cAxis.orientation="horizontal"
}this.cAxis.parseDates=this.chart.categoryAxis.parseDates;
this.cAxis.equalSpacing=this.chart.categoryAxis.equalSpacing;
this.cAxis.minPeriod=this.chart.categoryAxis.minPeriod;
this.cAxis.startOnAxis=this.chart.categoryAxis.startOnAxis;
this.cAxis.x=this.x;this.cAxis.y=this.y;
this.cAxis.visibleAxisWidth=this.width;
this.cAxis.visibleAxisHeight=this.height;
this.cAxis.visibleAxisX=this.x;
this.cAxis.visibleAxisY=this.y;
this.cAxis.width=this.width;
this.cAxis.height=this.height;
this.cAxis.gridCount=this.gridCount;
this.cAxis.gridColor=this.gridColor;
this.cAxis.gridAlpha=this.gridAlpha;
this.cAxis.autoGridCount=this.autoGridCount;
if(this.cAxis.parseDates&&!this.cAxis.equalSpacing){this.firstTime=this.data[0].time;
this.lastTime=this.data[this.data.length-1].time;
this.cAxis.timeZoom(this.firstTime,this.lastTime)
}this.cAxis.zoom(0,this.data.length-1);
if(this.graph){var h=this.graph;
this.vAxis.id=h.valueAxis.id;
this.vAxis.rotate=this.rotate;
if(!this.rotate){this.vAxis.orientation="vertical"
}else{this.vAxis.orientation="horizontal"
}this.vAxis.x=this.x;
this.vAxis.y=this.y;this.vAxis.width=this.width;
this.vAxis.height=this.height;
this.vAxis.visibleAxisX=this.x;
this.vAxis.visibleAxisY=this.y;
this.vAxis.visibleAxisWidth=this.width;
this.vAxis.visibleAxisHeight=this.height;
this.vAxis.dataProvider=this.data;
this.vAxis.reversed=h.valueAxis.reversed;
this.vAxis.logarithmic=h.valueAxis.logarithmic;
var d=Infinity;var j=-Infinity;
for(var e=0;e<this.data.length;
e++){var m=this.data[e].axes[h.valueAxis.id].graphs[h.id].values;
for(var c in m){if(c!="percents"&&c!="total"){var b=m[c];
if(b<d){d=b}if(b>j){j=b
}}}}if(d!=Infinity){this.vAxis.min=d
}if(j!=-Infinity){this.vAxis.max=j+(j-d)*0.1
}this.vAxis.zoom(0,this.data.length-1);
var l=this.unselectedGraph;
l.id=h.id;l.rotate=this.rotate;
l.chart=this.chart;l.chartType=this.chart.chartType;
l.data=this.chart.chartData;
l.valueAxis=this.vAxis;
l.chart=h.chart;l.categoryAxis=this.cAxis;
l.valueField=h.valueField;
l.openField=h.openField;
l.closeField=h.closeField;
l.highField=h.highField;
l.lowField=h.lowField;
l.lineAlpha=this.graphLineAlpha;
l.lineColor=this.graphLineColor;
l.fillAlphas=[this.graphFillAlpha];
l.fillColors=[this.graphFillColor];
l.connect=h.connect;l.hidden=h.hidden;
l.width=this.width;l.height=this.height;
l.x=this.x;l.y=this.y;
var f=this.selectedGraph;
f.id=h.id;f.rotate=this.rotate;
f.chart=this.chart;f.chartType=this.chart.chartType;
f.data=this.chart.chartData;
f.valueAxis=this.vAxis;
f.chart=h.chart;f.categoryAxis=this.cAxis;
f.valueField=h.valueField;
f.openField=h.openField;
f.closeField=h.closeField;
f.highField=h.highField;
f.lowField=h.lowField;
f.lineAlpha=this.selectedGraphLineAlpha;
f.lineColor=this.selectedGraphLineColor;
f.fillAlphas=[this.selectedGraphFillAlpha];
f.fillColors=[this.selectedGraphFillColor];
f.connect=h.connect;f.hidden=h.hidden;
f.width=this.width;f.height=this.height;
f.x=this.x;f.y=this.y;
if(this.graphType){f.type=this.graphType;
l.type=this.graphType
}else{l.type=h.type;f.type=h.type
}l.zoom(0,this.data.length-1);
f.zoom(0,this.data.length-1);
f.set.insertBefore(this.dragger);
l.set.insertBefore(this.dragger);
f.set.click(function(){a.handleBackgroundClick()
}).mouseover(function(){a.handleMouseOver()
}).mouseout(function(){a.handleMouseOut()
});l.set.click(function(){a.handleBackgroundClick()
}).mouseover(function(){a.handleMouseOver()
}).mouseout(function(){a.handleMouseOut()
})}},timeZoom:function(b,a){this.startTime=b;
this.endTime=a;this.timeDifference=a-b;
this.skipEvent=true;this.zoomScrollbar()
},zoom:function(b,a){this.start=b;
this.end=a;this.skipEvent=true;
this.zoomScrollbar()},dispatchScrollbarEvent:function(){if(this.skipEvent){this.skipEvent=false
}else{var o;var h;var l=this.dragger.getBBox();
var a=l.x;var n=l.y;var j=l.width;
var f=l.height;if(this.rotate){o=n;
h=f}else{o=a;h=j}var b;
if(this.cAxis.parseDates&&!this.cAxis.equalSpacing){if(this.rotate){o-=this.y
}else{o-=this.x}var d=this.cAxis.minDuration();
var e=Math.round(o/this.stepWidth)+this.firstTime;
var k;if(!this.dragging){k=Math.round((o+h)/this.stepWidth)+this.firstTime-d
}else{k=e+this.timeDifference
}if(e>k){e=k}if(e!=this.startTime||k!=this.endTime){this.startTime=e;
this.endTime=k;b={type:"zoomed"};
b.start=this.startTime;
b.end=this.endTime;b.startDate=new Date(this.startTime);
b.endDate=new Date(this.endTime);
this.fire("zoomed",b)
}}else{if(!this.cAxis.startOnAxis){var m=this.stepWidth/2;
o+=m}h-=this.stepWidth/2;
var c=this.cAxis.xToIndex(o);
var g=this.cAxis.xToIndex(o+h);
if(c!=this.start||this.end!=g){if(this.cAxis.startOnAxis){if(this.resizingRight&&c==g){g++
}if(this.resizingLeft&&c==g){if(c>0){c--
}else{g=1}}}this.start=c;
if(!this.dragging){this.end=g
}else{this.end=this.start+this.difference
}b={type:"zoomed"};b.start=this.start;
b.end=this.end;if(this.cAxis.parseDates){if(this.data[this.start]){b.startDate=new Date(this.data[this.start].time)
}if(this.data[this.end]){b.endDate=new Date(this.data[this.end].time)
}}this.fire("zoomed",b)
}}}},zoomScrollbar:function(){var c;
var a;if(this.cAxis.parseDates&&!this.cAxis.equalSpacing){this.stepWidth=this.cAxis.stepWidth;
c=this.stepWidth*(this.startTime-this.firstTime);
a=this.stepWidth*(this.endTime-this.firstTime+this.cAxis.minDuration());
if(this.rotate){c+=this.y;
a+=this.y}else{c+=this.x;
a+=this.x}}else{c=this.data[this.start].x[this.cAxis.id];
a=this.data[this.end].x[this.cAxis.id];
this.stepWidth=this.cAxis.stepWidth;
if(!this.cAxis.startOnAxis){var b=this.stepWidth/2;
c-=b;a+=b}}this.updateScrollbarSize(c,a)
},maskGraphs:function(){if(this.selectedGraph){for(var a=0;
a<this.selectedGraph.set.length;
a++){this.selectedGraph.set[a].attr({"clip-rect":this.clipRect})
}}},handleDragStart:function(){AmCharts.ChartScrollbar.base.handleDragStart.call(this);
this.difference=this.end-this.start;
this.timeDifference=this.endTime-this.startTime;
if(this.timeDifference<0){this.timeDifference=0
}},handleBackgroundClick:function(){AmCharts.ChartScrollbar.base.handleBackgroundClick.call(this);
if(!this.dragging){this.difference=this.end-this.start;
this.timeDifference=this.endTime-this.startTime;
if(this.timeDifference<0){this.timeDifference=0
}}}});AmCharts.circle=function(b,a,e,d,c,f,g,j){if(c==undefined||c==0){c=1
}if(f==undefined){f="#000000"
}if(g==undefined){g=0
}if(j){e="r"+e+"-"+AmCharts.adjustLuminosity(e,-0.6)
}var h={fill:e,stroke:f,"fill-opacity":d,"stroke-width":c,"stroke-opacity":g};
return b.circle(0,0,a).attr(h)
};AmCharts.text=function(d,c,f,e,b){var a=d.text(c,f,e).attr(b);
if(!AmCharts.isNN){a.translate(0+","+3)
}if(window.opera){a.translate(0+","+(-2))
}return a};AmCharts.polygon=function(c,n,k,a,b,d,e,f,m){if(typeof(b)=="object"){b=b[0]
}if(d==undefined||d==0){d=1
}if(e==undefined){e="#000000"
}if(f==undefined){f=0
}if(m==undefined){m=270
}var l=AmCharts.generateGradient(a,m);
var j={fill:String(l),stroke:e,"fill-opacity":b,"stroke-width":d,"stroke-opacity":f};
var h=AmCharts.ddd;var g=["M",Math.round(n[0])+h,Math.round(k[0])+h];
for(i=1;i<n.length;i++){g.push("L");
g.push(Math.round(n[i])+h);
g.push(Math.round(k[i])+h)
}g.push("Z");return c.path(g).attr(j)
};AmCharts.rect=function(c,p,j,a,b,d,f,g,e,o){if(d==undefined||d==0){d=1
}if(f==undefined){f="#000000"
}if(g==undefined){g=0
}if(e==undefined){e=0
}if(o==undefined){o=270
}if(typeof(b)=="object"){b=b[0]
}if(b==undefined){b=0
}p=Math.round(p);j=Math.round(j);
var n=0;var l=0;if(p<0){p=Math.abs(p);
n=-p}if(j<0){j=Math.abs(j);
l=-j}n+=AmCharts.ddd;
l+=AmCharts.ddd;var m=AmCharts.generateGradient(a,o);
if(!m){m="#FFFFFF"}var k={fill:String(m),stroke:f,"fill-opacity":b,"stroke-width":d,"stroke-opacity":g};
return c.rect(n,l,p,j,e).attr(k)
};AmCharts.triangle=function(a,j,k,d,c,b,e,f){if(b==undefined||b==0){b=1
}if(e==undefined){e="#000000"
}if(f==undefined){f=0
}var h={fill:d,stroke:e,"fill-opacity":c,"stroke-width":b,"stroke-opacity":f};
var l=["M",-j/2,j/2,"L",0,-j/2,"L",j/2,j/2,"Z",-j/2,j/2];
var g=a.path(l).attr(h);
g.attr({rotation:k});
return g};AmCharts.line=function(a,n,l,e,d,m,b,j){var k="";
if(b==1){k=". "}if(b>1){k="- "
}var h={stroke:e,"stroke-dasharray":k,"stroke-opacity":d,"stroke-width":m};
var c="L";var g=AmCharts.ddd;
var f=["M",Math.round(n[0])+g,Math.round(l[0])+g];
for(i=1;i<n.length;i++){f.push(c);
f.push(Math.round(n[i])+g);
f.push(Math.round(l[i])+g)
}return a.path(f).attr(h)
};AmCharts.wedge=function(t,q,o,C,m,f,k,l,E,n){var H=Math.PI/180;
var B=(k/f)*l;if(m<=-359.99){m=-359.99
}var u=q+Math.cos(C/180*Math.PI)*l;
var p=o+Math.sin(-C/180*Math.PI)*B;
var F=q+Math.cos(C/180*Math.PI)*f;
var D=o+Math.sin(-C/180*Math.PI)*k;
var d=q+Math.cos((C+m)/180*Math.PI)*f;
var b=o+Math.sin((-C-m)/180*Math.PI)*k;
var v=q+Math.cos((C+m)/180*Math.PI)*l;
var s=o+Math.sin((-C-m)/180*Math.PI)*B;
hsb=AmCharts.adjustLuminosity(n.fill,-0.2);
var e=n["fill-opacity"];
var a={fill:hsb,"fill-opacity":e,stroke:hsb,"stroke-width":0.000001,"stroke-opacity":0.00001};
var z=0;var I=1;if(Math.abs(m)>180){z=1
}var A=t.set();if(E>0){if(l>0){var G=t.path(["M",u,p+E,"L",F,D+E,"A",f,k,0,z,I,d,b+E,"L",v,s+E,"A",l,B,0,z,0,u,p+E,"z"]).attr(a)
}else{var G=t.path(["M",u,p+E,"L",F,D+E,"A",f,k,0,z,I,d,b+E,"L",v,s+E,"Z"]).attr(a)
}A.push(G);var j=t.path(["M",u,p,"L",u,p+E,"L",F,D+E,"L",F,D,"L",u,p,"z"]).attr(a);
var g=t.path(["M",d,b,"L",d,b+E,"L",v,s+E,"L",v,s,"L",d,b,"z"]).attr(a);
A.push(j);A.push(g)}if(l>0){var r=t.path(["M",u,p,"L",F,D,"A",f,k,0,z,I,d,b,"L",v,s,"A",l,B,0,z,0,u,p,"Z"]).attr(n)
}else{var r=t.path(["M",u,p,"L",F,D,"A",f,k,0,z,I,d,b,"L",v,s,"Z"]).attr(n)
}A.push(r);return A};
AmCharts.adjustLuminosity=function(e,b){var d=Raphael.rgb2hsb(e);
var a=d.toString().split(",");
var c=a[2];c=Number(c.substr(0,c.length-1));
c=c+c*b;return(a[0]+","+a[1]+","+c+")")
};AmCharts.putSetToFront=function(b){for(var a=b.length-1;
a<=0;a++){b[a].toFront()
}},AmCharts.putSetToBack=function(b){for(var a=0;
a<b.length-1;a++){b[a].toBack()
}};AmCharts.AmPieChart=AmCharts.Class({inherits:AmCharts.AmChart,construct:function(){this.createEvents("rollOverSlice","rollOutSlice","clickSlice","pullOutSlice","pullInSlice");
AmCharts.AmPieChart.base.construct.call(this);
this.colors=["#FF0F00","#FF6600","#FF9E01","#FCD202","#F8FF01","#B0DE09","#04D215","#0D8ECF","#0D52D1","#2A0CD0","#8A0CCF","#CD0D74","#754DEB","#DDDDDD","#999999","#333333","#000000","#57032A","#CA9726","#990000","#4B0C25"];
this.pieAlpha=1;this.pieBaseColor;
this.pieBrightnessStep=30;
this.groupPercent=0;this.groupedTitle="Other";
this.groupedPulled=false;
this.groupedAlpha=1;this.marginLeft=0;
this.marginTop=10;this.marginBottom=10;
this.marginRight=0;this.minRadius=10;
this.hoverAlpha=1;this.depth3D=0;
this.startAngle=90;this.innerRadius=0;
this.angle=0;this.outlineColor="#FFFFFF";
this.outlineAlpha=0;this.outlineThickness=1;
this.gradient="none";
this.gradientRatio=[0,80];
this.startRadius="500%";
this.startAlpha=0;this.startDuration=1;
this.startEffect="bounce";
this.sequencedAnimation=false;
this.pullOutRadius="20%";
this.pullOutDuration=1;
this.pullOutEffect="bounce";
this.pullOutOnlyOne=false;
this.pullOnHover=false;
this.labelsEnabled=true;
this.labelRadius=30;this.labelTickColor="#000000";
this.labelTickAlpha=0.2;
this.labelText="[[title]]: [[percents]]%";
this.hideLabelsPercent=0;
this.balloonText="[[title]]: [[percents]]% ([[value]]) <br>[[description]]";
this.dataProvider;this.urlTarget="_self";
this.gestureHappening=false;
this.previousScale=1},initChart:function(){AmCharts.AmPieChart.base.initChart.call(this);
if(this.dataChanged){this.parseData();
this.dispatchDataUpdated=true;
this.dataChanged=false;
if(this.legend){this.legend.setData(this.chartData)
}}this.drawChart()},handleLegendEvent:function(b){var a=b.type;
var d=b.dataItem;if(d){var c=d.hidden;
switch(a){case"clickMarker":if(!c){this.clickSlice(d)
}break;case"clickLabel":if(!c){this.clickSlice(d)
}break;case"rollOverItem":if(!c){this.rollOverSlice(d,false)
}break;case"rollOutItem":if(!c){this.rollOutSlice(d)
}break;case"hideItem":this.hideSlice(d);
break;case"showItem":this.showSlice(d);
break}}},invalidateVisibility:function(){this.recalculatePercents();
this.drawChart();if(this.legend){this.legend.invalidateSize()
}},drawChart:function(){AmCharts.AmPieChart.base.drawChart.call(this);
var k=this;var l=AmCharts.toCoordinate(this.marginLeft,this.realWidth);
var P=AmCharts.toCoordinate(this.marginRight,this.realWidth);
var D=AmCharts.toCoordinate(this.marginTop,this.realHeight);
var A=AmCharts.toCoordinate(this.marginBottom,this.realHeight);
if(this.chartData.length>0){this.realWidth=this.updateWidth();
this.realHeight=this.updateHeight();
this.chartDataLabels=[];
this.ticks=[];var O;var N;
var b=this.chartData.length;
var G;var u=AmCharts.toNumber(this.labelRadius);
var g=this.measureMaxLabel();
if(!this.labelText||!this.labelsEnabled){g=0;
u=0}if(this.pieX==undefined){O=(this.realWidth-l-P)/2+l
}else{O=AmCharts.toCoordinate(this.pieX,this.realWidth)
}if(this.pieY==undefined){N=(this.realHeight-D-A)/2+D
}else{N=AmCharts.toCoordinate(this.pieY,this.realHeight)
}G=AmCharts.toCoordinate(this.radius,this.realWidth,this.realHeight);
this.pullOutRadiusReal=AmCharts.toCoordinate(this.pullOutRadius,G);
if(!G){var d;if(u>=0){d=this.realWidth-l-P-g*2
}else{d=this.realWidth-l-P
}var H=this.realHeight-D-A;
G=Math.min(d,H);if(H<d){G=G/(1-this.angle/90);
if(G>d){G=d}}this.pullOutRadiusReal=AmCharts.toCoordinate(this.pullOutRadius,G);
if(u>=0){G-=(u+this.pullOutRadiusReal)*1.8
}else{G-=this.pullOutRadiusReal*1.8
}G=G/2}if(G<this.minRadius){G=this.minRadius
}this.pullOutRadiusReal=AmCharts.toCoordinate(this.pullOutRadius,G);
var a=AmCharts.toCoordinate(this.innerRadius,G);
if(a>=G){a=G-1}var h=AmCharts.fitToBounds(this.startAngle,0,360);
if(this.depth3D>0){if(h>=270){h=270
}else{h=90}}var z=G-G*this.angle/90;
for(var M=0;M<b;M++){var c=this.chartData[M];
if(c.hidden!=true){var s=-c.percents*360/100;
var q=Math.cos((h+s/2)/180*Math.PI);
var p=Math.sin((-h-s/2)/180*Math.PI)*(z/G);
var r;if(c.url){r="pointer"
}else{r=""}var o="90-"+c.color;
if(this.gradient!="none"){if(this.gradient=="radial"){var n=Math.abs(h+s/2)
}else{var n=90}o=AmCharts.generateGradient(c.color,n,this.gradientRatio)
}var E={fill:c.color,gradient:o,"fill-opacity":this.startAlpha,stroke:this.outlineColor,"stroke-opacity":this.outlineAlpha,"stroke-width":this.outlineThickness,"stroke-linecap":"round",cursor:r};
var y=O;var m=N;if(this.chartCreated){E["fill-opacity"]=c.alpha
}var C=AmCharts.wedge(this.container,y,m,h,s,G,z,a,this.depth3D,E);
this.chartData[M].wedge=C;
if((h<=90&&h>=0)||(h<=360&&h>270)){AmCharts.putSetToFront(C)
}else{if((h<=270&&h>180)||(h<=180&&h>90)){AmCharts.putSetToBack(C)
}}c.ix=q;c.iy=p;c.wedge=C;
c.index=M;if(this.labelsEnabled&&this.labelText&&c.percents>=this.hideLabelsPercent){var x=h+s/2;
if(x<=0){x=x+360}var L=O+q*(G+u);
var J=N+p*(G+u);var I;
var e=0;if(u>=0){var B;
if(x<=90&&x>=0){B=0;I="start";
e=8}else{if(x<=360&&x>270){B=1;
I="start";e=8}else{if(x<=270&&x>180){B=2;
I="end";e=-8}else{if((x<=180&&x>90)){B=3;
I="end";e=-8}}}}c.labelQuarter=B
}else{I="middle"}var v=AmCharts.formatString(this.labelText,c,this.numberFormatter,this.percentFormatter);
var f=AmCharts.text(this.container,L+e*1.5,J,v,{fill:this.color,"text-anchor":I,"font-family":this.fontFamily,"font-size":this.fontSize});
var F=setTimeout(function(){k.showLabels.call(k)
},this.startDuration*1000);
this.timeOuts.push(F);
if(this.touchEventsEnabled){C.touchend(function(){handleTouchEnd(k.chartData[this.index])
});C.touchstart(function(j){handleTouchStart(k.chartData[this.index])
})}C.push(f);c.labelObject=f;
this.chartDataLabels[M]=f;
f.cornerx=L;f.cornery=J;
f.cornerx2=L+e}for(var K=0;
K<C.length;K++){C[K].index=M
}C.hover(function(){k.rollOverSlice(k.chartData[this.index],true)
},function(){k.rollOutSlice(k.chartData[this.index])
}).click(function(){k.clickSlice(k.chartData[this.index])
});this.set.push(C);if(c.alpha==0){C.hide()
}h-=c.percents*360/100;
if(h<=0){h=h+360}}}if(u>0){this.arrangeLabels()
}for(var M=0;M<this.chartDataLabels.length;
M++){if(this.chartDataLabels[M]){this.chartDataLabels[M].toFront()
}}this.pieXReal=O;this.pieYReal=N;
this.radiusReal=G;this.innerRadiusReal=a;
if(u>0){this.drawTicks()
}var k=this;if(this.chartCreated){this.pullSlices(true)
}else{var F=setTimeout(function(){k.pullSlices.call(k)
},this.startDuration*1200);
this.timeOuts.push(F)
}if(!this.chartCreated){this.startSlices()
}this.bringLabelsToFront();
this.chartCreated=true;
if(this.dispatchDataUpdated){this.dispatchDataUpdated=false;
this.dispatchDataUpdatedEvent()
}}if(this.background){this.background.toBack()
}this.drb()},drawTicks:function(){for(var d=0;
d<this.chartData.length;
d++){if(this.chartDataLabels[d]){var f=this.chartData[d];
var c=f.ix;var b=f.iy;
var h=this.chartDataLabels[d];
var j=h.cornerx;var a=h.cornerx2;
var g=h.cornery;var e=this.container.path(["M",this.pieXReal+c*this.radiusReal,this.pieYReal+b*this.radiusReal,"L",j,g,"L",a,g]).attr({stroke:this.labelTickColor,"stroke-opacity":this.labelTickAlpha,"stroke-width":1,"stroke-linecap":"round"});
f.wedge.push(e);if(!this.chartCreated){f.wedge.hide()
}this.ticks[d]=e}}},arrangeLabels:function(){var d;
var e=0;var a=0;for(var c=this.chartData.length-1;
c>=0;c--){var f=this.chartData[c];
if(f.labelQuarter==0&&!f.hidden&&this.chartDataLabels[c]){var b=f.index;
this.checkOverlapping(b,0,true,0)
}}d=NaN;for(c=0;c<this.chartData.length;
c++){f=this.chartData[c];
if(f.labelQuarter==1&&!f.hidden&&this.chartDataLabels[c]){var b=f.index;
this.checkOverlapping(b,1,false,0)
}}d=NaN;for(c=this.chartData.length-1;
c>=0;c--){f=this.chartData[c];
if(f.labelQuarter==2&&!f.hidden&&this.chartDataLabels[c]){var b=f.index;
this.checkOverlapping(b,2,true,0)
}}d=NaN;for(c=0;c<this.chartData.length;
c++){f=this.chartData[c];
if(f.labelQuarter==3&&!f.hidden&&this.chartDataLabels[c]){var b=f.index;
this.checkOverlapping(b,3,false,0)
}}},checkOverlapping:function(d,c,b,f){var a;
var e;var h;if(b==true){for(e=d+1;
e<this.chartData.length;
e++){h=this.chartData[e];
if(h.labelQuarter==c&&!h.hidden&&this.chartDataLabels[e]){if(AmCharts.hitTest(this.chartDataLabels[d].getBBox(),this.chartDataLabels[e].getBBox())==true){a=true
}}}}else{for(e=d-1;e>=0;
e--){h=this.chartData[e];
if(h.labelQuarter==c&&!h.hidden&&this.chartDataLabels[e]){if(AmCharts.hitTest(this.chartDataLabels[d].getBBox(),this.chartDataLabels[e].getBBox())==true){a=true
}}}}var g=this.chartDataLabels[d].getBBox();
this.chartDataLabels[d].cornery=g.y+=g.height/2;
if(a==true&&f<100){h=this.chartData[d];
this.chartDataLabels[d].translate(0+","+(h.iy*3));
this.checkOverlapping(d,c,b,f+1)
}},startSlices:function(){var a=this.startDuration/this.chartData.length*500;
for(var c=0;c<this.chartData.length;
c++){if(this.startDuration>0&&this.sequencedAnimation){var d=this;
var b=setTimeout(function(){d.startSequenced.call(d)
},a*c);this.timeOuts.push(b)
}else{this.startSlice(this.chartData[c])
}}},pullSlices:function(a){for(var b=0;
b<this.chartData.length;
b++){if(this.chartData[b].pulled){this.pullSlice(this.chartData[b],1,a)
}}},startSequenced:function(){for(var a=0;
a<this.chartData.length;
a++){if(!this.chartData[a].started){dItem=this.chartData[a];
this.startSlice(dItem);
break}}},startSlice:function(c){c.started=true;
var a=c.wedge;if(c.alpha>0){a.show()
}var b=AmCharts.toCoordinate(this.startRadius,this.radiusReal);
a.translate((c.ix*b)+","+(c.iy*b));
a.animate({"fill-opacity":c.alpha,translation:((-c.ix*b)+","+(-c.iy*b))},this.startDuration*1000,this.startEffect)
},showLabels:function(){for(var a=0;
a<this.chartData.length;
a++){var b=this.chartData[a];
if(b.alpha>0){if(this.chartDataLabels[a]){this.chartDataLabels[a].show()
}if(this.ticks[a]){this.ticks[a].show()
}}}},showSlice:function(a){if(isNaN(a)){a.hidden=false
}else{this.chartData[a].hidden=false
}this.hideBalloon();this.invalidateVisibility()
},hideSlice:function(a){if(isNaN(a)){a.hidden=true
}else{this.chartData[a].hidden=true
}this.hideBalloon();this.invalidateVisibility()
},rollOverSlice:function(g,c){clearTimeout(this.hoverInt);
if(this.pullOnHover){this.pullSlice(g,1)
}var b=this.innerRadiusReal+(this.radiusReal-this.innerRadiusReal)/2;
if(g.pulled){b+=this.pullOutRadiusReal
}var a=g.ix*b+this.pieXReal;
var h=g.iy*b+this.pieYReal;
var f=AmCharts.formatString(this.balloonText,g,this.numberFormatter,this.percentFormatter);
var e=AmCharts.adjustLuminosity(g.color,-0.15);
this.showBalloon(f,e,c,a,h);
var d={type:"rollOverSlice",dataItem:g};
this.fire(d.type,d)},rollOutSlice:function(b){this.hideBalloon();
var a={type:"rollOutSlice",dataItem:b};
this.fire(a.type,a)},clickSlice:function(b){this.hideBalloon();
if(b.pulled){this.pullSlice(b,-1)
}else{this.pullSlice(b,1)
}if(b.url){if(this.urlTarget=="_self"||!this.urlTarget){window.location.href=b.url
}else{window.open(b.url)
}}var a={type:"clickSlice",dataItem:b};
this.fire(a.type,a)},pullSlice:function(f,c,b){var g=f.ix;
var e=f.iy;var d=this.pullOutDuration*1000;
if(b===true){d=0}f.wedge.animate({translation:(c*g*this.pullOutRadiusReal)+","+(c*e*this.pullOutRadiusReal)},d,this.pullOutEffect);
if(c==1){f.pulled=true;
if(this.pullOutOnlyOne){this.pullInAll(f.index)
}var a={type:"pullOutSlice",dataItem:f};
this.fire(a.type,a)}else{f.pulled=false;
var a={type:"pullInSlice",dataItem:f};
this.fire(a.type,a)}},pullInAll:function(b){for(var a=0;
a<this.chartData.length;
a++){if(a!=b){if(this.chartData[a].pulled){this.pullSlice(this.chartData[a],-1)
}}}},pullOutAll:function(b){for(var a=0;
a<this.chartData.length;
a++){if(!this.chartData[a].pulled){this.pullSlice(this.chartData[a],1)
}}},parseData:function(){this.chartData=[];
var h=this.dataProvider;
if(h!=undefined){var f=h.length;
var d=0;for(var c=0;c<f;
c++){this.chartData[c]={};
this.chartData[c].value=Number(h[c][this.valueField]);
if(h[c][this.titleField]){this.chartData[c].title=h[c][this.titleField]
}else{this.chartData[c].title=""
}this.chartData[c].pulled=AmCharts.toBoolean(h[c][this.pulledField],false);
if(h[c][this.descriptionField]){this.chartData[c].description=h[c][this.descriptionField]
}else{this.chartData[c].description=""
}this.chartData[c].url=h[c][this.urlField];
if(AmCharts.toBoolean(h[c][this.visibleInLegendField])==false){this.chartData[c].visibleInLegend=false
}else{this.chartData[c].visibleInLegend=true
}if(h[c][this.alphaField]!=undefined){this.chartData[c].alpha=Number(h[c][this.alphaField])
}else{this.chartData[c].alpha=this.pieAlpha
}if(h[c][this.colorField]!=undefined){this.chartData[c].color=AmCharts.toColor(h[c][this.colorField])
}d+=this.chartData[c].value;
this.chartData[c].hidden=false
}var g=0;for(var c=0;
c<f;c++){this.chartData[c].percents=this.chartData[c].value/d*100;
if(this.chartData[c].percents<this.groupPercent){g++
}}if(g>1){this.groupValue=0;
this.removeSmallSlices();
var e=this.groupValue;
var a=this.groupValue/d*100;
this.chartData.push({title:this.groupedTitle,value:e,percents:a,pulled:this.groupedPulled,color:this.groupedColor,url:this.groupedUrl,description:this.groupedDescription,alpha:this.groupedAlpha})
}for(var c=0;c<this.chartData.length;
c++){var b;if(this.pieBaseColor){b=AmCharts.adjustLuminosity(this.pieBaseColor,c*this.pieBrightnessStep/100)
}else{b=this.colors[c];
if(b==undefined){b=AmCharts.randomColor()
}}if(this.chartData[c].color==undefined){this.chartData[c].color=b
}}this.recalculatePercents()
}},recalculatePercents:function(){var d=this.chartData.length;
var b=0;for(var a=0;a<d;
a++){var c=this.chartData[a];
if(!c.hidden&&c.value>0){b+=c.value
}}for(a=0;a<d;a++){c=this.chartData[a];
if(!c.hidden&&c.value>0){c.percents=c.value*100/b
}else{c.percents=0}}},handleGestureChange:function(a){},handleGestureStart:function(a){this.hideBalloon();
a.preventDefault();this.gestureHappening=true
},handleGestureEnd:function(a){var c=a.scale;
if(c>1){pullOutAll()}else{pullInAll()
}clearTimeout(this.pullTimeOut);
var b=this;setTimeout(function(){thisobj.endGesture.call(b)
},100)},endGesture:function(){this.gestureHappening=false
},handleTouchStart:function(c,a){if(!c.pulled){this.rolledOverSlice=c;
var b=this;this.pullTimeOut=setTimeout(function(){thisobj.padRollOver.call(b)
},100)}else{this.rolledOverSlice=undefined;
this.hideBalloon()}},padRollOver:function(){if(!this.gestureHappening){this.rollOverSlice(this.rolledOverSlice,false)
}},handleTouchEnd:function(a){if(!this.gestureHappening){if(a.pulled){this.pullSlice(a,-1)
}else{this.pullSlice(a,1)
}}},removeSmallSlices:function(){var b=this.chartData.length;
for(var a=b-1;a>=0;a--){if(this.chartData[a].percents<this.groupPercent){this.groupValue+=this.chartData[a].value;
this.chartData.splice(a,1)
}}},measureMaxLabel:function(){var d=0;
for(var c=0;c<this.chartData.length;
c++){var f=this.chartData[c];
var e=AmCharts.formatString(this.labelText,f,this.numberFormatter,this.percentFormatter);
var a=AmCharts.text(this.container,0,0,e,{fill:this.color,"font-family":this.fontFamily,"font-size":this.fontSize});
var b=a.getBBox().width;
if(b>d){d=b}a.remove()
}return d}});