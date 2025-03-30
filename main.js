let allPosts = [];

class Post {
    constructor(title, content, id){
        this.title = title;
        this.content = content;
        this.id = id;
        this.comments = [];
    }

    addComment(comment){
        this.comments.push(comment);
    }
}

class Comment{
    constructor(content, postId){
        this.content = content;
        this.postId = postId;
        this.timestamp = new Date().toLocaleDateString();
    }
}

 function main(){
    
let titleInput = document.getElementById('title');

let postContent = document.getElementById('content');
let button = document.getElementById('button');
let viewPosts = document.getElementById('viewPost');

//check if all required elements exist
if (!titleInput || !postContent || !button || !viewPosts){
    console.error('Error: required HTML elements are missing.');
    console.log('make sure your html has these elements with the correct ids');
    console.log('-Input field with id="title"');
    console.log('-textarea or input with id="content"');
    console.log('-button with id="button"');
    console.log('-Container element with id="viewPost"');
    return;
}

button.addEventListener('click', () => {
   if (titleInput.value.trim() === '' || postContent.value.trim() === ''){
    alert('please enter both title and content for your post');
    return;
   }

   let postId = Date.now().toString();
   let post = new Post(titleInput.value, postContent.value, postId);

   allPosts.push(post);
   renderPost();

   titleInput.value = '';
   postContent.value = '';
});
//function to render all posts with their comments
function renderPost(){
    viewPosts.innerHTML = '';

    for(let post of allPosts)
{  
     //create post container
   const postContainer = document.createElement('div');
   postContainer.className = 'post-container';
   postContainer.dataset.postId = post.id;

   //Create post content
   const postElement = document.createElement('div');
   postElement.className = 'post';
   postElement.innerHTML = `
   <h3>${post.title}</h3>
   <p>${post.content}</p>
   `;
   //create comment section
    const commentSection = document.createElement('div');
    commentSection.className = 'comment-section';

    //create form to add new comments
    const commentForm = document.createElement('div');
    commentForm.className = 'comment-form';
    commentForm.innerHTML = `
    <textarea placeholder= "write a comment..." class="comment-input"></textarea>
    <button class="comment-btn">Comment</button>
    `;

    //Add event listener to comment button
    const commentBtn = commentForm.querySelector('.comment-btn');
    const commentInput = commentForm.querySelector('.comment-input');

    commentBtn.addEventListener('click', () =>{
        if (commentInput.value.trim() === ''){
            alert('please enter a comment');
            return;
        }
        const newComment = new Comment(commentInput.value, post.id);
        post.addComment(newComment);

        //update only this post´s comments
        renderComments(post, commentList);

        //clear comment input
        commentInput.value = '';
    });

    //creare container for comments

    const commentList = document.createElement('div');
    commentList.className = 'comment-list';
    //render existing comments
    renderComments(post, commentList);

    //Assemble existing section
    commentSection.appendChild(commentForm);
    commentSection.appendChild(commentList);

    //Assemble post container
    postContainer.appendChild(postElement);
    postContainer.appendChild(commentSection);

    //Add post container to view
    viewPosts.appendChild(postContainer);

}
}
//Function to render comments for a specific post

function renderComments(post, commentList){
    commentList.innerHTML = '';

    if(post.comments.length === 0){
        const noComments = document.createElement('p');
        noComments.className = 'no-comments';
        noComments.textContent = 'No comments yet';
        commentList.appendChild(noComments);
        return;
    }

    for (let comment of post.comments){
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
        <p class ="comment-content">${comment.content}</p>
        <span class="comment-timestamp">${comment.timestamp}</span>
        `;
        commentList.appendChild(commentElement);

    }
}
renderPost();
}
main();

