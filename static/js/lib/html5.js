(function(){
	var e = ['article','aside','audio','bdi','canvas','command','datalist','details','figcaption','figure','footer','header','hgroup','keygen','mark','meter','nav','output','progress','rp','rt','ruby','section','source','summary','time','track','vedio'];
    var iHtml5 = e.length;
    for(var i=0;i<iHtml5;i++){
		document.createElement(e[i]);
	}
})();