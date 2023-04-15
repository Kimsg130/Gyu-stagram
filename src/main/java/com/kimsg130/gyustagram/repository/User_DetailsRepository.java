package com.kimsg130.gyustagram.repository;

import com.kimsg130.gyustagram.model.User;
import com.kimsg130.gyustagram.model.User_Details;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface User_DetailsRepository extends JpaRepository<User_Details, String> {
    Optional<User> findByUserId(String userid);
}
