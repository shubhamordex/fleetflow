package com.fleetflow.service;

import com.fleetflow.dto.VehicleRequest;
import com.fleetflow.dto.VehicleResponse;
import com.fleetflow.entity.Vehicle;
import com.fleetflow.exception.BadRequestException;
import com.fleetflow.exception.ResourceNotFoundException;
import com.fleetflow.repository.VehicleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehicleService {
    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<VehicleResponse> getAllVehicles() {
        return vehicleRepository.findAll().stream()
                .map(VehicleResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public List<VehicleResponse> getAvailableVehicles() {
        return vehicleRepository.findByIsRetiredFalse().stream()
                .filter(v -> v.getStatus() == Vehicle.Status.AVAILABLE)
                .map(VehicleResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public VehicleResponse getVehicleById(String id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));
        return VehicleResponse.fromEntity(vehicle);
    }

    @Transactional
    public VehicleResponse createVehicle(VehicleRequest request) {
        if (vehicleRepository.existsByLicensePlate(request.getLicensePlate())) {
            throw new BadRequestException("License plate already exists");
        }

        Vehicle vehicle = new Vehicle();
        vehicle.setName(request.getName());
        vehicle.setLicensePlate(request.getLicensePlate());
        vehicle.setModel(request.getModel());
        vehicle.setVehicleType(request.getVehicleType());
        vehicle.setMaxLoadCapacity(request.getMaxLoadCapacity());
        vehicle.setOdometer(request.getOdometer() != null ? request.getOdometer() : 0.0);
        vehicle.setAcquisitionCost(request.getAcquisitionCost());
        vehicle.setStatus(Vehicle.Status.AVAILABLE);
        vehicle.setIsRetired(false);

        vehicle = vehicleRepository.save(vehicle);
        return VehicleResponse.fromEntity(vehicle);
    }

    @Transactional
    public VehicleResponse updateVehicle(String id, VehicleRequest request) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));

        if (!vehicle.getLicensePlate().equals(request.getLicensePlate())
                && vehicleRepository.existsByLicensePlate(request.getLicensePlate())) {
            throw new BadRequestException("License plate already exists");
        }

        vehicle.setName(request.getName());
        vehicle.setLicensePlate(request.getLicensePlate());
        vehicle.setModel(request.getModel());
        vehicle.setVehicleType(request.getVehicleType());
        vehicle.setMaxLoadCapacity(request.getMaxLoadCapacity());
        if (request.getOdometer() != null) {
            vehicle.setOdometer(request.getOdometer());
        }
        if (request.getAcquisitionCost() != null) {
            vehicle.setAcquisitionCost(request.getAcquisitionCost());
        }

        vehicle = vehicleRepository.save(vehicle);
        return VehicleResponse.fromEntity(vehicle);
    }

    @Transactional
    public VehicleResponse toggleRetire(String id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));

        vehicle.setIsRetired(!vehicle.getIsRetired());
        if (vehicle.getIsRetired()) {
            vehicle.setStatus(Vehicle.Status.RETIRED);
        } else {
            vehicle.setStatus(Vehicle.Status.AVAILABLE);
        }

        vehicle = vehicleRepository.save(vehicle);
        return VehicleResponse.fromEntity(vehicle);
    }

    @Transactional
    public void deleteVehicle(String id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));
        vehicleRepository.delete(vehicle);
    }

    public Vehicle getVehicleEntityById(String id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));
    }

    @Transactional
    public VehicleResponse updateOdometer(String id, Double odometer) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));
        vehicle.setOdometer(odometer);
        vehicle = vehicleRepository.save(vehicle);
        return VehicleResponse.fromEntity(vehicle);
    }

    public List<VehicleResponse> searchVehicles(String type, String status) {
        return vehicleRepository.findAll().stream()
                .filter(v -> (type == null || v.getVehicleType().equalsIgnoreCase(type)))
                .filter(v -> (status == null || v.getStatus().name().equalsIgnoreCase(status)))
                .map(VehicleResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
