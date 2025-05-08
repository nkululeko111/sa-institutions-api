package org.institutions.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "institution")
public class Institution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String province;
    private String website;
    private String accreditation;
}
