// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const toDoForm = document.querySelector(".todo-form"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".todolist"),
finishedList = document.querySelector(".finishedlist");

const TODOS_LS = "toDos",
FIN_LS = "fins";

let toDos = [],
fins = [];

function deleteToDo() {
	let btn = event.target;
	let li = btn.parentNode;

	toDoList.removeChild(li);
	const cleanToDos = toDos.filter(function(toDo) {
		return toDo.id !== parseInt(li.id);
	});
	toDos = cleanToDos;
	saveToDos();
}

function deleteFin() {
	let btn = event.target;
	let li = btn.parentNode;

	finishedList.removeChild(li);
	const cleanFins = fins.filter(function(fin) {
		return fin.id !== parseInt(li.id);
	});
	fins = cleanFins;
	saveToDos();
}

function saveToDos() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
	localStorage.setItem(FIN_LS, JSON.stringify(fins));
}

function backToDos() {
	let btn = event.target;
	let li = btn.parentNode;
	toDoList.appendChild(li);
	btn.innerHTML = "💯";
	btn.removeEventListener("click", backToDos);
	btn.addEventListener("click", finishedToDo);
	const delBtn = btn.nextSibling;
	delBtn.removeEventListener("click", deleteFin);
	delBtn.addEventListener("click", deleteToDo);

	let text = li.querySelector("span").innerHTML;
	let id = parseInt(li.id);
	const toDoObj = {
		text: text,
		id: id
	}
	toDos.push(toDoObj);

	const delFins = fins.filter(function(fin) {
		return fin.id !== parseInt(li.id);
	});
	fins = delFins;
	saveToDos();
}

function finishedToDo() {
	let btn = event.target;
	let li = btn.parentNode;
	finishedList.appendChild(li);
	btn.innerHTML = "💦";
	btn.addEventListener("click", backToDos);
	const delBtn = btn.nextSibling;
	delBtn.removeEventListener("click", deleteToDo);
	delBtn.addEventListener("click", deleteFin);

	let text = li.querySelector("span").innerHTML;
	let id = parseInt(li.id);
	const finObj = {
		text: text,
		id: id
	}
	fins.push(finObj);

	const delToDos = toDos.filter(function(toDo) {
		return toDo.id !== parseInt(li.id);
	});
	toDos = delToDos;
	saveToDos();
}

function paintToDo(text) {
	const li = document.createElement("li");
	const delBtn = document.createElement("button");
	delBtn.innerHTML = "❌";
	delBtn.addEventListener("click", deleteToDo);

	const finBtn = document.createElement("button");
	finBtn.innerHTML = "💯"
	finBtn.addEventListener("click", finishedToDo);

	const span = document.createElement("span");
	const newId = toDos.length + 1;
	span.innerHTML = text;
	li.appendChild(span);
	li.id = newId;
	li.appendChild(finBtn);
	li.appendChild(delBtn);
	toDoList.appendChild(li);
	const toDoObj = {
		text: text,
		id: newId
	};
	toDos.push(toDoObj);
	saveToDos();
}

function paintFin(text) {
	const li = document.createElement("li");
	const delBtn = document.createElement("button");
	delBtn.innerHTML = "❌";
	delBtn.addEventListener("click", deleteToDo);

	const btn = document.createElement("button");
	btn.innerHTML = "💦"
	btn.addEventListener("click", backToDos);

	const span = document.createElement("span");
	const newId = toDos.length + 1;
	span.innerHTML = text;
	li.appendChild(span);
	li.id = newId;
	li.appendChild(btn);
	li.appendChild(delBtn);
	finishedList.appendChild(li);
	const finObj = {
		text: text,
		id: newId
	};
	fins.push(finObj);
	saveToDos();
}

function loadToDos() {
	const loadedToDos = localStorage.getItem(TODOS_LS);
	const loadedFins = localStorage.getItem(FIN_LS);
	if (loadedToDos !== null) {
		const parsedToDos = JSON.parse(loadedToDos);
		parsedToDos.forEach(function(toDo) {
			paintToDo(toDo.text);
		});
	}
	if (loadedFins !== null) {
		const parsedFins = JSON.parse(loadedFins);
		parsedFins.forEach(function(fin) {
			paintFin(fin.text);
		});
	}
}

function handleSubmit(event) {
	event.preventDefault();
	const currentValue = toDoInput.value;
	paintToDo(currentValue);
	toDoInput.value = "";
}

function init() {
	loadToDos();
	toDoForm.addEventListener("submit", handleSubmit);
}
init();
