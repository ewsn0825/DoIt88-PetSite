import BookMark from '@/components/button/Bookmark';
import LikeButton from '@/components/button/likeButton';
import CommentCount from '@/components/button/CommentCount';
import ShareButton from '@/components/button/ShareButton';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPbImageURL } from '@/utils';
import pb from '@/api/pocketbase';
import ContentComment from './comment/ContentComment';

function ContentDetail() {
  const { contentId } = useParams();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [imageAlt, setImageAlt] = useState();

  const [created, setCreated] = useState();
  const [comment, setComment] = useState();
  const [user, setUser] = useState();

  const [collectionName, setCollectionName] = useState();

  useEffect(() => {
    async function getContent() {
      try {
        const data = await pb.collection('contents').getOne(contentId, {
          expand: 'comments , comments.user',
        });
        const {
          collectionName,
          title,
          content,
          imageAlt,
          created,
          comments,
          expand,
        } = data;
        setCollectionName(collectionName);
        setTitle(title);
        setContent(content);
        setImage(getPbImageURL(data, 'image'));
        setImageAlt(imageAlt);
        setCreated(created);
        setComment(comments);
        if (expand) {
          setComment(expand.comments);
          setUser(expand.comments.expand.user);
        }
      } catch (error) {
        if (!(error in DOMException)) {
          console.error(error);
        }
      }
    }

    getContent();
  }, [contentId]);

  const [date, setDate] = useState();

  useEffect(() => {
    if (created) {
      let datetime = created.split(' ')[0];
      setDate(datetime);
    }
  }, [created]);

  return (
    <div className="flex flex-col m-auto items-center gap-11 my-10 w-full ">
      <div className="w-[988px]">
        <h1 className="text-black text-[32px] mb-3">{title}</h1>
        <div className="flex justify-end">
          <span className="pt-2">{date}</span>
        </div>
        <div className="flex flex-col gap-11 mt-8">
          <figure className="mx-auto w-[600px] h-[380px] overflow-hidden relative">
            <img
              src={image}
              className="absolute top-1/2 -translate-y-1/2 w-full h-auto"
            />
            <figcaption aria-readonly>{imageAlt}</figcaption>
          </figure>
          <div className="px-10">{content}</div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <BookMark className="w-8 h-8 bg-cover bg-center" />
              <LikeButton
                contentId={contentId}
                collectionName={collectionName}
                className="w-8 h-8 bg-cover bg-center"
              />
              <CommentCount id={contentId} comments={comment} />
            </div>
            <ShareButton
              className="w-6 h-6 p-4 my-3"
              id={contentId}
              title={title}
              image={image}
            />
          </div>
        </div>
      </div>
      <ContentComment
        comments={comment}
        id={contentId}
        setComment={setComment}
      />
    </div>
  );
}

export default ContentDetail;
