import React from 'react';

function GroupPostCard(){
    return(
        <div class="bg-white p-4 rounded shadow mt-3">
          <div class="d-flex justify-content-between">
            <div class="d-flex">
              <img src="https://source.unsplash.com/collection/happy-people" alt="avatar" class="rounded-circle me-2"/>
              <div>
                <p class="m-0 fw-bold">Ålands köp och sälj</p>
                <span class="text-muted fs-7">July 17 at 1:23 pm</span>
              </div>
            </div>
            <i class="fas fa-ellipsis-h" type="button" id="post1Menu" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <ul class="dropdown-menu border-0 shadow" aria-labelledby="post1Menu">
              <li class="d-flex align-items-center">
                <a class="dropdown-item d-flex justify-content-around align-items-center fs-7" href="#">Edit Post</a>
              </li>
              <li class="d-flex align-items-center">
                <a class="dropdown-item d-flex justify-content-around align-items-center fs-7" href="#">Delete Post</a>
              </li>
            </ul>
          </div>
          <div class="mt-3">
            <div>
              <p>Liten båt i behov av lite fix .. Bud från 80 €
              </p>
              <img src="https://scontent-hel3-1.xx.fbcdn.net/v/t39.30808-6/345593849_775596664103457_1986651885453575488_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=a83260&_nc_ohc=bkTG8Oh5zj4AX-TW7r-&_nc_ht=scontent-hel3-1.xx&oh=00_AfD4-tUmgn4aCwyS6i1O5FA9n15r4NNt6TWU1rJ84IM9Ow&oe=6473C090" alt="post image" class="img-fluid rounded"/>
            </div>
            <div class="post__comment mt-3 position-relative">
              <div class="d-flex align-items-center top-0 start-0 position-absolute" id="d-flex-comments">
                <div class="me-2">
                  <i class="text-primary fas fa-thumbs-up"></i>
                </div>
                <p class="m-0 text-muted fs-7">Nafi, Gin, Jacob and 3 others</p>
              </div>
              <div class="accordion" id="accordionExample">
                <div class="accordion-item border-0">
                  <h2 class="accordion-header" id="headingTwo">
                    <div class="accordion-button collapsed pointer d-flex justify-content-end" data-bs-toggle="collapse" data-bs-target="#collapsePost1" aria-expanded="false" aria-controls="collapsePost1">
                      <p class="m-0">2 Comments</p>
                    </div>
                  </h2>
                  <hr />
                  <div class="d-flex justify-content-around">
                    <div class="dropdown-item rounded d-flex justify-content-center align-items-center pointer text-muted p-1">
                      <i class="fas fa-thumbs-up me-3"></i>
                      <p class="m-0">Like</p>
                    </div>
                    <div
                      class=" dropdown-item rounded d-flex justify-content-center align-items-center pointer text-muted p-1" data-bs-toggle="collapse" data-bs-target="#collapsePost1" aria-expanded="false" aria-controls="collapsePost1">
                      <i class="fas fa-comment-alt me-3"></i>
                      <p class="m-0">Comment</p>
                    </div>
                  </div>
                  <div id="collapsePost1" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <hr />
                    <div class="accordion-body">
                      <div class="d-flex align-items-center my-1">
                        <img src="https://source.unsplash.com/collection/happy-people" alt="avatar" class="rounded-circle me-2"/>
                        <div class="p-3 rounded comment__input w-100">
                          <p class="fw-bold m-0">John</p>
                          <p class="m-0 fs-7 bg-gray p-2 rounded">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                      </div>
                      <form class="d-flex my-1">
                        <div>
                          <img src="https://source.unsplash.com/collection/happy-people" alt="avatar" class="rounded-circle me-2"/>
                        </div>
                        <input type="text" class="form-control border-0 rounded-pill bg-gray" placeholder="Write a comment"/>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}

export default GroupPostCard;