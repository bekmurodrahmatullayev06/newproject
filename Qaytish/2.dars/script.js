const form = document.querySelector('.form');
const wordInput = document.querySelector('#word');
const descriptionInput = document.querySelector('#description');
const timeInput = document.querySelector('#time');
const container = document.querySelector('.container');
const searchInput = document.querySelector('#search');
const filterInput = document.querySelector('#filter');
const count = document.querySelector('#count');
const submitButton = document.querySelector('#submit');
const cancelButton = document.querySelector('#cancel');

let plans = JSON.parse(localStorage.getItem('plans')) || [];
let editingId = null;

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const word = wordInput.value.trim();
    const description = descriptionInput.value.trim();

    if (word === '' || description === '') {
        alert('So‘z va description kiriting!');
        return;
    }

    if (editingId === null) {
        plans.push({
            id: Date.now(),
            word: word,
            description: description,
            time: timeInput.value,
            done: false,
            createdAt: new Date().toISOString()
        });
    } else {
        const plan = plans.find(function (item) {
            return item.id === editingId;
        });

        plan.word = word;
        plan.description = description;
        plan.time = timeInput.value;
    }

    savePlans();
    form.reset();
    editingId = null;
    submitButton.textContent = 'Qo‘shish';
    cancelButton.hidden = true;
    showPlans();
});

cancelButton.addEventListener('click', function () {
    form.reset();
    editingId = null;
    submitButton.textContent = 'Qo‘shish';
    cancelButton.hidden = true;
});

searchInput.addEventListener('input', showPlans);
filterInput.addEventListener('change', showPlans);

function savePlans() {
    localStorage.setItem('plans', JSON.stringify(plans));
}

function showPlans() {
    container.innerHTML = '';

    const searchText = searchInput.value.toLowerCase();
    const filteredPlans = plans.filter(function (plan) {
        const matchesSearch = plan.word.toLowerCase().includes(searchText)
            || plan.description.toLowerCase().includes(searchText);
        const matchesFilter = filterInput.value === 'all'
            || (filterInput.value === 'done' && plan.done)
            || (filterInput.value === 'active' && !plan.done);

        return matchesSearch && matchesFilter;
    });

    const doneCount = plans.filter(function (plan) {
        return plan.done;
    }).length;
    count.textContent = 'Jami: ' + plans.length + ' | Bajarildi: ' + doneCount;

    if (filteredPlans.length === 0) {
        container.textContent = 'Hozircha vazifa yo‘q.';
        return;
    }

    filteredPlans.forEach(function (plan) {
        const card = document.createElement('div');
        const word = document.createElement('h2');
        const description = document.createElement('p');
        const details = document.createElement('small');
        const actions = document.createElement('div');
        const doneButton = document.createElement('button');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        card.className = 'plan' + (plan.done ? ' completed' : '');
        word.textContent = plan.word;
        description.textContent = plan.description;
        details.textContent = plan.time
            ? 'Vaqti: ' + new Date(plan.time).toLocaleString()
            : 'Vaqt belgilanmagan';

        doneButton.textContent = plan.done ? 'Bajarilmadi' : 'Bajarildi';
        doneButton.className = 'done-button';
        doneButton.addEventListener('click', function () {
            plan.done = !plan.done;
            savePlans();
            showPlans();
        });

        editButton.textContent = 'Tahrirlash';
        editButton.className = 'edit-button';
        editButton.addEventListener('click', function () {
            wordInput.value = plan.word;
            descriptionInput.value = plan.description;
            timeInput.value = plan.time;
            editingId = plan.id;
            submitButton.textContent = 'Saqlash';
            cancelButton.hidden = false;
            wordInput.focus();
        });

        deleteButton.textContent = 'O‘chirish';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', function () {
            if (confirm('Bu vazifani o‘chirmoqchimisiz?')) {
                plans = plans.filter(function (item) {
                    return item.id !== plan.id;
                });
                savePlans();
                showPlans();
            }
        });

        actions.className = 'actions';
        actions.append(doneButton, editButton, deleteButton);
        card.append(word, description, details, actions);
        container.append(card);
    });
}

showPlans();
