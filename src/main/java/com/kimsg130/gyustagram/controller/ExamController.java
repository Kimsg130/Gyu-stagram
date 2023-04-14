package com.kimsg130.gyustagram.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ExamController {
    @GetMapping("welcome")
    public String welcome(Model model){
        model.addAttribute("data", "hello!!!!!!!!");
        return "welcome";
    }

}
