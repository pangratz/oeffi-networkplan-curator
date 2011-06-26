package com.pangratz.oeffinpc.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.data.MediaType;
import org.restlet.data.Method;
import org.restlet.data.Status;
import org.restlet.ext.freemarker.TemplateRepresentation;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.representation.Variant;
import org.restlet.resource.ResourceException;

import com.pangratz.oeffinpc.model.NetworkPlan;
import com.pangratz.oeffinpc.model.NetworkPlanEntry;

import freemarker.cache.ClassTemplateLoader;
import freemarker.template.Configuration;

public class NetworkPlanResource extends OeffiNpcServerResource {

	private String mNetworkPlanId;

	@Override
	protected void doInit() throws ResourceException {
		super.doInit();

		this.mNetworkPlanId = (String) getRequest().getAttributes().get("networkPlanId");

		getVariants(Method.GET).add(new Variant(MediaType.TEXT_CSV));
		getVariants(Method.GET).add(new Variant(MediaType.APPLICATION_JSON));
		getVariants(Method.POST).add(new Variant(MediaType.APPLICATION_JSON));
	}

	@Override
	protected Representation get(Variant variant) throws ResourceException {
		NetworkPlan networkPlan = mModelUtils.getNetworkPlan(mNetworkPlanId);
		List<NetworkPlanEntry> entries = mModelUtils.getNetworkPlanEntries(mNetworkPlanId);

		if (MediaType.TEXT_CSV.equals(variant.getMediaType())) {
			String templateName = "template.tfl";
			Configuration config = new Configuration();
			ClassTemplateLoader ctl = new ClassTemplateLoader(getClass(), "/com/pangratz/oeffinpc");
			config.setTemplateLoader(ctl);
			Map<String, Object> model = new HashMap<String, Object>();
			model.put("networkPlan", networkPlan);
			model.put("entries", entries);
			return new TemplateRepresentation(templateName, config, model, MediaType.TEXT_CSV);
		}

		JSONObject networkPlanObj = new JSONObject(networkPlan);
		try {
			networkPlanObj.put("entries", entries);
			return new JsonRepresentation(networkPlanObj);
		} catch (JSONException e) {
			e.printStackTrace();
			return createErrorRepresentation(e.getMessage());
		}
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

			return createResourceCreatedRepresentation(networkPlanEntry.getStationId());
		} catch (Exception e) {
			setStatus(Status.SERVER_ERROR_INTERNAL);
		}

		return createErrorRepresentation("error while creating NetworkPlanEntry");
	}
}
