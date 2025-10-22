import { useState } from 'react';
import { Header, BackButton, UserAvatar, CategoryBadge, Tag, ActionButton, ShareButton, Comment } from '../../component/common/Community';
import { colors, commonStyles, borderRadius } from '../../styles/Community';

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

  // 좋아요 토글
  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  // 북마크 토글
  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // 댓글 작성
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
    <div style={commonStyles.page}>
      <Header />

      <div style={{ ...commonStyles.container, maxWidth: '900px' }}>
        <BackButton />

        {/* 게시글 카드 */}
        <article style={{ ...commonStyles.card, marginBottom: '24px' }}>
          {/* 상단 정보 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: `1px solid ${colors.border.lighter}`,
          }}>
            <UserAvatar name="김" size={56} />
            <div style={{ flex: 1, marginLeft: '16px' }}>
              <div style={{ fontWeight: 600, color: colors.text.primary, fontSize: '16px', marginBottom: '4px' }}>
                김○○
              </div>
              <div style={{ color: colors.text.tertiary, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>2시간 전</span>
                <span>•</span>
                <span>조회 247</span>
              </div>
            </div>
            <CategoryBadge category="대화후기" icon="💬" />
          </div>

          {/* 제목 */}
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: colors.text.primary,
            marginBottom: '24px',
            lineHeight: 1.4,
          }}>
            처음으로 마음을 터놓고 이야기할 수 있었어요
          </h1>

          {/* 본문 */}
          <div style={{
            color: '#555',
            fontSize: '16px',
            lineHeight: 1.8,
            marginBottom: '32px',
            whiteSpace: 'pre-wrap',
          }}>
            평소에 사람들과 깊은 대화를 나누기 어려워했는데, 오늘 사이사이에서 만난 분과 정말 진솔한 대화를 나눌 수 있었습니다.
서로의 고민을 들어주고 공감해주는 시간이 너무 소중했어요. 특히 "괜찮다, 천천히 가도 돼"라는 말이 정말 위로가 되었습니다.
요즘 취업 준비로 스트레스가 많았는데, 비슷한 상황에 있는 분과 이야기하니까 혼자가 아니라는 걸 느꼈어요. 서로 응원해주고 힘내자고 말해줄 수 있는 공간이 있다는 게 정말 감사합니다.
사이사이를 통해 따뜻한 사람들을 만날 수 있어서 마음이 한결 가벼워졌습니다. 다음에도 또 좋은 대화 나누고 싶어요!
          </div>

          {/* 태그 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {['#진솔한대화', '#위로', '#공감', '#응원'].map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          {/* 액션 영역 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 0',
            borderTop: `1px solid ${colors.border.lighter}`,
            borderBottom: `1px solid ${colors.border.lighter}`,
          }}>
            <div style={{ display: 'flex', gap: '24px' }}>
              <ActionButton
                icon={isLiked ? '❤️' : '👍'}
                count={likeCount}
                active={isLiked}
                onClick={handleToggleLike}
              />
              <ActionButton icon="💬" count={comments.length} />
              <ActionButton
                icon={isBookmarked ? '⭐' : '🔖'}
                count="저장"
                onClick={handleToggleBookmark}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <ShareButton icon="📋" title="링크 복사" onClick={copyLink} />
              <ShareButton icon="💛" title="카카오톡 공유" onClick={() => alert('카카오톡 공유 기능 (개발 중)')} />
              <ShareButton icon="📘" title="페이스북 공유" onClick={() => alert('페이스북 공유 기능 (개발 중)')} />
            </div>
          </div>
        </article>

        {/* 댓글 섹션 */}
        <section style={commonStyles.card}>
          {/* 댓글 헤더 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: `1px solid ${colors.border.lighter}`,
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: colors.text.primary }}>댓글</h2>
            <span style={{ color: colors.primary, fontWeight: 600 }}>{comments.length}개</span>
          </div>

          {/* 댓글 작성 */}
          <div style={{ marginBottom: '32px' }}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="따뜻한 댓글로 응원해주세요 ✨"
              maxLength={500}
              style={{
                ...commonStyles.input,
                minHeight: '100px',
                resize: 'vertical',
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '12px',
            }}>
              <div style={{ color: colors.text.tertiary, fontSize: '13px' }}>
                최대 500자까지 입력 가능
              </div>
              <button
                onClick={handleSubmitComment}
                style={{
                  background: colors.primary,
                  color: colors.white,
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: borderRadius.medium,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                댓글 작성
              </button>
            </div>
          </div>

          {/* 댓글 목록 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
