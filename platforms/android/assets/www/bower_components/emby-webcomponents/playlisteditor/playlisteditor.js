define(["shell","dialogHelper","loading","layoutManager","connectionManager","scrollHelper","embyRouter","globalize","paper-checkbox","emby-input","paper-icon-button-light","emby-select","html!./../icons/nav.html","css!./../formdialog"],function(e,t,n,l,r,i,s,a){function o(e,t){for(;!e.classList||!e.classList.contains(t);)if(e=e.parentNode,!e)return null;return e}function d(e){n.show();var t=o(this,"dialog"),l=t.querySelector("#selectPlaylistToAddTo").value,i=r.getApiClient(b);return l?(S=l,v(i,t,l)):c(i,t),e.preventDefault(),!1}function c(e,l){var r=e.getUrl("Playlists",{Name:l.querySelector("#txtNewPlaylistName").value,Ids:l.querySelector(".fldSelectedItemIds").value||"",userId:e.getCurrentUserId()});e.ajax({type:"POST",url:r,dataType:"json"}).then(function(r){n.hide();var i=r.Id;t.close(l),u(e,i)})}function u(e,t){e.getItem(e.getCurrentUserId(),t).then(function(e){s.showItem(e)})}function v(e,l,r){var i=e.getUrl("Playlists/"+r+"/Items",{Ids:l.querySelector(".fldSelectedItemIds").value||"",userId:e.getCurrentUserId()});e.ajax({type:"POST",url:i}).then(function(){n.hide(),t.close(l),require(["toast"],function(e){e(a.translate("sharedcomponents#MessageItemsAdded"))})})}function m(e){e.dispatchEvent(new CustomEvent("change",{}))}function y(e){var t=e.querySelector("#selectPlaylistToAddTo");n.hide(),e.querySelector(".newPlaylistInfo").classList.add("hide");var l={Recursive:!0,IncludeItemTypes:"Playlist",SortBy:"SortName"},i=r.getApiClient(b);i.getItems(i.getCurrentUserId(),l).then(function(e){var l="";l+='<option value="">'+a.translate("sharedcomponents#OptionNew")+"</option>",l+=e.Items.map(function(e){return'<option value="'+e.Id+'">'+e.Name+"</option>"}),t.innerHTML=l,t.value=S||"",m(t),n.hide()})}function p(){var e="";return e+='<div class="dialogContent smoothScrollY">',e+='<div class="dialogContentInner centeredContent">',e+='<form style="margin:auto;">',e+='<div class="fldSelectPlaylist">',e+='<select is="emby-select" id="selectPlaylistToAddTo" label="'+a.translate("sharedcomponents#LabelPlaylist")+'" autofocus></select>',e+="</div>",e+='<div class="newPlaylistInfo">',e+='<div class="inputContainer">',e+='<input is="emby-input" type="text" id="txtNewPlaylistName" required="required" label="'+a.translate("sharedcomponents#LabelName")+'" />',e+="</div>",e+="<br />",e+="</div>",e+="<br />",e+="<div>",e+='<paper-button raised class="btnSubmit block">'+a.translate("sharedcomponents#ButtonOk")+"</paper-button>",e+="</div>",e+='<input type="hidden" class="fldSelectedItemIds" />',e+="</form>",e+="</div>",e+="</div>"}function f(e,t){if(e.querySelector("#selectPlaylistToAddTo").addEventListener("change",function(){this.value?(e.querySelector(".newPlaylistInfo").classList.add("hide"),e.querySelector("#txtNewPlaylistName").removeAttribute("required")):(e.querySelector(".newPlaylistInfo").classList.remove("hide"),e.querySelector("#txtNewPlaylistName").setAttribute("required","required"))}),y(e),e.querySelector(".btnSubmit").addEventListener("click",function(){var t=document.createElement("input");t.setAttribute("type","submit"),t.style.display="none";var n=e.querySelector("form");n.appendChild(t),t.click(),setTimeout(function(){n.removeChild(t)},500)}),e.querySelector("form").addEventListener("submit",d),e.querySelector(".fldSelectedItemIds",e).value=t.join(","),t.length)e.querySelector(".fldSelectPlaylist").classList.remove("hide"),y(e);else{e.querySelector(".fldSelectPlaylist").classList.add("hide");var n=e.querySelector("#selectPlaylistToAddTo");n.innerHTML="",n.value="",m(n)}}function h(){var e=this;e.show=function(e){var n=e.items||{};b=e.serverId;var r={removeOnClose:!0,scrollY:!1};r.size=l.tv?"fullscreen":"small";var s=t.createDialog(r);s.classList.add("formDialog");var o="",d=a.translate("sharedcomponents#AddToPlaylist");return o+='<div class="dialogHeader" style="margin:0 0 2em;">',o+='<button is="paper-icon-button-light" class="btnCancel" tabindex="-1"><iron-icon icon="nav:arrow-back"></iron-icon></button>',o+='<div class="dialogHeaderTitle">',o+=d,o+="</div>",o+="</div>",o+=p(),s.innerHTML=o,document.body.appendChild(s),f(s,n),s.querySelector(".btnCancel").addEventListener("click",function(){t.close(s)}),l.tv&&i.centerFocus.on(s.querySelector(".dialogContent"),!1),new Promise(function(e){s.addEventListener("close",e),t.open(s)})}}var b,S="";return h});