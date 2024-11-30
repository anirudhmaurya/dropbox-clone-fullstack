package com.example.dropbox.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class FileMetadata {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String fileType;
    private Long fileSize;
}