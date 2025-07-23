let todoList = [];
const BASE_URL = 'https://todo-app-ggt4.onrender.com/api/todos';
const inputName = document.querySelector('#inputName');
const form = document.querySelector('form');
const btnAdd = document.querySelector('#add');
const inputNum = document.querySelector('#inputNum');
const ul = document.querySelector('ul');
const container = document.querySelector('.container');

form.addEventListener('submit', e => e.preventDefault());

btnAdd.addEventListener('click', async () => {
  if (inputName.value !== '' && inputNum.value > 0) {
    const result = todoList.find(t => t.task.trim() === inputName.value.trim());
    if (!result) {
      await postFetch({
        task: inputName.value,
        time: inputNum.value,
        done: false
      });
      await getFetch();
      showList();
      inputName.value = '';
      inputNum.value = '';
    } else {
      showErr('مقدار تکراری');
    }
  } else {
    showErr('لطفا فیلد هارا درست پر کنید');
  }
});

function createLi(item) {
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const p = document.createElement('p');
  const h31 = document.createElement('h3');
  const p1 = document.createElement('p');
  const btn = document.createElement('button');
  const i = document.createElement('i');

  h3.innerText = 'کار:';
  p.innerText = item.task;
  h31.innerText = 'زمان:';
  p1.innerText = `${item.time} دقیقه`;
  btn.innerText = 'حذف';
  btn.classList.add('done-btn');

  btn.addEventListener('click', async () => {
    await delFetch(item.id);
    await getFetch();
    showList();
  });

  i.addEventListener('click', () => {
    li.classList.toggle('done');
    item.done = li.classList.contains('done');
    i.innerText = item.done ? '👍' : '👎';
    patchFetch(item.id, item.done);
  });

  if (item.done) {
    li.classList.add('done');
    i.innerText = '👍';
  } else {
    i.innerText = '👎';
  }

  li.append(h3, p, h31, p1, btn, i);
  ul.appendChild(li);
}

function showErr(msg) {
  const p = document.createElement('p');
  p.classList.add('Err');
  p.innerText = msg;
  container.before(p);
  setTimeout(() => p.remove(), 1500);
}

function showRes(msg) {
  const p = document.createElement('p');
  p.classList.add('show');
  p.innerText = msg;
  container.before(p);
  setTimeout(() => p.remove(), 1500);
}

function showList() {
  ul.innerHTML = '';
  todoList.forEach(createLi);
}

async function getFetch() {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    todoList = data;
    showList();
  } catch (err) {
    showErr('خطا در دریافت اطلاعات');
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
    showRes('اضافه شد:\n' + data.task);
  } catch (err) {
    showErr('خطا در افزودن تسک');
  }
}

async function delFetch(id) {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    showRes('حذف شد');
  } catch (err) {
    showErr('خطا در حذف');
  }
}

async function patchFetch(id, done) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done })
    });
    const data = await res.json();
    showRes('وضعیت:\n' + (data.done ? 'انجام شده' : 'انجام نشده'));
  } catch (err) {
    showErr('خطا در بروزرسانی');
  }
}

getFetch();
