package com.tasktracker.repository;

import com.tasktracker.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByOwner(User owner);
    List<Task> findByOwnerAndStatus(User owner, TaskStatus status);
}
