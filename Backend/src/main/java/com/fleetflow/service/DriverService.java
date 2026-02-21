package com.fleetflow.service;

import com.fleetflow.dto.DriverRequest;
import com.fleetflow.dto.DriverResponse;
import com.fleetflow.entity.Driver;
import com.fleetflow.exception.BadRequestException;
import com.fleetflow.exception.ResourceNotFoundException;
import com.fleetflow.repository.DriverRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DriverService {
    private final DriverRepository driverRepository;

    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    public List<DriverResponse> getAllDrivers() {
        return driverRepository.findAll().stream()
            .map(DriverResponse::fromEntity)
            .collect(Collectors.toList());
    }

    public List<DriverResponse> getAvailableDrivers() {
        return driverRepository.findAvailableDrivers().stream()
            .map(DriverResponse::fromEntity)
            .collect(Collectors.toList());
    }

    public DriverResponse getDriverById(String id) {
        Driver driver = driverRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Driver not found"));
        return DriverResponse.fromEntity(driver);
    }

    @Transactional
    public DriverResponse createDriver(DriverRequest request) {
        if (driverRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }
        if (driverRepository.existsByLicenseNumber(request.getLicenseNumber())) {
            throw new BadRequestException("License number already exists");
        }

        Driver driver = new Driver();
        driver.setFullName(request.getFullName());
        driver.setEmail(request.getEmail());
        driver.setPhone(request.getPhone());
        driver.setLicenseNumber(request.getLicenseNumber());
        driver.setLicenseCategory(request.getLicenseCategory());
        driver.setLicenseExpiry(request.getLicenseExpiry());
        driver.setSafetyScore(100.0);
        driver.setTripsCompleted(0);
        driver.setStatus(Driver.Status.ON_DUTY);

        driver = driverRepository.save(driver);
        return DriverResponse.fromEntity(driver);
    }

    @Transactional
    public DriverResponse updateDriver(String id, DriverRequest request) {
        Driver driver = driverRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Driver not found"));

        if (!driver.getEmail().equals(request.getEmail()) 
            && driverRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }
        if (!driver.getLicenseNumber().equals(request.getLicenseNumber()) 
            && driverRepository.existsByLicenseNumber(request.getLicenseNumber())) {
            throw new BadRequestException("License number already exists");
        }

        driver.setFullName(request.getFullName());
        driver.setEmail(request.getEmail());
        driver.setPhone(request.getPhone());
        driver.setLicenseNumber(request.getLicenseNumber());
        driver.setLicenseCategory(request.getLicenseCategory());
        driver.setLicenseExpiry(request.getLicenseExpiry());

        driver = driverRepository.save(driver);
        return DriverResponse.fromEntity(driver);
    }

    @Transactional
    public DriverResponse updateStatus(String id, String status) {
        Driver driver = driverRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Driver not found"));
        
        driver.setStatus(Driver.Status.valueOf(status.toUpperCase()));
        driver = driverRepository.save(driver);
        return DriverResponse.fromEntity(driver);
    }

    @Transactional
    public DriverResponse updateSafetyScore(String id, Double safetyScore) {
        Driver driver = driverRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Driver not found"));
        
        driver.setSafetyScore(safetyScore);
        driver = driverRepository.save(driver);
        return DriverResponse.fromEntity(driver);
    }

    @Transactional
    public void incrementTripsCompleted(String id) {
        Driver driver = driverRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Driver not found"));
        driver.setTripsCompleted(driver.getTripsCompleted() + 1);
        driverRepository.save(driver);
    }

    @Transactional
    public void deleteDriver(String id) {
        Driver driver = driverRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Driver not found"));
        driverRepository.delete(driver);
    }

    public Driver getDriverEntityById(String id) {
        return driverRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Driver not found"));
    }

    public boolean isLicenseValid(String driverId) {
        Driver driver = driverRepository.findById(driverId)
            .orElseThrow(() -> new ResourceNotFoundException("Driver not found"));
        return !driver.getLicenseExpiry().isBefore(LocalDate.now());
    }

    public List<DriverResponse> getDriversWithExpiredLicenses() {
        return driverRepository.findDriversWithExpiredLicenses(LocalDate.now()).stream()
            .map(DriverResponse::fromEntity)
            .collect(Collectors.toList());
    }
}
