package com.fleetflow.service;

import com.fleetflow.dto.MaintenanceRequest;
import com.fleetflow.entity.MaintenanceLog;
import com.fleetflow.entity.Vehicle;
import com.fleetflow.exception.ResourceNotFoundException;
import com.fleetflow.repository.MaintenanceLogRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MaintenanceService {
    private final MaintenanceLogRepository maintenanceLogRepository;
    private final VehicleService vehicleService;

    public MaintenanceService(MaintenanceLogRepository maintenanceLogRepository, VehicleService vehicleService) {
        this.maintenanceLogRepository = maintenanceLogRepository;
        this.vehicleService = vehicleService;
    }

    public List<MaintenanceLog> getAllMaintenanceLogs() {
        return maintenanceLogRepository.findAll();
    }

    public List<MaintenanceLog> getMaintenanceLogsByVehicle(String vehicleId) {
        return maintenanceLogRepository.findByVehicleId(vehicleId);
    }

    @Transactional
    public MaintenanceLog createMaintenanceLog(MaintenanceRequest request) {
        Vehicle vehicle = vehicleService.getVehicleEntityById(request.getVehicleId());

        MaintenanceLog log = new MaintenanceLog();
        log.setDescription(request.getDescription());
        log.setServiceType(request.getServiceType());
        log.setServiceDate(request.getServiceDate());
        log.setCost(request.getCost());
        log.setOdometerReading(request.getOdometerReading());

        MaintenanceLog.Status status = request.getStatus() != null
                ? MaintenanceLog.Status.valueOf(request.getStatus().toUpperCase())
                : MaintenanceLog.Status.IN_PROGRESS;
        log.setStatus(status);
        log.setVehicle(vehicle);

        if (status == MaintenanceLog.Status.COMPLETED) {
            vehicle.setStatus(Vehicle.Status.AVAILABLE);
            if (request.getOdometerReading() != null) {
                vehicle.setOdometer(request.getOdometerReading());
            }
        } else {
            vehicle.setStatus(Vehicle.Status.IN_SHOP);
        }

        return maintenanceLogRepository.save(log);
    }

    @Transactional
    public MaintenanceLog updateMaintenanceStatus(String id, String statusStr) {
        MaintenanceLog log = maintenanceLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance log not found"));

        MaintenanceLog.Status status = MaintenanceLog.Status.valueOf(statusStr.toUpperCase());
        log.setStatus(status);

        if (status == MaintenanceLog.Status.COMPLETED) {
            log.getVehicle().setStatus(Vehicle.Status.AVAILABLE);
        } else {
            log.getVehicle().setStatus(Vehicle.Status.IN_SHOP);
        }

        return maintenanceLogRepository.save(log);
    }

    public BigDecimal getTotalMaintenanceCostByVehicle(String vehicleId) {
        return maintenanceLogRepository.getTotalMaintenanceCostByVehicle(vehicleId);
    }

    public BigDecimal getTotalMaintenanceCost() {
        return maintenanceLogRepository.getTotalMaintenanceCost();
    }

    @Transactional
    public void deleteMaintenanceLog(String id) {
        MaintenanceLog log = maintenanceLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance log not found"));
        maintenanceLogRepository.delete(log);
    }
}
