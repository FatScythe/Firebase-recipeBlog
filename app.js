const chevrons = document.querySelectorAll('.chevron');
const content = document.querySelector('article');
const panels = document.querySelectorAll('.panel');
const addBtn = document.querySelector('.add');
const form = document.querySelector('form');

// Getting Collections


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
    const error = document.querySelector('.error-title');
    let regex =/^.{1,40}$/;
    let title = form.title.value;
    
    if(title.match(regex)) {
        form.title.style.outline = '1px solid green';
        error.textContent = '';
        return true;
    } 

    if(!title.match(regex)) {
        form.title.style.outline = '1px solid red';
        error.textContent = 'Title is required';
        return false;
    }
}
   

validateAuthor = () => {
    let regex = /^(\w+ )+\w+$/;
    const error = document.querySelector('.error-author');
    let author = form.author.value;

	if(author.length == 0) {
		error.innerHTML = '<p>This field cannot be empty</p>';
		return false;
	}

	if(!author.match(regex)){
		error.innerHTML = '<p>fullname is required</p>';
		return false;
	}

    error.innerHTML = '';
    form.author.style.border = '1px solid green';
	return true;
}
	


validateContent = () => { 
    let regex = /^.{1,1000}$/;
    const error = document.querySelector('.error-content');
    let content = form.content.value;

    if(content.length == 0) {
		error.textContent = 'content cannot be empty';
		return false;
	}
    
	if(!content.match(regex)){
		error.textContent = 'Add more content';
		return false;
	}

    error.textContent = '';
    form.content.style.border = '1px solid green';
	return true;
}


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const error = document.querySelector('.error-form');
    
        if(!validateTitle() || !validateAuthor() || !validateContent()) {
                error.textContent = 'Form is not valid';
        } else {
            error.textContent = '';
        }
    
    });




