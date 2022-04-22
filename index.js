document.addEventListener('DOMContentLoaded', function () {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            var table = document.querySelector('#news-table');
            for (var i = 0; i < data.length; i++) {
                const element = data[i];
                table.innerHTML +=
                    `<tr>
                <td>${element.id}</td>
                <td>${element.title}</td>
                <td>${element.description}</td>
                <td><img style="height: 100px;width: 100px; object-fit: contain" src="${element.image}"></td>
                <td>${element.content}</td>
                <td>${element.category}</td>
                <td>${element.createAt}</td>
                <td>${element.updateAt}</td>
                <td>${element.status}</td>
                <td><a href="Detail.html?id=${element.id}"><i class="fas fa-info-square" onclick="loadNewsDetail(${element.id})"></i></a></td>
                <td><a href="Form_News.html?${element.id}"><i class="fas fa-edit"></i></a></td>
                <td><i class="fas fa-trash" onclick='deleteProduct(${element.id})'></i></td>
              </tr>`
            }
        }
    };
    xhr.open('GET', 'http://localhost:8080/api/v1/news', false);
    xhr.send();
});
function deleteProduct(id){
    if(id === undefined || id === null){
        return;
    }
    if (confirm("Are you sure ?")){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4 && xhr.status === 200){
                alert("Success");
                window.location.href = '/demo_spring/com/example/demo_spring/Ass/News.html';
            }
        };
        xhr.open('DELETE','http://localhost:8080/api/v1/news/' + id,false);
        xhr.send();
    }
}
function loadNewsDetail(id) {
    var getArticleDetailUrl = `http://localhost:8080/api/v1/news/${id}`;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                var newsDetail = JSON.parse(xhr.responseText);
                document.forms['news-table']['title'].value = newsDetail.title;
                document.forms['news-table']['description'].value = newsDetail.description;
                document.forms['news-table']['image'].value = newsDetail.image;
                document.forms['news-table']['content'].value = newsDetail.content;
                document.forms['news-table']['createAt'].value = newsDetail.createAt;
                document.forms['news-table']['updateAt'].value = newsDetail.updateAt;
                document.forms['news-table']['category'].value = newsDetail.category;
                document.forms['news-table']['status'].value = newsDetail.status;
            } else {
                alert('Khong the load tin tuc');
            }
        }
    }
    xhr.open('GET' ,getArticleDetailUrl, false);
    xhr.send();
}