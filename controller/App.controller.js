sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "com/kubota/zprodincmpl/model/formatter"], function(e, t, r) {
	"use strict";
	return e.extend("com.kubota.zprodincmpl.controller.App", {
		formatter: r,
		onInit: function() {
			this.getRouter().getRoute("RouteView1").attachMatched(this._onObjectMatched, this);
			var e = this.getView().getModel();
			var t = this;
			var r = this.getView().byId("smartFilterBar");
			debugger;
			var table = this.getView().byId("listReport").setNoData();
			var a = "/sap/opu/odata/sap/ZEWM_PROD_INCOMPL_CHECK_SRV";
			var s = new sap.ui.model.odata.ODataModel(a);
			return new Promise(function(e, r) {
				s.read("/DefaultWhnoSet", {
					async: false,
					success: function(e, r) {
						t.whno = e.results[0].WarehouseNo
					},
					failure: function(e) {}
				})
			})
		},
		onInitSmartFilterBar: function(e) {
			var t = this.getView().byId("smartFilterBar");
			t.getControlByKey("WarehouseNo").setValue(this.whno);
			this.getView().byId("smartFilterBar").getControlByKey("WarehouseNo").setEditable(false);
			var table = this.getView().byId("listReport").setNoData();
		},
		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},
		_onObjectMatched: function(e) {
			var t = e
		},
		onPressPackSpec: function(e) {
			var t = e.getSource();
			var r = t.getBindingContext();
			var a = r.getObject();
			var s = sap.ushell.Container.getService("CrossApplicationNavigation");
			var r = s.hrefForExternal({
				target: {
					semanticObject: "ZSO_SCWM_PACKSPEC",
					action: "display"
				},
				params: {
					Product: a.Product
				}
			});
			var a = window.location.href.split("#")[0] + r;
			sap.m.URLHelper.redirect(a, true)
		},
		onPress: function(e) {
			var t = e.getSource();
			var r = t.getBindingContext();
			var a = r.getObject();
			var s = sap.ushell.Container.getService("CrossApplicationNavigation");
			var i = s.hrefForExternal({
				target: {
					semanticObject: "ZSO_SCWM_MAT1",
					action: "display"
				},
				params: {
					MATNR: a.Product,
					LGNUM: a.WarehouseNo,
					DYNP_OKCODE: "SHOW"
				}
			});
			var n = window.location.href.split("#")[0] + i;
			sap.m.URLHelper.redirect(n, true)
		},
		onPressUOM: function(e) {
			var t = e.getSource();
			var r = t.getBindingContext();
			var a = r.getObject();
			var s = sap.ushell.Container.getService("CrossApplicationNavigation");
			var i = s.hrefForExternal({
				target: {
					semanticObject: "ZSO_SCWM_MAT1_U",
					action: "display"
				},
				params: {
					MATNR: a.Product,
					LGNUM: a.WarehouseNo
				}
			});
			var n = window.location.href.split("#")[0] + i;
			sap.m.URLHelper.redirect(n, true)
		},
		onPressPurchaseOrder: function(e) {
			var t = e.getSource();
			var r = t.getBindingContext();
			var a = r.getObject();
			var s = sap.ushell.Container.getService("CrossApplicationNavigation");
			var i = s.hrefForExternal({
				target: {
					semanticObject: "ZDISP_PO",
					action: "display"
				},
				params: {
					EBELN: a.PurchaseOrder
				}
			});
			var n = window.location.href.split("#")[0] + i;
			sap.m.URLHelper.redirect(n, true)
		},
		onPressInboundDelivery: function(e) {
			var t = e.getSource();
			var r = t.getBindingContext();
			var a = r.getObject();
			var s = sap.ushell.Container.getService("CrossApplicationNavigation");
			var i = s.hrefForExternal({
				target: {
					semanticObject: "ZDISP_IDO",
					action: "display"
				},
				params: {
					DOCNO_ID: a.InboundDelivery,
					LGNUM: a.WarehouseNo
				}
			});
			var n = window.location.href.split("#")[0] + i;
			sap.m.URLHelper.redirect(n, true)
		},
		change:function(e){
			var r = e.getSource();
		},
		onBeforeRebind: function(e) {
			debugger;
			this.getView().getModel().refresh();
		//	this.this.getView().byId("listReport").getModel().updateBindings();
			var r = e.getSource().getTable();
			var a = this.getView().byId("smartFilterBar");
			var s = e.getParameter("bindingParams");
			if (a.getControlByKey("WarehouseNo").getValue() === "") {
				t.error("Please enter Warehouse no");
				e.getParameter("bindingParams").preventTableBind = true
			}
			s.events = {
				dataReceived: function(e) {
					var a = e.getParameter("data");
					if (a === undefined) {
						t.error("You are not authorized for this warehouse")
					} else {
						var s = a.results[0];
						if (s.Packspec === "NA") {
							r.getColumns()[6].setVisible(false)
						} else if (s.Packspec === undefined) {
							r.getColumns()[6].setVisible(false)
						} else {
							r.getColumns()[6].setVisible(true)
						}
						if (s.Length === "NA") {
							r.getColumns()[7].setVisible(false)
						} else if (s.Length === undefined) {
							r.getColumns()[7].setVisible(false)
						} else {
							r.getColumns()[7].setVisible(true)
						}
						if (s.Width === "NA") {
							r.getColumns()[8].setVisible(false)
						} else if (s.Width === undefined) {
							r.getColumns()[8].setVisible(false)
						} else {
							r.getColumns()[8].setVisible(true)
						}
						if (s.PutawayControlInd === "NA") {
							r.getColumns()[9].setVisible(false)
						} else if (s.PutawayControlInd === undefined) {
							r.getColumns()[9].setVisible(false)
						} else {
							r.getColumns()[9].setVisible(true)
						}
						if (s.StockRemoval === "NA") {
							r.getColumns()[10].setVisible(false)
						} else if (s.StockRemoval === undefined) {
							r.getColumns()[10].setVisible(false)
						} else {
							r.getColumns()[10].setVisible(true)
						}
						if (s.Storagesect === "NA") {
							r.getColumns()[11].setVisible(false)
						} else if (s.Storagesect === undefined) {
							r.getColumns()[11].setVisible(false)
						} else {
							r.getColumns()[11].setVisible(true)
						}
						if (s.Cyclecount === "NA") {
							r.getColumns()[12].setVisible(false)
						} else if (s.Cyclecount === undefined) {
							r.getColumns()[12].setVisible(false)
						} else {
							r.getColumns()[12].setVisible(true)
						}
					}
				}
			}
		}
	})
});