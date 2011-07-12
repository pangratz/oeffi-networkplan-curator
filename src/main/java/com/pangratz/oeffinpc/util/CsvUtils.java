package com.pangratz.oeffinpc.util;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.LinkedList;
import java.util.List;

import au.com.bytecode.opencsv.CSVReader;

import com.pangratz.oeffinpc.model.NetworkPlanEntry;

public class CsvUtils {

	private static final CsvUtils instance = new CsvUtils();

	public static CsvUtils getInstance() {
		return instance;
	}

	public List<NetworkPlanEntry> readCsv(InputStream inStream) {
		Reader reader = new InputStreamReader(inStream);
		CSVReader csvReader = new CSVReader(reader, '|');
		String[] next = null;
		List<NetworkPlanEntry> entries = new LinkedList<NetworkPlanEntry>();
		try {
			while ((next = csvReader.readNext()) != null) {
				if (next != null && next.length == 6 && !next[0].startsWith("#")) {
					NetworkPlanEntry entry = new NetworkPlanEntry();
					entry.setStationId(next[1]);
					entry.setName(next[2]);
					entry.setX(Integer.parseInt(next[4]));
					entry.setY(Integer.parseInt(next[5]));
					entries.add(entry);
				}
			}
		} catch (Exception e) {
			throw new IllegalStateException(e);
		}
		return entries;
	}

}
