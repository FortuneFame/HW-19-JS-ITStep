// ----------------------------------- Task-1 ----------------------------------------

let isDrag = false; 
let currentDrag; 
let currentZIndex = 1;

// Нажатия кнопки мыши
document.addEventListener("mousedown", (e) => {
if (e.target.classList.contains("drag")) { 
isDrag = true; 
currentDrag = e.target; 
currentDrag.style.zIndex = currentZIndex++; 
};
});

// Отпускания кнопки мыши
document.addEventListener("mouseup", () => {
isDrag = false; 
});

// Перемещения мыши
document.addEventListener("mousemove", (e) => {
    if (isDrag) {
        const box = document.getElementById("box");
        const boxRect = box.getBoundingClientRect();
        const currentDragRect = currentDrag.getBoundingClientRect();
        const maxX = boxRect.width - currentDragRect.width;
        const maxY = boxRect.height - currentDragRect.height;
        let newX = e.pageX - boxRect.left - (currentDragRect.width / 2);
        let newY = e.pageY - boxRect.top - (currentDragRect.height / 2);
        newX = Math.min(Math.max(newX, 0), maxX); 
        newY = Math.min(Math.max(newY, 0), maxY);  

        currentDrag.style.left = `${newX}px`;
        currentDrag.style.top = `${newY}px`; 
    };
});

// ----------------------------------- Task-2 and Task-3 ----------------------------------------


let arr = []
const table = document.querySelector("#myTable");
const rows = table.querySelectorAll("tr");
let dragSrcEl = null;

// Начало перетаскивания
function handleDragStart(e) {
    dragSrcEl = this;
    this.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
};

// Перетаскиваемый элемент находится над областью
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = "move";
    return false;
};

// Перетаскиваемый элемент входит в область
function handleDragEnter(e) {
    this.classList.add("over");
};

// Перетаскиваемый элемент покидает область
function handleDragLeave(e) {
    this.classList.remove("over");
};

// Перетаскиваемый элемент отпущен над областью
function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData("text/html");
    }
    return false;
};

// Перетаскиваемый элемент завершает перетаскивание
function handleDragEnd(e) {
    this.classList.remove("dragging");
};

// Копируем выбранную строку
function handleCopy(e) {
    const copy = e.target.closest("tr");
    if (copy) {
        const selectedText = window.getSelection().toString();
        const text = `${selectedText}\nCopied from ordered table at ${new Date().toLocaleString()}`;
        e.clipboardData.setData("text/plain", text);
        e.preventDefault();
    };
};

// Двойной click на строке таблицы
function handleDoubleClick(e) {
    const text = this.innerText.trim();
    const textToCopy = `${text}\nCopied from ordered table at ${new Date().toLocaleString()}`;
    navigator.clipboard.writeText(textToCopy)
      .catch((error) => {
        console.error('Copy failed', error);
      });
};

// Добавляем обработчики событий ко всем строкам таблицы
arr.forEach.call(rows, function (row) {
    row.addEventListener("dragstart", handleDragStart, false);
    row.addEventListener("dragenter", handleDragEnter, false);
    row.addEventListener("dragover", handleDragOver, false);
    row.addEventListener("dragleave", handleDragLeave, false);
    row.addEventListener("drop", handleDrop, false);
    row.addEventListener("dragend", handleDragEnd, false);
    row.addEventListener("copy", handleCopy, false);
    row.addEventListener("dblclick", handleDoubleClick, false);
});

// ----------------------------------- Bonus ----------------------------------------

  let number = 0; 

function incrementNumber() {
    number++;
    document.getElementById("numberInput").value = number;
};

function decrementNumber() {
    number--;
    document.getElementById("numberInput").value = number;
};