import React from 'react';
import CommentCard from './CommentCard';
import Avatar from '../Avatar/Avatar';  

function GroupPostCard(){
    return(
        <div class="bg-white p-4 rounded shadow mt-3">
          <div class="d-flex justify-content-between">
            <div class="d-flex">
              <Avatar/>
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
            <CommentCard />
          </div>
        </div>
      )
}

export default GroupPostCard;