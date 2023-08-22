
const baseUrl = `https://backend-mrkishansharma.vercel.app`

const token = localStorage.getItem('token') || null;
if (!token) {
    document.body.innerHTML = ''
    alert('Kindly Login First')
    location.href = './index.html'
}


const closeAddFormBtn = document.getElementById('closeAddFormBtn')
const closeEditFormBtn = document.getElementById('closeEditFormBtn')

const tbodyEmployee = document.getElementById('tbodyEmployee')

let currentEditEmpId = null

const editForm = document.getElementById('editForm')
const FirstName_E = document.getElementById('FirstName_E')
const LastName_E = document.getElementById('LastName_E')
const Email_E = document.getElementById('Email_E')
const Salary_E = document.getElementById('Salary_E')
const Department_E = document.getElementById('Department_E')


const searchName = document.getElementById('searchName')
const filterDepartment = document.getElementById('filterDepartment')
const filterSalary = document.getElementById('filterSalary')

searchName.addEventListener('input', filteringEmp)
filterDepartment.addEventListener('change', filteringEmp)
filterSalary.addEventListener('change', filteringEmp)

const pageNumberSpan = document.getElementById('pageNumberSpan')


let pageNumber = +pageNumberSpan.innerText


function filteringEmp(e) {
    const { name, value } = e.target
    console.log(name, value);

    filteringImplementtaton()

}



function changePageNumber(action) {

    action = +action

    pageNumber = +pageNumberSpan.innerText

    if (action == 1) {

        pageNumber = pageNumber + action


    } else {

        pageNumber = pageNumber == 1 ? pageNumber : pageNumber + action

    }

    pageNumberSpan.innerText = pageNumber

    filteringImplementtaton()

}



function filteringImplementtaton() {
    const FirstName = searchName.value
    const Department = filterDepartment.value
    const sortbysalary = filterSalary.value

    const URL = `${baseUrl}/employees?FirstName=${FirstName}&Department=${Department}&sortbysalary=${sortbysalary}`

    console.log(URL);
    fetchAllEmployees(URL, pageNumber)
}



fetchAllEmployees()

function fetchAllEmployees(url = `${baseUrl}/employees?`, page = pageNumber, limit = 5) {

    const URL = `${url}&page=${page}&limit=${limit}`

    fetch(URL)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (!data.isError) {
                renderEmployees(data.data)
            }
        })
        .catch(err => {
            console.log(err);
        })

}






function renderEmployees(data) {

    tbodyEmployee.innerHTML = ''

    const htmls = data.map((ele, i) => {
        return getRowOfEmployee(i + 1, ele);
    }).join(' ')

    tbodyEmployee.innerHTML = htmls
}



function getRowOfEmployee(index, { _id, FirstName, LastName, Email, Department, Salary }) {
    return (
        `
        <tr>

            <td>${index}</td>
            <td>${FirstName}</td>
            <td>${LastName}</td>
            <td>${Email}</td>
            <td>${Salary}</td>
            <td>${Department}</td>
            <td class="editBttns">

                <button type="button" data-toggle="modal" data-target="#editModal"
                    data-whatever="@mdo" onclick="clickEditEmpoyeeData('${_id}')">Edit</button>
                <button onclick="clickDeleteEmpoyeeData('${_id}')">Delete</button>

            </td>

        </tr>
        `
    )
}


function logoutBtn(){
    localStorage.removeItem('token')
    alert('logout Successfull')
    location.href = './index.html'
}


function clickEditEmpoyeeData(id) {

    fetch(`${baseUrl}/employees/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (!data.isError) {
                populateEmpData(data.data)
            }
        })
        .catch(err => {
            console.log(err);
        })

}



function populateEmpData(data) {
    console.log(data);


    currentEditEmpId = data._id

    FirstName_E.value = data.FirstName
    LastName_E.value = data.LastName
    Email_E.value = data.Email
    Salary_E.value = data.Salary
    Department_E.value = data.Department


}



function clickDeleteEmpoyeeData(id) {
    fetch(`${baseUrl}/employees/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            fetchAllEmployees()
        })
        .catch(err => {
            alert(err)
            console.log(err);
        })
}




function handleAddEmployee(e) {

    e.preventDefault()

    const payload = {
        FirstName: e.target.FirstName.value,
        LastName: e.target.LastName.value,
        Email: e.target.Email.value,
        Department: e.target.Department.value,
        Salary: e.target.Salary.value
    }

    console.log(payload);

    fetch(`${baseUrl}/employees`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert(data.msg)
            fetchAllEmployees()
        })
        .catch(err => {
            console.log(err);
            alert('Something Went Wrong')
        }).finally(() => {
            closeAddFormBtn.click()
            EmptyAddForm()
        })



    function EmptyAddForm() {

        e.target.FirstName.value = ''
        e.target.LastName.value = ''
        e.target.Email.value = ''
        e.target.Department.value = ''
        e.target.Salary.value = ''

    }


}




function handleEditEmployeeData(e) {

    e.preventDefault()

    const payload = {
        FirstName: FirstName_E.value,
        LastName: LastName_E.value,
        Email: Email_E.value,
        Department: Department_E.value,
        Salary: Salary_E.value
    }

    console.log(payload);

    fetch(`${baseUrl}/employees/${currentEditEmpId}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert(data.msg)
            fetchAllEmployees()
        })
        .catch(err => {
            console.log(err);
            alert('Something Went Wrong')
        }).finally(() => {
            closeEditFormBtn.click()
            EmptyEditForm()
        })
}


function EmptyEditForm() {

    FirstName_E.value = ''
    LastName_E.value = ''
    Email_E.value = ''
    Department_E.value = ''
    Salary_E.value = ''
    currentEditEmpId = null

}