package com.example.demo1.News;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/v1/news")
public class NewsApi {
    @Autowired
    NewsRepository newsRepository;
    public static List<News> listNews;

    static {
        listNews = new ArrayList<>();
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<News> findALL(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {
        return newsRepository.findAll();

    }

    @RequestMapping(method = RequestMethod.POST)
    public News save(@RequestBody News news) {
        newsRepository.save(news);
        return news;
    }

    @RequestMapping(method = RequestMethod.GET, path = "{id}")
    public News findById(@PathVariable int id){
        return newsRepository.findById(id).get();
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
    public News update(@PathVariable int id, @RequestBody News news) {
        News found = newsRepository.findById(id).get();
        if (found != null) {
            found.setName(news.getName());
            found.setDescription(news.getDescription());
            found.setImage(news.getImage());
            found.setCategory(news.getCategory());
            found.setCreateAt(news.getCreateAt());
            found.setUpdateAt(news.getUpdateAt());
            found.setStatus(news.getStatus());
        }
        newsRepository.save(found);
        return found;
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public String delete(@PathVariable int id) {
        newsRepository.delete(newsRepository.findById(id).get());
        return "OK";
    }

}

