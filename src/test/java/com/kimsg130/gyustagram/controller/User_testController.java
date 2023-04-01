package com.kimsg130.gyustagram.controller;

import com.kimsg130.gyustagram.model.User_test;
import com.kimsg130.gyustagram.service.User_testService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/user_test")
public class User_testController {
    private User_testService user_testService;

    @PostMapping
    public ResponseEntity<User_test> createUser_test(@RequestBody User_test user_test){
        User_test savedUser_test = user_testService.createUser_test(user_test);
        return new ResponseEntity<>(savedUser_test, HttpStatus.CREATED);
    }

    @GetMapping("{num}")
    public ResponseEntity<User_test> getUser_testById(@PathVariable("num") Long u_num){
        User_test user_test = user_testService.getUser_testByU_num(u_num);
        return new ResponseEntity<>(user_test, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<User_test>> getAllUser_test(){
        List<User_test> users = user_testService.getAllUser_test();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PutMapping("{num}")
    public ResponseEntity<User_test> updateUser_test(@PathVariable("num") Long u_num,
                                                     @RequestBody User_test user_test){
        user_test.setU_num(u_num);
        User_test updatedUser = user_testService.updateUser_test(user_test);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("{num}")
    public ResponseEntity<String> deleteUser_test(@PathVariable("num") Long u_num) {
        user_testService.deleteUser_test(u_num);
        return new ResponseEntity<>("Successfully deleted!", HttpStatus.OK);
    }
}

