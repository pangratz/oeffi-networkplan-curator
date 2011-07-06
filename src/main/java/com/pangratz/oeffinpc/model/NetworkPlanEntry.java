package com.pangratz.oeffinpc.model;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import org.json.JSONObject;
import org.json.JSONString;

@PersistenceCapable(detachable = "true")
public class NetworkPlanEntry implements JSONString {

	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Long key;

	@Persistent
	private Long networkPlanKey;

	@Persistent
	private String stationId;

	@Persistent
	private String name;

	@Persistent
	private int x;

	@Persistent
	private int y;

	public Long getKey() {
		return key;
	}

	public String getName() {
		return name;
	}

	public Long getNetworkPlanKey() {
		return networkPlanKey;
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

	public void setKey(Long key) {
		this.key = key;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setNetworkPlanKey(Long networkPlanKey) {
		this.networkPlanKey = networkPlanKey;
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
