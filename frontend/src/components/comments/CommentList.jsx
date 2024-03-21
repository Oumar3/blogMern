import React, { useState } from 'react';
import swal from 'sweetalert';
import './commentList.css'
import UpdateComment from './UpdateComment';
const CommentList = () => {
    const [updateComment, setUpdateComment] = useState(false)
    const ondelete = () => {
        swal({
            title: "Etes vous sur de supprimer ?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Votre commentaire a ete supprime avec success!", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }
    return (
        <div className="comment-list">
            <h2 className="comment-list-count">2 comment</h2>
            {[1, 2].map((comment, index) => (
                <div className="comment-item" key={index}>
                    <div className="comment-item-info">
                        <div className="comment-item-username">ToriDev</div>
                        <div className="comment-item-time">2 heurs 10mn</div>
                    </div>
                    <p className="comment-item-text">Hello this is amazing</p>
                    <div className="comment-item-icon-wrapper">
                        <i onClick={() => setUpdateComment(true)} className="bi bi-pencil-square"></i>
                        <i onClick={ondelete} className="bi bi-trash-fill"></i>
                    </div>
                </div>

            ))
            }
            {updateComment && <UpdateComment setUpdateComment={setUpdateComment} />}
        </div>
    );
}

export default CommentList;
