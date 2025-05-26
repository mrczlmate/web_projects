package com.tasktracker.service;

import com.tasktracker.dto.TaskRequest;
import com.tasktracker.dto.TaskResponse;
import com.tasktracker.model.Task;
import com.tasktracker.model.TaskStatus;
import com.tasktracker.model.User;
import com.tasktracker.repository.TaskRepository;
import com.tasktracker.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public TaskResponse createTask(TaskRequest taskRequest) {
        Task task = new Task();
        task.setTitle(taskRequest.getTitle());
        task.setDescription(taskRequest.getDescription());
        task.setOwner(getCurrentUser());
        task.setStatus(TaskStatus.TO_DO);
        task.setCreatedAt(java.time.LocalDateTime.now());

        return toDto(taskRepository.save(task));
    }

    public List<TaskResponse> getAllTasks() {
        return taskRepository.findByOwner(getCurrentUser())
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<TaskResponse> getTasksByStatus(TaskStatus status) {
        return taskRepository.findByOwnerAndStatus(getCurrentUser(), status)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public TaskResponse updateTask(Long id, TaskRequest request) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getOwner().getUsername().equals(getCurrentUser().getUsername())) {
            throw new RuntimeException("You are not owner of this task");
        }

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());

        return toDto(taskRepository.save(task));
    }

    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getOwner().getUsername().equals(getCurrentUser().getUsername())) {
            throw new RuntimeException("You are not owner of this task");
        }
        taskRepository.delete(task);
    }

    private TaskResponse toDto(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getCreatedAt());
    }
}
