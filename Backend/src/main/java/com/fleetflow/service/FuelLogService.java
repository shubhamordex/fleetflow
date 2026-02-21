package com.fleetflow.service;

import com.fleetflow.dto.FuelLogRequest;
import com.fleetflow.entity.FuelLog;
import com.fleetflow.entity.Vehicle;
import com.fleetflow.exception.ResourceNotFoundException;
import com.fleetflow.repository.FuelLogRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FuelLogService {
    private final FuelLogRepository fuelLogRepository;
    private final VehicleService vehicleService;

    public FuelLogService(FuelLogRepository fuelLogRepository, VehicleService vehicleService) {
        this.fuelLogRepository = fuelLogRepository;
        this.vehicleService = vehicleService;
    }

    public List<FuelLog> getAllFuelLogs() {
        return fuelLogRepository.findAll();
    }

    public List<FuelLog> getFuelLogsByVehicle(String vehicleId) {
        return fuelLogRepository.findByVehicleId(vehicleId);
    }

    @Transactional
    public FuelLog createFuelLog(FuelLogRequest request) {
        Vehicle vehicle = vehicleService.getVehicleEntityById(request.getVehicleId());

        FuelLog log = new FuelLog();
        log.setFuelDate(request.getFuelDate());
        log.setLiters(request.getLiters());
        log.setCost(request.getCost());
        log.setOdometerReading(request.getOdometerReading());
        log.setStation(request.getStation());
        log.setFuelType(request.getFuelType() != null ? request.getFuelType() : "DIESEL");
        log.setVehicle(vehicle);

        if (request.getOdometerReading() != null) {
            vehicle.setOdometer(request.getOdometerReading());
        }

        fuelLogRepository.save(log);
        return log;
    }

    public BigDecimal getTotalFuelCostByVehicle(String vehicleId) {
        return fuelLogRepository.getTotalFuelCostByVehicle(vehicleId);
    }

    public BigDecimal getTotalFuelCost() {
        return fuelLogRepository.getTotalFuelCost();
    }

    public Double getTotalLitersByVehicle(String vehicleId) {
        return fuelLogRepository.getTotalLitersByVehicle(vehicleId);
    }

    @Transactional
    public void deleteFuelLog(String id) {
        FuelLog log = fuelLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fuel log not found"));
        fuelLogRepository.delete(log);
    }
}
