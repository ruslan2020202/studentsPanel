let students = [{
    'name': "ruslan",
    'surname': "selivertsov",
    'lastname': 'vyacheslavovich',
    'date': '2005-05-02 (19 лет)',
    'year': '2022-2026 (2 курс)',
    'facultet': 'ktep'
}]

const panelForm = document.querySelector('.panel')

let tableStudents = document.querySelector('table')

function checkDate(date) {
    let today = new Date
    let birthday = new Date(date)
    if (birthday.getFullYear() > 1900 && today >= birthday) {
        return true
    } else {
        alert('Дата рождения должна быть в промежутке от 01.01.1900 до текущей даты')
        return false
    }
}

function calculateAge(birthDate) {
    birthDate = new Date(birthDate)
    let today = new Date()

    let years = (today.getFullYear() - birthDate.getFullYear())

    if (today.getMonth() < birthDate.getMonth() ||
        today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) {
        years--
    }

    return years
}

function calculateKurs(year) {
    let today = new Date()
    if (Number(year) + 4 < today.getFullYear() || Number(year) + 4 === today.getFullYear() && today.getMonth() > 9) {
        return 'закончил'
    } else {
        let kurs = today.getMonth() < 9 ? Number(year) + 4 - today.getFullYear() : Number(year) + 4 - today.getFullYear() + 1
        return `${year}-${Number(year) + 4} ${kurs} курс`
    }
}

function checkYear(year) {
    let today = new Date()
    if (year >= 2000 && today.getFullYear() >= year) {
        return true
    } else {
        alert('Год поступления должен быть в промежутке от 2000 года до текущего года')
        return false
    }
}

function drawStudents() {
    let storageStudents = JSON.parse(localStorage.getItem('students'))
    for (let i of storageStudents) {
        let elTr = document.createElement('tr')
        for (let j of Object.values(i)) {
            let elTd = document.createElement('td')
            elTd.textContent = j
            elTr.appendChild(elTd)
        }
        tableStudents.appendChild(elTr)
    }
}


panelForm.addEventListener('submit', (e) => {
    let formData = new FormData(e.target)
    let student = {}
    formData.forEach((value, key) => student[key] = value.trim())
    if (!checkDate(student.date)) return
    if (!checkYear(student.year)) return
    student.date = `${student.date} (${calculateAge(student.date)} лет)`
    student.year = calculateKurs(student.year)
    let storageStudents = localStorage.getItem('students')
    storageStudents = storageStudents ? JSON.parse(storageStudents) : []
    storageStudents.push(student)
    localStorage.setItem('students', JSON.stringify(storageStudents))
})

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('students') === null) {
        localStorage.setItem('students', JSON.stringify(students))
    }
    drawStudents()
})



