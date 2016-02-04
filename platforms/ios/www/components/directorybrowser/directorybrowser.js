define(["paperdialoghelper","paper-item","paper-input","paper-fab","paper-item-body"],function(e){function t(){var e=DeferredBuilder.Deferred();return s?e.resolveWith(null,[s]):ApiClient.getPublicSystemInfo().then(function(t){s=t,e.resolveWith(null,[s])}),e.promise()}function r(){$(this).remove(),Dashboard.hideLoadingMsg()}function i(e,t,r){if(t&&"string"!=typeof t)throw new Error("invalid path");Dashboard.showLoadingMsg(),t?$(".networkHeadline").hide():$(".networkHeadline").show();var i=[];"Network"===t?i.push(ApiClient.getNetworkDevices()):t?(i.push(ApiClient.getDirectoryContents(t,r)),i.push(ApiClient.getParentPath(t))):i.push(ApiClient.getDrives()),Promise.all(i).then(function(r){var i=r[0],n=r[1]||"";$("#txtDirectoryPickerPath",e).val(t||"");var o="";t&&(o+=a("lnkPath lnkDirectory","",n,"..."));for(var l=0,s=i.length;s>l;l++){var c=i[l],d="File"==c.Type?"lnkPath lnkFile":"lnkPath lnkDirectory";o+=a(d,c.Type,c.Path,c.Name)}t||(o+=a("lnkPath lnkDirectory","","Network",Globalize.translate("ButtonNetwork"))),$(".results",e).html(o),Dashboard.hideLoadingMsg()},function(){$("#txtDirectoryPickerPath",e).val(""),$(".results",e).html(""),Dashboard.hideLoadingMsg()})}function a(e,t,r,i){var a="";return a+='<paper-item role="menuitem" class="'+e+'" data-type="'+t+'" data-path="'+r+'">',a+="<paper-item-body>",a+=i,a+="</paper-item-body>",a+='<iron-icon icon="arrow-forward"></iron-icon>',a+="</paper-item>"}function n(e,t){var r="",i=e.instruction?e.instruction+"<br/><br/>":"";return r+='<p class="directoryPickerHeadline">',r+=i,r+=Globalize.translate("MessageDirectoryPickerInstruction").replace("{0}","<b>\\\\server</b>").replace("{1}","<b>\\\\192.168.1.101</b>"),"bsd"==t.OperatingSystem.toLowerCase()?(r+="<br/>",r+="<br/>",r+=Globalize.translate("MessageDirectoryPickerBSDInstruction"),r+="<br/>",r+='<a href="http://doc.freenas.org/9.3/freenas_jails.html#add-storage" target="_blank">'+Globalize.translate("ButtonMoreInformation")+"</a>"):"linux"==t.OperatingSystem.toLowerCase()&&(r+="<br/>",r+="<br/>",r+=Globalize.translate("MessageDirectoryPickerLinuxInstruction"),r+="<br/>"),r+="</p>",r+='<form style="max-width:100%;">',r+="<div>",r+='<paper-input id="txtDirectoryPickerPath" type="text" required="required" style="width:82%;display:inline-block;" label="'+Globalize.translate("LabelCurrentPath")+'"></paper-input>',r+='<paper-icon-button icon="refresh" class="btnRefreshDirectories" title="'+Globalize.translate("ButtonRefresh")+'"></paper-icon-button>',r+="</div>",r+='<div class="results paperList" style="height: 180px; overflow-y: auto;"></div>',r+="<div>",r+='<button type="submit" class="clearButton" data-role="none"><paper-button raised class="submit block">'+Globalize.translate("ButtonOk")+"</paper-button></button>",r+="</div>",r+="</form>",r+="</div>"}function o(e,t,r){$(e).on("click",".lnkPath",function(){var t=this.getAttribute("data-path");$(this).hasClass("lnkFile")?$("#txtDirectoryPickerPath",e).val(t):i(e,t,r)}).on("click",".btnRefreshDirectories",function(){var t=$("#txtDirectoryPickerPath",e).val();i(e,t,r)}).on("change","#txtDirectoryPickerPath",function(){i(e,this.value,r)}),$("form",e).on("submit",function(){return t.callback&&t.callback(this.querySelector("#txtDirectoryPickerPath").value),!1})}function l(){var a,l=this;l.show=function(l){l=l||{};var s={includeDirectories:!0};null!=l.includeDirectories&&(s.includeDirectories=l.includeDirectories),null!=l.includeFiles&&(s.includeFiles=l.includeFiles),t().then(function(t){var c=e.createDialog({size:"medium"});c.classList.add("ui-body-a"),c.classList.add("background-theme-a"),c.classList.add("popupEditor"),c.classList.add("directoryPicker");var d="";d+='<h2 class="dialogHeader">',d+='<paper-fab icon="arrow-back" mini class="btnCloseDialog"></paper-fab>',d+='<div style="display:inline-block;margin-left:.6em;vertical-align:middle;">'+(l.header||Globalize.translate("HeaderSelectPath"))+"</div>",d+="</h2>",d+='<div class="editorContent" style="max-width:800px;margin:auto;">',d+=n(l,t),d+="</div>",c.innerHTML=d,document.body.appendChild(c);var u=c.querySelector(".editorContent");o(u,l,s),$(c).on("iron-overlay-opened",function(){this.querySelector("#txtDirectoryPickerPath input").focus()}),$(c).on("iron-overlay-closed",r),e.open(c),$(".btnCloseDialog",c).on("click",function(){e.close(c)}),a=c;var p=$("#txtDirectoryPickerPath",u);l.path&&p.val(l.path),i(u,p.val())})},l.close=function(){a&&e.close(a)}}var s;return l});