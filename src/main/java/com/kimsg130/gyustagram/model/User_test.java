package com.kimsg130.gyustagram.model;

import jakarta.persistence.*;
import lombok.*;

@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User_test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long u_num;

    @Column(length = 100, nullable = false)
    private String userName;
}
