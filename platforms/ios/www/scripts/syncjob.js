!function(){function e(e,n,a){var i="";i+="<div>",i+=Globalize.translate("ValueDateCreated",parseISO8601Date(n.DateCreated,{toLocal:!0}).toLocaleString()),i+="</div>",i+="<br/>",i+='<div class="formFields"></div>',i+="<br/>",i+="<br/>",i+='<button type="submit" data-role="none" class="clearButton">',i+='<paper-button raised class="submit block"><iron-icon icon="check"></iron-icon><span>'+Globalize.translate("ButtonSave")+"</span></paper-button>",i+="</button>",$(".syncJobForm",e).html(i),SyncManager.renderForm({elem:$(".formFields",e),dialogOptions:a,dialogOptionsFn:t(a),showName:!0,readOnlySyncTarget:!0}).then(function(){c(e,n,a)})}function t(e){return function(){var t=$.Deferred();return t.resolveWith(null,[e]),t.promise()}}function n(e){var t="";t+='<paper-icon-item data-itemid="'+e.Id+'" data-status="'+e.Status+'" data-remove="'+e.IsMarkedForRemoval+'">';var n,a=-1!=["Queued","Cancelled","Failed","ReadyToTransfer","Transferring","Converting","Synced"].indexOf(e.Status);return e.PrimaryImageItemId&&(n=ApiClient.getImageUrl(e.PrimaryImageItemId,{type:"Primary",width:80,tag:e.PrimaryImageTag,minScale:1.5})),t+=n?'<paper-fab mini class="blue" style="background-image:url(\''+n+"');background-repeat:no-repeat;background-position:center center;background-size: cover;\" item-icon></paper-fab>":'<paper-fab mini class="blue" icon="sync" item-icon></paper-fab>',t+="<paper-item-body three-line>",t+="<div>",t+=e.ItemName,t+="</div>",t+="Failed"==e.Status?'<div secondary style="color:red;">':"<div secondary>",t+=Globalize.translate("SyncJobItemStatus"+e.Status),"Synced"==e.Status&&e.IsMarkedForRemoval&&(t+="<br/>",t+=Globalize.translate("SyncJobItemStatusSyncedMarkForRemoval")),t+="</div>",t+='<div secondary style="padding-top:5px;">',t+='<paper-progress class="mini" style="width:100%;" value="'+(e.Progress||0)+'"></paper-progress>',t+="</div>",t+="</paper-item-body>",t+=a?'<paper-icon-button icon="'+AppInfo.moreIcon+'" class="btnJobItemMenu"></paper-icon-button>':'<paper-icon-button icon="'+AppInfo.moreIcon+'" class="btnJobItemMenu" disabled></paper-icon-button>',t+="</paper-icon-item>"}function a(e,t){var a="";a+="<h1>"+Globalize.translate("HeaderItems")+"</h1>",a+='<div class="paperList">';var o=0;a+=t.map(function(e){return n(e,o++)}).join(""),a+="</div>";var r=$(".jobItems",e).html(a).lazyChildren();$(".btnJobItemMenu",r).on("click",function(){i(this)})}function i(e){var t=$(e).parents(".page"),n=$(e).parents("paper-icon-item"),a=n.attr("data-itemid"),i=n.attr("data-status"),c="true"==n.attr("data-remove").toLowerCase(),d=[];"Failed"==i?d.push({name:Globalize.translate("ButtonQueueForRetry"),id:"retry",ironIcon:"check"}):"Cancelled"==i?d.push({name:Globalize.translate("ButtonReenable"),id:"retry",ironIcon:"check"}):"Queued"==i||"Transferring"==i||"Converting"==i||"ReadyToTransfer"==i?d.push({name:Globalize.translate("ButtonCancelItem"),id:"cancel",ironIcon:"delete"}):"Synced"==i&&c?d.push({name:Globalize.translate("ButtonUnmarkForRemoval"),id:"unmarkforremoval",ironIcon:"check"}):"Synced"==i&&d.push({name:Globalize.translate("ButtonMarkForRemoval"),id:"markforremoval",ironIcon:"delete"}),require(["actionsheet"],function(n){n.show({items:d,positionTo:e,callback:function(e){switch(e){case"cancel":o(t,a);break;case"retry":l(t,a);break;case"markforremoval":r(t,a);break;case"unmarkforremoval":s(t,a)}}})})}function o(e,t){Dashboard.showLoadingMsg(),ApiClient.ajax({type:"DELETE",url:ApiClient.getUrl("Sync/JobItems/"+t)}).then(function(){d(e)})}function r(e,t){ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Sync/JobItems/"+t+"/MarkForRemoval")}).then(function(){d(e)})}function s(e,t){ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Sync/JobItems/"+t+"/UnmarkForRemoval")}).then(function(){d(e)})}function l(e,t){ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Sync/JobItems/"+t+"/Enable")}).then(function(){d(e)})}function c(e,t,n){var a=e.querySelector("#txtSyncJobName");a&&(a.value=t.Name),$("#selectProfile",e).val(t.Profile||"").trigger("change"),$("#selectQuality",e).val(t.Quality||"").trigger("change"),$("#chkUnwatchedOnly",e).checked(t.UnwatchedOnly),$("#chkSyncNewContent",e).checked(t.SyncNewContent),$("#txtItemLimit",e).val(t.ItemLimit),$("#txtBitrate",e).val(t.Bitrate?t.Bitrate/1e6:"");var i=n.Targets.filter(function(e){return e.Id==t.TargetId})[0],o=i?i.Name:"";$("#selectSyncTarget",e).val(o)}function d(t){Dashboard.showLoadingMsg();var n=getParameterByName("id");ApiClient.getJSON(ApiClient.getUrl("Sync/Jobs/"+n)).then(function(n){ApiClient.getJSON(ApiClient.getUrl("Sync/Options",{UserId:n.UserId,ItemIds:n.RequestedItemIds&&n.RequestedItemIds.length?n.RequestedItemIds.join(""):null,ParentId:n.ParentId,Category:n.Category,TargetId:n.TargetId})).then(function(a){f=a,e(t,n,a),Dashboard.hideLoadingMsg()})}),ApiClient.getJSON(ApiClient.getUrl("Sync/JobItems",{JobId:n,AddMetadata:!0})).then(function(e){a(t,e.Items),Dashboard.hideLoadingMsg()})}function u(t,n,i){e(t,n,f),a(t,i),Dashboard.hideLoadingMsg()}function p(e){Dashboard.showLoadingMsg();var t=getParameterByName("id");ApiClient.getJSON(ApiClient.getUrl("Sync/Jobs/"+t)).then(function(n){SyncManager.setJobValues(n,e),ApiClient.ajax({url:ApiClient.getUrl("Sync/Jobs/"+t),type:"POST",data:JSON.stringify(n),contentType:"application/json"}).then(function(){Dashboard.hideLoadingMsg(),Dashboard.alert(Globalize.translate("SettingsSaved"))})})}function m(e,t){var n=$.mobile.activePage;"SyncJob"==t.MessageType&&u(n,t.Data.Job,t.Data.JobItems)}function b(){var e="0,1500";e+=","+getParameterByName("id"),ApiClient.isWebSocketOpen()&&ApiClient.sendWebSocketMessage("SyncJobStart",e)}function g(){ApiClient.isWebSocketOpen()&&ApiClient.sendWebSocketMessage("SyncJobStop","")}function y(){var e=this,t=$(e).parents(".page");return p(t),!1}$.fn.lazyChildren=function(){for(var e=0,t=this.length;t>e;e++)ImageLoader.lazyChildren(this[e]);return this};var f;$(document).on("pageinit",".syncJobPage",function(){$(".syncJobForm").off("submit",y).on("submit",y)}).on("pageshow",".syncJobPage",function(){var e=this;d(e),b(e),Events.on(ApiClient,"websocketmessage",m)}).on("pagebeforehide",".syncJobPage",function(){g(),Events.off(ApiClient,"websocketmessage",m)})}();