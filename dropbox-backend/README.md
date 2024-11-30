# Dropbox-like-app-Backend

This is a **Spring Boot** application for managing files. It provides APIs to upload, list, download, and delete files.

---

## Features

1. **Upload Files**: Accepts and stores files on the server.
2. **List Files**: Retrieves a list of uploaded files with metadata.
3. **Download Files**: Allows downloading files by filename.
4. **Delete Files**: Deletes a file using its ID.

---

## Technologies Used

- **Spring Boot**
- **H2 Database** (for metadata storage)
- **Java 17**
- **Maven**

---

## Endpoints

| HTTP Method | Endpoint                   | Description                       |
|-------------|----------------------------|-----------------------------------|
| `POST`      | `/api/files/upload`        | Upload a file                    |
| `GET`       | `/api/files`               | List all uploaded files          |
| `GET`       | `/api/files/{fileName}`    | Download a file by filename      |
| `DELETE`    | `/api/files/delete/{id}`   | Delete a file by ID              |

---

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd dropbox-clone-fullstack/dropbox-backend

2. **Run the application**:
   ```bash
   mvn spring-boot:clean
   mvn spring-boot:build
   mvn spring-boot:run

---

## Access the backend APIs

1. Upload Files: http://localhost:8080/api/files/upload
2. List Files: http://localhost:8080/api/files
3. Download Files: http://localhost:8080/api/files/{fileName}
4. Delete Files: http://localhost:8080/api/files/delete/{id}
