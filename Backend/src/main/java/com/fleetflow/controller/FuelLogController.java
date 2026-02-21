package com.fleetflow.controller;

import com.fleetflow.dto.FuelLogRequest;
import com.fleetflow.entity.FuelLog;
import com.fleetflow.service.FuelLogService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/fuel")
public class FuelLogController {
    private final FuelLogService fuelLogService;

    public FuelLogController(FuelLogService fuelLogService) {
        this.fuelLogService = fuelLogService;
    }

    @GetMapping
    public ResponseEntity<List<FuelLog>> getAllFuelLogs() {
        return ResponseEntity.ok(fuelLogService.getAllFuelLogs());
    }

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<FuelLog>> getFuelLogsByVehicle(@PathVariable String vehicleId) {
        return ResponseEntity.ok(fuelLogService.getFuelLogsByVehicle(vehicleId));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('FLEET_MANAGER', 'DISPATCHER', 'FINANCIAL_ANALYST', 'ADMIN')")
    public ResponseEntity<FuelLog> createFuelLog(@Valid @RequestBody FuelLogRequest request) {
        return ResponseEntity.ok(fuelLogService.createFuelLog(request));
    }

    @GetMapping("/vehicle/{vehicleId}/total-cost")
    public ResponseEntity<BigDecimal> getTotalFuelCostByVehicle(@PathVariable String vehicleId) {
        return ResponseEntity.ok(fuelLogService.getTotalFuelCostByVehicle(vehicleId));
    }

    @GetMapping("/total-cost")
    public ResponseEntity<BigDecimal> getTotalFuelCost() {
        return ResponseEntity.ok(fuelLogService.getTotalFuelCost());
    }

    @GetMapping("/vehicle/{vehicleId}/total-liters")
    public ResponseEntity<Double> getTotalLitersByVehicle(@PathVariable String vehicleId) {
        return ResponseEntity.ok(fuelLogService.getTotalLitersByVehicle(vehicleId));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('FLEET_MANAGER', 'ADMIN')")
    public ResponseEntity<Void> deleteFuelLog(@PathVariable String id) {
        fuelLogService.deleteFuelLog(id);
        return ResponseEntity.noContent().build();
    }
}
