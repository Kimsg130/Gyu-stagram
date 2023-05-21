package com.kimsg130.gyustagram.dto;

import lombok.Data;

import java.util.Map;

@Data
public class PostingDto {
    private String userId;
    private String explains;
    private String images;
    private Map<Integer, String> images_json;
}
