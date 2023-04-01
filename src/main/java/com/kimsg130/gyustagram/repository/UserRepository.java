package com.kimsg130.gyustagram.repository;

import com.kimsg130.gyustagram.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // email로 찾기
}
