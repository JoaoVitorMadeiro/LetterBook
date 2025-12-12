package com.letterbook.user.domain.model;

import java.io.Serializable;
import java.util.UUID;

/**
 * Chave primária composta para a entidade SeguidorEntity
 */
public class SeguidorId implements Serializable {
    
    private UUID seguidorId;
    private UUID seguidoId;
    
    public SeguidorId() {}
    
    public SeguidorId(UUID seguidorId, UUID seguidoId) {
        this.seguidorId = seguidorId;
        this.seguidoId = seguidoId;
    }
    
    // Getters e setters
    public UUID getSeguidorId() {
        return seguidorId;
    }
    
    public void setSeguidorId(UUID seguidorId) {
        this.seguidorId = seguidorId;
    }
    
    public UUID getSeguidoId() {
        return seguidoId;
    }
    
    public void setSeguidoId(UUID seguidoId) {
        this.seguidoId = seguidoId;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        SeguidorId that = (SeguidorId) o;
        
        if (seguidorId != null ? !seguidorId.equals(that.seguidorId) : that.seguidorId != null) return false;
        return seguidoId != null ? seguidoId.equals(that.seguidoId) : that.seguidoId == null;
    }
    
    @Override
    public int hashCode() {
        int result = seguidorId != null ? seguidorId.hashCode() : 0;
        result = 31 * result + (seguidoId != null ? seguidoId.hashCode() : 0);
        return result;
    }
}

