package com.example.dropbox.service;

import com.example.dropbox.model.FileMetadata;
import com.example.dropbox.repository.FileMetadataRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@Service
public class FileService {
    private final FileMetadataRepository repository;

    @Value("${file.storage.location}")
    private String storageLocation;

    public FileService(FileMetadataRepository repository) {
        this.repository = repository;
    }

    public FileMetadata saveFile(MultipartFile file) throws IOException {
        // Validate file type and size
        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(storageLocation, fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        FileMetadata metadata = new FileMetadata();
        metadata.setFileName(fileName);
        metadata.setFileType(file.getContentType());
        metadata.setFileSize(file.getSize());
        return repository.save(metadata);
    }

    public List<FileMetadata> listFiles() {
        return repository.findAll();
    }

    public Path getFile(String fileName) {
        return Paths.get(storageLocation).resolve(fileName).normalize();
    }

    public void deleteFile(Long id) throws IOException {
        FileMetadata metadata = repository.findById(id)
                .orElseThrow(() -> new NoSuchFileException("File with ID " + id + " not found"));
        
        Path filePath = Paths.get(storageLocation, metadata.getFileName());
        Files.deleteIfExists(filePath); // Delete the file from storage
        repository.deleteById(id); // Remove the metadata from the database
    }
    
}