package com.pangratz.oeffinpc.util;

import java.io.InputStream;
import java.util.List;

import junit.framework.TestCase;

import com.pangratz.oeffinpc.model.NetworkPlanEntry;

public class CsvUtilTest extends TestCase {

	private CsvUtils csvUtils;

	public void testReadCsv() {
		InputStream inputStream = CsvUtilTest.class.getResourceAsStream("/bonn_schnellverkehr.csv");
		List<NetworkPlanEntry> entries = this.csvUtils.readCsv(inputStream);
		assertNotNull(entries);
		assertTrue(entries.size() > 0);
	}

	@Override
	protected void setUp() throws Exception {
		super.setUp();
		this.csvUtils = CsvUtils.getInstance();
	}

	@Override
	protected void tearDown() throws Exception {
		super.tearDown();
		this.csvUtils = null;
	}

}
