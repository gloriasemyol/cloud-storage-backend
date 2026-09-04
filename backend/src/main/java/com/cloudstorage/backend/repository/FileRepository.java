package com.cloudstorage.backend.repository;

import com.cloudstorage.backend.model.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long> {
    List<FileEntity> findByOwnerIdAndTrashedFalseAndNameContainingIgnoreCase(Long ownerId, String query);
}