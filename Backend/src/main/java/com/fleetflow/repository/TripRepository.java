package com.fleetflow.repository;

import com.fleetflow.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, String> {
    List<Trip> findByStatus(Trip.Status status);

    List<Trip> findByVehicleId(String vehicleId);

    List<Trip> findByDriverId(String driverId);

    @Query("SELECT COUNT(t) FROM Trip t WHERE t.status = 'COMPLETED'")
    Long countCompletedTrips();

    @Query("SELECT COUNT(t) FROM Trip t WHERE t.status = 'DISPATCHED'")
    Long countActiveTrips();

    @Query("SELECT COUNT(t) FROM Trip t WHERE t.status = 'DRAFT'")
    Long countPendingTrips();

    @Query("SELECT COUNT(t) FROM Trip t WHERE t.createdAt >= :startDate")
    Long countTripsSince(LocalDateTime startDate);
}
