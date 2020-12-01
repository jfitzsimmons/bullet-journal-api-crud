package com.jfitz.bulletapi.modal;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_bullet")
public class Bullet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer id;
    @Column
    private Date createDate;
    @Column
    private Integer tab;
    @Column
    private Integer dateOrder;
    @Column
    private String taskType;
    @Column
    private String content;
    @Column
    private Boolean important;
    @Column
    private Boolean inspirational;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getCreateDate() {
        return this.createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Integer getTab() {
        return this.tab;
    }

    public void setTab(Integer tab) {
        this.tab = tab;
    }

    public Integer getDateOrder() {
        return this.dateOrder;
    }

    public void setDateOrder(Integer dateOrder) {
        this.dateOrder = dateOrder;
    }

    public String getTaskType() {
        return this.taskType;
    }

    public void setTaskType(String taskType) {
        this.taskType = taskType;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean isImportant() {
        return this.important;
    }

    public Boolean getImportant() {
        return this.important;
    }

    public void setImportant(Boolean important) {
        this.important = important;
    }

    public Boolean isInspirational() {
        return this.inspirational;
    }

    public Boolean getInspirational() {
        return this.inspirational;
    }

    public void setInspirational(Boolean inspirational) {
        this.inspirational = inspirational;
    }

}
