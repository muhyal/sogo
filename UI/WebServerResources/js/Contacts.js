!function(){"use strict";function e(e,t){e.state("app",{url:"/addressbooks",abstract:!0,views:{addressbooks:{templateUrl:"UIxContactFoldersView",controller:"AddressBooksController",controllerAs:"app"}},resolve:{stateAddressbooks:o}}).state("app.addressbook",{url:"/:addressbookId",views:{addressbook:{templateUrl:"addressbook",controller:"AddressBookController",controllerAs:"addressbook"}},resolve:{stateAddressbook:s}}).state("app.addressbook.new",{url:"/{contactType:(?:card|list)}/new",params:{refs:{array:!0}},views:{card:{templateUrl:"UIxContactEditorTemplate",controller:"CardController",controllerAs:"editor"}},resolve:{stateCard:r}}).state("app.addressbook.card",{url:"/:cardId",abstract:!0,views:{card:{template:"<ui-view/>"}},resolve:{stateCard:d},onEnter:n,onExit:i}).state("app.addressbook.card.view",{url:"/view",views:{"card@app.addressbook":{templateUrl:"UIxContactViewTemplate",controller:"CardController",controllerAs:"editor"}}}).state("app.addressbook.card.editor",{url:"/edit",views:{"card@app.addressbook":{templateUrl:"UIxContactEditorTemplate",controller:"CardController",controllerAs:"editor"}}}),t.rules.otherwise({state:"app.addressbook",params:{addressbookId:"personal"}})}function o(e){return e.$findAll(window.contactFolders)}function s(e,t,o,s){s=_.find(s.$findAll(),function(e){return e.id==o.addressbookId});return s?(delete s.selectedCard,s.$reload(),s):e.reject("Addressbook "+o.addressbookId+" not found")}function r(e,t,o){var s="v"+e.contactType,e=new o({pid:e.addressbookId,c_component:s,refs:e.refs});return t.selectedCard=!0,e}function d(t,o,s){return s.$futureAddressBookData.then(function(){var e=_.find(s.$cards,function(e){return e.id==o.cardId});if(e)return e.$reload();t.go("app.addressbook")})}function n(e,t){t.selectedCard=e.cardId}function i(e){delete s.selectedCard}function t(e,t,o,s){e.DebugEnabled||s.defaultErrorHandler(function(){}),o.onError({to:"app.**"},function(e){"app"==e.to().name||e.ignored()||(t.error("transition error to "+e.to().name+": "+e.error().detail),s.go("app.addressbook",{addressbookId:"personal"}))})}angular.module("SOGo.ContactsUI",["ngCookies","ui.router","angularFileUpload","sgCkeditor","SOGo.Common","SOGo.PreferencesUI","SOGo.MailerUI"]).config(e).run(t),e.$inject=["$stateProvider","$urlServiceProvider"],o.$inject=["AddressBook"],s.$inject=["$q","$state","$stateParams","AddressBook"],r.$inject=["$stateParams","stateAddressbook","Card"],d.$inject=["$state","$stateParams","stateAddressbook"],n.$inject=["$stateParams","stateAddressbook"],i.$inject=["stateAddressbook"],t.$inject=["$window","$log","$transitions","$state"]}(),function(){"use strict";function e(n,i,e,a,t,c,u,o,h,s,r,d,f,p,m,g){var $,k=this,C=[];function b(e){var t=k.selectedFolder.$selectedCardIndex();return angular.isDefined(t)?(t--,0<k.selectedFolder.$topIndex&&k.selectedFolder.$topIndex--):(t=k.selectedFolder.$cards.length()-1,k.selectedFolder.$topIndex=k.selectedFolder.getLength()),-1<t&&k.selectCard(k.selectedFolder.$cards[t]),e.preventDefault(),t}function v(e){var t=k.selectedFolder.$selectedCardIndex();return angular.isDefined(t)?(t++,k.selectedFolder.$topIndex<k.selectedFolder.$cards.length&&k.selectedFolder.$topIndex++):t=0,t<k.selectedFolder.$cards.length?k.selectCard(k.selectedFolder.$cards[t]):t=-1,e.preventDefault(),t}function w(e){var t;k.selectedFolder.hasSelectedCard()&&0<=(t=b(e))&&toggleCardSelection(e,k.selectedFolder.$cards[t])}function y(e){var t;k.selectedFolder.hasSelectedCard()&&0<=(t=v(e))&&toggleCardSelection(e,k.selectedFolder.$cards[t])}function F(e,t){var o,s,r=k.selectedFolder,d=!1,n=r.$selectedCards(),i=_.filter(n,function(e){return e.$isCard()});i.length!=n.length&&u.show(u.simple().textContent(l("Lists can't be moved or copied.")).position("top right").hideDelay(2e3)),i.length&&("copy"==e?(o=r.$copyCards(i,t),s=l("%{0} card(s) copied",i.length)):(o=r.$moveCards(i,t),s=l("%{0} card(s) moved",i.length),i=_.map(i,"id"),d=r.selectedCard&&0<=i.indexOf(r.selectedCard)),o.then(function(){d&&a.go("app.addressbook"),u.show(u.simple().textContent(s).position("top right").hideDelay(2e3))}))}$={c_cn:"Name",c_sn:"Lastname",c_givenname:"Firstname",c_mail:"Email",c_screenname:"Screen Name",c_o:"Organization",c_telephonenumber:"Preferred Phone"},this.$onInit=function(){var t;s.selectedFolder=g,this.service=s,this.selectedFolder=g,this.mode={search:!1,multiple:0},(t=C).push(p.createHotkey({key:l("hotkey_search"),description:l("Search"),callback:angular.bind(k,k.searchMode)})),t.push(p.createHotkey({key:l("key_create_card"),description:l("Create a new address book card"),callback:angular.bind(k,k.newComponent,"card")})),t.push(p.createHotkey({key:l("key_create_list"),description:l("Create a new list"),callback:angular.bind(k,k.newComponent,"list")})),t.push(p.createHotkey({key:"space",description:l("Toggle item"),callback:angular.bind(k,k.toggleCardSelection)})),t.push(p.createHotkey({key:"shift+space",description:l("Toggle range of items"),callback:angular.bind(k,k.toggleCardSelection)})),t.push(p.createHotkey({key:"up",description:l("View next item"),callback:b})),t.push(p.createHotkey({key:"down",description:l("View previous item"),callback:v})),t.push(p.createHotkey({key:"shift+up",description:l("Add next item to selection"),callback:w})),t.push(p.createHotkey({key:"shift+down",description:l("Add previous item to selection"),callback:y})),_.forEach(["backspace","delete"],function(e){t.push(p.createHotkey({key:e,description:l("Delete selected card or address book"),callback:angular.bind(k,k.confirmDeleteSelectedCards)}))}),_.forEach(t,function(e){p.registerHotkey(e)}),n.$on("$destroy",function(){_.forEach(C,function(e){p.deregisterHotkey(e)})})},this.centerIsClose=function(e){return this.selectedFolder.hasSelectedCard()&&!!e},this.selectCard=function(e){a.go("app.addressbook.card.view",{cardId:e.id})},this.toggleCardSelection=function(e,t){var o,s,r,d=this.selectedFolder;if((t=t||d.$selectedCard()).selected=!t.selected,this.mode.multiple+=t.selected?1:-1,e.shiftKey&&1<d.$selectedCount()){for(s=(o=d.idsMap[t.id])-2;0<=s&&!d.$cards[s].selected;)s--;if(s<0)for(s=o+2;s<d.getLength()&&!d.$cards[s].selected;)s++;if(0<=s&&s<d.getLength())for(r=Math.min(o,s);r<=Math.max(o,s);r++)d.$cards[r].selected=!0}e.preventDefault(),e.stopPropagation()},this.newComponent=function(e){a.go("app.addressbook.new",{contactType:e})},this.unselectCards=function(){_.forEach(this.selectedFolder.$cards,function(e){e.selected=!1}),this.mode.multiple=0},this.confirmDeleteSelectedCards=function(e){var t=this.selectedFolder.$selectedCards();this.selectedFolder.acls.objectEraser&&0<_.size(t)&&d.confirm(l("Warning"),l("Are you sure you want to delete the selected contacts?"),{ok:l("Delete")}).then(function(){k.selectedFolder.$deleteCards(t).then(function(){k.mode.multiple=0,k.selectedFolder.selectedCard||a.go("app.addressbook")})}),e.preventDefault()},this.copySelectedCards=function(e){F("copy",e)},this.moveSelectedCards=function(e){F("move",e)},this.selectAll=function(){_.forEach(this.selectedFolder.$cards,function(e){e.selected=!0}),this.mode.multiple=this.selectedFolder.$cards.length},this.sort=function(e){if(!e)return $[s.$query.sort];this.selectedFolder.$filter("",{sort:e})},this.sortedBy=function(e){return s.$query.sort==e},this.ascending=function(){return s.$query.asc},this.searchMode=function(e){k.mode.search=!0,r("search"),e&&e.preventDefault()},this.cancelSearch=function(){this.mode.search=!1,this.selectedFolder.$filter("")},this.newMessage=function(s,r,d){o.$findAll().then(function(e){var t=_.find(e,function(e){if(0===e.id)return e}),o=i.defer();t.$getMailboxes().then(function(e){t.$newMessage().then(function(e){e.editable[d]=r,c.show({parent:angular.element(document.body),targetEvent:s,clickOutsideToClose:!1,escapeToClose:!1,templateUrl:"../Mail/UIxMailEditor",controller:"MessageEditorController",controllerAs:"editor",onComplete:function(e,t){return o.resolve(t)},locals:{stateParent:n,stateAccount:t,stateMessage:e,onCompletePromise:function(){return o.promise}}})})})})},this.newMessageWithRecipient=function(e,t,o){this.newMessage(e,[o+" <"+t+">"],"to"),e.stopPropagation(),e.preventDefault()},this.newMessageWithSelectedCards=function(e,t){var o=this.selectedFolder,s=_.filter(this.selectedFolder.$cards,function(e){return e.selected}),r=[],d=[];_.forEach(s,function(t){t.$isList({expandable:!0})?angular.isDefined(t.refs)&&t.refs.length?_.forEach(t.refs,function(e){e.email.length&&d.push(e.$shortFormat())}):r.push(t.$reload().then(function(e){_.forEach(e.refs,function(e){e.email.length&&d.push(e.$shortFormat())})})):t.$loaded==h.STATUS.LOADED?t.c_mail&&d.push(t.$shortFormat()):o.$loadCard(t)&&r.push(o.$futureHeadersData.then(function(){var e=o.idsMap[t.id];!angular.isDefined(e)||(e=o.$cards[e]).c_mail&&d.push(e.$shortFormat())}))}),i.all(r).then(function(){(d=_.uniq(d)).length&&k.newMessage(e,d,t)})},this.newListWithSelectedCards=function(){var e=_.filter(this.selectedFolder.$cards,function(e){return e.selected}),t=[],o=[];_.forEach(e,function(e){e.$isList({expandable:!0})?angular.isDefined(e.refs)&&e.refs.length?_.forEach(e.refs,function(e){e.email.length&&o.push(e)}):t.push(e.$reload().then(function(e){_.forEach(e.refs,function(e){e.email.length&&o.push(e)})})):e.$$email&&e.$$email.length&&o.push(e)}),i.all(t).then(function(){(o=_.uniqBy(_.map(o,function(e){return{reference:e.id||e.reference,email:e.$$email||e.email}}),"reference")).length&&a.go("app.addressbook.new",{contactType:"list",refs:o})})}}e.$inject=["$scope","$q","$window","$state","$timeout","$mdDialog","$mdToast","Account","Card","AddressBook","sgFocus","Dialog","sgSettings","sgHotkeys","stateAddressbooks","stateAddressbook"],angular.module("SOGo.ContactsUI").controller("AddressBookController",e)}(),function(){"use strict";function e(o,a,e,t,s,r,d,n,c,i,u,h,f,p,m,g,$,k,C,b,v){var w=this,y=[];this.$onInit=function(){var t;this.activeUser=C.activeUser,this.service=$,this.saving=!1,t=y,_.forEach(["backspace","delete"],function(e){t.push(p.createHotkey({key:e,description:l("Delete selected card or address book"),callback:function(){$.selectedFolder&&!$.selectedFolder.hasSelectedCard()&&confirmDelete()}}))}),_.forEach(t,function(e){p.registerHotkey(e)})},this.$onDestroy=function(){_.forEach(y,function(e){p.deregisterHotkey(e)})},this.select=function(e,t){a.params.addressbookId!=t.id&&this.editMode!=t.id&&(this.editMode=!1,$.$query.value="",i(f["gt-md"])||u("left").close(),a.go("app.addressbook",{addressbookId:t.id}))},this.newAddressbook=function(){k.prompt(l("New Addressbook..."),l("Name of the Address Book")).then(function(e){var t=new $({name:e,isEditable:!0,isRemote:!1,owner:UserLogin});t.$id().then(function(){$.$add(t)}).catch(_.noop)})},this.edit=function(e){e.isRemote||(this.editMode=e.id,this.originalAddressbook=e.$omit(),m("addressBookName_"+e.id))},this.revertEditing=function(e){e.name=this.originalAddressbook.name,this.editMode=!1},this.save=function(e){var t=e.name;!this.saving&&t&&0<t.length?t!=this.originalAddressbook.name?(this.saving=!0,e.$rename(t).then(function(e){w.editMode=!1},function(){w.revertEditing(e),w.editMode=e.id}).finally(function(){w.saving=!1})):this.editMode=!1:this.revertEditing(e)},this.confirmDelete=function(){this.service.selectedFolder.isSubscription?this.service.selectedFolder.$delete().then(function(){w.service.selectedFolder=null,a.go("app.addressbook",{addressbookId:"personal"})},function(e,t){k.alert(l('An error occured while deleting the addressbook "%{0}".',w.service.selectedFolder.name),l(e.error))}):k.confirm(l("Warning"),l('Are you sure you want to delete the addressbook "%{0}"?',this.service.selectedFolder.name),{ok:l("Delete")}).then(function(){return w.service.selectedFolder.$delete()}).then(function(){return w.service.selectedFolder=null,a.go("app.addressbook",{addressbookId:"personal"}),!0}).catch(function(e){e&&(e=e.data.message||e.statusText,k.alert(l('An error occured while deleting the addressbook "%{0}".',w.service.selectedFolder.name),e))})},this.importCards=function(e,t){function o(e,d,t){function o(e){e=0===e.type.indexOf("text")||/\.(ldif|vcf|vcard)$/.test(e.name);return e||c.show({template:["<md-toast>",'  <div class="md-toast-content">','    <md-icon class="md-warn md-hue-1">error_outline</md-icon>',"    <span>"+l("Select a vCard or LDIF file.")+"</span>","  </div>","</md-toast>"].join(""),position:"top right",hideDelay:3e3}),e}this.uploader=new h({url:ApplicationBaseURL+[t.id,"import"].join("/"),autoUpload:!0,queueLimit:1,filters:[{name:o,fn:o}],onSuccessItem:function(e,t,o,s){var r;d.hide(),0===t.imported?r=l("No card was imported."):(r=l("A total of %{0} cards were imported in the addressbook.",t.imported),$.selectedFolder.$reload()),c.show(c.simple().textContent(r).position("top right").hideDelay(3e3))},onErrorItem:function(e,t,o,s){c.show({template:["<md-toast>",'  <div class="md-toast-content">','    <md-icon class="md-warn md-hue-1">error_outline</md-icon>',"    <span>"+l("An error occured while importing contacts.")+"</span>","  </div>","</md-toast>"].join(""),position:"top right",hideDelay:3e3})}}),this.close=function(){d.hide()}}n.show({parent:angular.element(document.body),targetEvent:e,clickOutsideToClose:!0,escapeToClose:!0,templateUrl:"UIxContactsImportDialog",controller:o,controllerAs:"$CardsImportDialogController",locals:{folder:t}}),o.$inject=["scope","$mdDialog","folder"]},this.showLinks=function(e){function t(e,t){this.addressbook=t,this.close=function(){e.hide()}}(e.urls?o.when():$.$reloadAll()).then(function(){n.show({parent:angular.element(document.body),clickOutsideToClose:!0,escapeToClose:!0,templateUrl:e.id+"/links",controller:t,controllerAs:"links",locals:{addressbook:e}})}),t.$inject=["$mdDialog","addressbook"]},this.showProperties=function(e){function t(e,t,o){var s=this;s.addressbook=new $(o.$omit()),s.saveProperties=function(){s.addressbook.$save().then(function(){o.init(s.addressbook.$omit()),t.hide()})},s.close=function(){t.cancel()}}n.show({templateUrl:e.id+"/properties",controller:t,controllerAs:"properties",clickOutsideToClose:!0,escapeToClose:!0,locals:{srcAddressBook:e}}).catch(function(){}),t.$inject=["$scope","$mdDialog","srcAddressBook"]},this.share=function(e){e.$acl.$users().then(function(){n.show({templateUrl:e.id+"/UIxAclEditor",controller:"AclController",controllerAs:"acl",clickOutsideToClose:!0,escapeToClose:!0,locals:{usersWithACL:e.$acl.users,User:b,folder:e}})})},this.subscribeToFolder=function(e){$.$subscribe(e.owner,e.name).then(function(e){c.show(c.simple().textContent(l("Successfully subscribed to address book")).position("top right").hideDelay(3e3))})},this.isDroppableFolder=function(e,t){return t.id!=e.id&&(t.isOwned||t.acls.objectCreator)},this.dragSelectedCards=function(e,t,o){var s,r,d=t.id,n=!1,i=e.$selectedCards();0===i.length&&(i=[e.$selectedCard()]),(t=_.filter(i,function(e){return e.$isCard()})).length!=i.length&&c.show(c.simple().textContent(l("Lists can't be moved or copied.")).position("top right").hideDelay(2e3)),t.length&&("copy"==o?(s=e.$copyCards(t,d),r=l("%{0} card(s) copied",t.length)):(s=e.$moveCards(t,d),r=l("%{0} card(s) moved",t.length),t=_.map(t,"id"),n=e.selectedCard&&0<=t.indexOf(e.selectedCard)),s.then(function(){n&&a.go("app.addressbook"),c.show(c.simple().textContent(r).position("top right").hideDelay(2e3))}))}}e.$inject=["$q","$state","$scope","$rootScope","$stateParams","$timeout","$window","$mdDialog","$mdToast","$mdMedia","$mdSidenav","FileUploader","sgConstant","sgHotkeys","sgFocus","Card","AddressBook","Dialog","sgSettings","User","stateAddressbooks"],angular.module("SOGo.ContactsUI").controller("AddressBooksController",e)}(),function(){"use strict";function e(e,t,o,s,r,d,n,i,a,c,u,h,f){var p,m=this,g=[];m.card=f,m.currentFolder=d.selectedFolder,m.allEmailTypes=n.$EMAIL_TYPES,m.allTelTypes=n.$TEL_TYPES,m.allUrlTypes=n.$URL_TYPES,m.allAddressTypes=n.$ADDRESS_TYPES,m.categories={},m.userFilterResults=[],m.showRawSource=!1,p=g,_.forEach(["backspace","delete"],function(e){p.push(a.createHotkey({key:e,description:l("Delete"),callback:function(e){m.currentFolder.acls.objectEraser&&0===m.currentFolder.$selectedCount()&&m.confirmDelete(),e.preventDefault()}}))}),_.forEach(p,function(e){a.registerHotkey(e)}),m.card.hasCertificate&&m.card.$certificate().then(function(e){m.certificate=e},function(){delete m.card.hasCertificate}),e.$on("$destroy",function(){_.forEach(g,function(e){a.deregisterHotkey(e)})}),this.transformCategory=function(e){return angular.isString(e)?{value:e}:e},this.removeAttribute=function(e,t,o){this.card.$delete(t,o),e.$setDirty()},this.addOrg=function(){var e=this.card.$addOrg({value:""});c("org_"+e)},this.addBirthday=function(){this.card.birthday=new Date},this.addScreenName=function(){this.card.$addScreenName("")},this.addEmail=function(){var e=this.card.$addEmail("");c("email_"+e)},this.addPhone=function(){var e=this.card.$addPhone("");c("phone_"+e)},this.addUrl=function(){var e=this.card.$addUrl("","https://www.fsf.org/");c("url_"+e)},this.canAddCustomField=function(){return _.keys(this.customFields).length<4},this.addCustomField=function(){angular.isDefined(this.card.customFields)||(this.card.customFields={});var e=_.pullAll(["1","2","3","4"],_.keys(this.customFields));this.card.customFields[e[0]]=""},this.deleteCustomField=function(e){delete this.card.customFields[e]},this.addAddress=function(){var e=this.card.$addAddress("","","","","","","","");c("address_"+e)},this.userFilter=function(e,t){return e.length<r.minimumSearchLength()?[]:d.selectedFolder.$filter(e,{dry:!0,excludeLists:!0},t).then(function(e){return e})},this.save=function(e,t){e.$valid&&this.card.$save(t).then(function(e){var t=_.indexOf(_.map(d.selectedFolder.$cards,"id"),m.card.id);t<0?d.selectedFolder.$reload():d.selectedFolder.$cards[t]=angular.copy(m.card),u.go("app.addressbook.card.view",{cardId:m.card.id})},function(e){m.duplicatedCard=new n(e.data)})},this.close=function(){u.go("app.addressbook").then(function(){m.card=null,delete d.selectedFolder.selectedCard})},this.edit=function(e){this.duplicatedCard=!1,e.$setPristine(),e.$setDirty()},this.reset=function(e){m.card.$reset(),e.$setPristine()},this.cancel=function(){m.card.$reset(),m.card.isNew?(m.card=null,delete d.selectedFolder.selectedCard,u.go("app.addressbook",{addressbookId:d.selectedFolder.id})):u.go("app.addressbook.card.view",{cardId:m.card.id})},this.confirmDelete=function(){var o=f;i.confirm(l("Warning"),l("Are you sure you want to delete the card of %{0}?","<b>"+o.$fullname()+"</b>"),{ok:l("Delete")}).then(function(){d.selectedFolder.$deleteCards([o]).then(function(){close()},function(e,t){i.alert(l("Warning"),l('An error occured while deleting the card "%{0}".',o.$fullname()))})})},this.toggleRawSource=function(e){this.showRawSource||this.rawSource?this.showRawSource=!this.showRawSource:n.$$resource.post(this.currentFolder.id+"/"+this.card.id,"raw").then(function(e){m.rawSource=e,m.showRawSource=!0})}}e.$inject=["$scope","$timeout","$window","$mdDialog","sgSettings","AddressBook","Card","Dialog","sgHotkeys","sgFocus","$state","$stateParams","stateCard"],angular.module("SOGo.ContactsUI").controller("CardController",e)}(),function(){"use strict";angular.module("SOGo.Common").directive("sgAddress",function(){return{restrict:"A",scope:{data:"=sgAddress"},controller:["$scope",function(e){e.addressLines=function(e){var t=[],o=[];return e.street&&t.push(e.street),e.street2&&t.push(e.street2),e.locality&&o.push(e.locality),e.region&&o.push(e.region),0<o.length&&t.push(o.join(", ")),e.country&&t.push(e.country),e.postalcode&&t.push(e.postalcode),t.join("<br>")}}],template:'<address ng-bind-html="addressLines(data)"></address>'}})}();
//# sourceMappingURL=Contacts.js.map