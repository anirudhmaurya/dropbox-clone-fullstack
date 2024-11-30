package com.example.dropbox.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // This will allow all paths starting with "/api/" to be accessed from the frontend (localhost:3000)
        registry.addMapping("/api/**")  // Allows all endpoints starting with "/api/"
                .allowedOrigins("http://localhost:3000")  // Your React app URL
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // HTTP methods allowed
                .allowedHeaders("*")  // Allow all headers
                .allowCredentials(true);  // Allow credentials (cookies, authentication)
    }
}
