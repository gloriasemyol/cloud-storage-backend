package com.cloudstorage.backend.repository;

import com.cloudstorage.backend.model.FileEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FileRepository extends JpaRepository<FileEntity, Long> {
    List<FileEntity> findByOwnerIdAndTrashedFalse(Long ownerId);
    
    List<FileEntity> findByOwnerIdAndTrashedTrue(Long ownerId);
    
    Page<FileEntity> findByOwnerIdAndTrashedFalseAndNameContainingIgnoreCase(
        Long ownerId, String query, Pageable pageable
    );

    Page<FileEntity> findByOwnerIdAndTrashedFalseAndNameContainingIgnoreCaseOrderByCreatedAtDesc(
        Long ownerId, String query, Pageable pageable
    );
}