package org.institutions.respository;

import org.institutions.model.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {
    List<Institution> findByProvince(String province);
    List<Institution> findByType(String type);
    List<Institution> findByProvinceAndType(String province, String type); // New method added
}
