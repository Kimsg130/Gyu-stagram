package com.kimsg130.gyustagram.dto;

import lombok.Data;

@Data
public class FollowDto {
    private String userId;
    private int f_id;

    public FollowDto(String userId, int f_id) {
        this.userId = userId;
        this.f_id = f_id;
    }
}
