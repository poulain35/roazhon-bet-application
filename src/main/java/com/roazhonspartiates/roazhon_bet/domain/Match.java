package com.roazhonspartiates.roazhon_bet.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Match.
 */
@Entity
@Table(name = "jhi_match")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Match implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "domicile")
    private String domicile;

    @Column(name = "exterieur")
    private String exterieur;

    @Column(name = "date")
    private LocalDate date;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDomicile() {
        return domicile;
    }

    public Match domicile(String domicile) {
        this.domicile = domicile;
        return this;
    }

    public void setDomicile(String domicile) {
        this.domicile = domicile;
    }

    public String getExterieur() {
        return exterieur;
    }

    public Match exterieur(String exterieur) {
        this.exterieur = exterieur;
        return this;
    }

    public void setExterieur(String exterieur) {
        this.exterieur = exterieur;
    }

    public LocalDate getDate() {
        return date;
    }

    public Match date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Match)) {
            return false;
        }
        return id != null && id.equals(((Match) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Match{" +
            "id=" + getId() +
            ", domicile='" + getDomicile() + "'" +
            ", exterieur='" + getExterieur() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
