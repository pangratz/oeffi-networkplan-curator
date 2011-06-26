package com.pangratz.oeffinpc.rest;

import org.json.JSONObject;
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
	protected Representation post(Representation entity, Variant variant) throws ResourceException {
		JsonRepresentation represent;
		try {
			represent = new JsonRepresentation(entity);
			JSONObject json = represent.getJsonObject();

			NetworkPlanEntry networkPlanEntry = new NetworkPlanEntry();
			networkPlanEntry.setNetworkId(mNetworkPlanId);
			networkPlanEntry.setName(json.getString("name"));
			networkPlanEntry.setStationId(json.getString("stationId"));
			networkPlanEntry.setX(json.getInt("x"));
			networkPlanEntry.setY(json.getInt("y"));

			mModelUtils.storeNetworkPlanEntry(networkPlanEntry);
		} catch (Exception e) {
			setStatus(Status.SERVER_ERROR_INTERNAL);
		}

		return new JsonRepresentation("{}");
	}

}
