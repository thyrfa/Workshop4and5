import React from 'react';
import {Link} from 'react-router';
import {unixTimeToString} from '../util';
import {likeComment} from '../server';
import {unlikeComment} from '../server';

export default class Comment extends React.Component {
  constructor(props) {
      super(props);
      this.state = props.data;
    }
  likeClick(e) {
    e.preventDefault();
    var cb = (freshLiker) => {
      this.setState({likeCounter: freshLiker});
    };
    if (this.userLiked()) {
      unlikeComment(this.props.feedItem, this.props.index, 4, cb);
    }
    else {
      likeComment(this.props.feedItem, this.props.index, 4, cb);
    }
  }
  userLiked() {
    var likeCounter = this.state.likeCounter;
    var liked = false;
    for (var i = 0; i < likeCounter.length; i++) {
      if (likeCounter[i]._id == 4) {
        liked = true;
        break;
      }
    }
    return liked;
  }
  render() {
    if (this.didUserLike()) {
      likeButtonText = "Unlike";
    }
    else{
      var likeButtonText = "Like";
    }
    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + this.props.author._id}>{this.props.author.fullName}</Link> {this.props.children}
            <br /><a href="#" onClick={(e) => this.likeClick(e)}>{likeButtonText}</a> · <a href="#">Reply</a> ·
              {unixTimeToString(this.props.postDate)}
        </div>
      </div>
    )
  }
}
