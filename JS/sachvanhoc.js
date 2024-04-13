
let maxitem=4;
let str="";
fetch("../../data/sachvanhoc.json").then(res=>res.json()).then(data=>{
    for(var i=0;i<data.length;i++){
        let item=data[i];
        if(i==maxitem) break;
        str+=`<div class="col-md-3" id="${item.id}" onclick='hienthi("${item.id}")'>
        <div class="card" style="width:100%; height: 100%;">
            <img src="${item.img}" height="415px" alt="" class="card-img-top">
            <div class="card-body">
                <h5>${item.name}</h5>
                <h4>$${item.gia}</h4>
                <div class="card-footer">
                    <a href=""><input type="button" value="Đặt Hàng" class="btn btn-success"></a>
                </div>
            </div>
        </div>
    </div>`
    }
    document.getElementById("sachvanhoc").innerHTML=str;   
})
