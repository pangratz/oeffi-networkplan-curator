package com.pangratz.oeffinpc.rest;

import org.restlet.data.MediaType;
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

	@Override
	protected void doInit() throws ResourceException {
		super.doInit();

		this.mModelUtils = ModelUtils.getInstance();
	}

}
