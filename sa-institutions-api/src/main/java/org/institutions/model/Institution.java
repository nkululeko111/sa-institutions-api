package org.institutions.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "institutions")
public class Institution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String province;
    private String website;
    private String accreditation;  // e.g., "CHE", "DHET"
}