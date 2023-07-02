import React from 'react';
import CommentCard from './CommentCard';
import Avatar from '../Avatar/Avatar';  

function GroupPostCard(props) {
    return(
        <div className="bg-white p-4 rounded shadow mt-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <Avatar userDisplayname={props.userDisplayname} userInfo={props.userInfo}/>
              <div>
                <p className="m-0 fw-bold">Ålands köp och sälj</p>
                <span className="text-muted fs-7">July 17 at 1:23 pm</span>
              </div>
            </div>
            <i className="fas fa-ellipsis-h" type="button" id="post1Menu" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <ul className="dropdown-menu border-0 shadow" aria-labelledby="post1Menu">
              <li className="d-flex align-items-center">
                <a className="dropdown-item d-flex justify-content-around align-items-center fs-7" href="#">Edit Post</a>
              </li>
              <li className="d-flex align-items-center">
                <a className="dropdown-item d-flex justify-content-around align-items-center fs-7" href="#">Delete Post</a>
              </li>
            </ul>
          </div>
          <div className="mt-3">
            <div>
              <p>Liten båt i behov av lite fix .. Bud från 80 €
              </p>
              <img src="https://scontent-hel3-1.xx.fbcdn.net/v/t39.30808-6/345593849_775596664103457_1986651885453575488_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=a83260&_nc_ohc=bkTG8Oh5zj4AX-TW7r-&_nc_ht=scontent-hel3-1.xx&oh=00_AfD4-tUmgn4aCwyS6i1O5FA9n15r4NNt6TWU1rJ84IM9Ow&oe=6473C090" alt="post image" className="img-fluid rounded"/>
            </div>
            <CommentCard userDisplayname={props.userDisplayname} userInfo={props.userInfo}/>
          </div>
        </div>
      )
}

export default GroupPostCard;