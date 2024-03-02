const postCardContainer = document.getElementById('post-card-container');
const readPostContainer = document.getElementById('read-post-container');
const readCount = document.getElementById('read-count');
const latestPostContainer = document.getElementById('latest-post-container');

const loadAllPost = async () => {
  const res = await fetch(
    'https://openapi.programming-hero.com/api/retro-forum/posts'
  );
  const data = await res.json();
  const allPost = data.posts;
  allPost.forEach(post => {
    displayPost(post);
    const postBtn = document.getElementById(`${post.id}`);
    postBtn.addEventListener('click', () => handleMarkAsReadBtn(post));
  });
};

const loadLatestPost = async () => {
  const res = await fetch(
    'https://openapi.programming-hero.com/api/retro-forum/latest-posts'
  );
  const data = await res.json();
  data.forEach(post => {
    displayLatestPost(post);
  });
};

const loadPOstByCategory = async value => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${value}`
  );
  const data = await res.json();
  const allPost = data.posts;
  allPost.forEach(post => {
    displayPost(post);
    const postBtn = document.getElementById(`${post.id}`);
    postBtn.addEventListener('click', () => handleMarkAsReadBtn(post));
  });
};

const handleSearchBtn = () => {
  postCardContainer.textContent = '';
  const inputField = document.getElementById('input-field');
  const inputValue = inputField.value;
  // console.log(inputValue);
  setTimeout(() => {
    loadPOstByCategory(inputValue);
  }, 2000);
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
        <button id="${post.id}" class="btn w-auto h-auto px-0 min-h-0 min-w-0 text-white rounded-full"><img
            src="./images/email.png" alt=""></button>
      </div>
    </div>
  </div>
</div>
  
  `;
  postCardContainer.appendChild(div);
};

const displayLatestPost = post => {
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="card w-96 border bg-base-100 shadow-xl">
  <figure class="m-6 rounded-3xl"><img
      src="${post.cover_image}" alt="Shoes" />
  </figure>
  <div class="card-body space-y-4 h-[340px]">
    <div>
      <i class="fa-regular fa-calendar"></i>
      <span>${post.author?.posted_date || 'No publish date'}</span>
    </div>
    <h2 class="card-title font-extrabold">${post.title}</h2>
    <p>${post.description}</p>
    <div class="card-actions items-center gap-4">
      <img class="rounded-full w-11 h-11" src="${post.profile_image}" alt="">
      <div>
        <h3 class="font-bold text-xl">Cameron Williamson</h3>
        <p>${post.author?.designation || 'Unknown'}</p>
      </div>
    </div>
  </div>
</div>
  
  `;
  latestPostContainer.appendChild(div);
};

const handleMarkAsReadBtn = post => {
  console.log(post);
  const div = document.createElement('div');
  div.innerHTML = `  
  <div class="flex justify-between bg-white p-4 rounded-2xl">
  <p>
  ${post.title}
  </p>
  <div class="flex items-center gap-2">
    <i class="fa-regular fa-eye"></i>
    <span>${post.view_count}</span>
  </div>
</div>
  `;
  readPostContainer.appendChild(div);
  const count = parseInt(readCount.innerText) + 1;
  readCount.innerText = count;
};

loadAllPost();
loadLatestPost();
