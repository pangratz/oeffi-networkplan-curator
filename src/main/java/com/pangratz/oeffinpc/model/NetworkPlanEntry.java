package com.pangratz.oeffinpc.model;

import org.json.JSONObject;
import org.json.JSONString;

public class NetworkPlanEntry implements JSONString {

	private String networkId;
	private String stationId;
	private String name;
	private int x;
	private int y;

	public String getName() {
		return name;
	}

	public String getNetworkId() {
		return networkId;
	}

	public String getStationId() {
		return stationId;
	}

	public int getX() {
		return x;
	}

	public int getY() {
		return y;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setNetworkId(String networkId) {
		this.networkId = networkId;
	}

	public void setStationId(String stationId) {
		this.stationId = stationId;
	}

	public void setX(int x) {
		this.x = x;
	}

	public void setY(int y) {
		this.y = y;
	}

	@Override
	public String toJSONString() {
		return new JSONObject(this).toString();
	}

}
