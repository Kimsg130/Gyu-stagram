package com.kimsg130.gyustagram.model;

import com.kimsg130.gyustagram.dto.SignupDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User_Details {

    @Id
    @Column(updatable = false, unique = true, nullable = false)
    private String userId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDateTime regDate;

    @Column
    private String comment;

    @Column
    private String image;

    public User_Details(SignupDto dto) {
        this.userId = dto.getUserId();
        this.email = dto.getEmail();
        this.phone = dto.getPhone();
        this.name = dto.getName();
        this.comment = dto.getComment();
        this.image = dto.getImage();
    }

}
