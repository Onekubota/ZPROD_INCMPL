sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageBox",
        "com/kubota/zprodincmpl/model/formatter"
    ],
    function(BaseController,msgBox ,formatter) {
      "use strict";
  
      return BaseController.extend("com.kubota.zprodincmpl.controller.App", {
        formatter: formatter,
            
            onInit: function () {
                this.getRouter().getRoute("RouteView1").attachMatched(this._onObjectMatched, this);
                
                var oModel = this.getView().getModel();
			    var me = this;
			    var oSmartFilterBar = this.getView().byId("smartFilterBar");
			    // this.oModel2DataDeferred = jQuery.Deferred();
			    var sUrl = "/sap/opu/odata/sap/ZEWM_PROD_INCOMPL_CHECK_SRV";
			    var oDataModel = new sap.ui.model.odata.ODataModel(sUrl);
			    return new Promise(function(resolve, reject) {
				    oDataModel.read("/DefaultWhnoSet", {
					    // filters: me.aFilters1,
					    async: false,
					    success: function(oData, oResponse) {

                            me.whno = oData.results[0].WarehouseNo;
                            // oSmartFilterBar.getControlByKey("WarehouseNo").setValue(oData.results[0].WarehouseNo);
                            // me.oModel2DataDeferred.resolve();
                        },
					    failure: function(oResponse) {}
				    });
			    }); 
            
            },

            onInitSmartFilterBar: function(e) {
                var oSmartFilterBar = this.getView().byId("smartFilterBar");
                oSmartFilterBar.getControlByKey("WarehouseNo").setValue(this.whno);
            },
            
            getRouter : function () {
                return this.getOwnerComponent().getRouter();
            },
            _onObjectMatched : function(oEvent)
            {
                var evt = oEvent;                
            },
            
            onPressPackSpec: function(oEvent)
            {
                       
            /*var oCrossAppNav = sap.ushell.Container.getService("CrossApplicationNavigation"); 
            var hash = oCrossAppNav.hrefForExternal({
            target : { semanticObject : "ZSO_SCWM_PACKSPEC", action : "display" }
                        }); 
            var url = window.location.href.split('#')[0] + hash;
            sap.m.URLHelper.redirect(url, true); */
            
            var tt = oEvent.getSource();
			var i = tt.getBindingContext();
			var r = i.getObject();

			var t = sap.ushell.Container.getService("CrossApplicationNavigation");
			var i = t.hrefForExternal({
				target: {
					semanticObject: "ZSO_SCWM_PACKSPEC",
					action: "display"
				},
				params: {
					Product: r.Product
				}
			});
			var r = window.location.href.split("#")[0] + i;
			sap.m.URLHelper.redirect(r, true);
  
            },
         onPress: function(oEvent)
            { 
             /*var oIcon = oEvent.getSource();   // Indicator in the column
    
                // Get binding context of the icon to identify the row where the event is originated
                var oBindingContext = oIcon.getBindingContext();  // <<<-- If you have model name pass it here as string
                var oBindingObject = oBindingContext.getObject(); 
             
             //alert(oBindingObject.WarehouseNo);
            var oCrossAppNav = sap.ushell.Container.getService("CrossApplicationNavigation"); 
            var hash = oCrossAppNav.hrefForExternal({
            target : { semanticObject : "ZSO_SCWM_MAT1", action : "display" },
            params : { "MATNR" : oBindingObject.Product,
                       "LGNUM" : oBindingObject.WarehouseNo}
            }); 
            var url = window.location.href.split('#')[0] + hash;
            sap.m.URLHelper.redirect(url, true); */

            var t = oEvent.getSource();
			var i = t.getBindingContext();
			var r = i.getObject();
			var s = sap.ushell.Container.getService("CrossApplicationNavigation");
			var a = s.hrefForExternal({
				target: {
					semanticObject: "ZSO_SCWM_MAT1",
					action: "display"
				},
				params: {
					MATNR: r.Product,
					LGNUM: r.WarehouseNo,
					DYNP_OKCODE: "SHOW"
				}
			});
			var o = window.location.href.split("#")[0] + a;
			sap.m.URLHelper.redirect(o, true);
        },

        onPressUOM: function(e) {
			var t = e.getSource();
			var i = t.getBindingContext();
			var r = i.getObject();
			var s = sap.ushell.Container.getService("CrossApplicationNavigation");
			var a = s.hrefForExternal({
				target: {
					semanticObject: "ZSO_SCWM_MAT1_U",
					action: "display"
				},
				params: {
					MATNR: r.Product,
					LGNUM: r.WarehouseNo

				}
			});
			var o = window.location.href.split("#")[0] + a;
			sap.m.URLHelper.redirect(o, true);
		},

        onPressPurchaseOrder: function(e) {
			var t = e.getSource();
			var i = t.getBindingContext();
			var r = i.getObject();
			var s = sap.ushell.Container.getService("CrossApplicationNavigation");
			var a = s.hrefForExternal({
				target: {
					semanticObject: "ZDISP_PO",
					action: "display"
				},
				params: {
					"EBELN": r.PurchaseOrder
				}
			});
			// s.toExternal({target: {shellHash: a}});

			var o = window.location.href.split("#")[0] + a;
			sap.m.URLHelper.redirect(o, true);

		},

        onPressInboundDelivery: function(e) {
			var t = e.getSource();
			var i = t.getBindingContext();
			var r = i.getObject();
			var s = sap.ushell.Container.getService("CrossApplicationNavigation");
			var a = s.hrefForExternal({
				target: {
					semanticObject: "ZDISP_IDO",
					action: "display"
				},
				params: {
					DOCNO_ID: r.InboundDelivery,
					LGNUM: r.WarehouseNo    //++ VVATS to pass from frontend
				}
			});
			var o = window.location.href.split("#")[0] + a;
			sap.m.URLHelper.redirect(o, true);
		},
        
        onBeforeRebind: function (oEvent) {
            var oTable = oEvent.getSource().getTable();
            var filterBar = this.getView().byId("smartFilterBar");
            var mBindingParams = oEvent.getParameter("bindingParams");

            if (filterBar.getControlByKey("WarehouseNo").getValue() === "") {
				msgBox.error("Please enter Warehouse no");
				oEvent.getParameter("bindingParams").preventTableBind = true;
			}

            //Event handlers for the binding
            mBindingParams.events = {
                "dataReceived" : function(oEvent){
                    var aReceivedData = oEvent.getParameter('data');

                    if (aReceivedData === undefined) {
						msgBox.error("You are not authorized for this warehouse");
					} else {

                    var oEntity = aReceivedData.results[0]
                   // alert(oEntity.Packspec+","+oEntity.Length+","+oEntity.Width+","+oEntity.PutawayControlInd+","+oEntity.StockRemoval)
                       //Packspec column
                        if(oEntity.Packspec==="NA" ){
                            oTable.getColumns()[6].setVisible(false);
                        }
                        else if( oEntity.Packspec===undefined )
                        {
                            oTable.getColumns()[6].setVisible(false);
                        }
                        else {
                            oTable.getColumns()[6].setVisible(true);
                        }
                        
                        //Length column
                        if(oEntity.Length==="NA"){
                        oTable.getColumns()[7].setVisible(false);
                        }
                        else if( oEntity.Length===undefined )
                        {
                        oTable.getColumns()[7].setVisible(false);
                        }
                        else{oTable.getColumns()[7].setVisible(true);}

                        //Widht Column
                        if(oEntity.Width==="NA"){
                        oTable.getColumns()[8].setVisible(false);
                        }
                        else if( oEntity.Width===undefined )
                        {
                        oTable.getColumns()[8].setVisible(false);
                        }
                        else{oTable.getColumns()[8].setVisible(true);}

                        //Putaway Control Indicator column
                        if(oEntity.PutawayControlInd==="NA"){
                            oTable.getColumns()[9].setVisible(false);
                        }
                        else if( oEntity.PutawayControlInd===undefined )
                        {
                        oTable.getColumns()[9].setVisible(false);
                        }
                        else{oTable.getColumns()[9].setVisible(true);}
                        
                        //Stock Removal column
                        if(oEntity.StockRemoval==="NA"){
                            oTable.getColumns()[10].setVisible(false);
                        }
                        else if( oEntity.StockRemoval===undefined )
                        {
                        oTable.getColumns()[10].setVisible(false);
                        }
                        else{oTable.getColumns()[10].setVisible(true);}

                        //StorageSect column
                        if (oEntity.Storagesect === "NA") {
							oTable.getColumns()[11].setVisible(false);
						} 
                        else if( oEntity.Storagesect===undefined )
                        {
                        oTable.getColumns()[11].setVisible(false);
                        }
                        else {
							oTable.getColumns()[11].setVisible(true);
						}

                        //Cycle Count column
						if (oEntity.Cyclecount === "NA") {
							oTable.getColumns()[12].setVisible(false);
						} 
                        else if( oEntity.Cyclecount===undefined )
                        {
                        oTable.getColumns()[12].setVisible(false);
                        }
                        else {
							oTable.getColumns()[12].setVisible(true);
						}
                                } 
                            //More event handling can be done here
                            }
                    };
                },
		});
    });
  /*      jugvjgvjvv
  sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/m/MessageBox", 
    "com/kubota/ewm/zcewm/model/formatter"], 
    
    function(e, msgBox, t) {
	"use strict";
	return e.extend("com.kubota.ewm.zcewm.controller.App", {
		formatter: t,
		onInit: function() {
			this.getRouter().getRoute("RouteView1").attachMatched(this._onObjectMatched, this);

			var oModel = this.getView().getModel();
			var me = this;
			var oSmartFilterBar = this.getView().byId("smartFilterBar");
			// this.oModel2DataDeferred = jQuery.Deferred();
			var sUrl = "/sap/opu/odata/sap/ZEWM_PROD_INCOMPL_CHECK_SRV";
			var oDataModel = new sap.ui.model.odata.ODataModel(sUrl);
			return new Promise(function(resolve, reject) {
				oDataModel.read("/DefaultWhnoSet", {
					// filters: me.aFilters1,
					async: false,
					success: function(oData, oResponse) {

						me.whno = oData.results[0].WarehouseNo;
						// oSmartFilterBar.getControlByKey("WarehouseNo").setValue(oData.results[0].WarehouseNo);
						// me.oModel2DataDeferred.resolve();
					},
					failure: function(oResponse) {}
				});
			});

		},
		onInitSmartFilterBar: function(e) {
			var oSmartFilterBar = this.getView().byId("smartFilterBar");
			oSmartFilterBar.getControlByKey("WarehouseNo").setValue(this.whno);
		},
		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},
		_onObjectMatched: function(e) {
			var t = e;

		},

		onPressPackSpec: function(e) {

			var tt = e.getSource();
			var i = tt.getBindingContext();
			var r = i.getObject();

			var t = sap.ushell.Container.getService("CrossApplicationNavigation");
			var i = t.hrefForExternal({
				target: {
					semanticObject: "ZSO_SCWM_PACKSPEC",
					action: "display"
				},
				params: {
					Product: r.Product
				}
			});
			var r = window.location.href.split("#")[0] + i;
			sap.m.URLHelper.redirect(r, true);
		},
		onPress: function(e) {
			var t = e.getSource();
			var i = t.getBindingContext();
			var r = i.getObject();
			var s = sap.ushell.Container.getService("CrossApplicationNavigation");
			var a = s.hrefForExternal({
				target: {
					semanticObject: "ZSO_SCWM_MAT1",
					action: "display"
				},
				params: {
					MATNR: r.Product,
					LGNUM: r.WarehouseNo,
					DYNP_OKCODE: "SHOW"
				}
			});
			var o = window.location.href.split("#")[0] + a;
			sap.m.URLHelper.redirect(o, true);
		},

		onPressUOM: function(e) {
			//var t = e.getSource();
			var i = t.getBindingContext();
			var r = i.getObject();
			var s = sap.ushell.Container.getService("CrossApplicationNavigation");
			var a = s.hrefForExternal({
				target: {
					semanticObject: "ZSO_SCWM_MAT1_U",
					action: "display"
				},
				params: {
					MATNR: r.Product,
					LGNUM: r.WarehouseNo

				}
			});
			var o = window.location.href.split("#")[0] + a;
			sap.m.URLHelper.redirect(o, true);
		},
		onPressPurchaseOrder: function(e) {
			var t = e.getSource();
			var i = t.getBindingContext();
			var r = i.getObject();
			var s = sap.ushell.Container.getService("CrossApplicationNavigation");
			var a = s.hrefForExternal({
				target: {
					semanticObject: "ZDISP_PO",
					action: "display"
				},
				params: {
					"EBELN": r.PurchaseOrder
				}
			});
			// s.toExternal({target: {shellHash: a}});

			var o = window.location.href.split("#")[0] + a;
			sap.m.URLHelper.redirect(o, true);

		},

		onPressInboundDelivery: function(e) {
			var t = e.getSource();
			var i = t.getBindingContext();
			var r = i.getObject();
			var s = sap.ushell.Container.getService("CrossApplicationNavigation");
			var a = s.hrefForExternal({
				target: {
					semanticObject: "ZDISP_IDO",
					action: "display"
				},
				params: {
					DOCNO_ID: r.InboundDelivery
						// LGNUM: r.WarehouseNo
				}
			});
			var o = window.location.href.split("#")[0] + a;
			sap.m.URLHelper.redirect(o, true);
		},

		onBeforeRebind: function(e) {

			var that = this;
			var whToken = [];
			var t = e.getSource().getTable();
			var filterBar = this.getView().byId("smartFilterBar");
			var i = e.getParameter("bindingParams");

			if (filterBar.getControlByKey("WarehouseNo").getValue() === "") {
				msgBox.error("Please enter Warehouse no");
				e.getParameter("bindingParams").preventTableBind = true;
			}

			// t.getBinding().attachDataRequested(function(e) {
		
			// });
			i.events = {
				dataRequested: function(e) {

				},
				dataReceived: function(e) {
					var i = e.getParameter("data");

					if (i === undefined) {
						msgBox.error("You are not authorized for this warehouse");
					} else {
						var r = i.results[0];
					

						// var oToken1 = new sap.m.Token({
						// 	key: i.results[0].WarehouseNo,
						// 	text: i.results[0].WarehouseNo
						// });
						// whToken.push(oToken1);
						// filterBar.getControlByKey("WarehouseNo").setValue(i.results[0].WarehouseNo);

						if (r.Packspec === "NA") {
							t.getColumns()[6].setVisible(false);
						} else {
							t.getColumns()[6].setVisible(true);
						}
						if (r.Length === "NA") {
							t.getColumns()[7].setVisible(false);
						} else {
							t.getColumns()[7].setVisible(true);
						}
						if (r.Width === "NA") {
							t.getColumns()[8].setVisible(false);
						} else {
							t.getColumns()[8].setVisible(true);
						}
						if (r.PutawayControlInd === "NA") {
							t.getColumns()[9].setVisible(false);
						} else {
							t.getColumns()[9].setVisible(true);
						}
						if (r.StockRemoval === "NA") {
							t.getColumns()[10].setVisible(false);
						} else {
							t.getColumns()[10].setVisible(true);
						}
						if (r.Storagesect === "NA") {
							t.getColumns()[11].setVisible(false);
						} else {
							t.getColumns()[11].setVisible(true);
						}
						if (r.Cyclecount === "NA") {
							t.getColumns()[12].setVisible(false);
						} else {
							t.getColumns()[12].setVisible(true);
						}
					}
				}
			}
		} 
	}) 
}); */
  
  