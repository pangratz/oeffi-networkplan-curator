package com.pangratz.oeffinpc.rest;

import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.routing.Router;

public class OeffiNetworkPlanCuratorApplication extends Application {

	@Override
	public Restlet createInboundRoot() {
		Router router = new Router(getContext());
		router.attach("/networkplans", NetworkPlansResource.class);
		router.attach("/networkplans/{networkPlanId}", NetworkPlanResource.class);
		router.attach("/networkplanentries/{stationId}", NetworkPlanEntryResource.class);
		return router;
	}

}
