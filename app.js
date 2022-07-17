const content = document.querySelector('article');
const panels = document.querySelectorAll('.panel');
const addBlogBtn = document.querySelector('.add');
const form = document.querySelector('form');
const list = document.querySelector('ul');
const submit = document.querySelector('.submit');
// const unsubBtn = document.querySelector('.unsub');

addBlogBtn.addEventListener('click', function () {
    let formContainer = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling; 
    formContainer.classList.toggle('d-none');

    if(!formContainer.classList.contains('d-none')) {
        addBlogBtn.innerText = 'remove';
    } else {
        addBlogBtn.innerText = 'add';
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

    error.textContent = '';
    form.content.style.border = '1px solid green';
	return true;
}

// Updating the UI
const addBlog = (recipes) => {
    let time = recipes.data().created_at.toDate();
    let html = `
                        <li class = "panel" data-id ="${recipes.id}">
                        <h3 class="title bg-primary text-light p-4 d-flex justify-content-between">${recipes.data().title}<span class="chevron material-symbols-outlined text-light bg-dark m-1 rounded-circle" title="Read-more">
                            expand_more
                            </span></h3>
                        
                        <article class = "my-4">
                            <div class="author bg-success p-3 text-light">Written by:  ${recipes.data().author}</div>
                            <div class="date bg-dark ps-3 text-light">${time}</div>
                            <div>
                                <p class="content bg-secondary p-3 text-light">${recipes.data().content}</p>
                            </div>
                            <button class="btn btn-danger">delete</button>
                        </article>
                        

                    </li>
                    `
   list.innerHTML += html;
}

// Getting Collections
const unsub = db.collection("recipes").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const recipes = doc;
        addBlog(recipes);
    });

    // Quering the elements for each blog Item

    const lists = Array.from(list.children);
    lists.forEach(list => {

        // Toggling each blog item
        let chevron = list.childNodes[1].childNodes[1];
        chevron.addEventListener('click', () => {
            chevron.classList.toggle('chevron-up');
            chevron.classList.toggle('chevron-down');
    
            if(chevron.classList.contains('chevron-up')) {
                chevron.parentElement.nextElementSibling.style.display = 'block'
            } else {
                chevron.parentElement.nextElementSibling.style.display = 'none'
            }
        });


        // Deleting each blog item
        const delBtn = list.childNodes[3].childNodes[7];

        delBtn.addEventListener('click', (e) => {

            const id = delBtn.parentElement.parentElement.getAttribute('data-id');

            // Deleting Data
            db.collection("recipes").doc(id).delete().then(() => {
                document.location.reload(true);
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });

            
        })
    });

});
    
submit.addEventListener('click', (e) => {
    e.preventDefault();
    const error = document.querySelector('.error-form');
    const now = new Date();

    if(!validateTitle() || !validateAuthor() || !validateContent()) {
            error.textContent = 'Form is not valid';
    } else {
        error.textContent = '';
        const inputData = {
                author: form.author.value,
                content: form.content.value,
                created_at: firebase.firestore.Timestamp.fromDate(now),
                title: form.title.value
            }

        // Adding data
        db.collection("recipes").add(inputData)
        .then((docRef) => {
        form.reset();
        document.location.reload(true);
        })
        .catch((error) => {
        console.error("Error adding document: ", error);
        });
    }

});
