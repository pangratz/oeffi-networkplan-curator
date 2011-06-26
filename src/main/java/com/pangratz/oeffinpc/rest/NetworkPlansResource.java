package com.pangratz.oeffinpc.rest;

import java.util.List;

import org.json.JSONArray;
import org.restlet.data.Status;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.representation.Variant;
import org.restlet.resource.ResourceException;

import com.pangratz.oeffinpc.model.NetworkPlan;

public class NetworkPlansResource extends OeffiNpcServerResource {

	@Override
	protected Representation get(Variant variant) throws ResourceException {
		List<NetworkPlan> networkPlans = mModelUtils.getNetworkPlans();
		if (networkPlans.isEmpty()) {
			setStatus(Status.CLIENT_ERROR_NOT_FOUND);
			return null;
		}

		JSONArray arr = new JSONArray(networkPlans);
		return new JsonRepresentation(arr);
	}
}
