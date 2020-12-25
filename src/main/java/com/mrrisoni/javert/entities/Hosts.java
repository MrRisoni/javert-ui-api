package com.mrrisoni.entities;

import java.io.Serializable;
import javax.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "hosts")
public class Hosts implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column
    private Long id;

    @Basic(optional = false)
    private String url;

    @Basic(optional = false)
    private String file_sys;

    public Hosts() {
    }
}
