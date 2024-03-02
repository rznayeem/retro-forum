const postCardContainer = document.getElementById('post-card-container');

const loadAllPost = async () => {
  const res = await fetch(
    'https://openapi.programming-hero.com/api/retro-forum/posts'
  );
  const data = await res.json();
  const allPost = data.posts;
  allPost.forEach(post => {
    displayPost(post);
  });
};

const displayPost = post => {
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="flex flex-col lg:flex-row justify-between gap-6 bg-[#F3F3F5] rounded-3xl p-10">
  <img class="h-[72px] w-[72px] rounded-2xl" src="${post.image}" alt="">
  <div class="space-y-5 w-5/6">
    <div class="flex gap-5">
      <p>#${post.category}</p>
      <p>Author : ${post.author.name}</p>
    </div>
    <h3 class="text-[#12132D] font-bold text-xl">${post.title}</h3>
    <p>${post.description}
    </p>
    <hr class="border-dashed">
    <div class="flex justify-between">
      <div class="flex gap-6">
        <div class="flex items-center gap-3">
          <i class="fa-regular fa-message"></i>
          <span>${post.comment_count}</span>
        </div>
        <div class="flex items-center gap-3">
          <i class="fa-regular fa-eye"></i>
          <span>${post.view_count}</span>
        </div>
        <div class="flex items-center gap-3">
          <i class="fa-regular fa-clock"></i>
          <span>${post.posted_time}</span>
        </div>
      </div>
      <div>
        <button class="btn w-auto h-auto px-0 min-h-0 min-w-0 text-white rounded-full"><img
            src="./images/email.png" alt=""></button>
      </div>
    </div>
  </div>
</div>
  
  `;
  postCardContainer.appendChild(div);
};

loadAllPost();
