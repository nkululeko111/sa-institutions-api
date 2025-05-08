package org.institutions.respository;

import org.institutions.model.Institution;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {
    Page<Institution> findByProvince(String province, Pageable pageable);
    Page<Institution> findByType(String type, Pageable pageable);
    Page<Institution> findByProvinceAndType(String province, String type, Pageable pageable);
}
