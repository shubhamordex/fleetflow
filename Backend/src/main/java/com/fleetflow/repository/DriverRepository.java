package com.fleetflow.repository;

import com.fleetflow.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DriverRepository extends JpaRepository<Driver, String> {
    Optional<Driver> findByEmail(String email);
    Optional<Driver> findByLicenseNumber(String licenseNumber);
    boolean existsByEmail(String email);
    boolean existsByLicenseNumber(String licenseNumber);
    
    List<Driver> findByStatus(Driver.Status status);
    
    @Query("SELECT d FROM Driver d WHERE d.licenseExpiry <= :date")
    List<Driver> findDriversWithExpiredLicenses(LocalDate date);
    
    @Query("SELECT d FROM Driver d WHERE d.status = 'ON_DUTY' AND d.licenseExpiry > CURRENT_DATE")
    List<Driver> findAvailableDrivers();
}
