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
      showToast('مقدار تکراری','error');
    }
  } else {
    showToast('لطفا فیلد هارا درست پر کنید','error');
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

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.classList.add('toast', type === 'error' ? 'error' : 'success');

  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 2500); // بعد از 2.5 ثانیه حذف میشه
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
    showToast('خطا در دریافت اطلاعات','error');
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
    showToast('اضافه شد:\n' + data.task,'success');
  } catch (err) {
    showToast('خطا در افزودن تسک','error');
  }
}

async function delFetch(id) {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    showToast('حذف شد','success');
  } catch (err) {
    showToast('خطا در حذف','error');
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
    showToast('وضعیت:\n' + (data.done ? 'انجام شده' : 'انجام نشده'),'success');
  } catch (err) {
    showToast('خطا در بروزرسانی','error');
  }
}

getFetch();
