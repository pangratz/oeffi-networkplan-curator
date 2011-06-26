package com.pangratz.oeffinpc.model;

import org.json.JSONObject;
import org.json.JSONString;

public class NetworkPlan implements JSONString {

	private String networkId;
	private String planId;
	private String imageUrl;

	public String getImageUrl() {
		return imageUrl;
	}

	public String getNetworkId() {
		return networkId;
	}

	public String getPlanId() {
		return planId;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public void setNetworkId(String networkId) {
		this.networkId = networkId;
	}

	public void setPlanId(String planId) {
		this.planId = planId;
	}

	@Override
	public String toJSONString() {
		return new JSONObject(this).toString();
	}

}
