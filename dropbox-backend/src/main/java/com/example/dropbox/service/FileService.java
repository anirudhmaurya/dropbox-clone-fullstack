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

    // Configurable storage location for files
    @Value("${file.storage.location}")
    private String storageLocation;

    public FileService(FileMetadataRepository repository) {
        this.repository = repository;
    }

    /**
     * Saves a file to the storage location and stores metadata in the database.
     * @param file MultipartFile to save.
     * @return File metadata saved in the database.
     * @throws IOException if file saving fails.
     */
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

    /**
     * Retrieves a list of all uploaded files from the database.
     * @return List of file metadata.
     */
    public List<FileMetadata> listFiles() {
        return repository.findAll();
    }

    /**
     * Retrieves the file path of a given filename.
     * @param fileName Name of the file to locate.
     * @return Path to the file.
     */
    public Path getFile(String fileName) {
        return Paths.get(storageLocation).resolve(fileName).normalize();
    }

    /**
     * Deletes a file by its ID.
     * @param id ID of the file to delete.
     * @return True if deletion was successful, false otherwise.
     */
    public void deleteFile(Long id) throws IOException {
        FileMetadata metadata = repository.findById(id)
                .orElseThrow(() -> new NoSuchFileException("File with ID " + id + " not found"));
        
        Path filePath = Paths.get(storageLocation, metadata.getFileName());
        Files.deleteIfExists(filePath); // Delete the file from storage
        repository.deleteById(id); // Remove the metadata from the database
    }
    
}