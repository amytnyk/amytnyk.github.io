let grades = [];

function generateString() {
    return grades.join(', ');
}

function update() {
    document.getElementById("grades").innerHTML = generateString();
    if (grades.length != 0) {
        let sum = 0;
        for (let i = 0;i < grades.length;i++)
            sum += grades[i];
        let average = sum / grades.length;
        document.getElementById("average").innerHTML = average.toFixed(1);
    } else {
        document.getElementById("average").innerHTML = "-";
    }
}

function numberEntered(number) {
    grades.push(number);
    update();
}

function initNumber(number, id) {
    document.getElementById(id).addEventListener("click", () => {
        numberEntered(number);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 1;i <= 12;i++) {
        initNumber(i, "grade_" + i);
    }
    document.getElementById("delete").addEventListener("click", () => {
        if (grades.length != 0) {
            grades.pop();
            update();
        }
    });
    document.getElementById("clear").addEventListener("click", () => {
        grades = [];
        update();
    });
    update();
});