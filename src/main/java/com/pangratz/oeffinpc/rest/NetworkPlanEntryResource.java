package com.pangratz.oeffinpc.rest;

import java.util.HashMap;
import java.util.Map;

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
	protected Representation delete(Variant variant) throws ResourceException {
		boolean removed = mModelUtils.removeNetworkPlanEntry(mNetworkPlanId, mStationId);
		if (removed) {
			setStatus(Status.SUCCESS_NO_CONTENT);
		} else {
			setStatus(Status.SERVER_ERROR_INTERNAL);
		}

		Map<Object, Object> data = new HashMap<Object, Object>();
		data.put("deleted", removed);
		return new JsonRepresentation(data);
	}

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

	@Override
	protected Representation put(Representation entity, Variant variant) throws ResourceException {
		JsonRepresentation represent;
		try {
			represent = new JsonRepresentation(entity);
			JSONObject json = represent.getJsonObject();

			NetworkPlanEntry networkPlanEntry = new NetworkPlanEntry();
			networkPlanEntry.setNetworkId(mNetworkPlanId);
			networkPlanEntry.setStationId(json.getString("stationId"));

			if (json.has("name")) {
				networkPlanEntry.setName(json.getString("name"));
			}
			if (json.has("x")) {
				networkPlanEntry.setX(json.getInt("x"));
			}
			if (json.has("y")) {
				networkPlanEntry.setY(json.getInt("y"));
			}

			mModelUtils.storeNetworkPlanEntry(networkPlanEntry);

			return super.createResourceUpdatedRepresentation(networkPlanEntry.getStationId());
		} catch (Exception e) {
			e.printStackTrace();
			setStatus(Status.SERVER_ERROR_INTERNAL);
		}

		return createErrorRepresentation("error while updating NetworkPlanEntry");
	}

}
