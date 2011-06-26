package com.pangratz.oeffinpc.model;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;

public class ModelUtils {

	private static final ModelUtils INSTANCE = new ModelUtils();

	public static ModelUtils getInstance() {
		return INSTANCE;
	}

	private DatastoreService mDatastore;

	private ModelUtils() {
		super();

		mDatastore = DatastoreServiceFactory.getDatastoreService();
	}

	public NetworkPlan getNetworkPlan(String networkId) {
		Query q = new Query(NetworkPlan.class.getSimpleName());
		q.addFilter("networkId", Query.FilterOperator.EQUAL, networkId);

		PreparedQuery preparedQuery = mDatastore.prepare(q);
		Entity entity = preparedQuery.asSingleEntity();

		return extractNetworkPlan(entity);
	}

	public List<NetworkPlanEntry> getNetworkPlanEntries(String networkId) {
		Query query = new Query(NetworkPlanEntry.class.getSimpleName());
		query.addFilter("networkId", Query.FilterOperator.EQUAL, networkId);

		PreparedQuery preparedQuery = mDatastore.prepare(query);
		Iterator<Entity> it = preparedQuery.asIterator();
		List<NetworkPlanEntry> entries = new LinkedList<NetworkPlanEntry>();
		while (it.hasNext()) {
			entries.add(extractNetworkPlanEntry(it.next()));
		}
		return entries;
	}

	public NetworkPlanEntry getNetworkPlanEntry(String stationId) {
		Query query = new Query(NetworkPlanEntry.class.getSimpleName());
		query.addFilter("stationId", Query.FilterOperator.EQUAL, stationId);

		PreparedQuery preparedQuery = mDatastore.prepare(query);
		Entity entity = preparedQuery.asSingleEntity();

		return extractNetworkPlanEntry(entity);
	}

	public List<NetworkPlan> getNetworkPlans() {
		Query query = new Query(NetworkPlan.class.getSimpleName());
		PreparedQuery preparedQuery = mDatastore.prepare(query);

		List<NetworkPlan> networkPlans = new LinkedList<NetworkPlan>();
		Iterator<Entity> it = preparedQuery.asIterator();
		while (it.hasNext()) {
			Entity entity = it.next();
			networkPlans.add(extractNetworkPlan(entity));
		}
		return networkPlans;
	}

	public void storeNetworkPlan(NetworkPlan networkPlan) {
		Entity e = createEntity(networkPlan);
		mDatastore.put(e);
	}

	public void storeNetworkPlanEntry(NetworkPlanEntry networkPlanEntry) {
		Entity e = createEntity(networkPlanEntry);
		mDatastore.put(e);
	}

	private Entity createEntity(NetworkPlan networkPlan) {
		Key key = KeyFactory.createKey(NetworkPlan.class.getSimpleName(), networkPlan.getNetworkId());
		Entity e = new Entity(key);
		e.setProperty("networkId", networkPlan.getNetworkId());
		e.setProperty("planId", networkPlan.getPlanId());
		e.setProperty("imageUrl", networkPlan.getImageUrl());
		return e;
	}

	private Entity createEntity(NetworkPlanEntry networkPlanEntry) {
		Key key = KeyFactory.createKey(NetworkPlanEntry.class.getSimpleName(), networkPlanEntry.getStationId());
		Entity e = new Entity(key);

		e.setProperty("networkId", networkPlanEntry.getNetworkId());
		e.setProperty("stationId", networkPlanEntry.getStationId());
		e.setProperty("name", networkPlanEntry.getName());
		e.setProperty("x", Long.valueOf(networkPlanEntry.getX()));
		e.setProperty("y", Long.valueOf(networkPlanEntry.getY()));

		return e;
	}

	private int extractInt(Entity entity, String property) {
		Long value = (Long) entity.getProperty(property);
		return value.intValue();
	}

	private NetworkPlan extractNetworkPlan(Entity entity) {
		if (entity == null)
			return null;

		NetworkPlan networkPlan = new NetworkPlan();
		networkPlan.setImageUrl((String) entity.getProperty("imageUrl"));
		networkPlan.setNetworkId((String) entity.getProperty("networkId"));
		networkPlan.setPlanId((String) entity.getProperty("planId"));
		return networkPlan;
	}

	private NetworkPlanEntry extractNetworkPlanEntry(Entity entity) {
		if (entity == null)
			return null;

		NetworkPlanEntry networkPlanEntry = new NetworkPlanEntry();
		networkPlanEntry.setName((String) entity.getProperty("name"));
		networkPlanEntry.setNetworkId((String) entity.getProperty("networkId"));
		networkPlanEntry.setStationId((String) entity.getProperty("stationId"));

		networkPlanEntry.setX(extractInt(entity, "x"));
		networkPlanEntry.setY(extractInt(entity, "y"));

		return networkPlanEntry;
	}
}
