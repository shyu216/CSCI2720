/**
* CSCI2720/ESTR2106 Assignment 1
* Bootstrap Web Page with a Web Form
*
* I declare that the assignment here submitted is original
* except for source material explicitly acknowledged,
* and that the same or closely related material has not been
* previously submitted for another course.
* I also acknowledge that I am aware of University policy and
* regulations on honesty in academic work, and of the disciplinary
* guidelines and procedures applicable to breaches of such
* policy and regulations, as contained in the website.
*
* University Guideline on Academic Honesty:
*   http://www.cuhk.edu.hk/policy/academichonesty
* Faculty of Engineering Guidelines to Academic Honesty:
*   https://www.erg.cuhk.edu.hk/erg/AcademicHonesty
*
* Student Name: YU Sihong
* Student ID  : 1155141630
* Date        : 2022/10/04
*/


fetch('comments.txt')
    .then(res => res.text())
    .then(txt => {
        let newComment: HTMLElement = document.createElement("div");
        newComment.innerHTML = txt;
        let obj = document.querySelector("#comments") as HTMLElement;
        obj.appendChild(newComment);
    });


function showhidden(input: null): void {
    let obj = document.getElementById('hiddenBar') as HTMLElement;
    if (obj.style.display === 'none') {
        obj.style.display = '';
    }
    else {
        obj.style.display = 'none';
    }
}


function task1(input: null): void {
    location.href = "#sections";

    document.getElementsByName("sectionTitle").forEach((v, i) => {
        if (v.classList.contains('text-start')) {
            v.classList.remove('text-start');
            v.classList.add('text-center');
        }
        else if (v.classList.contains('text-center')) {
            v.classList.remove('text-center');
            v.classList.add('text-end');
        }
        else if (v.classList.contains('text-end')) {
            v.classList.remove('text-end');
            v.classList.add('text-start');
        }
    })
}

function task2(input: null): void {
    location.href = "#hobby";

    let hobby: string | null = window.prompt("What's your hobby?");
    let description: string | null;
    if (hobby) {
        description = window.prompt("Please briefly describe")
        if (description) {
            let newhob: HTMLElement = document.createElement("tr");
            let element: string = '<td>' + hobby + '</td><td>' + description + '</td>';
            newhob.innerHTML = element;
            let obj = document.getElementById("hobbies") as HTMLElement;
            obj.appendChild(newhob);
        }
        else {
            window.alert("Enter nothing, disgarded.");
        }
    }
    else {
        window.alert("Enter nothing, disgarded.");
    }
}

function task3(input: null): void {
    let obj = document.getElementById('progressBar') as HTMLElement;
    if (obj.style.display == 'none') {
        obj.style.display = '';

        document.addEventListener('scroll', function () {
            let scro: number = window.scrollY;
            let scrohei: number = document.documentElement.scrollHeight;
            let winhei: number = window.innerHeight;
            let num: string = (scro / (scrohei - winhei) * 100).toString();
            let progress = document.getElementById("progress") as HTMLElement;
            progress.style.width = num + '%';
        });
    }
    else {
        obj.style.display = 'none';
    }
}


/* <div class="card text-white bg-primary mt-3 ms-3 me-3"><div class="card-header">shyu0@qq.com</div><div class="card-body"><p class="card-text">What a great job!</p></div></div> */
function processform(input: null): void {
    let objemai = document.querySelector("#new-email") as HTMLInputElement;
    let email: string | null = objemai.value;
    let objcomm = document.querySelector("#new-comment") as HTMLInputElement;
    let comment: string | null = objcomm.value;
    let color: string | null;

    if (email && email.match(/^\S+@\S+$/)) {
        objemai.classList.remove("is-invalid");
    }
    else {
        objemai.classList.add("is-invalid");
        return;
    }

    if (comment) {
        objcomm.classList.remove("is-invalid");
    }
    else {
        objcomm.classList.add("is-invalid");
        return;
    }

    let objcol = document.querySelectorAll("input[name=new-color]:checked") as NodeListOf<HTMLInputElement>;
    if (objcol.length == 1) {
        document.querySelectorAll(".form-check-input").forEach((v, i) => {
            v.classList.remove("is-invalid");
        })
        color = objcol[0].value;
    }
    else {
        document.querySelectorAll(".form-check-input").forEach((v, i) => {
            v.classList.add("is-invalid");
        })
        return;
    }

    let element: string = '<div class="card-header">' + email + '</div><div class="card-body"><p class="card-text">' + comment + '</p></div></div>';
    let newComment: HTMLDivElement = document.createElement("div");
    newComment.innerHTML = element;
    newComment.classList.add('card', 'mt-3', 'ms-3', 'me-3');
    if (color) {
        newComment.classList.add(color);
    }

    let objcomms = document.querySelector("#comments") as HTMLElement;
    objcomms.appendChild(newComment);

    fetch('comments.txt')
        .then(res => res.text())
        .then(txt => {
            fetch('comments.txt', {
                method: 'PUT',
                body: txt + newComment.outerHTML
            });
        });

    let objfor = document.querySelector("form") as HTMLFormElement;
    objfor.reset();

}