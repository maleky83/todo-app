let todoList = [];
const BASE_URL = 'https://todo-app-ggt4.onrender.com/api/todos';
const inputName = document.querySelector('#inputName');
const inputNum = document.querySelector('#inputNum');
const form = document.querySelector('form');
const btnAdd = document.querySelector('#add');
const ul = document.querySelector('ul');

form.addEventListener('submit', e => e.preventDefault());

btnAdd.addEventListener('click', async () => {
  const task = inputName.value.trim();
  const time = parseInt(inputNum.value);

  if (!task || isNaN(time) || time <= 0) {
    return showToast('لطفا فیلدها را درست پر کنید', 'error');
  }

  const exists = todoList.some(t => t.task.trim() === task);
  if (exists) return showToast('مقدار تکراری', 'error');

  await postFetch({ task, time, done: false });
  inputName.value = '';
  inputNum.value = '';
});

function createLi(item) {
  const li = document.createElement('li');
  li.className = item.done ? 'done' : '';
  li.innerHTML = `
    <h3>کار:</h3><p>${item.task}</p>
    <h3>زمان:</h3><p>${item.time} دقیقه</p>
    <button class="done-btn">حذف</button>
    <i>${item.done ? '👍' : '👎'}</i>
  `;

  li.querySelector('button').addEventListener('click', async () => {
    await delFetch(item.id);
  });

  li.querySelector('i').addEventListener('click', async () => {
    const isDone = !item.done;
    await patchFetch(item.id, isDone);
  });

  ul.appendChild(li);
}

function showList() {
  ul.innerHTML = '';
  todoList.forEach(createLi);
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('hide'), 2500);
  setTimeout(() => toast.remove(), 3000);
}

async function getFetch() {
  try {
    const res = await fetch(BASE_URL);
    todoList = await res.json();
    showList();
  } catch {
    showToast('خطا در دریافت اطلاعات', 'error');
  }
}

async function postFetch(item) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    const data = await res.json();
    todoList.push(data);
    createLi(data);
    showToast('اضافه شد:\n' + data.task);
  } catch {
    showToast('خطا در افزودن تسک', 'error');
  }
}

async function delFetch(id) {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    todoList = todoList.filter(item => item.id !== id);
    showList();
    showToast('حذف شد');
  } catch {
    showToast('خطا در حذف', 'error');
  }
}

async function patchFetch(id, done) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done })
    });
    const updated = await res.json();
    const idx = todoList.findIndex(item => item.id === id);
    if (idx !== -1) todoList[idx].done = updated.done;
    showList();
    showToast('وضعیت:\n' + (updated.done ? 'انجام شده' : 'انجام نشده'));
  } catch {
    showToast('خطا در بروزرسانی', 'error');
  }
}

getFetch();
