let listElement = document.querySelector("#app ul");
let inputElement = document.querySelector("#app input");
let buttonElement = document.querySelector("#app button");

let tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || [];

tarefas = tarefas.map((tarefa) => {
    if (typeof tarefa === "string") {
        return {
            texto: tarefa,
            concluida: false
        };
    }
    return tarefa;
});

function renderTarefas(){
    listElement.innerHTML = "";

    tarefas.map((todo, index) => {
        let liElement = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.concluida;

        checkbox.onchange = function() {
            tarefas[index].concluida = !tarefas[index].concluida;
            renderTarefas();
            salvarDados();
        };

        let span = document.createElement("span");
        span.innerText = todo.texto;

        if(todo.concluida){
            span.classList.add("concluida");
        }

        let linkElement = document.createElement("a");
        linkElement.href = "#";
        linkElement.innerText = "🗑";

        linkElement.onclick = function(){
            deletarTarefa(index);
        };

        liElement.appendChild(checkbox);
        liElement.appendChild(span);
        liElement.appendChild(linkElement);

        listElement.appendChild(liElement);
    });
}

renderTarefas();

function adicionarTarefas(){
    if(inputElement.value === ''){
        alert("Digite alguma tarefa!");
        return false;
    } else {
        let novaTarefa = inputElement.value;
        tarefas.push({
            texto: novaTarefa,
            concluida: false });
        inputElement.value = '';

        renderTarefas();
        salvarDados();
    }
}
buttonElement.onclick = adicionarTarefas;

function deletarTarefa(posicao){
    tarefas.splice(posicao, 1);
    renderTarefas();
    salvarDados();
}

function salvarDados(){
    localStorage.setItem("@listaTarefas", JSON.stringify(tarefas));
}