define(["jQuery"],function(e){function t(e,t){e.querySelector(".txtDevicePath").value="",t&&ApiClient.getNamedConfiguration("livetv").then(function(n){var i=n.TunerHosts.filter(function(e){return e.Id==t})[0];e.querySelector(".txtDevicePath").value=i.Url||""})}function n(e){Dashboard.showLoadingMsg();var t={Type:"m3u",Url:e.querySelector(".txtDevicePath").value},n=getParameterByName("id");n&&(t.Id=n),ApiClient.ajax({type:"POST",url:ApiClient.getUrl("LiveTv/TunerHosts"),data:JSON.stringify(t),contentType:"application/json"}).then(function(){Dashboard.processServerConfigurationUpdateResult(),Dashboard.navigate("livetvstatus.html")},function(){Dashboard.hideLoadingMsg(),Dashboard.alert({message:Globalize.translate("ErrorSavingTvProvider")})})}e(document).on("pageinit","#liveTvTunerProviderM3UPage",function(){var t=this;e("form",t).on("submit",function(){return n(t),!1}),e("#btnSelectPath",t).on("click.selectDirectory",function(){require(["directorybrowser"],function(n){var i=new n;i.show({includeFiles:!0,callback:function(n){n&&e("#txtDevicePath",t).val(n),i.close()}})})})}).on("pageshow","#liveTvTunerProviderM3UPage",function(){var e=getParameterByName("id"),n=this;t(n,e)})});