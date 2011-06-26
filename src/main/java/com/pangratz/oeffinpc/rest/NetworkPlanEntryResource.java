package com.pangratz.oeffinpc.rest;

import org.restlet.data.Status;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.representation.Variant;
import org.restlet.resource.ResourceException;

import com.pangratz.oeffinpc.model.NetworkPlanEntry;

public class NetworkPlanEntryResource extends OeffiNpcServerResource {

	private String mNetworkPlanId;
	private String mStationId;

	@Override
	protected void doInit() throws ResourceException {
		super.doInit();

		this.mNetworkPlanId = (String) getRequest().getAttributes().get("networkPlanId");
		this.mStationId = (String) getRequest().getAttributes().get("stationId");
	}

	@Override
	protected Representation get(Variant variant) throws ResourceException {
		NetworkPlanEntry networkPlanEntry = mModelUtils.getNetworkPlanEntry(mNetworkPlanId, mStationId);
		if (networkPlanEntry == null) {
			setStatus(Status.CLIENT_ERROR_NOT_FOUND);
			return createErrorRepresentation("NetworkPlanEntry with given id not found");
		}

		return new JsonRepresentation(networkPlanEntry);
	}

}
