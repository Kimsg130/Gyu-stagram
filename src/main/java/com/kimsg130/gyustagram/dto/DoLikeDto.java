package com.kimsg130.gyustagram.dto;

import lombok.Data;

@Data
public class DoLikeDto {
    private String userId;
    private int sendingLikesId;
    private String kind;
}
