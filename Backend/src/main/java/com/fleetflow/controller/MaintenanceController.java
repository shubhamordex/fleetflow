package com.fleetflow.controller;

import com.fleetflow.dto.MaintenanceRequest;
import com.fleetflow.entity.MaintenanceLog;
import com.fleetflow.service.MaintenanceService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {
    private final MaintenanceService maintenanceService;

    public MaintenanceController(MaintenanceService maintenanceService) {
        this.maintenanceService = maintenanceService;
    }

    @GetMapping
    public ResponseEntity<List<MaintenanceLog>> getAllMaintenanceLogs() {
        return ResponseEntity.ok(maintenanceService.getAllMaintenanceLogs());
    }

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<MaintenanceLog>> getMaintenanceLogsByVehicle(@PathVariable String vehicleId) {
        return ResponseEntity.ok(maintenanceService.getMaintenanceLogsByVehicle(vehicleId));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('FLEET_MANAGER', 'ADMIN')")
    public ResponseEntity<MaintenanceLog> createMaintenanceLog(@Valid @RequestBody MaintenanceRequest request) {
        return ResponseEntity.ok(maintenanceService.createMaintenanceLog(request));
    }

    @GetMapping("/vehicle/{vehicleId}/total-cost")
    public ResponseEntity<BigDecimal> getTotalMaintenanceCostByVehicle(@PathVariable String vehicleId) {
        return ResponseEntity.ok(maintenanceService.getTotalMaintenanceCostByVehicle(vehicleId));
    }

    @GetMapping("/total-cost")
    public ResponseEntity<BigDecimal> getTotalMaintenanceCost() {
        return ResponseEntity.ok(maintenanceService.getTotalMaintenanceCost());
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('FLEET_MANAGER', 'ADMIN')")
    public ResponseEntity<MaintenanceLog> updateStatus(@PathVariable String id, @RequestParam String status) {
        return ResponseEntity.ok(maintenanceService.updateMaintenanceStatus(id, status));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('FLEET_MANAGER', 'ADMIN')")
    public ResponseEntity<Void> deleteMaintenanceLog(@PathVariable String id) {
        maintenanceService.deleteMaintenanceLog(id);
        return ResponseEntity.noContent().build();
    }
}
