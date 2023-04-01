package com.kimsg130.gyustagram.model;

import com.kimsg130.gyustagram.dto.SignUpDto;
import jakarta.persistence.*;
import lombok.*;

@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User { //유저테이블
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String email;

    @Column(length = 20, nullable = false)
    private String phone;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(length = 100, nullable = false)
    private String nickname;

    @Column(length = 100, nullable = true)
    private String comment;

    @Column(length = 100, nullable = true)
    private String image;

    public User(SignUpDto dto) {
        this.email = dto.getEmail();
        this.phone = dto.getPhone();
        this.password = dto.getPassword();
        this.name = dto.getName();
        this.nickname = dto.getNickname();
    }
}
