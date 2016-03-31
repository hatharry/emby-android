define(["jQuery","paper-checkbox","paper-input","paper-item-body","paper-icon-item"],function(e){return function(t,n,i){function r(){Dashboard.showLoadingMsg(),ApiClient.getNamedConfiguration("livetv").then(function(i){var r=i.ListingProviders.filter(function(e){return e.Id==n})[0]||{};d=r.ListingsId,e("#selectListing",t).val(r.ListingsId||""),t.querySelector(".txtUser").value=r.Username||"",t.querySelector(".txtPass").value="",t.querySelector(".txtZipCode").value=r.ZipCode||"",r.Username&&r.Password?t.querySelector(".listingsSection").classList.remove("hide"):t.querySelector(".listingsSection").classList.add("hide"),t.querySelector(".chkAllTuners").checked=r.EnableAllTuners,t.querySelector(".chkAllTuners").checked?t.querySelector(".selectTunersSection").classList.add("hide"):t.querySelector(".selectTunersSection").classList.remove("hide"),a(r),u(t,r,i.TunerHosts)})}function a(n){ApiClient.getJSON(ApiClient.getUrl("LiveTv/ListingProviders/SchedulesDirect/Countries")).then(function(i){var r,a,o=[];for(var s in i){var l=i[s];if(l.length&&"ZZZ"!==s)for(r=0,a=l.length;a>r;r++)o.push({name:l[r].fullName,value:l[r].shortName})}o.sort(function(e,t){return e.name>t.name?1:e.name<t.name?-1:0}),e("#selectCountry",t).html(o.map(function(e){return'<option value="'+e.value+'">'+e.name+"</option>"}).join("")).val(n.Country||""),e(t.querySelector(".txtZipCode")).trigger("change")},function(){Dashboard.alert({message:Globalize.translate("ErrorGettingTvLineups")})}),Dashboard.hideLoadingMsg()}function o(){Dashboard.showLoadingMsg(),require(["cryptojs-sha1"],function(){var e={Type:"SchedulesDirect",Username:t.querySelector(".txtUser").value,EnableAllTuners:!0,Password:CryptoJS.SHA1(t.querySelector(".txtPass").value).toString()},i=n;i&&(e.Id=i),ApiClient.ajax({type:"POST",url:ApiClient.getUrl("LiveTv/ListingProviders",{ValidateLogin:!0}),data:JSON.stringify(e),contentType:"application/json",dataType:"json"}).then(function(e){Dashboard.processServerConfigurationUpdateResult(),n=e.Id,r()},function(){Dashboard.alert({message:Globalize.translate("ErrorSavingTvProvider")})})})}function s(){var r=e("#selectListing",t).val();if(!r)return void Dashboard.alert({message:Globalize.translate("ErrorPleaseSelectLineup")});Dashboard.showLoadingMsg();var a=n;ApiClient.getNamedConfiguration("livetv").then(function(n){var o=n.ListingProviders.filter(function(e){return e.Id==a})[0];o.ZipCode=t.querySelector(".txtZipCode").value,o.Country=e("#selectCountry",t).val(),o.ListingsId=r,o.EnableAllTuners=t.querySelector(".chkAllTuners").checked,o.EnabledTuners=o.EnableAllTuners?[]:e(".chkTuner",t).get().filter(function(e){return e.checked}).map(function(e){return e.getAttribute("data-id")}),ApiClient.ajax({type:"POST",url:ApiClient.getUrl("LiveTv/ListingProviders",{ValidateListings:!0}),data:JSON.stringify(o),contentType:"application/json"}).then(function(){Dashboard.hideLoadingMsg(),i.showConfirmation!==!1&&Dashboard.processServerConfigurationUpdateResult(),Events.trigger(h,"submitted")},function(){Dashboard.hideLoadingMsg(),Dashboard.alert({message:Globalize.translate("ErrorAddingListingsToSchedulesDirect")})})})}function l(i){return i?(Dashboard.showModalLoadingMsg(),void ApiClient.ajax({type:"GET",url:ApiClient.getUrl("LiveTv/ListingProviders/Lineups",{Id:n,Location:i,Country:e("#selectCountry",t).val()}),dataType:"json"}).then(function(n){e("#selectListing",t).html(n.map(function(e){return'<option value="'+e.Id+'">'+e.Name+"</option>"})),d&&e("#selectListing",t).val(d),Dashboard.hideModalLoadingMsg()},function(){Dashboard.alert({message:Globalize.translate("ErrorGettingTvLineups")}),l(""),Dashboard.hideModalLoadingMsg()})):void e("#selectListing",t).html("")}function c(e){switch(e=e.toLowerCase()){case"m3u":return"M3U Playlist";case"hdhomerun":return"HDHomerun";case"satip":return"DVB";default:return"Unknown"}}function u(e,t,n){for(var i="",r=0,a=n.length;a>r;r++){var o=n[r];i+="<paper-icon-item>";var s=t.EnableAllTuners||-1!=t.EnabledTuners.indexOf(o.Id),l=s?" checked":"";i+='<paper-checkbox data-id="'+o.Id+'" class="chkTuner" item-icon '+l+"></paper-checkbox>",i+="<paper-item-body two-line>",i+="<div>",i+=o.FriendlyName||c(o.Type),i+="</div>",i+="<div secondary>",i+=o.Url,i+="</div>",i+="</paper-item-body>",i+="</paper-icon-item>"}e.querySelector(".tunerList").innerHTML=i}var d,h=this;h.submit=function(){t.querySelector(".btnSubmitListingsContainer").click()},h.init=function(){i=i||{},i.showCancelButton!==!1?t.querySelector(".btnCancel").classList.remove("hide"):t.querySelector(".btnCancel").classList.add("hide"),i.showSubmitButton!==!1?t.querySelector(".btnSubmitListings").classList.remove("hide"):t.querySelector(".btnSubmitListings").classList.add("hide"),e(".formLogin",t).on("submit",function(){return o(),!1}),e(".formListings",t).on("submit",function(){return s(),!1}),e(".txtZipCode",t).on("change",function(){l(this.value)}),t.querySelector(".chkAllTuners").addEventListener("change",function(e){e.target.checked?t.querySelector(".selectTunersSection").classList.add("hide"):t.querySelector(".selectTunersSection").classList.remove("hide")}),e(".createAccountHelp",t).html(Globalize.translate("MessageCreateAccountAt",'<a href="http://www.schedulesdirect.org" target="_blank">http://www.schedulesdirect.org</a>')),r()}}});