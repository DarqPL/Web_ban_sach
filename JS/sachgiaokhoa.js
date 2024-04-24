$(document).ready(function(){
    //Load 4 sản phẩm sách văn học vào trang chủ
    $.getJSON('data/sachgiaokhoa.json',function(data){
        for(let i=0;i<data.length;i++){
            var obj = JSON.stringify(data[i]);
            let item = data[i];
            if(i==4) break;
            $("#sachgiaokhoa").append(`<div class="col-md-3 mb-3" id="${item.id}">
        <div class="card" style="width:100%; height: 100%;">
        <img src="../${item.img}" height="415px" alt="" class="card-img-top" onclick=\'xemchitiet(\`${obj}\`)\'>
                <div class="card-body">
                    <h5>${item.name}</h5>
                    <h4>${item.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h4>
                    <div class="card-footer">
                    <button type="button"  class="btn btn-success" onclick=\'addCart(\`${obj}\`)\'>Đặt Hàng</button>
                    </div>
                </div>
            </div>
        </div>`)
        }
        $("#sachgiaokhoa").append(`<div class="col-12 mt-3 mb-3" style="text-align: right;"> <a href="danhmucSachGiaoKhoa.html" class="btn btn-success">Xem Thêm</a></div>`) 
    });

//load khi click vào danh mục sách văn học
    $.getJSON('../data/sachgiaokhoa.json',function(data){
        for(let i=0;i<data.length;i++){
            var obj = JSON.stringify(data[i]);
            let item = data[i];
            $("#products").append(`<div class="col-md-3 mt-3" id="${item.id}">
        <div class="card" style="width:100%; height: 100%;">
                <img src="../${item.img}" height="415px" alt="" class="card-img-top" onclick=\'xemchitiet(\`${obj}\`)\'>
                <div class="card-body">
                    <h5>${item.name}</h5>
                    <h4>${item.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h4>
                    <div class="card-footer">
                    <button type="button" class="btn btn-success" onclick=\'addCart(\`${obj}\`)\'>Đặt Hàng</button>
                    </div>
                </div>
            </div>
        </div>`)
        }
    });
    
})

