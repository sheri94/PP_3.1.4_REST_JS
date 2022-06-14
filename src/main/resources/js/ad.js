//Refreshing table
function refresh(data) {
    fetch('http://localhost:8080/api/users')
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
                            <td>${jsonObj[i].username}</td>
                            <td>${jsonObj[i].name}</td>
                            <td>${jsonObj[i].lastName}</td>
                            <td>${jsonObj[i].age}</td>
                            <td>${jsonObj[i].password}</td>
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

// Adding new User

const addPostForm = document.querySelector('.add-post-form');
const sss = document.getElementById('newUsername');

addPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(sss.value);

    fetch('http://localhost:8080/api/users/new', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            username: $('#newUsername').val(),
            name: $('#newName').val(),
            lastName: $('#newLastName').val(),
            password: $('#newPassword').val(),
            age: $('#newAge').val(),
            roles: [
                document.getElementById('rolesChange').value
            ],
        }),
    })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            refresh(data);
        })
    newUsername.value = '';
    newName.value = '';
    newLastName.value = '';
    newPassword.value = '';
    newAge.value = '';
    rolesChange.value = '';
})
// async function addNewUser() {
//     await fetch('http://localhost:8080/api/users/new', {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json; charset=UTF-8",
//         },
//         body: JSON.stringify({
//             username: $('#newUsername').val(),
//             name: $('#newName').val(),
//             lastName: $('#newLastName').val(),
//             password: $('#newPassword').val(),
//             age: $('#newAge').val(),
//             roles: [
//
//                     document.getElementById('rolesChange').value
//
//             ],
//         }),
//     })
//         .then(response => response.json())
//         .then(() => response.re)
// }


// function editModal(id) {
// let editButton = document.querySelector('.btn btn-primary');
//     fetch('http://localhost:8080/api/users/' + id)
//         .then(response => response.json())
//         .then(user => fillFields(user))
//
//     function fillFields(user){
//         $('#editId').val(user.id);
//         $('#editUsername').val(user.username);
//         $('#editFirstName').val(user.name);
//         $('#editLastName').val(user.lastName);
//         $('#editAge').val(user.age);
//         $('#editPassword').val(user.password);
//
//         editButton.addEventListener('submit',(e)=>{
//             e.preventDefault();
//             // console.log('post updated')
//             fetch('http://localhost:8080/api/users/update/' + editId.value,{
//                 method: 'PUT',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                         body: JSON.stringify({
//                             id: document.getElementById('editId').value,
//                             username: document.getElementById('editUsername').value,
//                             name: document.getElementById('editFirstName').value,
//                             lastName: document.getElementById('editLastName').value,
//                             password: document.getElementById('editPassword').value,
//                             age: document.getElementById('editAge').value,
//                             roles: [
//                                 document.getElementById('editRole').value
//                             ],
//                         }),
//             })
//                 .then(res=>res.json())
//                 .then(()=>location.reload())
//         })
//
//         // edit.onclick = function (){
//         //     editUser(user.id);
//         // };
//     }
// }

// Editing User

function editModal(id) {
    let editButton = document.querySelector('.btn btn-primary');
    fetch('http://localhost:8080/api/users/' + id)
        .then(response => response.json())
        .then(user => fillFields(user))

    function fillFields(user) {
        $('#editId').val(user.id);
        $('#editUsername').val(user.username);
        $('#editFirstName').val(user.name);
        $('#editLastName').val(user.lastName);
        $('#editAge').val(user.age);
        $('#editPassword').val(user.password);
        edit.onclick = function () {
            editUser(user.id);
        };
    }
}

async function editUser(id) {
    await fetch('http://localhost:8080/api/users/update/' + id, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            id: document.getElementById('editId').value,
            username: document.getElementById('editUsername').value,
            name: document.getElementById('editFirstName').value,
            lastName: document.getElementById('editLastName').value,
            password: document.getElementById('editPassword').value,
            age: document.getElementById('editAge').value,
            roles: [
                document.getElementById('editRole').value
            ],
        }),

    })
    console.log("Success")
}

// document.getElementById('edit').onclick = function() {
//     document.forms.modalEdit.reset(); // сбрасываем форму
//     location.reload(); // перезагружаем страницу
// }

//Deleting Users

function deleteModal(id) {
    fetch('http://localhost:8080/api/users/' + id)
        .then(response => response.json())
        .then(user => fillFields(user))

    function fillFields(user) {
        $('#deleteId').val(user.id);
        $('#deleteUsername').val(user.username);
        $('#deleteFirstName').val(user.name);
        $('#deleteLastName').val(user.lastName);
        $('#deleteAge').val(user.age);
        $('#deletePassword').val(user.password);
        del.onclick = function () {
            deleteUser(user.id);
        };
    }
}

async function deleteUser(id) {
    await fetch('http://localhost:8080/api/users/' + id, {
        method: 'DELETE',
    })
        .then(() => {
            refresh()
        });
}

refresh();