package com.cloudstorage.backend.repository;

import com.cloudstorage.backend.model.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FileRepository extends JpaRepository<FileEntity, Long> {
    List<FileEntity> findByOwnerIdAndTrashedFalse(Long ownerId);
    List<FileEntity> findByOwnerIdAndTrashedFalseAndNameContainingIgnoreCase(Long ownerId, String query);
}