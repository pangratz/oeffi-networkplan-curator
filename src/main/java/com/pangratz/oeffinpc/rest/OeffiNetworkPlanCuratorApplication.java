package com.pangratz.oeffinpc.rest;

import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.routing.Router;

public class OeffiNetworkPlanCuratorApplication extends Application {

	@Override
	public Restlet createInboundRoot() {
		Router router = new Router(getContext());
		router.attach("/networkplan", NetworkPlansResource.class);
		router.attach("/networkplan/{networkPlanId}", NetworkPlanResource.class);
		router.attach("/networkplanentry/{stationId}", NetworkPlanEntryResource.class);
		return router;
	}

}
