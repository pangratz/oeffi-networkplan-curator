package com.pangratz.oeffinpc.rest;

import java.util.HashMap;
import java.util.Map;

import org.restlet.data.MediaType;
import org.restlet.data.Status;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.representation.Variant;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

import com.pangratz.oeffinpc.model.ModelUtils;

public abstract class OeffiNpcServerResource extends ServerResource {

	protected ModelUtils mModelUtils;

	public OeffiNpcServerResource() {
		super();

		getVariants().add(new Variant(MediaType.APPLICATION_JSON));
	}

	protected Representation createErrorRepresentation(String errorMsg) {
		Map<Object, Object> data = new HashMap<Object, Object>();
		data.put("errorMsg", errorMsg);
		return new JsonRepresentation(data);
	}

	protected Representation createResourceCreatedRepresentation(String id) {
		setStatus(Status.SUCCESS_CREATED);
		Representation result = new StringRepresentation("created");
		return result;
	}

	protected Representation createResourceUpdatedRepresentation(String stationId) {
		setStatus(Status.SUCCESS_NO_CONTENT);
		Representation result = new StringRepresentation("updated");
		return result;
	}

	@Override
	protected void doInit() throws ResourceException {
		super.doInit();

		this.mModelUtils = ModelUtils.getInstance();
	}
}
