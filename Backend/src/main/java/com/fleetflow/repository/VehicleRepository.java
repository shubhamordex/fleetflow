package com.fleetflow.repository;

import com.fleetflow.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, String> {
    Optional<Vehicle> findByLicensePlate(String licensePlate);
    boolean existsByLicensePlate(String licensePlate);
    
    List<Vehicle> findByStatus(Vehicle.Status status);
    List<Vehicle> findByIsRetiredFalse();
    List<Vehicle> findByVehicleType(String vehicleType);
    
    @Query("SELECT COUNT(v) FROM Vehicle v WHERE v.status = 'ON_TRIP'")
    Long countActiveVehicles();
    
    @Query("SELECT COUNT(v) FROM Vehicle v WHERE v.status = 'IN_SHOP'")
    Long countVehiclesInShop();
    
    @Query("SELECT COUNT(v) FROM Vehicle v WHERE v.isRetired = false")
    Long countTotalActiveVehicles();
}
