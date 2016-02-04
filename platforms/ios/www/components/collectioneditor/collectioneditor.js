define(["paperdialoghelper","paper-checkbox","paper-dialog","paper-input"],function(e){function t(){Dashboard.showLoadingMsg();var e=$(this).parents("paper-dialog")[0],t=$("#selectCollectionToAddTo",e).val();return t?a(e,t):o(e),!1}function o(t){var o=ApiClient.getUrl("Collections",{Name:$("#txtNewCollectionName",t).val(),IsLocked:!$("#chkEnableInternetMetadata",t).checked(),Ids:$(".fldSelectedItemIds",t).val()||""});ApiClient.ajax({type:"POST",url:o,dataType:"json"}).then(function(o){Dashboard.hideLoadingMsg();var a=o.Id;e.close(t),l(a)})}function l(e){var t=getParameterByName("context");ApiClient.getItem(Dashboard.getCurrentUserId(),e).then(function(e){Dashboard.navigate(LibraryBrowser.getHref(e,t))})}function a(t,o){var l=ApiClient.getUrl("Collections/"+o+"/Items",{Ids:$(".fldSelectedItemIds",t).val()||""});ApiClient.ajax({type:"POST",url:l}).then(function(){Dashboard.hideLoadingMsg(),e.close(t),Dashboard.alert(Globalize.translate("MessageItemsAdded"))})}function n(){$(this).remove(),Dashboard.hideLoadingMsg()}function i(e){Dashboard.showLoadingMsg();var t=$("#selectCollectionToAddTo",e);$(".newCollectionInfo",e).hide();var o={Recursive:!0,IncludeItemTypes:"BoxSet",SortBy:"SortName"};ApiClient.getItems(Dashboard.getCurrentUserId(),o).then(function(e){var o="";o+='<option value="">'+Globalize.translate("OptionNewCollection")+"</option>",o+=e.Items.map(function(e){return'<option value="'+e.Id+'">'+e.Name+"</option>"}),t.html(o).val("").trigger("change"),Dashboard.hideLoadingMsg()})}function d(){var e="";return e+='<form class="newCollectionForm" style="margin:auto;">',e+='<div class="fldSelectCollection">',e+='<label for="selectCollectionToAddTo">'+Globalize.translate("LabelSelectCollection")+"</label>",e+='<select id="selectCollectionToAddTo" data-mini="true"></select>',e+="</div>",e+='<div class="newCollectionInfo">',e+="<div>",e+='<paper-input type="text" id="txtNewCollectionName" required="required" label="'+Globalize.translate("LabelName")+'"></paper-input>',e+='<div class="fieldDescription">'+Globalize.translate("NewCollectionNameExample")+"</div>",e+="</div>",e+="<br />",e+="<br />",e+="<div>",e+='<paper-checkbox id="chkEnableInternetMetadata">'+Globalize.translate("OptionSearchForInternetMetadata")+"</paper-checkbox>",e+="</div>",e+="</div>",e+="<br />",e+="<div>",e+='<button type="submit" class="clearButton" data-role="none"><paper-button raised class="submit block">'+Globalize.translate("ButtonOk")+"</paper-button></button>",e+="</div>",e+='<input type="hidden" class="fldSelectedItemIds" />',e+="</form>"}function r(e,o){$("#selectCollectionToAddTo",e).on("change",function(){this.value?($(".newCollectionInfo",e).hide(),$("#txtNewCollectionName",e).removeAttr("required")):($(".newCollectionInfo",e).show(),$("#txtNewCollectionName",e).attr("required","required"))}),$(".newCollectionForm",e).off("submit",t).on("submit",t),$(".fldSelectedItemIds",e).val(o.join(",")),o.length?($(".fldSelectCollection",e).show(),i(e)):($(".fldSelectCollection",e).hide(),$("#selectCollectionToAddTo",e).html("").val("").trigger("change"))}function c(){var t=this;t.show=function(t){t=t||[];var o=e.createDialog({size:"small"});o.classList.add("ui-body-b"),o.classList.add("background-theme-b");var l="",a=Globalize.translate(t.length?"HeaderAddToCollection":"HeaderNewCollection");l+='<div class="dialogHeader">',l+='<paper-icon-button icon="close" class="btnCancel" tabindex="-1"></paper-icon-button>',l+='<div class="dialogHeaderTitle">',l+=a,l+="</div>",l+="</div>",l+=d(),o.innerHTML=l,document.body.appendChild(o),r(o,t),$(o).on("iron-overlay-closed",n),e.open(o),$(".btnCancel",o).on("click",function(){e.close(o)})}}return c});