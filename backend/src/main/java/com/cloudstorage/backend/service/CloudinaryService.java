package com.cloudstorage.backend.service;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class CloudinaryService {

    @Value("${cloudinary.cloudName}")
    private String cloudName;

    @Value("${cloudinary.apiKey}")
    private String apiKey;

    @Value("${cloudinary.apiSecret}")
    private String apiSecret;

    private Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", cloudName);
        config.put("api_key", apiKey);
        config.put("api_secret", apiSecret);
        return new Cloudinary(config);
    }

    public Map<String, Object> generateUploadSignature() {
        long timestamp = System.currentTimeMillis() / 1000L;
        String publicId = UUID.randomUUID().toString();

        Map<String, Object> paramsToSign = new HashMap<>();
        paramsToSign.put("timestamp", timestamp);
        paramsToSign.put("public_id", publicId);

        String signature = cloudinary().apiSignRequest(paramsToSign, apiSecret);

        Map<String, Object> result = new HashMap<>();
        result.put("cloudName", cloudName);
        result.put("apiKey", apiKey);
        result.put("timestamp", timestamp);
        result.put("publicId", publicId);
        result.put("signature", signature);
        return result;
    }
}