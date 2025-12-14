function postProject() {
const title = document.getElementById('title').value;
const li = document.createElement('li');
li.innerText = title;
document.getElementById('projectList').appendChild(li);
}