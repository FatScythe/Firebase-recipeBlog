const chevrons = document.querySelectorAll('.chevron');
const content = document.querySelector('article');
const panels = document.querySelectorAll('.panel');
const addBtn = document.querySelector('.add');
const form = document.querySelector('form');


chevrons.forEach(chevron => {
    chevron.addEventListener('click', () => {
        chevron.classList.toggle('chevron-up');
        chevron.classList.toggle('chevron-down');

        if(chevron.classList.contains('chevron-up')) {
            chevron.parentElement.nextElementSibling.style.display = 'block'
        } else {
            chevron.parentElement.nextElementSibling.style.display = 'none'
        }
    })
})

addBtn.addEventListener('click', function () {
    let formContainer = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling; 
    formContainer.classList.toggle('d-none');

    if(!formContainer.classList.contains('d-none')) {
        addBtn.innerText = 'remove';
    } else {
        addBtn.innerText = 'add';
    }

})

// Form validation

validateTitle = () => {
    let regex = /^[a-zA-Z0-9]{4,20}$/
    if(form.title.value.match(regex)) {
        console.log('yes');
        return true;
    } else {
        console.log('no');
        return false;
    }
}

validateAuthor = () => {
    let regex = /^(\w+ )+\w+$/;

	if(form.author.value.length == 0) {
		// form.author.textContent += '<p>fullname is required</p>';
        console.log('length is zero');
		return false;
	}

	if(!form.author.value.match(regex)){
		// form.author.textContent += '<p>Write full name</p>';
        console.log('doesnot match');
		return false;
        
	}

    form.author.style.border = '1px solid green';
    console.log('matches');
	return true;	
}

// console.log(form.content.outerHTML);

validateContent = () => {
    let regex = /^.{5,300}$/;

    if(form.content.value.length == 0) {
		// form.content.textContent += '<p>fullname is required</p>';
        console.log('length is zero');
		return false;
	}
    
	if(!form.content.value.match(regex)){
		// form.content.textContent += '<p>Write full name</p>';
        console.log('doesnot match');
		return false;

	}

    form.content.style.border = '1px solid green';
    console.log('matches');
	return true;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // validateTitle();
    // validateAuthor();
    // validateContent();

    // if(!validateTitle() || !validateAuthor() || !validateContent()) {

    // }
})



