import { useState } from 'react';
import { Header, PageHeader, Tag, CharacterCount } from '../../component/common/Community';
import { colors, commonStyles, borderRadius, categories } from '../../styles/Community';

export default function CommunityCreate() {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxTags = 5;
  const maxTitle = 100;
  const maxContent = 1000;

  // ------------------- helpers.js 없이 직접 정의 -------------------
  const validateReviewForm = (category, title, content) => {
    if (!category) {
      alert('카테고리를 선택해주세요.');
      return false;
    }
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return false;
    }
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return false;
    }
    return true;
  };

  const showConfirm = (message) => window.confirm(message);
  // ------------------------------------------------------

  // 태그 추가/삭제 로직
  const handleAddTag = () => {
    const value = tagInput.trim();
    if (value && tags.length < maxTags && !tags.includes(value)) {
      setTags([...tags, value]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async () => {
    if (!validateReviewForm(category, title, content)) return;

    setIsSubmitting(true);
    const postData = {
      category,
      title: title.trim(),
      content: content.trim(),
      tags,
      timestamp: new Date().toISOString(),
    };

    console.log('게시글 데이터:', postData);

    // TODO: API 연동
    setTimeout(() => {
      alert('후기가 성공적으로 등록되었습니다!');
      setIsSubmitting(false);
    }, 1500);
  };

  const handleCancel = () => {
    if (showConfirm('작성 중인 내용이 사라집니다. 정말 나가시겠습니까?')) {
      window.history.back();
    }
  };

  return (
    <div style={commonStyles.page}>
      <Header />
      <div style={commonStyles.container}>
        <PageHeader
          title="📝 함께 나누는 이야기"
          subtitle={
            <>
              대화 후기부터 일상의 소소한 이야기까지, 따뜻하게 공유해보세요<br />
              여러분의 경험이 누군가에게 큰 힘이 될 수 있어요
            </>
          }
        />

        <div style={commonStyles.card}>
          {/* 카테고리 선택 */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '12px' }}>카테고리</label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px'
            }}>
              {categories.map(cat => (
                <div
                  key={cat.id}
                  onClick={() => setCategory(cat.value)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px',
                    border: category === cat.value ? `2px solid ${colors.primary}` : `2px solid ${colors.border.light}`,
                    borderRadius: borderRadius.medium,
                    background: category === cat.value ? 'rgba(165, 242, 120, 0.1)' : colors.white,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontWeight: 500,
                  }}
                >
                  {cat.icon} {cat.value}
                </div>
              ))}
            </div>
          </div>

          {/* 제목 입력 */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '12px' }}>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
              maxLength={maxTitle}
              style={commonStyles.input}
            />
            <CharacterCount current={title.length} max={maxTitle} />
          </div>

          {/* 내용 입력 */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '12px' }}>내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="따뜻했던 대화 경험이나 기억에 남는 말을 자유롭게 공유해주세요."
              maxLength={maxContent}
              style={{ ...commonStyles.input, minHeight: '150px', resize: 'vertical', lineHeight: 1.6 }}
            />
            <CharacterCount current={content.length} max={maxContent} />
          </div>

          {/* 키워드 태그 */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '12px' }}>키워드 태그</label>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              border: `2px solid ${colors.border.light}`,
              borderRadius: borderRadius.medium,
              padding: '12px',
              background: colors.white,
              marginBottom: '8px',
            }}>
              {tags.map(tag => (
                <Tag key={tag} onRemove={() => handleRemoveTag(tag)}>
                  {tag}
                </Tag>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagKeyPress}
                onBlur={handleAddTag}
                placeholder="키워드를 입력하고 Enter를 눌러주세요"
                disabled={tags.length >= maxTags}
                style={{
                  border: 'none',
                  outline: 'none',
                  flex: 1,
                  minWidth: '100px',
                  fontSize: '14px',
                }}
              />
            </div>
            <div style={{ fontSize: '13px', color: colors.text.tertiary }}>
              최대 5개까지 추가할 수 있어요 (예: 위로, 공감, 따뜻한말)
            </div>
          </div>

          {/* 버튼 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '40px' }}>
            <button onClick={handleCancel} style={commonStyles.button.secondary}>
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                ...commonStyles.button.primary,
                background: isSubmitting ? '#ccc' : colors.primary,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? '등록중...' : '게시글 등록'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
