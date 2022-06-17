let requestUrl = 'http://localhost:8080/admin/users'

//------ Table users ------------------------
// function refreshData() {
//     fetch(requestUrl)
//         .then(response => response.json())
//         .then(result => refreshTable(result))
//
//     function refreshTable(users) {
//         let tBody = ''
//         $('#usersTable').find('tr').remove();
//         $.each(users, function (key, object) {
//             let roles = ''
//             $.each(object.roles, function (k, o) {
//                 roles += o.name + ' '
//             })
//             tBody += ('<tr>');
//             tBody += ('<td>' + object.id + '</td>');
//             tBody += ('<td>' + object.name + '</td>');
//             tBody += ('<td>' + object.surname + '</td>');
//             tBody += ('<td>' + object.age + '</td>');
//             tBody += ('<td>' + object.email + '</td>');
//             tBody += ('<td>' + roles.replaceAll('ROLE_', ' ') + '</td>');
//             tBody += ('<td><button type="button" onclick="editModal(' + object.id + ')" ' +
//                 'class="btn btn-primary">Edit</button></td>');
//             tBody += ('<td><button type="button" onclick="deleteModal(' + object.id + ')" ' +
//                 'class="btn btn-danger">Delete</button></td>');
//             tBody += ('<tr>');
//         });
//         $('#usersTable').html(tBody);
//     }



function refresh(data) {
    fetch(requestUrl)
        .then(response => response.json())
        .then((data) => {
            refreshTable(data);
        });

    function refreshTable(jsonObj) {
        let table = document.getElementById('myTable');
        clearTable(table, 0);
        for (let i = 0; i < jsonObj.length; i++) {
            let row = `<tr>
                            <td>${jsonObj[i].id}</td>
                            <td>${jsonObj[i].name}</td>
                            <td>${jsonObj[i].surname}</td>
                            <td>${jsonObj[i].age}</td>
                            <td>${jsonObj[i].email}</td>
                            <td>${jsonObj[i]['roles'][0]['name']}</td>
                            <td><button onclick="editModal(${jsonObj[i].id})" id="buttonEdit" type="button" class="btn btn-info" data-toggle="modal" data-target ="#modalEdit">Edit</button></td>
                            <td><button onclick="deleteModal(${jsonObj[i].id})" id="buttonDelete" type="button" class="btn btn-danger" data-toggle="modal" data-target="#modalDelete">Delete</button></td>
                       </tr>`;
            table.innerHTML += row;
        }
    }
}

function clearTable(table, offset = 0) {
    let rowCount = table.rows.length;
    for (let i = offset; i < rowCount; i++) {
        table.deleteRow(offset);
    }
}



//------ Create new user ------------------------

function addNewUser() {
    fetch(requestUrl, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',

        body: JSON.stringify({
            name: $('#newName').val(),
            surname: $('#newSurname').val(),
            age: $('#newAge').val(),
            email: $('#newEmail').val(),
            password: $('#newPassword').val(),
            roles: [
                document.getElementById('newRoles').value
            ]

        })
    })
        .then((r) => {
            if (r.ok) {
                $('form input[type="text"], form input[type="password"], form input[type="number"], form textarea')
                    .val('');
                $('#nav-home-tab').tab('show')
                refreshData()
            }
        })

}
//
//
//------ Modal update user ------------------------
function editModal(id) {
    fetch(requestUrl + '/' + id)
        .then(response => response.json())
        .then(result => fillFields(result))
    function fillFields(user) {
        $('#edId').val(user.id);
        $('#edUsername').val(user.username);
        $('#edPassword').val(user.password);
        $('#edName').val(user.name);
        $('#edLastName').val(user.lastName);
        $('#edAge').val(user.age);
        $('#editModal').modal()
        $('#edit').attr('onclick','editUser(' + user.id + ')')
    }
}

function editUser(id) {
    fetch(requestUrl + '/' + id,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(
                {
                    id: document.getElementById('edId').value,
                    name: document.getElementById('edName').value,
                    lastName: document.getElementById('edLastName').value,
                    age: document.getElementById('edAge').value,
                    username: document.getElementById("edUsername").value,
                    password: document.getElementById('edPassword').value,
                    roles: [
                        document.getElementById('rolesEdit').value
                    ]
                })
        }).then((re) => {
        $('#editModal').modal("hide")
        refreshData()
    })
}

//------ Modal delete user ------------------------
function deleteModal(id) {
    fetch(requestUrl + '/' + id)
        .then(response => response.json())
        .then(result => fillFields(result))

    function fillFields(user) {
        $('#delId').val(user.id);
        $('#delUserName').val(user.username);
        $('#delName').val(user.name);
        $('#delLastName').val(user.lastName);
        $('#delAge').val(user.age);
        $('#delete').attr('onclick', 'deleteUser(' + user.id + ')')
        $('#deleteModalHtml').modal()
    }
}

function deleteUser(id) {
    fetch(requestUrl + '/' + id, {
        method: 'DELETE'
    }).then(() => {
        $('#deleteModalHtml').modal('hide')
        refreshData();
    })
}




refreshData()