package com.pangratz.oeffinpc.model;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import org.json.JSONObject;
import org.json.JSONString;

@PersistenceCapable(detachable = "true")
public class NetworkPlan implements JSONString {

	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Long key;

	@Persistent
	private String networkId;

	@Persistent
	private String planId;

	@Persistent
	private String imageUrl;

	@Persistent
	private Integer imageWidth;

	@Persistent
	private Integer imageHeight;

	public Integer getImageHeight() {
		return imageHeight;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public Integer getImageWidth() {
		return imageWidth;
	}

	public Long getKey() {
		return key;
	}

	public String getNetworkId() {
		return networkId;
	}

	public String getPlanId() {
		return planId;
	}

	public void setImageHeight(Integer imageHeight) {
		this.imageHeight = imageHeight;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public void setImageWidth(Integer imageWidth) {
		this.imageWidth = imageWidth;
	}

	public void setKey(Long key) {
		this.key = key;
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
