package com.pangratz.oeffinpc.rest;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.json.JSONObject;
import org.restlet.data.MediaType;
import org.restlet.data.Method;
import org.restlet.data.Status;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.ext.servlet.ServletUtils;
import org.restlet.representation.Representation;
import org.restlet.representation.Variant;
import org.restlet.resource.ResourceException;

import com.pangratz.oeffinpc.model.NetworkPlan;
import com.pangratz.oeffinpc.model.NetworkPlanEntry;
import com.pangratz.oeffinpc.util.CsvUtils;

public class NetworkPlanResource extends OeffiNpcServerResource {

	private Long mNetworkPlanId;

	private Representation handleCsvFilePost(Representation entity) {
		// implemented as described here:
		// http://wiki.restlet.org/docs_2.1/13-restlet/28-restlet/64-restlet.html
		// and here:
		// http://code.google.com/appengine/kb/java.html#fileforms

		try {
			ServletFileUpload upload = new ServletFileUpload();
			FileItemIterator iterator = upload.getItemIterator(ServletUtils.getRequest(getRequest()));
			while (iterator.hasNext()) {
				FileItemStream fileItemStream = iterator.next();
				List<NetworkPlanEntry> entries = CsvUtils.getInstance().readCsv(fileItemStream.openStream());
				int numberOfEntries = this.mModelUtils.storeNetworkPlanEntries(mNetworkPlanId, entries);
				Map<Object, Object> dataMap = new HashMap<Object, Object>();
				dataMap.put("numberOfSavedEntries", numberOfEntries);
				return new JsonRepresentation(dataMap);
			}

			return createErrorRepresentation("no files uploaded");
		} catch (FileUploadException e) {
			e.printStackTrace();
			return createErrorRepresentation("error while uploading file: " + e.getMessage());
		} catch (IOException e) {
			e.printStackTrace();
			return createErrorRepresentation("error while parsing uploaded CSV file: " + e.getMessage());
		}

	}

	private Representation handleJsonPost(Representation entity) {
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

	@Override
	protected void doInit() throws ResourceException {
		super.doInit();

		String stringVal = (String) getRequest().getAttributes().get("networkPlanId");
		System.out.println("NetworkPlanResource#stringVal = " + stringVal);
		this.mNetworkPlanId = Long.valueOf(stringVal);

		getVariants(Method.GET).add(new Variant(MediaType.APPLICATION_JSON));
		getVariants(Method.POST).add(new Variant(MediaType.APPLICATION_JSON));
		getVariants(Method.POST).add(new Variant(MediaType.MULTIPART_FORM_DATA));
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
		Representation result = null;
		System.out.println(variant);
		if (entity != null) {
			if (MediaType.MULTIPART_FORM_DATA.equals(entity.getMediaType(), true)) {
				result = handleCsvFilePost(entity);
			} else if (MediaType.APPLICATION_JSON.equals(entity.getMediaType(), true)) {
				result = handleJsonPost(entity);
			}
		}
		return result;
	}
}
