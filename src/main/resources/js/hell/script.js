let requestUrl = 'http://localhost:8080/admin/users'

//------ get -----
function refreshData() {
    fetch(requestUrl)
        .then(response => response.json())
        .then(result => refreshTable(result))

    function refreshTable(users) {
        let tBody = ''
        $('#usersTable').find('tr').remove();
        $.each(users, function (key, object) {
            let roles = ''
            $.each(object.roles, function (k, o) {
                roles += o.name + ' '
            })
            tBody += ('<tr>');
            tBody += ('<td>' + object.id + '</td>');
            tBody += ('<td>' + object.name + '</td>');
            tBody += ('<td>' + object.surname + '</td>');
            tBody += ('<td>' + object.age + '</td>');
            tBody += ('<td>' + object.email + '</td>');
            tBody += ('<td>' + roles.replaceAll('ROLE_', ' ') + '</td>');
            tBody += ('<td><button type="button" onclick="editModal(' + object.id + ')" ' +
                'class="btn btn-primary">Edit</button></td>');
            tBody += ('<td><button type="button" onclick="deleteModal(' + object.id + ')" ' +
                'class="btn btn-danger">Delete</button></td>');
            tBody += ('<tr>');
        });
        $('#usersTable').html(tBody);
    }
}

// ------ post --------
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

//------ put --------
function editModal(id) {
    fetch(requestUrl + '/' + id)
        .then(response => response.json())
        .then(result => fillFields(result))

    function fillFields(user) {
        $('#edId').val(user.id);
        $('#edName').val(user.name);
        $('#edSurname').val(user.surname);
        $('#edAge').val(user.age);
        $('#edEmail').val(user.email);
        $('#edPassword').val(user.password);
        $('#editModal').modal()
        $('#edit').attr('onclick', 'editUser(' + user.id + ')')
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
                    surname: document.getElementById('edSurname').value,
                    age: document.getElementById('edAge').value,
                    email: document.getElementById("edEmail").value,
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

// ------ delete --------
function deleteModal(id) {
    fetch(requestUrl + '/' + id)
        .then(response => response.json())
        .then(result => fillFields(result))

    function fillFields(user) {
        $('#delId').val(user.id);
        $('#delName').val(user.name);
        $('#delSurname').val(user.surname);
        $('#delAge').val(user.age);
        $('#delEmail').val(user.email);
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