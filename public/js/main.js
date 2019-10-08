$('#go').click(function (evt) {
    insert()
    evt.preventDefault()
    return false
});



var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
}

var populateTable = function () {
    var client = new HttpClient();
    client.get('http://localhost:8888/points', function (response) {
        let points = JSON.parse(response);

        document.getElementById('tabela').innerHTML = '<tr><td class="tg-hmp3">Sala</td><td class="tg-hmp3">Bloco</td><td class="tg-hmp3">Descrição</td><td class="tg-hmp3">Ações</td></tr>'

        points.forEach(point => {
            let element = document.createElement('tr')
            element.className = point._id
            element.innerHTML = '<td>' + point.numero + '</td><td>' + point.bloco + '<td>' + (point.alias != undefined ? point.alias : ' - ') + '</td><td><button class="btn btn-danger" id=' + point._id + ' onClick="deletar(this.id);"><i class="fa fa-trash-o" aria-hidden="true"></i> Deletar </button> </td>'

            document.getElementById('tabela').appendChild(element);
        });
    });
}

populateTable();

var editables = function () {
    var client = new HttpClient();
    client.get('http://localhost:8888/points', function (response) {
        let points = JSON.parse(response);

        points.forEach(point => {
            let element = document.createElement('div')
            // element.className = point._id
            element.innerHTML =
            '<form class="needs-validation" novalidate=""><div class="details mb-3"><h5>Detalhes</h5><div class="row"><div class="col-md-6"><label for="num">Número da sala</label><input class="datepicker form-control" type="number" value='+
            point.numero +' id="numero_'+ point._id +'" /></div><div class="col-md-6"><label for="num">Bloco</label><input class="datepicker form-control" type="text" value='+ point.bloco
            +' id="bloco_'+ point._id +'" /></div><div class="col-md-12"><label for="num">Descrição</label><input class="datepicker form-control" type="text" value='+ (point.alias != undefined ? point.alias : '-') + ' id="alias_'+ point._id +'" /></div></div></div><hr class="mb-4"></form>' +
            '<div class="mb-3"><div class="row"><div class="col-md-12"><button class="btn btn-primary btn-lg btn-block" id='+point._id+' onclick="editar(this.id)">Salvar Alterações</button></div></div></div>'
            document.getElementById('editor').appendChild(element);
        });
    });
}

editables();

let insert = () =>{
    var data = {}
    let num = parseInt(document.getElementById('numero').value);
    let bloco = document.getElementById('bloco').value;
    let alias = document.getElementById('alias').value;

    data.num = num;
    data.bloco = bloco;
    if (alias != '') {
        data.alias = alias;
    }


    $.ajax({
        url: '/',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        cache: false,
        success: function (data, textStatus, jQxhr) {
            console.log('success');
            $("#tabela").empty();
            populateTable();
            return true;
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            return false;
        }
    })
}

let deletar = (id) =>{
    var data = {}

    data.id = id

    $.ajax({
        url: '/remove',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        cache: false,
        success: function (data, textStatus, jQxhr) {
            console.log('removed');
            $('.' + id).remove();
            return true;
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            return false;
        }
    })
}

let editar = (id) =>{
    var data = {}
    let num = parseInt(document.getElementById('numero_'+id).value);
    let bloco = document.getElementById('bloco_'+id).value;
    let alias = document.getElementById('alias_'+id).value;

    data.id = id
    data.num = num;
    data.bloco = bloco;
    if (alias != '-') {
        data.alias = alias;
    }

    $.ajax({
        url: '/edit',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        cache: false,
        success: function (data, textStatus, jQxhr) {
            console.log('edited');
            return true;
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
            return false;
        }
    })
}

