package com.pangratz.oeffinpc.rest;

import org.json.JSONObject;
import org.restlet.data.MediaType;
import org.restlet.data.Method;
import org.restlet.data.Status;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.representation.Variant;
import org.restlet.resource.ResourceException;

import com.pangratz.oeffinpc.model.NetworkPlan;
import com.pangratz.oeffinpc.model.NetworkPlanEntry;

public class NetworkPlanResource extends OeffiNpcServerResource {

	private Long mNetworkPlanId;

	@Override
	protected void doInit() throws ResourceException {
		super.doInit();

		String stringVal = (String) getRequest().getAttributes().get("networkPlanId");
		System.out.println("NetworkPlanResource#stringVal = " + stringVal);
		this.mNetworkPlanId = Long.valueOf(stringVal);

		getVariants(Method.GET).add(new Variant(MediaType.TEXT_CSV));
		getVariants(Method.GET).add(new Variant(MediaType.APPLICATION_JSON));
		getVariants(Method.POST).add(new Variant(MediaType.APPLICATION_JSON));
	}

	@Override
	protected Representation get(Variant variant) throws ResourceException {
		NetworkPlan networkPlan = mModelUtils.getNetworkPlan(mNetworkPlanId);
		if (networkPlan == null) {
			setStatus(Status.CLIENT_ERROR_NOT_FOUND);
			return createErrorRepresentation("no network plan with id " + mNetworkPlanId);
		}

		JSONObject networkPlanObj = new JSONObject(networkPlan);
		return new JsonRepresentation(networkPlanObj);
	}

	@Override
	protected Representation post(Representation entity, Variant variant) throws ResourceException {
		JsonRepresentation represent;
		try {
			represent = new JsonRepresentation(entity);
			JSONObject json = represent.getJsonObject();

			NetworkPlanEntry networkPlanEntry = new NetworkPlanEntry();
			networkPlanEntry.setNetworkPlanKey(mNetworkPlanId);
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

			return createResourceCreatedRepresentation(networkPlanEntry);
		} catch (Exception e) {
			e.printStackTrace();
			setStatus(Status.SERVER_ERROR_INTERNAL);
		}

		return createErrorRepresentation("error while creating NetworkPlanEntry");
	}
}
