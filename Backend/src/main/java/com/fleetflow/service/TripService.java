package com.fleetflow.service;

import com.fleetflow.dto.TripRequest;
import com.fleetflow.dto.TripResponse;
import com.fleetflow.entity.Driver;
import com.fleetflow.entity.Trip;
import com.fleetflow.entity.Vehicle;
import com.fleetflow.exception.BadRequestException;
import com.fleetflow.exception.ResourceNotFoundException;
import com.fleetflow.repository.TripRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TripService {
    private final TripRepository tripRepository;
    private final VehicleService vehicleService;
    private final DriverService driverService;

    public TripService(TripRepository tripRepository, VehicleService vehicleService, DriverService driverService) {
        this.tripRepository = tripRepository;
        this.vehicleService = vehicleService;
        this.driverService = driverService;
    }

    public List<TripResponse> getAllTrips() {
        return tripRepository.findAll().stream()
                .map(TripResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public List<TripResponse> getTripsByStatus(String status) {
        return tripRepository.findByStatus(Trip.Status.valueOf(status.toUpperCase())).stream()
                .map(TripResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public TripResponse getTripById(String id) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));
        return TripResponse.fromEntity(trip);
    }

    @Transactional
    public TripResponse createTrip(TripRequest request) {
        Vehicle vehicle = vehicleService.getVehicleEntityById(request.getVehicleId());
        Driver driver = driverService.getDriverEntityById(request.getDriverId());

        if (vehicle.getStatus() != Vehicle.Status.AVAILABLE) {
            throw new BadRequestException("Vehicle is not available");
        }
        if (driver.getStatus() != Driver.Status.ON_DUTY) {
            throw new BadRequestException("Driver is not on duty");
        }
        if (!driverService.isLicenseValid(driver.getId())) {
            throw new BadRequestException("Driver's license has expired");
        }
        if (request.getCargoWeight() > vehicle.getMaxLoadCapacity()) {
            throw new BadRequestException("Too heavy! Cargo weight exceeds vehicle's maximum capacity");
        }

        Trip trip = new Trip();
        trip.setOrigin(request.getOrigin());
        trip.setDestination(request.getDestination());
        trip.setCargoDescription(request.getCargoDescription());
        trip.setCargoWeight(request.getCargoWeight());
        trip.setScheduledAt(request.getScheduledAt());
        trip.setVehicle(vehicle);
        trip.setDriver(driver);
        trip.setStatus(Trip.Status.DRAFT);

        trip = tripRepository.save(trip);
        return TripResponse.fromEntity(trip);
    }

    @Transactional
    public TripResponse dispatchTrip(String id) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        if (trip.getStatus() != Trip.Status.DRAFT) {
            throw new BadRequestException("Only draft trips can be dispatched");
        }

        Vehicle vehicle = trip.getVehicle();
        vehicle.setStatus(Vehicle.Status.ON_TRIP);
        vehicle.setOdometer(trip.getStartOdometer() != null ? trip.getStartOdometer() : vehicle.getOdometer());

        Driver driver = trip.getDriver();
        driver.setStatus(Driver.Status.OFF_DUTY);

        trip.setStatus(Trip.Status.DISPATCHED);
        trip.setStartedAt(LocalDateTime.now());

        tripRepository.save(trip);
        return TripResponse.fromEntity(trip);
    }

    @Transactional
    public TripResponse completeTrip(String id, Double endOdometer) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        if (trip.getStatus() != Trip.Status.DISPATCHED) {
            throw new BadRequestException("Only dispatched trips can be completed");
        }

        Vehicle vehicle = trip.getVehicle();
        vehicle.setStatus(Vehicle.Status.AVAILABLE);
        vehicle.setOdometer(endOdometer);

        Driver driver = trip.getDriver();
        driver.setStatus(Driver.Status.ON_DUTY);
        driverService.incrementTripsCompleted(driver.getId());

        trip.setStatus(Trip.Status.COMPLETED);
        trip.setEndOdometer(endOdometer);
        trip.setCompletedAt(LocalDateTime.now());

        tripRepository.save(trip);
        return TripResponse.fromEntity(trip);
    }

    @Transactional
    public TripResponse cancelTrip(String id) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        if (trip.getStatus() == Trip.Status.COMPLETED) {
            throw new BadRequestException("Completed trips cannot be cancelled");
        }

        if (trip.getStatus() == Trip.Status.DISPATCHED) {
            Vehicle vehicle = trip.getVehicle();
            vehicle.setStatus(Vehicle.Status.AVAILABLE);

            Driver driver = trip.getDriver();
            driver.setStatus(Driver.Status.ON_DUTY);
        }

        trip.setStatus(Trip.Status.CANCELLED);
        tripRepository.save(trip);
        return TripResponse.fromEntity(trip);
    }

    @Transactional
    public TripResponse updateTrip(String id, TripRequest request) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

        if (trip.getStatus() != Trip.Status.DRAFT) {
            throw new BadRequestException("Only draft trips can be updated");
        }

        Vehicle vehicle = vehicleService.getVehicleEntityById(request.getVehicleId());
        Driver driver = driverService.getDriverEntityById(request.getDriverId());

        if (request.getCargoWeight() > vehicle.getMaxLoadCapacity()) {
            throw new BadRequestException("Cargo weight exceeds vehicle's maximum capacity");
        }

        trip.setOrigin(request.getOrigin());
        trip.setDestination(request.getDestination());
        trip.setCargoDescription(request.getCargoDescription());
        trip.setCargoWeight(request.getCargoWeight());
        trip.setScheduledAt(request.getScheduledAt());
        trip.setVehicle(vehicle);
        trip.setDriver(driver);

        trip = tripRepository.save(trip);
        return TripResponse.fromEntity(trip);
    }

    @Transactional
    public void deleteTrip(String id) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));
        tripRepository.delete(trip);
    }
}
