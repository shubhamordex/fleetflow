package com.fleetflow.repository;

import com.fleetflow.entity.FuelLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface FuelLogRepository extends JpaRepository<FuelLog, String> {
    List<FuelLog> findByVehicleId(String vehicleId);
    
    @Query("SELECT SUM(f.cost) FROM FuelLog f WHERE f.vehicle.id = :vehicleId")
    BigDecimal getTotalFuelCostByVehicle(String vehicleId);
    
    @Query("SELECT SUM(f.cost) FROM FuelLog f")
    BigDecimal getTotalFuelCost();
    
    @Query("SELECT SUM(f.liters) FROM FuelLog f WHERE f.vehicle.id = :vehicleId")
    Double getTotalLitersByVehicle(String vehicleId);
}
