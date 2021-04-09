const { body } = document;

const changeBackground = number => {
    let prevBackground;
    if(body.className) {
        prevBackground = body.className;
    }
    body.className = '';
    (prevBackground === `background-${number}`) ? null :  body.classList.add(`background-${number}`); 
}