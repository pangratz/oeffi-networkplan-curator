package com.pangratz.oeffinpc.rest;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.restlet.data.MediaType;
import org.restlet.data.Method;
import org.restlet.data.Status;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.representation.Variant;
import org.restlet.resource.ResourceException;

import com.pangratz.oeffinpc.model.NetworkPlan;

public class NetworkPlansResource extends OeffiNpcServerResource {

	@Override
	protected void doInit() throws ResourceException {
		super.doInit();

		getVariants(Method.GET).add(new Variant(MediaType.APPLICATION_JSON));
		getVariants(Method.POST).add(new Variant(MediaType.APPLICATION_JSON));
	}

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

	@Override
	protected Representation post(Representation entity, Variant variant) throws ResourceException {
		JsonRepresentation represent;
		try {
			represent = new JsonRepresentation(entity);
			JSONObject json = represent.getJsonObject();

			NetworkPlan networkPlan = new NetworkPlan();
			networkPlan.setImageUrl(json.getString("imageUrl"));
			networkPlan.setImageWidth(json.getInt("imageWidth"));
			networkPlan.setImageHeight(json.getInt("imageHeight"));
			networkPlan.setNetworkId(json.getString("networkId"));
			networkPlan.setPlanId(json.getString("planId"));

			mModelUtils.storeNetworkPlan(networkPlan);

			return createResourceCreatedRepresentation(networkPlan);
		} catch (Exception e) {
			e.printStackTrace();
			setStatus(Status.SERVER_ERROR_INTERNAL, e);
		}

		return createErrorRepresentation("error while storing NetworkPlan");
	}
}
