> ## Recipe Blog App


> ### Link to the live website:
>[RecipeBlogapp](https://devrecipeblogapp.netlify.app/ "taskapp live site")
___

#### Description 
>Task App is a web app made with Js for adding todos, it can search throught the list, can add new task and show completed task
____

#### Tech Used:
 >Html, CSS, JavaScript, Firebase, git, github, Netlify.
___

> #### Things i have learnt : how to filter through an Array to get certain keyword
```JavaScript
// Getting Collections
db.collection("recipes").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const recipes = doc;
        addBlog(recipes);
    });
});

// Deleting Data
db.collection("recipes").doc(id).delete().then(() => {
    document.location.reload(true);
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});

 // Adding data
db.collection("recipes").add(inputData)
.then((docRef) => {
form.reset();
document.location.reload(true);
})
.catch((error) => {
console.error("Error adding document: ", error);
});
```
---



>#### Design image : The desgn was gotten from a screenshot of my phone to-do app
![Todo SS](asset/SS2.jpg "Design")

> #### Desktop View
![ SS](asset/Taskapp.png "Desktop View")


> #### Credits: 
NetNinja
Scythe