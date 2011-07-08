package com.pangratz.oeffinpc.rest;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.json.JSONObject;
import org.restlet.data.MediaType;
import org.restlet.data.Method;
import org.restlet.data.Status;
import org.restlet.ext.fileupload.RestletFileUpload;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.representation.Variant;
import org.restlet.resource.ResourceException;

import au.com.bytecode.opencsv.CSVReader;

import com.pangratz.oeffinpc.model.NetworkPlan;
import com.pangratz.oeffinpc.model.NetworkPlanEntry;

public class NetworkPlanResource extends OeffiNpcServerResource {

	private Long mNetworkPlanId;

	private Representation handleCsvFilePost(Representation entity) {
		// implemented as described here:
		// http://wiki.restlet.org/docs_2.1/13-restlet/28-restlet/64-restlet.html

		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setSizeThreshold(1000 * 1024);

		RestletFileUpload upload = new RestletFileUpload(factory);
		List<FileItem> items;

		try {
			items = upload.parseRequest(getRequest());
			if (items != null && items.size() == 1) {
				FileItem file = items.get(0);
				Reader reader = new InputStreamReader(file.getInputStream());
				CSVReader csvReader = new CSVReader(reader, '|');
				String[] next = null;
				List<NetworkPlanEntry> entries = new LinkedList<NetworkPlanEntry>();
				while ((next = csvReader.readNext()) != null) {
					System.out.println(Arrays.toString(next));
					if (next != null && next.length == 6) {
						NetworkPlanEntry entry = new NetworkPlanEntry();
						entry.setStationId(next[1]);
						entry.setName(next[2]);
						entry.setX(Integer.parseInt(next[4]));
						entry.setY(Integer.parseInt(next[5]));
						entries.add(entry);
					}
				}
				int numberOfEntries = this.mModelUtils.storeNetworkPlanEntries(mNetworkPlanId, entries);
				Map<Object, Object> dataMap = new HashMap<Object, Object>();
				dataMap.put("numberOfSavedEntries", numberOfEntries);
				return new JsonRepresentation(dataMap);
			}
		} catch (FileUploadException e) {
			e.printStackTrace();
			return createErrorRepresentation("error while uploading file: " + e.getMessage());
		} catch (IOException e) {
			e.printStackTrace();
			return createErrorRepresentation("error while parsing uploaded CSV file: " + e.getMessage());
		}

		String text = "uploaded " + items.size() + " files";
		return new StringRepresentation(text);
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

		getVariants(Method.GET).add(new Variant(MediaType.TEXT_CSV));
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
