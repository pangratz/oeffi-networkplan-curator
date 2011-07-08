package com.pangratz.oeffinpc.rest;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;

import junit.framework.TestCase;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.multipart.ByteArrayPartSource;
import org.apache.commons.httpclient.methods.multipart.FilePart;
import org.apache.commons.httpclient.methods.multipart.MultipartRequestEntity;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.commons.httpclient.methods.multipart.PartSource;

public class PostFileTest extends TestCase {

	public void testUploadFile() {
		try {
			HttpClient httpClient = new HttpClient();
			String csvFileName = "/berlin_tram.csv";
			InputStream stream = PostFileTest.class.getResourceAsStream(csvFileName);
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			byte[] buff = new byte[1024];
			while (stream.read(buff) != -1) {
				baos.write(buff);
			}
			PartSource fileSource = new ByteArrayPartSource(csvFileName, baos.toByteArray());

			PostMethod post = new PostMethod("http://localhost:8080/networkplans/3011");
			FilePart filePart = new FilePart(csvFileName, fileSource);
			filePart.setTransferEncoding("utf-8");
			Part[] parts = { filePart };
			post.setRequestEntity(new MultipartRequestEntity(parts, post.getParams()));

			httpClient.executeMethod(post);
			byte[] responseBody = post.getResponseBody();
			System.out.println(new String(responseBody));
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}
