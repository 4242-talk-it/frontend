import { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, Bookmark, Link, Share2 } from 'lucide-react';

// 컴포넌트들
const BackButton = () => (
  <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm mb-6">
    <ArrowLeft size={20} />
  </button>
);

const UserAvatar = ({ name, size = 56 }) => (
  <div 
    className="flex items-center justify-center bg-green-100 text-green-700 font-semibold rounded-full"
    style={{ width: size, height: size, fontSize: size * 0.4 }}
  >
    {name}
  </div>
);

const CategoryBadge = ({ category, icon }) => (
  <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
    <span>{icon}</span>
    <span>{category}</span>
  </div>
);

const Tag = ({ children }) => (
  <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
    {children}
  </span>
);

const ActionButton = ({ icon, count, active, onClick, disabled }) => (
  <button
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
      ${disabled
        ? 'bg-gray-50 text-gray-600 cursor-default select-none pointer-events-none focus:outline-none focus-visible:outline-none hover:!bg-gray-50'
        : active
          ? 'bg-green-50 text-green-600'
          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
      }`}
  >
    <span className="text-lg">{icon}</span>
    <span className="text-sm">{count}</span>
  </button>
);

const ShareButton = ({ icon, title, onClick }) => (
  <button
    onClick={onClick}
    title={title}
    className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
  >
    <span className="text-lg">{icon}</span>
  </button>
);

const Comment = ({ comment }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className="flex gap-3">
      <UserAvatar name={comment.avatar} size={40} />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-gray-800">{comment.author}</span>
          <span className="text-sm text-gray-500">{comment.time}</span>
        </div>
        <p className="text-gray-700 leading-relaxed mb-3 whitespace-pre-wrap">
          {comment.text}
        </p>
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
            liked ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span>{liked ? '❤️' : '🤍'}</span>
          <span>{likes}</span>
        </button>
      </div>
    </div>
  );
};

export default function CommunityDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: '이○○',
      avatar: '이',
      time: '1시간 전',
      text: '정말 공감이 돼요! 저도 비슷한 경험이 있어서... 사이사이에서 만난 분들이 다들 따뜻하더라구요. 함께 힘내요 💪',
      likes: 5,
    },
    {
      id: 2,
      author: '박○○',
      avatar: '박',
      time: '45분 전',
      text: '"괜찮다, 천천히 가도 돼" 이 말 정말 좋네요. 저도 요즘 마음이 급해서 스트레스 받고 있었는데 위로가 됩니다 ❤️',
      likes: 3,
    },
    {
      id: 3,
      author: '최○○',
      avatar: '최',
      time: '30분 전',
      text: '취업 준비 정말 힘들죠 ㅠㅠ 저도 작년에 그랬는데, 지금 돌이켜보니 그 시간들도 다 소중한 경험이었어요. 포기하지 마시고 화이팅! 🌟',
      likes: 7,
    },
    {
      id: 4,
      author: '정○○',
      avatar: '정',
      time: '15분 전',
      text: '사이사이가 정말 좋은 플랫폼인 것 같아요. 익명이지만 진심 어린 대화를 나눌 수 있어서 감사해요. 좋은 후기 공유해주셔서 고마워요! 😊',
      likes: 2,
    },
  ]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다!');
  };

  const validateCommentForm = (content) => {
    if (!content.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleSubmitComment = () => {
    if (!validateCommentForm(commentText)) return;

    const newComment = {
      id: comments.length + 1,
      author: '나',
      avatar: '나',
      time: '방금 전',
      text: commentText.trim(),
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setCommentText('');
    alert('댓글이 등록되었습니다!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-[900px] mx-auto">
        <BackButton />

        {/* 게시글 카드 */}
        <article className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {/* 상단 정보 */}
          <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
            <UserAvatar name="김" size={56} />
            <div className="flex-1 ml-4">
              <div className="font-semibold text-gray-900 text-base mb-1">
                김○○
              </div>
              <div className="text-gray-500 text-sm flex items-center gap-3">
                <span>2시간 전</span>
                <span>•</span>
                <span>조회 247</span>
              </div>
            </div>
            <CategoryBadge category="대화후기" icon="💬" />
          </div>

          {/* 제목 */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-6 leading-snug">
            처음으로 마음을 터놓고 이야기할 수 있었어요
          </h1>

          {/* 본문 */}
          <div className="text-gray-700 text-base leading-relaxed mb-8 whitespace-pre-wrap">
            평소에 사람들과 깊은 대화를 나누기 어려워했는데, 오늘 사이사이에서 만난 분과 정말 진솔한 대화를 나눌 수 있었습니다.
서로의 고민을 들어주고 공감해주는 시간이 너무 소중했어요. 특히 "괜찮다, 천천히 가도 돼"라는 말이 정말 위로가 되었습니다.
요즘 취업 준비로 스트레스가 많았는데, 비슷한 상황에 있는 분과 이야기하니까 혼자가 아니라는 걸 느꼈어요. 서로 응원해주고 힘내자고 말해줄 수 있는 공간이 있다는 게 정말 감사합니다.
사이사이를 통해 따뜻한 사람들을 만날 수 있어서 마음이 한결 가벼워졌습니다. 다음에도 또 좋은 대화 나누고 싶어요!
          </div>

          {/* 태그 */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['#진솔한대화', '#위로', '#공감', '#응원'].map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          {/* 액션 영역 */}
          <div className="flex items-center justify-between py-5 border-t border-b border-gray-100">
            <div className="flex gap-6">
              <ActionButton
                icon={isLiked ? '❤️' : '🤍'}
                count={likeCount}
                active={isLiked}
                onClick={handleToggleLike}
              />
              <ActionButton
                icon={isBookmarked ? '⭐' : '🔖'}
                count="저장"
                onClick={handleToggleBookmark}
              />
              <ActionButton icon="💬" count={comments.length} disabled/>
            </div>
            <div className="flex gap-3">
              <ShareButton icon="📋" title="링크 복사" onClick={copyLink} />
              <ShareButton icon="💛" title="카카오톡 공유" onClick={() => alert('카카오톡 공유 기능 (개발 중)')} />
            </div>
          </div>
        </article>

        {/* 댓글 섹션 */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          {/* 댓글 헤더 */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">댓글</h2>
          </div>

          {/* 댓글 작성 */}
          <div className="mb-8">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="따뜻한 댓글로 응원해주세요 ✨"
              maxLength={500}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                      focus:border-green-400 focus:outline-none transition-colors
                      min-h-[100px] resize-y"
            />
            <div className="flex justify-end items-center mt-3">
              <button
                onClick={handleSubmitComment}
                className="bg-green-400 text-white px-6 py-3 rounded-xl font-medium
                        hover:bg-green-500 transition-colors"
              >
                댓글 작성
              </button>
            </div>
          </div>

          {/* 댓글 목록 */}
          <div className="flex flex-col gap-5">
            {comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}