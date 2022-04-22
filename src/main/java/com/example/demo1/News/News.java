package com.example.demo1.News;


import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Entity
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id;
    private String name;
    private String description;
    private String image;
    private String category;
    @CreationTimestamp
    private Date CreateAt;
    @UpdateTimestamp
    private Date updateAt;
    private int status;

    public News(int id, String name, String description, String image , String category, int status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.category = category;
        this.status = status;
    }


}
